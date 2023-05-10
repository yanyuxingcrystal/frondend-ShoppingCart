import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.css']
})
export class SingleItemComponent implements OnInit{
  
  item!:Item;

  constructor(private route: ActivatedRoute){

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getOneItem(){
    this.route.params.subscribe(
      (params) => {
        
      }
    )
  }

}
