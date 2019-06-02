import React, { PureComponent } from 'react';
import Header from './components/header/Header';
import Card from './components/card/Card';
import GameOver from './components/card/GameOver';

import './styles/main.css';

const shuffle = require('shuffle-array'),
    collection = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen'];



    class App extends PureComponent {

  state = { 
    isFlipped: Array(16).fill(false),
    shuffledCard: App.duplicateCard().sort(() => Math.random() - 0.5),
    clickCount: 1,
    prevSelectedCard: -1,
    prevCardId: -1,
    isClicked: false,
    score: 0
  };

  static duplicateCard = () => {
    return [0,1,2,3,4,5,6,7].reduce((preValue, current, index, array) => {
      return preValue.concat([current, current])
    },[]);
  };

  handleClick = event => {
    event.preventDefault();
    const cardId = event.target.id;
    const cardValue = event.target.value;
    const newFlipps = this.state.isFlipped.slice();
    const newScore = this.state.score + parseInt(cardValue)
    this.setState({
        prevSelectedCard: this.state.shuffledCard[cardId],
        prevCardId: cardId,
        score: newScore
       

    }); 
    
   console.log(this.state.score)
   console.log(newScore)

    if (newFlipps[cardId] === false) {
      newFlipps[cardId] = !newFlipps[cardId];
      this.setState({ 
        isFlipped: newFlipps,
        clickCount: 2
      });

      if (this.state.clickCount === 2) {
        this.setState({ 
          clickCount: 1 });
        const prevCardId = this.state.prevCardId;
        const newCard = this.state.shuffledCard[cardId];
        const previousCard = this.state.prevSelectedCard;

        this.isCardMatch(previousCard, newCard, prevCardId, cardId);
      }
    }
  
  };

  isCardMatch = (card1, card2, card1Id, card2Id) => {
    if (card1 === card2) {
      const hideCard = this.state.shuffledCard.slice();
      hideCard[card1Id] = -1;
      hideCard[card2Id] = -1;
      setTimeout(() => {
        this.setState({
          shuffledCard: hideCard
        })
      }, 1000);
    } else {
      const flipBack = this.state.isFlipped.slice();
      const randomDeduction = Math.floor(Math.random() * 10) + 5
      flipBack[card1Id] = false;
      flipBack[card2Id] = false;
      setTimeout(() => {
        this.setState({ 
          isFlipped: flipBack,
          score: this.state.score - randomDeduction });
      }, 1000);
    }
  };

  restartGame = () => {
    this.setState({
      isFlipped: Array(16).fill(false),
      shuffledCard: App.duplicateCard().sort(() => Math.random() - 0.5),
      clickCount: 1,
      prevSelectedCard: -1,
      prevCardId: -1,
      score: 0
    });
  };


tallyScore = () =>{
  return this.state.score
}

  render() {


    
shuffle(collection);
 

    return (
     <div>
       
       <Header restartGame={this.restartGame} />
       
       <p> Score: {this.tallyScore()}</p>
       <div className="grid-container">
          {
            this.state.shuffledCard.map((cardNumber, index) => 
              <Card
                key={index} 
                id={index} 
                cardImage= {collection[index]}
                cardNumber={cardNumber} 
                isFlipped={this.state.isFlipped[index]} 
                handleClick={this.handleClick} 
               
                
                  
              />
            )
          }
        </div>
       

       
     </div>
    );
  }
}

export default App;


