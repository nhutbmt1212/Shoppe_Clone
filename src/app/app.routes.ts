import { Routes } from '@angular/router';
import { HomeComponent } from './Dashboard/home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './Dashboard/cart/cart.component';
import { DetailProductComponent } from './Dashboard/detail-product/detail-product.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';
import { ProductComponent } from './Management/product/product.component';
import { CategoryComponent } from './Management/category/category.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { NotFoundComponent } from './not-found/not-found.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'cart', component: CartComponent },
            { path: 'detail', component: DetailProductComponent }
        ]
    },
    {
        path: '',
        component: BlankLayoutComponent,
        children: [
            { path: '', component: LoginComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    },
    {
        path: '',
        component: AdminManagementComponent,
        children: [
            { path: 'admin/product', component: ProductComponent },
            { path: 'admin/category', component: CategoryComponent }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

