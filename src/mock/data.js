const BASE_URL = '';

function config(token) {
    return {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }
}

export { BASE_URL, config }