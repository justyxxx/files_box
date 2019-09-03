import * as filesConstants from '@common/constants/filesConstants'
const initialState = {
    folders: [],
    files: [],
    parent_folder: false
}

export default function filesReducer(state = initialState, action = {}) {
    switch (action.type) {
        case filesConstants.SET_FOLDERS:
            return {
                ...state,
                folders: action.folders
            }
        case filesConstants.SET_FILES:
            return {
                ...state,
                files: action.files
            }
        case filesConstants.GET_FOLDERS:
            return {
                ...state,
                parent_folder: action.id
            }
        default:
            return state
    }
}
