This processor samples your logging traffic for a representative subset at the rate that you define, dropping the remaining logs. As an example, you can use this processor to sample 20% of logs from a noisy non-critical service.

The sampling only applies to logs that match your filter query and does not impact other logs. If a log is dropped at this processor, none of the processors below receives that log.

To set up the sample processor:
1.  Define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) are sampled at the specified retention rate below. The sampled logs and the logs that do not match the filter query are sent to the next step in the pipeline.
1. Enter your desired sampling rate in the **Retain** field. For example, entering `2` means 2% of logs are retained out of all the logs that match the filter query.
1. Optionally, enter a **Group By** field to create separate sampling groups for each unique value for that field. For example, `status:error` and `status:info` are two unique field values. Each bucket of events with the same field is sampled independently. Click Add Field if you want to add more fields to partition by. See the [group-by example](#group-by-example).

##### Group-by example

If you have the following setup for the sample processor:
- Filter query: `env:staging`
- Retain: `40%` of matching logs
- Group by: `status` and `service`

<figure class="text-center">
<img src="{{ .Site.Params.img_url}}images/observability_pipelines/processors/group-by-example-service.png" alt="The sample processor with example values" width="40%">
</figure>

Then, 40% of logs for each unique combination of `status` and `service` from `env:staging` is retained. For example:

- 40% of logs with `status:info` and `service:networks` are retained.
- 40% of logs with `status:info` and `service:core-web` are retained.
- 40% of logs with `status:error` and `service:networks` are retained.
- 40% of logs with `status:error` and `service:core-web` are retained.