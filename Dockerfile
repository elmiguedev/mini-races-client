# Etapa 1: Construcción de la aplicación
FROM node:20-alpine as build-stage

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto
COPY . .

# Instalar dependencias
RUN pnpm install

# Construir la aplicación con Vite
RUN pnpm build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:stable-alpine as production-stage

# Copiar el build generado al directorio predeterminado de Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
