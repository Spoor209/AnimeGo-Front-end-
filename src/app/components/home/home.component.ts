import { CharacterService } from './../../services/character/character.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import {AnimeCharacter} from 'src/app/Models/character';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../Ressources/bootstrap/css/bootstrap.min.css', '../../Ressources/fontawesome/css/all.css', './home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  animeCharacters: AnimeCharacter[];
  errorMessage: string;
  successMessage: string;

  constructor(private characterService: CharacterService, private router: Router) {
    this.checkUser();
   }

  ngOnInit(): void {
    this.findAllCharacters();
  }

  findAllCharacters(){
    this.characterService.findAllUserCharacters(this.user.idUser)
    .pipe()
    .subscribe(data => {
      console.log(data);
      this.animeCharacters = data;
    }, error => {
      console.log(error);
    });
  }

  shareCharacter(idCharacter: number, shared: boolean) {
    if (idCharacter === undefined) {
      this.displayMessage(' An error has occured while sharing the character ', 2);
    }
    this.characterService.shareCharacter(idCharacter, shared)
      .pipe()
      .subscribe(data => {
        this.displayMessage('Character was succefully updated ' , 1);
        this.findAllCharacters();
      });
  }

  displayMessage(msg: string, type: number) {
    if (type === 1) {
      this.successMessage = msg;
      setTimeout(() => {this.successMessage = ' ' } ,5000);
    } else if (type === 2) {
      this.errorMessage = msg;
      setTimeout(() => {this.errorMessage = ''}, 5000);
    }
  }

  filter(keyWord: string) {
    if (keyWord === undefined || keyWord.length === 0) {
      this.findAllCharacters();
      return;
    }
    this.animeCharacters = this.animeCharacters.filter(character => 
      character.category.toLowerCase().includes(keyWord) || character.legend.toLowerCase().includes(keyWord) || 
      character.characterName.toLowerCase().includes(keyWord) 
    );
  }

  removeCharacter(idCharacter: number) {
    if (idCharacter === undefined) {
      this.displayMessage('An error has occured while removing the character', 2);
      return;
    }
    if (confirm('Do you really want to delete this character ?')) {
      this.characterService.deleteCharacter(idCharacter)
        .pipe()
        .subscribe(data => {
          this.findAllCharacters();
          this.displayMessage('Character succfully removed', 1);
        });
    }
  }


  checkUser(){
    if (localStorage.getItem('currentUser') === undefined || localStorage.getItem('currentUser') === null){
      console.log('user is invalid, redirection');
      this.router.navigate(['/login']);
      return;
    }
    this.user = JSON.parse(localStorage.getItem('currentUser'));

  }

}
