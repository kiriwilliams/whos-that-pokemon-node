function Letter(char){
    this.letter = char,
    this.guessed = false,
    this.show = function(){
        if(this.guessed){
            //reveal letter
            return this.letter;
        }
        else{
            //show underscore
            return "_";
        }
    },
    this.check = function(guess){
        var guess = guess;
        //set guessed to true if guess matches letter
        if (this.letter == guess){
            this.guessed = true;
        }
    }
}
module.exports = Letter;