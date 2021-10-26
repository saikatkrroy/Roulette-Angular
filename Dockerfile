# Stage 1
FROM node:latest as build-step
RUN mkdir -p /src/app
WORKDIR /src/app
COPY package.json .
#RUN npm install -g npm
RUN npm install
COPY . .

RUN npm run build
# Stage 2
FROM nginx:latest
#COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /src/app/dist/roulette-angular /usr/share/nginx/html
#CMD ["ng","serve"]
