---
title: Automatic Faulty Cloud & SaaS API Detection
description: "Detect third-party provider issues within minutes using Watchdog's monitoring of external APIs like AWS, Stripe, OpenAI, and other cloud services."
further_reading:
- link: "https://www.datadoghq.com/blog/watchdog-outage-detection/"
  tag: "Blog"
  text: "Stay ahead of service disruptions with Watchdog Cloud and API Outage Detection"
- link: "watchdog/faulty_deployment_detection/"
  tag: "Documentation"
  text: "Learn about Watchdog Faulty Service Deployment Detections"
site_support_id: watchdog_faulty_service_deployment
---

## Overview

Automatic Faulty Cloud & SaaS API Detection detects third-party providers (payment gateways, cloud providers, and so on) having issues within minutes, reducing mean time to detection (MTTD). Watchdog uses APM telemetry to continuously monitor for elevated error rates in requests to external providers—such as AWS, OpenAI, Slack, Stripe, and more—to detect service degradation as soon as it occurs. This proactive detection gives you a head start in identifying and mitigating issues before they escalate, significantly reducing time spent on root cause analysis and improving response times.

When Watchdog identifies that an external provider you are using is faulty, it flags the services impacted by the problem and the extent of the disruption. This allows you to differentiate between external and internal issues. Datadog also provides direct links to the provider's status page and support channels, so you can reach out to them as needed.

{{< img src="watchdog/external_provider_outage.png" alt="Faulty SaaS API vendor detection" >}}

Whenever Watchdog detects a provider degradation, it creates an event in the [Event Explorer][1]. You can set up a monitor to get automatically notified on such events:

1. Go to the [New Monitor][2] page.
2. Choose **Watchdog**.
3. Select `Third Party` in the alert category.

## Supported providers
Watchdog monitors the status of the external providers' APIs listed in the [External Provider Status documentation][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/explorer
[2]: https://app.datadoghq.com/monitors/create
[3]: /internal_developer_portal/external_provider_status
