import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./StemmerPorter";
import StemmerPorter from "./StemmerPorter";

var destination = document.querySelector("#container");

ReactDOM.render(
    <div>
        <StemmerPorter/>
    </div>,
    destination
);
