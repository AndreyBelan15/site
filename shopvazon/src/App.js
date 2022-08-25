import React from "react";
import Card from './components/Card';
import Header from "./components/Header";
import Drawer from "./components/Drawer";
// import Comdid from "./components/tetsting/Comdid";
import Slider from "./components/Slider/fotoslider";

// const arr = [
//   // { title: 'Красивая и стильная коллекция из трех вазонов',
//   //   price: 55555,
//   //   imageUrl: '/img/vazons/vazon1.jpg'},
//   // { title: 'Красивая и стильная коллекция из двух вазонов',
//   //   price: 44444,
//   //   imageUrl: '/img/vazons/vazon2.jpg'},
//   // { title: 'Красивая и стильная коллекция из трех вазонов',
//   //   price: 33333,
//   //   imageUrl: '/img/vazons/vazon3.jpg'},
//   // { title: 'Красивая и стильная коллекция из двух вазонов',
//   //   price: 77777,
//   //   imageUrl: '/img/vazons/vazon4.jpg'},
//
//   // { "title": "Красивая и стильная коллекция из трех вазонов",
//   //   "price": 55555,
//   //   "imageUrl": "/img/vazons/1.jpg"},
//   // { "title": "Красивая и стильная коллекция из двух вазонов",
//   //   "price": 44444,
//   //   "imageUrl": "/img/vazons/2.jpg"},
//   // { "title": "Красивая и стильная коллекция из трех вазонов",
//   //   "price": 33333,
//   //   "imageUrl": "/img/vazons/3.jpg"},
//   // { "title": "Красивая и стильная коллекция из двух вазонов",
//   //   "price": 77777,
//   //   "imageUrl": "/img/vazons/4.jpg"},
//   // { "title": "Красивая и стильная коллекция из трех вазонов",
//   //   "price": 55555,
//   //   "imageUrl": "/img/vazons/1.jpg"},
//   // { "title": "Красивая и стильная коллекция из двух вазонов",
//   //   "price": 44444,
//   //   "imageUrl": "/img/vazons/2.jpg"},
//   // { "title": "Красивая и стильная коллекция из трех вазонов",
//   //   "price": 33333,
//   //   "imageUrl": "/img/vazons/3.jpg"},
//   // { "title": "Красивая и стильная коллекция из двух вазонов",
//   //   "price": 77777,
//   //   "imageUrl": "/img/vazons/4.jpg"}
// ];

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false)

    //Получение карточек товара из базы данных

  React.useEffect(() => {
    fetch('https://6304e002697408f7edbd253a.mockapi.io/items')
      .then ((res) => {
        return res.json()
      })
      .then ((json) => {
        setItems (json)
      })
  },[])



  const onAddToCard = (obj) =>{
    setCartItems(prev =>[...prev, obj])
  }



  return (

    <div className="wrapper clear">
      {/*<Comdid/>*/}
      {cartOpened && <Drawer items={cartItems} onClose={()=>setCartOpened(false)}/>}

      <Header onClickCart={()=>setCartOpened(true)} />
      <Slider/>
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
          {items.map((item)=>
            (<Card
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFaforite={()=>console.log('Добавили в закладки')}
                onPlus={(obj) => onAddToCard(item)}
              />
          ))}
        </div>


      </div>
    </div>
  );
}

export default App;





