import React from "react";
import Card from '../Card';

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading
}){

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    return (isLoading ?[...Array(12)] : filteredItems).map((item, index)=>
        (
          <Card
            key={index}
            onFaforite={(obj)=>onAddToFavorite(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            loading={isLoading}
            {...item}
          />
        ))
  }
  return(
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Вазоны для дома и сада'}</h1>
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

      <div className="d-flex justify-between flex-wrap">
        {renderItems()}
      </div>
    </div>


  )
}
export default Home;