import http from "k6/http";
import { check, sleep } from "k6";
import { Model } from "mongoose";

export let options = {
  vus: 200,
  rps: 200,
  duration: "3m",
};

let min = 8000000;
let max = 10000000;


export default function() {
    let iterationStart = new Date().getTime(); // timestamp in ms
  
    // let randomID = Math.floor(Math.random() * 10000000);
      let res = http.get(`http://localhost:3000/${Math.floor(Math.random()*((max-min) + min))}/reservations`);
  
    let iterationDuration = (new Date().getTime() - iterationStart) / 1000;
    let sleepTime = 1 - iterationDuration;  // 1 second minus time spent on request execution
    
    check(res, {
        "status was 200": (r) => r.status == 200,
        "transaction time OK": (r) => r.timings.duration < 200
      });

    if(sleepTime > 0){
      sleep(sleepTime);
    }
  };

  // k6 run server/k6Script.js

