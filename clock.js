const template = document.createElement('template');
template.innerHTML = /* html */ `
  <style>
    :host {
      display: block;
    }

    .clock {
      --dark-color: black;
      --light-color: white;

      position: relative;
      --diameter: 100%;
      --radius: 50%;
      --hand-width: 2%;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid var(--dark-color);
    }

    .clock.simple:after {
      background: var(--dark-color);
      border-radius: 50%;
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 5%;
      height: 5%;
      z-index: 10;
    }

    .clock.dark {
      background-color: var(--dark-color);
      fill: white;
      border-color: var(--light-color);
    }

    .clock.dark:after {
      background: var(--light-color);
    }

    .clock svg {
      position: absolute;
      width: 90%;
      height: 90%;
      top: 5%;
      left: 5%;
    }

    .hand {
      background-color: var(--dark-color);
      position: absolute;
      left: calc(var(--radius) - calc(var(--hand-width) / 2));
      transform-origin: 50% 100%;
      transform: rotateZ(var(--deg));
    }

    .clock.dark .hand {
      background-color: var(--light-color);
    }

    #hour {
      --deg: 0;
      top: 30%;
      height: 20%;
      width: 2.5%;
    }

    #minute {
      --deg: 0;
      top: 10%;
      height: 40%;
      width: 2%;
    }

    #second {
      --deg: 0;
      top: 14%;
      height: 45%;
      width: 1%;
      transform-origin: 50% 80%;
    }

    .clock.mounted #minute,
    .clock.mounted #second {
      transition: transform 0.2s cubic-bezier(.4,2.08,.55,.44);
    }
  </style>
  <div class="clock simple">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 226.6 233.8"><path d="M105.5 22.7V6.4h-5.9V4.3c.8 0 1.5-.1 2.2-.2.7-.1 1.4-.3 2-.7.6-.3 1.1-.8 1.5-1.3.4-.6.7-1.3.8-2.1h2.1v22.7h-2.7zM114.1 4.8c.3-1 .8-1.8 1.4-2.5.6-.7 1.4-1.3 2.4-1.7.9-.4 2-.6 3.2-.6 1 0 1.9.1 2.8.4.9.3 1.6.7 2.3 1.2.6.5 1.1 1.2 1.5 2 .4.8.6 1.7.6 2.8 0 1-.2 1.9-.5 2.7s-.7 1.5-1.2 2.1c-.5.6-1.1 1.2-1.8 1.6-.7.5-1.3 1-2 1.4-.7.4-1.4.8-2.1 1.3s-1.3.9-1.9 1.3c-.6.5-1.1 1-1.5 1.5s-.7 1.2-.8 1.9h11.6v2.4h-14.8c.1-1.3.3-2.5.7-3.4.4-.9.8-1.8 1.4-2.5s1.2-1.3 2-1.9c.7-.5 1.5-1 2.3-1.5 1-.6 1.8-1.1 2.5-1.6s1.3-1 1.8-1.5.8-1.1 1.1-1.7.4-1.3.4-2.1c0-.6-.1-1.2-.4-1.7-.2-.5-.5-.9-.9-1.3s-.9-.6-1.4-.8c-.5-.2-1.1-.3-1.7-.3-.8 0-1.5.2-2 .5-.6.3-1 .8-1.4 1.3-.4.5-.6 1.1-.8 1.8s-.2 1.3-.2 2H114c-.3-1-.2-2.1.1-3.1zM166.5 38.2V21.9h-5.9v-2.2c.8 0 1.5-.1 2.2-.2.7-.1 1.4-.3 2-.7.6-.3 1.1-.8 1.5-1.3.4-.6.7-1.3.8-2.1h2.1v22.7h-2.7zM198.9 59.2c.3-1 .8-1.8 1.4-2.5.6-.7 1.4-1.3 2.4-1.7.9-.4 2-.6 3.2-.6 1 0 1.9.1 2.8.4.9.3 1.6.7 2.3 1.2.6.5 1.1 1.2 1.5 2 .4.8.6 1.7.6 2.8 0 1-.2 1.9-.5 2.7s-.7 1.5-1.2 2.1c-.5.6-1.1 1.2-1.8 1.6-.7.5-1.3 1-2 1.4-.7.4-1.4.8-2.1 1.3s-1.3.9-1.9 1.3c-.6.5-1.1 1-1.5 1.5s-.7 1.2-.8 1.9h11.6V77H198c.1-1.3.3-2.5.7-3.4.4-.9.8-1.8 1.4-2.5s1.2-1.3 2-1.9c.7-.5 1.5-1 2.3-1.5 1-.6 1.8-1.1 2.5-1.6s1.3-1 1.8-1.5.8-1.1 1.1-1.7.4-1.3.4-2.1c0-.6-.1-1.2-.4-1.7-.2-.5-.5-.9-.9-1.3s-.9-.6-1.4-.8c-.5-.2-1.1-.3-1.7-.3-.8 0-1.5.2-2 .5-.6.3-1 .8-1.4 1.3-.4.5-.6 1.1-.8 1.8s-.2 1.3-.2 2h-2.7c-.2-1.1-.1-2.1.2-3.1zM217.6 115.1H218.5c.6 0 1.1-.1 1.6-.2s1-.4 1.4-.7c.4-.3.7-.7.9-1.2.2-.5.4-1 .4-1.6 0-1.2-.4-2.1-1.2-2.7-.8-.6-1.7-.9-2.9-.9-.7 0-1.4.1-1.9.4-.5.3-1 .6-1.3 1.1-.4.4-.6 1-.8 1.6-.2.6-.3 1.2-.3 1.9h-2.7c0-1.1.2-2.1.5-3s.8-1.7 1.3-2.3c.6-.6 1.3-1.1 2.2-1.5.9-.4 1.9-.5 3-.5 1 0 1.9.1 2.7.4s1.6.6 2.2 1.1c.6.5 1.1 1.1 1.5 1.9s.5 1.7.5 2.7c0 1-.3 1.9-.9 2.7-.6.8-1.3 1.4-2.2 1.8v.1c1.4.3 2.4 1 3.1 2 .7 1 1 2.2 1 3.6 0 1.1-.2 2.1-.6 3-.4.9-1 1.6-1.7 2.2s-1.5 1-2.5 1.3-2 .4-3 .4c-1.2 0-2.2-.2-3.1-.5-.9-.3-1.7-.8-2.4-1.4-.7-.6-1.2-1.4-1.5-2.3-.4-.9-.5-2-.5-3.1h2.7c0 1.5.5 2.7 1.3 3.6.8.9 2 1.4 3.6 1.4.7 0 1.3-.1 1.9-.3.6-.2 1.1-.5 1.6-.9s.8-.8 1.1-1.4.4-1.2.4-1.8c0-.7-.1-1.3-.4-1.9s-.6-1-1-1.4-.9-.7-1.5-.8-1.2-.3-1.9-.3c-.6 0-1.1 0-1.6.1V115c-.1.1 0 .1.1.1zM214.2 173.8v2.4h-3.1v5.3h-2.6v-5.3h-10v-2.6l10.3-14.8h2.2v15h3.2zm-5.6-11.1l-7.6 11.1h7.6v-11.1zM163.7 199.4l-1.2 6.5.1.1c.5-.6 1.1-1 1.9-1.2.8-.3 1.6-.4 2.3-.4 1 0 2 .2 2.8.5.9.3 1.7.8 2.3 1.5.7.7 1.2 1.5 1.6 2.4s.6 2.1.6 3.4c0 1-.2 1.9-.5 2.8-.3.9-.8 1.7-1.5 2.4s-1.5 1.3-2.5 1.7-2.1.6-3.5.6c-1 0-1.9-.1-2.8-.4s-1.6-.7-2.3-1.2-1.2-1.2-1.6-2c-.4-.8-.6-1.7-.6-2.8h2.7c0 .6.2 1.1.4 1.6s.6.9 1 1.3.9.7 1.5.9c.6.2 1.2.3 1.9.3.6 0 1.3-.1 1.8-.3.6-.2 1.1-.6 1.5-1 .4-.4.8-1 1-1.7.3-.7.4-1.5.4-2.4 0-.7-.1-1.4-.4-2.1s-.6-1.2-1-1.6-1-.8-1.6-1.1-1.3-.4-2.1-.4c-.9 0-1.7.2-2.4.6-.7.4-1.3.9-1.8 1.6l-2.3-.1 2.1-11.8h11.2v2.4h-9zM116.4 214.1c-.7-.6-1.5-.9-2.6-.9-1.2 0-2.1.3-2.8.8s-1.3 1.3-1.6 2.1-.7 1.8-.8 2.8c-.1 1-.2 1.9-.3 2.8l.1.1c.6-1 1.4-1.8 2.4-2.3.9-.5 2-.7 3.3-.7 1.1 0 2.1.2 2.9.6.9.4 1.6.9 2.2 1.6s1 1.4 1.4 2.3c.3.9.5 1.9.5 2.9 0 .8-.1 1.7-.4 2.6-.3.9-.7 1.7-1.3 2.4-.6.7-1.4 1.3-2.3 1.8-1 .5-2.2.7-3.6.7-1.7 0-3-.3-4.1-1s-1.8-1.6-2.4-2.6c-.6-1.1-.9-2.2-1.1-3.5-.2-1.3-.3-2.5-.3-3.7 0-1.6.1-3.1.4-4.5.3-1.5.7-2.8 1.4-3.9.6-1.1 1.5-2 2.6-2.7 1.1-.7 2.4-1 4-1 1.9 0 3.4.5 4.5 1.5s1.7 2.4 1.9 4.3h-2.7c-.2-1.1-.6-1.9-1.3-2.5zm-4.9 7.5c-.6.3-1.1.6-1.5 1.1-.4.5-.7 1-.9 1.6-.2.6-.3 1.3-.3 2s.1 1.4.3 2c.2.6.5 1.2.9 1.6.4.4.9.8 1.5 1.1.6.3 1.3.4 2 .4s1.4-.1 2-.4c.6-.3 1-.6 1.4-1.1.4-.5.7-1 .9-1.6s.3-1.2.3-1.9-.1-1.4-.3-2c-.2-.6-.5-1.2-.8-1.6-.4-.5-.9-.8-1.4-1.1s-1.2-.4-2-.4c-.9-.1-1.5.1-2.1.3zM64.9 203.4c-1 1.6-1.9 3.2-2.7 5-.8 1.8-1.4 3.6-1.9 5.5s-.8 3.7-.9 5.5h-3c.1-1.9.4-3.8.9-5.6.5-1.8 1.1-3.6 1.9-5.2s1.7-3.3 2.7-4.8c1-1.5 2.1-2.9 3.3-4.1H53.5V197h14.7v2.3c-1.2 1.2-2.3 2.5-3.3 4.1zM15.2 162.1c.4-.7.9-1.3 1.5-1.8s1.3-.9 2.1-1.1c.8-.3 1.6-.4 2.5-.4 1.2 0 2.3.2 3.2.5.9.3 1.6.8 2.1 1.3s.9 1.2 1.2 1.9c.3.7.4 1.4.4 2.1 0 1-.3 2-.8 2.8s-1.3 1.5-2.3 1.9c1.4.4 2.4 1.1 3 2.1s1 2.2 1 3.6c0 1.1-.2 2.1-.6 2.9-.4.9-.9 1.6-1.6 2.2s-1.5 1-2.4 1.3-1.9.4-2.9.4c-1.1 0-2.1-.1-3-.4-.9-.3-1.8-.7-2.4-1.3s-1.2-1.3-1.6-2.2c-.4-.9-.6-1.9-.6-3 0-1.3.3-2.5 1-3.5s1.7-1.7 2.9-2.2c-1-.4-1.7-1-2.3-1.9-.6-.9-.9-1.8-.9-2.8-.1-.9.1-1.7.5-2.4zm2.9 16.2c.9.8 2.1 1.2 3.5 1.2.7 0 1.3-.1 1.9-.3.6-.2 1.1-.5 1.5-.9s.7-.9 1-1.4.3-1.1.3-1.8c0-.6-.1-1.2-.4-1.7s-.6-1-1-1.4-.9-.7-1.5-.9c-.6-.2-1.2-.3-1.8-.3-.7 0-1.3.1-1.9.3-.6.2-1.1.5-1.5.9-.4.4-.8.8-1 1.4-.2.5-.4 1.1-.4 1.8-.1 1.2.3 2.3 1.3 3.1zm-.3-12c.2.5.5.8.9 1.1.4.3.8.5 1.3.7.5.1 1 .2 1.6.2 1.1 0 2-.3 2.7-1 .7-.6 1.1-1.5 1.1-2.7s-.4-2-1.1-2.6c-.7-.6-1.6-.9-2.7-.9-.5 0-1 .1-1.5.2s-.9.4-1.3.7c-.4.3-.6.7-.8 1.1-.2.4-.3.9-.3 1.5-.2.7-.1 1.2.1 1.7zM4.5 125.1c.8.6 1.7.9 2.8.9 1.7 0 2.9-.7 3.7-2.2s1.3-3.6 1.4-6.6l-.1-.1c-.5 1-1.2 1.7-2.2 2.3-.9.6-2 .8-3.1.8-1.2 0-2.2-.2-3.1-.6-.9-.4-1.6-.9-2.3-1.6-.6-.7-1.1-1.5-1.4-2.4-.3-.9-.5-2-.5-3.1s.2-2.1.5-3c.4-.9.9-1.7 1.5-2.3.7-.7 1.5-1.2 2.4-1.5.9-.4 1.9-.5 3-.5s2.1.2 3 .5c.9.3 1.8.9 2.5 1.7.7.8 1.3 1.9 1.7 3.3.4 1.4.6 3.2.6 5.3 0 3.9-.6 6.9-1.9 9-1.2 2.1-3.2 3.2-6 3.2-1.9 0-3.5-.5-4.7-1.4s-2-2.4-2.1-4.4h2.7c.4 1.2.9 2.1 1.6 2.7zm7.2-14.2c-.2-.6-.5-1.2-.9-1.6s-.9-.9-1.5-1.1c-.6-.3-1.2-.4-2-.4s-1.5.1-2.1.4-1 .7-1.4 1.2c-.4.5-.6 1.1-.8 1.7-.2.6-.2 1.3-.2 2 0 .6.1 1.2.3 1.8.2.6.5 1.1.9 1.5.4.4.9.8 1.4 1.1s1.1.4 1.8.4 1.3-.1 1.9-.4 1.1-.6 1.5-1.1c.4-.5.7-1 .9-1.6.2-.6.3-1.2.3-1.9.2-.7.1-1.4-.1-2zM13.6 76V59.8H7.8v-2.2c.8 0 1.5-.1 2.2-.2.7-.1 1.4-.3 2-.7.6-.3 1.1-.8 1.5-1.3.4-.6.7-1.3.8-2.1h2.1V76h-2.8zM21.9 62.3c0-.9.1-1.8.3-2.6.2-.9.4-1.7.7-2.4.3-.8.8-1.4 1.3-2 .6-.6 1.3-1 2.1-1.4s1.9-.5 3-.5c1.2 0 2.2.2 3 .5s1.5.8 2.1 1.4c.6.6 1 1.2 1.3 2 .3.8.6 1.6.7 2.4.2.9.3 1.7.3 2.6s.1 1.8.1 2.6 0 1.7-.1 2.6-.1 1.8-.3 2.6c-.2.9-.4 1.7-.7 2.4s-.8 1.4-1.3 2c-.6.6-1.2 1-2.1 1.4s-1.8.5-3 .5-2.2-.2-3-.5-1.5-.8-2.1-1.4c-.6-.6-1-1.2-1.3-2s-.6-1.6-.7-2.4c-.2-.9-.3-1.7-.3-2.6 0-.9-.1-1.8-.1-2.6.1-.8.1-1.7.1-2.6zm2.9 5.4c.1 1.1.2 2 .5 3 .3.9.8 1.7 1.4 2.4s1.5 1 2.7 1c1.2 0 2-.3 2.7-1s1.1-1.4 1.4-2.4c.3-.9.5-1.9.5-3 .1-1.1.1-2 .1-2.9V63c0-.7-.1-1.3-.2-2s-.2-1.3-.4-2c-.2-.6-.4-1.2-.8-1.7s-.8-.9-1.3-1.2-1.2-.4-2-.4-1.4.1-2 .4c-.5.3-1 .7-1.3 1.2-.4.5-.6 1-.8 1.7-.2.6-.3 1.3-.4 2-.1.7-.1 1.3-.2 2v1.8c.1.9.1 1.9.1 2.9z"/><g><path d="M53.5 38.2V21.9h-5.9v-2.2c.8 0 1.5-.1 2.2-.2.7-.1 1.4-.3 2-.7.6-.3 1.1-.8 1.5-1.3.4-.6.7-1.3.8-2.1h2.1v22.7h-2.7zM69.1 38.2V21.9h-5.9v-2.2c.8 0 1.5-.1 2.2-.2.7-.1 1.4-.3 2-.7.6-.3 1.1-.8 1.5-1.3.4-.6.7-1.3.8-2.1h2.1v22.7h-2.7z"/></g></svg>
    <div id="hour" class="hand"></div>
    <div id="minute" class="hand"></div>
    <div id="second" class="hand"></div>
  </div>
`;

