The quota processor measures the logging traffic for logs that match the filter you specify. When the configured daily quota is met inside the 24-hour rolling window, the processor can either drop additional logs or send an alert using a Datadog monitor. You can configure the processor to track the total volume or the total number of events.

As an example, you can configure this processor to drop new logs or trigger an alert without dropping logs after the processor has received 10 million events from a certain service in the last 24 hours.

To set up the quota processor:
1. Enter a name for the quota processor. The pipeline uses the name to identify the quota across multiple Remote Configuration deployments of the Worker.
1. Define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) are counted towards the daily limit.
    - Logs that match the quota filter and are within the daily quota are sent to the next step in the pipeline.
    - Logs that do not match the quota filter are sent to the next step of the pipeline.
1. In the **Unit for quota** dropdown menu, select if you want to measure the quota by the number of `Events` or by the `Volume` in bytes.
1. Set the daily quota limit and select the unit of magnitude for your desired quota.
1. Check the **Drop events** checkbox if you want to drop all events when your quota is met. Leave it unchecked if you plan to set up a [monitor][5001] that sends an alert when the quota is met.
    - If logs that match the quota filter are received after the daily quota has been met and the **Drop events** option is selected, then those logs are dropped. In this case, only logs that did not match the filter query are sent to the next step in the pipeline.
    - If logs that match the quota filter are received after the daily quota has been met and the **Drop events** option is not selected, then those logs and the logs that did not match the filter query are sent to the next step in the pipeline.

[5001]: /monitors/types/metric/?tab=threshold