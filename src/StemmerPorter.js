import React, {Component} from "react";
import {stemmer} from "./stemmerPorterEngine";

class StemmerPorter extends Component{

    constructor(props){
        super(props);

        this.state = {
            words:{}
        }

        this.stem = this.stem.bind(this);
    }

    stem(word){
        var text = this._inputElement.value.toLowerCase();
        text = text.replace(/[^а-яё\d\s]+/gi, '');
        var dict = this.state.words;
        var arr = text.split(' ');
        for(var i = 0; i < arr.length; i++){
            if(arr[i] === ""){
                continue;
            }
            var temp = stemmer(arr[i]);
            if(!dict[temp]){
                dict[temp] = 1;
            }
            else{
                dict[temp]++;
            }
        }
        this.setState({
            words:dict
        });

        for(var key in dict){
            this._outputElement.value += key + " - " + dict[key] + "\n";
        }

        this.setState({
            words:{}
        });

        word.preventDefault();
    }

    render(){
        return(
            <div className="stemmerPorterMain">
                <div className="header">
                    <form onSubmit={this.stem}>
                        <textarea ref={(a) => this._inputElement = a} placeholder="Введите текст для стемминга"></textarea>
                        <button type="submit">Ввод</button>
                    </form>
                </div>
                <label>Основа - количество в тексте</label>
                <textarea ref={(a) => this._outputElement = a} readOnly></textarea>
            </div>
        );
    }
}

export default StemmerPorter;