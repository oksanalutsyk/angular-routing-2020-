import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NewsComponent } from '../news/news.component';
import { AboutComponent } from '../about/about.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'news', component: NewsComponent },
      { path: 'about', component: AboutComponent },
    ]),
  ],
  declarations: [HomeComponent, NewsComponent, AboutComponent],
  providers: [],
})
export class HomeModule {}
