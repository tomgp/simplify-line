##What it is
A quick start for making static websites. 

##What you need
[NodeJS](https://nodejs.org/), [Git](https://help.github.com/articles/set-up-git/)

##How you use it
To get going open terminal and type in the following things

`git clone https://github.com/tomgp/starter-kit.git my-new-webpage`

`cd my-new-webpage`

`npm install`

`npm run watch`

(where `my-new-webpage` is the name of your new web page)

By default HTML is _index.html_, styles in _style.css_ and you can write Node style Common JS modules in the _source_ directory.



##What do you get
Some decent default CSS

Bundles Javascript using require('the-module-name') type syntax ([browserify](http://browserify.org/))

Re-builds the JS bundle on changes ([watchify](https://www.npmjs.com/package/watchify))

Local live reloading webserver ([srvlr](https://github.com/kavanagh/srvlr))

ES6 pollyfils ([babelify](https://github.com/babel/babelify))