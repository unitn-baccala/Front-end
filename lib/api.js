export function isError(error){
    return (
        error !== undefined
    )
}

export function registerUser(email, password, business_name) {
    return fetch("http://localhost:3000/api/user", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: email, password: password, business_name: business_name})
    })
}

export function loginUser(email, password) {
    return fetch("http://localhost:3000/api/authenticate", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: email, password: password})
    })
}

export function getUser(token){
    return fetch("http://localhost:3000/api/user", {
        method: 'GET',
        headers: { "Authorization": "Bearer " + token },
    })
}

export function getMenu(token){
    return fetch("http://localhost:3000/api/menu", {
        method: 'GET',
        headers: { "Authorization": "Bearer " + token },
    })
}

export function getMenuFull(business_name){
    return fetch("http://localhost:3000/api/menu/full?business_name=" + business_name, {
        method: 'GET',
    })
}