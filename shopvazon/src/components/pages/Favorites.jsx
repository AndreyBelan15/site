import React from "react";
import Card from "../Card";


function Favorites({items}){
  return(
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        <div className="d-flex justify-between flex-wrap">
          {items
            .map((item, index)=>
              (<Card
                  key={index}
                  title={item.title}
                  price={item.price}
                  imageUrl={item.imageUrl}
                />
              ))}
        </div>
      </div>

    </div>
)}


export default Favorites;
































// import React from 'react';
// // import Card from '../components/Card';
// // import AppContext from '../context';
//
// function Favorites() {
//   const { favorites, onAddToFavorite } = React.useContext(AppContext);
//
//   return (
//     <div className="content p-40">
//       <div className="d-flex align-center justify-between mb-40">
//         <h1>Мои закладки</h1>
//       </div>
//
//       <div className="d-flex flex-wrap">
//         {favorites.map((item, index) => (
//           <Card key={index} favorited={true} onFavorite={onAddToFavorite} {...item} />
//         ))}
//       </div>
//     </div>
//   );
// }