import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function LoginRoute({component: Component, user:user, addUserToLocalStorage: addUserToLocalStorage , ...rest}){
    return(
        <Route {...rest} render={(props)=>{
            if(user){
                return  <Redirect to='/taskDisplay'/>
            }else{
                return <Component addUserToLocalStorage={addUserToLocalStorage} />
            }
        }}/>
    );
}