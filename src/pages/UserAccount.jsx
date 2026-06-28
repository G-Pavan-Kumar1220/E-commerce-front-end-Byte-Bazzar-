import React from 'react'
import LoginState from '../Contex_API/LoginState'
import Header from '../components/Header'
import Footer from '../components/Footer'
import UserDetails from '../components/UserDetails'

function UserAccount() {
  return (
    <LoginState>
        <Header/>
        <UserDetails/>
        <Footer/>
    </LoginState>
  )
}

export default UserAccount