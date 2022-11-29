import React from "react"
import { Route } from 'react-router-dom';
import axios from "axios";
// import Card from './components/Card';                      это тут не надо пока,что
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import FotoSlider from "./components/Slider/FotoSlider";
import Home from "./components/pages/Home";



function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)

    //Получение карточек товара из базы данных

  React.useEffect(() => {

    axios.get('https://6304e002697408f7edbd253a.mockapi.io/items')
      .then((res) => {
      setItems(res.data)
    })
    axios.get('https://6304e002697408f7edbd253a.mockapi.io/cart')
      .then((res) => {
      setCartItems(res.data)
    })
  },[])



  const onAddToCard = (obj) =>{
    axios.post('https://6304e002697408f7edbd253a.mockapi.io/cart', obj)
    setCartItems(prev => [...prev, obj])
  }

  const onRemoveItem = (id) =>{
    axios.delete(`https://6304e002697408f7edbd253a.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter(item => item.id !== id))
  }


  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }


  return (

    <div className="wrapper clear">

      {cartOpened && <Drawer items={cartItems} onClose={()=>setCartOpened(false)}  onRemove={onRemoveItem}/>}

      <Header onClickCart={()=>setCartOpened(true)} />


         {/*Слайдер*/}
      <div className="wrapper__slider">
        <FotoSlider/>
      </div>

          {/*Роуты*/}
      <Route path="/" >
        <Home
          items={items}
          cartItems={cartItems}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          // onAddToFavorite={onAddToFavorite}
          // onAddToCart={onAddToCart}

        />
      </Route>



    </div>
  );
}

export default App;






































{/*<div className="content p-40">*/}
{/*  <div className="d-flex align-center justify-between mb-40">*/}
{/*    <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все вазоны'}</h1>*/}
{/*    <div className="search-block d-flex">*/}
{/*      <img src="/img/search.svg" alt="Search"/>*/}
{/*      {searchValue &&*/}
{/*        <img*/}
{/*          onClick={()=>setSearchValue('')}*/}
{/*          className="clear removeBtn"*/}
{/*          src="/img/btn-remove.svg"*/}
{/*          alt="Clear"/>}*/}

{/*      <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск ..."/>*/}
{/*    </div>*/}
{/*  </div>*/}

{/*  /!*===== Див с карточками товара =====*!/*/}

{/*  <div className="d-flex justify-between flex-wrap">    /!*flex-wrap *!/*/}
{/*    {items*/}
{/*      .filter((item)=>item.title.toLowerCase().includes(searchValue))*/}
{/*      .map((item, index)=>*/}
{/*      (<Card*/}
{/*          key={index}*/}
{/*          title={item.title}*/}
{/*          price={item.price}*/}
{/*          imageUrl={item.imageUrl}*/}
{/*          onFaforite={()=>console.log('Добавили в закладки')}*/}
{/*          onPlus={(obj) => onAddToCart(item)}*/}
{/*        />*/}
{/*    ))}*/}
{/*  </div>*/}


{/*</div>*/}










