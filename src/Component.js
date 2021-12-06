import React from "react";
import "./App.css";
import './index';
import { Link } from "react-router-dom";
import Heart from "react-animated-heart";

var value = [];

function Component({ items, handleClick }) {
  const IMG_URL = 'https://image.tmdb.org/t/p/w500'; 

  function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}
    function Call(i, fav) {
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
    
    return (
      
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
                      <Heart isClick={item.isFavorite} onClick={() => Call(item.id, item.isFavorite)} />
                      </div>                        
                    </div> 
                </div>               
              </div>           
            ))}
        </main>
      
        
    );
  }

export default Component;

  