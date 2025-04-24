import { Routes } from '@angular/router';
import { CheckUrlComponent } from './check-url/check-url.component';
import { HomeComponent } from './home/home.component';
import { CheckEmailComponent } from './check-email/check-email.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'check-url',
        component:CheckUrlComponent
    },
    {
        path:'check-mail',
        component:CheckEmailComponent
    },
    {
        path:'about-us',
        component:AboutUsComponent
    }
];
