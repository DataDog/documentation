---
title: How do I see the number of hosts I'm monitoring?
kind: faq
---

[This gist][1] is an API post that creates a new ScreenBoard in Datadog with three widgets:

* Number of Datadog Agents reporting (timeseries, past week)
* Number of EC2 hosts reporting (timeseries, past week)
* New hosts running the Agent (event stream, past week)

For setup:

1. Put in your API and application keys in lines 1,2 and 79
2. Datadog API/app keys can be found in your account here

**Note**: as currently set up, this ScreenBoard does not include hosts from GCE, Azure, docker, vSphere or other integrations - only the Datadog Agent and EC2. Adjust as needed for your environment.

**Disclaimer**: This should not be used for billing purposes, this is only a convenient option to count active instances and is not necessarily reflective of your invoice.

If you're a customer and need detailed billing information, reach directly to your Customer Success Manager or email success@datadog.com.

[1]: https://gist.githubusercontent.com/MisterRayCo/21e1af9b6cf93bb44a48/raw/c2dcfcf836d0af77daa5c4fb1ec18da175569d7e/agentcountscreenboard.sh
