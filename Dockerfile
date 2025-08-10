# usar o node mas dar um nome para ele como builder
FROM node:22 as builder
# cria pasta
WORKDIR /app
# copia diretorio atual
COPY . .
# instala dependencias
RUN npm install
# builda a aplicacao
RUN npm run build

# importa o nginx
FROM nginx:alpine
# copia o que esta no builder no caminhoque foi buildado e cola no diretorio html de nginx
COPY --from=builder /app/dist/projeto-financeiro/browser usr/share/nginx/html
# copia o nginx da aplicaco para configura o ngnix
COPY nginx.conf /etc/nginx/nginx.conf
# copia o mime.types da aplicaco para configura o ngnix
COPY mime.types /etc/nginx/mime.types
# expoe aplicacao na porta 80
EXPOSE 4201
# executa comando para iniciar a aplicacao
CMD [ "nginx", "-g", "daemon off;" ]
