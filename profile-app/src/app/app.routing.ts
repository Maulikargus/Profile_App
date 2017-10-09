import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AllprofileComponent} from './components/allprofile/allprofile.component'
const appRoutes:Routes =[
    {
        path:'',
        component:LoginComponent
    },
    {
        path:'profile',
        component:ProfileComponent 
    },
    {
        path:'allprofile',
        component:AllprofileComponent
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)
