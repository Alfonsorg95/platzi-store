const myName = 'Alfonso';
const myAge = 27;

const suma = (a: number, b: number) => {
  return a + b;
};

suma(12, 23);

class Person {
  age = myAge;
  name = myName;

  getSummary() {
    return 'my name is ${this.name}, ${this.age}';
  }
}
