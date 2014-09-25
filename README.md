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

When writing docs, please use Markdown. This site actually uses Kramdown. To learn about the syntax, [see this site][1]

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
(This is now super-quick, so there is no reason not to do this.)

```
$ bundle exec guard
```
[1]: http://kramdown.gettalong.org/quickref.html
