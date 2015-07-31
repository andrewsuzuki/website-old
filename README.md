# andrewsuzuki.com / andrewsuzuki.github.io 

This is my personal portfolio and blog. I've written a custom setup using a modern JS workflow consisting of Node, Gulp, Browserify, and the like. I plan on moving the core functionality to its own repository, and maybe adding a CLI tool. Because, you know, the world definitely needs another static site generator. Well, actually, most of the generators out there are still using Grunt, which is why I made my own in the first place.

Site content written in Markdown w/ HAML front-matter can be found in content/. Templates/partials written in EJS and Sass can be found in app/.

Thanks to [Github Pages](https://pages.github.com) and the gulp-gh-pages plugin, I can easily build and deploy my static site for free by running ```gulp deploy``` (pushes the build to the [master branch](https://github.com/andrewsuzuki/andrewsuzuki.github.io/tree/master)). So, a big thanks to Github and whoever wrote that sweet plugin.

The header has an interactive background consisting of [voronoi](https://en.wikipedia.org/wiki/Voronoi_diagram), animated using paper.js.

Check out the site here: [andrewsuzuki.com](https://andrewsuzuki.com)
