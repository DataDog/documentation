---
"aliases":
- "/integrations/expressjs/"
"categories":
- "languages"
"custom_kind": "integration"
"dependencies": []
"description": "Monitor response times overall and request rates by response code."
"doc_link": "https://docs.datadoghq.com/integrations/express/"
"draft": false
"git_integration_title": "express"
"has_logo": true
"integration_id": "express"
"integration_title": "ExpressJS"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "express"
"public_title": "Datadog-ExpressJS Integration"
"short_description": "Monitor response times overall and request rates by response code."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/expressjs/expressjs_graph.png" alt="ExpressJS graph" popup="true">}}

## Overview

<div class="alert alert-danger">The Express integration is deprecated and has been replaced with Datadog APM. Datadog APM generates the same <a href="https://docs.datadoghq.com/tracing/runtime_metrics/nodejs/">metrics</a> as the Express integration and also has many other features and integrations. Datadog highly recommends upgrading to <a href="https://docs.datadoghq.com/tracing/connect_logs_and_traces/nodejs/">APM</a> as the Express integration will receive no further updates.</div>

Add the Datadog [connect-datadog middleware][1] to your application to:

- Alert on your response times
- Monitor your response code

## Setup

The Express integration requires the Datadog Agent DogStatsD server in order to forward your collected metrics to Datadog.

After [installing the Agent][2] on your host, see the [DogStatsD Setup documentation][3] to enable it.

### Configuration

1. Install the middleware

    ```shell
    npm install connect-datadog
    ```

2. Modify your code to add the Datadog middleware:

    ```js
    var dd_options = {
      'response_code':true,
      'tags': ['app:my_app']
    }

    var connect_datadog = require('connect-datadog')(dd_options);

    // Add your other middleware
    app.use(...);

    // Add the datadog-middleware before your router
    app.use(connect_datadog);
    app.use(router);
    ```

## Data Collected

### Metrics
{{< get-metrics-from-git "express" >}}


### Events

The Express integration does not include any events.

### Service Checks

The Express integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][5].

[1]: https://www.npmjs.com/package/connect-datadog
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent#setup
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/express/express_metadata.csv
[5]: https://docs.datadoghq.com/help/

