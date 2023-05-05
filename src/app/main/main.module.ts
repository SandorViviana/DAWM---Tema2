import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { TableComponent } from './table/table.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { HeaderComponent } from './header/header.component';
import { BookModalComponent } from './book-modal/book-modal.component';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';

import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CapitalizePipe } from './Pipes/capitalize.pipe';


@NgModule({
  declarations: [
   
  
    TableComponent,
    DashboardComponent,
    HeaderComponent,
    BookModalComponent,
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NzTableModule,
    NzIconModule,
    NzPageHeaderModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzModalModule
  ]
})
export class MainModule { }
