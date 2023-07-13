import React, {useEffect, useState} from "react"
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoToolTip";
import ProtectedRouteElement from "./ProtectedRoute";
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import * as auth from '../utils/auth';


function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false)
    const [infoToolTipStatus, setInfoToolTipStatus] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('')
    const navigate = useNavigate();

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsInfoToolTipOpen(false);
        setSelectedCard({});
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    useEffect(() => {
        if (loggedIn === true) {
        Promise.all([
                api.getUserData(),
                api.getInitialCards()
            ]
        )
            .then(res => {
                setCurrentUser(res[0]);
                setCards([...res[1]]);
            })
            .catch((err) => console.log(err));

    }}, [loggedIn]);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((err) => console.log(err));
    }

    function handleUpdateUser(userData) {
        api.changeUserData({fullname: userData.name, about: userData.about}).then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        })
            .catch((err) => console.log(err))
    }

    function handleUpdateAvatar(userData) {
        api.changeUserAvatar({link: userData.avatar}).then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        })
            .catch((err) => console.log(err))
    }

    function handleAddPlaceSubmit(card) {
        api.addCard(card).then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
            .catch((err) => console.log(err))
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => setCards((state) => state.filter((c) => c._id !== card._id)
        ))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        handleTokenCheck();
    }, [])
    const handleTokenCheck = () => {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            auth.checkToken(token).then((res) => {
                if (res) {
                    setLoggedIn(true);
                    setEmail(res.email)
                    navigate("/", {replace: true})
                }
            })
                .catch((err) => console.log(err))
        }
    }
    const handleLogin = () => {
        setLoggedIn(true);
    }

    function logOut() {
        localStorage.removeItem('token');
        setLoggedIn(false);
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                email={email}
                logOut={logOut}
            />
            <Routes>
                <Route
                    path="/" element={<ProtectedRouteElement elements={[Main, Footer]}
                                                             onEditAvatar={handleEditAvatarClick}
                                                             onEditProfile={handleEditProfileClick}
                                                             onAddPlace={handleAddPlaceClick}
                                                             onCardClick={handleCardClick}
                                                             onCardLike={handleCardLike}
                                                             cards={cards}
                                                             onCardDelete={handleCardDelete}
                                                             loggedIn={loggedIn}/>}/>
                <Route
                    path="/signin" element={<Login
                    handleLogin={handleLogin}
                    setEmail={setEmail}
                    setIsInfoToolTipOpen={setIsInfoToolTipOpen}
                    setInfoToolTipStatus={setInfoToolTipStatus}
                    infoToolTipStatus={infoToolTipStatus}
                />}/>
                <Route
                    path="/signup" element={<Register
                    setIsInfoToolTipOpen={setIsInfoToolTipOpen}
                    setInfoToolTipStatus={setInfoToolTipStatus}
                    infoToolTipStatus={infoToolTipStatus}
                />}/>
                <Route path='*' element={loggedIn ? <Navigate to='/'/> : <Navigate to='/signin'/>}/>
            </Routes>
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
            />
            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
            />
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
            />
            <InfoTooltip
                isOpen={isInfoToolTipOpen}
                onClose={closeAllPopups}
                name='infoToolTip'
                infoToolTipStatus={infoToolTipStatus}
            />
        </CurrentUserContext.Provider>
    );
}

export default App;
