##What it is
A quick start for making static websites. 

##What you need
[NodeJS](https://nodejs.org/), [Git](https://help.github.com/articles/set-up-git/)

##What do you get
Some halfway decent default CSS ([for examle](http://www.toffeemilkshake.co.uk/starter-kit/))

Bundles Javascript using `require('the-module-name')` type syntax ([browserify](http://browserify.org/))

Re-builds the JS bundle on changes ([watchify](https://www.npmjs.com/package/watchify))

Local live reloading webserver ([srvlr](https://github.com/kavanagh/srvlr))

ES6 pollyfils ([babelify](https://github.com/babel/babelify))

##How you use it
To get going open terminal and type in the following things

clone the repo:

`git clone https://github.com/tomgp/starter-kit.git my-new-webpage`

go to the new thing you made:

`cd my-new-webpage`

point it to a new remote i.e. you may wish to use your own github account or something:

`git remote set-url origin https://github.com/yourusername/my-new-webpage.git`

get all the js stuff:

`npm install`

run a live reloading server and somehting to build the javascript:

`npm run watch`

(where `my-new-webpage` is the name of your new web page)

By default HTML is _index.html_, styles in _style.css_ and you can write Node style Common JS modules in the _source_ directory.



