---
title: Configuration
disable_toc: false
further_reading:
- link: "observability_pipelines/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting"
---

## Overview

Observability Pipelines let you collect, process, and route logs within your own infrastructure. A pipeline consists of three core components:

- [Source][1]: Receives logs from a tool like the Datadog Agent.
- [Processors][2]: Transform, enrich, or filter logs.
- [Destinations][3]: Where logs are sent (for example, Datadog, Amazon S3, Splunk, Google Security Operations, and Microsoft Sentinel).

Build and deploy pipelines to collect, transform, and route your logs using one of these methods:
 - Pipeline UI
 - API
 - Terraform

 See [Set Up Pipelines][4] for more details.

 ## Further reading

 {{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/configuration/sources/
[2]: /observability_pipelines/configuration/processors/
[3]: /observability_pipelines/configuration/destinations/
[4]: /observability_pipelines/configuration/set_up_pipelines/