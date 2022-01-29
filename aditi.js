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
