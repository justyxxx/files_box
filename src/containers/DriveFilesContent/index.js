import React, {PureComponent} from 'react'
import {withRouter} from 'react-router-dom'
import withStyles from 'react-jss'
import connect from 'react-redux/es/connect/connect'
import {actionGetFolders, actionDeleteFolder, actionDeleteFile} from '@common/actions/filesAction'
import {selectorSelectFile, selectorSelectFolder} from '@common/selectors/filesSelector'
import FoldersList from '@components/FoldersList'
import {selectorSelectUserLocale} from '@common/selectors/headerSelector'
import {getLocale} from '@common/utils/localizations'
import FilesList from '@components/FilesList'
import {Button, Modal, Panel} from 'react-bootstrap'
import Drawer from '@styleguide/Drawer'
import moment from 'moment'
import axios from 'axios'
import FileDowload from 'js-file-download'

class DriveFilesContent extends PureComponent {
    state = {
        foldersDeleteDialog: false,
        folderId: null,
        fileDeleteDialog: false,
        fileId: null,
        openFileDrawer: false,
        selectedFile: []
    }
    componentDidMount() {
        this.handleGetFolder()
    }

    componentDidUpdate() {
        this.handleGetFolder()
    }

    handleGetFolder = () => {
        const {match, getFolders} = this.props
        if (match.params.id) {
            getFolders(match.params.id)
            return
        }
        getFolders(false)
    }

    handleAcceptDeleteFolder = () => {
        const {deleteFolder} = this.props
        const {folderId} = this.state
        deleteFolder(folderId)
        this.handleHideDialog()
    }

    handleAcceptDeleteFile = () => {
        const {deleteFile} = this.props
        const {fileId} = this.state
        deleteFile(fileId)
        this.setState({
            openFileDrawer: false
        })
        this.handleHideDialog()
    }

    handleDeleteFolder = (id) => {
        this.setState({
            foldersDeleteDialog: true,
            folderId: id
        })
    }

    handleDeleteFile = (id) => {
        this.setState({
            fileDeleteDialog: true,
            fileId: id
        })
    }

    handleHideDialog = () => {
        this.setState({
            foldersDeleteDialog: false,
            folderId: null,
            fileDeleteDialog: false,
            fileId: null
        })
    }

    handleFileClick = (id) => {
        const {files} = this.props
        this.setState({
            openFileDrawer: true,
            selectedFile: files.filter((f) => f.id === id)[0]
        })
    }

    handleCloseDrawer = () => {
        this.setState({
            openFileDrawer: false
        })
    }

    handleDownloadFile = (title) => {
        let storageRef = firebase.storage().ref()
        storageRef
            .child('files/' + title)
            .getDownloadURL()
            .then((url) => {
                axios({
                    method: 'GET',
                    url: url,
                    responseType: 'blob'
                }).then((response) => {
                    FileDowload(response.data, title)
                })
            })
    }

