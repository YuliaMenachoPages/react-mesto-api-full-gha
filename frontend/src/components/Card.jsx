import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    function handleClick() {
        props.onCardClick(props.card);
    }

    const isOwn = props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (
        `element__icon ${isLiked && 'element__icon_active'}`
    );

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    return (
        <li className="element">
            {isOwn && <button type="button" aria-label="Удалить" className="element__delete element__delete_type_white"
                              onClick={handleDeleteClick}></button>}
            <div className="element__fallback">
                {isOwn &&
                    <button type="button" aria-label="Удалить" className="element__delete element__delete_type_black"
                            onClick={handleDeleteClick}></button>}
                <img onClick={handleClick} src={props.card.link} alt={`Фото. ${props.card.name}`}
                     className="element__picture"/>
            </div>
            <div className="element__info">
                <h2 className="element__text">{props.card.name}</h2>
                <div className="element__like">
                    <button type="button" aria-label="Лайк" className={cardLikeButtonClassName}
                            onClick={handleLikeClick}></button>
                    <p className="element__counter">{[...props.card.likes].length}</p>
                </div>
            </div>
        </li>

    )
}

export default Card;