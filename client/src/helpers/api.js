import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('jwt')) {
    req.headers.Authorization = `Bearer ${(localStorage.getItem('jwt'))}`;
  }

  return req;
});

export const fetchStory = (id) => API.get(`/Story/${id}`);
export const fetchStories = (page) => API.get(`/Story?page=${page}`);
export const fetchStoriesBySearch = (searchQuery) => API.get(`/Story/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createStory = (newStory) => API.post('/Story', newStory);
export const likeStory = (id) => API.patch(`/Story/${id}/likeStory`);
export const comment = (value, id) => API.post(`/Story/${id}/commentStory`, { value });
export const updateStory = (id, updatedStory) => API.patch(`/Story/${id}`, updatedStory);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
///
export const getUsers=()=> API.get('/api/user/leaderboard')
export const fetchStoriesByCreator = (userId,page,trend,sort) => API.get(`http://localhost:3001/api/story/${userId}?page=${page}&sortby=${trend}${sort}`);
export const deleteStory = (storyId,userId) => API.delete(`/api/Story/${storyId}/${userId}`);