---
aliases:
- /ja/integrations/nodejs/
categories:
- languages
- log collection
- tracing
custom_kind: インテグレーション
dependencies: []
description: Node.js サービスから DogStatsD または Datadog API 経由でカスタムメトリクスを送信。
doc_link: https://docs.datadoghq.com/integrations/nodejs/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/node-logging-best-practices/
  tag: ブログ
  text: Node.js ログを収集、カスタマイズ、一元化する方法
- link: https://www.datadoghq.com/blog/node-monitoring-apm/
  tag: ブログ
  text: Datadog APM と分散型トレーシングを使用した Node.js の監視。
git_integration_title: node
has_logo: true
integration_id: node
integration_title: NodeJS
integration_version: ''
is_public: true
manifest_version: '1.0'
name: node
public_title: Datadog-NodeJS Integration
short_description: Send custom metrics from your Node.js services via DogStatsD or
  our API.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

The Node.js integration allows you to collect and monitor your Node.js application logs, traces, and custom metrics.

## セットアップ

### Metric collection

The Node.js integration enables you to monitor a custom metric by instrumenting a few lines of code. For instance, you can have a metric that returns the number of page views or the time of any function call.

For additional information about the Node.js integration, see the [guide on submitting metrics][1].

```js
// Require dd-trace
const tracer = require('dd-trace').init();

// Increment a counter
tracer.dogstatsd.increment('page.views');
```

Note that for custom metrics to work you need to enable DogStatsD on the Agent. Collection is enabled by default, but the Agent only listens for metrics from localhost. To allow external metrics, you need to either set an environment variable or update the config file:

```sh
DD_USE_DOGSTATSD=true # default
DD_DOGSTATSD_PORT=8125 # default
DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true # if expecting external metrics
```

```yaml
use_dogstatsd: true # default
dogstatsd_port: 8125 # default
dogstatsd_non_local_traffic: true # if expecting external metrics
```

You'll also need to configure your application to use the agent's DogStatsD collector:

```sh
DD_DOGSTATSD_HOSTNAME=localhost DD_DOGSTATSD_PORT=8125 node app.js
```

### Trace collection

See the dedicated documentation for [instrumenting your Node.js application][2] for sending traces to Datadog.

### Log collection

_Available for Agent v6.0+_

See the dedicated documentation to set up [Node.js log collection][3] for forwarding your logs to Datadog.

### Profile collection

See the dedicated documentation for [enabling the Node.js profiler][4].

## トラブルシューティング

Need help? Contact [Datadog support][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=nodejs
[2]: https://docs.datadoghq.com/ja/tracing/setup/nodejs/
[3]: https://docs.datadoghq.com/ja/logs/log_collection/nodejs/
[4]: https://docs.datadoghq.com/ja/profiler/enabling/nodejs/
[5]: https://docs.datadoghq.com/ja/help/