# Stage 1
FROM node:latest as build-step
RUN mkdir -p /src/app
WORKDIR /src/app
COPY package.json /src/app
RUN npm install -g npm
RUN npm install
COPY . /src/app
RUN npm run build --prod
# Stage 2
FROM nginx:latest
COPY --from=build-step /app/docs /usr/share/nginx/html
#CMD ["ng","serve"]
