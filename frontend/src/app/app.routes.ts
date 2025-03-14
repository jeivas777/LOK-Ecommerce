// app.routes.ts
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { NgModule } from '@angular/core';
import { SearchResultsComponent } from './search-results/search-results.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComponent } from './register/register.component';

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
