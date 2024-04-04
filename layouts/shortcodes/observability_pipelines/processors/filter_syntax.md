#### Filter query syntax

Each processor has a corresponding filter query in their fields. **Note**: Processors only process logs that match their filter query.

For any attribute, tag, or `key:value` pair that is not a [reserved attribute][101], your query must start with `@`. Conversely, to filter reserved attributes, you do not need to append `@` in front of your filter query.

For example, to filter out and drop `status:INFO` logs, your filter can be set as `NOT (status:INFO)`. To filter out and drop `system-status:INFO`, your filter must be set as `NOT (@system-status:INFO)`.

Filter query examples:
- `NOT (status:DEBUG)`: This filters for only logs that do not have status `DEBUG`.
- `status:OK service:flask-web-app`: This filters for all logs with the status `OK` and originates from your `flask-web-app` service.
    - This query can also be written as: `status:OK AND service:flask-web-app`.
-`host:COMP-A9JNGYK OR host:COMP-J58KAS`: This filter query only matches logs from the labeled hosts.

Learn more about writing filter queries in [Datadog's Log Search Syntax][102].

[101]: /logs/log_configuration/attributes_naming_convention/#reserved-attributes
[102]: /logs/explorer/search_syntax/