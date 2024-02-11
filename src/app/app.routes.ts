import { Routes } from '@angular/router';
import { HomeComponent } from './Dashboard/home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './Dashboard/cart/cart.component';
import { DetailProductComponent } from './Dashboard/detail-product/detail-product.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';


export const routes: Routes = [
    {
        path:'',
        component : MainLayoutComponent,
        children:[
            {path:'',redirectTo:'/home',pathMatch:'full'},
            {path:'home',component: HomeComponent},
            {path:'cart',component: CartComponent},
            {path:'detail',component: DetailProductComponent}

        ]
    },
    {
        path:'',
        component: BlankLayoutComponent,
        children:[
            {path:'login',component:LoginComponent},
            {path:'register',component:RegisterComponent}

        ]
    },
    {
        path:'**',redirectTo:'/home'
    }
];
