import React from 'react'

const FilmBuy = () => {
  return (
    <div className="buy">
                <div className="active-film">
                    <div className="active-film-block-1">
                        <div className="af-photo">
                            <img className="af-photo" src="" alt=""/>
                        </div>
                        <div className="af-block-text">
                            <div className="af-title">
                                {/* film name */}
                            </div>
                            <div className="af-block-info">
                                <div className="af-row">
                                    <div className="af-cell">
                                        Жанр:
                                    </div>
                                    <div className="af-cell-info">
                                        {/* жанры */}
                                    </div>
                                </div>
                                <div className="af-row">
                                    <div className="af-cell">
                                        Страна:
                                    </div>
                                    <div className="af-cell-info">
                                        {/* страна */}
                                    </div>
                                </div>
                                <div className="af-row">
                                    <div className="af-cell">
                                        Режисер:
                                    </div>
                                    <div className="af-cell-info">
                                        {/* режисер */}
                                    </div>
                                </div>
                                <div className="af-row">
                                    <div className="af-cell">
                                        Возраст:
                                    </div>
                                    <div className="af-cell-info">
                                         {/*возраст */} +
                                    </div>
                                </div>
                                <div className="af-row">
                                    <div className="af-cell">
                                        Длительность:
                                    </div>
                                    <div className="af-cell-info">
                                         {/* длительность */} минуты
                                    </div>
                                </div>
                            </div>
                            <div className="af-description-title">
                                <div className="af-description-line"></div>
                                Описание
                            </div>
                            <div className="af-description">
                                {/* описание */}
                            </div>
                        </div>
                    </div>
                    <div className="reg-form">
                        <div className="reg-title">
                                Оформить билет
                        </div>
                        <div className="first-block">
                                <label className="reg-table-title">Расписание сеансов</label>
                                <div className="reg-duration">
                                    <select id="reg-date" name="reg_date" className="reg-date buy-select">
                                    </select>
                                    <select id="reg-time" name="reg_time" className="reg-date buy-select">
                                    </select>
                                </div>
                                <label className="reg-table-title">Кинозал</label>
                                <div className="reg-duration-1">
                                    <select id="reg-holl" name="reg_holl" className="reg-date buy-select">
                                    </select>
                                </div>
                                <div className="line-cinema">
                                    <div className="line"></div>
                                    <div className="l-text">Экран</div>
                                    <div className="line"></div>
                                </div>
                                <div className="place-block">
                                    <div className="help-panel">
                                        <div className="h-p-cell">
                                            <div className="radio-ex c-blue"></div>
                                            <div>GOOD 60 р</div>
                                        </div>
                                        <div className="h-p-cell">
                                            <div className="radio-ex c-red"></div>
                                            <div>SUPER LUX 100 р</div>
                                        </div>
                                        <div className="h-p-cell">
                                            <div className="radio-ex c-grey"></div>
                                            <div>Бронь</div>
                                        </div>
                                    </div>
                                    <div className="ticket-place">
                                        <div className="t-row">
                                        </div>
                                    </div>
                                </div>
                        </div>     
                    </div>
                </div>
        </div>
  )
}

export default FilmBuy;
