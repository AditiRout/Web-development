function myFunc(){
    alert("ready?");
    document.getElementById("h").innerHTML="We will learn about JavaScript";

}
console.log("hello world")
var num1=34;
var num2=45;
console.log(num1+num2);

var n1=56;
var n2=37.8;

var str1="heyoo guys";
var str2="nice to meet u";

var marks={
    ravi:56,
    guha:67,
    rajan:689

}
console.log(marks)
console.log(num1,num2)

let myA=["renu",34,true,45]
myA.push("harry")
console.log(myA)
myA.pop();
console.log(myA)
// myA.shift()
// myA.shift()//keeps on shifting

console.log(myA)
console.log(myA.length)
console.log(myA.unshift("renu"))//prints the new length
console.log(myA.toString())
console.log(myA.sort())

//string methods in javascript

console.log(str1.length)
console.log(str1.indexOf("guys"))//returns first index for last one use lastIndexOf
console.log(str1.slice(1,4));

d=str2.replace("nice","good");
console.log(d,str2)


let myDate=new Date();
console.log(myDate.getTime());
console.log(myDate.getFullYear());
console.log(myDate.getDay());
console.log(myDate.getMinutes());
console.log(myDate.getHours());

//DOM Manipulation
let boxElement = document.getElementsByClassName('box');
        console.log(boxElement);

        boxElement[0].style.width = 100;
        boxElement[0].style.height = 100;
        boxElement[0].style.backgroundColor = 'blue';

// let elem=document.getElementsByClassName('box');
// console.log(elem);


// elem[0].style.backgroundColor="yellow";

var a =[1,2,3,4];
var b=a.map(test)
function test(d){
    return d*10;}
    
console.log(b);

const m=new Map();
const k1="str",k2={},k3=function(){};

m.set(k1,"this is a string");
m.set(k2,"this is seecond");
m.set(k3,"third pje");
let value1=m.get(k1);
console.log(value1);
console.log(m.size);


const person = {
    firstName:"John",
    lastName: "Doe",
    fullName: function () {
      return this.firstName + " " + this.lastName;
    }
  }
  
  // This will return "John Doe":
  person.fullName();  

  const human = {
    fullName(city, country) {
      return this.firstName + " " + this.lastName + "," + city + "," + country;
    }
  }
  
  const person1 = {
    firstName:"John",
    lastName: "Doe"
  }
  
  human.fullName.call(person1, "Oslo", "Norway");

  class Car {
    constructor(name, year) {
      this.name = name;
      this.year = year;
    }
    age(x) {
      return x - this.year;
    }
  }
  
  let date = new Date();
  let year = date.getFullYear();
  
  let myCar = new Car("Ford", 2014);
  document.getElementById("demo").innerHTML=
  "My car is " + myCar.age(year) + " years old.";


  class product {
    constructor(brand) {
      this.carname = brand;
    }
    present() {
      return 'I have a ' + this.carname;
    }
  }
  
  class Model extends product{
    constructor(brand, mod) {//in java we use the name of class instead of writing constructor..
      super(brand);
      this.model = mod;
    }
    show() {
      return this.present() + ', it is a ' + this.model;
    }
  }
  
  let bottle = new Model("Ford", "Mustang");
  bottle.show()

