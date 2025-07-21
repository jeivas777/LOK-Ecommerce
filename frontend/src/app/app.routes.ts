// app.routes.ts
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './ecommerce/pages/home/home.component';
import { ProductPageComponent } from './ecommerce/pages/product-page/product-page.component';
import { NgModule } from '@angular/core';
import { SearchResultsComponent } from './ecommerce/components/search-results/search-results.component';
import { LoginPageComponent } from './auth/login/login-page.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './auth/auth.guard';
import { ContaComponent } from './ecommerce/pages/conta/conta.component';
import { EnderecosComponent } from './ecommerce/pages/conta/enderecos/enderecos.component';
import { PedidosComponent } from './ecommerce/pages/conta/pedidos/pedidos.component';
import { DadosPessoaisComponent } from './ecommerce/pages/conta/dados-pessoais/dados-pessoais.component';
import { CadastrarEnderecoComponent } from './ecommerce/pages/conta/enderecos/cadastrar-endereco/cadastrar-endereco.component';
import { EditarEnderecoComponent } from './ecommerce/pages/conta/enderecos/editar-endereco/editar-endereco.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchResultsComponent },
  {
    path: 'account',
    component: ContaComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DadosPessoaisComponent },
      {
        path: 'enderecos',
        component: EnderecosComponent,
      },
      { path: 'enderecos/cadastrar', component: CadastrarEnderecoComponent },
      { path: 'enderecos/editar/:id', component: EditarEnderecoComponent },
      { path: 'pedidos', component: PedidosComponent },
    ],
  },
  { path: 'account/login', component: LoginPageComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: ':name/:id', component: ProductPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
