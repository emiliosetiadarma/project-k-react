import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from './components/header'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import SignupPage from './pages/signup'
import UserGetPage from './pages/users/get'
import UserEditPage from './pages/users/edit'
import UserCreatePage from './pages/users/create'
import PropertyGetPage from './pages/properties/get'
import PropertyEditPage from './pages/properties/edit'
import PropertyCreatePage from './pages/properties/create'
import './App.css'
import './common.css'

function App(props) {
  const { currentUserID } = props

  return (
    <div className="App">
      <BrowserRouter>
        <Header currentUserID={currentUserID} />
        <div className='AppBody'>
          <Switch>
            {
              currentUserID &&
              <>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/users/create' component={UserCreatePage} />
                <Route exact path='/users/:userID' component={UserGetPage} />
                <Route exact path='/users/:userID/edit' component={UserEditPage} />
                <Route exact path='/properties/create' component={PropertyCreatePage} />
                <Route exact path='/properties/:propertyID' component={PropertyGetPage} />
                <Route exact path='/properties/:propertyID/edit' component={PropertyEditPage} />
              </>
            }
            <Route exact path='/signup' component={SignupPage} />
            <Route path='/' component={LoginPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}

const mapStateToProps = state => ({
  currentUserID: state.auth.getIn(['currentUserID']),
})

export default connect(mapStateToProps, null)(App)
