---
title: Event submission with a custom Agent Check
kind: documentation
further_reading:
- link: "developers/write_agent_check/?tab=agentv6"
  tag: "Documentation"
  text: "Write an Agent Custom Check"
---

An event in a custom Agent Check is a dictionary with the following keys and data types:

```python
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

To submit an event from a custom Agent Check use the `event(<EVENT_DICT>)` function:

```python
self.event(
            {
                'timestamp': timestamp(),
                'event_type': 'Error',
                'msg_title': 'An error happend',
                'msg_text': 'Starting service XYZ failed',
                'alert_type': 'error',
            }
          )
```
## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/faq/list-of-api-source-attribute-value
