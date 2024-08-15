import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './pages/customer-dashboard/customer-dashboard.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { AdminGuard } from './core/guards/admin/admin.guard';
import { CustomerGuard } from './core/guards/customer/customer.guard';

export const routes: Routes = [
    {
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full'
    }, 
    {
        path: 'access-denied', 
        component: AccessDeniedComponent
    }, 
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'login', 
                component: LoginComponent, 
            },
            {
                path: 'admin-dashboard', 
                component: AdminDashboardComponent, 
                canActivate: [AdminGuard]
            }, 
            {
                path: 'customer-dashboard', 
                component: CustomerDashboardComponent, 
                canActivate: [CustomerGuard]
            }
        ]
    }
];
