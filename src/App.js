import logo from "./logo.svg";
import "./App.css";
import GameFrame from "./GameFrame/GameFrame";
import AliveCheck from "./components/AliveCheck";
import ServerList from "./components/ServerList";
import Card from "./components/Card.js";
import Button from "@mui/material/Button";
import { requestObsData, requestValidations } from "./service";
import { useEffect, useState } from "react";
import Address from "./components/Address";
import Divider from "@mui/material/Divider";
import { v4 as uuidv4 } from "uuid";
import ComplexButton from "./components/ComplexButton.js";
import axios from "axios";
import { getBalance, mintReward } from "./service/contract";

const id = uuidv4();
const buttonSx = {
  border: 1,
  borderRadius: "0px",
  color: "black",
  fontFamily: "monospace",
  fontWeight: "bold",
  textTransform: "none",
  fontSize: "1.5em",
  width: 400,
  marginRight: 2,
  marginBottom: 2,
};

function App() {
  const [score, setScore] = useState(0);
  const addScore = (score) => {
    setScore((cur) => cur + score);
  };

  const handleValidation = async () => {
    const holdScore = score;
    setScore(0);
    try {
      const signatures = await requestValidations(id, score * 10 ** 18);
      await mintReward(signatures);
    } catch (err) {
      setScore(holdScore);
    }
  };

  return (
    <div style={{ fontFamily: "monospace", justifyContent: "center" }}>
      <div style={{ padding: 10, minWidth: 800, textAlign: "center" }}>
        <h2>session Id : {id}</h2>
        <h2>claimable score : {score}</h2>

        <Button sx={buttonSx} onClick={handleValidation} disabled={score === 0}>
          request validation
        </Button>
      </div>
      <header className="App-header">
        <GameFrame addScore={addScore} />
      </header>
      <ServerList />
    </div>
  );
}

export default App;
