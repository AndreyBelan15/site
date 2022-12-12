import React from "react";
import ContentLoader from "react-content-loader"
import unlike from './unlike.svg';
import like from './like.svg';
import cardStyles from './Card.module.scss';


function Card({
  id,
  title,
  imageUrl,
  price,
  onFaforite,
  onPlus,
  favorited=false,
  added = false,
  loading = false
}) {
  const [isAdded, setIsAdded] = React.useState(added)
  const [isFavorite, setIsFavorite] = React.useState(favorited)

  const onClickPlus= () => {
   onPlus({ id, title, imageUrl, price});
   setIsAdded(!isAdded);
  }

  const onClickFavorite = () =>{
    onFaforite({ id, title, imageUrl, price});
    setIsFavorite(!isFavorite)
  }


  return(
    <div className={cardStyles.card}>

      {
        loading ? (
          <ContentLoader
              speed={2}
              width={155}
              height={250}
              viewBox="0 0 155 265"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb">
              <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
              <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
              <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
              <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
              <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
          </ContentLoader>
        ):(
          <>
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
                     alt="Plus"/>
               </div>
          </>
          )}


    </div>


  )
}


export default Card;

