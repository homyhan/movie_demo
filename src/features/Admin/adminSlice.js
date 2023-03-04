import {produce} from 'immer';
const initialState = {
    movies:{},
    selectedFilm: null,
    userList: {},
    selectedUser: null,
    userListSearch: {}
}

export const adminReducer = (state=initialState, {type, payload})=>{
    return produce(state, (draft)=>{
        if(type==="SET_MOVIES_ADMIN"){
            draft.movies = payload
        }
        if(type === "SET_MOVIE_ITEM"){
            draft.selectedFilm = payload
        }
        if(type==="SET_USER_LIST"){
            draft.userList = payload
        }
        if(type==="SET_USER_ITEM"){
            draft.selectedUser = payload
        }
        if(type==="SET_USER_LIST_SEARCH"){
            draft.userListSearch =  payload
        }
    })
}