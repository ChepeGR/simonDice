const round= document.getElementById('round');
const simonButtons= document.getElementsByClassName('square');
const startButton= document.getElementById('startButton');

class Simon{
    constructor(simonButtons,round,startButton){
        this.round = 0;
        this.userPosition= 0;
        this.totalRounds= 10;
        this.sequence= [];
        this.speed=1000;
        this.blockedButtons= true;
        this.buttons= Array.from(simonButtons);
        this.display={
            startButton,
            round
        }
        this.errorSound = new Audio('/Users/chepegarciariboldi/Downloads/error.wav');
        this.buttonSound=[
            new Audio('/Users/chepegarciariboldi/Downloads/1.mp3'),
            new Audio('/Users/chepegarciariboldi/Downloads/2.mp3'),
            new Audio('/Users/chepegarciariboldi/Downloads/3.mp3'),
            new Audio('/Users/chepegarciariboldi/Downloads/4.mp3'),
        ]
    }


init() {
    this.display.startButton.onclick = () => this.startGame();
}

startGame() {
    this.display.startButton.disabled = true;
    this.updateRound(0);
    this.userPosition= 0;
    this.sequence = this.createSecuence();
    this.buttons.forEach((element, i)=>{
        element.classList.remove('winner');
        element.onclick = () => this.buttonClick(i);
    });
    this.showSequence();
}

updateRound(value) {
    this.round= value;
    this.display.round.textContent= `Round ${this.round}`;
}

createSecuence(){
    return Array.from({lenght: this.totalRounds}, () => this.getRandomColor());
}

getRandomColor(){
    return Math.floor(Math.random() * 4);

}

buttonClick(value){
    !this.blockedButtons && this.validateChoseColor(value);
}

validateChoseColor(){
    if(this.sequence[this.userPosition] === value){
        this.buttonSound[value].play();
        if(this.round === this.userPosition){
            this.updateRound(this.round + 1);
            this.speed /= 1.02;
            this.isGameOver();
        }
    }else{
        this.gameLost();
    }
}
isGameOver(){
    if(this.round === this.totalRounds ){
        this.gameWon();
    }else{
        this.userPosition=0;
        this.showSequence();
    }

}

showSequence(){
    this.blockedButtons = true;
    let sequenceIndex = 0;
    let timer= setInterval(()=>{
        const button = this.buttons[this.sequence[sequenceIndex]];
        this.buttonSound[this.sequence[sequenceIndex]].play();
        this.toggleButtonStyle(button)
        setTimeout( () => this.toggleButtonStyle(button), this.speed / 2)
        sequenceIndex++;
        if(sequenceIndex > this.round){
            this.blockedButtons = false;
            clearInterval(timer)
         }

    }, this.speed);
}
toggleButtonStyle(button){
    button.classList.toggle('active');
}
gameLost(){
    this.errorSound.play();
    this.display.startButton.disabled = false;
    this.blockedButtons = true;
}
gameWon(){
    this.display.startButton.disabled = false;
    this.blockedButtons= true;
    this.buttons.forEach(element =>{
        element.classList.add('winner');
    });
    this.updateRound('WIN');

}
}
const simon = new Simon(simonButtons, startButton,round);
simon.init();