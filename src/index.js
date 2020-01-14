import img11 from './images/img_2.png';
import './css/test.scss';
import './css/test1.css';
import './css/test2.less';
import print from './print.js';
import { sayHello } from './greeter.js';

sayHello();
print();

import Vue from 'vue';
import App from './components/app.vue';
new Vue({
    el: '#app',
    render: h=>h(App)
})
