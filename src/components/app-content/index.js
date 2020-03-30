import React from 'react'
import PropTypes from 'prop-types';
import Search from './../search'
import UserInfo from './../user-info'
import Actions from './../actions'
import Repos from './../repos'

const AppContent = ({
    userinfo,
    repos,
    starred,
    handleSearch,
    getRepos,
    getStarred,
    isFetching,
    isFetchingError,
    handlePagination
}) => (
        <div className="app">
            <Search handleSearch={handleSearch} isDisabled={isFetching} />

            {isFetching
                ?
                <span>Carregando...</span>
                :
                <>
                    {isFetchingError ?
                        <span>Usuário não encontrado</span>
                        :
                        <>
                            {!!userinfo && <UserInfo userinfo={userinfo} />}
                            {!!userinfo && <Actions getRepos={getRepos} getStarred={getStarred} />}

                            {!!repos.repos.length &&
                                <Repos className='repos'
                                    title="Repostórios"
                                    repos={repos}
                                    handlePagination={clicked => handlePagination('repos', clicked)}
                                />
                            }
                            {!!starred.repos.length &&
                                <Repos
                                    className='starred'
                                    title="Favoritos"
                                    repos={starred}
                                    handlePagination={clicked => handlePagination('starred', clicked)}
                                />
                            }
                        </>
                    }

                </>
            }

        </div>
    )

const reposPropTypesShape = {
    repos: PropTypes.array.isRequired,
    pagination: PropTypes.object
}

AppContent.protoTypes = {
    userinfo: PropTypes.object,
    repos: PropTypes.shape(reposPropTypesShape).isRequired,
    starred: PropTypes.shape(reposPropTypesShape).isRequired,
    handleSearch: PropTypes.func.isRequired,
    getRepos: PropTypes.func.isRequired,
    getStarred: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isFetchingError: PropTypes.bool.isRequired,
    handlePagination: PropTypes.func.isRequired
}

export default AppContent