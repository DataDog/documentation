---
title: Compatibility
---

## Features

| Feature     | Tracer version    | Collector version | Setups |
| ---  | -----------| -- | -----------| 
| Span links | Go 1.61.0 | ? | | |

## Known issues

[OTel Collector Contrib version 0.95.0][1] disables Trace Metrics computation in the Datadog Exporter by default. See the [Migration guide][2] to upgrade and start using the Datadog connector.

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.95.0
[2]: content/en/opentelemetry/guide/migration.md
