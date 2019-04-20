import decode from 'jwt-decode';
export default class AuthService {
    // Initializing important variables
    constructor(domain) {
        this.domain = process.env.REACT_APP_PROD_ENV || 'http://localhost:3001/api/cards' // API server domain
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    login(username, password) {
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}/login`, {
            method: 'POST',
            mode: 'cors',
            headers:{
                'Access-Control-Allow-Origin':'*',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }


    fetch(url, options, plain=true) {
        // performs api calls sending the required authentication headers
        // const headers = {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // }
        var headers;

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            if (!plain){
                headers = {
                    'Access-Control-Allow-Origin':'*',
                    'Accept': 'application/json',
                    // 'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + this.getToken()
                }
            }else{
                headers = {
                    'Access-Control-Allow-Origin':'*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + this.getToken()
                }
            }
            
            
            // var head =  {headers, ...options};
            // console.log('sending auth', head);
        }else{
            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => { 
                try {
                    // JSON.parse(response);
                    return response.json();
                } catch (error) {
                    return response;
                }
            });
            
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            return response;
        }
    }
}