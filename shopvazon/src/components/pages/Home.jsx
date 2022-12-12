import React from "react";
import Card from '../Card';

function Home({
  items,
  cartItems,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading
}){

  const renderItems = () => {
  const filteredItems = items.filter((item)=>item.title.toLowerCase().includes(searchValue.toLowerCase()))
    return (isLoading ?[...Array(4)] : filteredItems).map((item, index)=>
        (
          // <Card
          //   key={index}
          //   title={item.title}
          //   price={item.price}                           //старая версия
          //   imageUrl={item.imageUrl}
          //   onFaforite={(obj)=>onAddToFavorite(obj)}
          //   onPlus={(obj) => onAddToCart(obj)}
          // />
          <Card
            key={index}
            onFaforite={(obj)=>onAddToFavorite(obj)}                //Лайф-хаковая версия
            onPlus={(obj) => onAddToCart(obj)}
            added={cartItems.some(obj => Number(obj.id) === Number(item.id))}
            loading={isLoading}
            {...item}
          />

        ))
  }



  return(
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все вазоны'}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search"/>
          {searchValue &&
            <img
              onClick={()=>setSearchValue('')}
              className="clear removeBtn"
              src="/img/btn-remove.svg"
              alt="Clear"/>}

          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск ..."/>
        </div>
      </div>

      {/*===== Див с карточками товара =====*/}

      <div className="d-flex justify-between flex-wrap">    {/*flex-wrap */}
        {renderItems()}
      </div>
    </div>
  )
}
export default Home;