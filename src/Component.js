import { useState,  useEffect } from "react";
import "./App.css";
import './index';

function Component({ items, isLoaded, error, handleClick }) {

  const [value, setValue] = useState('')
  const [filtered, setFiltered] = useState([])
  
  useEffect(() => {
    setFiltered(value === '' ? items : items.filter(element => element.title.toLowerCase().includes(value.toLowerCase())))
  }, [items, value])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div> 
        <input type="text" placeholder="Search...." onChange={(event) => setValue(event.target.value)} />
        <ul>
        {filtered.map(item =>(
            <li key={item.id} className="butt">
                <img width="150" height="150" src={item.thumbnailUrl}/>
                {item.title}
                <div className="butoon-class">
                  <button id={item.album} onClick={() => handleClick(item.id)}>Like</button>
                </div>
            </li>           
        ))}  
    </ul>
    </div>
    );
  }
}

export default Component;

  