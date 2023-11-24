import React from 'react';
import { Collection } from './Collection';
import './index.scss';

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [collections, setCollection] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    setIsLoading(true);
    fetch("data.json").then(res => res.json()).then(json => {
      
      let arr = json.collections;
      let newColl = [];
      
      for (let elem of arr) {
        if(elem.category === categoryId) {
          newColl.push(elem);
        }
      }

      if(!categoryId) {
        setCollection(json.collections)
      } else {
        setCollection(newColl)
      }
      
    }).catch(err => {
      console.log(err);
      alert('Error with DATA')
    }).finally(() => setIsLoading(false));
  }, [categoryId])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj, i) =>
              <li
                onClick={() => setCategoryId(i)}
                className={categoryId === i ? 'active' : ''}
                key={obj.name}>{obj.name}
              </li>)
          }

        </ul>
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className="search-input"
          placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идет загрузка...</h2>
        ) : (
          collections
            .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((obj, index) => (
              <Collection
                key={index}
                name={obj.name}
                images={obj.photos}
              />
            ))
        )}
      </div>
      
    </div>
  );
}

export default App;