function clone() {
  return document.importNode(template.content, true);
}

class Clock {
  constructor() {
    /* DOM variables */
    let frag = this.frag = clone();
    this.clockNode = frag.querySelector('.clock');
    this.hourNode = frag.querySelector('#hour');
    this.minuteNode = frag.querySelector('#minute');
    this.secondNode = frag.querySelector('#second');

    /* State variables */
    this.hour;
    this.minute;
    this.second;
    this.mounted;
    this.threshold = 200;
    this.offset = null;
    this.time = Date.now() - this.threshold;
    this.rafId;

    this.onNewFrame = this.onNewFrame.bind(this);
    this.setClockNodeMounted = this.setClockNodeMounted.bind(this);
  }

  /* DOM update functions */
  setHourNode(value) {
    if(value === 0) {
      this.clockNode.classList.remove('mounted');
      this.hourNode.style.setProperty('--deg', value + 'deg');
      this.setMountedOnNextFrame();
    } else {
      this.hourNode.style.setProperty('--deg', value + 'deg');
    }
  }

  setMinuteNode(value) {
    if(value === 0) {
      this.clockNode.classList.remove('mounted');
      this.minuteNode.style.setProperty('--deg', value + 'deg');
      this.setMountedOnNextFrame();
    } else {
      this.minuteNode.style.setProperty('--deg', value + 'deg');
    }
  }

