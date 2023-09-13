import { Component } from '@angular/core';
import { ApicallService } from '../apicall.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent {
  
userData: any[]=[] ;
  constructor(private dataService: ApicallService) { }

  ngOnInit(): void {
    this.dataService.fetchData().subscribe((data:any)=>{
      this.userData=data.Select;
      console.log("data",data.Select)
    }
      
    );
  }
}
