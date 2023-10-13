import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { OrdemTarefaDto } from '../dtos/ordem-tarefa-dto';
import { TarefaDto } from '../dtos/tarefa-dto';
import { DTO } from '../interfaces/DTO';
import { Tarefa } from '../models/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private URI: string = environment.BASE_URL

  constructor(private httpClient: HttpClient) {

  }

  public list(): Observable<Array<Tarefa>> {
    return this.httpClient.get(`${this.URI}/tarefa`).pipe(map(resp =>{
      const obj:any = resp as Object;
      const taredasDTO:Array<Tarefa> = obj.content as Array<Tarefa>
      const tarefas:Array<Tarefa> = taredasDTO.map(tarefaDTO =>{
        const tarefa:Tarefa = new Tarefa();
        tarefa.id = tarefaDTO.id;
        tarefa.nomeDaTarefa = tarefaDTO.nomeDaTarefa;
        tarefa.custo = tarefaDTO.custo;
        tarefa.dataLimite = tarefaDTO.dataLimite
        tarefa.ordemDeApresentação = tarefaDTO.ordemDeApresentação
        return tarefa;
      });
      return tarefas
    }));
  }

  public save(obj: DTO): Observable<any> {
    const tarefaDto:TarefaDto = obj.toDto();
    return this.httpClient.post<any>(`${this.URI}/tarefa`, tarefaDto);
  }

  public put(id: Number, obj: DTO): Observable<any> {
    const tarefaDto:TarefaDto = obj.toDto();
    return this.httpClient.put(`${this.URI}/tarefa/${id}`, tarefaDto);
  }

  public delete(id: Number): Observable<any> {
    return this.httpClient.delete(`${this.URI}/tarefa/${id}`);
  }

  public reorderSequence(obj: Array<OrdemTarefaDto>): Observable<Array<Tarefa>> {
    return this.httpClient.patch<Array<Tarefa>>(`${this.URI}/tarefa`, obj).pipe(map(resp =>{
      const taredasDTO:Array<Tarefa> = resp as Array<Tarefa>
      const tarefas:Array<Tarefa> = taredasDTO.map(tarefaDTO =>{
        const tarefa:Tarefa = new Tarefa();
        tarefa.id = tarefaDTO.id;
        tarefa.nomeDaTarefa = tarefaDTO.nomeDaTarefa;
        tarefa.custo = tarefaDTO.custo;
        tarefa.dataLimite = tarefaDTO.dataLimite
        tarefa.ordemDeApresentação = tarefaDTO.ordemDeApresentação
        return tarefa;
      });
      return tarefas.sort((a, b) => { return a.ordemDeApresentação.valueOf() - b.ordemDeApresentação.valueOf();})
    }));

  }
}
