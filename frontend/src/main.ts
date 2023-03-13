import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { config } from 'dotenv';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
