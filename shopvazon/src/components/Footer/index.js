import React from "react";
import styleFooter from './FooterCss.css'

import arrowcircle from './arrowcircle.png';

function Footer (){
  return(
    <div id="btn-speak_out">
      <div id="btn-speak">
        <div className="dws-button">
          <a href="#">
            <div className="btn-demo"><span>Говорилка</span></div>
            <div className="btn-text">Задать нам вопрос</div>
            <div className="btn-img"><img src={arrowcircle} alt="Позвонить"/></div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer

