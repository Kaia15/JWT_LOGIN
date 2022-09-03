import React , { useState, useEffect, useContext } from 'react'
import RenderLogin from './login/login'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

/*const login = (email, token, expirationDate) => {
    const tokenExpiredDate = expirationDate || new Date(new Date().getTime() + 2000)
    localStorage.setItem("userID", JSON.stringify({ userId: email, token: token, expiredDate: tokenExpiredDate}))
}*/


const Login = () => {
    const [user, setUser] = useState({})

    const resetNewToken = async() => {
        // await localStorage.removeItem("userID")
        /*const newToken = await fetch('http://localhost:8000/user/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' 
        })*/
        const newToken = await axios.post('http://localhost:8000/user/refresh')
        const data = await newToken.data
        // console.log(newTokenJson)
        setUser({...user, accessToken: data.accessToken, refreshToken: data.refreshToken})
        return data;
        // console.log(user)
        // return newTokenJson
    }
    
    const onSubmit = async (values, actions) => {
        /*const res = await fetch('http://localhost:8000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password,
            })
        })*/
        const res = await axios.post('http://localhost:8000/user/login', {email: values.email, password: values.password});
        const data = await res.data;
        const email = await data['_doc']['email']
        const access = await data['accessToken']
        const refresh = await data['refreshToken']
        // console.log(data)
        setUser({email: email, accessToken: access, refreshToken: refresh})
        await actions.resetForm()
    }

    useEffect(() => console.log(user), [user])
    

    const instance = axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 10000,
        params: {} // do not remove this, its added to add params later in the config
    });

    instance.interceptors.request.use(
        () => {
            console.log('abcd')
        }
        /*async(config)=> {
            console.log(true)
            let currDate = new Date();
            const decodedToken = jwt_decode(user.accessToken)
            console.log(decodedToken.exp)
            if (decodedToken.exp * 1000 < currDate.getTime())
            {
                console.log(true);
                const data = await resetNewToken()
                // console.log(data);
                config.headers['token'] = "Bearer " + data.accessToken;
                // setUser({...user, exp: data})
            }    
            return config;
        }, error => {
            return Promise.reject(error);
        }*/
    )

    const view = async() => {
        try{

        } catch(err) {

        }
    }
    // if (user.token) console.log(jwt_decode(user.token))

    return (
    <RenderLogin 
    resetNewToken = {resetNewToken}
    onSubmit = {onSubmit}
    user = {user}
    setUser = {setUser}
    view = {view}
    />
    )
}

export default Login