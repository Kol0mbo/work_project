import React, {useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import Heart from "react-animated-heart";

var value = [];

function Fav() {

    value = JSON.parse(localStorage.getItem('item'));
    const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
    const BASE_URL = 'https://api.themoviedb.org/3/movie/';
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
    const [items, setItems] = useState([]);

    useEffect(() => {
        value.forEach(element => {
            fetch(BASE_URL + element + "?" + API_KEY)
            .then(res => res.json())
            .then((result) => {
                setItems(items => [...items, result]);  
            }) 
            
        });   
        value= [];         
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
    
    function getMovie(){
        setItems([]);
        value.forEach(element => {
            fetch(BASE_URL + element + "?" + API_KEY)
            .then(res => res.json())
            .then((result) => {
                setItems(items => [...items, result]);  
            }) 
        
        });  
        value= [];    
      } 
      
    function Call(i) {
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
            getMovie();
        }
      
    return (    
        <div>
            <div class="like">
                <button class="know-more"><Link to={`/`}>Back</Link></button>
            </div>
            {items.length === 0 ?
        <h1 class="no-results">No Favorite Films</h1>
        :
        <main id="main">
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
                      <button class="know-more"><Link to={`/info/${item.id}`}>Info</Link></button>  
                      </div>               
                      <div class="heart">
                      <Heart isClick={item.isFavorite} onClick={() => Call(item.id)} />
                      </div>                        
                    </div> 
                </div>               
              </div>           
            ))}
        </main>
        }
        </div>
    )
}

export default Fav
