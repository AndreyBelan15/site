import React from "react"
import axios from "axios";
import { Route } from 'react-router-dom';
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import AppContext from "./context";

import FotoSlider from "./components/Slider/FotoSlider";

import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";
import Orders from "./components/pages/Orders";



function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

    //Получение карточек товара из базы данных

  React.useEffect(() => {
    async function fetchData(){

      //TODO: Сделать try catch + Promise.all

      setIsLoading(true)
      const cartResponse = await axios.get('https://6304e002697408f7edbd253a.mockapi.io/cart')
      const favoritesResponse = await axios.get('https://6304e002697408f7edbd253a.mockapi.io/favorites')
      const itemsResponse = await axios.get('https://6304e002697408f7edbd253a.mockapi.io/items')
      setIsLoading(false)
      setCartItems(cartResponse.data)
      setFavorites(favoritesResponse.data)
      setItems(itemsResponse.data)
    }
    fetchData()
  },[])


  //Тут я обернул в try-catch для тог, чтоб я мог отловить ошибку
  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))){
        axios.delete(`https://6304e002697408f7edbd253a.mockapi.io/cart/${obj.id}`)
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
      }else{
        axios.post('https://6304e002697408f7edbd253a.mockapi.io/cart', obj)
        setCartItems(prev => [...prev, obj])
      }
    }
    catch(error){
      alert('Не удалось добавить в корзину')
    }
  }

  const onRemoveItem = (id) =>{
    axios.delete(`https://6304e002697408f7edbd253a.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter(item => item.id !== id))
  }

  const onAddToFavorite = async (obj) => {
    //Тут я обернул в try-catch для тог, чтоб я мог отловить ошибку при использовании async-await
    try
    {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://6304e002697408f7edbd253a.mockapi.io/favorites/${obj.id}`)
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
      } else {
        const {data} = await axios.post('https://6304e002697408f7edbd253a.mockapi.io/favorites', obj)
        setFavorites((prev) => [...prev, data])
      }
    }
    catch(error){
      alert('Не удалось добавить в фавориты')
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  };


  return (
    <AppContext.Provider value={{
      items,
      cartItems,
      favorites,
      isItemAdded,
      onAddToFavorite,
      onAddToCart,
      setCartOpened,
      setCartItems }}>

      <div className="wrapper clear">

        {cartOpened && (
          <Drawer items={cartItems} onClose={()=>setCartOpened(false)}  onRemove={onRemoveItem}/>
        )}

        <Header onClickCart={()=>setCartOpened(true)} />

        {/*   /!*Слайдер*!/*/}

        <div className="wrapper__slider">
          <FotoSlider/>
        </div>

        {/*Роуты*/}

        <Route path="/" exact>
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />
        </Route>

        <Route path="/favorites" exact>
          <Favorites/>
        </Route>

        <Route path="/orders" exact>
          <Orders/>
        </Route>

      </div>
    </AppContext.Provider>

  );
}

export default App;




















// import Card from './components/Card';

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

{/*===== Див с карточками товара =====*/}

{/*<div className="d-flex justify-between flex-wrap">    /!*flex-wrap *!/*/}
{/*  {items*/}
{/*    .filter((item)=>item.title.toLowerCase().includes(searchValue))*/}
{/*    .map((item, index)=>*/}
{/*    (<Card*/}
{/*        key={index}*/}
{/*        title={item.title}*/}
{/*        price={item.price}*/}
{/*        imageUrl={item.imageUrl}*/}
{/*        onFaforite={()=>console.log('Добавили в закладки')}*/}
{/*        onPlus={(obj) => onAddToCart(item)}*/}
{/*      />*/}
{/*  ))}*/}
{/*</div>*/}
{/*</div>*/}













































