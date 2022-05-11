(function () {
    'use strict';
    // GOAL: make the game war with JS
    // 1. Have constructor for Game, Player, Deck, and Card
    // 2. Must attach methods with prototype chain
    // 3. Must create basic ui

    const cardNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const cardSuits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];



    // this is the card constructor
    function Card({ value, name, suit }) {
        this.value = value;
        this.name = name;
        this.suit = suit;
    }
    //this is the deck constructor
    function Deck({ names, suits }) {
        this.names = names;
        this.suits = suits;
        this.cards = [];

        for (let s = 0; s < this.suits.length; s++) {
            for (let n = 0; n < this.names.length; n++) {
                this.cards.push(new Card({ value: n + 1, name: this.names[n], suit: this.suits[s] }));
            }
        }
        return this.cards;

    }
    // this is the player constructor
    function Player({ name, hand = [], score = 0}) {
        this.name = name;
        this.hand = hand;
        this.score = score;
        // players need to have a name to identify them, and a hand to hold the cards they are dealt
    }
    // this is the game constructor
    function Game({players = [], comparison = []} = {}) {
        this.players = players;
        this.comparison = comparison;
        // game constructor needs to have the players playing the game, and a shuffle function to randomize cards
    }
        Game.prototype.start = function() {
            this.players.push(new Player({name: 'you'}));
            this.players.push(new Player({name: 'BeepBoop'}));
            const deck = new Deck({ names: cardNames, suits: cardSuits });
            this.shuffle(deck);
            console.log(deck);
            this.players[0].hand = deck.cards.slice(0, 26);
            this.players[1].hand = deck.cards.slice(26, 52);
            console.log(this.players[0].hand);
        };
    //--------------------------------------------------------------------------------------------------------------------//


    //-------------------------------------------------------------------------------------------------------------------//
    Game.prototype.shuffle = function (deck) {
        // take deck of cards and randomize their order.
        // function to take two cards and swap places for 1000 turns
        for (let i = 0; i < 1000; i++) {
            let card1 = Math.floor((Math.random() * deck.length));
            let card2 = Math.floor((Math.random() * deck.length));
            let mem = deck[card1];
            deck[card1] = deck[card2];
            deck[card2] = mem;
        }
    }

    /////////////////////////////////////////////////this is where we begin 😼/////////////////////////////////////////////////////////////////////////////////

    const newGame = new Game();
    // console.log(playerOne);
    // console.log(computer);
    // newGame.shuffle(deck);

    // console.log(deck);
    // console.log(newGame.deal(deck));
    newGame.start();

    // now what to do with these shuffled cards?? we need to play the game.... 



})();