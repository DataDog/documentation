---
title: Events with DogStatsD
kind: documentation
description: Overview of the features of DogStatsD, including data types and tagging.
further_reading:
- link: "developers/dogstatsd"
  tag: "Documentation"
  text: "Introduction to DogStatsD"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Official and Community created API and DogStatsD client libraries"
- link: "https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd"
  tag: "GitHub"
  text: "DogStatsD source code"
---

## Submission

After [installing DogStatsD][1], you can emit events to your [Datadog event stream][2] with the following function:

```
event(Title, Text, Timestamp, Hostname, AggregationKey, Priority, SourceTypeName, AlertType, Tags)
```

**Definitions**:

| Parameter      | Type            | Required | Description                                                                                |
|----------------|-----------------|----------|--------------------------------------------------------------------------------------------|
| Title          | String          | Yes      | The title of the event                                                                     |
| Text           | String          | Yes      | The text body of the event                                                                 |
| Timestamp      | Integer         | Yes      | The epoch timestamp for the event (defaults to the current time from the DogStatsD server) |
| Hostname       | String          | No       | The name of the host                                                                       |
| AggregationKey | String          | No       | A key to use for aggregating events                                                        |
| Priority       | String          | No       | Specifies the priority of the event (`normal` or `low`).                                   |
| SourceTypeName | String          | No       | The [source type][3] name                                                                  |
| AlertType      | String          | No       | `error`, `warning`, `success`, or `info` (defaults to `info`)                              |
| Tags           | List of strings | No       | A list of tags associated with this event.                                                 |

### Examples

View errors and exceptions in Datadog with a DogStatsD event:

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, statsd

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

statsd.event('An error occurred', 'Error message', alert_type='error', tags=['env:dev'])
```

{{% /tab %}}
{{% tab "Ruby" %}}
```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

statsd.event('An error occurred', "Error message", alert_type: 'error', tags: ['env:dev'])
```

{{% /tab %}}
{{% tab "Go" %}}

```go
package main

import (
    "log"
    "github.com/DataDog/datadog-go/statsd"
)

func main() {

    dogstatsd_client, err: = statsd.New("127.0.0.1:8125")

    if err != nil {
        log.Fatal(err)
    }

    dogstatsd_client.Event("An error occurred", "Error message", alert_type: "error", [] string {
        "env:dev"
    })
}
```

{{% /tab %}}
{{% tab "Java" %}}

```java
import com.timgroup.statsd.Event;
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("statsd", "localhost", 8125);

        Event event = Event.builder()
          .withTitle("An error occurred")
          .withText("Error message")
          .withAlertType(Event.AlertType.ERROR)
          .build();

        Statsd.event(event)
    }
}
```

{{% /tab %}}
{{% tab ".NET" %}}

```csharp
using StatsdClient;

public class DogStatsdClient
{
    public static void Main()
    {
        var dogstatsdConfig = new StatsdConfig
        {
            StatsdServerName = "127.0.0.1",
            StatsdPort = 8125,
        };

        StatsdClient.DogStatsd.Configure(dogstatsdConfig);

        DogStatsd.Event("An error occurred", "Error message", alertType: "error", tags: new[] { "env:dev" });
    }
}
```

{{% /tab %}}
{{% tab "PHP" %}}

```php
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('host' => '127.0.0.1',
          'port' => 8125,
     )
  );

$statsd->event('An error occurred.',
    array( 'text' => 'Error message',
           'alert_type' => 'error'
    )
  );
```

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/dogstatsd
[2]: /graphing/event_stream
[3]: /integrations/faq/list-of-api-source-attribute-value
