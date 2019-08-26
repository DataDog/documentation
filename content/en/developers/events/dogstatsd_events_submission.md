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

After [installing DogStatsD][1], you can emit events to your [Datadog event stream][2] with the following function:

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
| `SourceTypeName` | String          | no       | The [source type][3] name.                           |
| `AlertType`      | String          | no       | One of (`error`, `warning`, `success`, `info`), defaults to `info`.                                     |
| `Tags`           | List of Strings | no       | A list of tags to associate with this event.                                                            |

For example, you may want to see errors and exceptions in Datadog:


{{< tabs >}}
{{% tab "Python" %}}

```python
#(...)
try:
  # do Something
except RenderError as err:
  statsd.event('An error occured', err.message, alert_type='error', tags=['env:dev'])
```

{{% /tab %}}
{{% tab "Ruby" %}}
```ruby
begin
    #... process, may raise an exception
rescue =>
    statsd.event('An error occured', "Description of the error", alert_type: 'error', tags: ['env:dev'])
else
    #... executes when no error
ensure
    #... always executed
end
```

{{% /tab %}}
{{% tab "Go" %}}

```go
if err != nil {
  dogstatsd_client.Event("An error occured", err, alert_type: "error", []string{"env:dev"} )
}
```

{{% /tab %}}
{{% tab "Java" %}}

```java

try {
  //  Block of code to try
}
catch(Exception e) {
  final Event event = Event.builder()
          .withTitle("An error occured")
          .withText(e)
          .withAlertType(Event.AlertType.ERROR)
          .build();
  statsd.event(event)
}
```

{{% /tab %}}
{{% tab ".NET" %}}


```csharp
try
{
    // (...)
}
catch (InvalidOperationException ex)
{
    DogStatsd.Event(ex.GetType().FullName, ex.Message, alertType: "error", tags: new[] { "env:dev" });
}
```

{{% /tab %}}
{{% tab "PHP" %}}

```php
try {
  # (...)
} catch (Exception $e) {
  $statsd->event('An error occured.',
    array(
        'text'       => $e->getMessage(),
        'alert_type' => 'error'
    )
  );
}
```

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/dogstatsd
[2]: /graphing/event_stream
[3]: /integrations/faq/list-of-api-source-attribute-value
