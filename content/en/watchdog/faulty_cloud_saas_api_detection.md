---
title: Automatic Faulty Cloud & SaaS API Detection
further_reading:
# - link: "https://www.datadoghq.com/blog/<URL FROM THE BLOGPOST>/"
#   tag: "Blog"
#   text: "Stay ahead of service disruptions with Watchdog Cloud and API Outage Detection"
- link: "watchdog/faulty_deployment_detection/"
  tag: "Documentation"
  text: "Learn about Watchdog Faulty Service Deployment Detections"
---

## Overview

Automatic Faulty Cloud & SaaS API Detection finds third-party providers (payment gateways, cloud providers, etc) having issues within minutes, reducing mean time to detection (MTTD). Watchdog continuously monitors for elevated error rates in requests, using APM telemetry, to external providers—such as AWS, OpenAI, Slack, Stripe, and more—in order to detect service degradation as soon as it occurs. This proactive detection gives you a head start in identifying and mitigating issues before they escalate, significantly reducing time spent on root cause analysis and improving response times.

When Watchdog identifies that an external provider you are using is faulty, it adds which services are impacted by the problem and the extent of the disruption, allowing you to differentiate between external and internal issues quickly. Datadog also provides direct links to the provider’s status page and support channels, making it easy to escalate and inform them of the issues.

{{< img src="watchdog/external_provider_outage.png" alt="Faulty SaaS API vendor detection" >}}

Whenever a faulty deployment is detected, Watchdog adds this as an event in the [Event Explorer][1]. You can set up a monitor to get automatically notified on such events. To do so, navigate to the [New Monitors][2] page and choose **Watchdog**, and select `Third Party` in the alert category.


[1]: /service_management/events/explorer
[2]: https://app.datadoghq.com/monitors/create
