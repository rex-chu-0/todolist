const api_url = "https://todoo.5xcamp.us";
const login_path = `${api_url}/users/sign_in`;
const signout_path = `${api_url}/users/sign_out`;
const signup_path = `${api_url}/users`;
const todo_path = `${api_url}/todos`;
const del_path = `${api_url}/todos`;

const headers = { "Content-Type": "application/json" };

export const signupAPI = (body) => {
    return fetch(signup_path, {
        method: "POST",
        headers,
        body
    });
}

export const loginAPI = (body) => {
    return fetch(login_path, {
        method: "POST",
        headers,
        body
    });
}

export const todoAPI = (token) => {
    headers.Authorization = token;
    return fetch(todo_path, {
        method: "GET",
        headers
    })
}

export const delAPI = (token, id) => {
    headers.Authorization = token;
    return fetch(`${del_path}/${id}`, {
        method: "DELETE",
        headers
    });
}

export const toggleAPI = (token, id) => {
    headers.Authorization = token;
    return fetch(`${todo_path}/${id}/toggle`, {
        method: "PATCH",
        headers
    });
}

export const addAPI = (token, body) => {
    headers.Authorization = token;
    return fetch(`${todo_path}`, {
        method: "POST",
        headers,
        body
    });
}

