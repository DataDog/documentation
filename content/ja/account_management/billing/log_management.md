---
title: Log Management Billing
---

## Pricing

At the end of the month, Datadog computes the total number of log events that have been indexed:

- If you are below commitment, your bill stays the same.
- If you over-consume, the committed amount is subtracted and **on demand usage** is charged with a 50% premium.

### On demand

With Datadog log management, you define a monthly commitment on indexed log events. However, during troubling times the number of logs can spike and you may go above your commitment. Because it's important to keep visibility on your infrastructure health, you are not limited to your monthly commitment.

Since commitments are monthly, if you over-generate log events for 1 day it may not cause overuse if your average daily log consumption is close to expectations for your commitment.

## Tracking log events

There are several places where you can see the number of log events you have sent to Datadog.

1. On the [Usage page][1], there is a Month-to-Date and a graph named `Indexed Logs` and which shows the hourly number of indexed log events:

2. On the [Configuration page][2], double-click on an index to see the number of log events that were indexed in the past couple days.

    {{< img src="account_management/billing/log-events02.png" alt="Log Events" >}}

3. In the [Log Explorer][3], change the time-frame and check the count at the top of the list:

    {{< img src="account_management/billing/log-events03.png" alt="Log Events" >}}

You can also use facets to see log count by any attribute or tag defined by your log events. This helps to identify which host, service, endpoint, etc., generate the most data.

## Troubleshooting

For technical questions, contact [Datadog support][4].

For billing questions, contact your [Customer Success][5] Manager.

[1]: https://app.datadoghq.com/account/usage/hourly
[2]: https://app.datadoghq.com/logs/pipelines
[3]: https://app.datadoghq.com/logs
[4]: /help/
[5]: mailto:success@datadoghq.com
