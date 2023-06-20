console.log("hello");
//alert('ben');   

//variables
var b = 'ben';
console.log(b);

/*var age = prompt('what is your age?');
document.getElementById('head').innerHTML = age;*/

//functions-----------------------------------------------------------------

function fun(){
    console.log('this is a function');
}

fun(); 


function greeting(){
    var name = prompt('what is your name?');
    var result = 'hello ' + name;
    console.log(result);
}

greeting();

function sumNum(num1, num2){
    var result = num1 + num2;
    console.log(result);
}

sumNum(11,12);

//while loops------------------------------------------------------

var num = 0;
while(num<10){
    num+=1;
    console.log(num);
}

//for loops-----------------------------------------------------------

for(let  i=0;i<10;i++){
    console.log(i);
}

//data types---------------------------------------------------------------

let name = {first:'bob', last:'dylan'};//object-dictionairy
let groceries = ['apple','banana','oranges']; //array

//strings---------------------------------------------------------------

let fruit = 'banana';
let moreFruits = 'banana\naplles'; //new line
console.log(fruit.length);
console.log(fruit.indexOf('an')); // if something cannot be found gives -1
console.log(fruit.slice(2,6)); //gives nana
console.log(fruit.replace('ban','123')); //123ana
console.log(fruit.toUpperCase());
console.log(fruit[2]);//n
console.log(fruit.split('a')); //split by an a, creates list
console.log(fruit.split('')); //split by a character, creates list


//arrays--------------------------------------------------------------------

let fruitList = ['banana','apple','oranges','pineapple'];
fr = new Array('banana', 'apple', 'oranges', 'pineapple');
console.log(fruitList[3]);
fruitList[0] = 'pear';

for(let i =0;i<fruitList.length;i++){
    console.log(fruitList[i]);
}

//array methods
console.log(fruitList.toString()); //all fruits in one line with commas
console.log(fruitList.join('*'))  //* between fruits
console.log(fruitList.pop()); //pop last element 
console.log(fruitList.push('blackberries')); //add to the end 
fruitList.shift(); //remove first element from list
fruitList.unshift('kiwi'); //add kiwi as a first element 
console.log(fruitList);

let vegetables = ['asparagus','tomato','broccoli'];
let allGroceries = fruitList.concat(vegetables); //combine arrays
console.log(allGroceries);
console.log(allGroceries.slice(1,4)); //choose fruits in pos 1,2 and  NOT 4
console.log(allGroceries.reverse());
console.log(allGroceries.sort()); //alphabetically sorted

let someNumbers = [5,10,23,2,3,45,543,435,23,1];
console.log(someNumbers.sort(function(a,b) {return a-b})); //ascending order-default sort
console.log(someNumbers.sort(function (a, b) { return b - a })); //descending order

let emptyArray = new Array();
for (let num=0;num<10;num++){
    emptyArray.push(num);
}
console.log(emptyArray); 

//objects-----------------------------------------------------------------

let student={
    first:'vag',
    last:'drak',
    age:25, 
    height:170,
    studentInfo: function(){
        return this.first + ' ' +this.last+' '+this.age;
    }
};
console.log(student.first,student.last);
student.first = 'ben';
student.age++;
console.log(student.studentInfo());

//if,else, switch-----------------------------------------------------------
// && AND
// || OR
let agee = 5;
switch(agee){
    case 0: 
        text = 'Sunday';
        break;
    case 5:
        text = 'friday';
        break;
    case 6: 
        text = 'saturday';
        break;
    default:
        text = 'weekday';
}
console.log(text);

const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];

const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

// for(let i = 0; i < companies.length; i++) {
//   console.log(companies[i]);
// }

// forEach

// companies.forEach(function(company) {
//   console.log(company.name);
// });

// filter

// Get 21 and older

// let canDrink = [];
// for(let i = 0; i < ages.length; i++) {
//   if(ages[i] >= 21) {
//     canDrink.push(ages[i]);
//   }
// }

// const canDrink = ages.filter(function(age) {
//   if(age >= 21) {
//     return true;
//   }
// });

const canDrink = ages.filter(age => age >= 21);

// Filter retail companies

// const retailCompanies = companies.filter(function(company) {
//   if(company.category === 'Retail') {
//     return true;
//   }
// });

const retailCompanies = companies.filter(company => company.category === 'Retail');

// Get 80s companies

const eightiesCompanies = companies.filter(company => (company.start >= 1980 && company.start < 1990));

// Get companies that lasted 10 years or more

const lastedTenYears = companies.filter(company => (company.end - company.start >= 10));

// map

// Create array of company names
// const companyNames = companies.map(function(company) {
//   return company.name;
// });

// const testMap = companies.map(function(company) {
//   return `${company.name} [${company.start} - ${company.end}]`;
// });

// const testMap = companies.map(company => `${company.name} [${company.start} - ${company.end}]`);

// const ageMap = ages
//   .map(age => Math.sqrt(age))
//   .map(age => age * 2);



// sort

// Sort companies by start year

// const sortedCompanies  = companies.sort(function(c1, c2) {
//   if(c1.start > c2.start) {
//     return 1;
//   } else {
//     return -1;
//   }
// });

// const sortedCompanies = companies.sort((a, b) => (a.start > b.start ? 1 : -1));

// Sort ages
// const sortAges = ages.sort((a, b) => a - b);

// console.log(sortAges);


// reduce

// let ageSum = 0;
// for(let i = 0; i < ages.length; i++) {
//   ageSum += ages[i];
// }

// const ageSum = ages.reduce(function(total, age) {
//   return total + age;
// }, 0);

// const ageSum = ages.reduce((total, age) => total + age, 0);

// Get total years for all companies

// const totalYears = companies.reduce(function(total, company) {
//   return total + (company.end - company.start);
// }, 0);

const totalYears = companies.reduce((total, company) => total + (company.end - company.start), 0);

// Combine Methods

const combined = ages
    .map(age => age * 2)
    .filter(age => age >= 40)
    .sort((a, b) => a - b)
    .reduce((a, b) => a + b, 0);

console.log(combined);


