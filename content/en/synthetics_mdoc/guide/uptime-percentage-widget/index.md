---
title: Monitor Website Uptime With SLOs
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides >
  Monitor Website Uptime With SLOs
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/guide/uptime-percentage-widget/index.html
---

# Monitor Website Uptime With SLOs

## Overview{% #overview %}

Maintaining service level agreements with external or internal customers often requires measuring uptime percentage.

This guide shows you how to achieve that using Datadog [Synthetic Monitoring](https://docs.datadoghq.com/synthetics/) and the [SLO widget](https://docs.datadoghq.com/dashboards/widgets/slo/) with an example website, `http://example.com/`.

## Create a Synthetic Monitoring test{% #create-a-synthetic-monitoring-test %}

To create a [Synthetic API test](https://app.datadoghq.com/synthetics/create) with `http://example.com/`, see [Create a single API test](https://docs.datadoghq.com/getting_started/synthetics/api_test#define-request).

When you click **Test URL**, assertions about your website's health populate. Adjust the assertions to match your SLI.

## Configure a SLO widget{% #configure-a-slo-widget %}

### Create your SLO{% #create-your-slo %}

1. [Create a new SLO](https://app.datadoghq.com/slo/new) to track your website's uptime based on your Synthetic test results.

1. Select **Monitor Based** and enter your Synthetic test name.

   {% image
      source="https://datadog-docs.imgix.net/images/synthetics/guide/uptime_slo/slo_config.fa44b4c755cee60b5105368fe70e25c6.png?auto=format"
      alt="SLO configuration" /%}

1. Define the target you want to achieve.

   {% image
      source="https://datadog-docs.imgix.net/images/synthetics/guide/uptime_slo/slo_target.1efd081318b9cd9063b4be41685e89d5.png?auto=format"
      alt="SLO target" /%}

1. Enter a name, message, and tags to provide additional details for your SLO.

   {% image
      source="https://datadog-docs.imgix.net/images/synthetics/guide/uptime_slo/slo_notif.a3845dc545281a31dcba4f0d7cd0d071.png?auto=format"
      alt="SLO notification" /%}

1. Click **Save**.

### Import your SLO in your Dashboard{% #import-your-slo-in-your-dashboard %}

1. [Create a new Dashboard](https://app.datadoghq.com/dashboard/lists) to host your SLO widget.

1. Drag and drop the SLO widget on your board.

1. Select the SLO that you defined above.

   {% image
      source="https://datadog-docs.imgix.net/images/synthetics/guide/uptime_slo/slo_selection.a9e9cc0487f116a094afbddd6c91f6d6.png?auto=format"
      alt="SLO widget selection" /%}

1. Customize your SLO widget to match your needs.

   {% image
      source="https://datadog-docs.imgix.net/images/synthetics/guide/uptime_slo/slo_widget_configs.54ed2ba5f867259b359365039016dab4.png?auto=format"
      alt="SLO widget config" /%}

1. Enter a descriptive title for your widget and click **Done**.

   {% image
      source="https://datadog-docs.imgix.net/images/synthetics/guide/uptime_slo/final_dashboard.e37e738e72aad8c8ce5001429817c719.png?auto=format"
      alt="Final Dashboard" /%}

## Further Reading{% #further-reading %}

- [Monitor Uptime Widget](https://docs.datadoghq.com/monitors/monitor_uptime_widget/)
- [Getting Started with Synthetic Monitoring](https://docs.datadoghq.com/getting_started/synthetics/)
- [Improve SLO accuracy and performance with Datadog Synthetic Monitoring](https://www.datadoghq.com/blog/slo-synthetic-monitoring/)
