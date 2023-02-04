export function registerUser(email: string, password: string) {
    return fetch("http://localhost:3000/api/user", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: email, password: password})
    })
}

//primaprovadalfrontend@gmail.com
//unapasswordmoltosicura