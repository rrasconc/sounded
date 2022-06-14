import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/random_track", async (req, res) => {
  const data = await fetch(
    "https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=spain&api_key=4edd125cb9c86539211a2ab327676660&format=json"
  );
  const top50 = await data.json();
  const randomTrack = top50.tracks.track[Math.floor(Math.random() * 50)];
  res.json({
    name: randomTrack.name,
    artist: randomTrack.artist.name,
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
