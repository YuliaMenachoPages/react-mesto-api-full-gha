import React from "react";
import Card from './Card'
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <button onClick={props.onEditAvatar} type="button" aria-label="Сменить аватар"
                        className="profile__avatar-button">
                    <img src={currentUser.avatar} alt="Фото" className="profile__picture"/>
                </button>
                <div className="profile__info">
                    <div className="profile__edit-info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button onClick={props.onEditProfile} type="button" aria-label="Редактировать"
                                className="profile__edit-button"></button>
                    </div>
                    <h2 className="profile__about">{currentUser.about}</h2>
                </div>
                <button onClick={props.onAddPlace} type="button" aria-label="Добавить"
                        className="profile__add-button"></button>
            </section>
            <section className="elements">
                <ul className="elements__container">
                    {props.cards.map((card) => (
                        <Card key={card._id}
                              onCardClick={props.onCardClick}
                              onCardLike={props.onCardLike}
                              card={card}
                              onCardDelete={props.onCardDelete}
                        />
                    ))
                    }
                </ul>
            </section>
        </main>
    )
}

export default Main;