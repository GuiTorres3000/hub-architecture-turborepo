import { useEffect } from "react";
import { useAuth } from "@app/auth";
import { useRole } from "@app/hooks";
import { Role } from "@app/types";

/** Destination app per role — the hub is a pure router/redirector shell. */
const ROLE_REDIRECT: Record<Role, string> = {
  [Role.BUYER]: "http://localhost:3001",
  [Role.SUPPLIER]: "http://localhost:3002",
  [Role.PRODUCER]: "http://localhost:3002",
  [Role.TECHNICIAN]: "http://localhost:3003",
  [Role.PROGRAM_MANAGER]: "http://localhost:3003",
};

export function App() {
  const { isAuthenticated } = useAuth();
  const role = useRole();

  useEffect(() => {
    if (isAuthenticated && role) {
      window.location.assign(ROLE_REDIRECT[role]);
    }
  }, [isAuthenticated, role]);

  return (
    <main className="app-hub">
      <h1>App</h1>
      <p>{isAuthenticated ? "Redirecionando…" : "Faça login para continuar."}</p>
    </main>
  );
}
