const ruLocale = {
    'locale.navigation.title.files': 'Файлы',
    'locale.navigation.title.last': 'Последние',
    'locale.navigation.title.photos': 'Фотографии',
    'locale.is_drag.label': 'Поместите перемещаемый файл куда угодно на странице',
    'locale.actions.delete': 'Удалить',
    'locale.actions.download': 'Скачать',
    'locale.actions.view': 'Просмотреть',
    'locale.actions.add': 'Добавить',
    'locale.actions.accept': 'Принять',
    'locale.actions.close': 'Закрыть',
    'locale.actions.create_folder': 'Создать папку',
    'locale.actions.upload_file': 'Загрузить файл',
    'locale.info.no_files_and_folders': 'Нет фалов или папок в этом каталоге.',
    'locale.files': 'Файлы:',
    'locale.folders': 'Папки:',
    'locale.folders.delete': 'Вы уверены что хотите удалить папку?',
    'locale.file.delete': 'Вы уверены что хотите удалить файл?',
    'locale.folder_name': 'Имя папки',
    'locale.title.delete': 'Удаление',
    'locale.errors.too_short_folder_name': 'Короткое имя папки',
    'locale.progress.upload': 'Загружено {0} из {1}',
    'locale.files.name': 'Имя:',
    'locale.files.extension': 'Расширение:',
    'locale.files.creation_date': 'Дата создания:',
    'locale.files.size': 'Размер:'
}

const enLocale = {
    'locale.navigation.title.files': 'Files',
    'locale.navigation.title.last': 'Last',
    'locale.navigation.title.photos': 'Photos',
    'locale.is_drag.label': 'Drop your draggable file everywhere on page',
    'locale.actions.delete': 'Delete',
    'locale.actions.download': 'Download',
    'locale.actions.view': 'View',
    'locale.actions.add': 'Add',
    'locale.actions.accept': 'Accept',
    'locale.actions.close': 'Close',
    'locale.actions.create_folder': 'Create folder',
    'locale.actions.upload_file': 'Upload file',
    'locale.info.no_files_and_folders': 'No files or folders found in this catalog.',
    'locale.files': 'Files:',
    'locale.folders': 'Folders:',
    'locale.folders.delete': 'Are you sure you want to delete folder?',
    'locale.file.delete': 'Are you sure you want to delete image?',
    'locale.folder_name': 'Folder name',
    'locale.title.delete': 'Deleting',
    'locale.errors.too_short_folder_name': 'Too short folder name',
    'locale.progress.upload': 'Uploaded {0} out of {1}',
    'locale.files.name': 'Name:',
    'locale.files.extension': 'Extension:',
    'locale.files.creation_date': 'Creation date:',
    'locale.files.size': 'Size:'
}

const parseParams = (locale, params) => {
    let newLocale = locale
    params.forEach((par, index) => {
        newLocale = newLocale.replace(`{${index}}`, par)
    })
    return newLocale
}

export const getLocale = (locale, key, ...expressions) => {
    switch (locale) {
        case 'ru': {
            return parseParams(ruLocale[key], expressions)
        }
        case 'en': {
            return parseParams(enLocale[key], expressions)
        }
    }
}
