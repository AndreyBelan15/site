import React from "react";
import Card from './components/Card';
import Header from "./components/Header";
import Drawer from "./components/Drawer";

const arr = [
  { title: 'Красивая и стильная коллекция из трех вазонов',
    price: 55555,
    imageUrl: '/img/vazons/vazon1.jpg'},
  { title: 'Красивая и стильная коллекция из двух вазонов',
    price: 44444,
    imageUrl: '/img/vazons/vazon2.jpg'},
  { title: 'Красивая и стильная коллекция из трех вазонов',
    price: 33333,
    imageUrl: '/img/vazons/vazon3.jpg'},
  { title: 'Красивая и стильная коллекция из двух вазонов',
    price: 77777,
    imageUrl: '/img/vazons/vazon4.jpg'}
];

function App() {
  const [cartOpened, setCartOpened] = React.useState(false)

  return (
    <div className="wrapper clear">

      {cartOpened && <Drawer onClose={()=>setCartOpened(false)}/>}

      <Header onClickCart={()=>setCartOpened(true)} />

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все вазоны</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search"/>
            <input placeholder="Поиск ..."/>
          </div>
        </div>

        {/*===== Див с карточками товара =====*/}

        <div className="d-flex justify-between flex-wrap">    {/*flex-wrap */}
          {arr.map((obj)=>
            (<Card
                title={obj.title}
                price={obj.price}
                imageUrl={obj.imageUrl}
                onFaforite={()=>console.log('Добавили в закладки')}
                onPlus={()=>console.log('Нажали плюс')}
              />
          ))}
        </div>


      </div>
    </div>
  );
}

export default App;





