---
title: "Service Checks Submission: DogStatsD"
kind: documentation
description: Overview of the features of DogStatsD, including data types and tagging.
disable_toc: true
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

While StatsD accepts only metrics, DogStatsD accepts all three of the major Datadog data types: metrics, events, and service checks. This section shows typical use cases for service checks with code examples.

## Function

After [installing DogStatsD][1], you can send service checks to Datadog with the following function:

```
service_check("<SERVICE_CHECK_NAME>", <STATUS>, "<TAGS>", "<HOSTNAME>", "<MESSAGE>")
```

Service check function parameters:

| Parameter              | Type            | Required | Default Value | Description                                                                                                |
|------------------------|-----------------|----------|---------------|------------------------------------------------------------------------------------------------------------|
| `<SERVICE_CHECK_NAME>` | String          | Yes      | -             | The name of the service check.                                                                             |
| `<STATUS>`             | Int             | Yes      | -             | A constant describing the service status: `0` for OK, `1` for WARN, `2` for CRITICAL, and `3` for UNKNOWN. |
| `<TAGS>`               | List of strings | No       | -             | A list of tags to associate with the service check.                                                        |
| `<HOSTNAME>`           | String          | No       | Current host  | The hostname to associate with the service check.                                                          |
| `<MESSAGE>`            | String          | No       | -             | Additional information or a description of why the status occurred.                                        |

### Code examples

Choose your language for a service check code example:

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, statsd

options = {"statsd_host": "127.0.0.1", "statsd_port": 8125}

initialize(**options)

statsd.service_check(
    name="application.service_check",
    status=O,
    message="Application is OK",
)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

statsd.service_check('application.service_check', 0, {'message' => 'Application is OK'})
```

{{% /tab %}}
{{% tab "Go" %}}

```go
package main

import (
    "log"
    "github.com/DataDog/datadog-go/statsd"
    "time"
)

func main() {

    dogstatsd_client, err: = statsd.New("127.0.0.1:8125")

    if err != nil {
        log.Fatal(err)
    }

    dogstatsd_client.ServiceCheck("application.service_check", 0,
        time.Time, []string{}, []string{
            "Application is OK"
        }, []string{
            "env:dev"
        })
}
```

{{% /tab %}}
{{% tab "Java" %}}

```java
import com.timgroup.statsd.ServiceCheck;
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("statsd", "localhost", 8125);

        ServiceCheck sc = ServiceCheck.builder()
                          .withName("Service.check.name")
                          .withStatus(ServiceCheck.Status.OK)
                          .build();

        Statsd.serviceCheck(sc);
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

        DogStatsd.ServiceCheck("Service.check.name", 0, message: "Application is OK." , tags: new[] { "env:dev" });
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

$statsd->service_check('Service.check.name', 0);
```

{{% /tab %}}
{{< /tabs >}}

After a service check is reported, use it to trigger a [custom check monitor][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/dogstatsd
[2]: /monitors/monitor_types/custom_check
