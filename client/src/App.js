import "./App.css";
import React from "react";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const attempts = [
  { id: 1, color: "bg-slate-300" },
  { id: 2, color: "bg-slate-300" },
  { id: 3, color: "bg-slate-300" },
  { id: 4, color: "bg-slate-300" },
  { id: 5, color: "bg-slate-300" },
  { id: 6, color: "bg-slate-300" },
];

const App = () => {
  const [selectedTrack, setSelectedTrack] = React.useState("");
  const [winnerTrack, setWinnerTrack] = React.useState("");
  const [trackList, setTrackList] = React.useState([]);
  const [filteredTrackList, setFilteredTrackList] = React.useState([]);

  const [message, setMessage] = React.useState("Guess the song !");

  const [currentAttempt, setCurrentAttempt] = React.useState(1);
  const [attemptsList, setAttemptsList] = React.useState(attempts);

  const fetchRandomTrack = async () => {
    fetch("/api/random_track")
      .then((res) => res.json())
      .then((data) => setWinnerTrack(data.name));
  };

  const fetchTrackList = async () => {
    fetch("/api/top_tracks")
      .then((res) => res.json())
      .then((data) => setTrackList([...data]));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedTrack(value);
    if (value === "") {
      setFilteredTrackList([]);
      return;
    }
    const filtered = trackList.filter((winnerTrack) =>
      winnerTrack.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredTrackList([...filtered]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedTrack === winnerTrack) {
      setMessage("You guessed the song !");
      setAttemptsList([
        ...attemptsList,
        (attempts[currentAttempt - 1].color = "bg-green-500"),
      ]);
    } else {
      setMessage("Wrong guess !");
      setAttemptsList([
        ...attemptsList,
        (attempts[currentAttempt - 1].color = "bg-red-500"),
      ]);
      setTimeout(() => {
        setMessage("Guess the song !");
      }, 1500);
    }

    setSelectedTrack("");
    setCurrentAttempt(currentAttempt + 1);
  };

  const handleClick = (winnerTrack) => {
    setSelectedTrack(winnerTrack);
    setFilteredTrackList([]);
  };

  const handleTab = () => {
    setSelectedTrack(filteredTrackList[0].name);
    setFilteredTrackList([]);
  };

  React.useEffect(() => {
    fetchRandomTrack();
    fetchTrackList();
  }, []);

  return (
    <main className="App">
      <section className="flex flex-1 flex-col bg-slate-100 min-h-screen min-w-screen">
        <div className="md:w-3/5 md:max-w-lg self-center mt-12">
          <h1 className="text-5xl font-bold text-slate-700 my-12">{message}</h1>

          <div className="flex justify-center my-4">
            {attempts.map((attempt) => (
              <span
                key={attempt.id}
                className={`h-8 w-8 mx-1 ${attempt.color}  rounded-md`}
              ></span>
            ))}
          </div>

          <audio controls autoPlay className="w-full">
            <source src={require("./assets/block_1.mp3")} type="audio/mpeg" />
          </audio>

          {/* searchbar start */}
          <form
            className={`flex p-1 justify-around items-center mt-4 bg-white ${
              filteredTrackList.length > 0
                ? "border-t-2 border-l-2 border-r-2 rounded-t-xl"
                : "border-2 rounded-xl"
            } border-gray-200 shadow-lg shadow-slate-200`}
            onSubmit={handleSubmit}
          >
            {!selectedTrack && (
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size="lg"
                className="self-center text-slate-200 ml-2"
              />
            )}
            <input
              onKeyDown={(e) => {
                if (e.key === "Tab" || e.key === "Enter") {
                  e.preventDefault();
                  handleTab();
                }
              }}
              placeholder="Search for a song"
              onChange={(e) => handleChange(e)}
              value={selectedTrack}
              type="text"
              className="text-xl w-full ml-3 text-slate-800 focus:outline-none focus:shadow-outline"
            />
            <button className="bg-cyan-500 transition-colors hover:bg-cyan-600 text-white w-24 p-1 rounded-lg text-lg font-bold">
              Try !
            </button>
          </form>
          <div
            className={`${
              filteredTrackList.length > 0 ? "flex flex-col" : "hidden"
            }  h-34 p-1 mb-4 bg-white border-b-2 border-l-2 border-r-2 border-gray-200 shadow-lg shadow-slate-200 rounded-b-xl z-20 relative`}
          >
            {filteredTrackList.map((track) => (
              <span
                onClick={() => handleClick(track.name)}
                key={Math.random()}
                className="text-left text-xl text-slate-800 px-4 py-2 border-t-2 border-gray-50 hover:cursor-pointer hover:bg-gray-100"
              >
                {track.name}
              </span>
            ))}
          </div>
        </div>
        {/* searchbar start */}

        <footer className="bg-slate-200 p-2 bottom-0 fixed w-full z-10">
          <a
            href="https://www.github.com/rigobertorascon"
            className="text-slate-800 text-md"
          >
            Github
          </a>
        </footer>
      </section>
    </main>
  );
};

export default App;
