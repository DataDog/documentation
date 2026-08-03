---
title: Node.js Log Collection
aliases:
  - /logs/languages/nodejs
further_reading:
- link: "/logs/log_configuration/processors"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/log_configuration/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "/logs/explorer/#visualize"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "/logs/faq/log-collection-troubleshooting-guide/"
  tag: "FAQ"
  text: "Log Collection Troubleshooting Guide"
- link: "/glossary/#tail"
  tag: Glossary
  text: 'Glossary entry for "tail"'  
---


## Configure your logger

To send your logs to Datadog, log to a file and [tail][13] that file with your Datadog Agent. Use a Node.js logging library, such as [Winston][1], [Bunyan][14], or [Pino][15], to log from your Node.js application.

### Log to a file

In your bootstrap file or in your code, declare the logger in the following way:

{{< tabs >}}
{{% tab "Winston 3.0" %}}

Winston is available through [NPM](https://www.npmjs.com). Add the dependency to your code:

```text
npm install --save winston
```

`package.json` is updated with the corresponding dependency:

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

```js

const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({ filename: `${appRoot}/logs/<FILE_NAME>.log` }),
  ],
});

module.exports = logger;

// Example logs
logger.log('info', 'Hello simple log!');
logger.info('Hello log with metas',{color: 'blue' });
```

Check the content of the `<FILE_NAME>.log` file to confirm that Winston is logging in JSON:

```json
{"level":"info","message":"Hello simple log!","timestamp":"2015-04-23T16:52:05.337Z"}
{"color":"blue","level":"info","message":"Hello log with metas","timestamp":"2015-04-23T16:52:05.339Z"}
```

{{% /tab %}}
{{% tab "Winston 2.0" %}}

Winston is available through [NPM](https://www.npmjs.com). Add the dependency to your code:

```text
npm install --save winston
```

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

Check the content of the `<FILE_NAME>.log` file to confirm that Winston is logging in JSON:

```json
{"level":"info","message":"Hello simple log!","timestamp":"2015-04-23T16:52:05.337Z"}
{"color":"blue","level":"info","message":"Hello log with metas","timestamp":"2015-04-23T16:52:05.339Z"}
```

{{% /tab %}}
{{% tab "Bunyan" %}}

Bunyan is available through [NPM](https://www.npmjs.com). Add the dependency to your code:

```text
npm install --save bunyan
```

```js
const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: '<SERVICE_NAME>',
  streams: [
    {
      level: 'info',
      path: `${appRoot}/logs/<FILE_NAME>.log`,
    },
  ],
});

// Example logs
logger.info('Hello simple log!');
logger.info({ color: 'blue' }, 'Hello log with metas');
```

Bunyan logs in JSON by default. Check the content of the `<FILE_NAME>.log` file to confirm:

```json
{"name":"<SERVICE_NAME>","hostname":"my-host","pid":1234,"level":30,"msg":"Hello simple log!","time":"2015-04-23T16:52:05.337Z","v":0}
{"name":"<SERVICE_NAME>","hostname":"my-host","pid":1234,"level":30,"color":"blue","msg":"Hello log with metas","time":"2015-04-23T16:52:05.339Z","v":0}
```

{{% /tab %}}
{{% tab "Pino" %}}

Pino is available through [NPM](https://www.npmjs.com). Add the dependency to your code:

```text
npm install --save pino
```

```js
const pino = require('pino');

const logger = pino(pino.destination(`${appRoot}/logs/<FILE_NAME>.log`));

// Example logs
logger.info('Hello simple log!');
logger.info({ color: 'blue' }, 'Hello log with metas');
```

Pino logs in JSON by default. Check the content of the `<FILE_NAME>.log` file to confirm:

```json
{"level":30,"time":1429807925337,"pid":1234,"hostname":"my-host","msg":"Hello simple log!"}
{"level":30,"time":1429807925339,"pid":1234,"hostname":"my-host","color":"blue","msg":"Hello log with metas"}
```

{{% /tab %}}
{{< /tabs >}}

## Configure your Datadog Agent

After [log collection is enabled][5], set up [custom log collection][6] to tail your log files and send new logs to Datadog.

1. Create a `nodejs.d/` folder in the `conf.d/` [Agent configuration directory][7].
2. Create a `conf.yaml` file in `nodejs.d/` with the following content:

```yaml
init_config:

instances:

##Log section
logs:

  - type: file
    path: "<FILE_NAME_PATH>.log"
    service: <SERVICE_NAME>
    source: nodejs
    sourcecategory: sourcecode
```

3. [Restart the Agent][8].
4. Run the [Agent's status subcommand][9] and look for `nodejs` under the {{< ui >}}Checks{{< /ui >}} section to confirm logs are successfully submitted to Datadog.

If logs are in JSON format, Datadog automatically [parses the log messages][10] to extract log attributes. Use the [Log Explorer][11] to view and troubleshoot your logs.

## Connect your service across logs and traces

If APM is enabled for this application, connect your logs and traces by [following the APM Node.js instructions][2]. This automatically adds trace IDs, span IDs, `env`, `service`, and `version` to your logs.

**Note**: If the Datadog SDK injects `service` into your logs, it overrides the value set in the Agent configuration.

## Agentless logging

You can stream your logs from your application to Datadog without installing an Agent on your host. However, Datadog recommends you use an Agent to forward your logs as it provides a native connection management.

Use the [Winston HTTP transport][3] to send your logs directly through the [Datadog Log API][4].

In your bootstrap file or in your code, declare the logger in the following way:

```javascript
const { createLogger, format, transports } = require('winston');

const httpTransportOptions = {
  host: 'http-intake.logs.{{< region-param key="dd_site" >}}',
  path: '/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=nodejs&service=<APPLICATION_NAME>',
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

**Note:** You can also use the community-supported [Datadog Transport][12].

Bunyan and Pino don't include a built-in HTTP transport. To stream logs from these libraries directly to Datadog without an Agent, use a community-supported package or logging layer that adds Datadog HTTP support.

## Troubleshooting

If you have DNS lookup errors in your application this could be due to logstash exceptions not being caught. A handler should be added as follows:

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
[2]: /tracing/other_telemetry/connect_logs_and_traces/nodejs/
[3]: https://github.com/winstonjs/winston/blob/master/docs/transports.md#http-transport
[4]: /api/v1/logs/#send-logs
[5]: /agent/logs/?tab=tailfiles#activate-log-collection
[6]: /agent/logs/?tab=tailfiles#custom-log-collection
[7]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[8]: /agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[9]: /agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[10]: /logs/log_configuration/parsing/?tab=matchers
[11]: /logs/explorer/#overview
[12]: https://github.com/winstonjs/winston/blob/master/docs/transports.md#datadog-transport
[13]: /glossary/#tail
[14]: https://github.com/trentm/node-bunyan
[15]: https://github.com/pinojs/pino
