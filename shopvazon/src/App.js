import React from "react"
import { Route } from 'react-router-dom';
import axios from "axios";
import Home from './components/pages/Home';
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import FotoSlider from "./components/Slider/FotoSlider";



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

      <Route path=" ">
        <Home
          items={items}
          cartItems={cartItems}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          // isLoading={isLoading}
        />
      </Route>

      <div className="wrapper__slider">
        <FotoSlider/>
      </div>



    </div>
  );
}

export default App;













