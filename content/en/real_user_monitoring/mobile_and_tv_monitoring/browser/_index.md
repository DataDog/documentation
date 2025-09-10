---
title: RUM Browser Monitoring
further_reading:
- link: '/real_user_monitoring/explorer/'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
- link: '/logs/log_collection/javascript/'
  tag: 'Documentation'
  text: 'Learn about the Datadog Browser SDK for Logs'
---

## Overview

Datadog Real User Monitoring (RUM) provides deep insight into your application's frontend performance. Monitor real user data to optimize your web experience and provide exceptional user experiences. Correlate synthetic tests, backend metrics, traces, and logs in a single place to identify and troubleshoot performance issues across the stack.

Datadog helps you understand the current level of user experience, identify areas for improvement, and measure the success of each change and/or deployment. Use this information to identify and resolve unexpected frontend issues before users are impacted to deliver the best experience.

With the Datadog RUM Browser SDK, you can also:

- Monitor your application's pageviews and performance to investigate performance issues
- Gain complete, end-to-end visibility into resources and requests (such as images, CSS files, JavaScript assets, and font files)
- Automatically collect and monitor any interesting events with all relevant context, and manually collect errors that aren't automatically tracked
- Track user interactions that were performed during a user journey so you can get insight into user behavior while meeting privacy requirements
- Surface user pain points with frustration signals
- Pinpoint the cause of an error down to the line of code to resolve it

{{< img src="real_user_monitoring/performance-summary-browser.png" alt="RUM performance summary dashboard" style="width:100%;">}}

The responsibility of keeping user data secure is shared between Datadog and developers who leverage the RUM SDKs. Learn more about [Shared responsibility][1].

## Getting started

{{< whatsnext desc="To get started with the RUM Browser SDK, follow the steps to create a RUM application based on how your application is served:" >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/browser/setup/client">}}<u>Client-Side</u>: Instrument each of your browser-based web applications, deploy the application, then configure the initialization parameters you want to track, and use advanced configuration to further manage data and context that RUM collects.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/browser/setup/server">}}<u>Auto-Instrumentation</u>: Inject a RUM SDK JavaScript scriptlet into the HTML responses of your web applications being served through a web server or proxy.{{< /nextlink >}}
{{< /whatsnext >}}

From here, you can modify the [data and context][2] the RUM Browser SDK collects to support your specific needs. Learn how to override default settings in [Advanced Configuration][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_security/real_user_monitoring/#shared-responsibility
[2]: /real_user_monitoring/mobile_and_tv_monitoring/browser/data_collected/
[3]: /real_user_monitoring/mobile_and_tv_monitoring/browser/advanced_configuration/
