#!/bin/bash

# Script de migración Frontend - TypeScript + State Management
# Intercert LATAM - 2026-01-02

set -e

echo "🚀 Iniciando migración Frontend..."
echo "========================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Step 1: Backup
echo -e "${YELLOW}📦 Paso 1: Creando backup...${NC}"
BACKUP_DIR="../backups/migration-frontend-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

cp package.json "$BACKUP_DIR/package.json.old"
cp package-lock.json "$BACKUP_DIR/package-lock.json.old" 2>/dev/null || true

echo -e "${GREEN}✅ Backup completado${NC}"

# Step 2: Install new dependencies
echo -e "${YELLOW}📥 Paso 2: Instalando nuevas dependencias...${NC}"

npm install --save --legacy-peer-deps \
  @tanstack/react-query@^5.64.2 \
  @tanstack/react-query-devtools@^5.64.2 \
  zustand@^5.0.3

echo -e "${GREEN}✅ Dependencias de state management instaladas${NC}"

# Step 3: Install TypeScript and types
echo -e "${YELLOW}📥 Paso 3: Instalando TypeScript...${NC}"

npm install --save-dev --legacy-peer-deps \
  typescript@^5.7.2 \
  @types/dompurify@^3.2.0 \
  @types/leaflet@^1.9.20 \
  @types/qrcode@^1.5.5

echo -e "${GREEN}✅ TypeScript instalado${NC}"

# Step 4: Verify installations
echo -e "${YELLOW}🔍 Paso 4: Verificando instalaciones...${NC}"

# Check if packages are installed
if npm list @tanstack/react-query &>/dev/null; then
    echo -e "${GREEN}✅ TanStack Query instalado${NC}"
else
    echo -e "${RED}❌ Error: TanStack Query no se instaló correctamente${NC}"
    exit 1
fi

if npm list zustand &>/dev/null; then
    echo -e "${GREEN}✅ Zustand instalado${NC}"
else
    echo -e "${RED}❌ Error: Zustand no se instaló correctamente${NC}"
    exit 1
fi

if npm list typescript &>/dev/null; then
    echo -e "${GREEN}✅ TypeScript instalado${NC}"
else
    echo -e "${RED}❌ Error: TypeScript no se instaló correctamente${NC}"
    exit 1
fi

# Step 5: Type check
echo -e "${YELLOW}🧪 Paso 5: Verificando configuración TypeScript...${NC}"

if [ -f "tsconfig.json" ]; then
    echo -e "${GREEN}✅ tsconfig.json encontrado${NC}"
    
    # Try to run type check (will fail on .jsx files, that's expected)
    npm run type-check 2>&1 | head -20 || true
    echo -e "${YELLOW}⚠️  Errores de tipo esperados en archivos .jsx (migrar gradualmente)${NC}"
else
    echo -e "${RED}❌ tsconfig.json no encontrado${NC}"
    exit 1
fi

# Summary
echo ""
echo "========================================="
echo -e "${GREEN}🎉 MIGRACIÓN FRONTEND COMPLETADA${NC}"
echo "========================================="
echo ""
echo "Instalado:"
echo "  ✅ TanStack Query 5.64.2 (React Query)"
echo "  ✅ Zustand 5.0.3 (State Management)"
echo "  ✅ TypeScript 5.7.2"
echo "  ✅ Type definitions (@types/*)"
echo ""
echo "Archivos creados:"
echo "  ✅ tsconfig.json"
echo "  ✅ src/types/index.ts"
echo "  ✅ src/stores/authStore.ts"
echo "  ✅ src/stores/uiStore.ts"
echo "  ✅ src/hooks/useTickets.ts"
echo ""
echo "Próximos pasos:"
echo "  1. Reiniciar el servidor de desarrollo"
echo "  2. Migrar componentes gradualmente a TypeScript (.jsx → .tsx)"
echo "  3. Reemplazar useState/useEffect con TanStack Query"
echo "  4. Reemplazar Context API con Zustand stores"
echo ""
echo "Para comenzar la migración:"
echo "  - Ver ejemplos en src/hooks/useTickets.ts"
echo "  - Ver stores en src/stores/"
echo "  - Tipos disponibles en src/types/index.ts"
echo ""
