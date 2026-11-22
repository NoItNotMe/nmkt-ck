export type AuthMode = 'login' | 'register';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
}

interface StoredAccountRecord extends UserAccount {
  password: string;
}

export interface AuthFormInput {
  mode: AuthMode;
  name?: string;
  email: string;
  password: string;
}

export interface AuthValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  form?: string;
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

const SESSION_STORAGE_KEY = 'app_active_user_v1';
const ACCOUNTS_STORAGE_KEY = 'app_accounts_v1';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateAuthInput(input: AuthFormInput): AuthValidationErrors {
  const errors: AuthValidationErrors = {};
  const trimmedEmail = input.email.trim();
  const trimmedName = (input.name ?? '').trim();

  if (input.mode === 'register' && trimmedName.length < 2) {
    errors.name = 'Vui lòng nhập tên tối thiểu 2 ký tự.';
  }

  if (!trimmedEmail) {
    errors.email = 'Vui lòng nhập email.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Email không đúng định dạng.';
  }

  if (!input.password) {
    errors.password = 'Vui lòng nhập mật khẩu.';
  } else if (input.password.length < 6) {
    errors.password = 'Mật khẩu cần tối thiểu 6 ký tự.';
  }

  return errors;
}

export function hasValidationErrors(errors: AuthValidationErrors): boolean {
  return Boolean(errors.name || errors.email || errors.password || errors.form);
}

export function getUserInitials(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return 'U';
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function readAccounts(storage: StorageLike): StoredAccountRecord[] {
  try {
    const raw = storage.getItem(ACCOUNTS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(
      (item): item is StoredAccountRecord =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as StoredAccountRecord).id === 'string' &&
        typeof (item as StoredAccountRecord).name === 'string' &&
        typeof (item as StoredAccountRecord).email === 'string' &&
        typeof (item as StoredAccountRecord).password === 'string'
    );
  } catch {
    return [];
  }
}

function writeAccounts(storage: StorageLike, accounts: StoredAccountRecord[]): void {
  storage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
}

export function loadStoredUser(storage: StorageLike): UserAccount | null {
  try {
    const raw = storage.getItem(SESSION_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      typeof (parsed as UserAccount).id === 'string' &&
      typeof (parsed as UserAccount).name === 'string' &&
      typeof (parsed as UserAccount).email === 'string'
    ) {
      return parsed as UserAccount;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveStoredUser(storage: StorageLike, user: UserAccount): void {
  storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser(storage: StorageLike): void {
  storage.removeItem(SESSION_STORAGE_KEY);
}

export function registerAccount(
  storage: StorageLike,
  input: { name: string; email: string; password: string }
): { user?: UserAccount; errors?: AuthValidationErrors } {
  const errors = validateAuthInput({
    mode: 'register',
    name: input.name,
    email: input.email,
    password: input.password,
  });

  if (hasValidationErrors(errors)) {
    return { errors };
  }

  const normalizedEmail = input.email.trim().toLowerCase();
  const accounts = readAccounts(storage);
  if (accounts.some((acc) => acc.email.toLowerCase() === normalizedEmail)) {
    return {
      errors: {
        email: 'Email này đã được đăng ký.',
      },
    };
  }

  const newRecord: StoredAccountRecord = {
    id: `user_${Date.now()}`,
    name: input.name.trim(),
    email: normalizedEmail,
    password: input.password,
  };

  writeAccounts(storage, [...accounts, newRecord]);

  const user: UserAccount = {
    id: newRecord.id,
    name: newRecord.name,
    email: newRecord.email,
  };
  saveStoredUser(storage, user);
  return { user };
}

export function signInAccount(
  storage: StorageLike,
  input: { email: string; password: string }
): { user?: UserAccount; errors?: AuthValidationErrors } {
  const errors = validateAuthInput({
    mode: 'login',
    email: input.email,
    password: input.password,
  });

  if (hasValidationErrors(errors)) {
    return { errors };
  }

  const normalizedEmail = input.email.trim().toLowerCase();
  const accounts = readAccounts(storage);
  const existing = accounts.find((acc) => acc.email.toLowerCase() === normalizedEmail);

  if (!existing) {
    return {
      errors: {
        form: 'Tài khoản chưa tồn tại hoặc mật khẩu không đúng.',
      },
    };
  }

  if (existing.password !== input.password) {
    return {
      errors: {
        form: 'Tài khoản chưa tồn tại hoặc mật khẩu không đúng.',
      },
    };
  }

  const user: UserAccount = {
    id: existing.id,
    name: existing.name,
    email: existing.email,
  };
  saveStoredUser(storage, user);
  return { user };
}
