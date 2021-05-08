import React, {Component} from "react";
import "./StemmerPorter.css";
import {stemmer} from "./stemmerPorterEngine";


class StemmerPorter extends Component{

    constructor(props){
        super(props);

        this.state = {
            words:{}
        }

        this.stem = this.stem.bind(this);
        this.printResults = this.printResults.bind(this);
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
        this.printResults(dict, word);
        
    }
    printResults(dict, word){
        this._outputElement.value = "";
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
                        <ul>
                            <li><textarea ref={(a) => this._inputElement = a} placeholder="Введите текст для стемминга"></textarea></li>
                            <li> <button type="submit">Ввод</button></li>
                        </ul>
                   </form>
                </div>
                <ul>
                    <li><label>Основа - количество в тексте</label></li>
                    <li><textarea ref={(a) => this._outputElement = a} readOnly></textarea></li>
                </ul>              
            </div>
        );
    }
}

export default StemmerPorter;