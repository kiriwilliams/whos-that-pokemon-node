const Letter = require("./letter.js");

function Word(){
    this.letters = [],
    this.cleared = false,
    this.load = function(word){
        for (var i = 0; i < word.length; i++){
            this.letters.push(new Letter(word[i]));
        };
    },
    this.update = function(){
        var display = "";
        for (var i = 0; i < this.letters.length; i ++){
            display += this.letters[i].show() + " ";
        }
        if(display.indexOf("_") === -1){
            this.cleared = true;
        }
        console.log(display);
        return display;
    },
    this.check = function(char){
        var correct = false;
        for (var i = 0; i < this.letters.length; i ++){
            var guessCheck = this.letters[i].check(char);
            if(guessCheck){
                correct = true;
            }
        }
        return correct;
               
    };
}

module.exports = Word;