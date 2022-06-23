import React, { useEffect, useState, useRef, useCallback } from "react";
import moment from "moment";

import { Section } from "./Section";
import { useLocation } from "react-router-dom";
import { AttemptBox } from "./AttemptBox";
import { Container } from "./Container";
import { Button } from "./Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Results() {
  const { state } = useLocation();

  const handleShare = () => {
    const squares = state.attempts
      .map((attempt) => {
        const isRed = attempt.color.includes("red");
        const isGreen = attempt.color.includes("green");
        return isRed ? "🟥 " : isGreen ? "🟩 " : "⬜️ ";
      })
      .join("");
    const message = `Sounded #1\n\n🎧${squares}\n\nsounded.herokuapp.com`;
    navigator.clipboard.writeText(message);
  };

  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold text-slate-700 my-12">
          {`The track was: ${state.winnerTrack}`}
        </h1>
        <span className="text-xl text-slate-700">
          Next track:
          <span>{"{{time}}"}</span>
        </span>
        <div className="flex flex-col justify-center my-4">
          {state.attempts.map((attempt) => (
            <div
              key={Math.random()}
              className="flex items-center my-2 p-2 bg-slate-200 rounded-lg"
            >
              <AttemptBox key={Math.random()} color={attempt.color} />
              <span className="ml-6 text-xl text-slate-700">
                {attempt.track}
              </span>
            </div>
          ))}
        </div>
        <Button onClick={handleShare} label="Share" />
      </Container>
    </Section>
  );
}
