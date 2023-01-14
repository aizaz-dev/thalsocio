import axios from "axios";


const API = axios.create({ baseURL: "http://localhost:3001" });
const getLoggedInUser=()=>{
   return JSON.parse(localStorage.getItem("user"))._id;
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



export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
///
export const getUsers = () => API.get("/api/user/leaderboard");
export const fetchStories = (page, trend, sort) =>
  API.get(`/api/story/${getLoggedInUser()}?page=${page}&sortby=${trend}${sort}`);
export const fetchStoriesByCreator = (userId, page, trend, sort) =>
  API.get(`/api/story/u/${userId}/${getLoggedInUser()}?page=${page}&sortby=${trend}${sort}`);
export const deleteStory = (storyId, userId) =>
  API.delete(`/api/Story/${storyId}/${userId}`);
export const VoteStory = (body) =>
  API.put(
    `/api/vote`,
    body
  );
  export const createStory = (newStory) => API.post(`/api/story/create/${getLoggedInUser()}`, newStory);

  export const updateStory = (id, updatedStory) =>
  API.patch(`/api/story/${id}`, updatedStory);
  export const addComment = (newComment) =>
  API.post(`/api/comment`, newComment);
  export const fetchComment=(postId)=>API.get(`/api/comment/${postId}`)
