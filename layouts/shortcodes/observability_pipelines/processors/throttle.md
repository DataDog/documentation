Use this processor to specify a quota for a specific time window, ror example, if you only want to send a maximum of 100 logs per second. This can help you catch any spikes in log ingestion and prevent unexpected billing costs.

To set up the processor:

1. Define a [filter query](#filter-query-syntax). Only logs that match the specified filter query are processed. All logs, regardless of whether they do or do not match the filter query, are sent to the next step in the pipeline.
1. Set the window threshold. This is the number of events allowed for a given bucket during the set time window.
1. Set the time window.
1. Optionally, click Add Field if you want to group by a field.