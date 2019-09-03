import {createSelector} from 'reselect'

export const selectorSelectParentFolder = createSelector(
    R.path(['files', 'parent_folder']),
    (parent_folder) => parent_folder
)

export const selectorSelectFolders = createSelector(
    R.path(['files', 'folders']),
    (folders) => folders
)

export const selectorSelectFolder = createSelector(
    selectorSelectParentFolder,
    selectorSelectFolders,
    (parentFolder, folders) => folders.filter((f) => f.parent === parentFolder)
)
export const selectorSelectFiles = createSelector(
    R.path(['files', 'files']),
    (files) => files
)
export const selectorSelectFile = createSelector(
    selectorSelectParentFolder,
    selectorSelectFiles,
    (parentFolder, files) => files.filter((f) => f.parent_folder === parentFolder)
)
