import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('jwt')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('jwt')).token}`;
  }

  return req;
});

export const fetchStory = (id) => API.get(`/Story/${id}`);
export const fetchStories = (page) => API.get(`/Story?page=${page}`);
export const fetchStoriesByCreator = (name) => API.get(`/Story/creator?name=${name}`);
export const fetchStoriesBySearch = (searchQuery) => API.get(`/Story/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createStory = (newStory) => API.post('/Story', newStory);
export const likeStory = (id) => API.patch(`/Story/${id}/likeStory`);
export const comment = (value, id) => API.post(`/Story/${id}/commentStory`, { value });
export const updateStory = (id, updatedStory) => API.patch(`/Story/${id}`, updatedStory);
export const deleteStory = (id) => API.delete(`/Story/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);