const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");




const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");

const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");


const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});





// client.on('messageDeleteBulk')





client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: false, //idk when i need to change it lul
  emitAddSongWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true,
    }),
  ],
});

client.commands = new Collection();
client.config = require("./config");

module.exports = client;
process.on('unhandledRejection', (err) => {
  console.error('An unhandled rejection occurred:', err);
});
process.on('uncaughtException', (err) => {
  console.error('An unhandled exception occurred:', err);
});
client.login(client.config.token).then(() => {
  loadEvents(client);
  loadCommands(client);
});
