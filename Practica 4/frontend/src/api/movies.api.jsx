const API_URL = 'http://localhost:3000/movies';

export const getMovies = async () => {
    const res = await fetch(API_URL);
    return res.json();
};

export const getMovie = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    return res.json();
}

export const create = async (data) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return res.json();
}

export const update = async (id, data) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return res.json();
}

export const remove = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    return res.json();
}