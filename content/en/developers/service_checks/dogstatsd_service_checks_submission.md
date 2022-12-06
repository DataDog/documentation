---
title: "Service Checks Submission: DogStatsD"
kind: documentation
description: Overview of the features of DogStatsD, including data types and tagging.
further_reading:
- link: "/developers/dogstatsd/"
  tag: "Documentation"
  text: "Introduction to DogStatsD"
- link: "/developers/community/libraries/"
  tag: "Documentation"
  text: "Official and Community created API and DogStatsD client libraries"
- link: "https://github.com/DataDog/datadog-agent/tree/main/pkg/dogstatsd"
  tag: "GitHub"
  text: "DogStatsD source code"
---

While StatsD accepts only metrics, DogStatsD accepts all three of the major Datadog data types: metrics, events, and service checks. This section shows typical use cases for service checks with code examples.

## Function

After [installing DogStatsD][1], you can send service checks to Datadog with the following function:

```text
service_check(<SERVICE_CHECK_NAME>, <STATUS>, <TAGS>, <HOSTNAME>, <MESSAGE>)
```

Service check function parameters:

| Parameter              | Type            | Required | Default Value | Description                                                                                                |
|------------------------|-----------------|----------|---------------|------------------------------------------------------------------------------------------------------------|
| `<SERVICE_CHECK_NAME>` | String          | Yes      | -             | The name of the service check.                                                                             |
| `<STATUS>`             | Int             | Yes      | -             | A constant describing the service status: `0` for OK, `1` for WARN, `2` for CRITICAL, and `3` for UNKNOWN. |
| `<TAGS>`               | List of key:value pairs | No       | -             | A list of tags to associate with the service check.                                                        |
| `<HOSTNAME>`           | String          | No       | Current host  | The hostname to associate with the service check.                                                          |
| `<MESSAGE>`            | String          | No       | -             | Additional information or a description of why the status occurred.                                        |

### Code examples

Run the following code to submit a service check through DogStatsD to Datadog. Remember to `flush`/`close` the client when it is no longer needed.

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,php" >}}

{{< programming-lang lang="python" >}}
```python
from datadog import initialize, statsd

options = {"statsd_host": "127.0.0.1", "statsd_port": 8125}

initialize(**options)

statsd.service_check(
    check_name="application.service_check",
    status="0",
    message="Application is OK",
)
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

statsd.service_check('application.service_check', 0, {'message' => 'Application is OK'})
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
        dogstatsdClient.SimpleServiceCheck("application.service_check", 0)
        time.Sleep(10 * time.Second)
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
```java
import com.timgroup.statsd.ServiceCheck;
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd").
            .hostname("localhost")
            .port(8125)
            .build();

        ServiceCheck sc = ServiceCheck.builder()
                          .withName("Service.check.name")
                          .withStatus(ServiceCheck.Status.OK)
                          .build();

        Statsd.serviceCheck(sc);
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
            if (!dogStatsdService.Configure(dogstatsdConfig))
                throw new InvalidOperationException("Cannot initialize DogstatsD. Set optionalExceptionHandler argument in the `Configure` method for more information.");
            dogStatsdService.ServiceCheck("Service.check.name", 0, message: "Application is OK.", tags: new[] { "env:dev" });
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

$statsd->service_check('Service.check.name', 0);
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

After a service check is reported, use it to trigger a [service check monitor][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/dogstatsd/
[2]: /monitors/types/service_check/
