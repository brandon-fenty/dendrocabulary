import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import questions from './data/questions.json';

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flip, setFlip] = useState(false)
  const [height, setHeight] = useState('initial')

  const frontEl = useRef()
  const backEl = useRef()

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height
    const backHeight = backEl.current.getBoundingClientRect().height
    setHeight(Math.max(frontHeight, backHeight, 100))
  }
  
  const flashcards = Object.keys(questions).map(v => ({
      key: v,
      ...questions[v]
  }));

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  useEffect(setMaxHeight, [
    flashcards[currentCardIndex].image_url,
    flashcards[currentCardIndex].question,
    flashcards[currentCardIndex].answer])
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  }, [])

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
            style={{ height: height }}
            onClick={() => setFlip(!flip)}
          >
              <div className='front' ref={frontEl}>
                {/* <image url={flashcards[currentCardIndex].image.url} /> */}
                {flashcards[currentCardIndex].question}
              </div>
              <div className='back' ref={backEl}>
                {/* <image url={flashcards[currentCardIndex].image.url} /> */}
                {flashcards[currentCardIndex].answer}
              </div>
          </div>
        </div>
      )}
      <div className="button-container">
        <button className='btn' onClick={handlePrevCard}>Previous</button>
        <button className='btn' onClick={handleNextCard}>Next</button>
      </div>
    </div>
  );
};

export default App;
