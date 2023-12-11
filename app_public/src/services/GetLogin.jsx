import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const GetLogin = async (email, password,navigate) =>  {
    console.log(email);
    console.log(password);
    const apiOptions = {
        server:' https://wiki-marvel-git-2a04b3464a8d.herokuapp.com' // server heroku - producción
    };
    if (process.env.NODE_ENV === 'production') {
        apiOptions.server ='https://wiki-marvel-git-2a04b3464a8d.herokuapp.com' // server heroku - producción
    }
    try {
        await axios.get(`${apiOptions.server}/api/users/login'`,{
            data: {
                correo: email,
                contrasena: password
            }
        })
            .then((response) => {
                console.log(response.data);
                const path = `www.google.com`;
                console.log(path);
                navigate(path);
            })
            .catch((error) => {
                console.log(error);
                // Handle error here
            });
    }catch (error) {
        console.log(error);
    }
}