# Stage 1: Build Angular app
FROM node
WORKDIR /front


# Copiez les fichiers de package.json et package-lock.json
COPY package*.json ./

# installer les dependances
RUN npm install -g @angular/cli
# RUN npm install
# RUN ng build --force
RUN npm install bootstrap --force
RUN npm install ngx-toastr --save --force
RUN npm install boxicons --force

COPY . .

EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]

