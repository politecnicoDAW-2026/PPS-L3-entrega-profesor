# Etapa 1: instala solo las dependencias de producción, exactamente las del package-lock.json
FROM node:24-alpine AS dependencias
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Etapa 2: la imagen que va a producción
FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=dependencias /app/node_modules ./node_modules
COPY package.json app.js servidor.js ./
# El usuario node (UID 1000) ya existe en la imagen base: la aplicación no se ejecuta como root.
# Se indica por número para que cualquier herramienta lo entienda sin consultar /etc/passwd.
USER 1000:1000
EXPOSE 3000
# wget termina con error si la respuesta no es 2xx: el contenedor pasa a unhealthy
HEALTHCHECK --interval=10s --timeout=3s --retries=3 \
  CMD ["wget", "-q", "-O", "/dev/null", "http://localhost:3000/salud"]
CMD ["node", "servidor.js"]
