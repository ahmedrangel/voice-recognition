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
  let interim = "";
  let palabras = interimTranscript.split(" ");
  let count1 = (transcript.match(/boludo/g) || []).length;
  let count2 = (transcript.match(/boluda/g) || []).length;
  let count = count1 + count2;
  console.log("boludos-transcript-"+count);
  
  let audio = document.getElementById("audio");
  if (listening === true) {
    for (let i = 0; i < palabras.length; i++) {
      if ((palabras[i] === "boludo")) {
        audio.play(); 
      }
    }
  }

  if (interimTranscript !== "") {
    interim = "Interim: " + interimTranscript;
  } else {
    interim = "";
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <div class="my-5">
      <p class="mb-2">Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p class="my-2">Contador: {count}</p>
      <div id="transcript" class="m-3 p-4">{transcript}</div>
      <p id="interim" class="mx-3"><i>{interim}</i></p>
      <audio id="audio" controls>
        <source type="audio/mp3" src="/dijiste-boludo.mp3"></source>
      </audio>
    </div>
  );
};
export default App;
