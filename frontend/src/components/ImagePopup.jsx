function ImagePopup(props) {
    return (
        <div className={`popup popup_type_image-container ${Object.keys(props.card).length && 'popup_opened'}`}>
            <div className="popup__fallback">
                <button onClick={props.onClose} aria-label="Закрыть"
                        className="popup__close popup__close_type_image-container"></button>
                <img className="popup__picture" src={props.card.link} alt={`Фото ${props.card.name}`}/>
                <h2 className="popup__text">{props.card.name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup