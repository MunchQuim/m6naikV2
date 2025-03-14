import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { FormComponent } from './components/form/form.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { adminGuard } from './guard/auth.guard';
import { customerGuard } from './guard/customer-guard.guard';


export const routes: Routes = [
    { path: "home", component: MainComponent },
    { path: "", redirectTo: 'home', pathMatch: 'full' },
    {
        path: "admin", component: FormComponent,
        canActivate: [adminGuard]
    },
    { path: "products", component: ProductsComponent },
    {
        path: "carrito", component: ProductsComponent,
        canActivate: [customerGuard]
    },
];
