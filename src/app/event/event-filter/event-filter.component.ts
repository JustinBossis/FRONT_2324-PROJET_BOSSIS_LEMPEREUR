import { Component, EventEmitter, Output } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.css']
})
export class EventFilterComponent {

  //Attributs

  @Output() filterUpdated: EventEmitter<any> = new EventEmitter<any>();

  searchField = ""
  sortField = "{}"
  priceField = null
  themeField = ""
  eventService: EventService

  //Constructeur
  //Récupération du service nécessaire pour la gestion des events
  constructor(private eventServ: EventService){
    this.eventService = eventServ;
  }

  //Méthodes
  //updateFilter est appelé lors de la modification des champs de recherche et permet de mettre à jour les filtres et le tri des events
  updateFilter(): void{

    let sortData = JSON.parse(this.sortField)

    //Création de l'objet data qui contient les filtres et le tri
    let data: any = {
      sort: sortData,
      filters: [
        {property:"name", value: this.searchField},
      ]
    }
    //Ajout des filtres supplémentaires si les champs ne sont pas vides
    if(this.priceField != null){
      data.filters.push({property:"price", value: parseFloat(this.priceField)})
    }
    if(this.themeField != ""){
      data.filters.push({property:"theme", value: this.themeField})
    }

    //Envoi de l'événement contenant les filtres et le tri
    this.filterUpdated.emit(data);
  }

}
