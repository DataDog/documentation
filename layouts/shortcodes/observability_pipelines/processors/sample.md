This processor samples your logging traffic for a representative subset at the rate that you define, dropping the remaining logs. As an example, you can use this processor to sample 20% of logs from a noisy non-critical service.

The sampling only applies to logs that match your filter query and does not impact other logs. If a log is dropped at this processor, none of the processors below receives that log.

To set up the sample processor:
1.  Define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) are sampled at the specified retention rate below. The sampled logs and the logs that do not match the filter query are sent to the next step in the pipeline.
1. Set the **retain** field with your desired sampling rate expressed as a percentage. For example, entering `1` means 1% of logs is retained out of all the logs that match the filter query.
