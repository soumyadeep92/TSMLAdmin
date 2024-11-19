import fetchWithAuth from "../fetchWithAuth";

export const allRequests = (url, method, data = null) => {
    if (method == 'get') {
        let results = fetchWithAuth(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return results;
    } else if (method == 'post') {
        if (data) {
            let results = fetchWithAuth(url, {
                method: method,
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return results;
        } else {
            let results = fetchWithAuth(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return results;
        }
    } else if (method == 'put') {
        if (data) {
            let results = fetchWithAuth(url, {
                method: method,
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return results;
        } else {
            let results = fetchWithAuth(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return results;
        }
    }
}

export const allRequestsFormData = (url, method, formData) => {
    if (method == 'post') {
        let results = fetchWithAuth(url, {
            method: method,
            body: formData,
            headers: {}
        });
        return results;
    }
}