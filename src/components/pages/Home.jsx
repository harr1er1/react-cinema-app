import React from 'react';

import gpsMarker from '../../assets/img/ico/icons8-маркер-50.png';
import phone from '../../assets/img/ico/icons8-телефон-50.png';
import photoCinema from '../../assets/img/background/6c045c27d0a103379b2fb22bc9b567ba.jpg';

const Home = () => {
  return (<>
    <div className="banner">
        <div className="banner-title">
            <div className="title-header">
                КИНОТЕАТР
            </div>
            <div className="title-subtitle">
                REACTCINEMA
            </div>
        </div>
        <div className="banner-footer">
            <div className="left-ft">
                <a title="Просмотреть адрес на карте" href="#map">
                    <div className="circle">
                            <img src={gpsMarker} alt=""/>  
                    </div>
                </a>
                <div className="text-ft">
                    <div>ул. Гагарина, 39, Донецк</div>
                    <div className="city">Донецк</div>
                </div>
            </div>
            <div className="right-ft">
                <div className="text-ft">
                    <div>0 800 505 333</div>
                    <div className="city city-tub">Контакт-центр</div>
                </div>
                <div className="circle">
                    <img src={phone} alt=""/>
                </div>
            </div>
        </div>
</div>

<div className="split">
    <div className="line"></div>
    <div className="line-text">О нас</div>
    <div className="line"></div>
</div>

<div className="info">
    <div>
        <div className="back-info"></div>
        <div className="info-text">
            <div className="text-title">О компании</div>
            <div className="text-subtitle">REACTCINEMA – это самая большая сеть кинотеатров в Украине основанная в 2004 году.
                <br/>REACTCINEMA - это 28 кинотеатров и 141 кинозал в самых больших городах Украины.
                <br/>Согласно лучшим мировым практикам корпоративного управления, в августе 2018 года был сформован высший орган управления компанией REACTCINEMA – борд, в состав которого вошли влиятельные украинские предприниматели, управленцы и лидеры общественного мнения.
                <br/>REACTCINEMA активно поддерживает и инвестирует в развитие украинского кинематографа.</div>

                <div className="t-t-2">Наши особенности:</div>
                <ul className="t-list">
                    <li>уникальные вкусы продукции попкорн-бара;</li>
                    <li>selfie-friendly дизайн интерьеров;</li>
                    <li>стандартные залы с местами повышенного комфорта на последних рядах и инновационные форматы IMAX и ScreenX;</li>
                    <li>VIP кинотеатры с эксклюзивным сервисом;</li>
                </ul>
        </div>
    </div>
</div>

<div className="split">
    <div className="line"></div>
    <div className="line-text" >Фотографии кинотеатра</div>
    <div className="line"></div>
</div>

{/* <div className="wrapper">
        <input type="radio" name="point" id="slide1" checked/>
        <input type="radio" name="point" id="slide2"/>
        <input type="radio" name="point" id="slide3"/>
        <input type="radio" name="point" id="slide4"/>
        <input type="radio" name="point" id="slide5"/>
        <input type="radio" name="point" id="slide6"/>
        <input type="radio" name="point" id="slide7"/>
    <div className="slider">
        <div className="slides slide1"></div>
        <div className="slides slide2"></div>
        <div className="slides slide3"></div>
        <div className="slides slide4"></div>
        <div className="slides slide5"></div>
        <div className="slides slide6"></div>
        <div className="slides slide7"></div>
    </div>
    <div className="controls">
        <label for="slide1"></label>
        <label for="slide2"></label>
        <label for="slide3"></label>
        <label for="slide4"></label>
        <label for="slide5"></label>
        <label for="slide6"></label>
        <label for="slide7"></label>
    </div>
</div> */}

<div className="split">
    <div className="line"></div>
    <div className="line-text" >Мы на карте</div>
    <div className="line"></div>
</div>

<div className="contact-info">
    <div className="block-info">
        <div className="block-title">
            Фасад
        </div>
        <div id="map" className="map">
           <img className="photo-block" src={photoCinema} alt=""/>
        </div>
    </div>
    <div className="block-info">
        <div className="block-title">
            На карте
        </div>
        <div className="map">
            <script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A6c9063bd0937600e148bd5f7fbdd42d9a960c936c21caf60d25bbf17993d387f&amp;width=452&amp;height=383&amp;lang=en_FR&amp;scroll=true"></script>
        </div>
    </div>
</div>
</>
  )
}

export default Home;
