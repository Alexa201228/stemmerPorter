import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./StemmerPorter";
import StemmerPorter from "./StemmerPorter";

var destination = document.querySelector("#container");

ReactDOM.render(
    <div>
        <h1>Стеммер Портера</h1>
        <StemmerPorter/>
    </div>,
    destination
);
