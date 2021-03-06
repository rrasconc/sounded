import React from "react";
import moment from "moment";
import YouTube from "react-youtube";

import { faMagnifyingGlass, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import { AttemptBox } from "./AttemptBox";
import { Button } from "./Button";
import { Container } from "./Container";
import { Section } from "./Section";
import { Loader } from "./Loader";
import { SoundEffect } from "./SoundEffect";
import { Navbar } from "./Navbar";

const attempts = [
  { id: 1, color: "bg-slate-300" },
  { id: 2, color: "bg-slate-300" },
  { id: 3, color: "bg-slate-300" },
  { id: 4, color: "bg-slate-300" },
  { id: 5, color: "bg-slate-300" },
  { id: 6, color: "bg-slate-300" },
];

export const Game = () => {
  const [selectedTrack, setSelectedTrack] = React.useState("");
  const [winnerTrack, setWinnerTrack] = React.useState("");
  const [trackList, setTrackList] = React.useState([]);
  const [filteredTrackList, setFilteredTrackList] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const [isLoading, setIsLoading] = React.useState(false);

  const [message, setMessage] = React.useState("Guess the song !");

  const [currentAttempt, setCurrentAttempt] = React.useState(1);
  const [attemptsList, setAttemptsList] = React.useState(attempts);

  const [player, setPlayer] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [songBlock, setSongBlock] = React.useState(0.6);

  const navigate = useNavigate();

  const getResults = async () => {
    const today = new Date();
    const results = {
      attempts: attemptsList,
      winnerTrack: winnerTrack,
      date: today,
    };
    localStorage.setItem("results", JSON.stringify(results));
    setTimeout(() => {
      navigate("results", {
        state: results,
      });
    }, 1000);
  };

  const fetchRandomTrack = async () => {
    setIsLoading(true);
    fetch("/api/random_track")
      .then((res) => res.json())
      .then((data) => setWinnerTrack(data))
      .finally(() => {
        setIsLoading(false);
      });
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
    attemptsList[currentAttempt - 1].track = selectedTrack;
    setSongBlock((prev) => prev + 3);

    if (selectedTrack === winnerTrack.name) {
      setMessage("You guessed the song !");
      attemptsList[currentAttempt - 1].color = "bg-green-500";
      setAttemptsList([...attemptsList]);
    } else {
      setMessage("Wrong guess !");
      attemptsList[currentAttempt - 1].color = "bg-red-500";
      setAttemptsList([...attemptsList]);
    }
    setTimeout(() => {
      setMessage("Guess the song !");
    }, 1500);

    if (currentAttempt === 6 || selectedTrack === winnerTrack.name) {
      getResults();
      return;
    }

    setSelectedTrack("");
    setCurrentAttempt(currentAttempt + 1);
  };

  const handleClick = (winnerTrack) => {
    setSelectedTrack(winnerTrack);
    resetSearch();
  };

  const handleTab = () => {
    setSelectedTrack(filteredTrackList[0].name);
    resetSearch();
  };

  const resetSearch = () => {
    setFilteredTrackList([]);
    setCurrentIndex(0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab" || e.key === "Enter") {
      e.preventDefault();
      handleTab();
    }
    if (e.key === "ArrowDown") {
      console.log(filteredTrackList[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }
    if (e.key === "ArrowUp") {
      console.log(filteredTrackList[currentIndex]);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const fetchResults = async () => {
    const results = JSON.parse(localStorage.getItem("results"));
    if (results) {
      const resultsDate = results.date.split("T")[0];
      const diff = moment().diff(resultsDate, "days");
      if (diff === 0) {
        navigate("results", {
          state: results,
        });
      }
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    player.seekTo(songBlock);
    player.playVideo();
    setTimeout(() => {
      player.pauseVideo();
      setIsPlaying(false);
    }, 4000);
  };

  React.useEffect(() => {
    fetchResults();
    fetchRandomTrack();
    fetchTrackList();
  }, []);

  return (
    <>
      <Navbar />
      <Section>
        {isLoading ? (
          <Loader />
        ) : (
          <Container>
            <h1 className="md:text-3xl text-2xl font-bold text-slate-700 my-12">
              {message}
            </h1>
            {/** Track player start*/}
            <YouTube
              className="hidden"
              videoId={"9GkVhgIeGJQ"}
              onReady={(e) => {
                setPlayer(e.target);
              }}
            />
            <FontAwesomeIcon
              icon={faPlay}
              size="2xl"
              className={`${
                isPlaying && "hidden"
              } cursor-pointer hover:scale-125 hover:shadow-2xl transition ease-out duration-300 mr-2 text-emerald-500`}
              onClick={handlePlay}
            />

            <SoundEffect className={isPlaying === false && "hidden"} />
            {/** Track player end*/}

            <div className="flex justify-center my-4">
              {attempts.map((attempt) => (
                <AttemptBox key={Math.random()} color={attempt.color} />
              ))}
            </div>

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
                  handleKeyDown(e);
                }}
                placeholder="Search for a song"
                onChange={(e) => handleChange(e)}
                value={selectedTrack}
                type="text"
                className="text-xl w-full ml-3 text-slate-800 focus:outline-none focus:shadow-outline"
              />
              <Button label="Try !" />
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
          </Container>
        )}
      </Section>
    </>
  );
};
