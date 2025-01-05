import { Component, EventEmitter, Input, Output } from '@angular/core';
import Lego from '../../models/lego-model';

@Component({
  selector: 'app-lego',
  standalone: true,
  imports: [],
  templateUrl: './lego.component.html',
  styleUrl: './lego.component.css'
})
export class LegoComponent {
  @Input() legoThemesData: string[] | undefined;
  @Input() legoData: Lego | undefined;
  @Output() saveLegoData = new EventEmitter<Lego>();

  getData(event: any){
    return event.target.value;
  }

  getDataNumber(event: any){
    return Number(event.target.value);
  }

  getDataUrl(event: any){
    const isUrlCorrect = new URL(event.target.value);
    return (isUrlCorrect ? isUrlCorrect.toString() : "lego-icon.png")
  }

  save(){
    this.saveLegoData.emit(this.legoData);
  }

  close(){
    this.legoData = undefined;
    this.saveLegoData.emit(this.legoData);
  }
}
