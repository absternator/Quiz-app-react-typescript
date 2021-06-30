import React, { useState } from "react";
import "react-dropdown/style.css";
import { Difficulty, Catagory } from "../API";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@material-ui/core";

interface Props {
  startTrivia(catagory: Catagory, difficulty: Difficulty): void;
}

function StartingForm({ startTrivia }: Props) {
  const catagories = Object.keys(Catagory).filter((key) => isNaN(Number(key))); // get all catagories
  const difficulties = Object.keys(Difficulty);
  //States
  const [catagory, setCatagory] = useState<Catagory>();
  const [dificulty, setDifficulty] = useState<Difficulty>();
  // Functions
  /**
   * Respond to change in catagory
   * @param e the drop down list of catagory chosen
   */
  function changeCatagory(event: React.ChangeEvent<{ value: unknown }>) {
    setCatagory(event.target.value as Catagory);
  }

  const changeDifficulty = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDifficulty(event.target.value as Difficulty);
  };

  return (
    <div>
      <h3>Start Game ? Pick Catagory and difficulty to begin</h3>
      <FormControl>
        <InputLabel id="demo-simple-select-helper-label">Catagory</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={catagory ? catagory : ""}
          onChange={changeCatagory}
        >
          {catagories.map((cat, index) => (
            <MenuItem key={index} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Pick a catagory of Quiz Questions</FormHelperText>
      </FormControl>
      <FormControl style={{ marginLeft: "20px" }}>
        <InputLabel id="demo-simple-select-helper-label">Difficulty</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={dificulty ? dificulty : ""}
          onChange={changeDifficulty}
        >
          {difficulties.map((dif, index) => (
            <MenuItem key={index} value={dif}>
              {dif}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Pick a diffoculty of questions</FormHelperText>
      </FormControl>
      <div>
        {catagory && dificulty && (
          <button
            className="start"
            onClick={() => startTrivia(catagory, dificulty)}
          >
            {" "}
            Start Quiz
          </button>
        )}
      </div>
    </div>
  );
}

export default StartingForm;
