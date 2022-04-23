import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hero } from '../models/hero.model';
import { MessagesService } from './messages.service';
// import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = `${environment.baseUrl}/heroes`;

  constructor(
    private http: HttpClient,
    private messageService: MessagesService
  ) {}

  getHeroes(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(tap((heroes) => this.log(`fetched ${heroes.length} heroes`)));

    // const heroes = of(HEROES);
    // this.log('fetched heroes');
    // return heroes;
  }

  getHero(id: number): Observable<Hero> {
    return this.http
      .get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap((hero) =>
          this.log(`fetched head id=${hero.name} and name=${hero.name}`)
        )
      );

    // const hero = HEROES.find((hero) => hero.id === id)!;
    // this.log(`fetched hero id=${id}`);
    // return of(hero);
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }
}
