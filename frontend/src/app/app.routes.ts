// app.routes.ts
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { NgModule } from '@angular/core';
import { SearchResultsComponent } from './search-results/search-results.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: ':name/:id', component: ProductPageComponent },
  { path: 'search', component: SearchResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Use RouterModule para importar as rotas configuradas
  exports: [RouterModule],
})
export class AppRoutingModule {}
