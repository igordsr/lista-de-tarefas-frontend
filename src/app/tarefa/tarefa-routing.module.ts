import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaComponent } from './lista/lista.component';
import { TarefaComponent } from './tarefa/tarefa.component';

const routes: Routes = [
  {path:"", component: ListaComponent},
  {path:"create", component: TarefaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarefaRoutingModule { }
