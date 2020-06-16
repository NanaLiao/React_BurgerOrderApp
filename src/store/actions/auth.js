import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () =>{
  return{
    type:actionTypes.AUTH_START
  }
};

export const authSuccess = (authData) =>{
  return{
    type:actionTypes.AUTH_SUCCESS,
    authData:authData
  }
};

export const authFail = (error) =>{
  return{
    type:actionTypes.AUTH_FAIL,
    error:error
  }
};

export const auth = (email,password,isSignup) =>{
  return dispatch => {
    // authenticate the user
    dispatch(authStart());
    const apiKey =
    'AIzaSyCFXWceTlM1jE84K8RsXHtDtUt55GjU99k';
    const authData = {
      email:email,
      password:password,
      returnSecureToken:true
    }
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    if(!isSignup){
      url=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    }
    axios.post(url,authData)
      .then(res=>{
        console.log(res);
        dispatch(authSuccess(res.data));
      })
      .catch(err=>{
        console.log(err);
        dispatch(authFail(err));
      })

  }
}