import React from "react"
import axios from "axios";
import { Route } from 'react-router-dom';
import Header from "./components/Header";
import Drawer from "./components/Drawer";
// import Footer from "./components/Footer";
import AppContext from "./context";
import env from "react-dotenv"

import FotoSlider from "./components/Slider/FotoSlider";

import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";
import Orders from "./components/pages/Orders";






function App() {
  const [items, setItems] = React.useState([])    // Карточки товара
  const [cartItems, setCartItems] = React.useState([])   // Карточки товара в корзине
  const [favorites, setFavorites] = React.useState([]);  // Товары фавориты пользователя
  const [searchValue, setSearchValue] = React.useState('')  // Поиск
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  console.log(env.MOCAPI_URL)

    //Получение карточек товара из базы данных

  React.useEffect(() => {
    async function fetchData(){
      try{

        const [cartResponse, favoritesResponse,itemsResponse] =
          await  Promise.all([
          axios.get(env.MOCAPI_URL+'/cart'),                     //Небольшой рефактор кода через промис-ол
          axios.get(env.MOCAPI_URL+'/favorites'),
          axios.get(env.MOCAPI_URL+'/items')])

        // const cartResponse = await axios.get(env.MOCAPI_URL+'/cart')
        // const favoritesResponse = await axios.get(env.MOCAPI_URL+'/favorites')
        // const itemsResponse = await axios.get(env.MOCAPI_URL+'/items')

        setIsLoading(false)
        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)
      }catch (error){
        alert('Ошибка при запросе данных')
      }
    }
    fetchData()
  },[])


  //Тут я обернул в try-catch для тог, чтоб я мог отловить ошибку
  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
      if (findItem){
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
        axios.delete(env.MOCAPI_URL+`/cart/${findItem.id}`)
      }else{
        setCartItems(prev => [...prev, obj])
        const { data } = await axios.post(env.MOCAPI_URL+'/cart',obj)
        setCartItems(prev => prev.map(item =>{
          if (item.parentId === data.parentId){
            return{
              ...item,
              id: data.id
            }
          }
          return item
        }))

      }
    }
    catch(error){
      alert('Не удалось добавить в корзину')
    }
  }

  const onRemoveItem = (id) =>{
    try{
      axios.delete(env.MOCAPI_URL+`/cart/${id}`)
      setCartItems((prev) => prev.filter(item => item.id !== id))
    }catch (error){
      alert('Ошибка при удалении из корзины')
      console.error(error)
    }
  }

  const onAddToFavorite = async (obj) => {    // Добавление и проверка товаров в фаворитах, если есть то не добавлять
    //Тут я обернул в try-catch для того, чтоб я мог отловить ошибку при использовании async-await
    try
    {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(env.MOCAPI_URL+`/favorites/${obj.id}`)
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
      } else {
        const {data} = await axios.post(env.MOCAPI_URL+'/favorites', obj)
        setFavorites((prev) => [...prev, data])
      }
    }
    catch(error){
      alert('Не удалось добавить в фавориты')
      console.error(error)
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {       // Сравнение id items и id items в корзине с id в (МОКАПИ)
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
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

          <Drawer
            items={cartItems}
            onClose={()=>setCartOpened(false)}
            onRemove={onRemoveItem}
            opened={cartOpened}
          />

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

        {/*<Footer/>*/}

      </div>

    </AppContext.Provider>


  );
}

export default App;
































































