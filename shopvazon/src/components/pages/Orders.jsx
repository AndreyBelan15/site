import React from 'react';
import Card from '../Card';
import axios from "axios";
import AppContext from "../../context";

function Orders() {
  const { onAddToFavorite,onAddToCart } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () =>{
      try {
      const { data } = await axios.get('https://6304e002697408f7edbd253a.mockapi.io/orders');
      setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
      setIsLoading(false);
    } catch (error) {
      alert('Ошибка при запросе заказов');
      console.error(error);
      }
    })()
  },[])

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(10)] : orders).map((item, index) => (
          <Card
            key={index}
            onFaforite={(obj)=>onAddToFavorite(obj)}
            // onPlus={(obj) => onAddToCart(obj)}   пока убрал из контекста, проверю надо ли он там
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;
// key={index} favorited={true} onFaforite={onAddToFavorite}  {...item}

// const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
// const [orders, setOrders] = React.useState([]);
// const [isLoading, setIsLoading] = React.useState(true);

// React.useEffect(() => {
//   (async () => {
//     try {
//       const { data } = await axios.get('https://60d62397943aa60017768e77.mockapi.io/orders');
//       setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
//       setIsLoading(false);
//     } catch (error) {
//       alert('Ошибка при запросе заказов');
//       console.error(error);
//     }
//   })();
// }, []);

// const { data } = await axios.get('https://6304e002697408f7edbd253a.mockapi.io/orders')
// setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
// setIsLoading(false)