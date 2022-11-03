'use strict';

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
console.log(bookFlight);

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
bookFlight.call(kingfisher, ...[256, 'Jagrut Sharma']); // Using spread operator with call function gives same result. => also it is better practice to pass these after storing in variables as they will then refer to same array object.

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