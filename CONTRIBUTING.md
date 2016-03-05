Contributing
============

First, thank you for taking time to contribute to RSDB!

Second, I need to finish this page, so here is the fast version

testing:

- install [nodejs](https://nodejs.org/en/)
- fork + clone
- npm i
- npm start
- navigate to [vcap.me](http://vcap.me/) to see your local version

calcs:

- set title with the <rsdb-title> tag.
- use fieldset+legend for collapsable boxes
- tables should use .linetable or similar styling
- add to oldschool/calc/index.js
db:

- db exports should be DoubleHumpCamelCase.
- and in [AMD](http://requirejs.org/) style.
- use the waiter module for generation, see any of the current generators
