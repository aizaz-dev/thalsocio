import {createSlice} from "@reduxjs/toolkit"

const initialState={
    mode:"light",
    user:JSON.parse(localStorage.getItem('user')),
    token:localStorage.getItem('jwt'),
    page:1,
    view:'list',
    trend:'-',
    sort:'time',
    posts:[],
    users:[]
}

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setMode:(state)=>{
            state.mode=state.mode==="light"?"dark":"light"
        },
        setLogin:(state)=>{
            state.user=JSON.parse(localStorage.getItem('user'))//action.payload.user
            state.token=localStorage.getItem('jwt')//action.payload.token
        },
        setLogout:(state)=>{
            state.user=null
            state.token=null
            localStorage.clear()
        },
        setPosts:(state,action)=>{
            state.posts=action.payload.posts
        },
        createPost:(state,action)=>{
            let post=action.payload.post
            post.userName=state.user.name;
            post.userPic=state.user.pic;
            post.vote='-1';
            state.posts.unshift(post)
        },
        setPost:(state,action)=>{
            const {message,content}=action.payload.post
            const updatedPosts=state.posts.map((post)=>{
                if(post._id===action.payload.post._id){
                    return {...post,message:message,content:content}
                }else{
                    return post
                }
                
            });state.posts=updatedPosts
        },
        deletePost:(state,action)=>{
            const updatedPosts=state.posts.map((post)=>{
                if(post._id!=action.payload.post._id){
                    return post
                }
            })
            state.posts=updatedPosts
        },
        setUsers:(state,action)=>{
            state.users=action.payload.users
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
        },
        setPage:(state,action)=>{
            state.page=action.payload.page
        },
        setView:(state,action)=>{
            state.view=action.payload.view
        },
        setTrend:(state,action)=>{
            state.trend=action.payload.trend
        },
        setSort:(state,action)=>{
            state.sort=action.payload.sort
        },
    }
})

export const {setMode,setLogin,setLogout,setPosts,createPost,setPost,deletePost,setUsers,setComment,setPage,setView,setTrend,setSort}=authSlice.actions;
export default authSlice.reducer;