  setSecondNode(value) {
    if(value === 0) {
      this.clockNode.classList.remove('mounted');
      this.secondNode.style.setProperty('--deg', value + 'deg');
      this.setMountedOnNextFrame();
    } else {
      this.secondNode.style.setProperty('--deg', value + 'deg');
    }
  }

  setClockNode(value) {
    this.clockNode.classList.add(value);
  }

  setClockNodeMounted() {
    if(!this.clockNode.classList.contains('mounted')) {
      this.setClockNode('mounted');
    }
  }

  setClockNodeMode(dark) {
    this.clockNode.classList[dark ? 'add' : 'remove']('dark');
  }

  /* State update functions */
  setHour(value) {
    this.hour = value;
    this.setHourNode(this.getDegree(value, 12));
  }

  setMinute(value) {
    this.minute = value;
    this.setMinuteNode(this.getDegree(value, 60));
  }

  setSecond(value) {
    this.second = value;
    this.setSecondNode(this.getDegree(value, 60));
  }

  setMounted(value) {
    this.mounted = value;
    this.setClockNodeMounted();
  }

  setOffset(value) {
    this.offset = Number(value);
    this.updateTime(Date.now());
  }

  setDark(value) {
    this.setClockNodeMode(value);
  }

  /* State logic */
  updateTime(newTime) {
    let time = this.time = newTime;
    let date = new Date(time);

    if(this.offset != null) {
      let utc = time + (date.getTimezoneOffset() * 60000);
      date = new Date(utc + (3600000 * this.offset));
    }

    this.setHour(date.getHours());
    this.setMinute(date.getMinutes());
    this.setSecond(date.getSeconds());
  }

