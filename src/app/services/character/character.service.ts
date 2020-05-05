import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/Settings/app.settings';
import { AnimeCharacter } from 'src/app/Models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  findAllCharacters(){
    return this.http.get<AnimeCharacter>(AppSettings.APP_URL + '/characters/');
  }

  findAllUserCharacters(idUser: number){
   return this.http.get<AnimeCharacter[]>(AppSettings.APP_URL + '/characters/all/' + idUser);
  }

  findCharacterById(idCharacter: number){
    return this.http.get<AnimeCharacter>(AppSettings.APP_URL + '/characters/' + idCharacter);
  }

  saveCharacter(character: AnimeCharacter){
    return this.http.post<AnimeCharacter>(AppSettings.APP_URL + '/characters/' , character);
  }

  shareCharacter(idCharacter: number, isShared: boolean){
    return this.http.get<AnimeCharacter>(AppSettings.APP_URL + '/characters/share/' + idCharacter + '/' + isShared);
  }

  deleteCharacter(idCharacter: number) {
    return this.http.delete<AnimeCharacter>(AppSettings.APP_URL + 'characters/' + idCharacter);
  }

}
