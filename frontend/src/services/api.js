import Axios from 'axios'

export const api = Axios.create({
    baseURL:'http://localhost:8000'
})

export const createSession = async (email, password) => {
    return api.post('/sessions',{email: email, password: password})
};

export const getRepositories = async (userId,query) => {
    let url = `/users/${userId}/repositories`
    if(query !== ''){
        url+= `?q=${query}`
    }
    console.log(url)
    return api.get(url)
    //'http://localhost:8080'/users/ID/repositories/q=xxx
}

export const createRepository = async (userId,repositoryUrl) => {
    const url = `/users/${userId}/repositories`

    return api.post(url,{name:repositoryUrl,url:repositoryUrl})
}

export const destroyRepository = async (userId,id) => {
    const url = `/users/${userId}/repositories/${id}`
    console.log(url)
    return api.delete(url)
}