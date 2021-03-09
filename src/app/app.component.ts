import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatService } from './services/chat.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AngularFirestore]
})
export class AppComponent {


  constructor( public chatService: ChatService ){

  }

  /*
  public chats: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.chats = db.collection('chats').valueChanges();
  }
  */
}
