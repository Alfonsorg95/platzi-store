const myName = 'Alfonso';
const myAge = 27;

const suma = (a: number, b: number) => {
  return a + b;
};

suma(12, 23);

class Person {
  constructor(private age: number, private name: string) {}

  getSummary() {
    return `my name is ${this.name}, ${this.age}`;
  }
}

const yomismo = new Person(myAge, myName);
yomismo.getSummary();
