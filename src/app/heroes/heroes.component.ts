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
  heroes: Hero[] = [];
  selected?: Hero;

  constructor(
    private service: HeroService,
    private messageService: MessagesService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.service.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  onSelect(hero: Hero): void {
    this.selected = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }
}
