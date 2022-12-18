import React from "react";
import axios from "axios";
import env from "react-dotenv"

import Info from "../Info";
import {useCart} from "../../hooks/useCart";

import styles from './Drawer.module.scss'


// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Index ({ onClose, onRemove, items = [], opened }) {
  const {cartItems, setCartItems, totalPrice} = useCart();     // Index суммирует все цены товаров (totalPrice)
  const [orderId, setOrderId] = React.useState(null)    // Номер заказа при оформлении
  const [isOrderComplete, setIsOrderComplete] = React.useState(false) // Оформление заказа, или пустая корзина
  const [isLoading, setIsLoading] = React.useState(false)  // Загрузка карточек товара



  const onClickOrder = async () => {
   try {
     setIsLoading(true)
     const {data} = await axios.post(env.MOCAPI_URL+'/orders', {items, cartItems})
     setOrderId(data.id)
     setIsOrderComplete(true)
     setCartItems([])
   }
   catch (error){
     alert('Не удалось создать заказ, попробуйте еще раз')
   }
   setIsLoading(false)
  }

  return(

    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between">
          Корзина
          <img onClick={onClose} className="removeBtn" src="/img/btn-remove.svg" alt="Close"/>
        </h2>

        { items.length > 0 ?  (

            // ===== Див с карточками в корзине =====
          <div className="d-flex flex-column flex">
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
                    <b>{totalPrice}грн.</b>
                  </li>
                  <li>
                    <span>Скидка 5%:</span>                         {/*Определяю общую сумму скидки на товар*/}
                    <div></div>
                    <b>{totalPrice / 100 * 5} грн.</b>              {/*Вычисляю сумму скидки*/}
                  </li>
                </ul>
                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ
                  <img src="/img/arrow.svg" alt="Arrow"/>
                </button>
              </div>
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

export default Index;

