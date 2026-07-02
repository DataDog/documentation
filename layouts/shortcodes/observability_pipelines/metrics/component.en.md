Monitor the health of your destination with the following key metrics:

`pipelines.component_sent_events_total`
: Count of events successfully delivered in a time interval. Use the `cumsum` function to represent the cumulative total.

`pipelines.component_discarded_events_total`
: Count of events dropped in a time interval. Use the `cumsum` function to represent the cumulative total.

`pipelines.component_errors_total`
: Count of errors in the destination component in a time interval. Use the `cumsum` function to represent the cumulative total.

`pipelines.component_sent_events_bytes_total`
: Count of event bytes sent in a time interval. Use the `cumsum` function to represent the cumulative total.

`pipelines.utilization`
: Worker resource usage.
