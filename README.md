# Game Soundboard

A soundboard progressive web app that plays audio lines of the requested character. When a user selects a character, they are redirected to a webpage where a JSON file containing the selected character's data and theme colors are extracted (via jQuery AJAX function) and dynamically rendered onto the page.

This project has the usual HTML, CSS, JS as well as jQuery and NPM (Node.js Package Manager) packages. One of them was Gulp.js, a task runner used to streamline the workflow used in this project and utilize the other packages that were installed.

An attempt was made to utilized service workers to cache the data so it can still be rendered offline, but it failed. A possible extra to fix in the future.

Note: All audio, images, and fonts are trademarked property belonging to their respective companies, which I am willing to take down upon request. Please don't sue me.

## Running This Project

**To use my project:**

1. Clone this repo into a local directory. In the root directory, run `npm install` to install of the necessary components automatically (assuming you already have npm itself installed).
2. When the installations are complete, simply issue the command `gulp` and the necessary CSS and JS will automatically be generated and the live-server will start up, taking you to the landing page. Enjoy!

Alternatively, it is currently hosted on [Firebase.](https://game-soundboard.firebaseapp.com/)


## Component Descriptions

This page assumes the reader has no knowledge of npm, just like me when I started this project. NPM is a package manager that allows the developer to initialize their project with a package.json which describes basic information about their project (notably dependencies) and install various types of package to accomplish various types of tasks (ie libraries, debuggers, minifiers, transcompilers, etc.). These packages that you use in your project are described in the dependencies section of the aforementioned package.json file.

For my project, my package.json file has the following dependencies:

* `gulp` : the task runner I used to automatically execute normally tedious tasks by utilizing the other packages below. You write a `gulpfile.js` file to `require()` the other installed packages and use them in your `gulp.task('task-name', function(){callback code})` functions. You first specify a `gulp.src('/filePath/file.blah')`, and then you chain onto it a `.pipe(packageName)` to do some task. After you're done chaining, you place your processed file with a final `.pipe(gulp.dest('/filePath/processedFile.blah'))`. Straightforward, powerful, and efficient...and wonderful.
* `gulp-util`: a bread-and-butter companion to gulp to has useful tools like logging, which is pretty much the only thing I used from it in this project.
* `gulp-if` : allows you to use if-else statements in your gulp tasks.
* `gulp-babel` : compiles modern JS code (ie ECMAScript2015) into older equivalent code. Super handy for cross-browser compatibility and supporting older browsers like IE. `babel-core` is the core component of the compiler, `babel-presets-env` and `babel-presets-es2015` allows babel to actually convert ES2015 code into plain JS.
* `gulp-clean-css` : minifies CSS files you specify into one css file.
* `gulp-uglify` : same as `gulp-clean-css` but with JS.
* `gulp-concat` : takes files and appends them into one file. Useful for `.css` and `.js` files because your browser will make less requests to fetch your files, which improves your app's performance.
* `gulp-browserify` : allows you to use the `require()` function in `.js` files other than `gulpfile.js`. Almost necessary for many NPM packages that are not related to gulp.
* `jquery` : the JS library we all know and love. Use browserify and put the line `var $ = require('jquery');` into your `.js` file and work your dollar-sign magic.
* `pump` : Awesome debugger that provides more meaningful error messages than `gulp.pipe()`.
* `gulp-webserver` : deployes a live-server that will render your project on a browser locally as if it was actually on a hosting server. Changes you make to your files will be updated on your browser on-the-fly. Most modern text-editors like Brackets and Atom already have this available, but this is good to have anyway.
* `handlebars` : `handlebars.js` is a JS templating framework that dynamically creates HTML code using logic like each and if-else statements. 90% of my board.html page is made of handlebar scripts that render the character's audio lines and data automatically.

You can install any of these packages by using navigating to your project's directory on the Node.js Command Line and issuing a `npm install --save (or --save-dev if it's critical to the project) packageName` command.

More information about NPM [here](https://www.npmjs.com/) 

More information about handlebars.js [here](http://handlebarsjs.com/)


## How It Works

When `gulp` is issued, the default task runs the 'watch' and the 'webserver' task. The 'watch' task constantly runs to check for any changes made to any files in the process (development) folder or the app (production) folder, and issues the 'css' and/or 'js' tasks. The 'css' task simply minifies `app.css` in the process folder and puts the new file into the app folder.

The 'js' task first targets all the files in process/js/ file. It compiles all of the modern JS using Babel and then concats all three files into an `app.js` file. Browserfiy is called into include jQuery and Handlebars.js so they can be utilized during user interaction. Finally `app.js` gets minified and placed into the app/js/ folder. All the files are ready to render the web app. Now, the 'webserver' task fires up the live-webserver, and takes the user to the landing page.

When the user selects a character, the link contains an HTML `data-name` attribute appropriate for the character and it gets stored into the browser's localStorage. That way, when the browser navigates to board.html (regardless of which character is chosen), `app.js` will know which character to render. When it does, jQuery's AJAX shortcut function `$.getJSON()` will fire, retrieving the character's JSON file, which contains name, game-title, images, voice line paths, even their game's fonts and styles. All media files are hosted on Google Cloud for performance reasons and for hogging less bandwidth on the local server.

Most of the style rules in `app.css` utilize CSS variables, whose values come from the JSON files. That way, `board.html` can render dramatically different pages despite being the same file all throughout.

When the data is loaded, Handlebars takes the HTML templates in the Handlebar script tags and compiles them into real, regular HTML code, which is then appended to the appropriate positions on the page. Finally, extra styling is done to make the layout look nice. The soundboard is ready for use.

Clicking the Home button takes the user to the landing page, and the process starts all over again.
