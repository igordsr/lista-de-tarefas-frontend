import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { Action } from '../../enums/action.enum';
import { Tarefa } from '../../models/tarefa';
import { TarefaService } from '../../services/tarefa.service';
import { ToastService } from '../../services/toast.service';
import { ToastType } from 'src/app/models/toast-modal';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent {
  @Input()
  public title!: string;
  @Input()
  public tarefa: Tarefa = new Tarefa();
  @Output()
  public savedEvent: EventEmitter<Action> = new EventEmitter();

  @ViewChild('closeButton')
  private closeButton!: ElementRef<HTMLInputElement>;

  constructor(private tarefaService: TarefaService, private _toastService: ToastService) {

  }

  formIsValid(): boolean {
    return (this.tarefa.nomeDaTarefa != null || this.tarefa.nomeDaTarefa != undefined) &&
      (this.tarefa.custo != null || this.tarefa.custo != undefined) &&
      (this.tarefa.dataLimite != null || this.tarefa.dataLimite != undefined);
  }

  save(): void {
    if (!this.formIsValid()) {
      this._toastService.show("Todos os Campos DEVEM ser devidamente Preenchidos!", ToastType.Warning, 2);
    }
    const action: Action = this.tarefa.id == null ? Action.CREATE : Action.EDIT;
    switch (action) {
      case Action.CREATE:
        this.tarefaService.save(this.tarefa).subscribe(() => {
          this.closeButton.nativeElement.click();
          this.savedEvent.emit(Action.LIST);
        });
        break;
      case Action.EDIT:
        this.tarefaService.put(this.tarefa.id, this.tarefa).subscribe(() => {
          this.closeButton.nativeElement.click();
          this.savedEvent.emit(Action.LIST);
        });
        break;
      default:
        break;
    }
  }
}
