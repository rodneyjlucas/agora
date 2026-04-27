


console.log('Hello world')
// const products = [
//     { id: 1, name: 'Laptop', price: 1000, inStock: true },
//     { id: 2, name: 'Phone', price: 500, inStock: false },
//     { id: 3, name: 'Tablet', price: 750, inStock: true },
//   ];

// // task a

// console.log(products.map(item => item.name));
// console.log(products.filter(item => item.inStock))
// console.log(products.reduce((acc, val) => acc+val),0)
// console.log(products.includes(item=> item.price >800))
// console.log(products.find(item=> !item.inStock))



  // function Animal(name) {
  //   this.name = name;
  // }

  // Animal.prototype.speak = function() {
  //   console.log(`${this.name} makes a sound`);
  // };

  // function Dog(name, breed) {
  //   Animal.call(this, name);
  //   this.breed = breed;
  // }

  // Dog.prototype = Object.create(Animal.prototype);
  // Dog.prototype.constructor = Dog;

  // Dog.prototype.speak = function() {
  //   console.log(`${this.name} barks`);
  // };

  // const dog = new Dog('Rex', 'German Shepherd');
  // dog.speak();
  // console.log(dog instanceof Animal);
  // console.log(dog instanceof Dog);
  // console.log(dog.name);
  // console.log(dog.breed);



// Javascript types
// number
const bNumber = 123
const bNan = NaN
const bInfinity = Infinity
const bNegativeInifinty = -Infinity
console.log(bNegativeInifinty == Math.log(0))

// string
const bstring = 'rodney'
const bempty = ''


// boolean
const bfalse = false
const btrue = true

// Object
const bobject = {a:1, b:2, c:3}
const bobject2 = {name:'james', initial:null, last:'lucas'}
const bobjectEmpty = {}

// null
const bnull = null


// undefined
const bundefined = undefined
let bundefined2 


// symbol
const bsymbol = Symbol("jordan")
console.log(String(bsymbol) == 'jordan')
console.log(Number(bsymbol) == NaN)

// bigInt 
const bbigInt = 1n
console.log(bbigInt == 1)

//special values
const bemptyarray = [];
const barray = [1,2,3]
