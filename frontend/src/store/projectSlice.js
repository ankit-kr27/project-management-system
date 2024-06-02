import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    projects: [],
    project: null,
    loading: false,
    error: null,
};


export const projectSlice = createSlice({
    name: "project",
    initialState: initialState,
    reducers: {
        getProjects: (state, action) => {
            state.projects = action.payload;
        },
        getProject: (state, action) => {
            state.project = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { getProjects, getProject, setLoading, setError } = projectSlice.actions;

export default projectSlice.reducer;