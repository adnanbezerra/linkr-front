const BASE_URL = 'https://freestore-project.herokuapp.com'

function config(token, refresh) {
    return {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Refresh": `${refresh}`,
            "Access-Control-Allow-Origin": '*'
        }
    }
}

export { BASE_URL, config }