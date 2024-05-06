# Stage 1: Build Angular app
FROM node 
WORKDIR /front


# Copiez les fichiers de package.json et package-lock.json
COPY package*.json ./

# installer les dependances
RUN npm install -g @angular/cli
# RUN npm install --force
RUN npm install bootstrap --force
RUN npm install ngx-toastr --save --force
RUN npm install boxicons --force
RUN npm install @angular-devkit/build-angular --force

COPY . .

RUN npm run build --prod

EXPOSE 4200

# FROM nginx
# COPY --from=node /app/dist/myfirst-app /usr/share/nginx/html

CMD ["ng", "serve" ,"--host", "0.0.0.0"]

