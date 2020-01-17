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

Using [Winston][1] to log from your NodeJS application gets you all the features you need to build up your logging strategy.

Winston is available through [NPM][2], to get started, you want to add the dependency to your code:

```text
npm install --save winston
```

`package.json` is updated with the corresponding dependencies:

```js
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

## Setup

**Inject trace IDs in your logs**:  If APM is enabled for this application and you wish to improve the correlation between application logs and traces, [follow APM NodeJS logging instructions][3] to automatically add trace and span IDs in your logs.

### Log to file

In your bootstrap file or somewhere in your code, declare the logger as follow:

{{< tabs >}}
{{% tab "Winston 3.0" %}}

```js

const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({ filename: `${appRoot}/logs/<FILE_NAME>.log` }),
  ],
});

module.exports = logger;

// Example logs
logger.log('info', 'Hello simple log!');
logger.info('Hello log with metas',{color: 'blue' });
```

{{% /tab %}}
{{% tab "Winston 2.0" %}}

```js
var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: '<LOGGER_NAME>',
            filename: '<FILE_NAME>.log',
      json: true,
            level: 'info'
        })
    ]
});

// Example logs
logger.log('info', 'Hello simple log!');
logger.info('Hello log with metas',{color: 'blue' });
```

{{% /tab %}}
{{< /tabs >}}

Check the content of the `<FILE_NAME>.log` file to see that Winston already took care of logging everything in JSON:

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
    path: <FILE_NAME_PATH>.log
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

Make sure that the parameter `max_connect_retries` is not set to `1` (the default is `4`).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/winstonjs/winston
[2]: https://www.npmjs.com
[3]: /tracing/connect_logs_and_traces/?tab=nodejs
