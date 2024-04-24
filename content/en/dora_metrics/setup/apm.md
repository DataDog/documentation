---
title: Configuring APM Deployment Tracking for DORA Metrics
kind: documentation
description: Learn how to configure APM Deployment Tracking as a data source for DORA Metrics deployments.
aliases:
- /continuous_integration/dora_metrics/setup/apm
is_beta: true
further_reading:
- link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
  tag: "Release Notes"
  text: "Check out the latest Software Delivery releases! (App login required)"
- link: "/continuous_integration/dora_metrics/setup/incidents"
  tag: "Documentation"
  text: "Learn about sending incident events"
- link: "/tracing/service_catalog"
  tag: "Documentation"
  text: "Learn about the Service Catalog"
- link: "https://github.com/DataDog/datadog-ci"
  tag: "Source Code"
  text: "Learn about the datadog-ci CLI tool"
- link: "/continuous_delivery/deployments"
  tag: "Documentation"
  text: "Learn about Deployment Visibility"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">DORA Metrics is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="https://forms.gle/Eqq6uXfGjYxmqpjDA" header="false" >}}
The DORA Metrics private beta is closed. Fill out the form below to be added to the waitlist.
{{< /callout >}}

## Overview
APM Deployment Tracking can be configured as a data source for deployments in DORA Metrics.

In order for service deployments tracked in APM to contribute to DORA Metrics, the following requirements must be met:
- Your service must have service metadata defined in the Service Catalog.
- Your service must have version tagging applied

## Change lead time
In order for your service deployments tracked in APM to contribute to Change Lead Time, the following requirement must be met:
- Your service has the git metadata attached 
