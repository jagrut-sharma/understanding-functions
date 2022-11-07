'use strict';

// More examples about closures

let f;

const g = function () {
  const a = 20;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 30;
  f = function () {
    console.log(b * 3);
  };
};

g();
f();
console.dir(f);

// Assigning another variable
h();
f();
console.dir(f);

const boardPassengers = function (numPassengers, waitingTime) {
  const group = numPassengers / 3;
  setTimeout(function () {
    console.log(
      `We have begun boarding procedure for ${numPassengers} passengers.`
    );
    console.log(`We will take groups of ${group} people each.`);
  }, waitingTime * 1000);

  console.log(`We will begin boarding procedure in ${waitingTime} minutes.`);
};

const group = 270; // When above group variable is not availavble, then it will search through scope chain.
boardPassengers(180, 3);

/*
//Closures

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`Passesngers present: ${passengerCount}`);
  };
};

const booker = secureBooking();
booker();
booker();
booker();

console.dir(secureBooking);
console.dir(booker); // See in scopes --> Closures are available --> passengersCount is available.

/*
// IIFE (immediately Invoked Function Expression)

const runOnce = function () {
  console.log(`This will run once`);
};

runOnce();
runOnce();

(function () {
  console.log(`run once`);
})();

(() => console.log(`This will also run once.`))();

if (true) {
  const isPrivate = true;
  var notPrivateNumber = 10;
}

// console.log(isPrivate); // Throws reference error as const not accessible
console.log(notPrivateNumber); // var is accessible.

/*
// Coding challenge-1

const poll = {
  question: 'What is your favourite programming language?',
  option: ['0: Javascript', '1: Python', '2. Rust', '3. C++'],
  answers: new Array(4).fill(0),
};

poll.displayNewAnswers = function () {
  // let optionString = '';
  // for (const ele of this.option) {
  //   optionString += ele + '\n';
  // }
  // const question = this.question + '\n' + optionString;
  const userFavLang = prompt(`${this.question}\n${this.option.join('\n')}`);

  const userAns = this.checkValid(userFavLang.trim());
  this.result(userAns);
};

poll.checkValid = function (answer) {
  if (answer === '') alert(`Enter value between o and 3`);
  else return Number(answer);
};

poll.result = function (answer) {
  if (answer >= 0 && answer < 4) {
    let currValue = this.answers[answer];
    currValue++;
    this.answers[answer] = currValue;
    poll.displayResults('string');
  } else alert(`Enter value between o and 3`);
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.displayNewAnswers.bind(poll));

poll.displayResults = function (nature = 'array') {
  if (nature === 'array') console.log(this.answers);
  else {
    console.log(`Poll results are: ${[...this.answers]}`);
  }
};

poll.displayResults.call({ answers: [5, 2, 4, 1] });
poll.displayResults.call({ answers: [5, 2, 4, 1] }, 'string');
poll.displayResults();
poll.displayResults(undefined, 'string');
/*
// Call and Apply method

const airIndia = {
  airline: 'Air India',
  code: 'AI',
  bookings: [],
  book(flightNum, passengerName) {
    console.log(
      `${passengerName} has booked a flight in ${this.airline} on flight ${this.code}-${flightNum}`
    );
    this.bookings.push({
      name: passengerName,
      flight: `${this.code}-${flightNum}`,
    });
    console.log(this.bookings);
  },
};

airIndia.book(101, 'Jagrut Sharma');
airIndia.book(152, 'John Doe');

const bookFlight = airIndia.book;
// console.log(bookFlight);

const kingfisher = {
  airline: 'King Fisher',
  code: 'KF',
  bookings: [],
};

// bookFlight(256, 'Virat Kohli'); // Will give type error as this in a simple function call in strict mode is undefined

bookFlight.call(kingfisher, 256, 'Virat Kohli');
airIndia.book.call(kingfisher, 256, 'Surya Kumar Yadav');
airIndia.book(152, 'Jane Doe');
bookFlight.call(airIndia, 7, 'James Bond');
console.log(airIndia);
console.log(kingfisher);

bookFlight.apply(kingfisher, [256, 'M.S. Dhoni']);
bookFlight.call(kingfisher, ...[256, 'Jagrut Sharma']); // Using spread operator with call function gives same result. => also it is better practice to pass these after storing in variables as they will then refer to the same array object.

const emirates = {
  airline: 'Emirates Airlines',
  code: 'EA',
  bookings: [],
};

// Bind method

const bookAI = bookFlight.bind(emirates); // here bookAI is fixed.
bookAI(301, 'Mithali Raj'); // We no longer need to specify where "this" should be pointed
console.log(emirates);
const bookAI301 = bookFlight.bind(emirates, 301);
bookAI301('Smriti Mandhana');
bookAI301('Harmanpeet Kaur');
bookAI301('Sunil Chhetri');

// with event listeners

emirates.plane = 200;
emirates.buyNewPlane = function () {
  // console.log(this);
  this.plane++;
  console.log(this.plane);
};

// document.querySelector('.buy').addEventListener('click', emirates.buyNewPlane); // will gove NaN as "this" --> element, event is attached to.

document
  .querySelector('.buy')
  .addEventListener('click', emirates.buyNewPlane.bind(emirates));

const taxCharge = (rate, value) => value + value * rate;

console.log(taxCharge(0.3, 100));
console.log(taxCharge(0.1, 10));

const chargeGST = taxCharge.bind(null, 0.18);

console.log(chargeGST(100));
console.log(chargeGST(500));

// can also be done using single function

const taxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const newGST = taxRate(0.2);
console.log(newGST(100));
console.log(newGST(500));

/*
const greet = function (prefix) {
  return function (name) {
    console.log(`${prefix}! ${name}`);
  };
};

// const greet = prefix => name => console.log(`${prefix}! ${name}`); // Easier but a little complex => can make you confused

const greeting = greet('Hi');
console.log(greeting);
greeting('Jagrut'); // Still has access to greet because of closure
const greeting2 = greet('Namastey');
greeting2('Jagrut');

greet('Hola')('Swapnadeep'); // used to access function inside a function

/*
const sum = function (...values) {
  let sum = 0;
  for (const currNumber of values) sum += Number(currNumber);
  console.log(sum);
};

sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
console.log(sum); // function gets printed.

function add(fun, ...values) {
  console.log(fun);
  fun(...values);
}

add(sum, 1, 2, 3, 4, 5); // we passed function as well. => Treating function as just another variable.

/*
const flight = 'LH234';
const jagrut = {
  name: 'Jagrut Sharma',
  passport: '2348423141232',
};

const isCheckedIn = function (flightNum, person) {
  flightNum = 'LH999';
  person.name = 'Mr. ' + person.name;
  person.passport === '2348423141232'
    ? console.log('Checked In')
    : console.log('Wrong passport');
};

isCheckedIn(flight, jagrut);

console.log(flight); // Value not affected
console.log(jagrut); // This value is changed

/*
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 200 * numPassengers // Default value can be calculated as well. The parameters used in expression must be defined before
) {
  //   ES-5 way of doing things
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 5);
createBooking('LH123', 3);
createBooking('LH123', 0);
createBooking('LH123', 3, 500);
// createBooking('LH123', , 500); // Gives error
createBooking('LH123', undefined, 100); // If you want to avoid passing numPassengers => Default value assigned*/
