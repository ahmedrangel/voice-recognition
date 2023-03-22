import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
const App = () => {
  const {
    transcript,
    listening,
    interimTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'es-AR' });
  }
  let palabras = interimTranscript.split(" ");
  let count = (transcript.match(/boludo/g) || []).length;
  console.log("boludos-transcript-"+count);
  
  let audio = document.getElementById("audio");
  if (listening === true) {
    for (let i = 0; i < palabras.length; i++) {
      if ((palabras[i] === "boludo")) {
        audio.play(); 
      }
    }
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
      <p>{interimTranscript}</p>
      <p>Contador de boludos: {count}</p>
      <audio id="audio" controls>
        <source type="audio/mp3" src="/dijiste-boludo.mp3"></source>
      </audio>
    </div>
  );
};
export default App;
