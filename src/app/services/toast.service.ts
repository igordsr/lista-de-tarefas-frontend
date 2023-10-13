import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ToastModel, ToastPosition, ToastType } from '../models/toast-modal';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  $toastState = new BehaviorSubject<ToastModel>(new ToastModel(false));

  public show(message: string, type: ToastType, time:number = 3) {
    let toast = new ToastModel(true);
    toast.message = message;
    toast.type = type;

    this.$toastState.next(toast);
    if (toast.type === ToastType.Info || toast.type === ToastType.Warning) {
      setTimeout(
        () => this.$toastState.next(new ToastModel(false)),
        time * 1000
      );
    }
  }
}
