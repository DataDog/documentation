---
title: Datadog Application Monitoring for VMware Tanzu
kind: guide
description: "Datadog Application Monitoring for VMware Tanzu"
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-tanzu-application-service/"
  tag: Blog
  text: Monitor applications running on VMware Tanzu Application Service
- link: /integrations/guide/cluster-monitoring-vmware-tanzu/
  tag: documentation
  text: Datadog Cluster Monitoring for VMware Tanzu
- link: /tracing/
  tag: documentation
  text: Monitor your Application Performance
- link: /developers/dogstatsd/
  tag: documentation
  text: Forward Custom Metrics to Datadog using DogstatsD
---


## Overview

Datadog Application Monitoring for VMWare Tanzu enables VMware Tanzu users to monitor the health and performance of their applications.
It consists of the following three components:

* DogStatsD
* Trace Agent
* Container Agent

You can use DogStatsD to get your custom application metrics into Datadog. DogStatsD is a metrics aggregation service that implements the StatsD protocol and adds a few Datadog-specific extensions. For more information, see the [DogStatsD][5] documentation. Additionally, Datadog provides a list of DogStatsD libraries you can use to find [libraries][9] compatible with your application.

The Trace Agent is a service that collects application traces from various sources and forwards them to Datadog APM. For more information, see the [tracing][7] documentation.

The Container Agent is a smaller, lightweight version of the [Datadog Agent][6] that can forward metrics and logs to Datadog. See the [logs][8] documentation for more information. When enabled, the default behavior is for all logs from `stdout` and `stderr` to be collected and forwarded by TCP to the Container Agent.

## Key features
Datadog Application Monitoring for VMware Tanzu includes the following key features:

* Application performance monitoring
* Metric, log, and trace forwarding to Datadog

## Prerequisites
Datadog Application Monitoring for VMware Tanzu has the following requirements:

* You must have or create a [Datadog account][4] before configuring the tile.
* You must generate a [Datadog API key][3].

## インストール

1. Download the product file for **Datadog Application Monitoring for VMware Tanzu** from the [Tanzu Network][10].
2. Go to the Tanzu Ops Manager Installation Dashboard and click **Import a Product** to upload the product file.
3. Select the product file downloaded in step **1**. This adds the tile to your staging area.
4. Click the newly added **Datadog Application Monitoring for VMware Tanzu** tile.
5. Click **Save**.
6. Return to the Tanzu Ops Manager Installation Dashboard, and click **Apply changes** to install the Datadog Application Monitoring for the VMware Tanzu tile.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /help
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/signup
[5]: /developers/dogstatsd/?tab=hostagent
[6]: /agent/
[7]: /tracing/
[8]: /logs/
[9]: /libraries/
[10]: https://network.pivotal.io/products/datadog-application-monitoring/
