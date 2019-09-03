import React, {PureComponent} from 'react'
import withStyles from 'react-jss'
import {withRouter} from 'react-router-dom'
import {
    Alert,
    Button,
    Collapse,
    DropdownButton,
    MenuItem,
    Nav,
    FormControl,
    OverlayTrigger,
    Popover,
    FormGroup,
    HelpBlock
} from 'react-bootstrap'
import * as routesConstants from '@common/constants/routesConstants'
import connect from 'react-redux/es/connect/connect'
import {selectorSelectNavigationItems, selectorSelectUserLocale} from '@common/selectors/headerSelector'
import HeaderNavigationList from '@components/HeaderNavigationList'
import {getLocale} from '@common/utils/localizations'
import {actionChangeUserLocale} from '@common/actions/headerAction'
import {actionGetFolders, actionAddFolder} from '@common/actions/filesAction'

class Header extends PureComponent {
    state = {
        folderInputText: ''
    }
    componentDidMount() {
        const {history} = this.props
        if (window.location.pathname === '/') {
            history.push(routesConstants.ROOT_FOLDER + routesConstants.FOLDERS)
        }
    }

    handleChangeLocale = (locale) => {
        const {changeLocale} = this.props
        changeLocale(locale)
    }

    handleChangeInput = (event) => {
        this.setState({
            folderInputText: event.target.value
        })
    }
    handleAddFolder = () => {
        const {addFolders} = this.props
        const {folderInputText} = this.state
        if (folderInputText.length === 0) {
            this.setState({
                addFolderError: true
            })
            return
        }
        addFolders(folderInputText)
        this.setState({
            addFolderError: false,
            folderInputText: ''
        })
    }

    render() {
        const {classes, navigation, locale, isDragActive, getInputProps, getRootProps} = this.props
        const {activeId, addFolderError, folderInputText} = this.state
        const PopOver = (
            <Popover id="new_folder_popover" className={classes.popover}>
                <FormGroup {...(addFolderError ? {validationState: 'error'} : {})} className={classes.formGroup}>
                    <FormControl
                        type="input"
                        placeholder={getLocale(locale, 'locale.folder_name')}
                        onChange={this.handleChangeInput}
                        value={folderInputText}
                    />
                    {addFolderError ? (
                        <HelpBlock>{getLocale(locale, 'locale.errors.too_short_folder_name')}</HelpBlock>
                    ) : null}
                </FormGroup>
                <Button onClick={this.handleAddFolder}>{getLocale(locale, 'locale.actions.add')}</Button>
            </Popover>
        )
        return (
            <div>
                <Collapse in={isDragActive}>
                    <Alert className={classes.alert} bsStyle="info">
                        <p>{getLocale(locale, 'locale.is_drag.label')}</p>
                    </Alert>
                </Collapse>
                <div className={classes.headerWrapper}>
                    <Nav className={classes.navigation}>
                        {R.map((nav) => (
                            <HeaderNavigationList
                                key={nav.id}
                                activeId={activeId}
                                id={nav.id}
                                title={getLocale(locale, nav.title)}
                                url={nav.url}
                                icon={nav.icon}
                            />
                        ))(navigation)}
                    </Nav>
                    <div className={classes.spacer} />
                    <div className={classes.headerRightSide}>
                        <DropdownButton
                            title={locale === 'ru' ? 'Язык: Русский' : 'Language: English'}
                            id="language_drop_down"
                            bsStyle="primary"
                        >
                            <MenuItem onClick={() => this.handleChangeLocale('ru')} active={locale === 'ru'}>
                                Русский
                            </MenuItem>
                            <MenuItem onClick={() => this.handleChangeLocale('en')} active={locale === 'en'}>
                                English
                            </MenuItem>
                        </DropdownButton>
                    </div>
                </div>
                <div className={classes.headerActions}>
                    <OverlayTrigger trigger="click" placement="right" overlay={PopOver} rootClose>
                        <Button bsStyle="primary">{getLocale(locale, 'locale.actions.create_folder')}</Button>
                    </OverlayTrigger>
                    <Button {...getRootProps()} bsStyle="primary">
                        <input {...getInputProps()} />
                        {getLocale(locale, 'locale.actions.upload_file')}
                    </Button>
                </div>
            </div>
        )
    }
}

const styles = (theme) => ({
    headerWrapper: {
        ...theme['flexStart'],
        background: theme.colors.white,
        boxShadow: theme.shadows[1],
        position: 'relative'
    },
    navigation: {
        ...theme['flexStart']
    },
    spacer: {
        flex: 1
    },
    headerRightSide: {
        padding: 10
    },
    alert: {
        margin: 0,
        padding: 0,
        '& p': {
            padding: 10,
            margin: 0
        }
    },
    headerActions: {
        padding: 10,
        background: theme.colors.grey[0],
        ...theme['flexStart'],
        '& button': {
            marginRight: 10
        }
    },
    popover: {
        '& .popover-content': {
            ...theme['flexStart'],
            alignItems: 'baseline'
        },
        '& input': {
            marginRight: 10
        }
    },
    formGroup: {
        margin: 0,
        marginRight: 10
    }
})

export default withRouter(
    withStyles(styles)(
        connect(
            (state) => ({
                navigation: selectorSelectNavigationItems(state),
                locale: selectorSelectUserLocale(state)
            }),
            (dispatch) => ({
                changeLocale: (locale) => {
                    dispatch(actionChangeUserLocale(locale))
                },
                getFolders: (parent_folder) => {
                    dispatch(actionGetFolders(parent_folder))
                },
                addFolders: (title) => {
                    dispatch(actionAddFolder(title))
                }
            })
        )(Header)
    )
)
