---
title: Using APM Basic Metrics in Monitors, SLOs, and Dashboards
description: Learn how to create monitors, SLOs, and dashboards using your APM Basic metrics.
aliases:
- /universal_service_monitoring/guide/using_usm_metrics/
further_reading:
- link: "/tracing/apm_basic"
  tag: "Documentation"
  text: "Learn about APM Basic"
- link: "/tracing/metrics"
  tag: "Documentation"
  text: "Learn about APM Metrics"
---

<!-- TODO: This page should be migrated from
/universal_service_monitoring/guide/using_usm_metrics.md using git mv.

Migration steps:
1. git mv the file
2. Find-replace "Universal Service Monitoring" / "USM" with "APM Basic" in body text
3. Update internal links from /universal_service_monitoring to /tracing/apm_basic
4. Keep all metric names as-is (universal.http.*)
5. Update screenshots if the UI changes with the rebrand

The existing content is solid and mostly just needs the terminology swap.
-->

## Overview

[APM Basic][1] discovers services using popular container tags (such as `app`, `short_image`, and `kube_deployment`) and generates entries in the [Software Catalog][2] for those services.

You can access request, error, and duration metrics in Datadog for both inbound and outbound traffic on all services discovered with APM Basic. These service health metrics are useful for creating alerts, [tracking deployments][3], and getting started with [service level objectives (SLOs)][4].

This guide describes how to search for APM Basic metrics such as `universal.http.*` and use them in your monitors, SLOs, and dashboards.

## APM Basic metrics reference

<!-- TODO: Migrate the full metrics table and syntax comparison from existing guide -->

## Usage

<!-- TODO: Migrate the full usage section (monitors, SLOs, dashboards) from existing guide -->

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/apm_basic
[2]: /tracing/software_catalog
[3]: /tracing/services/deployment_tracking/
[4]: /service_level_objectives
