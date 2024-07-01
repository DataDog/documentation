---
title: Alert on anomalous p99 latency of a database service
kind: guide
further_reading:
- link: /tracing/guide/week_over_week_p50_comparison/
  tag: 2 mins
  text: Compare a service's latency to the previous week
- link: /tracing/guide/slowest_request_daily/
  tag: 3 mins
  text: Debug the slowest trace on the slowest endpoint of a web service
- link: /tracing/guide/apm_dashboard/
  tag: 4 mins
  text: Create a Dashboard to track and correlate APM metrics
- link: /tracing/guide/
  tag: ""
  text: All guides
---

_3 minutes to complete_

{{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_cropped.mp4" video="true" alt="Monitor view with ongoing alert" style="width:90%;">}}

Datadog allows you to set monitors to keep track of the health of your services with APM instead of constantly monitoring it yourself. In this example, we'll use an anomaly detection monitor. [Anomaly detection][1] is an algorithmic feature that allows you to identify when a metric is behaving differently than it has in the past, taking into account trends, seasonal day-of-week, and time-of-day patterns. It is well-suited for metrics with strong trends and recurring patterns that are hard or impossible to monitor with threshold-based alerting.

1. **Open the [New Monitor Page][2] and choose [APM][3]**.
2. **Choose your environment** under Primary Tags and **Choose the database to monitor** under Service.

    Under [Resource][4], you can choose to monitor specific queries run in the database, but in this example, we'll look at overall performance so leave it as `*`.

    Once you choose a [service][5], the next step becomes available for you to set, and a chart appears at the top of the page showing the performance of the metric that the new monitor tracks.

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_2_cropped.png" alt="Monitor view with ongoing alert" style="width:90%;">}}

3. **Choose an *Anomaly Alert*** and under the *For* option select p99 latency.

    Once you choose Anomaly Alert the chart also shows you the baseline expected behavior for the metric chosen - in our case, p99 latency.

4. **Set the *Alert when* field value to 100%**.

    This means that all of the events for the selected duration have to be anomalous for the alert to trigger. This is a best practice for starting with Anomaly Detection. Over time, you'll find the right values that fit your situation. You can find out more about Anomaly Detection Monitors in the [FAQ][6].

5. **Change the alert notification**.

    In this example, you can either leave the notification content with the default text or choose team members to tag in the alert.

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_3.png" alt="Monitor view with ongoing alert" style="width:90%;">}}

    You can read more about the markup for notification text and what values and conditions you can set there in the [notifications overview][7].

6. **Make sure your username appears in the *Configure notifications and automations notification* field** and add any additional team members that should be notified in case of a database latency anomaly.

    **Note**: To add another user, type `@` at the start. **Click *Save***.

    Your alert is now set, you can tweak any of the parameters from this screen and follow the metric performance.

7. **Switch from the *Edit* tab to the *Status* tab**.

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_4_cropped.png" alt="Monitor view with ongoing alert" style="width:90%;">}}

    Here you can see the current status of your monitor, mute it, or explore deeper into the specifics of a triggered alert.

8. **Navigate back to the [Service Catalog][8]** and from there find the service you just set the monitor on, **click into the Service Page** and there **click on the Monitor bar** under the header.

    Here you should **see the new monitor** alongside any other monitor set for the service and suggested monitors that are recommended to set.

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_5_cropped.png" alt="Monitor view with ongoing alert" style="width:90%;">}}

    As you create monitors you'll find more services, metrics and events to include and more complex conditions to set for these. Each of these monitors is connected to a service and can be accessed from the Service page as well as the [Service Map][9].

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_6_cropped.png" alt="Service Map" style="width:90%;">}}

    For each service on the map, a green circle means all monitors are quiet, yellow means one or more monitors are sending warnings but none are alerting, red means one or more monitor is alerting and gray means no monitor is set for the service.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/anomaly/
[2]: https://app.datadoghq.com/monitors#/create
[3]: https://app.datadoghq.com/monitors#create/apm
[4]: /tracing/glossary/#resources
[5]: /tracing/glossary/#services
[6]: /monitors/types/anomaly/#faq
[7]: /monitors/notify/?tab=is_alertis_warning
[8]: https://app.datadoghq.com/services
[9]: https://app.datadoghq.com/service/map
