# Utilisez une image Node.js comme base
FROM node

# Définissez le répertoire de travail dans le conteneur
WORKDIR /back

# Copiez les fichiers de package.json et package-lock.json
COPY package*.json ./
# COPY adminer.css /home/adminer

# Installez les dépendances
RUN npm install
# RUN npm install mysql
# RUN npm install multer
# RUN npm install express
# RUN npm install cors
# RUN npm install aws-sdk
# RUN npm install crypto

# Copiez tous les autres fichiers
COPY . .

# Exposez le port sur lequel le serveur écoute
EXPOSE 3100


# Commande de démarrage du serveur
CMD ["node" ,"index.js"]

