---
title: RUM Browser Monitoring
kind: documentation
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Learn about the RUM Explorer
- link: /logs/log_collection/javascript/
  tag: Documentation
  text: Learn about the Datadog Browser SDK for Logs
---

## Overview

Datadog Real User Monitoring (RUM) provides deep insight into your application's frontend performance. Monitor real user data to optimize your web experience and provide exceptional user experiences. Correlate synthetic tests, backend metrics, traces, and logs in a single place to identify and troubleshoot performance issues across the stack.

Datadog helps you understand the current level of user experience, identify areas for improvement, and measure the success of each change and/or deployment. Use this information to identify and resolve unexpected front-end issues before users are impacted to deliver the best experience.

With the Datadog RUM Browser SDK, you can also:

- Monitor your application's pageviews and performance to investigate performance issues
- Gain complete, end-to-end visibilty into resources and requests (such as images, CSS files, JavaScript assets, and font files)
- Automatically collect and monitor any interesting events with all relevant context, and manually collect errors that aren't automatically tracked
- Track user interactions that were performed during a user journey so you can get insight into user behavior while meeting privacy requirements
- Surface user pain points with frustration signals
- Pinpoint the cause of an error down to the line of code to resolve it

{{< img src="real_user_monitoring/browser/rum-browser-overview.png" alt="RUM performance summary dashboard" style="width:100%;">}}

## Getting started

To get started with the RUM Browser SDK, follow the steps to [create a JavaScript RUM application][1].

From here, you can modify the [data and context][2] the RUM Browser SDK collects to support your specific needs. Learn how to override default settings in [Advanced Configuration][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/setup/#setup
[2]: /real_user_monitoring/browser/data_collected/
[3]: /real_user_monitoring/browser/advanced_configuration/
