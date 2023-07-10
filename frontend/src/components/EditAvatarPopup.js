import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
    const avatarRef = React.useRef('')

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            placeholder="Ссылка на фото"
            name='profile-picture'
            title='Обновить аватар'
            onClose={props.onClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <input id="profile-picture" className="popup__input popup__input_type_profile-picture"
                           type="url"
                           name="link"
                           placeholder="Ссылка на фото"
                           ref={avatarRef}
                           required/>
                    <span className="popup__error profile-picture-error"></span>
                </>
            }>
        </PopupWithForm>
    )
}