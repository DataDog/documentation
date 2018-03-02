---
aliases:
- /integrations/expressjs/
categories:
- web
ddtype: crawler
description: Monitor response times overall and request rates by response code.
doc_link: https://docs.datadoghq.com/integrations/expressjs/
git_integration_title: express
has_logo: true
integration_title: ExpressJS
is_public: true
kind: integration
manifest_version: '1.0'
name: express
public_title: Datadog-ExpressJS Integration
short_description: Monitor response times overall and request rates by response code.
version: '1.0'
---

{{< img src="integrations/expressjs/expressjs_graph.png" alt="ExpressJS graph" responsive="true" popup="true">}}

## Overview

Add the connect-datadog middleware to your application to:

* Alert on your response times
* Monitor your response code

## Setup
### Configuration

The Express integration requires the Datadog Agent.

1. Install the middleware
```
npm install connect-datadog 
```

2. Modify your code to add the datadog middleware:

```js
var dd_options = {
  'response_code':true,
  'tags': ['app:my_app']
    }

var connect_datadog = require('connect-datadog')(dd_options);

// Add your other middlewares
app.use(...);

// Add the datadog-middleware before your router
app.use(connect_datadog);
app.use(router);
```

## Data Collected
### Metrics
{{< get-metrics-from-git "express" >}}


### Events
The Express integration does not include any event at this time.

### Service Checks
The Express integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

