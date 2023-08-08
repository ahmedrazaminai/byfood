FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apk add --no-cache --update \
      apache2-utils

COPY . .
RUN npm run build


# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production


# Copy built assets from `builder` image
COPY --from=build /app/build /usr/share/nginx/html

# Add your nginx.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]