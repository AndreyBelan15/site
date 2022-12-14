import React from 'react';
import Card from '../Card';
import axios from "axios";
import AppContext from "../../context";
import env from "react-dotenv";

function Orders() {
  const { onAddToFavorite,onAddToCart } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () =>{
      try {
      const { data } = await axios.get(env.MOCAPI_URL+'/orders');
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
        {(isLoading ? [...Array(12)] : orders).map((item, index) => (
          <Card
            key={index}
            onFaforite={(obj)=>onAddToFavorite(obj)}
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;
