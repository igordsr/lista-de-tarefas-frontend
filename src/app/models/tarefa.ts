import { TarefaDto } from '../dtos/tarefa-dto';
import { DTO } from '../interfaces/DTO';

export class Tarefa implements DTO{
  private _id!: Number;
  private _nomeDaTarefa!: String;
  private _custo!: Number;
  private _dataLimite!: Date;
  private _ordemDeApresentação!: Number;

  constructor(){

  }


  public get id(): Number {
    return this._id;
  }
  public set id(value: Number) {
    this._id = value;
  }

  public get nomeDaTarefa(): String {
    return this._nomeDaTarefa;
  }
  public set nomeDaTarefa(value: String) {
    this._nomeDaTarefa = value;
  }

  public get custo(): Number {
    return this._custo;
  }
  public set custo(value: Number) {
    this._custo = value;
  }

  public get dataLimite(): Date {
    return this._dataLimite;
  }
  public set dataLimite(value: Date) {
    this._dataLimite = value;
  }

  public get ordemDeApresentação(): Number {
    return this._ordemDeApresentação;
  }
  public set ordemDeApresentação(value: Number) {
    this._ordemDeApresentação = value;
  }

  toDto<TarefaDto>(): TarefaDto {
    return {
      id: this._id,
      nomeDaTarefa: this._nomeDaTarefa,
      custo: this._custo,
      dataLimite: this._dataLimite,
      ordemDeApresentação: this._ordemDeApresentação
    } as TarefaDto
  }
}
