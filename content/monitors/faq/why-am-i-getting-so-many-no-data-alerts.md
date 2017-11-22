---
title: Why am I getting so many No Data alerts?
kind: faq
customnav: monitornav
further_reading:
- link: "/monitors/notifications"
  tag: "Monitors"
  text: Configure your monitor notifications
- link: "/monitors/downtimes"
  tag: "Monitors"
  text: Schedule a downtime to mute a monitor
---

For the AWS No Data errors, the issue here has to do with how frequently we
receive AWS metrics.  
Because our crawlers are rate-limited by the Cloudwatch APIs, data is often delayed by 10 or more minutes, so we generally recommend that an alert for an AWS metric be set to have a threshold window of at least 30 minutes or an hour (you can see this in step 3 of alert creation, “during the last…”).  

Switching the time frame on this alert will resolve this issue, or you can install the agent on some AWS hosts to get more up-to-date data to alert on. Overall, we’re always working towards getting data more efficiently from AWS.

{{< partial name="whats-next/whats-next.html" >}}