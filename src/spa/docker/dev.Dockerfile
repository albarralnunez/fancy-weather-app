# Dockerfile for dev
FROM node:latest

EXPOSE 8081

WORKDIR /bindmount     

COPY ./ ./
RUN npm install --no-progress --ignore-optional
CMD npm run dev
