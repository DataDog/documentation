---
title: "Datadog-NodeJS Integration"
integration_title: "NodeJS"
kind: integration
doclevel: basic
description: "Send custom metrics from your Node.js services via DogStatsD or our API."
---

{{< img src="integrations/nodejs/nodejs_graph.png" alt="Node JS graph" >}}

## Overview

Connect your Node.js applications to Datadog to:

* Visualize their performance
* Correlate their performance with the rest of your applications
* Monitor any relevant metric

## Setup
### Configuration

The Node.js integration enables you to monitor any custom metric by instrumenting a few lines of code.
For instance, you can have a metric that returns the number of page views or the time of any function call.
Instrumentation can be implemented using [hot-shots](https://github.com/brightcove/hot-shots),
an open source DogStatsD client for node.js.
 For additional information about the Node.js integration, please refer to this [guide on submitting metrics](https://docs.datadoghq.com/guides/metrics/)

1. Install hot-shots with npm:
```
npm install hot-shots
```

2. Start instrumenting your code:
{{< highlight javascript>}}
var StatsD = require('hot-shots');
var dogstatsd = new StatsD();

// Increment a counter.
dogstatsd.increment('page.views')
{{< /highlight >}}

### Validation
Go to the Metrics explorer page and see that it just works!
