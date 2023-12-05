import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import questions from './data/questions.json';

const unshufCards = Object.keys(questions).map(v => ({
  key: v,
  ...questions[v]
}));

function shuffle(arr) {
  var ctr = arr.length,
    temp,
    index;
  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr--;
    temp = arr[ctr];
    arr[ctr] = arr[index];
    arr[index] = temp;
  }
  return arr;
}

function App() {
  const refresh = () => window.location.reload(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flip, setFlip] = useState(false)
  const [flashcards, setFlashcards] = useState(unshufCards);

  useEffect(() => {
    const mountCards = shuffle(unshufCards);
    setFlashcards(mountCards);
  }, []);

  function handleShuffle() {
    const changes = shuffle([...flashcards]);
    setFlashcards(changes);
    console.log("Shuffle", unshufCards);
  }

  const frontEl = useRef()
  const backEl = useRef()

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  const imageName = flashcards[currentCardIndex].image_url;
  console.log(imageName)

  return (
    <div className="app">
      <div className='header'>
        <div className='title'>
            <h1>Dendrocabulary</h1>
            <h2 className='sub-title'>A Study Aid for Tree and Shrub Identification</h2>
        </div>
      </div>
      {flashcards.length > 0 && (
        <div className='container'>
          <div className= {`card ${flip ? 'flip' : ''}`}
            style={{ height: 400}}
            onClick={() => setFlip(!flip)}
          >
              <div className='front' ref={frontEl}>
                <img className='card-img' src={require(`./images/${imageName}`)}></img>
                <br/>
                <div className='card-text'>
                  {flashcards[currentCardIndex].question}
                </div>
              </div>
              <div className='back' ref={backEl}>
                <img className='card-img' src={require(`./images/${imageName}`)}></img>
                <br/>
                <div className='card-text'>
                  {flashcards[currentCardIndex].answer}
                </div>
              </div>
          </div>
        </div>
      )}
      <div className="button-container">
        <button className='btn' onClick={handlePrevCard}>Previous Card</button>
        <button className='btn' onClick={handleNextCard}>Next Card</button>
        <button className='btn' onClick={handleShuffle}>Shuffle</button>
      </div>
    </div>
  );
};

export default App;
