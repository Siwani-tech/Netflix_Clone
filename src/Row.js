import React, { useEffect, useState } from 'react';
import axios from './axios';
import requests from './request';
import "./Row.css";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';



const base_url = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setmovies] = useState([]);

  const [trailerUrl, settrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setmovies(request.data.results);
      console.log(request.data.results);
      return requests;
    }
    fetchData();
  }, [fetchUrl]);

  console.log(movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const hancleClick = (movie) => {
    if (trailerUrl) {
      settrailerUrl("");
    }
    else {
      movieTrailer(movie?.name || "")
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          settrailerUrl(urlParams.get('v'));//http://youtube.com/sag?v=28w7nadbjsasha(it will take after v line)
        }).catch(error => console.error());
    }
  }


  return (
    <div className="row">
      {/* title */}
      <h2>{title}</h2>

      <div className="row_posters">
        {/* row-posters */}
        {movies.map(movie => (

          <img key={movie.id}
            onClick={() => hancleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name} />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row
