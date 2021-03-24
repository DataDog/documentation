---
title: Events with DogStatsD
kind: documentation
description: Overview of the features of DogStatsD, including data types and tagging.
further_reading:
- link: "/developers/dogstatsd/"
  tag: "Documentation"
  text: "Introduction to DogStatsD"
- link: "/developers/libraries/"
  tag: "Documentation"
  text: "Official and Community created API and DogStatsD client libraries"
- link: "https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd"
  tag: "GitHub"
  text: "DogStatsD source code"
---

## Submission

After [installing DogStatsD][1], you can emit events to your [Datadog event stream][2] with the following function:

```text
event(<TITLE>, <TEXT>, <TIMESTAMP>, <HOSTNAME>, <AGGREGATION_KEY>, <PRIORITY>, <SOURCE_TYPE_NAME>, <ALERT_TYPE>, <TAGS>)
```

**Definitions**:

| Parameter            | Type            | Required | Description                                                                                |
|----------------------|-----------------|----------|--------------------------------------------------------------------------------------------|
| `<TITLE>`            | String          | Yes      | The title of the event                                                                     |
| `<TEXT>`             | String          | Yes      | The text body of the event                                                                 |
| `<TIMESTAMP>`        | Integer         | No       | The epoch timestamp for the event (defaults to the current time from the DogStatsD server) |
| `<HOSTNAME>`         | String          | No       | The name of the host                                                                       |
| `<AGGREGATION_KEY>`  | String          | No       | A key to use for aggregating events                                                        |
| `<PRIORITY>`         | String          | No       | Specifies the priority of the event (`normal` or `low`).                                   |
| `<SOURCE_TYPE_NAME>` | String          | No       | The source type name                                                                  |
| `<ALERT_TYPE>`       | String          | No       | `error`, `warning`, `success`, or `info` (defaults to `info`)                              |
| `<TAGS>`             | List of strings | No       | A list of tags associated with this event.                                                 |

### Examples

View errors and exceptions in Datadog with a DogStatsD event:

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,php" >}}

{{< programming-lang lang="python" >}}

```python
from datadog import initialize, statsd

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

statsd.event('An error occurred', 'Error message', alert_type='error', tags=['env:dev'])
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

statsd.event('An error occurred', "Error message", alert_type: 'error', tags: ['env:dev'])
```
{{< /programming-lang >}}


{{< programming-lang lang="go" >}}
```go
package main

import (
	"log"
	"time"

	"github.com/DataDog/datadog-go/statsd"
)

func main() {

	dogstatsdClient, err := statsd.New("127.0.0.1:8125")

	if err != nil {
		log.Fatal(err)
	}
	for {
		dogstatsdClient.SimpleEvent("An error occurred", "Error message")
		time.Sleep(10 * time.Second)
	}
}
```
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
```java
import com.timgroup.statsd.Event;
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd").
            .hostname("localhost")
            .port(8125)
            .build();

        Event event = Event.builder()
          .withTitle("An error occurred")
          .withText("Error message")
          .withAlertType(Event.AlertType.ERROR)
          .build();

        Statsd.recordEvent(event);
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}
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

        using (var dogStatsdService = new DogStatsdService())	
        {	
            dogStatsdService.Configure(dogstatsdConfig);	
            dogStatsdService.Event("An error occurred", "Error message", alertType: "error", date_happened='TIMESTAMP', tags: new[] { "env:dev" });	
        }	
    }	
}
```
{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

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

With the DogStatsD-PHP library you can submit events via TCP directly to the Datadog API. It's slower but more reliable than using the Agent DogStatsD instance since events are forwarded from your application to the Agent using UDP.
To use this, you must configure the library with your [Datadog API and application keys][1] instead of the local DogStatS instance:

```php
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('api_key' => '<DATADOG_API_KEY>',
          'app_key' => '<DATADOG_APPLICATION_KEY>',
     )
  );

$statsd->event('An error occurred.',
    array( 'text' => 'Error message',
           'alert_type' => 'error'
    )
  );
```


[1]: https://app.datadoghq.com/account/settings#api
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

**Note**:

* Sending events with this method uses cURL for API requests.
* You should use a `try`/`catch` code block to avoid warnings or errors on communication issues with the Datadog API.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /developers/dogstatsd/
[2]: /events/
