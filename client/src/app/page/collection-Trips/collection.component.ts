import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CollectionService } from '../../services/collection.service';

@Component({
  selector: 'collection',
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class CollectionComponent  implements OnInit {

  collectionForm: FormGroup
  
  collectionId : number = 0
  title: string =''
  method : 'create' | 'update' = 'create'


  constructor(public collectionService: CollectionService){
    this.collectionForm = new FormGroup({
      title: new FormControl( '' , [Validators.required]),
    })
    
  }

  ngOnInit(): void {
    this.collectionService.findAll()
  }

  onSubmit(){
   
    if(this.collectionForm.valid  && this.method === 'create' ) {
        console.log(this.collectionForm.value)
        this.collectionService.create(this.collectionForm.value.title)
        this.collectionForm.reset()
    } else {
        this.update()
        this.collectionForm.reset()
        this.method = 'create'
    }
  }

  update(){
    this.collectionService.update(this.collectionId , this.collectionForm.value.title)
  }

  edit(id: number , title: string) {
    this.collectionId = id 
    this.collectionForm.setValue({ title }) 
    this.method = 'update'

  }

  delete(id: number) {
    this.collectionService.delete(id)
  }

}
