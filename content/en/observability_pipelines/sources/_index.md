---
title: Sources
disable_toc: false
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview

Use Observability Pipelines' sources to receive logs from your different log sources.

Select and set up your source when you build a pipeline in the UI. This is step 3 in the pipeline setup process:

1. Navigate to [Observability Pipelines][1].
1. Select a template.
1. Select and set up your source.
1. Select and set up your destinations.
1. Set up your processors.
1. Install the Observability Pipelines Worker.

Sources have different prerequisites and settings. Some sources also need to be configured to send logs to the Observability Pipelines Worker.

{{< whatsnext desc="Select your source for more information:" >}}
    {{< nextlink href="observability_pipelines/sources/datadog_agent/" >}}Datadog Agent{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/sources/fluent/" >}}Fluentd and Fluent Bit{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/sources/http_client/" >}}HTTP/S Client{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/sources/splunk_hec/" >}}Splunk HTTP Event Collector (HEC){{< /nextlink >}}
    {{< nextlink href="observability_pipelines/sources/splunk_tcp/" >}}Splunk Heavy and Universal Forwarders (TCP){{< /nextlink >}}
    {{< nextlink href="observability_pipelines/sources/sumo_logic/" >}}Sumo Logic{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/sources/syslog/" >}}rsyslog or syslog-ng{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/observability-pipelines