#!/bin/ash
cd /app

rm -rf node_modules
rm package-lock.json

npm install

npm start
