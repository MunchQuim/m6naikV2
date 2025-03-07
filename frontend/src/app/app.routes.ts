import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { FormComponent } from './components/form/form.component';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
    {path:"home", component:MainComponent},
    {path:"",redirectTo:'home',pathMatch:'full'},
    {path:"admin", component:FormComponent},
    {path:"products", component:ProductsComponent},
];
