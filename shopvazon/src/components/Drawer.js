import React from "react";
import axios from "axios";
import Info from "./Info";
import AppContext from "../context";


// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer ({ onClose, onRemove, items = [] }) {
  const { cartItems,setCartItems } = React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null)
  const [isOrderComplete, setIsOrderComplete] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const onClickOrder = async () => {
   try {
     setIsLoading(true)
     const {data} = await axios.post('https://6304e002697408f7edbd253a.mockapi.io/orders', {items, cartItems})
     setOrderId(data.id)
     setIsOrderComplete(true)
     setCartItems([])

      // for (let i = 0; i < cartItems.length; i++) {
      //   const item = cartItems[i];
      //   await axios.delete('/https://6304e002697408f7edbd253a.mockapi.io/cart/' + item.id);
      //   await delay(1000);
      //  }
   }
   catch (error){
     alert('Не удалось создать заказ, попробуйте еще раз')
   }
   setIsLoading(false)
  }

  return(

    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between">
          Корзина
          <img onClick={onClose} className="removeBtn" src="/img/btn-remove.svg" alt="Close"/>
        </h2>

        { items.length > 0 ?  (

            // ===== Див с карточками выбора в корзине =====

            <div className="items flex">
              {items.map((obj) =>(
                <div key={obj.id} className="cartItem d-flex align-center mt-20 mb-20 p-10">
                  <img className=" mr-15" width={70} height={70} src={obj.imageUrl} alt="Vazon"/>
                  <div className="mr-20">
                    <p>{obj.title}</p>
                    <b>{obj.price} грн.</b>
                  </div>
                  <img
                    onClick={()=>onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"/>
                </div>
              ))
              }

              {/*===== Див с суммой в корзине =====*/}

              <div className="cartTotalBlock">
                <ul>
                  <li>
                    <span>Итого:</span>
                    <div></div>
                    <b>55 555грн.</b>
                  </li>
                  <li>
                    <span>Скидка 5%:</span>
                    <div></div>
                    <b>555 грн.</b>
                  </li>
                </ul>
                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ
                  <img src="/img/arrow.svg" alt="Arrow"/>
                </button>
              </div>
            </div>

          ):(
            <Info
              title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
              description={isOrderComplete ? `Ваш заказ №${orderId} будет передан в отдел доставки` :
                                              "Добавьте хотя бы один товар, чтобы сделать заказ."}
              image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
            />
        )}
      </div>
    </div>

  )
}

export default Drawer;

//  <div className="cartEmpty d-flex align-center justify-center flex-column flex">
//   <img className="mb-20" width="120px" height="120px" src="/img/empty-cart.jpg" alt="Корзина"/>
//      <h2>Корзина пустая</h2>
//        <p className="opacity-6">Добавьте хотя бы один товар, чтобы сделать заказ.</p>
//      <button className="greenButton">
//    {/*<img src="/img/arrow.svg" alt="Arrow"/>*/}
//    Вернуться назад
//      </button>
// </div>

