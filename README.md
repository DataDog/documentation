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

To get the browser refresh working, you should install the LiveReload extension into your browser. Otherwise you will have to do the arduous task
of clicking refresh yourself.

When writing docs, please use Markdown. This site actually uses Kramdown. To learn about the syntax, [see this site][1].

If you include ANY Markdown in the file, give it an .md extension.

## Doing stuff

This is easy. Are you ready for it? Run this command:
```
rake
```

Yeah, that's it. This command will compile the site, check 
for any bad links, and refresh your browser.

Before you push, make sure you verify there are no bad links.

## The old way of Doing stuff

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
