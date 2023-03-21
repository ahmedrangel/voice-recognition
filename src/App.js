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

  for (var i = 0; i < palabras.length; i++) {
    if (palabras[i] === "boludo") {
      count++;
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
      <p>{count}</p>
      <p>{palabra}</p>
    </div>
  );
};
export default App;
