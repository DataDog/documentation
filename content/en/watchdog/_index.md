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

For any new source of metrics, logs, or other data, Watchdog requires two weeks of data to establish a baseline of expected behavior. Anomalies detected by Watchdog based on less than two weeks of data may contain inaccuracies.

## Watchdog in the services list

When Watchdog detects an irregularity in an APM metric, the pink Watchdog binoculars icon appears next to the impacted service in the [APM services list][12]. The number next to the binoculars indicates the number of issues Watchdog has detected within that service.

{{< img src="watchdog/service_list.png" alt="Screenshot of the APM services list page, showing 5 services. A pink binoculars icon follows the name of the web-store service." style="width:75%;" >}}

You can see greater detail about a metric anomaly by navigating to the [Services page][13]. On the top of the page is the Watchdog Insights box. Watchdog Insights helps you discover tag values that are associated with anomalous behaviors, such as higher error rate or latency. 

You can also find the Watchdog icon on metric graphs.

{{< img src="watchdog/latency_graph.png" alt="A graph showing service latency, in seconds, on the y-axis and the time of day on the x-axis. The entire graph is highlighted in pink, and the words May 2: 13:31 Ongoing appear at the top" style="width:75%;" >}}

Click on the binoculars icon to see a [Watchdog alert][14] card with more details.

## Troubleshooting

Need help? Contact [Datadog support][15].

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
[12]: /tracing/services/services_list/
[13]: /tracing/services/service_page/#overview
[14]: /watchdog/alerts#alert-details
[15]: /help/
