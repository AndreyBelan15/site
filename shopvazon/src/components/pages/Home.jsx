import React from "react";
import Card from '../Card';

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  // onAddToFavorite,
  onAddToCart,

}){
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
        {items
          .filter((item)=>item.title.toLowerCase().includes(searchValue))
          .map((item, index)=>
            (<Card
                key={index}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFaforite={()=>console.log('Добавили в закладки')}
                onPlus={(obj) => onAddToCart(item)}
              />
            ))}
      </div>
    </div>
  )
}
export default Home;