import React from "react";

import unlike from './unlike.svg';
import like from './like.svg';
import cardStyles from './Card.module.scss';


function Card({ title, imageUrl, price, onPlus }) {     // onFaforite-старый пропс
  const [isAdded, setIsAdded] = React.useState()
  const [isFavorite, setIsFavorite] = React.useState()

  const onClickPlus= () => {
   onPlus({title, imageUrl, price})
   setIsAdded(!isAdded)
  }

  const onClickFavorite = () =>{
    setIsFavorite(!isFavorite)
  }


  return(
    <div className={cardStyles.card}>
      <div className={cardStyles.favorite} onClick={onClickFavorite}>
        <img width={32} height={32} src={isFavorite ? like : unlike} alt="Unlike"/>
      </div>
      <img className="card__img" width={155} height={180} src={imageUrl} alt="Vazon"/>
      <h5 className="mt-10 mb-10">{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} грн.</b>
        </div>
          <img className={cardStyles.plus}
               onClick={onClickPlus}
               src={isAdded ? "/img/btn_cheked.svg" : "/img/btn-plus.svg"}
               alt="Plus"
          />

      </div>
    </div>


  )
}


export default Card;

