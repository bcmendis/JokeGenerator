import { useEffect, useState } from "react";
import classes from "./App.module.css";

import Joke from "./components/Joke";
import bruh from "./assets/bruh.mp3";
import bong from "./assets/bong.mp3";
import bonk from "./assets/bonk.mp3";
import discord from "./assets/discord.mp3";
import error from "./assets/error.mp3";
import omg from "./assets/omg.mp3";
import rizz from "./assets/rizz.mp3";
import spongebob from "./assets/spongebob.mp3";
import vine from "./assets/vine.mp3";
import wow from "./assets/wow.mp3";
import yeet from "./assets/yeet.mp3";
import Gpt from "./components/Gpt";

const sounds = [
  bong,
  bonk,
  bruh,
  discord,
  error,
  omg,
  rizz,
  spongebob,
  vine,
  wow,
  yeet,
];

let isInitial = true;

function App() {
  const [joke, setJoke] = useState("");
  const [mute, setMute] = useState(true);

  useEffect(() => {
    if (isInitial) {
      getJoke();
      isInitial = false;
    }
  }, []);

  const play = () => {
    const effect = sounds[Math.floor(Math.random() * sounds.length)];
    new Audio(effect).play();
  };

  let timer;
  const getJoke = async () => {
    if (timer) {
      clearTimeout(timer);
    }
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    setJoke(data.joke);
    if (!mute) timer = setTimeout(play, 500);
  };

  const muteHandler = () => {
    setMute(!mute);
  };

  return (
    <div className={classes.app}>
      <header className={classes.header}>Joke Generator</header>
      <main className={classes.main}>
        <Joke joke={joke} />
        <div className={classes.buttonContainer}>
          <div className={classes.jokeButton} onClick={getJoke}>
            Tell me a joke!
          </div>
          <div onClick={muteHandler}>Mute</div>
        </div>
        <Gpt />
      </main>
    </div>
  );
}

export default App;
