---
title: "Datadog-NodeJS Integration"
integration_title: "NodeJS"
kind: integration
doclevel: basic
---

## Overview

Connect your Node.js applications to Datadog to:

* Visualize their performance
* Correlate their performance with the rest of your applications
* Monitor any relevant metric

## Configuration

The Node.js integration enables you to monitor any custom metric by instrumenting a few lines of code. 
For instance, you can have a metric that returns the number of page views or the time of any function call. 
For additional information about the Node.js integration, please refer to this [guide on submitting metrics](https://docs.datadoghq.com/guides/metrics/)
For advanced usage, please refer to the [documentation in the repository](https://github.com/joybro/node-dogstatsd)

1. Install the library with npm:
```
npm install node-dogstatsd
```

2. Start instrumenting your code:
{{< highlight node>}}
var StatsD = require('node-dogstatsd').StatsD;
var dogstatsd = new StatsD();

# Increment a counter.
dogstatsd.increment('page.views')
{{< /highlight >}}

3. Go to the Metrics explorer page and see that it just works! 
{{< img src="integrations/nodejs/nodejs_graph.png" alt="Node JS graph" >}}