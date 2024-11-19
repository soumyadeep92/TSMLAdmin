import fetchWithAuth from "../fetchWithAuth";
import { ADMIN_BACKEND_API_URL, ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_CUSTOMER_API_URL, ADMIN_BACKEND_AUTH_API_URL } from "../constant";
import { allRequests, allRequestsFormData } from './apiEndpoints';

export const getUsersById = async (userId) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-user-by-id/${userId}`, 'get');
    return result;
}

export const listNotifications = async () => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}list/notifications`, 'get')
    return result;
}

export const updateNotifications = async () => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}update/all/notifications/status`, 'post');
    return result;
}

export const getCategoriesByName = async (category) => {
    let categories = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}get-category-by-name`, 'post', category);
    return categories;
}

export const addCategories = async (data) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}add-category`, 'post', data);
    return result;
}

export const editCategories = async (id, data) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}edit-category/${id}`, 'put', data);
    return result;
}

export const getCategoriesById = async (id) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}get-category-by-id/${id}`, 'get')
    return result;
}

export const listCategories = async (id) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}list-category`, 'get');
    return result;
}

export const deleteCategories = async (item) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}delete-category/${item}`, 'put');
    return result;
}

export const listCommentsById = async (id) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}/list/comments/${id}`, 'get')
    return result;
}

export const addComments = async (data) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}add/comment`, 'post', data);
    return result;
}

export const addCompany = async (formData) => {
    let result = await allRequestsFormData(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}add/company`, 'post', formData)
    return result;
}

export const getCompanyByName = async (company) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-company-by-name`, 'post', company);
    return result;
}

export const editCompanies = async (id, formData) => {
    let result = await allRequestsFormData(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}edit/company/${id}`, 'put', formData);
    return result;
}

export const getCompanyById = async (id) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}list/company/${id}`, 'get')
    return result;
}

export const deleteCompanyById = async (id) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}delete/company/${id}`, 'put');
    return result;
}

export const listCompanies = async () => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}list/companies`, 'get');
    return result;
}

export const createCustomer = async (formData) => {
    let result = await allRequestsFormData(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}create-customer-info`, 'post', formData);
    return result;
}

export const listCustomerType = async () => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}list-customer-type?status=1`, 'get');
    return result;
}

export const editCustomer = async (id, formData) => {
    let result = await allRequestsFormData(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}edit-customer-info/${id}`, 'put', formData);
    return result;
}

export const getCustomerById = async (id) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-customer-by-id/${id}`, 'get')
    return result;
}

export const getAllCustomers = async () => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-all-customer`, 'get');
    return result;
}

export const deleteCustomerById = async (item) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}delete-customer-by-id/${item}`, 'put');
    return result;
}

export const getCustomerTypeByName = async (customer_type) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}get-customer-type-by-name`, 'post', customer_type);
    return result;
}

export const addCustomerType = async (data) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}add-customer-type`, 'post', data);
    return result;
}

export const editCustomerType = async (id, data) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}edit-customer-type/${id}`, 'put', data);
    return result;
}

export const getCustomerTypeById = async (id) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}get-customer-type-by-id/${id}`, 'get')
    return result;
}

export const deleteCustomerTypeById = async (item) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}delete-customer-type/${item}`, 'put');
    return result;
}

export const listAllCustomerType = async () => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}list-customer-type`, 'get');
    return result;
}

export const getCvrModeByName = async (cvr) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}get-cvr-mode-by-name`, 'post', cvr);
    return result;
}

export const addCvrMode = async (data) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}add-cvr-mode`, 'post', data);
    return result;
}

export const editCvrMode = async (id, data) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}edit-cvr-mode/${id}`, 'put', data);
    return result;
}

export const getCvrModeById = async (id) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}get-mode-by-id/${id}`, 'get')
    return result;
}

export const deleteCvrModeById = async (item) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}delete-cvr-mode/${item}`, 'put');
    return result;
}

export const listCvrModes = async () => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}list-cvr-mode`, 'get');
    return result;
}

export const getMaterialByName = async (material) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}get-material-by-name`, 'post', material);
    return result;
}

export const addMaterial = async (data) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}add-material`, 'post', data);
    return result;
}

export const editMaterial = async (id, data) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}edit-material/${id}`, 'put', data);
    return result;
}

export const getMaterialById = async (id) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}get-material-by-id/${id}`, 'get')
    return result;
}

export const listMaterials = async (id) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}list-material`, 'get');
    return result;
}

export const getUserByAdmin = async () => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-user-by-admin`, 'get')
    return result;
}

export const addNotice = async (data) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}add/notice`, 'post', data);
    return result;
}

