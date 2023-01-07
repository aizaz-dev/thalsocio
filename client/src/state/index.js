import {createSlice} from "@reduxjs/toolkit"

const initialState={
    mode:"light",
    user:JSON.parse(localStorage.getItem('user')),
    token:localStorage.getItem('jwt'),
    posts:[]
}

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setMode:(state)=>{
            state.mode=state.mode==="light"?"dark":"light"
        },
        setLogin:(state,action)=>{
            state.user=localStorage.getItem('user')//action.payload.user
            state.token=localStorage.getItem('jwt')//action.payload.token
        },
        setLogout:(state)=>{
            state.user=null
            state.token=null
        },
        setPosts:(state,action)=>{
            state.posts=action.payload.posts
        },
        setPost:(state,action)=>{
            const updatedPosts=state.posts.map((post)=>{
                if(post._id===action.payload.post_id){
                    return action.payload.post
                }else{
                    return post
                }
                state.posts=updatedPosts
            })
        },
        setComment:(state,action)=>{
            const updatedPosts=state.posts.map((post)=>{
                if(post._id===action.payload.post_id){
                    return {...post,comments:action.payload.comments}
                }else{
                    return post
                }
                state.posts=updatedPosts
            })
        }
    }
})

export const {setMode,setLogin,setLogout,setPosts,setPost,setComment}=authSlice.actions;
export default authSlice.reducer;