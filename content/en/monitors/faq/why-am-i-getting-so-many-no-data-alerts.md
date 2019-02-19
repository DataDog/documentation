---
title: Why am I getting so many No Data alerts?
kind: faq
further_reading:
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "monitors/downtimes"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
---

For the AWS No Data errors, the issue here has to do with how frequently we
receive AWS metrics.
Because our crawlers are rate-limited by the Cloudwatch APIs, data is often delayed by 10 or more minutes, so we generally recommend that an alert for an AWS metric be set to have a threshold window of at least 30 minutes or an hour (you can see this in step 3 of alert creation, "during the last...").

We suggest using the "Do not require a full window of data" option so that evaluations are not skipped when data points for this metric are sparse.

Furthermore, for AWS metrics, you can use the delay evaluation parameter to offset any delays related to Cloudwatch. We recommend that you set a delay of 900 seconds on AWS monitors, using the "Delay evaluation by" option. If you set a delay of 900 seconds and a threshold window of 30 minutes as suggested, the monitor will evaluate data from 15 minutes in the past and look back at the 30 minutes prior to that.

Adjusting these settings on this alert will resolve the no data notifications, or you can install the Agent on some AWS hosts to get more up-to-date data to alert on. Overall, we're always working towards getting data more efficiently from AWS.

{{< partial name="whats-next/whats-next.html" >}}

