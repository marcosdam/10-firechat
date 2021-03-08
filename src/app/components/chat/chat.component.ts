import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent {

  mensaje: string = "";

  constructor( public chatService: ChatService ) {
    this.chatService.cargarMensajes()
      .subscribe()
  }

  enviarMensaje(){
    console.log( this.mensaje) ;
  }

}
