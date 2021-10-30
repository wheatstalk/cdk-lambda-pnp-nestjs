import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [
    {
      name: 'The first cat',
      age: 7,
      breed: 'persian',
    },
  ];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}

export interface Cat {
  name: string;
  age: number;
  breed: string;
}
