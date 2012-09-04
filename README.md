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
$ bundle exec rake compile
```

### Run a local webserver to view the compiled site:

```
$ bundle exec rake view
```

### Run a local webserver and auto-update:

```
$ bundle exec rake autocompile
```

### Toggle Syntax Highlighting

Syntax highlighting is really slow, so to turn it off while developing, run:

```
$ rake disable_syntax
```

To run it back on:

```
$ rake disable_syntax
```
