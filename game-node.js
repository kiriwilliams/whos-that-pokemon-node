const Word = require("./word.js");
const inquirer = require("inquirer");
var playing = false;
var currentWord = "";
var alreadyGuessed = [];
var guessesRemaining = 9;

var wordBank = [];
loadBank();
//Populate the wordList array
function loadBank() {
    wordBank = ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidorina", "Nidoqueen", "Nidoran", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch’d", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew", "Chikorita", "Bayleef", "Meganium", "Cyndaquil", "Quilava", "Typhlosion", "Totodile", "Croconaw", "Feraligatr", "Sentret", "Furret", "Hoothoot", "Noctowl", "Ledyba", "Ledian", "Spinarak", "Ariados", "Crobat", "Chinchou", "Lanturn", "Pichu", "Cleffa", "Igglybuff", "Togepi", "Togetic", "Natu", "Xatu", "Mareep", "Flaaffy", "Ampharos", "Bellossom", "Marill", "Azumarill", "Sudowoodo", "Politoed", "Hoppip", "Skiploom", "Jumpluff", "Aipom", "Sunkern", "Sunflora", "Yanma", "Wooper", "Quagsire", "Espeon", "Umbreon", "Murkrow", "Slowking", "Misdreavus", "Unown", "Wobbuffet", "Girafarig", "Pineco", "Forretress", "Dunsparce", "Gligar", "Steelix", "Snubbull", "Granbull", "Qwilfish", "Scizor", "Shuckle", "Heracross", "Sneasel", "Teddiursa", "Ursaring", "Slugma", "Magcargo", "Swinub", "Piloswine", "Corsola", "Remoraid", "Octillery", "Delibird", "Mantine", "Skarmory", "Houndour", "Houndoom", "Kingdra", "Phanpy", "Donphan", "Porygon2", "Stantler", "Smeargle", "Tyrogue", "Hitmontop", "Smoochum", "Elekid", "Magby", "Miltank", "Blissey", "Raikou", "Entei", "Suicune", "Larvitar", "Pupitar", "Tyranitar", "Lugia", "Ho-Oh", "Celebi", "Treecko", "Grovyle", "Sceptile", "Torchic", "Combusken", "Blaziken", "Mudkip", "Marshtomp", "Swampert", "Poochyena", "Mightyena", "Zigzagoon", "Linoone", "Wurmple", "Silcoon", "Beautifly", "Cascoon", "Dustox", "Lotad", "Lombre", "Ludicolo", "Seedot", "Nuzleaf", "Shiftry", "Taillow", "Swellow", "Wingull", "Pelipper", "Ralts", "Kirlia", "Gardevoir", "Surskit", "Masquerain", "Shroomish", "Breloom", "Slakoth", "Vigoroth", "Slaking", "Nincada", "Ninjask", "Shedinja", "Whismur", "Loudred", "Exploud", "Makuhita", "Hariyama", "Azurill", "Nosepass", "Skitty", "Delcatty", "Sableye", "Mawile", "Aron", "Lairon", "Aggron", "Meditite", "Medicham", "Electrike", "Manectric", "Plusle", "Minun", "Volbeat", "Illumise", "Roselia", "Gulpin", "Swalot", "Carvanha", "Sharpedo", "Wailmer", "Wailord", "Numel", "Camerupt", "Torkoal", "Spoink", "Grumpig", "Spinda", "Trapinch", "Vibrava", "Flygon", "Cacnea", "Cacturne", "Swablu", "Altaria", "Zangoose", "Seviper", "Lunatone", "Solrock", "Barboach", "Whiscash", "Corphish", "Crawdaunt", "Baltoy", "Claydol", "Lileep", "Cradily", "Anorith", "Armaldo", "Feebas", "Milotic", "Castform", "Kecleon", "Shuppet", "Banette", "Duskull", "Dusclops", "Tropius", "Chimecho", "Absol", "Wynaut", "Snorunt", "Glalie", "Spheal", "Sealeo", "Walrein", "Clamperl", "Huntail", "Gorebyss", "Relicanth", "Luvdisc", "Bagon", "Shelgon", "Salamence", "Beldum", "Metang", "Metagross", "Regirock", "Regice", "Registeel", "Latias", "Latios", "Kyogre", "Groudon", "Rayquaza", "Jirachi", "Deoxys", "Turtwig", "Grotle", "Torterra", "Chimchar", "Monferno", "Infernape", "Piplup", "Prinplup", "Empoleon", "Starly", "Staravia", "Staraptor", "Bidoof", "Bibarel", "Kricketot", "Kricketune", "Shinx", "Luxio", "Luxray", "Budew", "Roserade", "Cranidos", "Rampardos", "Shieldon", "Bastiodon", "Burmy", "Wormadam", "Mothim", "Combee", "Vespiquen", "Pachirisu", "Buizel", "Floatzel", "Cherubi", "Cherrim", "Shellos", "Gastrodon", "Ambipom", "Drifloon", "Drifblim", "Buneary", "Lopunny", "Mismagius", "Honchkrow", "Glameow", "Purugly", "Chingling", "Stunky", "Skuntank", "Bronzor", "Bronzong", "Bonsly", "Mime Jr.", "Happiny", "Chatot", "Spiritomb", "Gible", "Gabite", "Garchomp", "Munchlax", "Riolu", "Lucario", "Hippopotas", "Hippowdon", "Skorupi", "Drapion", "Croagunk", "Toxicroak", "Carnivine", "Finneon", "Lumineon", "Mantyke", "Snover", "Abomasnow", "Weavile", "Magnezone", "Lickilicky", "Rhyperior", "Tangrowth", "Electivire", "Magmortar", "Togekiss", "Yanmega", "Leafeon", "Glaceon", "Gliscor", "Mamoswine", "Porygon-Z", "Gallade", "Probopass", "Dusknoir", "Froslass", "Rotom", "Uxie", "Mesprit", "Azelf", "Dialga", "Palkia", "Heatran", "Regigigas", "Giratina", "Cresselia", "Phione", "Manaphy", "Darkrai", "Shaymin", "Arceus", "Victini", "Snivy", "Servine", "Serperior", "Tepig", "Pignite", "Emboar", "Oshawott", "Dewott", "Samurott", "Patrat", "Watchog", "Lillipup", "Herdier", "Stoutland", "Purrloin", "Liepard", "Pansage", "Simisage", "Pansear", "Simisear", "Panpour", "Simipour", "Munna", "Musharna", "Pidove", "Tranquill", "Unfezant", "Blitzle", "Zebstrika", "Roggenrola", "Boldore", "Gigalith", "Woobat", "Swoobat", "Drilbur", "Excadrill", "Audino", "Timburr", "Gurdurr", "Conkeldurr", "Tympole", "Palpitoad", "Seismitoad", "Throh", "Sawk", "Sewaddle", "Swadloon", "Leavanny", "Venipede", "Whirlipede", "Scolipede", "Cottonee", "Whimsicott", "Petilil", "Lilligant", "Basculin", "Sandile", "Krokorok", "Krookodile", "Darumaka", "Darmanitan", "Maractus", "Dwebble", "Crustle", "Scraggy", "Scrafty", "Sigilyph", "Yamask", "Cofagrigus", "Tirtouga", "Carracosta", "Archen", "Archeops", "Trubbish", "Garbodor", "Zorua", "Zoroark", "Minccino", "Cinccino", "Gothita", "Gothorita", "Gothitelle", "Solosis", "Duosion", "Reuniclus", "Ducklett", "Swanna", "Vanillite", "Vanillish", "Vanilluxe", "Deerling", "Sawsbuck", "Emolga", "Karrablast", "Escavalier", "Foongus", "Amoonguss", "Frillish", "Jellicent", "Alomomola", "Joltik", "Galvantula", "Ferroseed", "Ferrothorn", "Klink", "Klang", "Klinklang", "Tynamo", "Eelektrik", "Eelektross", "Elgyem", "Beheeyem", "Litwick", "Lampent", "Chandelure", "Axew", "Fraxure", "Haxorus", "Cubchoo", "Beartic", "Cryogonal", "Shelmet", "Accelgor", "Stunfisk", "Mienfoo", "Mienshao", "Druddigon", "Golett", "Golurk", "Pawniard", "Bisharp", "Bouffalant", "Rufflet", "Braviary", "Vullaby", "Mandibuzz", "Heatmor", "Durant", "Deino", "Zweilous", "Hydreigon", "Larvesta", "Volcarona", "Cobalion", "Terrakion", "Virizion", "Tornadus", "Thundurus", "Reshiram", "Zekrom", "Landorus", "Kyurem", "Keldeo", "Meloetta", "Genesect", "Chespin", "Quilladin", "Chesnaught", "Fennekin", "Braixen", "Delphox", "Froakie", "Frogadier", "Greninja", "Bunnelby", "Diggersby", "Fletchling", "Fletchinder", "Talonflame", "Scatterbug", "Spewpa", "Vivillon", "Litleo", "Pyroar", "Flabébé", "Floette", "Florges", "Skiddo", "Gogoat", "Pancham", "Pangoro", "Furfrou", "Espurr", "Meowstic", "Honedge", "Doublade", "Aegislash", "Spritzee", "Aromatisse", "Swirlix", "Slurpuff", "Inkay", "Malamar", "Binacle", "Barbaracle", "Skrelp", "Dragalge", "Clauncher", "Clawitzer", "Helioptile", "Heliolisk", "Tyrunt", "Tyrantrum", "Amaura", "Aurorus", "Sylveon", "Hawlucha", "Dedenne", "Carbink", "Goomy", "Sliggoo", "Goodra", "Klefki", "Phantump", "Trevenant", "Pumpkaboo", "Gourgeist", "Bergmite", "Avalugg", "Noibat", "Noivern", "Xerneas", "Yveltal", "Zygarde", "Diancie", "Hoopa", "Volcanion", "Rowlet", "Dartrix", "Decidueye", "Litten", "Torracat", "Incineroar", "Popplio", "Brionne", "Primarina", "Pikipek", "Trumbeak", "Toucannon", "Yungoos", "Gumshoos", "Grubbin", "Charjabug", "Vikavolt", "Crabrawler", "Crabominable", "Oricorio", "Cutiefly", "Ribombee", "Rockruff", "Lycanroc", "Wishiwashi", "Mareanie", "Toxapex", "Mudbray", "Mudsdale", "Dewpider", "Araquanid", "Fomantis", "Lurantis", "Morelull", "Shiinotic", "Salandit", "Salazzle", "Stufful", "Bewear", "Bounsweet", "Steenee", "Tsareena", "Comfey", "Oranguru", "Passimian", "Wimpod", "Golisopod", "Sandygast", "Palossand", "Pyukumuku", "Type: Null", "Silvally", "Minior", "Komala", "Turtonator", "Togedemaru", "Mimikyu", "Bruxish", "Drampa", "Dhelmise", "Jangmo-o", "Hakamo-o", "Kommo-o", "Tapu Koko", "Tapu Lele", "Tapu Bulu", "Tapu Fini", "Cosmog", "Cosmoem", "Solgaleo", "Lunala", "Nihilego", "Buzzwole", "Pheromosa", "Xurkitree", "Celesteela", "Kartana", "Guzzlord", "Necrozma", "Magearna", "Marshadow", "Poipole", "Naganadel", "Stakataka", "Blacephalon", "Zeraora", "Meltan", "Melmetal"];
    //Make all the words lowercase
    for (var i = 0; i < wordBank.length; i++) {
        wordBank[i] = wordBank[i].toLowerCase();
    }
}

