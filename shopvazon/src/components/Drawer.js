function Drawer ({ onClose, onRemove, items = [] }) {
  return(

    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between">
          Корзина
          <img onClick={onClose} className="removeBtn" src="/img/btn-remove.svg" alt="Close"/>
        </h2>

        { items.length > 0 ?

            // ===== Див с карточками выбора в корзине =====
            <div className="items">
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
                <button className="greenButton">Оформить заказ
                  <img src="/img/arrow.svg" alt="Arrow"/>
                </button>
              </div>
          </div>
            :
            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
             <img className="mb-20" width="120px" height="120px" src="/img/empty-cart.jpg" alt="Корзина"/>
                <h2>Корзина пустая</h2>
                  <p className="opacity-6">Добавьте хотя бы один товар, чтобы сделать заказ.</p>
                <button className="greenButton">
              {/*<img src="/img/arrow.svg" alt="Arrow"/>*/}
              Вернуться назад
                </button>
          </div>
        }
      </div>
    </div>

  )
}

export default Drawer;



{/*===== Див с карточками выбора в корзине =====*/}



{/*===== Див с суммой в корзине =====*/}

{/*<div className="cartTotalBlock">*/}
{/*  <ul>*/}
{/*    <li>*/}
{/*      <span>Итого:</span>*/}
{/*      <div></div>*/}
{/*      <b>55 555грн.</b>*/}
{/*    </li>*/}
{/*    <li>*/}
{/*      <span>Скидка 5%:</span>*/}
{/*      <div></div>*/}
{/*      <b>555 грн.</b>*/}
{/*    </li>*/}
{/*  </ul>*/}
{/*  <button className="greenButton">Оформить заказ*/}
{/*    <img src="/img/arrow.svg" alt="Arrow"/>*/}
{/*  </button>*/}
{/*</div>*/}