  setTime() {
    let last = this.time;
    let now = Date.now();
    let diff = now - last;

    if(diff >= this.threshold) {
      this.updateTime(now);
    }
  }

  setExplicitTime(time) {
    this.stop();
    this.updateTime(Number(time));
  }

  getDegree(value, max) {
    let fraction = value / max;
    return Math.floor(360 * fraction);
  }

  setMountedOnNextFrame() {
    requestAnimationFrame(this.setClockNodeMounted);
  }
  
  start() {
    this.rafId = requestAnimationFrame(this.onNewFrame);
  }

  stop() {
    cancelAnimationFrame(this.rafId);
  }

  /* Event listeners */
  onNewFrame() {
    this.setTime();
    this.start();
  }

    /* Init functionality */
  connect() {
    this.setTime();
    this.setMounted(true);
    this.start();
  }
  
  disconnect() {
    cancelAnimationFrame(this.rafId);
  }

  update(data = {}) {
    if(data.time) this.setExplicitTime(data.time);
    if(data.offset != null) this.setOffset(data.offset);
    if(data.dark != null) this.setDark(data.dark);
    if(data.stop) this.stop();
    if(data.start) this.start();
    return this.frag;
  }
}

const view = Symbol('clock.view');

class ClockElement extends HTMLElement {
  static get observedAttributes() {
    return ['dark', 'offset', 'time'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this[view] = new Clock();
  }

  connectedCallback() {
    this[view].connect();
    let frag = this[view].update({
      offset: this.offset,
      time: this.time,
      dark: this.dark
    });
    this.shadowRoot.appendChild(frag);
  }

  disconnectedCallback() {
    this[view].disconnect();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    this[attr] = newVal;
  }

  get time() {
    return this._time;
  }

  set time(time) {
    this._time = time;
    this[view].update({ time });
  }

  get offset() {
    return this._offset;
  }

  set offset(offset) {
    this._offset = offset;
    this[view].update({ offset });
  }

  get dark() {
    return this._dark || false;
  }

  set dark(val) {
    let dark = typeof val === 'boolean' ? val : val === '';
    this._dark = dark;
    this[view].update({ dark });
  }

  stop() {
    this[view].update({ stop: true });
  }

  start() {
    this[view].update({ start: true });
  }
}

customElements.define('analog-clock', ClockElement);

export {
  ClockElement as default,
  ClockElement as AnalogClock
};