//Pick a random word from the word list
function pickWord() {
    //select a random number between 0 and the length of Word List
    var randomNumber = Math.floor(Math.random() * wordBank.length);
    var currentWord = new Word;
    currentWord.load(wordBank[randomNumber]);
    return currentWord;
}

//WELCOME
console.log("Welcome to Who's That Pokemon!")
inquirer.prompt([
    {
        type: "confirm",
        name: "start",
        message: "Start?"
    }
]).then(function (res) {
    if (res.start) {
        startGame();
    }
});

function startGame() {
    console.log("Who's That Pokemon?");
    playing = true;
    currentWord = pickWord();
    currentWord.update();
    getGuess(currentWord);

}
function getGuess() {
    console.log("getguess");
    if (!playing) {
        console.log("Game Over");
    }
    else {
        inquirer.prompt([
            {
                type: "input",
                name: "guess",
                message: "Make a guess"
            }
        ]).then(function (res) {
            var guess = res.guess;
            console.log("Guesses left: "+guessesRemaining);
            console.log("Already guessed: "+alreadyGuessed);
            if(!alreadyGuessed.includes(guess)){
                guessesRemaining--;
            }
            alreadyGuessed.push(guess);
            currentWord.check(guess);
            currentWord.update();
            if (guessesRemaining < 1){
                console.log("You're out of guesses!");
                playing = false;
            }
            getGuess();
        });
    }
}