import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { JwtPayloadSchema, type AuthTokens, type JwtPayload } from "@app/types";

interface AuthState {
  user: JwtPayload | null;
  tokens: AuthTokens | null;
}

interface AuthContextValue extends AuthState {
  isAuthenticated: boolean;
  login: (tokens: AuthTokens) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "app.auth.tokens";

function decode(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split(".");
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return JwtPayloadSchema.parse(json);
  } catch {
    return null;
  }
}

function readInitial(): AuthState {
  const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
  if (!raw) return { user: null, tokens: null };
  try {
    const tokens = JSON.parse(raw) as AuthTokens;
    return { tokens, user: decode(tokens.accessToken) };
  } catch {
    return { user: null, tokens: null };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(readInitial);

  const login = useCallback((tokens: AuthTokens) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
    setState({ tokens, user: decode(tokens.accessToken) });
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setState({ user: null, tokens: null });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ ...state, isAuthenticated: state.user !== null, login, logout }),
    [state, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within an <AuthProvider>");
  return ctx;
}
