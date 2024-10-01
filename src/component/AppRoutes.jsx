import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AddUser } from '../pages/user/AddUser'
import Dashboard from '../pages/Dashboard'
import { Login } from '../pages/Login'
import { AddUserType } from '../pages/user-type/AddUserType'
import { AddCvrMode } from '../pages/cvr-mode/AddCvrMode'
import { AddReason } from '../pages/reason-for-not-buying/AddReason'
import { AddUserPlant } from '../pages/user-plant/AddUserPlant'
import { ListUser } from '../pages/user/ListUser'
import { ListUserPlant } from '../pages/user-plant/ListUserPlant'
import { ListUserType } from '../pages/user-type/ListUserType'
import { ListCvrMode } from '../pages/cvr-mode/ListCvrMode'
import { ListReason } from '../pages/reason-for-not-buying/ListReason'
import PrivateComponent from './PrivateComponent'

const AppRoutes = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path ='/' element = {<Login/>}/>
            <Route element={<PrivateComponent />}>
                <Route path ='/dashboard' element = {<Dashboard/>}/>

                <Route path = '/list-user' element ={<ListUser/>}/>
                <Route path = '/add-user' element ={<AddUser/>}/>

                <Route path = '/list-user-type' element ={<ListUserType/>}/>
                <Route path = '/add-user-type' element ={<AddUserType/>}/>

                <Route path = '/list-cvr-mode' element ={<ListCvrMode/>}/>
                <Route path = '/add-cvr-mode' element ={<AddCvrMode/>}/>

                <Route path = '/list-reason' element ={<ListReason/>}/>
                <Route path = '/add-reason' element ={<AddReason/>}/>

                <Route path = '/list-user-plant' element ={<ListUserPlant/>}/>
                <Route path = '/add-user-plant' element ={<AddUserPlant/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default AppRoutes