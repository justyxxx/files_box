import axios from '@configs/rest'

const folders = '/folders.json'
const files = '/files.json'

export const apiGetFolders = () => axios.get(folders)
export const apiAddFolders = (newFolders) => axios.put(folders, newFolders)
export const apiGetFiles = () => axios.get(files)
export const apiAddFiles = (newFiles) => axios.put(files, newFiles)
