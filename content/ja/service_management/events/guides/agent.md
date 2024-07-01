---
title: Events with a Custom Agent Check
kind: guide
aliases:
- /events/agent/
- /events/guides/agent
further_reading:
- link: /developers/custom_checks/write_agent_check/
  tag: Documentation
  text: Writing a Custom Agent Check
---

## Submission

To submit an event from a custom Agent Check use the `event(<EVENT_DICT>)` function:

```text
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

The following keys and data types are available in the event dictionary:

| Key                | Type            | Required | Description                                                   |
|--------------------|-----------------|----------|---------------------------------------------------------------|
| `timestamp`        | Integer         | Yes      | The epoch timestamp for the event                             |
| `event_type`       | String          | Yes      | The event name                                                |
| `msg_title`        | String          | Yes      | The title of the event                                        |
| `msg_text`         | String          | Yes      | The text body of the event                                    |
| `aggregation_key`  | String          | No       | A key to use for aggregating events                           |
| `alert_type`       | String          | No       | `error`, `warning`, `success`, or `info` (defaults to `info`) |
| `source_type_name` | String          | No       | The source type name                                     |
| `host`             | String          | No       | The host name                                                 |
| `tags`             | List of strings | No       | A list of tags associated with this event.                    |
| `priority`         | String          | No       | Specifies the priority of the event (`normal` or `low`).      |

### Example

This is an example of using a custom Agent check to send one event periodically. See [Writing a Custom Agent Check][1] for more details.

1. Create a new directory `event_example.d/` in the `conf.d/` folder at the root of your [Agent's configuration directory][2].

2. In the `event_example.d/` folder, create a configuration file named `event_example.yaml` with the following content:

    ```yaml
    instances: [{}]
    ```

3. Up one level from the `conf.d/` folder, go to the `checks.d/` folder.
4. In this folder, create a custom check file named `event_example.py` with the following content:

    {{< code-block lang="python" filename="event_example.py" >}}
    from datadog_checks.base import AgentCheck

    __version__ = "1.0.0"

    class MyClass(AgentCheck):
        def check(self, instance):
            self.event(
                {
                    "timestamp": time.time(),
                    "event_type": "Error",
                    "msg_title": "Example Event",
                    "msg_text": "This is an example event coming from Datadog.",
                    "alert_type": "error",
                }
            )
    {{< /code-block >}}

5. [Restart the Agent][3].
6. For validation, run the [Agent's status command][4] and look for `event_example` under the Checks section:

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /developers/custom_checks/write_agent_check/
[2]: /agent/configuration/agent-configuration-files/#agent-configuration-directory
[3]: /agent/configuration/agent-commands/#restart-the-agent
[4]: /agent/configuration/agent-commands/#agent-information
