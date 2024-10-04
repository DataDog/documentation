This processor generates either a count metric of logs that match a query or a distribution metric of a numeric value contained in the logs, such as a request duration.

To set up the processor:

Click **Manage Metrics** to create new metrics or edit existing metrics. This opens a side panel.

- If you have not created any metrics yet, enter the metric parameters as described in the [Add a metric](#add-a-metric) section to create a metric.
- If you have already created metrics, click on the metric's row in the overview table to edit or delete it. Use the search bar to find a specific metric by its name, and then select the metric to edit or delete it. Click **Add Metric** to add another metric.

##### Add a metric

 1. Enter a [filter query](#filter-query-syntax). Only logs that match the specified filter query are processed. All logs, regardless of whether they match the filter query, are sent to the next step in the pipeline. **Note**: Since a single processor can generate multiple metrics, you can define a different filter query for each metric.
1. Enter a name for the metric.
1. In the **Define parameters** section, select the metric type (count, gauge, or distribution). See [Metrics Types](#metrics-types) for more information.
    - For gauge and distribution metric types, select a log field which has a numeric (or parseable numeric string) value that is used for the value of the generated metric.
    - For the distribution metric type, the log field's value can be an array of (parseable) numerics, which is used for the generated metric's sample set.
1. Click **Add Metric**.