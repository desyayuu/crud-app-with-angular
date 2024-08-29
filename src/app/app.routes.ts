import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout/layout.component';
import { UserComponent } from './pages/admin/user/user.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { AdminGuard } from './core/guards/admin/admin.guard';
import { CustomerGuard } from './core/guards/customer/customer.guard';
import { ProductsComponent } from './pages/admin/products/products.component';
import { ClothesComponent } from './pages/public/clothes/clothes.component';
import { FurnitureComponent } from './pages/public/furniture/furniture.component';
import { ShoesComponent } from './pages/public/shoes/shoes.component';
import { CycleComponent } from './pages/public/cycle/cycle.component';
import { ElectronicsComponent } from './pages/public/electronics/electronics.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { CategoryComponent } from './pages/admin/category/category.component';

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
                path: 'admin',
                canActivate: [AdminGuard],
                children: [
                  {
                    path: '',
                    redirectTo: 'dashboard-admin',
                    pathMatch: 'full'
                  },
                  {
                    path: 'dashboard-admin',
                    component: DashboardComponent,
                  },
                  {
                    path: 'users', 
                    component: UserComponent,
                  },
                  {
                    path: 'products', 
                    component: ProductsComponent
                  }, 
                  {
                    path: 'categories',
                    component: CategoryComponent
                  }
                ]
            },
            {
                path: 'customer', 
                canActivate: [CustomerGuard], 
                children: [
                    {
                        path: '', 
                        redirectTo: 'cloth', 
                        pathMatch: 'full',
                    },
                    {
                        path: 'cloth', 
                        component: ClothesComponent
                    },
                    {
                        path: 'furniture', 
                        component: FurnitureComponent
                    }, 
                    {
                        path: 'shoe',
                        component: ShoesComponent
                    },
                    {
                        path: 'cycle', 
                        component: CycleComponent
                    }, 
                    {
                        path: 'electronic', 
                        component: ElectronicsComponent
                    }
                ]
            },
            {
                path: 'login', 
                component: LoginComponent, 
            },
        ]
    }
];
