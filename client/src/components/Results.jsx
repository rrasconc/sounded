import React from "react";
import moment from "moment";

import { Section } from "./Section";
import { useLocation } from "react-router-dom";
import { AttemptBox } from "./AttemptBox";
import { Container } from "./Container";
import { Button } from "./Button";

import Countdown from "react-countdown";

const end = moment("2022-06-24");
const now = moment();
const duration = moment.duration(end.diff(now));

export default function Results() {
  const { state } = useLocation();
  const [isClicked, setIsClicked] = React.useState(false);

  const handleShare = () => {
    setIsClicked(true);
    const squares = state.attempts
      .map((attempt) => {
        const isRed = attempt.color.includes("red");
        const isGreen = attempt.color.includes("green");
        return isRed ? "🟥 " : isGreen ? "🟩 " : "⬜️ ";
      })
      .join("");
    const message = `Sounded #1\n\n🔈 ${squares}\n\nsounded.herokuapp.com`;
    navigator.clipboard.writeText(message);
  };

  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold text-slate-700 mt-12">
          The answer was
        </h1>
        <h1 className="text-3xl font-bold text-slate-700 mb-12">
          {`${state.winnerTrack.name} (${state.winnerTrack.artist})`}
        </h1>

        <div className="flex flex-col justify-center my-4">
          {state.attempts.map((attempt) => (
            <div
              key={Math.random()}
              className="flex items-center my-2 p-2 bg-slate-200 rounded-lg px-5"
            >
              <AttemptBox key={Math.random()} color={attempt.color} />
              <span className="ml-6 text-xl text-slate-700">
                {attempt.track}
              </span>
            </div>
          ))}
        </div>

        <h1 className="text-xl text-slate-700">
          Next track:{" "}
          <Countdown date={Date.now() + 1000 * duration.asSeconds()} />
        </h1>

        <Button
          className={`mt-4 hover:scale-110 transition ease-out duration-300 ${
            isClicked && "bg-cyan-600"
          }`}
          onClick={handleShare}
          label={isClicked ? "Copied" : "Share"}
        />
      </Container>
    </Section>
  );
}
