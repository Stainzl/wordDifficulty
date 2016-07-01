/**
 * Created by Michael on 01.07.2016.
 */

var Word = (function ($, window){
    "use strict";

    var LetterValue = { "a": 5, "b": 11, "c": 9, "d": 6, "e": 1, "f": 11, "g": 9, "h": 7, "i": 4, "j": 13, "k": 11, "l": 9, "m": 10, "n": 3, "o": 10, "p": 13, "q": 15, "r": 4, "s": 4, "t": 5, "u": 6, "v": 13, "w": 11, "x": 15, "y": 15, "z": 11, "ä": 5, "ö": 5, "ü": 5 };
    var WordValueThresholds = [50, 100, 150, 200];
    var words;
    var direction = 1;

    function levelcomp(a,b){
        if(a.level.value>b.level.value){
            return (direction * 1);
        }
        else if(a.level.value<b.level.value){
            return (direction * -1);
        }
        return 0;
    }

    function wordsLoaded(data){
        var wordLower;
        console.log("Wörter geladen");
        words = data.split(/\r\n|\n|\r/).map(function (word) {
            word = word.replace("ß", "ss");
            wordLower = word.toLowerCase();
            return {word: word, level: wordLevel(wordLower)};
        });
        words.sort(levelcomp);
        words.forEach(function(word,index,array){
            //console.log(word.level);
            $("#"+word.level.level)[0].appendChild(document.createTextNode(word.word + " " + word.level.value + " " + word.level.x + " (" + word.level.chars.length + ")"));
            $("#"+word.level.level)[0].appendChild(document.createElement("br"));
        });
    }

    function wordLevel(word){
        var i, x;
        var level = 0;
        var wordValue = 0;
        var chars = [];
        //console.log(WordValueThresholds.length);
        word = word.split("");
        for (i = 0; i < word.length; ++i){

            if (jQuery.inArray(word[i],chars) === -1) {
                chars.push(word[i]);
                wordValue = wordValue + LetterValue[word[i]];
            }
        }
        x = (word.length + chars.length*2) / 3;
        wordValue = wordValue * ((2.84138*Math.pow(10,-4)*Math.pow(x,4))+(-0.0174815347*Math.pow(x,3))+(0.3999311992*Math.pow(x,2))+(-4.118219251*x)+(16.93973598));
        for (i = 0; i < WordValueThresholds.length; i++) {
            if (Math.round(wordValue) > WordValueThresholds[i]) {
                level = i + 2;
            }
        }
        if(level == 0) {
            level = 1;
        }
        //console.log(level+"Bei return");
        return {value: wordValue, chars: chars, level: level, x: x};
    }

    function start(){
        $.ajax({
            url: "data/de-alle.txt",
            method: "GET",
            type: "text/plain",
            success: wordsLoaded
        })
    }

    function test(){
        WordValueThresholds.forEach(function (value,index,array){
            console.log(Number(value));
        });
        console.log(WordValueThresholds);
    }

    return {
        start: start,
        test: test
    }
})($,window);

$(window).ready(Word.start);
//$(window).ready(test);

function test(){
    console.log($("#"+(1+1))[0].innerHTML);
    $("#"+(1+1))[0].innerHTML = $("#"+(1+1))[0].innerHTML + "test";
}