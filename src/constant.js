//REACT_ENV=prod
const REACT_ENV = 'dev'

let prodObj = {
    ADMIN_BACKEND_IMAGE_URL: "http://182.73.216.92:5000/uploads/userFiles/",
    ADMIN_BACKEND_IMAGE_URL_ASSETS: "http://182.73.216.92:5000/uploads/assets/",
    ADMIN_BACKEND_BASE_URL: "http://182.73.216.92:5000/",
    ADMIN_BACKEND_API_URL: "api/v1/users/",
    ADMIN_BACKEND_CUSTOMER_API_URL: "api/v1/customers/",
    ADMIN_BACKEND_AUTH_API_URL: "api/v1/auth/",
    ADMIN_FRONTEND_BASE_URL: "http://182.73.216.92:5000/"
}
const devObj = {
    ADMIN_BACKEND_IMAGE_URL: "http://localhost:5000/uploads/userFiles/",
    ADMIN_BACKEND_IMAGE_URL_ASSETS: "http://localhost:5000/uploads/assets/",
    ADMIN_BACKEND_BASE_URL: "http://localhost:5000/",
    ADMIN_BACKEND_API_URL: "api/v1/users/",
    ADMIN_BACKEND_CUSTOMER_API_URL: "api/v1/customers/",
    ADMIN_BACKEND_AUTH_API_URL: "api/v1/auth/",
    ADMIN_FRONTEND_BASE_URL: "http://localhost:5000/"
}

const getEnv = () => {
    if (REACT_ENV == 'prod') {
        return prodObj
    } else if (REACT_ENV == 'dev') {
        return devObj
    }
}

export const env = getEnv();