#### Filter query syntax

Each processor has a corresponding filter query in their fields. Processors only process logs that match their filter query. And for all processors except the filter processor, logs that do not match the query are sent to the next step of the pipeline. For the filter processor, logs that do not match the query are dropped.

For any attribute, tag, or `key:value` pair that is not a [reserved attribute][4001], your query must start with `@`. Conversely, to filter reserved attributes, you do not need to append `@` in front of your filter query.

For example, to filter out and drop `status:info` logs, your filter can be set as `NOT (status:info)`. To filter out and drop `system-status:info`, your filter must be set as `NOT (@system-status:info)`.

Filter query examples:
- `NOT (status:debug)`: This filters for only logs that do not have the status `DEBUG`.
- `status:ok service:flask-web-app`: This filters for all logs with the status `OK` from your `flask-web-app` service.
    - This query can also be written as: `status:ok AND service:flask-web-app`.
- `host:COMP-A9JNGYK OR host:COMP-J58KAS`: This filter query only matches logs from the labeled hosts.

Learn more about writing filter queries in [Datadog's Log Search Syntax][4002].

[4001]: /logs/log_configuration/attributes_naming_convention/#reserved-attributes
[4002]: /logs/explorer/search_syntax/