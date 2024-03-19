import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  theme = ['Sport', 'Culture', 'Festif', 'Pro', 'Autres']

  constructor() { }
}
