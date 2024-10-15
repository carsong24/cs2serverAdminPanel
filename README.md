Simple Rcon admin panel for cs2 built with nextjs.

- npm install

- npm run build

- npm run start

- npm run dev  // for debugging

-------------------------

cs2 server commands you probably want to know, Figured these are probably all anyone needs for this.

  - executing configs - "exec configname"
  - changing map - "changelevel mapname"
  - using workshop maps - "host_workshop_map mapid"

--------------------------
Using Workshop Maps

  - For workshop maps you use frequently you can add them to the workshop map list in the index.tsx file.
  - workshop map ids can be found at the end of the link to a workshop item
  - ie: https://steamcommunity.com/sharedfiles/filedetails/?id=3289507717

--------------------------

Edit index.tsx to change map names as well as config names.

Edit rcon.ts file to reflect your server details.
