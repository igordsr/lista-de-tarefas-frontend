import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ToastModel } from '../../models/toast-modal';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.css']
})
export class ToastNotificationComponent implements OnDestroy {

  public toastModel: ToastModel = new ToastModel(false);

  private $subscriptions: Subscription;

  constructor(private _toastService: ToastService) {
    this.$subscriptions = this._toastService.$toastState.subscribe((toastModel: ToastModel) => {
      this.toastModel = toastModel;
    });
  }

  public close(): void {
    this.toastModel.visible = false;
  }

  ngOnDestroy(): void {
    this.$subscriptions.unsubscribe();
  }
}
