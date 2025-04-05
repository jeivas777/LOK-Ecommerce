// app.routes.ts
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './ecommerce/pages/home/home.component';
import { ProductPageComponent } from './ecommerce/pages/product-page/product-page.component';
import { NgModule } from '@angular/core';
import { SearchResultsComponent } from './ecommerce/components/search-results/search-results.component';
import { LoginPageComponent } from './ecommerce/pages/login-page/login-page.component';
import { RegisterComponent } from './ecommerce/pages/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'account/login', component: LoginPageComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: ':name/:id', component: ProductPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Use RouterModule para importar as rotas configuradas
  exports: [RouterModule],
})
export class AppRoutingModule {}
