---
title: How do I see the number of hosts I'm monitoring?
kind: faq
aliases:
    - /graphing/faq/how-do-i-see-the-number-of-hosts-i-m-monitoring
---

This [screenboard script][1] is an API post that creates a new Screenboard in Datadog with three widgets:

* Number of Datadog Agents reporting (timeseries, past week)
* Number of EC2 hosts reporting (timeseries, past week)
* New hosts running the Agent (event stream, past week)

For setup:

1. Put in your API and application keys in lines 1, 2, and 79
2. Datadog API and application keys can be found [in your account][2]

**Note**: This Screenboard does not include hosts from GCE, Azure, Docker, vSphere, or other integrations—only the Datadog Agent and EC2. Adjust as needed for your environment.

**Disclaimer**: This should not be used for billing purposes. This is only a convenient option to count active instances and is not necessarily reflective of your invoice.

If you're a customer and need detailed billing information, reach directly to your Customer Success Manager or email `success@datadog.com`.

[1]: /resources/sh/agentcountscreenboard.sh
[2]: https://app.datadoghq.com/account/settings#api
