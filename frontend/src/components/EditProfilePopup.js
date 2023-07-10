import React, {useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


export default function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
// Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

// После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <input id="profile-fullname" className="popup__input popup__input_type_fullname" type="text"
                           name="fullname" required
                           placeholder="Имя"
                           minLength="2"
                           maxLength="40"
                           value={name || ""}
                           onChange={handleNameChange}/>
                    <span className="popup__error profile-fullname-error"></span>
                    <input id="profile-about" className="popup__input popup__input_type_about" type="text"
                           name="about"
                           required
                           placeholder="Занятие"
                           minLength="2"
                           maxLength="200"
                           value={description || ""}
                           onChange={handleDescriptionChange}/>
                    <span className="popup__error profile-about-error"></span>
                </>
            }
        />
    )
}