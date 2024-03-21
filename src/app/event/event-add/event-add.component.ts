import { Component, OnInit } from '@angular/core';
import { Event } from 'src/model/event';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit{

  //Attributs
  newEvent: Event = new Event(
    {
      _id: '1',
      name: '',
      picture: '',
      price: 0,
      date: new Date(),
      timestamp: Date.now(),
      theme: '',
      creator: '',
      favorite_by: []
    }
  );

  isCreation: boolean = true;
  eventService: EventService;
  isDateValid: boolean = true;

  //Constructeur
  constructor(private router: Router, private eventServ: EventService, private route: ActivatedRoute){
    this.eventService = eventServ;
  }

  //Méthodes
  //ngOnInit est appelée lors de l'initialisation et permet de récupérer les données de l'event à partir de la route si un ID d'event est donné
  ngOnInit(): void {
    const eventId = this.route.snapshot.params['eventId'];
    if(eventId){
      // Si un ID d'événement est fourni, on modifie un event existant
      // Il faut donc récupérer les données de l'event à partir de la route
      this.newEvent = new Event(this.route.snapshot.data["eventResolved"]);
      this.isCreation = false;
      // Verification de la date de l'événement (event qui n'a pas encore eu lieu)
      this.isDateValid = this.newEvent.date >= new Date(new Date().setDate(new Date().getDate() - 1));
    }
  }

  //La méthode onSubmit est appelée lors de la validation du formulaire HTML pour créer un nouvel event ou mettre à jour un event existant, puis rediriger l'utilisateur vers la page d'accueil.
  onSubmit(form:any) {
    if(this.isCreation){
        // Si on est en mode création, on crée un nouvel event
        this.eventService.createEvent(this.newEvent).subscribe(() => {
        // Une fois l'event créé, redirection vers la page d'accueil
        this.router.navigate(['/']);
      });
    } else {
        // Si on est en mode édition, on met à jour l'event existant
        this.eventService.updateEvent(this.newEvent._id,this.newEvent).subscribe(() => {
        // Une fois l'event modifié, redirection vers la page d'accueil
        this.router.navigate(['/']);
      });
    }
  }

  //La méthode priceVerify est appelée lors de la saisie d'un prix pour vérifier que le nombre de décimales est correct
  priceVerify(event: any, decimales: number) {
    let value = event.target.value;
    let decimalesActuelles = value.split('.')[1];
    if (decimalesActuelles && decimalesActuelles.length > decimales) {
      // Si le nombre de décimales actuelles est supérieur au nombre de décimales autorisées,
      // nous tronquons la valeur pour qu'elle corresponde au nombre de décimales autorisées
      event.target.value = value.slice(0, -(decimalesActuelles.length - decimales));
    }
  }

  //La méthode dateVerify est appelée lors de la sélection d'une date pour vérifier que la date sélectionnée est valide (supérieure ou égale à la date actuelle)
  dateVerify(event: any) {
    const inputDate = event.target as HTMLInputElement;
    const selectedDate = new Date(inputDate.value);
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    this.isDateValid = (selectedDate >= currentDate);
  }

  //La méthode changeImageURL est appelée lors de la sélection d'une image pour afficher l'image sélectionnée et masquer les autres images
  changeImageURL(event: any, nb: number) {
    let images = document.getElementsByClassName("formImageChoice")
    for(let i = 0; i < images.length; i++){
      if(i == nb){
        if(images[i].classList.contains("disabledImage")){
          images[i].classList.remove("disabledImage");
        }
      }else{
        if(!images[i].classList.contains("disabledImage")){
          images[i].classList.add("disabledImage");
        }
      }
    }
  }

}
