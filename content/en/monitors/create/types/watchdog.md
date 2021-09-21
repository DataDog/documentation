---
title: Watchdog Monitor
kind: documentation
description: "Algorithmically detects application and infrastructure issues."
aliases:
- /monitors/monitor_types/watchdog
further_reading:
- link: "/monitors/notifications/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/watchdog/"
  tag: "Documentation"
  text: "Watchdog, algorithmically detect application and infrastructure issues"
---

## Overview

[Watchdog][1] is an algorithmic feature for APM and infrastructure metrics. It that automatically detects potential application and infrastructure issues by continuously observing trends and patterns in metrics and looking for atypical behavior.

## Monitor creation

To create a [Watchdog monitor][2] in Datadog, use the main navigation: *Monitors --> New Monitor --> Watchdog*.

### Select story type

In this section, choose between an **APM** or **Infrastructure** story:

{{< tabs >}}
{{% tab "APM" %}}

An APM story is created when Watchdog detects anomalous behavior on your system’s services or their child resources.

### Select sources {#select-sources-1}

Choose your [primary tags][1], [service][2], and [resource][3] from the drop-down menus.

After your selections are made, the graph at the top of the monitor creation page displays the matching Watchdog events over time, along with a list of events.

[1]: /tracing/guide/setting_primary_tags_to_scope/#environment
[2]: /tracing/visualization/service/
[3]: /tracing/visualization/resource/
{{% /tab %}}
{{% tab "Infrastructure" %}}

Infrastructure-wide stories can include issues over the following integrations:

* [System][1]: Host-level memory usage (memory leak), TCP retransmit rate, etc.
* [Redis][2]
* [PostgreSQL][3]
* [NGINX][4]
* [Amazon Web Services][5]: For the [S3][6], [ELB/ALB/NLB][7], [CloudFront][8], and [DynamoDB][9] Amazon services.

After selecting Infrastructure, the graph at the top of the monitor creation page displays Watchdog events over time, along with a list of events.

### Select sources {#select-sources-2}

No selection is necessary. You are notified when Watchdog detects issues across your infrastructure.


[1]: /integrations/system/
[2]: /integrations/redis/
[3]: /integrations/postgres/
[4]: /integrations/nginx/
[5]: /integrations/amazon_web_services/
[6]: /integrations/amazon_s3/
[7]: /integrations/amazon_elb/
[8]: /integrations/amazon_cloudfront/
[9]: /integrations/amazon_dynamodb/
{{% /tab %}}
{{< /tabs >}}

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][3] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /watchdog/
[2]: https://app.datadoghq.com/monitors#create/watchdog
[3]: /monitors/notifications/
