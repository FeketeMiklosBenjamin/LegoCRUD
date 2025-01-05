import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from "./main/main.component";
import Lego from '../models/lego-model';
import { DataService } from './services/data.service';
import { LegoComponent } from "./lego/lego.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent, LegoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  legoSets: Lego[] = [];
  legoThemes: string[] = [];

  newSet: Lego | undefined = undefined;
  modifySet: Lego | undefined = undefined;

  ngOnInit(){
    this.dataService.getLegos().subscribe({
      next: (data: Lego[]) => {
        this.legoSets = data;
      },
      error: (err) => console.log(err)
    })
  }

  new(){
    this.newSet = {
      id: undefined,
      legoSetID: 0,
      name: "Lego",
      theme: this.legoThemes[0],
      bricks: 0,
      age: 0,
      pictureUrl: "lego-icon.png"
    }
  }

  mod(legoMod: Lego){
    this.modifySet = JSON.parse(JSON.stringify(legoMod));
  }

  saveNewLegoData(lego: Lego | undefined){
    if (lego != undefined) {
      this.dataService.addLego(lego).subscribe({
        next: (data: Lego) => {
          this.legoSets.push(data);
        },
        error: (err) => console.log(err)
      })
    }
    this.newSet = undefined;
  }

  saveModLegoData(lego: Lego |undefined){
    if (lego != undefined) {
      this.dataService.modifyLego(lego).subscribe({
        next: (data: Lego) => {
          const index = this.legoSets.findIndex(r => r.id == lego.id);
          this.legoSets[index] = data;
        },
        error: (err) => console.log(err)
      })
    }
    this.modifySet = undefined;
  }

  constructor(private dataService: DataService) {
    this.legoThemes = dataService.legoThemes;
  }
}
