---
title: Configuring APM Deployment Tracking for DORA Metrics
kind: documentation
description: Learn how to configure APM Deployment Tracking as a data source for DORA Metrics deployments.
aliases:
- /continuous_integration/dora_metrics/setup/apm
is_beta: true
further_reading:
- link: "/dora_metrics/deployments"
  tag: "Documentation"
  text: "See other deployment data source options"
- link: "/dora_metrics/failures/"
  tag: "Documentation"
  text: "Learn about setting up failure data in DORA Metrics"
- link: "/tracing/service_catalog"
  tag: "Documentation"
  text: "Learn about the Service Catalog"
- link: "https://github.com/DataDog/datadog-ci"
  tag: "Source Code"
  text: "Learn about the datadog-ci CLI tool"
- link: "/continuous_delivery/deployments"
  tag: "Documentation"
  text: "Learn about Deployment Visibility"
- link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
  tag: "Release Notes"
  text: "Check out the latest Software Delivery releases! (App login required)"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">DORA Metrics is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-warning">DORA Metrics is in public beta.</div>

## Overview

APM [Deployment Tracking][2] can be configured as a data source for deployments in DORA Metrics.

## Setup

To ensure your service deployments tracked by APM contribute to DORA Metrics, the following requirements must be met:

- Your service has [metadata][1] defined in the Service Catalog.
- Your service has [unified service tagging][3] enabled. Deployments are identified using the `version` tag.

### Change lead time

For service deployments tracked by APM to contribute to change lead time, ensure the following:

- Your application telemetry is tagged with Git information. You can enable this [in APM][4] or see the [Source Code Integration documentation][5].
- Your repository metadata is synchronized to Datadog through the [GitHub integration][6] or by the `datadog-ci git-metadata upload` command.

For deployments identified through Deployment Tracking, change lead time is computed from the time of first commit creation to when that commit is first seen in a new version. The `dora.deploy_time` metric is not available. 

For more information about change lead time metrics, see [Data Collected][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_catalog/add_metadata
[2]: /tracing/services/deployment_tracking
[3]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes
[4]: https://app.datadoghq.com/source-code/setup/apm
[5]: /integrations/guide/source-code-integration/?tab=go#tag-your-telemetry-with-git-information
[6]: /integrations/github/
[7]: /dora_metrics/data_collected/#change-lead-time-metrics