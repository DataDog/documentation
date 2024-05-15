When setting up additional endpoints, you must explicitly set `use_http` to tell the Agent which transport to use. The same transport configuration is shared among all additional endpoints.

The `is_reliable` setting (First available in Agent `7.34.0`) tells the Agent to treat this endpoint with the same priority as the primary endpoint. The primary endpoint is always reliable. This ensures that data is not missed if a destination becomes unavailable.

For example, if you're sending data to the main endpoint and an additional endpoint with `is_reliable: true`, and one endpoint becomes unavailable, data continues to flow to the other endpoint. If both endpoints become unavailable, the Agent stops reading and sending data until at least one endpoint recovers. This ensures all data makes it to at least one reliable endpoint.

The `is_reliable` setting defaults to `true` in Agent `7.37.0+`. Unreliable endpoints only send data if at least one reliable endpoint is available. You may define multiple additional endpoints with a mixed usage of `is_reliable` values. Datadog recommends that you use the default `is_reliable` setting.

You can add the YAML configuration to your `datadog.yaml` or launch the Agent with the appropriate environment variables.