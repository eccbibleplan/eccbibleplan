import {
    SET_TASKS,
    LOADING_DATA,
    COMPLETE_TASK,
    UNDO_COMPLETE_TASK,
    DELETE_TASK,
    CLEAR_ERRORS,
    SET_ERRORS,
    LOADING_UI,
    POST_TASK,
    SET_TASK,
    STOP_LOADING_UI,
    SUBMIT_COMMENT,
    LOADING_USER,
    APPEND_IMAGEURL_TO_ANNOUNCEMENT
} from "../types";
import axios from 'axios';

export const getTasks = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get("/tasks")
        .then(res => {
            dispatch({
                type: SET_TASKS,
                payload: res.data.map(s => ({...s, taskId: s.taskId}))
            })
        })
        .catch(err => {
            dispatch({
                type: SET_TASKS,
                payload: []
            })

        })
};

export const getTask = (taskId) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.get(`/task/${taskId}`)
        .then(res => {
            dispatch({
                type: SET_TASK,
                payload: {...res.data, taskId: res.data.taskId}
            });
            dispatch({
                type: STOP_LOADING_UI
            })
        })
        .catch(err => {
            console.log(err);
        })
};

export const postTask = (newTask) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.post("/task", newTask)
        .then(res => {
            dispatch({
                type: POST_TASK,
                payload: {...res.data, taskId: res.data.taskId}
            });
            dispatch(clearErrors())
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
};

export const updateTask = (taskId, body) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.post(`/task/${taskId}`, { body: body })
        .then(() => {
            dispatch(getTasks());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
};

export const completeTask = (taskId) => dispatch => {
    axios.get(`/task/${taskId}/complete`)
        .then(res => {
            dispatch({
                type: COMPLETE_TASK,
                payload: {...res.data, taskId: taskId}
            })
        })
        .catch(err => console.log(err))
};

export const undoCompleteTask = (taskId) => dispatch => {
    axios.get(`/task/${taskId}/undo_complete`)
        .then(res => {
            dispatch({
                type: UNDO_COMPLETE_TASK,
                payload: {...res.data, taskId: taskId}
            })
        })
        .catch(err => console.log(err))
};

export const deleteTask = (taskId) => dispatch => {
    axios.delete(`/task/${taskId}`)
        .then(() => {
            dispatch({
                type: DELETE_TASK, payload: taskId
            })
        })
        .catch(err => console.log(err));
};

export const archiveTask = (taskId) => dispatch => {
    axios.post(`/task/${taskId}`, { isArchived: true })
        .then(() => {
            dispatch(getTasks());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
};

export const pinTask = (taskId, pinToTop) => dispatch => {
    axios.post(`/task/${taskId}`, { pinToTop })
        .then(() => {
            dispatch(getTasks());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
};

export const submitComment = (taskId, commentData) => dispatch => {
    axios.post(`/task/${taskId}/comment`, commentData)
        .then(res => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
};

export const getUserData = (userHandle) => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/user/${userHandle}`)
        .then((res) => {
            dispatch({
                type: SET_TASKS,
                payload: res.data.tasks
            })
        })
        .catch(() => {
            dispatch({
                type: SET_TASKS,
                payload: []
            });
        });
};

export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS })
};

export const uploadImageForPost = (taskId, formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post(`/task/${taskId}/image`, formData)
        .then(res => {
            dispatch({
                type: APPEND_IMAGEURL_TO_ANNOUNCEMENT,
                payload: res.data.imageUrl
            })
        })
        .catch(err => console.log(err))
};
