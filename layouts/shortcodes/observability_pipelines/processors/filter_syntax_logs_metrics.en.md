#### Filter query syntax

Each processor has a corresponding filter query in their fields. Processors only process logs or metrics that match their filter query. And for all processors except the Filter processor, logs or metrics that do not match the query are sent to the next step of the pipeline. For the Filter processor, logs or metrics that do not match the query are dropped.

The following are logs filter query examples:

- `NOT (status:debug)`: This filters for logs that do not have the status `DEBUG`.
- `status:ok service:flask-web-app`: This filters for all logs with the status `OK` from your `flask-web-app` service.
    - This query can also be written as: `status:ok AND service:flask-web-app`.
- `host:COMP-A9JNGYK OR host:COMP-J58KAS`: This filter query only matches logs from the labeled hosts.
- `user.status:inactive`: This filters for logs with the status `inactive` nested under the `user` attribute.
- `http.status:[200 TO 299]` or `http.status:{300 TO 399}`: These two filters represent the syntax to query a range for `http.status`. Ranges can be used across any attribute.

The following are metrics filter query examples:

- `NOT system.cpu.user`: This filters for metrics that do not have the field `name:system.cpu.user`.
- `system.cpu.user OR system.cpu.user.total`: This filter query only matches metrics that have either `name:system.cpu.user` or `name:system.cpu.user.total`.
- `tags:(env\:prod OR env\:test)`: This filters for metrics with `env:prod` or `env:test` in `tags`.

Learn more about writing filter queries in [Observability Pipelines Search Syntax][4001].

[4001]: /observability_pipelines/search_syntax/
