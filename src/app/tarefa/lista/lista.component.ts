import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

import { OrdemTarefaDto } from '../../dtos/ordem-tarefa-dto';
import { Action } from '../../enums/action.enum';
import { TarefaService } from '../../services/tarefa.service';
import { ToastService } from '../../services/toast.service';
import { Tarefa } from './../../models/tarefa';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {
  protected readonly action = Action;
  protected tarefas: Array<Tarefa> = [];
  protected modalTitle: string = "Cadastro de Tarefa";
  protected tarefaSelecionada: Tarefa = new Tarefa();
  protected alertVisible: boolean = false;

  constructor(private tarefaService: TarefaService, private _toastService: ToastService) {
    this.loadList();
  }

  private loadList() {
    this.tarefaService.list().subscribe(result => {
      this.tarefas = result;
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tarefas, event.previousIndex, event.currentIndex);
    this.tarefas.forEach((tarefa, index) => {
      tarefa.ordemDeApresentação = index + 1
    })
    const tarefasOrdered = this.tarefas.map(tarefa => {
      return {
        id: tarefa.id,
        ordemDeApresentação: tarefa.ordemDeApresentação
      } as OrdemTarefaDto
    })
    this.tarefaService.reorderSequence(tarefasOrdered).subscribe(resp => {
      this.alertVisible = JSON.stringify(this.tarefas) == JSON.stringify(resp);
      setTimeout(() => this.alertVisible = false, 5000);
    });
  }

  protected openModalCreate(): void {
    this.modalTitle = "Cadastro de Tarefa";
    this.tarefaSelecionada = new Tarefa();
  }

  protected openModalEdit(tarefa: Tarefa): void {
    this.modalTitle = "Editar Tarefa"
    this.tarefaSelecionada = tarefa;
  }

  protected submitEvent(event: Action, tarefaClicked?: Tarefa): void {
    switch (event) {
      case Action.DELETE:
        if (tarefaClicked) {
          if (confirm("Tem certeza que Deseja exluir o Registro?")) {
            this.tarefaService.delete(tarefaClicked.id).subscribe(() => {
              this.loadList();
            });
          }
        }
        break;
      case Action.LIST:
        this.loadList();
        break;
      default:
        break;
    }
  }
}
