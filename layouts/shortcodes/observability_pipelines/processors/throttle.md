Use this processor to set a limit on the number of logs sent within a specific time window. For example, you can set a limit so that only 100 logs are sent per second. Setting a rate limit can help you catch any spikes in log ingestion and prevent unexpected billing costs.

To set up the processor:

1. Define a [filter query](#filter-query-syntax). Only logs that match the specified filter query are processed. All matched logs get throttled. Logs that are sent within the throttle limit and logs that do not match the filter are sent to the next step. Logs sent after the throttle limit has been reached, are dropped.
1. Set the throttling rate. This is the number of events allowed for a given bucket during the set time window.
1. Set the time window.
1. Optionally, click **Add Field** if you want to group by a field.