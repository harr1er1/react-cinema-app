import React from 'react'

const ModalLogin = ({closeModal, openRegistration}) => {

  return (
    <div className='dimming-block'>
                        <div className='registration-block'>
                            <div onClick={closeModal} className='closeForm'>x</div>
                            <h3>Войти</h3>
                            <form>
                                <label>Почта</label>
                                <input placeholder='Email...'/>
                                <label>Пароль</label>
                                <input placeholder='******'/>
                                <div className='buttons'>
                                    <div>Войти</div>
                                    <div onClick={openRegistration}>Регистрация</div>
                                </div>
                            </form>
                        </div>
                    </div>
  )
}

export default ModalLogin;
