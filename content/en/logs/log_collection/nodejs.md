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

  - type: file
    path: "<FILE_NAME_PATH>.log"
    service: nodejs
    source: nodejs
    sourcecategory: sourcecode
```

## Aggentless Logging

It is possible to stream logs from your application to Datadog or to the Datadog Agent directly. This is not the recommended setup as handling connection issues should not be done directly in your application, but it might not be possible to log to a file when your application is running on a machine that cannot be accessed.

{{< tabs >}}
{{% tab "Winston 3.0 http" %}}

You can use [winston HTTP transport][4] to send your logs directly through the datadog API.
In your bootstrap file or somewhere in your code, declare the logger as follow:

```js

const { createLogger, format, transports } = require('winston');

const httpTransportOptions = {
  host: 'http-intake.logs.datadoghq.com',
  path: '/v1/input/{put your API key here}',
  ssl: true
};

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.Http(httpTransportOptions),
  ],
});

module.exports = logger;

// Example logs
logger.log('info', 'Hello simple log!');
logger.info('Hello log with metas',{color: 'blue' });
```

__Note:__ To send logs to Datadog EU site, set the host property to `http-intake.logs.datadoghq.eu`

If you are using US platform, you can also check the community supported [Datadog Transport][5].

{{% /tab %}}
{{< /tabs >}}


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
[3]: /tracing/connect_logs_and_traces/nodejs
[4]: https://github.com/winstonjs/winston/blob/master/docs/transports.md#http-transport
[5]: https://github.com/winstonjs/winston/blob/master/docs/transports.md#datadog-transport
