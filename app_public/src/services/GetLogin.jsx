import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const GetLogin = async (email, password,navigate) =>  {
    console.log(email);
    console.log(password);
    const apiOptions = {
        server:'http://localhost:3000' // server local - desarrollo
    };
    if (process.env.NODE_ENV === 'production') {
        apiOptions.server ='https://wiki-marvel-git-2a04b3464a8d.herokuapp.com' // server heroku - producción
    }
    try {
        const path = '/api/login';
        const user = await axios.post(`${apiOptions.server}${path}`, {
                correo: email,
                contrasena: password,
        })
        console.log(user);
    }catch (error) {
        console.log(error);
    }
}