(function () {
    'use strict';
    // GOAL: make the game war with JS
    // 1. Have constructor for Game, Player, Deck, and Card
    // 2. Must attach methods with prototype chain
    // 3. Must create basic ui

    const $playButton = document.querySelector('.play-game');
    const $playerCard = document.querySelector('#player-score');
    const $robotCard = document.querySelector('#robot-score');
    const $refreshMessage = document.querySelector('.refresh');
    const $playerAmount = document.querySelector('.player-card-amount');
    const $robotAmount = document.querySelector('.robot-card-amount');
    const $arena = document.querySelector('#contest');
    const $playerHand = document.querySelector('.player-hand-amount');
    const $robotHand = document.querySelector('.robot-hand-amount');


    const cardNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const cardSuits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
    const contestArr = [];


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
    function Player(name) {
        this.name = name;
        this.hand = [];
    }
    // this is the game constructor
    function Game() {
        this.players = [];
    }
    //--------------------------------------------------------------------------------------------------------------------//

    // BElOW ARE PROTOTYPE CHAINS //

    //-------------------------------------------------------------------------------------------------------------------//
    Game.prototype.start = function () {
        this.players.push(new Player({ name: 'you' }));
        this.players.push(new Player({ name: 'BeepBoop' }));

        const deck = new Deck({ names: cardNames, suits: cardSuits });
        this.shuffle(deck);
        this.deal(deck);
    };
    Game.prototype.shuffle = function (deck) {
        // take deck of cards and randomize their order.
        // function to take two cards and swap places for 1000 turns
        let m = deck.length, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            [deck[m], deck[i]] = [deck[i], deck[m]];
        }
    }
    
    
    Game.prototype.deal = function (deck) {
        for (let i = (deck.length / 2); i--;) {
            this.players[0].hand.push(deck.pop());
            this.players[1].hand.push(deck.pop());
        }
        
    }
    
    /////////////////////////////////////////////////this is where we begin 😼/////////////////////////////////////////////////////////////////////////////////
    
    const newGame = new Game();
    newGame.start();
    const playerOne = newGame.players[0];
    const robot = newGame.players[1];
    // now what to do with these shuffled cards?? we need to play the game.... 
    // we need to compare the two values of cards on the top of the decks
    // whichever card is higher, that player takes both cards
    // add both cards to that players hand
    
    function compare(player, computer) {
        checkIfOut()
        let pValue = player.value;
        let rValue = computer.value;
        if (pValue > rValue) {
            // adds cards to winners hand
            playerOne.hand.push(computer);
            playerOne.hand.push(player);
            // removes cards from losers hand
            playerOne.hand.shift();
            robot.hand.shift();
        } else if (pValue < rValue) {
            robot.hand.push(player);
            robot.hand.push(computer);
            robot.hand.shift();
            playerOne.hand.shift();
        } else {
            $playButton.disabled = true;
            $playButton.classList.add = 'hidden';
            updateWarStatus();
            setTimeout(() => {
                war();
            }, 2000);
        }
    }


    function war() {
        let length = 0;
        console.log('WAR', playerOne.hand.length)
        console.log('WAR', robot.hand.length)
        // add three cards from each players hands to contestArr and compare the values of the current cards.
        if (playerOne.hand.length < 5 || robot.hand.length < 5) {
            if (playerOne.hand.length > robot.hand.length) {
                length = robot.hand.length - 1;
            } else if (playerOne.hand.length < robot.hand.length) {
                length = playerOne.hand.length - 1;
            }
        }
        else {
            length = 3;
        }
        for (let i = 0; i < length; i++) {
            contestArr.push(playerOne.hand[0]);
            playerOne.hand.shift();
            contestArr.push(robot.hand[0]);
            robot.hand.shift();
        }
        setTimeout(() => {
            compareWar(playerOne.hand[0], robot.hand[0]);
        }, 3000);
    }

    function compareWar(player, computer) {
        checkIfOut();
        let pValue = player.value;
        let rValue = computer.value
        // when war is called check values of top cards to determine winner
        if (pValue > rValue) {
            playerOne.hand.push.apply(playerOne.hand, contestArr);
            playerOne.hand.push(robot.hand[0]);
            playerOne.hand.push(playerOne.hand[0]);
            playerOne.hand.shift();
            robot.hand.shift();
            $arena.textContent = `You took all the cards!!! 🤩`;
        } else if (pValue < rValue) {
            robot.hand.push.apply(robot.hand, contestArr);
            robot.hand.push(robot.hand[0]);
            robot.hand.push(playerOne.hand[0]);
            playerOne.hand.shift();
            robot.hand.shift();
            $arena.textContent = '🤖 took your cards!!! 😵‍💫';
        } else {
            war();
        }
        contestArr.length = 0;
        setTimeout(() => {
            $playButton.disabled = false;
            revertWarStatus();
        }, 2000);
    }


    function checkIfOut() {
        //checks if either player is out of cards
        if (playerOne.hand.length === 0) {
            debugger;
            $playerAmount.innerHTML = '😢';
            $playerCard.value = '';
            $robotCard.value = 'I WIN HAHA';
            $playButton.style.visibility ='hidden';
            $refreshMessage.style.visibility = 'visible';
            return;
        } else if (robot.hand.length === 0) {
            debugger;
            $robotAmount.innerHTML = '🤖: sad beep boop';
            $robotCard.value = '';
            $playerCard.value = 'You Win!'
            $playButton.style.visibility ='hidden';
            $refreshMessage.style.visibility = 'visible';
            return;
        } else {
            return;
        }
    }

    $playButton.onclick = function () {
        compare(playerOne.hand[0], robot.hand[0]);
        $playerCard.value = `${playerOne.hand[0].name} of ${playerOne.hand[0].suit}`;
        $robotCard.value = `${robot.hand[0].name} of ${robot.hand[0].suit}`;
        // $playerAmount.innerHTML = `${playerOne.hand.length}`;
        // $robotAmount.innerHTML = `${robot.hand.length}`;
        updateHand(playerOne); 
        updateHand(robot);
    }

    // ======================== CALLBACK FUNCTIONS ===================================//

    function updateWarStatus() {
        $arena.classList.remove('hidden');
        $arena.textContent = 'Cards have been added to the WAR arena!';
    }

    function revertWarStatus() {
        $arena.classList.add('hidden');
        $arena.textContent = '';
    }

    function updateHand(player) {
        let handAmount = player.hand.length;
        if (player === robot) {
            $playerHand.style.height = `${handAmount}vh`;
        } else {
            $robotHand.style.height = `${handAmount}vh`;
        }
    }

})(); 