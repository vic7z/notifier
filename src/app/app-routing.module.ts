import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { TableComponent } from './components/table/table.component';
import { UnSubscribeComponent } from './components/un-subscribe/un-subscribe.component';

const routes: Routes = [
  {path:'',component:RegisterComponent},
  {path:'data',component:TableComponent},
  {path:'data/:id',component:TableComponent},
  {path:'bye',component:UnSubscribeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
