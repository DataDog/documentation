---
title: How to update an anomaly detection monitor to account for local time zone
kind: faq
disable_toc: true
further_reading:
- link: "/monitors/monitor_types/anomaly/"
  tag: "Documentation"
  text: "Create an anomaly monitor"
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure monitor notifications"
---

If you are using the agile or robust anomaly detection algorithms with weekly or daily seasonality, you can update your anomaly detection monitor to account for a local timezone using both the API and the UI.

**Note**: If the traffic you are monitoring is a mix from a lot of different locals, it’s possible that your monitor doesn't need any DST adjustment. However, if you do want to monitor DST in multiple locales, use tags to differentiate the regions and create a separate monitor for each tag. 

## UI

To update an anomaly detection monitor to account for a local timezone in the UI, navigate to the [Create a new monitor][1] > [Anomoly monitor][2] section in the UI. In section 3, Set Alert Conditions, open the Advanced panel and toggle on the switch on to take daylight savings into account while evaluating the monitor. Then, set the timezone to match the local to track.

{{< img src="monitors/faq/anomaly_monitor_timezone_ui.png" alt="DST tracking in the UI" responsive="true">}}

## API

1.  You need the following information to make the update request through the monitor API:
  - Your [Datadog API key and APP key][3] for authentication
  - The monitor ID and query from your anomaly detection monitor:
    {{< img src="monitors/faq/anomaly_monitor_timezone.png" alt="Monitor ID and Query" responsive="true">}}
  - The TZ identification string for the time zone related to your metric, for example `America/New_York` or `Europe/Paris`. Locate your preferred time zone in the TZ column on the [List of tz database time zones][4] (canonical format recommended).<br><br>
2. Create an updated version of the monitor query by adding a `timezone` argument to the anomalies() function call.
  - For example, if you wanted to change the query shown above to use New York's local time, the query would be updated to:

    ```
    avg(last_4h):anomalies(avg:system.cpu.user{role:trace-cassandra} by {host}, 'basic', 2, direction='both', alert_window='last_15m', interval=60, count_default_zero='true', timezone='America/New_York') >= 1
    ```

3. Use the [Edit a Monitor][5] API to update the monitor's definition.
  - Examples are available in Python, Ruby, and cURL.
  - Only include the ID and query in the request to avoid overriding existing settings. The name, message, options, and tags are not required.

**Note**: A monitor with the time zone parameter evaluates using the specified time zone. The graphs shown on the monitor status page and in snapshots will correctly show the bounds used for those evaluations. However, the evaluation graph on the edit page does not respect the time zone. **Saving the monitor using the UI removes the time zone from the monitor definition.**

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#/create
[2]: https://app.datadoghq.com/monitors#create/anomaly
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[5]: /api/?lang=python#edit-a-monitor
