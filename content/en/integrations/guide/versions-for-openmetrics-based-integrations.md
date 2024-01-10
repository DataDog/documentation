---
title: Latest and Legacy Versioning For OpenMetrics-based Integrations
kind: guide
description: Learn about the difference between the latest (V2) and legacy (V1) versions of OpenMetrics-based integrations.
---

## Overview

Some of the Datadog OpenMetrics-based integrations, including the generic OpenMetrics integration, support two modes of operation: latest and legacy. These two modes come with different defaults and configuration parameters.

Latest
: Datadog recommends using the `latest` version and referencing the `latest` version of the documentation when setting up an OpenMetrics-based integration from scratch on the latest Agent version.

Legacy
: The `legacy` version is maintained only for backward compatibility reasons—mainly to allow integrations to continue working after an Agent upgrade without requiring a change in configuration. </br></br> If you have set up an OpenMetrics-based integration in the past, you may be using the old version, in which case you can use the `legacy` configuration example linked from the documentation as a reference. Datadog recommends migrating to the `latest` version when possible.

## Mode-dependent metrics

Integrations with `latest` and `legacy` modes may produce different subsets of metrics, indicated in the documentation and in-app metric descriptions as OpenMetrics V2 (`latest`) and OpenMetrics V1 (`legacy`). 

In `latest` mode, metrics are submitted more accurately by default and behave closer to Prometheus metric types. For example, Prometheus metrics ending in  `_count` and `_sum` are submitted as `monotonic_count` by default.

When you look for metric names on the Datadog site or set up [dashboards][3] and [monitors][4], make sure to use metrics appropriate for your version of the integration.

## OpenMetrics-based integration modes

While it may vary for each OpenMetrics-based integration, you can enable the `latest` mode by either:

* Setting `openmetrics_endpoint` to a target endpoint.
* Setting `use_openmetrics` to true.

## History of latest and legacy versions

<div class="alert alert-info">Datadog avoids introducing breaking changes to integrations as much as possible, so customers can update the Datadog Agent without needing to make large configuration changes. This commitment to backwards compatibility makes it difficult to address existing design issues in the configuration and default behavior.</div>

Since the OpenMetrics format is commonly used to export metrics, many integrations are based on it. These integrations share a set of configuration options and default behavior. Datadog is committed to providing an improved experience in the `latest` version, and maintaining the original experience in the `legacy` version.  

For more information, see the appropriate OpenMetrics-based integration documentation.

[3]: /dashboards/
[4]: /monitors/