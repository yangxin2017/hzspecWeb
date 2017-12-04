import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule  } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NmodelModule } from '../nmodel/nmodel.module';

import { SettingComponent } from './setting.component';
import { RouterComponent } from './router/router.component';
import { UserComponent } from './user/user.component';
import { ServComponent } from './serv/serv.component';

export const routes: Routes = [
  { path: '', component: SettingComponent,
    children: [
      {
        path: '',
        redirectTo: 'router',
        pathMatch: 'full'
      },
      {
        path: 'router',
        component: RouterComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'serv',
        component: ServComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NmodelModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RouterComponent, UserComponent, ServComponent, SettingComponent]
})
export class SettingModule { }
