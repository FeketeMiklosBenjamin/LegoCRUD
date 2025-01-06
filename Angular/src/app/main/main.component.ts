import { Component, EventEmitter, Input, Output } from '@angular/core';
import Lego from '../../models/lego-model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  @Input() legoDatas: Lego[] | undefined;
  @Input() legoThemesData: string[] | undefined;
  @Output() legoMod = new EventEmitter<Lego>();
  @Output() legoNew = new EventEmitter();

  filteredDatas: Lego[] = [];

  selectedName: string = "";
  selectedTheme: string = "";

  ngOnInit() {
    this.dataService.getLegos().subscribe({
      next: (data: Lego[]) => {
        this.filteredDatas = data;
      },
      error: (err) => console.log(err)
    })
  }

  new() {
    this.legoNew.emit();
  }

  mod(modLego: Lego) {
    this.legoMod.emit(modLego);
  }

  delete(delLego: Lego) {
    this.dataService.deleteLego(delLego).subscribe({
      next: () => {
        const index = this.legoDatas!.findIndex(r => r.id == delLego.id);
        this.legoDatas!.splice(index, 1);
        this.filteredDatas = JSON.parse(JSON.stringify(this.legoDatas))
      }
    })
  }

  search(event: any, type?: string) {
    if (type == 'name') {
      this.selectedName = event.target.value;
    }
    else {
      this.selectedTheme = event.target.value;
    }
    this.filteredDatas = this.legoDatas!.filter(x => x.name.includes(this.selectedName) && x.theme.includes(this.selectedTheme));
  }

  constructor(private dataService: DataService) { }
}
