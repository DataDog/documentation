---
title: Watchdog
kind: Documentation
description: Automatically detect potential application and infrastructure issues
aliases:
  - /tracing/watchdog
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Watchdog"
    tag: "Release Notes"
    text: "Check out the latest Datadog Watchdog releases! (App login required)."
  - link: "/logs/"
    tag: "Documentation"
    text: "Collect your logs"
  - link: "/infrastructure/process/"
    tag: "Documentation"
    text: "Collect your processes"
  - link: "/tracing/"
    tag: "Documentation"
    text: "Collect your traces"
  - link: "https://www.datadoghq.com/blog/datadog-watchdog-automated-root-cause-analysis/"
    tag: "Blog"
    text: "Automated root cause analysis with Watchdog RCA"
  - link: "https://www.datadoghq.com/blog/watchdog-impact-analysis/"
    tag: "Blog"
    text: "Understand user impact scope with Watchdog Impact Analysis"
---

{{< img src="watchdog/watchdog.png" alt="The Watchdog Alerts page with two ongoing critical alerts for error rates" >}}

## Overview

Watchdog is an algorithmic feature for APM performance and infrastructure metrics that automatically detects potential application and infrastructure issues. It leverages the same seasonal algorithms that power anomalies and dashboards. Watchdog observes trends and patterns in:

* APM metrics:
  * Hits (request rate)
  * Error rate
  * Latency

* Infrastructure metrics from integrations:
  * [System][1], for the Host-level memory usage (memory leaks) and TCP retransmit rate.
  * [Redis][2]
  * [PostgreSQL][3]
  * [NGINX][4]
  * [Amazon Web Services][5], for the [S3][6], [ELB/ALB/NLB][7], [CloudFront][8], and [DynamoDB][9] Amazon services.
  * [Alerting][10]

Watchdog looks for irregularities in metrics, like a sudden spike in the hit rate. For each irregularity, the [Watchdog page][11] displays a Watchdog alert. Each alert includes a graph of the detected metric irregularity and gives more information about the relevant time frame and endpoint or endpoints. Watchdog automatically monitors data sent by the Datadog Agent or by integrations. 

## Watchdog in the services list

When an irregularity in a metric is detected, the yellow Watchdog binoculars icon appears next to the affected service in the [APM services list][12]. The number next to the binoculars indicates the number of issues Watchdog has noticed within that service.

{{< img src="watchdog/service_list.png" alt="Watchdog service list" style="width:75%;" >}}

If Watchdog has discovered something out of the ordinary in a specific service, viewing the corresponding [Service page][12] reveals a dedicated Watchdog section in the middle of the page, between the application performance graphs and the latency distribution section. The Watchdog section displays any relevant Watchdog alerts.

{{< img src="watchdog/watchdog_story_bis.png" alt="Watchdog story bis" style="width:75%;">}}

## Troubleshooting

Need help? Contact [Datadog support][13].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/system/
[2]: /integrations/redis/
[3]: /integrations/postgres/
[4]: /integrations/nginx/
[5]: /integrations/amazon_web_services/
[6]: /integrations/amazon_s3/
[7]: /integrations/amazon_elb/
[8]: /integrations/amazon_cloudfront/
[9]: /integrations/amazon_dynamodb/
[10]: /monitors/
[11]: https://app.datadoghq.com/watchdog
[12]: /tracing/visualization/services_list/
[13]: /help/
