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
  var count = 0;
  var palabras = transcript.split(" ");
  var indicePalabra = palabras.indexOf("boludo");
  var palabra = palabras[indicePalabra];
  console.log(palabra);

  if (SpeechRecognition.startListening) {
    for (var i = 0; i < palabras.length; i++) {
      if (palabras[i] === "boludo" || palabras[i] === "boludear") {
        var audio = document.getElementById("audio");
        audio.play();
        count++;
      }
    }
  }

  if (SpeechRecognition.stopListening) {
    var audio = document.getElementById("audio");
    audio.pause();

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
      <p>{palabra}</p>
      <audio id="audio" controls>
        <source type="audio/mp3" src="/voice-recognition/dijiste-boludo.mp3"></source>
      </audio>
    </div>
  );
};
export default App;
