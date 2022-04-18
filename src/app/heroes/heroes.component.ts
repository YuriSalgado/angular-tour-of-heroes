import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { MessagesService } from '../messages.service';
import { Hero } from './hero.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name'];
  heroes: Hero[] = [];

  constructor(private service: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.service.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
}
