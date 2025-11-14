---
title: Integrate your Synthetic test monitor with Statuspage
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Notifications >
  Integrate your Synthetic test monitor with Statuspage
sourceUrl: https://docs.datadoghq.com/synthetics/notifications/statuspage/index.html
---

# Integrate your Synthetic test monitor with Statuspage

## Overview{% #overview %}

If you use [Atlassian Statuspage](https://support.atlassian.com/statuspage/) for visibility into your applications' and services' uptime, you can update the status of your systems with Synthetic test monitor notifications.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/synthetics_test_monitors/statuspage_monitor_setup.37b1d2e59d3d54f9e8d333ba1a4af2bd.png?auto=format"
   alt="Add a Statuspage email address and status to the monitor name in your Synthetic test" /%}

1. See the [Statuspage documentation](https://support.atlassian.com/statuspage/docs/get-started-with-email-automation/) to generate a component-specific email address.
1. Add the generated email address into your test's notification message. For example, `@custom-statuspage-email@notifications.statuspage.io`.
1. Customize the monitor name to return `UP` or `DOWN` depending on the test state. For example, `{{#is_alert}}DOWN{{/is_alert}}{{#is_recovery}}UP{{/is_recovery}}`.
1. Fill out the monitor notification section and add a summary in the monitor name. For example, `Shopist Checkout Functionality`.
1. After you have configured your monitor, click **Save & Exit**.

For more information, see [Integrating Monitors with Statuspage](https://docs.datadoghq.com/monitors/guide/integrate-monitors-with-statuspage/).

## Further Reading{% #further-reading %}

- [Learn how to manage monitors](https://docs.datadoghq.com/monitors/manage/)
- [Learn how to integrate monitors with Statuspage](https://docs.datadoghq.com/monitors/guide/integrate-monitors-with-statuspage/)
