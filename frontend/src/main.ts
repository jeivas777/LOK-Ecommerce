import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig) // <-- A MÁGICA ACONTECE AQUI
  .catch((err) => console.error(err));
