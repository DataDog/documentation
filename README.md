## Documentation site for Datadog

Built with [nanoc](http://nanoc.stoneship.org/), a static website generation tool.

## Setup

**NOTE: if you are Datadog Internal, use this on your host os and not on the personal-chef vm. There are a few reports that it will not run on personal-chef. **

```
brew install rbenv # or equivalent on linux
rbenv install 2.3.0
rbenv local 2.3.0
gem install bundler # and set up your shell / shell profile for it
rbenv exec bundle install
```

## Working on Docs

```
rake
```

If you get an error, make sure you're running on the host.

Yeah, that's it. This command will compile the site, check
for any bad links, and refresh your browser.

This site uses Kramdown. To learn about the syntax, [see this site][1].

If you include ANY Markdown in a file, give it an .md extension.

Make sure all files are lowercase. Macs are case insensitive when creating links to images and pages, but the server is not. The tests will be fine locally but the site will fail in production.

## Releasing

Before push/merging, make sure to

```
rake clean
rake
```

and verify that there are no bad links on http://localhost:3000.

If you've been working on code samples you should also

```
export TEST_DD_API_KEY=private_org_key
export TEST_DD_APP_KEY=private_org_key
rake clean
rake test
```

These keys should be for a test account that does not include dozens of people. There are several samples that mute and unmute everything. Everyone in the org will be notified. If you are the only one in the org, you won't be getting angry emails from others asking you to stop muting everything.

**If there are errors, please don't merge.**

## How to add a new integration

Create a markdown file under content/integratons. Add the following front matter at the top of the file:

    ---
    title: Datadog-<integration name> Integration
    integration_title: <integration name>
    kind: integration
    doclevel: basic
    ---

If you are writing a lot about the integration, change doclevel to complete or just remove the whole line. Now write the doc. There is no need to update any index, menu, or sidebars. Those are automatically generated.

Every integration should have at least four sections. First include an overview. Second is the Installation process. Third include troubleshooting steps. Fourth should be when you last verified and under what conditions it worked. If someone has already included this, add yours above the previous one so we can see some sort of history.

## How to add a new Guide

Create a markdown file under content/guides. Add the following front matter at the top of the file:

    ---
    title: <guide title>
    kind: guide
    listorder: <where in the list you want the doc to appear>
    ---

Each guide has a listorder. Change the list order number of this doc and any other docs to make sure stuff appears in the right order. There is no need to update any index, menu, or sidebars. Those are automatically generated.


[1]: http://kramdown.gettalong.org/quickref.html
