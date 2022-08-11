const BASE_URL = 'http://localhost:5000';

function config(token) {
    return {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }
}

function getCookieByName(cookieName) {
    const name = cookieName + "=";
    const cookieDecoded = decodeURIComponent(document.cookie); //to be careful
    const cookieArr = cookieDecoded.split('; ');

    let res;

    cookieArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })

    return res
}

export { BASE_URL, config, getCookieByName }