    render() {
        const {classes, locale, folders, files} = this.props
        const {foldersDeleteDialog, openFileDrawer, selectedFile, fileDeleteDialog} = this.state
        const NoFiles =
            folders.length === 0 && files.length === 0 ? (
                <div>
                    <p>{getLocale(locale, 'locale.info.no_files_and_folders')}</p>
                </div>
            ) : null
        return (
            <div>
                <Panel className={classes.panel}>
                    <Panel.Body>{getLocale(locale, 'locale.folders')}</Panel.Body>
                </Panel>
                {NoFiles}
                <div className={classes.folderAndFilesWrapper}>
                    {R.map((folder) => (
                        <FoldersList
                            locale={locale}
                            key={folder.id}
                            def={folder.default}
                            id={folder.id}
                            title={folder.title}
                            onDelete={this.handleDeleteFolder}
                        />
                    ))(folders)}
                </div>
                <Panel>
                    <Panel.Body>{getLocale(locale, 'locale.files')}</Panel.Body>
                </Panel>
                {NoFiles}
                <div className={classes.folderAndFilesWrapper}>
                    {R.map((file) => (
                        <FilesList
                            key={file.id}
                            locale={locale}
                            id={file.id}
                            title={file.title}
                            extension={file.extension}
                            creationDate={file.creationDate}
                            onFileClick={this.handleFileClick}
                        />
                    ))(files)}
                </div>
                <Modal show={foldersDeleteDialog} container={this} onHide={this.handleHideDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>{getLocale(locale, 'locale.title.delete')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{getLocale(locale, 'locale.folders.delete')}</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleAcceptDeleteFolder}>
                            {getLocale(locale, 'locale.actions.accept')}
                        </Button>
                        <Button onClick={this.handleHideDialog}>{getLocale(locale, 'locale.actions.close')}</Button>
                    </Modal.Footer>
                </Modal>
                <Drawer open={openFileDrawer} onClose={this.handleCloseDrawer} width={400} position="right">
                    <div className={classes.drawerContent}>
                        <div>
                            <h4>
                                <strong>{getLocale(locale, 'locale.files.name')}</strong>
                            </h4>
                            <p>{selectedFile.title}</p>
                        </div>
                        <div>
                            <h4>
                                <strong>{getLocale(locale, 'locale.files.size')}</strong>
                            </h4>
                            <p>{selectedFile.size}</p>
                        </div>
                        <div>
                            <h4>
                                <strong>{getLocale(locale, 'locale.files.creation_date')}</strong>
                            </h4>
                            <p>{moment(selectedFile.creationDate).format('LL')}</p>
                        </div>
                        <div>
                            <h4>
                                <strong>{getLocale(locale, 'locale.files.extension')}</strong>
                            </h4>
                            <p>{selectedFile.extension}</p>
                        </div>
                        <div>
                            <Button onClick={() => this.handleDownloadFile(selectedFile.title)}>
                                {getLocale(locale, 'locale.actions.download')}
                            </Button>
                            <Button onClick={() => this.handleDeleteFile(selectedFile.id)}>
                                {getLocale(locale, 'locale.actions.delete')}
                            </Button>
                        </div>
                    </div>
                </Drawer>
                <Modal show={fileDeleteDialog} container={this} onHide={this.handleHideDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>{getLocale(locale, 'locale.title.delete')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{getLocale(locale, 'locale.file.delete')}</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleAcceptDeleteFile}>
                            {getLocale(locale, 'locale.actions.accept')}
                        </Button>
                        <Button onClick={this.handleHideDialog}>{getLocale(locale, 'locale.actions.close')}</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const styles = (theme) => ({
    folderAndFilesWrapper: {
        ...theme['flexStart'],
        flexWrap: 'wrap',
        margin: '20px 0',
        alignItems: 'flex-start'
    },
    fileActions: {
        ...theme['flexStart'],
        '& button': {
            marginRight: 10
        }
    },
    panel: {
        marginTop: 20
    },
    drawerContent: {
        padding: 10,
        '&>div': {
            ...theme['flexStart'],
            paddingBottom: 10,
            marginBottom: 10,
            borderBottom: '1px solid #ddd',
            '& h4, & p': {
                margin: 0,
                marginRight: 10
            },
            '& button': {
                marginRight: 10
            }
        }
    }
})

export default withRouter(
    withStyles(styles)(
        connect(
            (state) => ({
                folders: selectorSelectFolder(state),
                files: selectorSelectFile(state),
                locale: selectorSelectUserLocale(state)
            }),
            (dispatch) => ({
                getFolders: (parent_folder) => {
                    dispatch(actionGetFolders(parent_folder))
                },
                deleteFolder: (id) => {
                    dispatch(actionDeleteFolder(id))
                },
                deleteFile: (id) => {
                    dispatch(actionDeleteFile(id))
                }
            })
        )(DriveFilesContent)
    )
)
