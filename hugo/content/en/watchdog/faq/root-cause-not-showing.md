---
title: Root Cause Not Showing

further_reading:
- link: "/watchdog/#root-cause-analysis-for-apm-beta"
  tag: "Documentation"
  text: "Watchdog Root Cause Analysis for APM"
---

Watchdog looks for specific types of root causes. Watchdog Root Cause Analysis (RCA) detects the following root causes:

- Version changes, as captured by the `version` tag on your [APM services][1]
- Traffic increases, as captured by hit rate metrics on your APM-instrumented services
- AWS instance failures, as captured by [Amazon EC2 integration metrics][2]
- Running out of disk space, as captured by [system metrics][3] from the Datadog agent

If you don't see a root cause, it's likely that the specific root cause is not one of the types described above or there isn't instrumentation configured to capture it.

Watchdog Root Cause Analysis works best when:

- You use distributed tracing, so that Watchdog knows the dependency structure between your services
- You use [unified service tagging][4], so that Watchdog knows when you deploy new code and can link infrastructure and APM metrics

Do you think Watchdog should have found something that it missed? Or, do you have another type of root cause that you would like to be added? Datadog is always looking to make Watchdog smarter, so [open a support request][5] to let us know.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: https://docs.datadoghq.com/integrations/amazon_ec2/#metrics
[3]: https://docs.datadoghq.com/integrations/system/#metrics
[4]: https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/?tab=kubernetes#overview
[5]: https://help.datadoghq.com/hc/en-us/requests/new
