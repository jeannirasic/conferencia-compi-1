#Primera parte-----------------------------------
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g @angular/cli@7.3.9
RUN npm run build --prod

#Segunda parte-----------------------------------
FROM nginx:alpine
COPY --from=node /app/dist/ejemploCompilador /usr/share/nginx/html
EXPOSE 80