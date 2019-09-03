import * as filesConstants from '@common/constants/filesConstants'

export const actionSetFolders = (folders) => ({
    type: filesConstants.SET_FOLDERS,
    folders: folders
})

export const actionSetFiles = (files) => ({
    type: filesConstants.SET_FILES,
    files: files
})

export const actionGetFolders = (id) => ({
    type: filesConstants.GET_FOLDERS,
    id: id
})

export const actionAddFolder = (title) => ({
    type: filesConstants.ADD_FOLDER,
    title: title
})

export const actionAddFiles = (files) => ({
    type: filesConstants.ADD_FILE,
    files: files
})

export const actionDeleteFolder = (id) => ({
    type: filesConstants.DELETE_FOLDER,
    id: id
})

export const actionDeleteFile = (id) => ({
    type: filesConstants.DELETE_FILE,
    id: id
})