export const editNotice = async (id, data) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}/update/notice/${id}`, 'post', data);
    return result;
}

export const listNoticeById = async (id) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}/list/notice/${id}`, 'get')
    return result;
}

export const deleteNoticeById = async (item) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}delete/notice/${item}`, 'put')
    return result;
}

export const listNotices = async () => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}list/notice`, 'get')
    return result;
}

export const getProductByName = async (product) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}get-product-by-name`, 'post', product);
    return result;
}

export const addProduct = async (data) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}add-product`, 'post', data);
    return result;
}

export const editProduct = async (id, data) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}edit-product/${id}`, 'put', data);
    return result;
}

export const getProductById = async (id) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}get-product-by-id/${id}`, 'get');
    return result;
}

export const listProducts = async () => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}list-product`, 'get');
    return result;
}

export const deleteProductById = async (item) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}delete-product/${item}`, 'put');
    return result;
}

export const getReasonByName = async (reason) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}get-reason-by-name`, 'post', reason);
    return result;
}

export const addReason = async (data) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}add-reason`, 'post', data);
    return result;
}

export const editReason = async (id, data) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}edit-reason/${id}`, 'put', data);
    return result;
}

export const getReasonById = async (id) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}get-reason-by-id/${id}`, 'get');
    return result;
}

export const listReasons = async () => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}list-reason`, 'get');
    return result;
}

export const changePassword = async (data) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}change-password`, 'post', data);
    return result;
}

export const listCvrs = async (data) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}list/users/cvrs`, 'get');
    return result;
}

export const updateNotificationsTime = async (cvrid, time) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}update/notifications/time/${cvrid}`, 'post', time);
    return result;
}

export const forgotPassword = async (data) => {
    let result = await fetch(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_AUTH_API_URL}forgot-password`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return result;
}

export const updateProfile = async (formData) => {
    let result = await allRequestsFormData(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}profile-update`, 'post', formData);
    return result;
}

export const getUserById = async (authId) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-user-by-id/${authId}`, 'get')
    return result;
}

export const resetPassword = async (data, token) => {
    let result = await fetch(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_AUTH_API_URL}reset-password/${token}`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return result;
}

export const getStandardByName = async (standard) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}get-standard-by-name`, 'post', standard);
    return result;
}

export const addStandard = async (data) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}add-standard`, 'post', data);
    return result;
}

export const editStandard = async (id, data) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}edit-standard/${id}`, 'put', data);
    return result;
}

export const getStandardById = async (id) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}get-standard-by-id/${id}`, 'get');
    return result;
}

export const listStandards = async () => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}list-standard`, 'get');
    return result;
}

export const deleteStandardById = async (item) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}delete-standard/${item}`, 'put');
    return result;
}

export const addThemes = async (formData) => {
    let result = await allRequestsFormData(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}create-themes`, 'post', formData);
    return result;
}

export const listAllCompanies = async () => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}list/companies?status=1`, 'get');
    return result;
}

export const editThemes = async (id, formData) => {
    let result = await allRequestsFormData(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}edit-themes/${id}`, 'put', formData);
    return result;
}

export const getThemeById = async (id) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-theme-by-id/${id}`, 'get')
    return result;
}

export const deleteThemeById = async (item) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}delete-theme-by-id/${item}`, 'put');
    return result;
}

export const listThemes = async () => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-all-themes`, 'get');
    return result;
}

export const deleteUserById = async (item) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}delete-user/${item}`, 'put');
    return result;
}

export const listAllUsers = async () => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}list-user`, 'get');
    return result;
}

export const editUsers = async (id, formData) => {
    let result = await allRequestsFormData(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}edit-user/${id}`, 'put', formData);
    return result;
}

export const listRoles = async () => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}list-role?status=1`, 'get');
    return result;
}

export const getRoleByName = async (user_type) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-role-by-name`, 'post', user_type);
    return result;
}

export const createRole = async (data) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}create-role`, 'post', data);
    return result;
}

export const permissions = async (data) => {
    await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}permissions`, 'post', data);
}

export const editRole = async (id, data) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}edit-role/${id}`, 'put', data);
    return result;
}

export const getRoleById = async (id) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-role-by-id/${id}`, 'get')
    return result;
}

export const getRolePermissions = async (id) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-role-permission/${id}`, 'get')
    return result;
}

export const listAllRoles = async () => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}list-role`, 'get',);
    return result;
}

export const deleteRoleById = async (item) => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}delete-role/${item}`, 'put');
    return result;
}

export const getDashboard = async () => {
    let result = await allRequests(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get/admin/report`, 'get')
    return result;
}