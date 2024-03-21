import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  //Attributs
  private errorSubject = new Subject<string | null>();

  //Méthodes
  //getError permet de récupérer les erreurs
  getError() {
    return this.errorSubject.asObservable();
  }

  //setError permet de définir les erreurs
  setError(message: string) {
    this.errorSubject.next(message);
  }

  //clearError permet de supprimer les erreurs
  clearError() {
    this.errorSubject.next(null);
  } 
}