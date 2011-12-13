## Documentation site for Datadog

Built with [nanoc](http://nanoc.stoneship.org/), a static website generation tool.

## Pre-requisites

 * Ruby
 * RubyGems
   * nanoc
   * kramdown
   * adsf
   * pygmentize

## Doing stuff

Compile the static site:

```
$ nanoc compile
```

Run a local webserver to view the compiled site:

```
$ nanoc view
```

Run a local webserver and auto-update:

```
$ nanoc autocompile
```

*I recommend disabling the syntax highlighting if you run the server with autocompile since it's slow. In `Rules`:*

```
    filter :erb
    filter :kramdown
#    filter :colorize_syntax,
#      :colorizers => {:javascript => :pygmentize}
    layout 'default'
```
