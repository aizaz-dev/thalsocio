import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });
if(localStorage.getItem("user")){

  const loggedInUserId = JSON.parse(localStorage.getItem("user"))._id;
}

API.interceptors.request.use((req) => {
  if (localStorage.getItem("jwt")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("jwt")}`;
  }

  return req;
});

export const fetchStory = (id) => API.get(`/Story/${id}`);
export const fetchStoriesBySearch = (searchQuery) =>
  API.get(
    `/Story/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );

export const comment = (value, id) =>
  API.post(`/Story/${id}/commentStory`, { value });


export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
///
export const getUsers = () => API.get("/api/user/leaderboard");
export const fetchStories = (page, trend, sort) =>
  API.get(`/api/story/${loggedInUserId}?page=${page}&sortby=${trend}${sort}`);
export const fetchStoriesByCreator = (userId, page, trend, sort) =>
  API.get(`/api/story/${userId}/${loggedInUserId}?page=${page}&sortby=${trend}${sort}`);
export const deleteStory = (storyId, userId) =>
  API.delete(`/api/Story/${storyId}/${userId}`);
export const likeStory = (body) =>
  API.put(
    `/api/vote`,

    body
  );
  export const createStory = (newStory) => API.post(`/api/story/create/${loggedInUserId}`, newStory);

  export const updateStory = (id, updatedStory) =>
  API.patch(`/api/story/${id}`, updatedStory);
