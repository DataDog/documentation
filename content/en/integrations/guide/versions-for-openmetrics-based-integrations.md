---
title: Latest and Legacy Versioning For OpenMetrics-based Integrations
kind: guide
description: Learn about the difference between the latest (V2) and legacy (V1) versions of OpenMetrics-based integrations.
---

## Overview

Some of the Datadog OpenMetrics-based integrations, including the generic OpenMetrics integration, support two modes of operation: latest and legacy. These two modes come with different defaults and configuration parameters.

Latest
: Datadog recommends using the `latest` version and referencing the `latest` version of the [documentation][1] when setting up an OpenMetrics-based integration from scratch on the latest Agent version.

Legacy
: The `legacy` version is maintained only for backward compatibility reasons—mainly to allow integrations to continue working after an Agent upgrade without requiring a change in configuration. </br> If you have set up an OpenMetrics-based integration in the past, you may be using the old version, in which case you can use the `legacy` configuration example linked from the [documentation][2] as a reference, and Datadog recommends migrating to `latest` when possible.

## Mode-dependent metrics

Integrations with `latest` and `legacy` modes may produce a different subset of metrics, indicated in the documentation and in-app metric descriptions as OpenMetrics V2 (for latest) and OpenMetrics V1 (for legacy). Keep this in mind when you are looking for metric names on the Datadog site or when you are setting up [dashboards][3] and [monitors][4].

## OpenMetrics-based integration modes

While it may very for each OpenMetrics-based integration, you can enable the `latest` mode by either:

* Setting `openmetrics_endpoint` to a target endpoint.
* Setting `use_openmetrics` to true.

For more information, see the appropriate OpenMetrics-based integration documentation.

[1]: /integrations/guide/prometheus-metrics/?tab=latestversion
[2]: /integrations/guide/prometheus-metrics/?tab=beforeopenemetricsv200
[3]: /dashboards/
[4]: /monitors/