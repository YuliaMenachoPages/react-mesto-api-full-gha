import {Link} from "react-router-dom";

function AuthPage(props) {
    return (
        <div className="login">
            <h2 className="login__header">
                {props.headerText}
            </h2>
            <form onSubmit={props.handleSubmit} className="login__form">
                <label htmlFor="email"></label>
                <input required
                       className="login__input"
                       id="email"
                       name="email"
                       type="email"
                       value={props.formValue.email}
                       onChange={props.handleChange}
                       placeholder="Email"
                />
                <label htmlFor="password"></label>
                <input required
                       className="login__input"
                       id="password"
                       name="password"
                       type="password"
                       value={props.formValue.password}
                       onChange={props.handleChange}
                       placeholder="Пароль"
                />
                <button type="submit" className="login__button">{props.buttonText}</button>
            </form>
            {props.isRegister &&
                <div className="login__signin">
                    <Link to="/signin" className="login__link">Уже зарегистрированы? Войти</Link>
                </div>
            }
        </div>
    )
}

export default AuthPage