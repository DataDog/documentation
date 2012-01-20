## Documentation site for Datadog

Built with [nanoc](http://nanoc.stoneship.org/), a static website generation tool.

## Pre-requisites

 * Ruby
 * RubyGems
 * Bundler

## Getting started

Install the dependencies with `bundler`. I like to install them under the
project root:

```
$ bundle install --path vendor/bundle
```

Once the deps are installed, you should be able to accomplish what you need to
with the included Rake tasks.

## Doing stuff

### Compile the static site:

```
$ rake compile
```

### Run a local webserver to view the compiled site:

```
$ rake view
```

### Run a local webserver and auto-update:

```
$ rake autocompile
```

*I recommend disabling the syntax highlighting if you run the server with autocompile since it's slow. In `Rules`:*

```
    filter :erb
    filter :kramdown
#    filter :colorize_syntax,
#      :colorizers => {:javascript => :pygmentize}
    layout 'default'
```

### Deploy the static site

In order for this to work, you need to have the static site repo
(DataDog/datadog.github.com) checked out next to this one (i.e. from the root of
this repo, the static site should be located at `../datadog.github.com/`):

```
$ git clone git@github.com:DataDog/datadog.github.com.git
```

Then run the `release` Rake task, which should do a clean compile of the site
and then copy all the new files over to the static repo and create a new commit.
This task will wipe out any uncommitted changes in the static repo.

```
$ rake release
```

Take a look at the new commit. When you've decided it's to your liking, push it
to GitHub, and GitHub Pages will do the rest.

```
$ cd ../datadog.github.com/
$ git push origin master
```
