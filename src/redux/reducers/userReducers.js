import {
    SET_USER,
    LOADING_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    COMPLETE_TASK,
    UNDO_COMPLETE_TASK,
    MARK_NOTIFCATIONS_READ
} from "../types";

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: [],
    loading: false
};

const userReducers = function(state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                loading: false,
                authenticated: true,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            };
        case COMPLETE_TASK:
            return {
                ...state,
                taskCompletions: [
                    ...state.taskCompletions,
                    {
                        userHandle: state.credentials.handle,
                        taskId: action.payload.taskId
                    }
                ]
            };
        case UNDO_COMPLETE_TASK:
            return {
                ...state,
                taskCompletions: state.taskCompletions.filter(t => t.taskId !== action.payload.taskId)
            };
        case MARK_NOTIFCATIONS_READ:
            state.notifications.forEach(n => n.read = true);
            return {...state};
        default:
            return state
    }
}

export default userReducers;