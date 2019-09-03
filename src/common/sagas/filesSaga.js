import {call, put, select, takeEvery, cancel} from 'redux-saga/effects'
import {apiAddFiles, apiAddFolders, apiGetFiles, apiGetFolders} from '@common/api/foldersApi'
import {actionSetFiles, actionSetFolders} from '@common/actions/filesAction'
import * as filesConstants from '@common/constants/filesConstants'
import {selectorSelectFiles, selectorSelectFolders, selectorSelectParentFolder} from '@common/selectors/filesSelector'
import formatBytes from '@common/utils/converBytes'

function* getAllFolders() {
    try {
        const folders = yield call(apiGetFolders)
        if (folders.data) {
            yield put(actionSetFolders(folders.data))
        }
    } catch (e) {
        console.log(e)
    }
}

function* addNewFolder(action) {
    try {
        const folders = yield select(selectorSelectFolders)
        const parent = yield select(selectorSelectParentFolder)
        const foldersLength = folders.length
        let id = 1
        if (foldersLength !== 0) {
            id = folders[foldersLength - 1].id + 1
        }
        const newFolders = [
            ...folders,
            {
                id: id,
                title: action.title,
                default: false,
                parent: parent,
                creationDate: new Date()
            }
        ]
        yield call(apiAddFolders, newFolders)
        yield put(actionSetFolders(newFolders))
    } catch (e) {
        console.log(e)
    }
}

function* getAllFiles() {
    try {
        const files = yield call(apiGetFiles)

        if (files.data) {
            let storageRef = firebase.storage().ref()
            const newFiles = files.data.map((f) => {
                storageRef
                    .child('files/' + f.title)
                    .getDownloadURL()
                    .then((url) => {
                        f.url = url
                        return f
                    })
                return f
            })
            yield put(actionSetFiles(newFiles))
        }
    } catch (e) {
        console.log(e)
    }
}

function* addNewFiles(action) {
    try {
        const files = yield select(selectorSelectFiles)
        const parent = yield select(selectorSelectParentFolder)

        const newFiles = [
            ...files,
            ...action.files.map((f) => {
                return {
                    id: f.generation,
                    title: f.name,
                    parent_folder: parent,
                    creationDate: f.timeCreated,
                    extension: f.contentType,
                    size: formatBytes(f.size, 2)
                }
            })
        ]
        yield call(apiAddFiles, newFiles)
        yield put(actionSetFiles(newFiles))
    } catch (e) {
        console.log(e)
    }
}

function* deleteFolder(action) {
    try {
        const folders = yield select(selectorSelectFolders)
        let deleteIndex = null
        folders.forEach((f, index) => {
            if (f.id === action.id) {
                deleteIndex = index
            }
        })
        if (deleteIndex !== null) {
            const newFolders = folders.filter((f) => f.id !== action.id)
            yield call(apiAddFolders, newFolders)
            yield put(actionSetFolders(newFolders))
        }
    } catch (e) {
        console.log(e)
    }
}

function* deleteFile(action) {
    try {
        const files = yield select(selectorSelectFiles)
        let deleteIndex = null
        files.forEach((f, index) => {
            if (f.id === action.id) {
                deleteIndex = index
            }
        })
        if (deleteIndex !== null) {
            const newFiles = files.filter((f) => f.id !== action.id)
            yield call(apiAddFiles, newFiles)
            yield put(actionSetFiles(newFiles))
        }
    } catch (e) {}
}

export function* filesWatcher() {
    yield call(getAllFolders)
    yield call(getAllFiles)
    yield takeEvery(filesConstants.ADD_FOLDER, addNewFolder)
    yield takeEvery(filesConstants.ADD_FILE, addNewFiles)
    yield takeEvery(filesConstants.DELETE_FOLDER, deleteFolder)
    yield takeEvery(filesConstants.DELETE_FILE, deleteFile)
}
