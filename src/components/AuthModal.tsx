import { type FormEvent, useEffect, useRef, useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import {
  type AuthMode,
  type AuthValidationErrors,
  type UserAccount,
  registerAccount,
  signInAccount,
} from '../utils/auth';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: AuthMode;
  onClose: () => void;
  onSuccess: (user: UserAccount) => void;
}

export function AuthModal({
  isOpen,
  initialMode,
  onClose,
  onSuccess,
}: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<AuthValidationErrors>({});
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setMode(initialMode);
    setErrors({});
    setPassword('');
    setShowPassword(false);
    const timer = window.setTimeout(() => {
      firstInputRef.current?.focus();
    }, 20);
    return () => window.clearTimeout(timer);
  }, [isOpen, initialMode]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  function handleSwitchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setErrors({});
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result =
      mode === 'register'
        ? registerAccount(window.localStorage, { name, email, password })
        : signInAccount(window.localStorage, { email, password });

    if (result.errors) {
      setErrors(result.errors);
      return;
    }

    if (result.user) {
      setName('');
      setEmail('');
      setPassword('');
      setErrors({});
      onSuccess(result.user);
    }
  }

  const isRegister = mode === 'register';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/30"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className="relative z-10 w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2
            id="auth-modal-title"
            className="text-lg font-semibold text-slate-900"
          >
            {isRegister ? 'Đăng ký tài khoản' : 'Đăng nhập'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {errors.form && (
            <div
              role="alert"
              className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {errors.form}
            </div>
          )}

          {isRegister && (
            <div>
              <label
                htmlFor="auth-name"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Tên hiển thị
              </label>
              <input
                ref={isRegister ? firstInputRef : undefined}
                id="auth-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Nguyễn Văn A"
                aria-invalid={Boolean(errors.name)}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
              {errors.name && (
                <p role="alert" className="mt-1 text-xs text-red-600">
                  {errors.name}
                </p>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="auth-email"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              ref={!isRegister ? firstInputRef : undefined}
              id="auth-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="ten@example.com"
              aria-invalid={Boolean(errors.email)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
            {errors.email && (
              <p role="alert" className="mt-1 text-xs text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="auth-password"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Tối thiểu 6 ký tự"
                aria-invalid={Boolean(errors.password)}
                className="w-full rounded-md border border-slate-300 bg-white py-2 pl-3 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                className="absolute right-1.5 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded text-slate-500 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.password && (
              <p role="alert" className="mt-1 text-xs text-red-600">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-md bg-slate-900 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            {isRegister ? 'Tạo tài khoản' : 'Đăng nhập'}
          </button>
        </form>

        <div className="mt-5 border-t border-slate-100 pt-4 text-center text-sm text-slate-600">
          {isRegister ? (
            <>
              Đã có tài khoản?{' '}
              <button
                type="button"
                onClick={() => handleSwitchMode('login')}
                className="font-medium text-slate-900 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                Đăng nhập
              </button>
            </>
          ) : (
            <>
              Chưa có tài khoản?{' '}
              <button
                type="button"
                onClick={() => handleSwitchMode('register')}
                className="font-medium text-slate-900 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                Đăng ký
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
