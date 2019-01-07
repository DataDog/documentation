---
title: Track your log events
kind: faq
---

There are several places where you can see the number of log events you have sent to Datadog.

1. On the [Usage page][1], the last column reflects the hourly number of indexed log events:

    {{< img src="account_management/billing/log-events01.png" alt="Log Events" responsive="true">}}

2. On the [Pipeline page][2], double-click on an index to see the number of log events that were indexed in the past couple days.

    {{< img src="account_management/billing/log-events02.png" alt="Log Events" responsive="true">}}

3. In the [Log Explorer][3], change the time-frame and check the count at the top of the list:

    {{< img src="account_management/billing/log-events03.png" alt="Log Events" responsive="true">}}

You can also use facets to see log count by any attribute or tag defined by your log events. This helps to identify which host, service, endpoint, etc., generate the most data.

## Troubleshooting
For technical questions, contact [Datadog support][4].

For billing questions, contact your Customer Success Manager.

[1]: https://app.datadoghq.com/account/usage/hourly
[2]: https://app.datadoghq.com/logs/pipelines
[3]: https://app.datadoghq.com/logs
[4]: /help
