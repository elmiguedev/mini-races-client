# Etapa 1: Construcción de la aplicación
FROM node:20-alpine as build-stage

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY vite.config.ts ./
COPY src ./src
COPY public ./public
COPY index.html ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY tsconfig.app.json ./

# Definir argumentos para las variables de entorno
ARG SERVER_URL
ENV SERVER_URL=${SERVER_URL}

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
