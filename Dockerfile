# Gunakan image Node.js resmi sebagai base image
FROM node:18-alpine

# Set working directory dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json ke container
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file dan folder ke working directory dalam container
COPY . .

# Jalankan Prisma migrate dan generate setelah semua file tersalin
RUN npx prisma generate
RUN npx prisma migrate deploy

# Ekspos port yang digunakan aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "server.js"]
