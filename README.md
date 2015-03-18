## Documentation site for Datadog

Built with [nanoc](http://nanoc.stoneship.org/), a static website generation tool.

## Pre-requisites

 * Ruby
 * RubyGems
 * Bundler

## Getting started

**NOTE: if you are Datadog Internal, use this on your host os and not on the personal-chef vm. There are a few reports that it will not run on personal-chef. **

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
*(If you get a message about libnotify or something else, are you a Datadog employee and running on personal chef? Read the note right below Getting started above.)*
Yeah, that's it. This command will compile the site, check 
for any bad links, and refresh your browser.

Before you push, make sure you verify there are no bad links.

## How to add a new integration

Create a markdown file under content/integratons. Add the following front matter at the top of the file:

    ---
    title: Datadog-<integration name> Integration
    integration_title: <integration name>
    kind: integration
    doclevel: basic
    ---

If you are writing a lot about the integration, change doclevel to complete or just remove the whole line. Now write the doc. There is no need to update any index, menu, or sidebars. Those are automatically generated. 

## How to add a new Guide

Create a markdown file under content/guides. Add the following front matter at the top of the file:

    ---
    title: <guide title>
    kind: guide
    listorder: <where in the list you want the doc to appear>
    ---

Each guide has a listorder. Change the list order number of this doc and any other docs to make sure stuff appears in the right order. There is no need to update any index, menu, or sidebars. Those are automatically generated. 

## Things to keep in mind

Make sure all files are lowercase. The Mac is case insensitive when creating links to images and pages, but where the docs are hosted is not. The test will be fine on the Mac but will fail in production.


[1]: http://kramdown.gettalong.org/quickref.html
