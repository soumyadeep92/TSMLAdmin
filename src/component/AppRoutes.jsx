import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AddUser } from '../pages/user/AddUser'
import Dashboard from '../pages/Dashboard'
import { Login } from '../pages/Login'
import { AddUserType } from '../pages/user-type/AddUserType'
import { AddCvrMode } from '../pages/cvr-mode/AddCvrMode'
import { ListUser } from '../pages/user/ListUser'
import { ListUserType } from '../pages/user-type/ListUserType'
import { ListCvrMode } from '../pages/cvr-mode/ListCvrMode'
import PrivateComponent from './PrivateComponent'
import { EditUser } from '../pages/user/EditUser'
import { ViewUser } from '../pages/user/ViewUser'
import { EditUserType } from '../pages/user-type/EditUserType'
import { EditCvrMode } from '../pages/cvr-mode/EditCvrMode'
import { ListCategory } from '../pages/category/ListCategory'
import { AddCategory } from '../pages/category/AddCategory'
import { EditCategory } from '../pages/category/EditCategory'
import { ListMaterial } from '../pages/material/ListMaterial'
import { AddMaterial } from '../pages/material/AddMaterial'
import { EditMaterial } from '../pages/material/EditMaterial'
import { ListProduct } from '../pages/product/ListProduct'
import { AddProduct } from '../pages/product/AddProduct'
import { EditProduct } from '../pages/product/EditProduct'
import { ListReason } from '../pages/reason/ListReason'
import { AddReason } from '../pages/reason/AddReason'
import { EditReason } from '../pages/reason/EditReason'
import { EditStandard } from '../pages/standard/EditStandard'
import { AddStandard } from '../pages/standard/AddStandard'
import { ListStandard } from '../pages/standard/ListStandard'
import { ListCustomerType } from '../pages/customr-type/ListCustomerType'
import { AddCustomerType } from '../pages/customr-type/AddCustomerType'
import { EditCustomerType } from '../pages/customr-type/EditCustomerType'
import { RolePermission } from '../pages/role-permission/RolePermission'

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
                <Route path = '/edit-user/:id' element ={<EditUser/>}/>
                <Route path = '/view-user/:id' element ={<ViewUser/>}/>

                <Route path = '/list-user-type' element ={<ListUserType/>}/>
                <Route path = '/add-user-type' element ={<AddUserType/>}/>
                <Route path = '/edit-user-type/:id' element ={<EditUserType/>}/>

                <Route path = '/role-permission' element ={<RolePermission/>}/>

                <Route path = '/list-cvr-mode' element ={<ListCvrMode/>}/>
                <Route path = '/add-cvr-mode' element ={<AddCvrMode/>}/>
                <Route path = '/edit-cvr-mode/:id' element ={<EditCvrMode/>}/>

                <Route path = '/list-category' element ={<ListCategory/>}/>
                <Route path = '/add-category' element ={<AddCategory/>}/>
                <Route path = '/edit-category/:id' element ={<EditCategory/>}/>

                <Route path = '/list-material' element ={<ListMaterial/>}/>
                <Route path = '/add-material' element ={<AddMaterial/>}/>
                <Route path = '/edit-material/:id' element ={<EditMaterial/>}/>

                <Route path = '/list-product' element ={<ListProduct/>}/>
                <Route path = '/add-product' element ={<AddProduct/>}/>
                <Route path = '/edit-product/:id' element ={<EditProduct/>}/>

                <Route path = '/list-reason' element ={<ListReason/>}/>
                <Route path = '/add-reason' element ={<AddReason/>}/>
                <Route path = '/edit-reason/:id' element ={<EditReason/>}/>

                <Route path = '/list-standard' element ={<ListStandard/>}/>
                <Route path = '/add-standard' element ={<AddStandard/>}/>
                <Route path = '/edit-standard/:id' element ={<EditStandard/>}/>

                <Route path = '/list-customer-type' element ={<ListCustomerType/>}/>
                <Route path = '/add-customer-type' element ={<AddCustomerType/>}/>
                <Route path = '/edit-customer-type/:id' element ={<EditCustomerType/>}/>

            </Route>
        </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default AppRoutes