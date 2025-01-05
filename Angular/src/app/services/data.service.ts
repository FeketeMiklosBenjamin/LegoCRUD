import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Lego from '../../models/lego-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  url = "http://localhost:3000/lego_sets";

  legoThemes = [
    "LEGO® Animal Crossing™",
    "Architecture",
    "LEGO® Art",
    "LEGO® Avatár",
    "Batman™",
    "A Botanikai gyűjtemény",
    "LEGO® Braille Bricks",
    "BrickHeadz",
    "City",
    "Classic",
    "Creator 3in1",
    "Creator Expert",
    "DC",
    "Gru 4",
    "Disney",
    "DOTS",
    "LEGO® DREAMZzz™",
    "DUPLO®",
    "LEGO® DUPLO® Peppa malac",
    "LEGO® Education",
    "Friends",
    "LEGO® Fortnite®",
    "LEGO® Gabby babaháza",
    "Harry Potter™",
    "LEGO® Icons",
    "Ideas",
    "LEGO® Indiana Jones™",
    "Jurassic World",
    "Lord of the Rings™",
    "Marvel",
    "Minecraft®",
    "Minifigurák",
    "Monkie Kid™",
    "NINJAGO®",
    "Powered UP",
    "SERIOUS PLAY®",
    "Sonic the Hedgehog™",
    "Speed Champions",
    "Spider-Man",
    "Star Wars™",
    "LEGO® Super Mario™",
    "Technic",
    "LEGO® The Legend of Zelda™",
    "LEGO® Wednesday",
    "LEGO® Wicked"
  ];
  

  getLegos(): Observable<Lego[]>{
    return this.http.get<Lego[]>(this.url)
  }

  addLego(req: Lego): Observable<Lego>{
    return this.http.post<Lego>(this.url, req)
  }

  modifyLego(req: Lego): Observable<Lego>{
    return this.http.put<Lego>(`${this.url}/${req.id}`, req)
  }

  deleteLego(req: Lego): Observable<Lego>{
    return this.http.delete<Lego>(`${this.url}/${req.id}`)
  }

  constructor(private http: HttpClient) { }
}
