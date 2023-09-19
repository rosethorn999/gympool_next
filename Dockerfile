FROM node:lts-alpine
WORKDIR /src/app
COPY . .

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

RUN npm install --only=production && npm run build
CMD ["npm", "run", "start"]