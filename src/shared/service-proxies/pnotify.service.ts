import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
import { Injectable } from '@angular/core';

@Injectable()
export class PNotifyService {

  constructor()
  {
      PNotifyButtons;
  }

  success(message:string){
    PNotify.success({
        text: message
      });
  }

  error(message:string){
    PNotify.error({
        text: message
      });
  }
}