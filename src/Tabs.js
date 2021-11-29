import React, {useState, useEffect} from "react";
import "./App.css";
import Component from "./Component";

var selectGenger =[];
var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;

function Tabs() {

    const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
    const BASE_URL = 'https://api.themoviedb.org/3';
    const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY + '&page=1';
    const searchURL = BASE_URL + '/search/movie?'+API_KEY;   
    
    const [items, setItems] = useState([]);
    const [change, setChange] = useState([]);
    const [index, setIndex] = useState();

    function Select(i){
      
        if(selectGenger.length === 0){
            selectGenger.push(i);
        }
        else{
            if(selectGenger.includes(i)){
                selectGenger.forEach((id,idx) =>{
                    if(id === i)
                    {
                        selectGenger.splice(idx,1);
                    }
                })
            }else{
                selectGenger.push(i);
            }
        }
        setChange(prevState => prevState.map(element => ({
          ...element,
          state: element.id === i ? !element.state : element.state
        })));
        if(selectGenger.length === 0){
          getMovie(API_URL);
        }else{
          getMovie(API_URL + '&with_genres='+encodeURI(selectGenger.join(',')));
          
        } 
    }
 
    useEffect(() => {
      lastUrl = API_URL;
      fetch(API_URL)
      .then(res => res.json())
      .then((result) => {
        setItems(result.results);
        setIndex(result.page);
         })
         
    }, [])

    useEffect(() => {
      fetch(' https://api.themoviedb.org/3/genre/movie/list?api_key=1cf50e6248dc270629e802686245c2c8')
        .then(res => res.json())
        .then((result) => {
          setChange(result.genres.map(element => ({
            ...element,
            state: false,
          })));
           })
      }, [])

    function getMovie(url){
      console.log(url)
      window.scrollTo(0, 1);
      lastUrl = url;
      fetch(url)
      .then(res => res.json())
      .then((result) => {
        setItems(result.results);
        currentPage = result.page;
        nextPage = currentPage + 1;
        prevPage = currentPage - 1;
        setIndex(result.page);
         })  
    } 

      function Search(e){
        const val = e.target.value;
        if(val) {
          getMovie(searchURL+'&query='+val)
      }else{
          getMovie(API_URL);
      }
      }
      
      function Prev(){
        if(prevPage > 0){
          pageCall(prevPage);
        }
      }

      function Next(){
        if(nextPage <= totalPages){    
          pageCall(nextPage);
        }
      }

      function pageCall(page){
        let st = lastUrl.substring(0, lastUrl.length-1);
        st=st+page;
        getMovie(st);
        
      }

  return (
    <body>
    <header>
        <form  id="form">
            <input type="text" placeholder="Search" id="search" class="search" onChange={Search}/>
        </form> 
    </header> 
        <div id="tags">
            {change.map(item => (
              <div key={item.id} type="button"  onClick={() => Select(item.id)}  class={item.state === false ? 'tag': 'tag_r'} >
                {item.name}
                  </div>
                ))}              
        </div>
        {items.length === 0 ?
        <h1 class="no-results">No Results Found</h1>
        :
        <Component items={items}/>
        }
        <div class="pagination">
        <div onClick={() => Prev()} class={index === 1 ? 'pagedisabled' : 'page'} >Previous Page</div>
        <div class="current" >{index}</div>
        <div type="button" class="page" onClick={() => Next()}>Next Page</div>
    </div>
    </body>
  );
}

export default Tabs;
