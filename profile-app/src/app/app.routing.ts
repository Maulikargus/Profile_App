import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';

const appRoutes:Routes =[
    {
        path:'',
        component:LoginComponent
    },
    {
        path:'profile',
        component:ProfileComponent 
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)
