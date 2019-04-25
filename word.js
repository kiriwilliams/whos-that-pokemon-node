const Letter = require("./letter.js");

function Word(){
    this.letters = [],
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
        console.log(display);
        return display;
    },
    this.check = function(char){
        for (var i = 0; i < this.letters.length; i ++){
            this.letters[i].check(char);
        }        
    };
}

module.exports = Word;