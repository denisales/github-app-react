import React, { Component } from 'react';
import AppContent from './components/app-content'
import axios from 'axios'
const initialReposState = {
  repos: [],
  pagination: {
    total: 1,
    activePage: 1
  }
}
class App extends Component {
  constructor() {
    super()
    this.state = {
      userinfo: null,
      repos: initialReposState,
      starred: initialReposState,
      isFetching: false,
      isFetchingError: false
    }
    this.perPage = 3
  }

  getGitHubApiUrl(username, type, page = 1) {
    const internalUser = username ? `/${username}` : ''
    const internalType = type ? `/${type}` : ''
    return `https://api.github.com/users${internalUser}${internalType}?per_page=${this.perPage}&page=${page}`
  }

  handleSearch(e) {
    const value = e.target.value
    const keyCode = e.which || e.keyCode
    const ENTER = 13
    if (value.length)
      if (keyCode === ENTER) {
        this.setState({ isFetching: true })
        axios.get(this.getGitHubApiUrl(value))
          .then(({ data }) => {
            this.setState({
              userinfo: {
                username: data.name,
                photo: data.avatar_url,
                login: data.login,
                repos: data.public_repos,
                followers: data.followers,
                following: data.following
              },
              repos: initialReposState,
              starred: initialReposState,
              isFetchingError: false
            })
          })
          .catch(() => this.setState({ isFetchingError: true }))
          .finally(() => this.setState({ isFetching: false }))
      }
  }

  getRepos(type, page) {
    return (e) => {
      const username = this.state.userinfo.login
      axios.get(this.getGitHubApiUrl(username, type, page))
        .then((response) => {
          let linkHeader =  response.headers.link || ''
          const totalPagesMatch = linkHeader.match(/&page=(\d+)>; rel="last/)
        
          this.setState({
            [type]: {
              repos: response.data.map(repo => ({ name: repo.name, link: repo.html_url })),
              pagination:{
                total: !!totalPagesMatch ? +totalPagesMatch[1] : this.state[type].pagination.total,
                activePage: page,
              }
            }
          })
        })
    }
  }

  render() {
    return (
      <AppContent
        {...this.state}
        handleSearch={e => this.handleSearch(e)}
        getRepos={this.getRepos('repos')}
        getStarred={this.getRepos('starred')}
        handlePagination={(type, page) => this.getRepos(type, page)()}
      />
    )
  }
}

export default App;
