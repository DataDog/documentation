---
title: Event submission with a custom Agent Check
kind: documentation
disable_toc: true
further_reading:
- link: "developers/write_agent_check/?tab=agentv6"
  tag: "Documentation"
  text: "Write an Agent Custom Check"
---

To submit an event from a custom Agent Check use the `event(<EVENT_DICT>)` function:

```
self.event(
            {
              "timestamp": <TIMESTAMP_EPOCH>,
              "event_type": "<EVENT_NAME>",
              "msg_title": "<TITLE>",
              "msg_text": "<MESSAGE>",
              "aggregation_key": "<AGGREGATION_KEY>",
              "alert_type": "<ALERT_TYPE>",
              "source_type_name": "<SOURCE_TYPE>",
              "host": "<HOSTNAME>",
              "tags": ["<TAGS>"],
              "priority": "<PRIORITY>"
            }
)
```

Find below the different keys and data types available for the Event dictionary:

| Key                | Type            | Required | Description                                                         |
| -----              | ---             | ----     | ----                                                                |
| `timestamp`        | Integer         | yes      | The epoch timestamp for the event.                                  |
| `event_type`       | String          | yes      | The event name.                                                     |
| `msg_title`        | String          | yes      | The title of the event.                                             |
| `msg_text`         | String          | yes      | The text body of the event.                                         |
| `aggregation_key`  | String          | no       | A key to use for aggregating events.                                |
| `alert_type`       | String          | no       | One of (`error`, `warning`, `success`, `info`), defaults to `info`. |
| `source_type_name` | String          | no       | The [source type][1] name.                                          |
| `host`             | String          | no       | The name of the host.                                               |
| `tags`             | List of Strings | no       | A list of tags to associate with this event.                        |
| `priority`         | String          | no       | Specifies the priority of the event (`normal` or `low`).            |


## Example

Here is an example of a dummy Agent check sending only one event periodically, refer to the dedicated [Writing a custom Agent check][2] documentation to learn more.

1. Create a new directory `event_example.d/` in the [`conf.d/` folder][3] of your Agent.

2. In your `event_example.d/` folder, create an empty configuration file named `event_example.yaml` with the following content:

    ```yaml
    instances: [{}]
    ```

3. Go to the `/datadog-agent/checks.d/` folder.
2. Create within this folder a custom check file named `event_example.py` with the content below:

    ```python
    try:
        from checks import AgentCheck
    except ImportError:
        from datadog_checks.checks import AgentCheck

    __version__ = "1.0.0"

    class MyClass(AgentCheck):
        def check(self, instance):
            self.event(
                {
                    "timestamp": time.time(),
                    "event_type": "Error",
                    "msg_title": "Example Event.",
                    "msg_text": "This is an example event coming from the Datadog Documentation.",
                    "alert_type": "error",
                }
            )
    ```

3. [Restart the Agent][4]

4. Check that your custom check is correctly running with the [Agent Status command][5]. You should see something like this:

    ```
    =========
    Collector
    =========

      Running Checks
      ==============

        (...)

        event_example (1.0.0)
        ---------------------
          Instance ID: event_example:d884b5186b651429 [OK]
          Total Runs: 2
          Metric Samples: Last Run: 0, Total: 0
          Events: Last Run: 1, Total: 2
          Service Checks: Last Run: 0, Total: 0
          Average Execution Time : 0s

        (...)
    ```
5. Finally, go to your [Datadog Event stream][6] to see your events flowing in:

{{< img src="developers/events/agent_check/event_stream_example.png" alt="Event stream example" responsive="true" style="width:80%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/faq/list-of-api-source-attribute-value
[2]: /developers/write_agent_check
[3]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: /agent/guide/agent-commands/#restart-the-agent
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6#agent-information
[6]: https://app.datadoghq.com/event/stream
