import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({component: Component, user: user, DelUserFromLocalStorage:DelUserFromLocalStorage, ...rest}){
    return(
        <Route {...rest} render={(props)=>{
            if(user){
                return <Component user={user} DelUserFromLocalStorage={DelUserFromLocalStorage}/>
            }else{
               return  <Redirect to='/login'/>
            }
        }}/>
    );
}