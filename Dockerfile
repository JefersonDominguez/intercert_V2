# Build estático para producción (nginx sirve ./frontend/dist en el host)
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Imagen ligera: el servicio frontend en compose no expone la app (nginx usa dist/)
FROM node:20-alpine
WORKDIR /app
RUN echo "Frontend estático generado en build; nginx monta frontend/dist"
CMD ["sleep", "infinity"]
