FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

WORKDIR /etc/nginx/conf.d

COPY . .    

ENTRYPOINT ["nginx", "-g" , "daemon off;"]