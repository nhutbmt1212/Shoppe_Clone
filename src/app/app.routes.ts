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
import { AuthGuard } from './auth.guard';

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
            { path: 'home', title: 'Trang chủ', component: HomeComponent },
            { path: 'cart', title: 'Giỏ hàng', component: CartComponent, canActivate: [AuthGuard] },
            { path: 'detail/:id', title: 'Chi tiết sản phẩm', component: DetailProductComponent }
        ]
    },
    {
        path: '',
        component: BlankLayoutComponent,
        children: [

            { path: '', title: 'Đăng nhập', component: LoginComponent },
            { path: 'login', title: 'Đăng nhập', component: LoginComponent },
            { path: 'register', title: 'Đăng ký', component: RegisterComponent }
        ]
    },
    {
        path: '',
        component: AdminManagementComponent,
        children: [
            { path: 'admin/product', title: 'Quản lý sản phẩm', component: ProductComponent, canActivate: [AuthGuard], data: { role: "admin" } },
            { path: 'admin/category', title: 'Quản lý danh mục', component: CategoryComponent, canActivate: [AuthGuard], data: { role: "admin" } }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent

    }, {
        path: 'not-found',
        component: NotFoundComponent
    }
];

