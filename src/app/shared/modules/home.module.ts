import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//components
import { HomeComponent } from '../../components/home/home.component';
import { NewsComponent } from '../../components/news/news.component';
import { AboutComponent } from '../../components/about/about.component';

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
