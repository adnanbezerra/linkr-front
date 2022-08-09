const BASE_URL = 'localhost:5000';

function config(token) {
    return {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }
}

export { BASE_URL, config }