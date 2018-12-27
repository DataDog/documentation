---
title: NodeJS log collection
kind: documentation
aliases:
  - /logs/languages/nodejs
further_reading:
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "logs/explorer"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/faq/log-collection-troubleshooting-guide"
  tag: "FAQ"
  text: "Log Collection Troubleshooting Guide"
---

## Overview 

To log from your NodeJS application, we recommend using [Winston][1] - as you'll get all the features you need to build up your logging strategy. 

We also strongly encourage you to setup your logging libraries to produce your logs in JSON format to avoid sustaning [custom parsing rules][2].

Winston is available through [NPM][3]. So, in order to get started, you want to add the dependency to your code.

```
npm install --save winston
```

`package.js` is updated with the corresponding dependencies:

```
{
  "name": "...",

  //...
  "dependencies": {
    //...
    "winston": "x.y.z",
    //...
  }
}
```

## Setup - Log to file

In your bootstrap file or somewhere in your code, declare the logger as follow:

```js
var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: 'your_logger_name',
            filename: 'your-appname-info.log',
      json: true,
            level: 'info'
        })
    ]
});

logger.log('info', 'Hello simple log!');
logger.info('Hello log with metas',{color: 'blue' });
```

Check the content of the `your-appname-info.log` file to see that Winston already took care of logging everything in JSON:

```json
{"level":"info","message":"Hello simple log!","timestamp":"2015-04-23T16:52:05.337Z"}
{"color":"blue","level":"info","message":"Hello log with metas","timestamp":"2015-04-23T16:52:05.339Z"}
```

## Configure your Datadog Agent

Create a `nodejs.d/conf.yaml` file in your `conf.d/` folder with the following content:

```yaml
init_config:

instances:
    
##Log section
logs:

    ## - type : file (mandatory) type of log input source (tcp / udp / file)
    ##   port / path : (mandatory) Set port if type is tcp or udp. Set path if type is file
    ##   service : (mandatory) name of the service owning the log
    ##   source : (mandatory) attribute that defines which integration is sending the logs
    ##   sourcecategory : (optional) Multiple value attribute. Can be used to refine the source attribute
    ##   tags: (optional) add tags to each logs collected

  - type: file
    path: /path/to/your/go/nodejs.log
    service: nodejs
    source: nodejs
    sourcecategory: sourcecode
```

## Troubleshooting

In case you have dns lookup errors or crash in your application this could be linked to logstash exceptions not being caught.
A handler should be added as follows:

```js
var logstash = new winston.transports.Logstash({ ... });
logstash.on('error', function(err) {
    console.error(err); // replace with your own functionality here
});
```

Make sure that the parameter `max_connect_retries` is not set to 1 (the default is 4).

## Getting Further
Here are some little advices:

- Always give a name to the logger corresponding to the functionality or service you try to deliver.
- Log a lot in the DEBUG level and log accurately in the INFO, WARNING and FATAL levels; since these are the log levels you'll get in your production environments.
- Start small and try to log the important stuff first, instead of being comprehensive. Then add what is missing after having a discussion with your team.
- Use metas! Add context to any log so you can quickly filter over users, customers or any business centric attribute.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/winstonjs/winston
[2]: /logs/processing/parsing
[3]: https://www.npmjs.com
