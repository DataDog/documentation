---
aliases:
- /ja/observability_pipelines/reference/sinks/
legacy: true
title: Sinks
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

A sink is a destination for events. Each sink's design and transmission method is determined by the downstream service with which it interacts. For example, the `socket` sink streams individual events, while the `aws_s3` sink buffers and flushes data.