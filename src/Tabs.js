import {useEffect, useState} from "react";
import "./App.css";
import Component from './Component';
  
function Tabs() {
  const [toggleState, setToggleState] = useState(1);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  function handleClick(id) {
    setItems(prevState => prevState.map(element => ({
      ...element,
      isFavourite: element.id === id ? !element.isFavourite : element.isFavourite
    })))
  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos?albumId=1")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);

          console.log(result)
          setItems(result.map(element => ({
            ...element,
            isFavourite: false,
          })));
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="container">
      
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Photos
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Favorite
        </button>
      </div>

      <div className="content-tabs">
        {
          toggleState === 1
          ? <div
              className={"content  active-content"}>
              <Component
                items={items}
                isLoaded={isLoaded}
                error={error}
                handleClick={handleClick}
              />
            </div>
          : <div
              className={"content  active-content"}>
              <Component
                items={items.filter(element => element.isFavourite === true)}
                isLoaded={isLoaded}
                error={error}
                handleClick={handleClick}
              />
            </div>
        }
      </div>
    </div>
  );
}

export default Tabs;
