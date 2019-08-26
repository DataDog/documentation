---
title: Events submission with DogStatsD
kind: documentation
description: Overview of the features of DogStatsD, including data types and tagging.
further_reading:
- link: "developers/dogstatsd"
  tag: "Documentation"
  text: "Introduction to DogStatsD"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Official and Community-contributed API and DogStatsD client libraries"
- link: "https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd"
  tag: "GitHub"
  text: "DogStatsD source code"
---

DogStatsD can emit events to your [Datadog event stream][1] with the following function:

```
event(Title, Text, Timestamp, Hostname, AggregationKey, Priority, SourceTypeName, AlertType, Tags)
```

| Parameter        | Type            | Required | Description                                                                                             |
| ---------        | ---             | -------  | --------                                                                                                |
| `Title`          | String          | yes      | The title of the event.                                                                                 |
| `Text`           | String          | yes      | The text body of the event.                                                                             |
| `Timestamp`      | Integer         | yes      | The epoch timestamp for the event. If not provided, the DogStatsD server sets this to the current time. |
| `Hostname`       | String          | no       | The name of the host.                                                                                   |
| `AggregationKey` | String          | no       | A key to use for aggregating events.                                                                    |
| `Priority`       | String          | no       | Specifies the priority of the event (`normal` or `low`).                                                |
| `SourceTypeName` | String          | no       | The [source type][2] name.                           |
| `AlertType`      | String          | no       | One of (`error`, `warning`, `success`, `info`), defaults to `info`.                                     |
| `Tags`           | List of Strings | no       | A list of tags to associate with this event.                                                            |

For example, you may want to see errors and exceptions in Datadog:


{{< tabs >}}
{{% tab "Python" %}}

```python

from datadog import statsd

def render_page():
  try:
    # Render the page...
    # ..
  except RenderError as err:
    statsd.event('Page render error!', err.message, alert_type='error')
```

{{% /tab %}}
{{% tab "Ruby" %}}

{{% /tab %}}
{{% tab "Go" %}}


{{% /tab %}}
{{% tab "Java" %}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{% /tab %}}
{{% tab ".NET" %}}

{{% /tab %}}
{{% tab "PHP" %}}

{{% /tab %}}
{{% tab "C++" %}}

{{% /tab %}}
{{< /tabs >}}

## Tagging

Add tags to any event you send to DogStatsD. For example, compare the performance of two algorithms by tagging a timer metric with the algorithm version:


{{< tabs >}}
{{% tab "Python" %}}

```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # Do fancy things here ...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # Do fancy things (maybe faster?) here ...
```

{{% /tab %}}
{{% tab "Ruby" %}}

{{% /tab %}}
{{% tab "Go" %}}


{{% /tab %}}
{{% tab "Java" %}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{% /tab %}}
{{% tab ".NET" %}}

{{% /tab %}}
{{% tab "PHP" %}}

{{% /tab %}}
{{% tab "C++" %}}

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/event_stream
[2]: /integrations/faq/list-of-api-source-attribute-value
