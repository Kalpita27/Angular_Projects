import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/userlist/user-list/user-list.component';
import { TeamComponent } from './components/team/team/team.component';
import { DemoService } from './service/demo.service';
import { UserCardComponent } from './components/user-card/user-card/user-card.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    TeamComponent,
    UserCardComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
    // BrowserAnimationsModule,
  ],
  providers: [DemoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
