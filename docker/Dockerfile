FROM node:alpine

ENV PORT 4000

EXPOSE 4000

WORKDIR /usr/app/backend

COPY . .

RUN yarn install && yarn run build && yarn install --production --ignore-scripts --prefer-offline && yarn cache clean

ENV NODE_ENV production

CMD ["yarn", "start"]