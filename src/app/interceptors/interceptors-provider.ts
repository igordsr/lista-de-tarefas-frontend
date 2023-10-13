import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor';
import { ErrorNotifierIntercerptorService } from './error-notifier-intercerptor';



export const INTERCEPTOR_PROVIDERS = [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorNotifierIntercerptorService, multi: true }
];
