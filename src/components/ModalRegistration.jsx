import React from 'react'

const ModalRegistration = ({closeModal}) => {

  return (
    <div className='dimming-block'>
                        <div className='registration-block'>
                            <div onClick={closeModal} className='closeForm'>x</div>
                            <h3>Войти</h3>
                            <form>
                                <label>Почта</label>
                                <input placeholder='Email...'/>
                                <label>Имя</label>
                                <input placeholder='Nickname'/>
                                <label>Пароль</label>
                                <input placeholder='******'/>
                                <label>Ведите пароль еще раз</label>
                                <input placeholder='******'/>
                                <div className='checkbox'>
                                    <input className='custom-input' type="checkbox" required id="check"></input>
                                    <label for="check">Соглашение на обработку данных</label>
                                </div>
                                <div className='buttons'>
                                    <div>Зарегисрироваться</div>
                                </div>
                            </form>
                        </div>
                    </div>
  )
}

export default ModalRegistration;
