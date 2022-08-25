function Drawer ({ onClose, items = [] }) {
  return(

    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between">
          Корзина
          <img onClick={onClose} className="removeBtn" src="/img/btn-remove.svg" alt="Close"/></h2>

        {/*===== Див с карточками выбора в корзине =====*/}

        <div className="items">
          {items.map((obj) =>(
            <div className="cartItem d-flex align-center mt-20 mb-20 p-10">
              <img className=" mr-15" width={70} height={70} src={obj.imageUrl} alt="Vazon"/>
            <div className="mr-20">
              <p>{obj.title}</p>
              <b>{obj.price} грн.</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove"/>
          </div>
          ))
          }

          {/*<div className="cartItem d-flex align-center mt-20 p-10">*/}
          {/*  <img className=" mr-15" width={70} height={70} src="/img/vazons/vazon1.jpg" alt="Vazon"/>*/}
          {/*  <div className="mr-20">*/}
          {/*    <p>Красивая и стильная коллекция из трех вазонов</p>*/}
          {/*    <b>55 555 грн.</b>*/}
          {/*  </div>*/}
          {/*  <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove"/>*/}
          {/*</div>*/}
        </div>

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
    </div>

  )
}

export default Drawer;