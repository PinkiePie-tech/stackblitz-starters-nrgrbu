import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { of, map, Observable, filter } from 'rxjs';
import { Person } from './person';
import { firstNames, names } from './data';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Hello from {{name}}!</h1>
    <a target="_blank" href="https://angular.io/start">
      Learn more about Angular 
    </a>
  `,
})
export class App {
  name = 'Angular';

  constructor() {
    function generateRandomUser(size: number): Person[] {
      var users: Person[] = [];
      for (var i = 0; i < size; i++) {
        users.push({
          name: names[getRandomInt(names.length)],
          firstName: firstNames[getRandomInt(firstNames.length)],
          dateOfBirth: new Date(
            `${getRandomInt(122, 1900)}-${getRandomInt(12, 1)}-${getRandomInt(
              28,
              1
            )}`
          ),
          size: getRandomInt(90, 120),
          weight: getRandomInt(80, 40),
        });
      }
      return users;
    }

    function getRandomInt(max:number, start = 0) {
      return start + Math.floor(Math.random() * max);
    }

    function dateToString(date: Date) {
      return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    }

    // Ici on génère le nombre d'utilisateur aléatoire
    var responseHttp: Observable<Person[]> = of(generateRandomUser(10));
    responseHttp.subscribe((res: Person[]) => console.log(res));

    // Comprendre les observables

    // que va faire cette observable une fois résolu
    responseHttp.pipe(
      map((persons: Person[]) =>
        persons.map(
          (person) =>
            `${person.firstName} ${person.name} est né(e) le ${dateToString(
              person.dateOfBirth
            )}`
        )
      )
    );

    // que va faire cette observable une fois résolu
    responseHttp.pipe(
      filter((persons: Person[]) => {
        return !!persons.find((person) => person.size > 205);
      }),
      map((persons: Person[]) => {
        return persons.filter(
          (person) =>
            (person.size < 190 && person.size > 180) ||
            (person.weight > 80 && person.weight < 120)
        );
      })
    );

    // Première étape: les tris

    /*
     **
     ** 1°) Trier la liste par la taille
     **
     */

    /*
     **
     ** 2°) Trier la liste par le nom
     **
     */

    /*
     **
     ** 3°) Trier la liste par la date de naissance
     **
     */

    /*
     **
     ** 4°) Trier la liste par le nom et prénom
     **
     */

    // deuxième étape, les filtres

    /*
     **
     ** 1°) afficher uniquement les gens ayant une taille supérieur à 1m60
     **
     */

    /*
     **
     ** 2°) afficher uniquement les gens ayant une taille supérieur à 1m60 et pesant moins de 80kg
     **
     */

    /*
     **
     ** 3°) afficher uniquement les gens nés après le 15 janvier 1984
     **
     */

    /*
     **
     ** 4°) afficher uniquement les 20 dernières personnes de la liste
     **
     */

    // troisème étape, la transformation de données

    /*
     **
     ** 1°) créer une nouvelle liste ne comprenant que le nom et le prénom
     **
     */

    /*
**
** 2°) créer une nouvelle liste contenant que les gens de plus d'1m84 et sous le format nom, prenom, age (et non pas date de naissance)
Cela correspondra à l'interface 'shortDescription' écrite dans le fichier interface.ts
**
*/

    /*
     **
     ** 3°) créer une nouvelle liste suivant l'interface 'longDescription' permettant de transformer la 'size' en un string de la forme "1m22" pour un number comme "122"
     **
     */

    /*
     **
     ** 4°) créer une nouvelle liste suivant l'interface 'completeDescription'
     **
     */

    // Maintenant les petites fonctions amusantes que tu aimes tant :D

    // Détecter si des personnes dans la liste ont + de 70 ans et retourner le nombre de personne trouvées

    // Détecter si des personnes dans la liste ont une taille comprise entre 1m60 et 1m80 et retourner le poids de ses personnes dans un ordre ascendant

    // Détecter si des personnes dans la liste ont le même nom et retourner les noms en doublon

    // Détecter si des personnes dans la liste ont le même prénom et retourner les prénoms en doublon

    // Détecter si la liste présente une homonymie ou non ( pour rappel, une homonymie est deux personnes différentes mais ayant le même nom et prénom )
  }
}

bootstrapApplication(App);
