# FROM node:12

# WORKDIR /app

# COPY . .

# RUN npm install 

# EXPOSE 3000

# ENTRYPOINT npm start

FROM node:12 AS  builder

WORKDIR /app 

COPY . .      

RUN npm install

RUN npm run build


FROM nginx:latest

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build  .

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d

ENTRYPOINT [ "nginx" , "-g" , "daemon off;" ]







