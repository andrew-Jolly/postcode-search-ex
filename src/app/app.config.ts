import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { SearchService } from './services/search.service';

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: HttpClient, useClass: HttpClient },
        { provide: SearchService, useClass: SearchService },
        provideZoneChangeDetection({ eventCoalescing: true }), 
        provideRouter(routes),
        provideHttpClient()
    ]
};
