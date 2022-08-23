import unlike from './unlike.svg';
import React from "react";
import cardStyles from './Card.module.scss';


function Card(props){
 const [isAdded, setIsAdded] = React.useState()

  const onClickPlus= () => {
    setIsAdded(!isAdded)
  }

  return(
    <div className={cardStyles.card}>
      <div className={cardStyles.favorite} onClick={props.onFaforite}>
        <img width={32} height={32} src={unlike} alt="Unlike"/>
      </div>
      <img className="card__img" width={155} height={180} src={props.imageUrl} alt="Vazon"/>
      <h5 className="mt-10 mb-10">{props.title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{props.price} грн.</b>
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

