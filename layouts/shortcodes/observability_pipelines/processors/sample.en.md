This processor samples your logging traffic for a representative subset at the rate that you define, dropping the remaining logs. As an example, you can use this processor to sample 20% of logs from a noisy non-critical service.

The sampling only applies to logs that match your filter query and does not impact other logs. If a log is dropped at this processor, none of the processors below receives that log.

To set up the sample processor:
1.  Define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) are sampled at the specified retention rate below. The sampled logs and the logs that do not match the filter query are sent to the next step in the pipeline.
1. Enter your desired sampling rate in the **Retain** field. For example, entering `2` means 2% of logs are retained out of all the logs that match the filter query.
1. Optionally, enter a group-by field to group events by field. Each bucket of events with the same field is sampled independently. Click **Add Field** if you want to add another group-by field.