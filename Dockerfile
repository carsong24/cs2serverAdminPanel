FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package*.json /app/

ENV NODE_ENV production

# if not using unraid set these variables here

# ENV RCON_HOST="host/ip"
# ENV RCON_PASS="rconpass"
# ENV RCON_PORT="27015"

EXPOSE 3000

CMD ["npm", "dev"]
