function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button onClick={props.onClose} aria-label="Закрыть" className="popup__close"></button>
                <h2 className="popup__header">{props.title}</h2>
                <form action="#" name={props.name}
                      className={`popup__form popup__form_type_${props.name}`}
                      onSubmit={props.onSubmit}
                      noValidate>
                    <fieldset className={`popup__fieldset popup__fieldset_type_${props.name}`}>
                        {props.children}
                        <button className="popup__button" type="submit"
                                value="Submit">{props.submit || "Сохранить"}</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm