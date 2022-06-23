import express from "express";
import fetch from "node-fetch";
import path from "path";
import moment from "moment";
import schedule from "node-schedule";

import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let randomIndex = Math.floor(Math.random() * 10);
let tomorrow = moment().add(1, "day");

schedule.scheduleJob("* 59 23 * * *", function () {
  randomIndex = Math.floor(Math.random() * 10);
  tomorrow = moment().add(1, "day");
  console.log(`Random index: ${randomIndex} tomorrow: ${tomorrow}`);
});

// Have Node serve the files for our built React app
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/api/random_track", async (req, res) => {
  const data = await fetch(
    "https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=spain&api_key=4edd125cb9c86539211a2ab327676660&format=json"
  );
  const top50 = await data.json();
  const randomTrack = top50.tracks.track[randomIndex];
  console.log({
    name: randomTrack.name,
    artist: randomTrack.artist.name,
    image: randomTrack.image[1]["#text"],
    tomorrow: tomorrow,
  });
  res.json({
    name: randomTrack.name,
    artist: randomTrack.artist.name,
    image: randomTrack.image[1]["#text"],
    tomorrow: tomorrow,
  });
});

app.get("/api/top_tracks", async (req, res) => {
  const data = await fetch(
    "https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=spain&api_key=4edd125cb9c86539211a2ab327676660&format=json"
  );
  const top50 = await data.json();
  res.json(
    top50.tracks.track.map((track) => ({
      name: track.name,
      artist: track.artist.name,
    }))
  );
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
