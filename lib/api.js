export function registerUser(email, password, business_name) {
    return fetch("http://localhost:3000/api/user", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: email, password: password, business_name: business_name})
    })
}

export function loginUser(email, password) {
    return fetch("http://localhost:3000/api/user/login", {
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

export function getDish(token){
    return fetch("http://localhost:3000/api/dish", {
        method: 'GET',
        headers: { "Authorization": "Bearer " + token },
    })
}

export function createMenu(token, name, dishes, start_time, end_time){
    return fetch("http://localhost:3000/api/menu", {
        method: 'POST',
        headers: { "Authorization": "Bearer " + token, 'Content-Type': 'application/json' },
        body: JSON.stringify({name: name, dishes: dishes, start_time: start_time, end_time: end_time})
    })
}

export function deleteMenu(token, id){
    return fetch("http://localhost:3000/api/menu", {
        method: 'DELETE',
        headers: { "Authorization": "Bearer " + token, 'Content-Type': 'application/json' },
        body: JSON.stringify({menu_id: id})
    })
}