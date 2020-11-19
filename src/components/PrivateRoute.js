import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({component: Component, user: user , ...rest}){
    return(
        <Route {...rest} render={(props)=>{
            if(user){
                return <Component user={user} />
            }else{
               return  <Redirect to='/login'/>
            }
        }}/>
    );
}