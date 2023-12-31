// //import { useState } from 'react'
// import "./App.css";
// import LogIn from "./components/LogIn";
// import Preview from "./components/Previews";
// import Seasons from "./components/Seasons";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// function App() {
//   //const [count, setCount] = useState(0)

//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route path="/" element={<LogIn />} />
//           <Route path="/preview" element={<Preview />} />
//           <Route path="/season/:podcastId" element={<Seasons />} />
//         </Routes>
//       </Router>
//     </>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';

import { Header } from './components/Header'
import { Carousal } from './components/Carousal'
import { PodcastPreview } from './components/Podcast-Preview'
import  Footer  from './components/Footer'
import {CircularProgress } from '@mui/material';




 
type AllShowData = Array<ShowPreview>;
type ShowOriginalData = Array<Show>

type ShowPreview = {
  id: string;
  title: string;
  description: string;
  image: string;
  seasons: Seasons;
  genres: Array<string>;
  updated: Date;
};


type Show = {
  id: string;
  title: string;
  description: string;
  image: string;
  seasons: number;
  genres: Array<number>;
  updated: Date;
};

type Seasons = [
  season: number,
  title: string,
  image: string,
  episodes: Array<Episodes>,
]

type Episodes = [
  title: string,
  description: string,
  episode: number,
  file: string,
];



export const App: React.FC = () => {
  const [podcastData, setPodcastData] = useState<ShowOriginalData>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Added a state variable to track loading status



  useEffect(() => {
    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response: Response = await fetch('https://podcast-api.netlify.app/shows');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await response.json() as ShowOriginalData;
        setPodcastData(json)

         // Set isLoading to false after data fetching is complete
         setIsLoading(false);
      }
      catch (error) {
        console.log('Error fetching data:', error);
         setIsLoading(false);
      }
    };
    
    void fetchData();
  }, []);

    const showId = podcastData.flatMap((show) =>{
        return(
          show.id
        )
    })
  
  return (
    <div>
       {/* Conditional rendering based on isLoading */}
      {isLoading ? (
        <div className="loading__container">
        <CircularProgress size={40} color="inherit" className="loading__open"/> 
       </div> 
        ) : ( 
       <div>
        <Header />
        <br></br>
        <Carousal 
         data = {podcastData} 
        />
        <br></br>
        <PodcastPreview
         data= {podcastData}
         showIds={showId}
        // favorites={favorites}
        // setFavorites={setFavorites}
        />
        <Footer/>
        
       </div>
       )
     }
    </div>
  )
}



