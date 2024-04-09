The quota processor measures the logging traffic for logs that match the filter you specify. When the configured daily quota is met inside the 24-hour rolling window, the processor can either drop additional logs or send an alert using a Datadog monitor. You can configure the processor to track the total volume or the total number of events.

As an example, you can configure this processor to drop new logs or trigger an alert without dropping logs after the processor has received 10 million events from a certain service in the last 24 hours.

To set up the quota processor:
1. Enter a name for the processor.
1. Define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) are counted towards the daily limit.
1. In the **Unit for quota** dropdown menu, select if you want to measure the quota by the number of `Events` or by the `Volume` in bytes.
1. Set the daily quota limit and select the unit of magnitude for your desired quota.
1. Set the **Drop events** dropdown to **True** if you want to drop all events when your quota is met. Leave it at **False** if you plan to set up a [metric monitor][5001] that sends an alert when the quota is met.

[5001]: /monitors/types/metric/?tab=threshold