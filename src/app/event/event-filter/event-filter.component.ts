import { Component, EventEmitter, Output } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.css']
})
export class EventFilterComponent {
  @Output() filterUpdated: EventEmitter<any> = new EventEmitter<any>();

  searchField = ""
  sortField = "{}"
  priceField = null
  themeField = ""
  eventService: EventService

  constructor(private eventServ: EventService){
    this.eventService = eventServ;
  }

  updateFilter(): void{

    let sortData = JSON.parse(this.sortField)

    let data: any = {
      sort: sortData,
      filters: [
        {property:"name", value: this.searchField},
      ]
    }
    if(this.priceField != null){
      data.filters.push({property:"price", value: parseFloat(this.priceField)})
    }
    if(this.themeField != ""){
      data.filters.push({property:"theme", value: this.themeField})
    }

    this.filterUpdated.emit(data);
  }

}
