#!/bin/bash

# Detener PM2
pm2 stop all

# Dejamos el repo limpio, sin cambios.
echo "Limpiamos repo---->"
git reset --hard

# Traemos novedades del repo
echo "Actualizamos repo---->"
git pull origin master

# Traemos novedades del submódulo
echo "Actualizamos submódulo---->"
cd ./flinder-server-keys
git pull origin master
cd ..

# Sobreescribimos las variables de entorno
echo "Actualizamos .env---->"
rm .env
cp ./flinder-server-keys/.env .env

# Actualizamos dependencias de Node.js
echo "Actualizamos dependencias Node.js---->"
npm i

# Ejecutamos el server como servicio PM2
echo "Ejecutamos el server---->"
pm2 start index.js

echo "Server running!"

