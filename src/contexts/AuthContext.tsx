import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiRequest } from "@/lib/api";

export type UserRole = "user" | "admin";

export type AuthUser = {
  id?: string;
  name?: string;
  email?: string;
  mobileno?: string;
  dob?: string;
  gender?: string;
  role?: UserRole | string;
};

type AuthContextValue = {
  token: string;
  user: AuthUser | null;
  role: UserRole;
  isAuthed: boolean;
  setAuth: (token: string, user: AuthUser) => void;
  signOut: () => void;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readToken() {
  return localStorage.getItem("token") || "";
}

function readUser(): AuthUser | null {
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function normalizeRole(role: AuthUser["role"]): UserRole {
  const r = (role || "user").toString().toLowerCase();
  return r === "admin" ? "admin" : "user";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string>(() => readToken());
  const [user, setUser] = useState<AuthUser | null>(() => readUser());

  const refreshProfile = async () => {
    if (!readToken()) return;
    const res = await apiRequest<AuthUser | { user: AuthUser }>("/api/auth/profile", { method: "GET" });
    if (res.ok) {
      const nextUser = (res.data as any)?.user ?? res.data;
      localStorage.setItem("user", JSON.stringify(nextUser));
      setUser(nextUser);
    }
  };

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "token") setToken(readToken());
      if (e.key === "user") setUser(readUser());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    refreshProfile().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const role = normalizeRole(user?.role);
    return {
      token,
      user,
      role,
      isAuthed: Boolean(token),
      setAuth: (t, u) => {
        localStorage.setItem("token", t);
        localStorage.setItem("user", JSON.stringify(u));
        setToken(t);
        setUser(u);
      },
      signOut: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken("");
        setUser(null);
      },
      refreshProfile,
    };
  }, [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

