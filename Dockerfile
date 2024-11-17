# Etapa 1: Construcción de la aplicación
FROM node:20-alpine as build-stage

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY vite.config.js ./
COPY src ./src
COPY public ./public

# Definir argumentos para las variables de entorno
ARG VITE_SERVER_URL
ENV VITE_SERVER_URL=${VITE_SERVER_URL}

# Instalar dependencias
RUN pnpm install

# Construir la aplicación con Vite
RUN pnpm build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:stable-alpine as production-stage

# Copiar el build generado al directorio predeterminado de Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Configuración de Nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
