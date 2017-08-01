---
title: "Datadog-ExpressJS Integration"
integration_title: "ExpressJS"
kind: integration
doclevel: basic
git_integration_title: express
---

{{< img src="integrations/expressjs/expressjs_graph.png" alt="ExpressJS graph" >}}

## Overview

Add the connect-datadog middleware to your application to:

* Alert on your response times
* Monitor your response code

## Configuration

The Express integration requires the Datadog Agent.

1. Install the middleware
```
npm install connect-datadog 
```

2. Modify your code to add the datadog middleware:
{{< highlight js >}}
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
{{< /highlight >}}

## Metrics

{{< get-metrics-from-git >}}
