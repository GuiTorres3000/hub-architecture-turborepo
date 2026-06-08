# Horttifruti

Plataforma B2B de commerce para o agronegócio de hortifruti brasileiro.
Monorepo gerenciado por **Turborepo + pnpm workspaces**.

## Estrutura

```
apps/
  hub/             React/Vite  :3000   Shell: login, role detection, redirect
  buyer-app/       React/Vite  :3001   Comprador (mercado, atacado, varejista)
  supplier-app/    React/Vite  :3002   Fornecedor / Produtor
  program-app/     React/Vite  :3003   Técnico ATER / Gestor de programa
  auth-service/    NestJS      :4001   JWT, RBAC
  catalog-service/ NestJS      :4002   Produtos, preços
  order-service/   NestJS      :4003   Pedidos, RFQ, leilões
  payment-service/ NestJS      :4004   Escrow, progressive unlock
  program-service/ NestJS      :4005   Programas ATER, crédito rural
packages/
  ui/         Design system compartilhado
  auth/       useAuth, guards React, RBAC hooks
  api-client/ React Query + DTOs tipados
  types/      DTOs, enums, schemas Zod (FE + BE)
  hooks/      useRole, useCompanyTier, useFeatureFlag
  nest-core/  Guards NestJS, pipes, decorators
  prisma/     Schema Prisma central, client gerado
  config/     tsconfig base, eslint base, vite base
```

## Scripts

```bash
pnpm install          # instala todos os workspaces
pnpm dev              # turbo run dev (todos os apps em paralelo)
pnpm build            # turbo run build (respeita o task graph)
pnpm lint
pnpm type-check
pnpm db:generate      # prisma generate
pnpm db:migrate       # prisma migrate dev
```

## Requisitos

- Node >= 20
- pnpm 9
- PostgreSQL (ver `packages/prisma/.env.example`)
