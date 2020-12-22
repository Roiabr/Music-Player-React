import React,{useState, useRef} from "react";
//import style
import "./Styles/App.scss"
import data from './data'

import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
    //State
    const [songInfo, setSongInfo] = useState({
      currentTime:0,
      duration:0,
      animationPercentage:0,
    });
    const timeUpdateHandler = (e) => {
      const current = e.target.currentTime;
      const duration = e.target.duration;
      const roundedCurrent = Math.round(current);
      const roundedDuration = Math.round(duration);
      const animation = Math.round((roundedCurrent / roundedDuration) * 100);
      setSongInfo({...songInfo, currentTime:current, duration,animationPercentage:animation});
    };
    const audioRef = useRef(null)
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [libraryState, setLibraryState] = useState(false);
    
    const songEndHandler = async () => {
      let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      if(isPlaying) audioRef.current.play();
    }
    return ( 
      <div className={`App ${libraryState ? "library-active" : ""}`}>
        <Nav libraryState={libraryState} setLibraryState={setLibraryState} />
        <Song currentSong={currentSong} />
        <Player songs={songs} setSongInfo={setSongInfo} songInfo={songInfo} audioRef={audioRef} setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong} setSongs={setSongs}/>
        <Library setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} libraryState={libraryState} />
        <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio} onEnded={songEndHandler}></audio>

      </div>
    );
}

export default App;