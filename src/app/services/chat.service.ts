import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';


import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe( user => {
      console.log( 'Estado del usuario: ', user );

      if ( !user ){
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;

    });

  }

  login( cuenta: string ){

    if ( cuenta === 'google' ){
      this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
    }else{
      this.afAuth.signInWithPopup(new firebase.default.auth.TwitterAuthProvider());
    }
  }

  logout(){
    this.usuario = {};
    this.afAuth.signOut();
  }


  cargarMensajes(){

    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha','desc').limit(5) );

    return this.itemsCollection.valueChanges()
    .pipe(
      map( (mensajes: Mensaje[]) => {
        console.log(mensajes);

        this.chats = [];

        for( let mensaje of mensajes ){
          this.chats.unshift( mensaje );
        }

        return this.chats;

        //this.chats = mensajes;
      })
    )
  }

  agregarMensaje( texto: string ){
    let mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }

    return this.itemsCollection.add ( mensaje );

  }

}
