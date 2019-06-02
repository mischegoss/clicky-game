
import React from 'react';
import Popup from "reactjs-popup";

const Header = ({ restartGame }) => (
<div>

<h1 className="justify-center"> Clicky Game 2.0 </h1>
<div id="menu-outer">
  <div className="table">
  <ul id="horizontal-list">
  <li><Popup trigger={<button className="button directions"> HOW TO PLAY </button>} modal>
    {close => (
      <div className="modal">
        <a className="close" href="#" onClick={close}>
          &times;
        </a>
        <div className="header"> How to Play </div>
        <div className="content">
          {' '}
          Clicky Game 2.0 is a Memory Card Game with a twist. You earn points by clicking on 
          the cards but watch out if don't have a match, you can end up losing a random number of 
          points! 
          <br />
          To make it a little harder, the images on the cards keep shifting. Have fun! 
          The object of the game is to clear the board with the most points!
        </div>
        <div className="actions">
       
          <button
            className="button"
            onClick={() => {
              console.log('modal closed ')
              close()
            }}
          >
            Let's play! 
          </button>
        </div>
      </div>
    )}
  </Popup> </li>

     <li><button onClick={restartGame} className="restart-button">RESTART GAME</button> </li>
    
    </ul>
    </div>
    </div>
  </div>
);

export default Header;