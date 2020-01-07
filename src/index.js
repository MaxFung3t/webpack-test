function sum(a, b) {
    return a + b;
}
var sum1 = sum(1, 2)
console.log(sum1)

import img11 from './images/img_2.png';
console.log(img11)
import './css/test.scss';
import './css/test1.css';
import './css/test2.less';


async function sayHello(){
	const result = await fetch('https://www.baidu.com');
	console.log(result);
}
sayHello();