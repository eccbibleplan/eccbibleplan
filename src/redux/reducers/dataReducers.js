import {
    SET_TASKS,
    COMPLETE_TASK,
    UNDO_COMPLETE_TASK,
    LOADING_DATA,
    DELETE_TASK,
    POST_TASK,
    SET_TASK,
    SUBMIT_COMMENT, APPEND_IMAGEURL_TO_ANNOUNCEMENT
} from "../types";

const initialState = {
    tasks: [],
    task: {},
    loading: false
};

const reducers = function(state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_TASKS:
            const topItems = action.payload.filter(e => !!e.pinToTop);
            const regularItems = action.payload.filter(e => !e.pinToTop);

            return {
                ...state,
                tasks: [
                    ...topItems,
                    ...regularItems
                ],
                loading: false
            };
        case SET_TASK:
            return {
                ...state,
                task: action.payload
            };
        case APPEND_IMAGEURL_TO_ANNOUNCEMENT:
            return {
                ...state,
                task: {
                    ...state.task,
                    body: `${state.task.body}\n\n![](${action.payload})`
                }
            };
        case COMPLETE_TASK:
        case UNDO_COMPLETE_TASK:
            let index = state.tasks
                .findIndex((ann) => ann.taskId === action.payload.taskId);
            state.tasks[index] = action.payload;
            if(state.task.taskId === action.payload.taskId) {
                state.task = {
                    ...state.task,
                    ...action.payload
                }
            }
            return {
                ...state
            };
        case DELETE_TASK:
            let deleteIdx = state.tasks.findIndex(ann => ann.taskId === action.payload);
            state.tasks.splice(deleteIdx, 1);
            return {
                ...state
            };
        case POST_TASK:
            return {
                ...state,
                tasks: [
                    action.payload,
                    ...state.tasks
                ]
            };
        case SUBMIT_COMMENT:
            return {
                ...state,
                task: {
                    ...state.task,
                    comments: [
                        action.payload,
                        ...state.task.comments
                    ]
                }
            };
        default:
            return state;
    }
}

export default reducers;