---
aliases:
- /integrations/nodejs/
categories:
- languages
ddtype: crawler
description: Send custom metrics from your Node.js services via DogStatsD or our API.
doc_link: https://docs.datadoghq.com/integrations/nodejs/
git_integration_title: node
has_logo: true
integration_title: NodeJS
is_public: true
kind: integration
manifest_version: '1.0'
name: node
public_title: Datadog-NodeJS Integration
short_description: Send custom metrics from your Node.js services via DogStatsD or
  our API.
version: '1.0'
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
For additional information about the Node.js integration, please refer to this [guide on submitting metrics](https://docs.datadoghq.com/developers/metrics/)

1. Install hot-shots with npm:
```
npm install hot-shots
```

2. Start instrumenting your code:
```js
var StatsD = require('hot-shots');
var dogstatsd = new StatsD();

// Increment a counter.
dogstatsd.increment('page.views')
```

### Validation
Go to the Metrics explorer page and see that it just works!

## Data Collected
### Metrics

The node integration does not include any metric at this time.

### Events
The node integration does not include any event at this time.

### Service Checks
The node integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

