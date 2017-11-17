---
aliases:
- /integrations/nodejs/
description: Send custom metrics from your Node.js services via DogStatsD or our API.
git_integration_title: node
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-NodeJS Integration
---

{{< img src="integrations/nodejs/nodejs_graph.png" alt="Node JS graph" responsive="true" >}}

## Overview

Connect your Node.js applications to Datadog to:

* Visualize their performance
* Correlate their performance with the rest of your applications
* Monitor any relevant metric

## Setup
### Configuration

The Node.js integration enables you to monitor any custom metric by instrumenting a few lines of code. 
For instance, you can have a metric that returns the number of page views or the time of any function call. 
For additional information about the Node.js integration, please refer to this [guide on submitting metrics](https://docs.datadoghq.com/guides/metrics/)
For advanced usage, please refer to the [documentation in the repository](https://github.com/joybro/node-dogstatsd)

1. Install the library with npm:
```
npm install node-dogstatsd
```

2. Start instrumenting your code:

```js
var StatsD = require('node-dogstatsd').StatsD;
var dogstatsd = new StatsD();

// Increment a counter.
dogstatsd.increment('page.views')
```

### Validation
Go to the Metrics explorer page and see that it just works! 

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The node integration does not include any event at this time.

### Service Checks
The node integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
