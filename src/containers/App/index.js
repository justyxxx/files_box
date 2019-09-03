import React, {PureComponent} from 'react'
import Header from '@containers/Header'
import DriveBody from '@components/DriveBody'
import Dropzone from 'react-dropzone'
import withStyles from 'react-jss'
import {Fade} from 'react-bootstrap'
import FilesUpload from '@components/FilesUpload'
import connect from 'react-redux/es/connect/connect'
import {BrowserRouter} from 'react-router-dom'
import {actionAddFiles} from '@common/actions/filesAction'
import {selectorSelectUserLocale} from '@common/selectors/headerSelector'

class App extends PureComponent {
    state = {
        showProgress: false,
        success: null,
        filesCount: 0,
        loadedFiles: 0
    }
    onDrop = (acceptedFiles, rejectedFiles) => {
        try {
            let storageRef = firebase.storage().ref()
            let filesCount = acceptedFiles.length
            if (filesCount < 0) {
                return
            }
            this.setState({
                showProgress: true,
                filesCount: filesCount
            })
            let loaded = 0
            let files = []
            acceptedFiles.forEach((f) => {
                storageRef
                    .child('files/' + f.name)
                    .put(f)
                    .then((response) => {
                        const {metadata} = response
                        if (response.state === 'success') {
                            loaded++
                            files = [...files, metadata]
                            this.setState({
                                loadedFiles: loaded
                            })
                            if (loaded === filesCount) {
                                this.setState({
                                    success: true
                                })
                                this.props.addFiles(files)
                            }
                        }
                    })
            })
        } catch (e) {
            this.setState({
                success: false
            })
        }
    }

    componentDidUpdate() {
        const {showProgress, success} = this.state
        if (success && showProgress) {
            setTimeout(() => {
                this.setState({
                    showProgress: false,
                    success: null,
                    filesCount: 0,
                    loadedFiles: 0
                })
            }, 3000)
        }
    }

    render() {
        const {classes, locale} = this.props
        const {filesCount, loadedFiles, success, showProgress} = this.state
        return (
            <BrowserRouter basename="/">
                <Dropzone onDrop={this.onDrop}>
                    {({getRootProps, getInputProps, isDragActive}) => {
                        return (
                            <div
                                className={classes.dropZone}
                                {...getRootProps({onClick: (evt) => evt.preventDefault()})}
                            >
                                <Header
                                    isDragActive={isDragActive}
                                    getInputProps={getInputProps}
                                    getRootProps={getRootProps}
                                />
                                <DriveBody />
                                <Fade mountOnEnter unmountOnExit in={showProgress}>
                                    <FilesUpload
                                        filesCount={filesCount}
                                        loadedFiles={loadedFiles}
                                        success={success}
                                        showProgress={showProgress}
                                        locale={locale}
                                    />
                                </Fade>
                            </div>
                        )
                    }}
                </Dropzone>
            </BrowserRouter>
        )
    }
}
const styles = (theme) => ({
    dropZone: {
        outline: 'none',
        height: '100vh'
    }
})
export default withStyles(styles)(
    connect(
        (state) => ({
            locale: selectorSelectUserLocale(state)
        }),
        (dispatch) => ({
            addFiles: (files) => {
                dispatch(actionAddFiles(files))
            }
        })
    )(App)
)
