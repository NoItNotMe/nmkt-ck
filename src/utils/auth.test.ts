import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clearStoredUser,
  getUserInitials,
  hasValidationErrors,
  loadStoredUser,
  registerAccount,
  signInAccount,
  type StorageLike,
  validateAuthInput,
} from './auth';

function createMemoryStorage(): StorageLike {
  const store = new Map<string, string>();
  return {
    getItem(key: string): string | null {
      return store.get(key) ?? null;
    },
    setItem(key: string, value: string): void {
      store.set(key, value);
    },
    removeItem(key: string): void {
      store.delete(key);
    },
  };
}

test('validateAuthInput rejects invalid registration fields and accepts valid input', () => {
  const invalid = validateAuthInput({
    mode: 'register',
    name: 'A',
    email: 'invalid-email',
    password: '123',
  });
  assert.equal(hasValidationErrors(invalid), true);
  assert.ok(invalid.name);
  assert.ok(invalid.email);
  assert.ok(invalid.password);

  const valid = validateAuthInput({
    mode: 'register',
    name: 'Minh Anh',
    email: 'minh@example.com',
    password: 'secret123',
  });
  assert.equal(hasValidationErrors(valid), false);
});

test('getUserInitials derives 1-2 character initials from Vietnamese names', () => {
  assert.equal(getUserInitials('Minh Anh'), 'MA');
  assert.equal(getUserInitials('Nguyễn Văn An'), 'NA');
  assert.equal(getUserInitials('Linh'), 'LI');
  assert.equal(getUserInitials('   '), 'U');
});

test('registerAccount, signInAccount, loadStoredUser, and clearStoredUser persist session', () => {
  const storage = createMemoryStorage();

  const reg = registerAccount(storage, {
    name: 'Trần Bảo',
    email: 'bao@example.com',
    password: 'password123',
  });
  assert.ok(reg.user);
  assert.equal(reg.user.name, 'Trần Bảo');
  assert.equal(loadStoredUser(storage)?.email, 'bao@example.com');

  const duplicate = registerAccount(storage, {
    name: 'Trần Bảo 2',
    email: 'BAO@example.com',
    password: 'password123',
  });
  assert.ok(duplicate.errors?.email);

  clearStoredUser(storage);
  assert.equal(loadStoredUser(storage), null);

  const badLogin = signInAccount(storage, {
    email: 'bao@example.com',
    password: 'wrongpassword',
  });
  assert.ok(badLogin.errors?.form);

  const goodLogin = signInAccount(storage, {
    email: 'bao@example.com',
    password: 'password123',
  });
  assert.equal(goodLogin.user?.name, 'Trần Bảo');
  assert.equal(loadStoredUser(storage)?.name, 'Trần Bảo');
});
