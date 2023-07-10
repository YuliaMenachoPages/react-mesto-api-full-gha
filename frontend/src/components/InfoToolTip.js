import React from 'react';

function InfoTooltip(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button onClick={props.onClose} aria-label="Закрыть" className="popup__close"></button>
                <img className="popup__img"
                     src={props.infoToolTipStatus === 'ok' ? '../images/ok.svg' : '../images/reject.svg'}
                     alt="Уведомление о регистрации"/>
                <h2 className="popup__title">{props.infoToolTipStatus === 'ok' ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip