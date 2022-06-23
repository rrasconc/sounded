import React, { useEffect } from "react";

import { Section } from "./Section";
import { useLocation } from "react-router-dom";
import { AttemptBox } from "./AttemptBox";
import { Container } from "./Container";
import { Button } from "./Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Results() {
  const { state } = useLocation();

  const handleClick = () => {
    let message = "Sounded #\nSong";
    navigator.clipboard.writeText(message);
  };

  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold text-slate-700 my-12">
          {"The answer was: {{winnerTrack}}"}
        </h1>
        <div className="flex flex-col justify-center my-4">
          {state.attempts.map((attempt) => (
            <div
              key={Math.random()}
              className="flex items-center my-2 p-2 bg-slate-200 rounded-lg"
            >
              <AttemptBox key={Math.random()} color={attempt.color} />
              <span className="ml-6 text-xl">{attempt.track}</span>
            </div>
          ))}
        </div>
        <Button onClick={handleClick} label="Share" />
      </Container>
    </Section>
  );
}
