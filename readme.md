# &lt;analog-clock&gt;

An analog clock component written in plain JavaScript:

![screen shot 2018-12-12 at 6 00 19 pm](https://user-images.githubusercontent.com/361671/49904346-d8472e00-fe37-11e8-9884-3db66b9f3985.png)

## Usage

Basic usage with local time:

```html
<analog-clock></analog-clock>
```

Providing a __time__ attribute will set the exact time and not update the clock.

```html
<analog-clock time="1301757851000"></analog-clock>
```

Providing an __offset__ sets the time zone offset. The following sets the time in New York:

```html
<analog-clock offset="-5"></analog-clock>
```

### JavaScript

Anything you can do in HTML with attributes can also be done using the JavaScript API with properties:

```js
import { AnalogClock } from './path/to/clock.js';

let clock = new AnalogClock();
clock.offset = -6;

document.body.appendChild(clock);
```

## License

BSD-2-Clause