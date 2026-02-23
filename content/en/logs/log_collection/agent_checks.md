---
title: Agent Integration Log Collection
further_reading:
- link: "/developers/integrations/agent_integration/"
  tag: "Documentation"
  text: "Create an Agent-based Integration"
- link: "/logs/log_configuration/processors"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/log_configuration/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "https://datadoghq.dev/integrations-core/base/api/#datadog_checks.base.checks.base.AgentCheck.send_log"
  tag: "Agent Integrations API"
  text: "API parameters to send_logs"
---

## Overview

When developing custom Agent integrations, you can submit logs directly to Datadog's log ingestion backend using the `send_log` method. This allows your custom checks to emit logs alongside metrics, events, and service checks.

This approach is useful for both extracting log data from the monitored application or service and for capturing logs produced from the integration check itself.

## Prerequisites

- A custom Agent integration or check. See [Create an Agent-based Integration][1] for setup instructions.
- The Datadog Agent installed and running with [log collection enabled][2].

## Configuration

To enable log submission from your custom Agent check, you need to configure log collection in your integration's configuration file.

1. Ensure log collection is enabled globally in the Agent's main configuration file (`datadog.yaml`):
   ```yaml
   logs_enabled: true
   ```

2. Add a `logs` section to your integration's configuration file (for example, `conf.d/my_integration.d/conf.yaml`):
   ```yaml
   init_config:

   instances:
     - <instance_configuration>

   logs:
     - type: integration
       source: <integration_name>
       service: <service_name>
   ```

   Where:
   - `type`: Set to `integration` to indicate logs are collected by an integration
   - `source`: The source of the logs (typically your integration name)
   - `service`: The service name to associate with the logs (this can also be the integration name if nothing else applies)

3. [Restart the Agent][6] to apply the configuration changes.

After it's configured, your integration can use the [`send_log` method][7] to submit logs. These logs are tagged with the `source` and `service` specified in the configuration.

## Using the send_log method

The `send_log` method is available on any `AgentCheck` class and allows you to submit log entries to Datadog.

### Method signature

```python
send_log(data, cursor=None, stream='default')
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `dict[str, str]` | Yes | The log data to send. Must include at least a `message` key. |
| `cursor` | `dict[str, Any]` | No | Optional metadata associated with the log, saved to disk. Can be retrieved later with `get_log_cursor()`. |
| `stream` | `str` | No | Stream name associated with the log for cursor persistence. Only used if `cursor` is provided. Defaults to `'default'`. |

### Special keys in the data dictionary

The `data` dictionary supports the following special keys that are automatically handled by the `send_log` method:

- `timestamp`: Number of seconds since Unix epoch. Defaults to the current time if not provided.
- `ddtags`: Comma-separated string of tags. If not provided, the Agent automatically adds tags from the integration instance configuration.

All other keys in the `data` dictionary are passed through as log attributes. Common attributes to include:

- `message`: The log message content
- `status`: Log status level (such as `info`, `error`, `warning`, `debug`)
- `service`: Service name for the log (this should match the service name in the check's configuration)
- `source`: Source of the log (typically your integration name; should also match the configured source name)
- `hostname`: Hostname associated with the log
- Any custom fields relevant to your integration

## Example usage

### Basic log submission

```python
from datadog_checks.base import AgentCheck
import time

class MyCustomCheck(AgentCheck):
    def check(self, instance):
        # Submit a simple log message
        self.send_log({
            'message': 'Custom check executed successfully',
            'timestamp': time.time(),
            'status': 'info'
        })
```

### Structured logging with metadata

```python
from datadog_checks.base import AgentCheck
import time

class MyCustomCheck(AgentCheck):
    def check(self, instance):
        # Submit a structured log with additional fields
        self.send_log({
            'message': 'Database query completed',
            'timestamp': time.time(),
            'status': 'info',
            'service': 'my-custom-integration',
            'source': 'custom_check',
            'query_duration_ms': 145,
            'rows_returned': 1024
        })
```

### Using cursors for stateful logging

Cursors allow you to persist metadata across check runs, which is useful for tracking progress or maintaining state:

```python
from datadog_checks.base import AgentCheck
import time

class MyCustomCheck(AgentCheck):
    def check(self, instance):
        # Retrieve the last cursor for this stream
        last_cursor = self.get_log_cursor('my_stream')
        last_position = last_cursor.get('position', 0) if last_cursor else 0

        # Process logs from the last position
        new_logs = self.fetch_logs_since(last_position)

        for log in new_logs:
            # Submit each log with an updated cursor
            self.send_log(
                data={
                    'message': log['message'],
                    'timestamp': log['timestamp'],
                    'status': log['level']
                },
                cursor={'position': log['position']},
                stream='my_stream'
            )
```

### Error logging

```python
from datadog_checks.base import AgentCheck
import time

class MyCustomCheck(AgentCheck):
    def check(self, instance):
        try:
            # Your check logic here
            self.perform_check()
        except Exception as e:
            # Log the error
            self.send_log({
                'message': f'Check failed: {str(e)}',
                'timestamp': time.time(),
                'status': 'error',
                'error_type': type(e).__name__,
                'service': 'my-custom-integration'
            })
            raise
```

## View your logs

After submission, logs from your custom check appear in the [Log Explorer][3]. You can:

- Filter logs by `source`, `service`, or custom tags
- Parse structured log data using [log processing pipelines][4]
- Create monitors and alerts based on log content
- Correlate logs with metrics and traces from the same integration

## Best practices

- **Use structured logging**: Include additional fields in the `data` dictionary rather than embedding all information in the message string.
- **Set appropriate status levels**: Use `error`, `warning`, `info`, or `debug` to help with filtering and alerting.
- **Include timestamps**: Always provide a `timestamp` for accurate log ordering, especially when processing historical data.
- **Tag consistently**: Use the same tagging strategy across logs, metrics, and events from your integration.
- **Use cursors for stateful processing**: When tracking progress through log sources, use cursors to avoid reprocessing data.

## Troubleshooting

If logs are not appearing in Datadog:

1. Verify that log collection is enabled in the Datadog Agent configuration.
2. Check the Agent logs for errors related to log submission.
3. Ensure your `data` dictionary includes at least a `message` key.
4. Run the [Agent's status command][5] to confirm your check is running without errors.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/integrations/agent_integration/
[2]: /agent/logs/?tab=tailfiles#activate-log-collection
[3]: /logs/explorer/
[4]: /logs/log_configuration/processors
[5]: /agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[6]: /agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: https://datadoghq.dev/integrations-core/base/api/#datadog_checks.base.checks.base.AgentCheck.send_log
