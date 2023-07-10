import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
    const [landmark, setLandmark] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setLandmark('');
        setLink('');
    }, [props.isOpen]);

    function handleLandmarkChange(evt) {
        setLandmark(evt.target.value);
    }

    function handleLinkChange(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddPlace({
            name: landmark,
            link: link,
        });
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name='card'
            title='Новое место'
            submit='Создать'
            children={
                <>
                    <input id="card-landmark" className="popup__input popup__input_type_landmark" type="text"
                           name="landmark"
                           placeholder="Название"
                           required
                           minLength="2"
                           maxLength="30"
                           value={landmark}
                           onChange={handleLandmarkChange}/>
                    <span className="popup__error card-landmark-error"></span>
                    <input id="card-link" className="popup__input popup__input_type_link" type="url" name="link"
                           placeholder="Ссылка на картинку"
                           required
                           value={link}
                           onChange={handleLinkChange}/>
                    <span className="popup__error card-link-error"></span>
                </>
            }>
        </PopupWithForm>
    )
}