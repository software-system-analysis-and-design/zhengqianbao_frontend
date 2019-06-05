
import { authHeader } from '../_helpers';
//import $ from 'jquery';

const apiUrl = 'https://littlefish33.cn:8080/user';
export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(userphone, password) {
    console.log(userphone, password);
    //header("Access-Control-Allow-Origin£ºhttp://localhost:3000");
    //$.get(apiUrl, function(res){console.log(res);});
    const requestOptions = {
        method: 'POST',
        headers:{
            'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'
        },body: JSON.stringify({ userphone, password })
    };

    console.log(requestOptions);
    //const url = apiUrl;
    return fetch(apiUrl + '/login', requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
        
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    /*
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
*/
}

function getById(id) {
    /*
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
    */
}

function register(user) {
    console.log(user);
    const inputInfo = {
        phone: user.userphone,
        iscow: (user.role == 1)?0:1,
        name: user.username,
        password: user.password,
        gender: (user.gender == 1)?"male":"female",
        age: user.age,
        university: user.university,
        company: user.company,
        description: "",
        class: user.class
    }
    console.log(inputInfo);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token', 
            'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,PATCH,DELETE', 
            'Access-Control-Allow-Credentials': true 
        },
        body: JSON.stringify(inputInfo)
    };

    return fetch(apiUrl+`/register`, requestOptions).then(handleResponse);
    
}

function update(user) {
    /*
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
*/
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    /*
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
*/
}

function handleResponse(response) {
    return response.text().then(text => {
        console.log(text);
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        
        return data;
    });
}