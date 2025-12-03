---
title: Configuration
disable_toc: false
further_reading:
- link: "observability_pipelines/configuration/set_up_pipelines/"
  tag: "Documentation"
  text: "Set up pipelines"
- link: "observability_pipelines/configuration/install_the_worker/"
  tag: "Documentation"
  text: "Install the Worker"
- link: "observability_pipelines/configuration/live_capture/"
  tag: "Documentation"
  text: "Learn more about Live Capture"
- link: "observability_pipelines/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting"
---

## Overview

{{< img src="observability_pipelines/setup/pipeline_ui.png" alt="The pipelines page with a source going to two processors groups and two destinations" style="width:100%;" >}}

Observability Pipelines lets you collect and process logs and metrics ({{< tooltip glossary="preview" >}}) within your own infrastructure, and then route them to different destinations. A pipeline consists of three core components:

- [Source][1]: Receives data from a tool like the Datadog Agent.
- [Processors][2]: Transform, enrich, or filter data.
- [Destinations][3]: Where data is sent (for example, Datadog, Amazon S3, Splunk, Google Security Operations, and Microsoft Sentinel).

Build and deploy pipelines to collect, transform, and route your data using one of these methods:

 - Pipeline UI
 - [API][4]
 - [Terraform][5]

 See [Set Up Pipelines][6] for source, processor, and destination configuration details.

 ## Further reading

 {{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/sources/
[2]: /observability_pipelines/processors/
[3]: /observability_pipelines/destinations/
[4]: /api/latest/observability-pipelines/#create-a-new-pipeline
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[6]: /observability_pipelines/configuration/set_up_pipelines/