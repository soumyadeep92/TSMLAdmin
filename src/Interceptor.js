import fetchIntercept from 'fetch-intercept';
import { jwtDecode } from 'jwt-decode';
//import { logoutUser } from './authService';

export const unregister = fetchIntercept.register({
    request: function (url, config) {
        // Modify the url or config here
        const token = localStorage.getItem('token');
        // const decoded = jwtDecode(token);
        // const ac_time = decoded.exp * 1000;
        // if( ac_time < Date.now() ){
        //     logoutUser();
        // }
        

        config.headers.Authorization = 'Bearer '+`${token}`;

        return [url, config];
    },

    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error);
    },

    response: function (response) {
        // Modify the reponse object
        //console.log('response',response);
        return response;
    },

    responseError: function (error) {
        // Handle an fetch error
        return Promise.reject(error);
    }
});

// Call fetch to see your interceptors in action.
//fetch('http://google.com');

// Unregister your interceptor
//unregister();