import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import "./App.css";
import { Link } from "react-router-dom";
import Heart from "react-animated-heart";
import Fav from './Fav';

var selectGenger =[];
var value = [];

function Info() {
    const { id } = useParams()
    const [movie, setMovie] = useState([]);
    const [items, setItems] = useState([]);

    value = JSON.parse(localStorage.getItem('item'));
    const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
    const BASE_URL = 'https://api.themoviedb.org/3/movie/';
    const searchURL = BASE_URL + id + "?" + API_KEY;
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
    const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&'+ API_KEY;

    function Movie(url){
        window.scrollTo(0, 1);
        fetch(url)
        .then(res => res.json())
        .then((result) => {
          setMovie(result);
          result.genres.map(e => selectGenger.push(e.id));
          getMovie(API_URL + '&with_genres='+encodeURI(selectGenger.join(',')));
          selectGenger=[];
           })
    
      } 

    function getMovie(url){
        window.scrollTo(0, 1);
        fetch(url)
        .then(res => res.json())
        .then((result) => {
          setItems(result.results);
           })
    
      } 

      function handleClick(id) {
        setItems(prevState => prevState.map(element => ({
          ...element,
          isFavorite: element.id === id ? !element.isFavorite : element.isFavorite,
        })))           
      }

    function Call(i) {
        handleClick(i);
        if(value.length === 0){
          value.push(i);
      }
      else{
          if(value.includes(i)){
              value.forEach((id,idx) =>{
                  if(id === i)
                  {
                      value.splice(idx,1);
                  }
              })
          }else{
              value.push(i);
          }
      }
        localStorage.setItem('item', JSON.stringify(value))
      }

    useEffect(() => {
        fetch(searchURL)
            .then(res => res.json())
            .then((result) => {
                setMovie(result);
                result.genres.map(e => selectGenger.push(e.id));
                getMovie(API_URL + '&with_genres='+ encodeURI(selectGenger.join(',')));
                selectGenger=[];
            })

    }, [])

    function getColor(vote) {
        if (vote >= 8) {
            return 'green'
        } else if (vote >= 5) {
            return "orange"
        } else {
            return 'red'
        }
    }


    return (
        <div>
            <div class="like">
                <button class="know-more"><Link to={`/`}>Back</Link></button>
                <button class="know-more"><Link to={`/fav`}>Favorite</Link></button>   
            </div>
            <main id="main">
                <div class="movie_inf">
                    <div class="a">
                        <div class="movie-info_inf">
                            <h1>{movie.title}</h1>
                            <span class={getColor(movie.vote_average)}>{movie.vote_average}</span>
                        </div>
                        <div class="b">
                            <img src={movie.poster_path ? IMG_URL + movie.poster_path : "http://via.placeholder.com/1080x1580"} style={{ height: `450px` }} alt={movie.title} class="img_inf" /> 
                            <div class="info_inf">
                                 <p style={{margin: `20px`, paddingLeft: `5px`, border: `2px solid black`}}> <b>Original Title :&nbsp;&nbsp;</b>{movie.original_title} </p>
                                 <p style={{margin: `20px`, paddingLeft: `5px`,border: `2px solid black`}}> <b>Release Date :&nbsp;&nbsp;</b>{movie.release_date} </p>
                                 <p style={{margin: `20px`, paddingLeft: `5px`,border: `2px solid black`}}> <b>Runtime :&nbsp;&nbsp;</b>{movie.runtime} min.</p>
                                 <p style={{display:`flex`, paddingLeft: `5px`,margin: `20px`, border: `2px solid black`}}> <b>Genres :</b>
                                 {movie?.genres?.map(item => (
                                        <p key={item.id} >
                                               &nbsp;"{item.name}"
                                        </p>           
                                        ))}</p> 
                                 <p style={{display:`flex`, margin: `20px`,paddingLeft: `5px`, border: `2px solid black`}}> <b>Production Countries    :</b>
                                 {movie?.production_countries?.map(item => (
                                        <p key={item.id} >
                                               &nbsp;"{item.name}"
                                        </p>           
                                        ))}</p>                                                                                                             
                                 <p style={{display:`flex`, margin: `20px`,paddingLeft: `5px`, border: `2px solid black`}}> <b>Spoken Languages :</b>
                                 {movie?.spoken_languages?.map(item => (
                                        <p key={item.id} >
                                               &nbsp;"{item.name}"
                                        </p>           
                                        ))}</p>     
                                 <p style={{margin: `20px`,paddingLeft: `5px`, border: `2px solid black`}}> <b>Revenue :&nbsp;&nbsp;</b>{movie.revenue} $</p>       
                                 <Heart isClick={movie.isFavorite} onClick={() => Call(movie.id)} />                  
                            </div>
                        </div>
                        <div>
                        <h3>Overview</h3>
                         {movie.overview}                                    
                        </div>
                        <h3>Same films</h3>
                    </div> 
                    <div class="z">
                    {items.map(item => (
              <div key={item.id}  class="movie">
                <img src={item.poster_path? IMG_URL + item.poster_path : "http://via.placeholder.com/1080x1580"} alt={item.title}/>
                <div class="movie-info">
                    <h3>{item.title}</h3>
                    <span class={getColor(item.vote_average)}>{item.vote_average}</span>
                </div>  
                <div class="overview">
                    <h3>Overview</h3>
                    {item.overview}
                    <br/>
                <div class="fav">
                      <div class="know">
                      <button class="know-more" onClick={() =>Movie(BASE_URL + item.id + "?" + API_KEY)}>Info</button>  
                      </div>               
                      <div class="heart">
                      <Heart isClick={item.isFavorite} onClick={() => Call(item.id)} />
                      </div>                        
                    </div>        
                 </div>
              </div>           
            ))}
                    </div>
                </div>
            </main>

        </div>
    )
}

export default Info
