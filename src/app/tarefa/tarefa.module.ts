import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ListaComponent } from './lista/lista.component';
import { TarefaRoutingModule } from './tarefa-routing.module';
import { TarefaComponent } from './tarefa/tarefa.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ListaComponent,
    TarefaComponent,
  ],
  imports: [
    CommonModule,
    TarefaRoutingModule,
    DragDropModule,
    FormsModule,
    SharedModule
  ]
})
export class TarefaModule { }
