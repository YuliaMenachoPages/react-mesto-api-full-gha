import React from 'react';
import {Navigate} from "react-router-dom";

const ProtectedRouteElement = ({elements: Components, ...props}) => {

    return (
        props.loggedIn ? Components.map((Component) => (<Component {...props} key={`${Component}`}/>)) :
            <Navigate to="/signin" replace/>

    )
}

export default ProtectedRouteElement

