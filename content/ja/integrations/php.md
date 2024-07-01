---
"categories":
- "languages"
- "log collection"
- "tracing"
"custom_kind": "integration"
"dependencies": []
"description": "Collect metrics, traces, logs, and profile data from your PHP applications."
"doc_link": "https://docs.datadoghq.com/integrations/php/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/monitor-php-performance/"
  "tag": "Blog"
  "text": "PHP monitoring with Datadog APM and distributed tracing."
- "link": "https://www.datadoghq.com/blog/php-logging-guide/"
  "tag": "Blog"
  "text": "How to collect, customize, and analyze PHP logs."
"git_integration_title": "php"
"has_logo": true
"integration_id": "php"
"integration_title": "PHP"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "php"
"public_title": "Datadog-PHP Integration"
"short_description": "Collect metrics, traces, logs, and profile data from your PHP applications."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

The Datadog-PHP integration allows you to collect and monitor your PHP application logs, traces, and custom metrics.

## Setup

### Metric collection

See the dedicated documentation for [collecting PHP custom metrics with DogStatsD][1].

### Trace collection

See the dedicated documentation for [instrumenting your PHP application][2] to send its traces to Datadog.

### Log collection

*Available for Agent v6.0+*

See the dedicated documentation on how to [setup PHP log collection][3] to forward your logs to Datadog.

### Profile collection

See the dedicated documentation for [enabling the PHP profiler][4].

## Troubleshooting

Need help? Contact [Datadog support][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/developers/dogstatsd/?tab=php
[2]: https://docs.datadoghq.com/tracing/setup/php/
[3]: https://docs.datadoghq.com/logs/log_collection/php/
[4]: https://docs.datadoghq.com/profiler/enabling/php/
[5]: https://docs.datadoghq.com/help/

