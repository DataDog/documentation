---
title: "Metric Submission: DogStatsD"
kind: documentation
description: Overview of the features of DogStatsD, including data types and tagging.
aliases:
  - /developers/faq/reduce-submission-rate
  - /developers/faq/why-is-my-counter-metric-showing-decimal-values
  - /developers/faq/dog-statsd-sample-rate-parameter-explained
further_reading:
- link: "developers/dogstatsd"
  tag: "Documentation"
  text: "Introduction to DogStatsD"
- link: "developers/metrics/metrics_type"
  tag: "Documentation"
  text: "Discover Datadog metric types."
---

While StatsD accepts only metrics, DogStatsD accepts all three of the major Datadog data types: metrics, events, and service checks. This section shows typical use cases for metrics split down by metric types, and introduces [sampling rates](#sample-rates) and [metric tagging](#metrics-tagging) options specific to DogStatsD.

[COUNT](#count), [GAUGE](#gauge), and [SET](#set) metric types are familiar to StatsD users. `TIMER` from StatsD is a sub-set of `HISTOGRAM` in DogStatsD. Additionally, you can submit [HISTOGRAM](#histogram) and [DISTRIBUTION](#distribution) metric types using DogStatsD.

**Note**: Depending on the submission method used, the actual metric type stored within Datadog might differ from the submission metric type.

## Functions

After [installing DogStatsD][1], the functions below are available for submitting your metrics to Datadog depending on their metric type.

### COUNT

| Method                                       | Description                                               | Storage type                                                                                                                                             |
|----------------------------------------------|-----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `increment(MetricName, SampleRate, Tags)`    | Used to increment a COUNT metric.                         | Stored as a `RATE` type in Datadog. Each value in the stored timeseries is a time-normalized delta of the counter's value over that StatsD flush period. |
| `decrement(MetricName, SampleRate, Tags)`    | Used to decrement a COUNT metric.                         | Stored as a `RATE` type in Datadog. Each value in the stored timeseries is a time-normalized delta of the counter's value over that StatsD flush period. |
| `count(MetricName, Value, SampleRate, Tags)` | Use to increment a COUNT metric from an arbitrary `Value` | Stored as a `RATE` type in Datadog. Each value in the stored timeseries is a time-normalized delta of the counter's value over that StatsD flush period. |

with the following parameters:

| Parameter    | Type            | Required | Description                                                                                                                                                                |
|--------------|-----------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `MetricName` | String          | yes      | Name of the metric to submit.                                                                                                                                              |
| `Value`      | Double          | yes      | Value associated to your metric.                                                                                                                                           |
| `SampleRate` | Double          | no       | Sample rate, between `0` (no sample) and `1` (all datapoints are dropped), to apply to this particular metric. See the [Sample Rate section](#sample-rates) to learn more. |
| `Tags`       | List of strings | no       | List of Tags to apply to this particular metric. See the [Metrics Tagging](#metrics-tagging) section to learn more.                                                        |

Note: COUNT type metrics can show a decimal value within Datadog since they are normalized over the flush interval to report a per-second units.

Find below short code snippets depending on your language that you can run to emit a COUNT metric type-stored as RATE metric type-into Datadog. Learn more about the [COUNT type in the metric types documentation][2].

{{< tabs >}}
{{% tab "Python" %}}

After having [setup DogStatsD on your host][1] run the following code to submit a DogStatsD COUNT metric type:

```python
from datadog import initialize, statsd
import time

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

while(1):
  statsd.increment('example_metric.increment', tags=["environment:dev"])
  statsd.decrement('example_metric.decrement', tags=["environment:dev"])
  time.sleep(10)
```

[1]: /developers/dogstatsd/?tab=python#setup
{{% /tab %}}
{{% tab "Ruby" %}}

After having [setup DogStatsD on your host][1] run the following code to submit a DogStatsD COUNT metric type:

```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

while true do
    statsd.increment('example_metric.increment', tags: ['environment:dev'])
    statsd.decrement('example_metric.decrement', tags: ['environment:dev'])
    statsd.count('example_metric.count', 2, tags: ['environment:dev'])
    sleep 10
end
```

[1]: /developers/dogstatsd/?tab=ruby#setup
{{% /tab %}}
{{% tab "Go" %}}

After having [setup DogStatsD on your host][1] run the following code to submit DogStatsD COUNT metrics type:

```go
package main

import (
    "log"
    "time"
    "github.com/DataDog/datadog-go/statsd"
)

func main() {
    statsd, err: = statsd.New("127.0.0.1:8125")
    if err != nil {
        log.Fatal(err)
    }
    for {

        statsd.Incr("example_metric.increment", [] string {"environment:dev"}, 0.0)
        statsd.Decr("example_metric.decrement", [] string {"environment:dev"}, 0.0)
        statsd.Count("example_metric.count", 2, [] string {"environment:dev"}, 0.0)
        time.Sleep(10)
    }
}
```

[1]: /developers/dogstatsd/?tab=go#setup
{{% /tab %}}
{{% tab "Java" %}}

After having [setup DogStatsD on your host][1] run the following code to submit DogStatsD COUNT metrics:

```java
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("statsd", "localhost", 8125);
        for (int i = 0; i < 10; i++) {
            Statsd.incrementCounter("example_metric.increment", ["environment:dev"]);
            Statsd.decrementCounter("example_metric.decrement", ["environment:dev"]);
            Statsd.count("example_metric.count", 2, ["environment:dev"]);
            Thread.sleep(100000);
        }
    }
}
```

[1]: /developers/dogstatsd/?tab=java#setup
{{% /tab %}}
{{% tab ".NET" %}}

After having [setup DogStatsD on your host][1] run the following code to submit DogStatsD COUNT metrics:

```csharp
using StatsdClient;
using System;

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

        var random = new Random(0);

        for (int i = 0; i < 10; i++)
        {
            DogStatsd.Increment("example_metric.increment", tags: new[] {"environment:dev"});
            DogStatsd.Decrement("example_metric.decrement", tags: new[] {"environment:dev"});
            DogStatsd.Counter("example_metric.count", 2, tags: new[] {"environment:dev"});
            System.Threading.Thread.Sleep(random.Next(100000));
        }
    }
}
```

[1]: /developers/dogstatsd/?tab=net#setup
{{% /tab %}}
{{% tab "PHP" %}}

After having [setup DogStatsD on your host][1] run the following code to submit a DogStatsD COUNT metric type:

```php
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('host' => '127.0.0.1',
          'port' => 8125,
     )
  );

while (TRUE) {
    $statsd->increment('example_metric.increment', array('environment'=>'dev'));
    $statsd->decrement('example_metric.decrement', array('environment'=>'dev'));
    sleep(10);
}
```

[1]: /developers/dogstatsd/?tab=php#setup
{{% /tab %}}
{{< /tabs >}}

After running the code above, your metrics data is available to graph in Datadog:

{{< img src="developers/metrics/dogstatsd_metrics_submission/increment_decrement.png" alt="Increment Decrement" responsive="true">}}

Since the value is submitted as a COUNT it's stored as RATE in Datadog. To get raw counts within Datadog, apply a function to your series such as [the Cumulative Sum function][3] or [the Integral function][4]:

{{< img src="developers/metrics/dogstatsd_metrics_submission/increment_decrement_cumsum.png" alt="Increment Decrement with Cumsum" responsive="true">}}

### GAUGE

| Method                                       | Datadog Storage type                                                                                                                                     |
|----------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `gauge(MetricName, Value, SampleRate, Tags)` | Stored as a GAUGE type in Datadog. Each value in the stored timeseries is the last gauge value submitted for that metric during the StatsD flush period. |

with the following parameter:

| Parameter    | Type            | Description                                                                                                                                                                |
|--------------|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `MetricName` | String          | Name of the metric to submit.                                                                                                                                              |
| `Value`      | Double          | Value associated to your metric. Only used with the `count()` function.                                                                                                    |
| `SampleRate` | Double          | Sample rate, between `0` (no sample) and `1` (all datapoints are dropped), to apply to this particular metric. See the [Sample Rate section](#sample-rates) to learn more. |
| `Tags`       | List of strings | List of Tags to apply to this particular metric. See the [Metrics Tagging](#metrics-tagging) section to learn more.                                                        |

Find below short code snippets depending on your language that you can run to emit a GAUGE metric type-stored as GAUGE metric type-into Datadog. Learn more about the [GAUGE type in the metric types documentation][5].

{{< tabs >}}
{{% tab "Python" %}}

After having [setup DogStatsD on your host][1] run the following code to submit a DogStatsD GAUGE metric type into Datadog:

```python
from datadog import initialize, statsd
import time

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

i = 0

while(1):
  i += 1
  statsd.gauge('example_metric.gauge', i, tags=["environment:dev"])
  time.sleep(10)
```

[1]: /developers/dogstatsd/?tab=python#setup
{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

i = 0

while true do
    i += 1
    statsd.gauge('example_metric.gauge', i, tags: ['environment:dev'])
    sleep 10
end
```

{{% /tab %}}
{{% tab "Go" %}}

```go
package main

import (
    "log"
    "time"
    "github.com/DataDog/datadog-go/statsd"
)

func main() {
    statsd, err: = statsd.New("127.0.0.1:8125")
    if err != nil {
        log.Fatal(err)
    }
    var i float64
    for {
        i += 1
        statsd.Gauge("example_metric.gauge", i, [] string {"environment:dev"}, 0.0)
        time.Sleep(10)
    }
}
```

{{% /tab %}}
{{% tab "Java" %}}

```java
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("statsd", "localhost", 8125);
        for (int i = 0; i < 10; i++) {
            Statsd.recordGaugeValue("example_metric.gauge", i, ["environment:dev"]);
            Thread.sleep(10000);
        }
    }
}
```

{{% /tab %}}
{{% tab ".NET" %}}

```csharp
using StatsdClient;
using System;

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

        var random = new Random(0);

        for (int i = 0; i < 10; i++)
        {
            DogStatsd.Gauge("example_metric.gauge", i, tags: new[] {"environment:dev"});
            System.Threading.Thread.Sleep(100000);
        }
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

$i = 0;
while (TRUE) {
    $i++;
    $statsd->gauge('example_metric.gauge', $i, array('environment'=>'dev'));
    sleep(10);
}
```

{{% /tab %}}
{{< /tabs >}}

After running the code above, your metric data is available to graph in Datadog:

{{< img src="developers/metrics/dogstatsd_metrics_submission/gauge.png" alt="Gauge" responsive="true">}}

### SET

| Method                                     | Datadog Storage type                                                                                                                                        |
|--------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `set(MetricName, Value, SampleRate, Tags)` | Stored as GAUGE type in Datadog. Each value in the stored timeseries is the count of unique values submitted to StatsD for a metric over that flush period. |

with the following parameter:

| Parameter    | Type            | Description                                                                                                                                                                |
|--------------|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `MetricName` | String          | Name of the metric to submit.                                                                                                                                              |
| `Value`      | String          | Value associated to your metric.                                                                                                                                           |
| `SampleRate` | Double          | Sample rate, between `0` (no sample) and `1` (all datapoints are dropped), to apply to this particular metric. See the [Sample Rate section](#sample-rates) to learn more. |
| `Tags`       | List of strings | List of Tags to apply to this particular metric. See the [Metrics Tagging](#metrics-tagging) section to learn more.                                                        |

Find below short code snippets depending on your language that you can run to emit a SET metric type-stored as GAUGE metric type-into Datadog. Learn more about the [SET type in the metric types documentation][6].

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, statsd
import time
import random

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)
i = 0
while(1):
  i += 1
  statsd.set('example_metric.set', i, tags=["environment:dev"])
  time.sleep(random.randint(0, 10))
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

i = 0
while true do
    i += 1
    statsd.set('example_metric.gauge', i, tags: ['environment:dev'])
    sleep rand 10
end
```

{{% /tab %}}
{{% tab "Go" %}}

```go
package main

import (
    "log"
    "time"
    "math/rand"
    "strconv"
    "github.com/DataDog/datadog-go/statsd"
)

func main() {
    statsd, err: = statsd.New("127.0.0.1:8125")
    if err != nil {
        log.Fatal(err)
    }
    var i float64
    for {
        i += 1
        statsd.Set("example_metric.set", strconv.Itoa(i), [] string {"environment:dev"}, 0.0)
        time.Sleep(rand.Intn(10))
    }
}
```

{{% /tab %}}
{{% tab ".NET" %}}

```csharp
using StatsdClient;
using System;

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

        var random = new Random(0);

        for (int i = 0; i < 10; i++)
        {
            DogStatsd.Set("example_metric.set", i, tags: new[] {"environment:dev"});
            System.Threading.Thread.Sleep(random.Next(100000));
        }
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

$i = 0;

while (TRUE) {
    $i++;
    $statsd->set('example_metric.set', i, array('environment'=>'dev'));
    sleep(rand(0, 10));
}
```

{{% /tab %}}
{{< /tabs >}}

After running the code above, your metrics data is available to graph in Datadog:

{{< img src="developers/metrics/dogstatsd_metrics_submission/set.png" alt="Set" responsive="true">}}

### HISTOGRAM

| Method                                           | Datadog Storage type                                                                                                                                                                 |
|--------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `histogram(MetricName, Value, SampleRate, Tags)` | Since multiple metrics are submitted, metric types stored depend of the metric. The two types stored are GAUGE, RATE See the [HISTOGRAM metric type][7] documentation to learn more. |

with the following parameter:

| Parameter    | Type            | Description                                                                                                                                                                |
|--------------|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `MetricName` | String          | Name of the metric to submit.                                                                                                                                              |
| `Value`      | Double          | Value associated to your metric.                                                                                                                                           |
| `SampleRate` | Double          | Sample rate, between `0` (no sample) and `1` (all datapoints are dropped), to apply to this particular metric. See the [Sample Rate section](#sample-rates) to learn more. |
| `Tags`       | List of strings | List of Tags to apply to this particular metric. See the [Metrics Tagging](#metrics-tagging) section to learn more.                                                        |

HISTOGRAM metric type is specific to DogStatsD. Find below short code snippets depending on your language that you can run to emit a HISTOGRAM metric type-stored as GAUGE and RATE metric types-into Datadog. Learn more about the [HISTOGRAM type in the metric types documentation][7].

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, statsd
import time
import random

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

while(1):
  statsd.histogram('example_metric.histogram', random.randint(0, 20), tags=["environment:dev"])
  time.sleep(2)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

while true do
    statsd.set('example_metric.histogram', rand 20, tags: ['environment:dev'])
    sleep 2
end
```

{{% /tab %}}
{{% tab "Go" %}}

```go
package main

import (
    "log"
    "time"
    "math/rand"
    "github.com/DataDog/datadog-go/statsd"
)

func main() {
    statsd, err: = statsd.New("127.0.0.1:8125")
    if err != nil {
        log.Fatal(err)
    }

    for {
        statsd.Histogram("example_metric.histogram", rand.Intn(20), [] string {
            "environment:dev"
        }, 0.0)
        time.Sleep(2)
    }
}
```

{{% /tab %}}
{{% tab "Java" %}}

```java
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("statsd", "localhost", 8125);
        for (int i = 0; i < 10; i++) {
            Statsd.recordHistogramValue("example_metric.histogram", new Random().nextInt(20), ["environment:dev"]);
            Thread.sleep(2000);
        }
    }
}
```

{{% /tab %}}
{{% tab ".NET" %}}

```csharp
using StatsdClient;
using System;

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

        var random = new Random(0);

        for (int i = 0; i < 10; i++)
        {
            DogStatsd.Histogram("example_metric.histogram", random.Next(20), tags: new[] {"environment:dev"});
            System.Threading.Thread.Sleep(2000);
        }
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

while (TRUE) {
    $statsd->histogram('example_metric.histogram', rand(0, 20), array('environment'=>'dev'));
    sleep(2);
}
```

{{% /tab %}}
{{< /tabs >}}

The above instrumentation produces the following metrics:

| Metric                                  | Description                             |
|-----------------------------------------|-----------------------------------------|
| `example_metric.histogram.count`        | Number of times this metric was sampled |
| `example_metric.histogram.avg`          | Average time of the sampled values      |
| `example_metric.histogram.median`       | Median sampled value                    |
| `example_metric.histogram.max`          | Maximum sampled value                   |
| `example_metric.histogram.95percentile` | 95th percentile sampled value           |

After running the code above, your metrics data is available to graph in Datadog:

{{< img src="developers/metrics/dogstatsd_metrics_submission/histogram.png" alt="Histogram" responsive="true">}}

**Note**:

* Configure which aggregation you want to send to Datadog with the `histogram_aggregates` parameter in your [datadog.yaml configuration file][8]. By default only `max`, `median`, `avg`, and `count` aggregations are sent out to Datadog.
* Configure which percentile aggregation you want to send to Datadog with the `histogram_percentiles` parameter in your [datadog.yaml configuration file][8]. By default only `95pc` percentile is sent out to Datadog.

#### TIMER

TIMER metric type in DogStatsD is an implementation of HISTOGRAM metric type (not to be confused with timers in the standard StatsD). It measure timing data only: for example, the amount of time a section of code takes to execute.

| Method                                       | Datadog Storage type                                                                                                                                                                     |
|----------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `timed(MetricName, Value, SampleRate, Tags)` | Since multiple metrics are submitted, metric types stored depend of the metric. The two types stored are GAUGE and RATE. See the [HISTOGRAM metric type][7] documentation to learn more. |

with the following parameter:

| Parameter    | Type            | Description                                                                                                                                                                |
|--------------|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `MetricName` | String          | Name of the metric to submit.                                                                                                                                              |
| `Value`      | Double          | Value associated to your metric.                                                                                                                                           |
| `SampleRate` | Double          | Sample rate, between `0` (no sample) and `1` (all datapoints are dropped), to apply to this particular metric. See the [Sample Rate section](#sample-rates) to learn more. |
| `Tags`       | List of strings | List of Tags to apply to this particular metric. See the [Metrics Tagging](#metrics-tagging) section to learn more.                                                        |

Find below short code snippets depending on your language that you can run to emit a TIMER metric type-stored as GAUGE and RATE metric types-into Datadog. Learn more about the [HISTOGRAM type in the metric types documentation][7].

{{< tabs >}}
{{% tab "Python" %}}

In Python, timers are created with a decorator:

```python
from datadog import initialize, statsd
import time
import random

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

@statsd.timed('example_metric.timer', tags=["environment:dev,function:my_function"])
def my_function():
  time.sleep(random.randint(0, 10))

while(1):
  my_function()
```

or with a context manager:

```python
from datadog import statsd
import time
import random

def my_function():

  # First some stuff you don't want to time
  sleep(1)

  # Now start the timer
  with statsd.timed('example_metric.timer', tags=["environment:dev"]):
    # do something to be measured
    sleep(random.randint(0, 10))

while(1):
  my_function()
```

{{% /tab %}}
{{< /tabs >}}

As DogStatsD receives the timer metric data, it calculates the statistical distribution of render times and sends the following metrics to Datadog:

| Metric                              | Description                             |
|-------------------------------------|-----------------------------------------|
| `example_metric.timer.count`        | Number of times this metric was sampled |
| `example_metric.timer.avg`          | Average time of the sampled values      |
| `example_metric.timer.median`       | Median sampled value                    |
| `example_metric.timer.max`          | Maximum sampled value                   |
| `example_metric.timer.95percentile` | 95th percentile sampled value           |

Under the hood, DogStatsD treats TIMER as HISTOGRAM. Whether you use TIMER or HISTOGRAM metric type, you are sending the same data to Datadog. After running the code above, your metrics data is available to graph in Datadog:

{{< img src="developers/metrics/dogstatsd_metrics_submission/timer.png" alt="Timer" responsive="true">}}

**Note**:

* Configure which aggregation you want to send to Datadog with the `histogram_aggregates` parameter in your [datadog.yaml configuration file][8]. By default only `max`, `median`, `avg`, and `count` aggregations are sent out to Datadog.
* Configure which percentile aggregation you want to send to Datadog with the `histogram_percentiles` parameter in your [datadog.yaml configuration file][8]. By default only `95pc` percentile is sent out to Datadog.


### DISTRIBUTION

**This feature is in BETA. [Contact Datadog support][9] for details on how to have it enabled for your account.**

| Method                                  | Datadog Storage type                                                                                        |
|-----------------------------------------|-------------------------------------------------------------------------------------------------------------|
| `distribution(MetricName, Value, Tags)` | Stored as a DISTRIBUTION type in Datadog. See the dedicated [Distribution documentation][10] to learn more. |

with the following parameter:

| Parameter    | Type            | Description                                                                                                                                                                |
|--------------|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `MetricName` | String          | Name of the metric to submit.                                                                                                                                              |
| `Value`      | Double          | Value associated to your metric.                                                                                                                                           |
| `SampleRate` | Double          | Sample rate, between `0` (no sample) and `1` (all datapoints are dropped), to apply to this particular metric. See the [Sample Rate section](#sample-rates) to learn more. |
| `Tags`       | List of strings | List of Tags to apply to this particular metric. See the [Metrics Tagging](#metrics-tagging) section to learn more.                                                        |

Distributions are specific to DogStatsD. Find below short code snippets depending on your language that you can run to emit a DISTRIBUTION metric type-stored as DISTRIBUTION metric type-into Datadog. Learn more about the [DISTRIBUTION type in the metric types documentation][11].

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, statsd
import time
import random

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

while(1):
  statsd.distribution('example_metric.distribution', random.randint(0, 20), tags=["environment:dev"])
  time.sleep(2)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

while true do
    statsd.distribution('example_metric.gauge', rand 20, tags: ['environment:dev'])
    sleep 2
end
```

{{% /tab %}}
{{% tab "Go" %}}

```go
package main

import (
    "log"
    "time"
    "math/rand"
    "github.com/DataDog/datadog-go/statsd"
)

func main() {
    statsd, err: = statsd.New("127.0.0.1:8125")
    if err != nil {
        log.Fatal(err)
    }

    for {
        statsd.Distribution("example_metric.distribution", rand.Intn(20), [] string {
            "environment:dev"
        }, 0.0)
        time.Sleep(2)
    }
}
```

{{% /tab %}}
{{% tab "Java" %}}

```java
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("statsd", "localhost", 8125);
        for (int i = 0; i < 10; i++) {
            Statsd.recordDistributionValue("example_metric.distribution", new Random().nextInt(20), ["environment:dev"]);
            Thread.sleep(2000);
        }
    }
}
```

{{% /tab %}}
{{% tab ".NET" %}}

```csharp
using StatsdClient;
using System;

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

        var random = new Random(0);

        for (int i = 0; i < 10; i++)
        {
            DogStatsd.Distribution("example_metric.distribution", random.Next(20), tags: new[] {"environment:dev"});
            System.Threading.Thread.Sleep(2000);
        }
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

while (TRUE) {
    $statsd->distribution('example_metric.distribution', rand(0, 20), array('environment'=>'dev'));
    sleep(2);
}
```

{{% /tab %}}
{{< /tabs >}}

The above instrumentation calculates the following data: `sum`, `count`, `average`, `minimum`, `maximum`, `50th percentile` (median), `75th percentile`, `90th percentile`, `95th percentile` and `99th percentile`. Distributions are not only for measuring times. They can be used to measure the distribution of *any* type of value, such as the size of uploaded files, or classroom test scores, for example.

## Metric submission options

### Sample rates

Since the overhead of sending UDP packets can be too great for some performance intensive code paths, DogStatsD clients support sampling, i.e. only sending metrics a percentage of the time. It's not useful in all cases, but can be interesting if you sample many metrics, and your DogStatsD client is not on the same host as the DogStatsD server. This is a trade off: you decrease traffic but slightly lose in precision/granularity.

A sample rate of `1` sends metrics 100% of the time, a sample rate of `0` sends metrics 0% of the time.

Before sending the metric to Datadog, DogStatsD uses the `sample_rate` to correct the metric value depending on the metric type, i.e. to estimate what it would have been without sampling:

| Metric Type | Sample rate correction                                                                                                                                                                        |
|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| COUNT       | Values received are multiplied by (1/sample_rate), because it's reasonable to suppose in most cases that for 1 datapoint received, `1/sample_rate` were actually sampled with the same value. |
| GAUGE       | No correction. The value received is kept as it is.                                                                                                                                           |
| SET         | Bo correction. The value received is kept as it is.                                                                                                                                           |
| HISTOGRAM   | The `histogram.count` statistic is a counter metric, and receives the correction outlined above. Other statistics are gauge metrics and aren't "corrected."                                   |

See the [Datadog Agent aggregation code][12] to learn more about this behavior.

The following code only sends points half of the time:

{{< tabs >}}
{{% tab "Python" %}}

```python
statsd.increment('loop.count', sample_rate=0.5)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
statsd.increment('loop.count', :sample_rate => 0.5)
```

{{% /tab %}}
{{% tab "Go" %}}

```go
statsd.Incr("example_metric.increment", []string{}, 0.5)
```

{{% /tab %}}
{{% tab "Java" %}}

```java
Statsd.incrementCounter("example_metric.increment", sampleRate=0.5);
```

{{% /tab %}}
{{% tab ".NET" %}}

```csharp
DogStatsd.Increment("example_metric.increment", sampleRate: 0.5);
```

{{% /tab %}}
{{% tab "PHP" %}}

```php
<? php
$statsd->increment('example_metric.increment', $sampleRate->0.5);
```
{{% /tab %}}
{{< /tabs >}}

### Metrics Tagging

Add tags to any metric you send to DogStatsD with the `tags` parameter. Find below examples according to your language to add the `environment:dev` tag to the `example_metric.increment` metric:

{{< tabs >}}
{{% tab "Python" %}}

```python
statsd.increment('example_metric.increment', tags=["environment:dev"])
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
statsd.increment('example_metric.increment', tags: ['environment:dev'])
```

You can also pass a Hash to Tag a metric:

```ruby
statsd.increment('example_metric.increment', :tags => {environment:dev})
```

{{% /tab %}}
{{% tab "Go" %}}

```go
statsd.Incr("example_metric.increment", []string{"environment:dev"}, 0.0)
```

{{% /tab %}}
{{% tab "Java" %}}

```java
Statsd.incrementCounter("example_metric.increment", ["environment:dev"]);
```

{{% /tab %}}
{{% tab ".NET" %}}

```csharp
DogStatsd.Increment("example_metric.increment", tags: new[] {"environment:dev"})
```

{{% /tab %}}
{{% tab "PHP" %}}

The `tags` argument can be a string:

```php
$statsd->increment('example_metric.increment', "environment:dev");
```

or an array:

```php
<?php
$statsd->increment('example_metric.increment', array('environment' => 'dev'));

```

{{% /tab %}}
{{< /tabs >}}

#### Host tag key

The host tag is assigned automatically by the Datadog Agent aggregating the metrics. Metrics submitted with a host tag not matching the Agent hostname lose reference to the original host. The host tag submitted overrides any hostname collected by or configured in the Agent.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: /developers/dogstatsd
[2]: /developers/metrics/metrics_type/?tab=count#metric-type-definition
[3]: /graphing/functions/arithmetic/#cumulative-sum
[4]: /graphing/functions/arithmetic/#integral
[5]: /developers/metrics/metrics_type/?tab=gauge#metric-type-definition
[6]: /developers/metrics/metrics_type/?tab=set#metric-type-definition
[7]: /developers/metrics/metrics_type/?tab=histogram#metric-type-definition
[8]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[9]: /help
[10]: /graphing/metrics/distributions
[11]: /developers/metrics/metrics_type/?tab=distribution#metric-type-definition
[12]: https://github.com/DataDog/dd-agent/blob/master/aggregator.py
