import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router'
import {AuthGuard} from './guards/auth.guard'
import {NotAuthGuard} from './guards/notAuth.guard'
import { HomeComponent } from './containers/home/home.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { RegisterComponent } from './containers/register/register.component';
import { LoginComponent } from './containers/login/login.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { BlogComponent } from './containers/blog/blog.component';
const appRoutes : Routes =[
{
	path:'register',
	component:RegisterComponent,
	canActivate:[NotAuthGuard]
},
{
	path:'login',
	component:LoginComponent,
	canActivate:[NotAuthGuard]
},{
	path:'home',
	component:HomeComponent
},{
	path:'dashboard',
	component:DashboardComponent,
	canActivate:[AuthGuard]
},{
	path:'profile',
	component:ProfileComponent,
	canActivate:[AuthGuard]
},
{
	path:'blog',
	component:BlogComponent,
	canActivate:[AuthGuard]
},
{
	path:'**',
	component:HomeComponent
}]
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: []
})
export class AppRoutingModule { }
