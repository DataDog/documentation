---
title: NodeJS log Collection
kind: documentation
autotocdepth: 2
customnav: lognav
beta: true
---

## Overview 

To log from your NodeJS application, we recommends to use [Winston](https://github.com/winstonjs/winston) - as you'll get all the features you need to build up your logging strategy. 

Winston is available through [NPM](https://www.npmjs.com). So, in order to get started, you want to add the dependency to your code.

```
npm install --save winston
```

`package.js` will be updated with the corresponding dependencies:

```json
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

In your bootstrap fille or somewhere in your code, declare the logger as follow:

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

### Configure your Datadog agent

Create a `nodejs.yaml` file in your `conf.d/` folder with the following content:

```yaml
init_config:

instances:
    [{}]
    
#Log section
logs:

    # - type : (mandatory) type of log input source (tcp / udp / file)
    #   port / path : (mandatory) Set port if type is tcp or udp. Set path if type is file
    #   service : (mandatory) name of the service owning the log
    #   source : (mandatory) attribute that defines which integration is sending the logs
    #   sourcecategory : (optional) Multiple value attribute. Can be used to refine the source attribtue
    #   tags: (optional) add tags to each logs collected

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
