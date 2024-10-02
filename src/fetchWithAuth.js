// fetchWithAuth.js

const isTokenExpired = (token) => {
    if (!token) return true; // No token, consider it expired

    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    console.log('payload',payload);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return payload.exp < currentTime; 
};

const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');

    // Check if the token is expired
    if (isTokenExpired(token)) {
        console.log('Token expired. Logging out...');
        localStorage.clear(); // Remove the token
        window.location.href = '/'; // Redirect to login page
        return null; // Exit early
    }

    // If token exists, add it to the Authorization header
    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
        };
    }

    try {
        const response = await fetch(url, options);
        
        // Handle non-OK responses
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.clear();
                window.location.href = '/'; 
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json(); // Parse and return response JSON
    } catch (error) {
        console.error('Fetch error:', error);
        throw error; // Re-throw the error for handling in calling code
    }
};

export default fetchWithAuth;
