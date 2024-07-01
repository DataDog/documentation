---
title: How to update an anomaly detection monitor to account for local time zone
further_reading:
- link: /monitors/types/anomaly/
  tag: Documentation
  text: Create an anomaly monitor
- link: /monitors/notify/
  tag: Documentation
  text: Configure monitor notifications
aliases:
- /monitors/faq/how-to-update-anomaly-monitor-timezone  
---

Datadog monitors use UTC time, which by default does not track local time zones. Depending on the type of system you have, your data could be impacted by local activity happening in your time zone. For example, a lunch surge could cause a spike in the middle of the day, and this surge could be detected as an unexpected anomaly. If you are getting unexpected anomalies caused by local activity, update your anomaly detection monitor to account for your local timezone.

If you are using the agile or robust anomaly detection algorithms with weekly or daily seasonality, you can update your anomaly detection monitor to account for a local timezone using both the API and the UI.

Here is an example of a monitor before it is set to account for a local timezone:

{{< img src="monitors/guide/dst-off.png" alt="DST tracking turned off" >}}

Here is an example of a monitor when daylight savings time is being taken into account:

{{< img src="monitors/guide/dst-on.png" alt="DST tracking turned on" >}}

## UI

To update an anomaly detection monitor to account for a local timezone in the UI, navigate to the [Create a new monitor][1] > [Anomaly monitor][2] section in the UI. In section 3, Set Alert Conditions, open the Advanced panel and toggle on the switch to take daylight savings into account while evaluating the monitor. Then, set the timezone dropdown to match the timezone you want tracked.

{{< img src="monitors/guide/anomaly_monitor_timezone_ui.png" alt="DST tracking in the UI" >}}

## API

1. You need the following information to make the update request through the monitor API:
  - Your [Datadog API key and application key][3] for authentication
  - The monitor ID and query from your anomaly detection monitor:
    {{< img src="monitors/guide/anomaly_monitor_timezone.png" alt="Monitor ID and Query" >}}
  - The TZ identification string for the time zone related to your metric, for example `America/New_York` or `Europe/Paris`. Locate your preferred time zone in the TZ column on the [List of tz database time zones][4] (canonical format recommended).<br><br>
2. Create an updated version of the monitor query by adding a `timezone` argument to the anomalies() function call.
  - For example, if you wanted to change the query shown above to use New York's local time, the query would be updated to:

    ```
    avg(last_4h):anomalies(avg:system.cpu.user{role:trace-cassandra} by {host}, 'basic', 2, direction='both', alert_window='last_15m', interval=60, count_default_zero='true', timezone='America/New_York') >= 1
    ```

3. Use the [Edit a Monitor][5] API to update the monitor's definition.
  - Examples are available in Python, Ruby, and cURL.
  - Only include the ID and query in the request to avoid overriding existing settings. The name, message, options, and tags are not required.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#/create
[2]: https://app.datadoghq.com/monitors#create/anomaly
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[5]: /api/v1/monitors/#edit-a-monitor
