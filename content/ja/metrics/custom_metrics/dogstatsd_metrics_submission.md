---
title: "Metric Submission: DogStatsD"
description: "Submit custom metrics directly from your application."
aliases:
  - /developers/faq/reduce-submission-rate
  - /developers/faq/why-is-my-counter-metric-showing-decimal-values
  - /developers/faq/dog-statsd-sample-rate-parameter-explained
  - /developers/metrics/dogstatsd_metrics_submission/
  - /metrics/dogstatsd_metrics_submission
further_reading:
- link: /developers/dogstatsd/
  tag: Documentation
  text: Introduction to DogStatsD
- link: /metrics/types/
  tag: Documentation
  text: Datadog Metric Types
---

While StatsD accepts only metrics, DogStatsD accepts all three of the major Datadog data types: metrics, events, and service checks. This section shows typical use cases for metrics split down by metric types, and introduces [sampling rates](#sample-rates) and [metric tagging](#metric-tagging) options specific to DogStatsD.

[COUNT](#count), [GAUGE](#gauge), and [SET](#set) metric types are familiar to StatsD users. `TIMER` from StatsD is a sub-set of `HISTOGRAM` in DogStatsD. Additionally, you can submit [HISTOGRAM](#histogram) and [DISTRIBUTION](#distribution) metric types using DogStatsD.

**Note**: Depending on the submission method used, the actual metric type stored within Datadog might differ from the submission metric type. When submitting a RATE metric type through DogStatsD, the metric appears as a GAUGE in-app to ensure relevant comparison across different Agents.

## Functions

After you [install DogStatsD][1], the following functions are available for submitting your metrics to Datadog depending on their metric type. The functions have the following shared parameters:

| Parameter        | Type            | Required | Description                                                                                                                                                                                    |
|------------------|-----------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | String          | Yes      | Name of the metric to submit.                                                                                                                                                                  |
| `<METRIC_VALUE>` | Double          | Yes      | Value associated with your metric.                                                                                                                                                             |
| `<SAMPLE_RATE>`  | Double          | No       | The sample rate to apply to the metric. Takes a value between `0` (everything is sampled, so nothing is sent) and `1` (no sample). See the [Sample Rate section](#sample-rates) to learn more. |
| `<TAGS>`         | List of strings | No       | A list of tags to apply to the metric. See the [Metrics Tagging](#metric-tagging) section to learn more.                                                                                       |

### COUNT

`increment(<METRIC_NAME>, <SAMPLE_RATE>, <TAGS>)`
: Used to increment a COUNT metric. Stored as a `RATE` type in Datadog. Each value in the stored timeseries is a time-normalized delta of the metric's value over the StatsD flush period.

`decrement(<METRIC_NAME>, <SAMPLE_RATE>, <TAGS>)`
: Used to decrement a COUNT metric. Stored as a `RATE` type in Datadog. Each value in the stored timeseries is a time-normalized delta of the metric's value over the StatsD flush period.

`count(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)`
: Used to increment a COUNT metric from an arbitrary `Value`. Stored as a `RATE` type in Datadog. Each value in the stored timeseries is a time-normalized delta of the metric's value over the StatsD flush period.
: **Note:** `count` is not supported in Python.

**Note**: `COUNT` type metrics can show a decimal value within Datadog since they are normalized over the flush interval to report per-second units.

#### Code examples

Emit a `COUNT` metric-stored as a `RATE` metric-to Datadog. Learn more about the `COUNT` type in the [metric types][2] documentation.

Run the following code to submit a DogStatsD `COUNT` metric to Datadog. Remember to `flush`/`close` the client when it is no longer needed.

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,php,nodejs" >}}

{{< programming-lang lang="python" >}}
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

**Note:** `statsd.count` is not supported in Python.

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125, tags: ['environment:dev'])

while true do
    statsd.increment('example_metric.increment')
    statsd.increment('example_metric.increment', tags: ['another:tag'])
    statsd.decrement('example_metric.decrement')
    statsd.count('example_metric.count', 2)
    sleep 10
end
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
    statsd, err := statsd.New("127.0.0.1:8125")
    if err != nil {
        log.Fatal(err)
    }
    for true {

        statsd.Incr("example_metric.increment", []string{"environment:dev"}, 1)
        statsd.Decr("example_metric.decrement", []string{"environment:dev"}, 1)
        statsd.Count("example_metric.count", 2, []string{"environment:dev"}, 1)
        time.Sleep(10 * time.Second)
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
```java
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd")
            .hostname("localhost")
            .port(8125)
            .build();
        while (true) {
            Statsd.incrementCounter("example_metric.increment", new String[]{"environment:dev"});
            Statsd.decrementCounter("example_metric.decrement", new String[]{"environment:dev"});
            Statsd.count("example_metric.count", 2, new String[]{"environment:dev"});
            Thread.sleep(100000);
        }
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}
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

        using (var dogStatsdService = new DogStatsdService())
        {
            if (!dogStatsdService.Configure(dogstatsdConfig))
                throw new InvalidOperationException("Cannot initialize DogstatsD. Set optionalExceptionHandler argument in the `Configure` method for more information.");
            var random = new Random(0);

            while (true)
            {
                dogStatsdService.Increment("example_metric.increment", tags: new[] {"environment:dev"});
                dogStatsdService.Decrement("example_metric.decrement", tags: new[] {"environment:dev"});
                dogStatsdService.Counter("example_metric.count", 2, tags: new[] {"environment:dev"});
                System.Threading.Thread.Sleep(random.Next(100000));
            }
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

while (TRUE) {
    $statsd->increment('example_metric.increment', 1, array('environment'=>'dev'));
    $statsd->decrement('example_metric.decrement', 1, array('environment'=>'dev'));
    sleep(10);
}
```
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}
```javascript
const tracer = require('dd-trace');
tracer.init();

tracer.dogstatsd.increment('example_metric.increment', 1, { environment: 'dev' });
tracer.dogstatsd.decrement('example_metric.decrement', 1, { environment: 'dev' });
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

After running the code above, your metrics data is available to graph in Datadog:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/increment_decrement.png" alt="Increment Decrement" >}}

Since the value is submitted as a `COUNT` it's stored as `RATE` in Datadog. To get raw counts within Datadog, apply a function to your series such as the [Cumulative Sum][3] or [Integral][4] function:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/increment_decrement_cumsum.png" alt="Increment Decrement with Cumsum" >}}

### GAUGE

`gauge(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)`
: Stored as a `GAUGE` type in Datadog. Each value in the stored timeseries is the last gauge value submitted for the metric during the StatsD flush period.

#### Code examples

Emit a `GAUGE` metric-stored as a `GAUGE` metric-to Datadog. Learn more about the `GAUGE` type in the [metric types][5] documentation.

Run the following code to submit a DogStatsD `GAUGE` metric to Datadog. Remember to `flush`/`close` the client when it is no longer needed.

**Note:** Metrics submission calls are asynchronous. If you want to ensure metrics are submitted, call `flush` before the program exits.

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,php,nodejs" >}}

{{< programming-lang lang="python" >}}
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
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
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
    statsd, err := statsd.New("127.0.0.1:8125")
    if err != nil {
        log.Fatal(err)
    }
    var i float64
    for true {
        i += 1
        statsd.Gauge("example_metric.gauge", i, []string{"environment:dev"}, 1)
        time.Sleep(10 * time.Second)
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
```java
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd").
            .hostname("localhost")
            .port(8125)
            .build();
        for (int i = 0; true; i++) {
            Statsd.recordGaugeValue("example_metric.gauge", i, new String[]{"environment:dev"});
            Thread.sleep(10000);
        }
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}
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

        using (var dogStatsdService = new DogStatsdService())
        {
            if (!dogStatsdService.Configure(dogstatsdConfig))
                throw new InvalidOperationException("Cannot initialize DogstatsD. Set optionalExceptionHandler argument in the `Configure` method for more information.");
            var random = new Random(0);

            for (int i = 0; true; i++)
            {
                dogStatsdService.Gauge("example_metric.gauge", i, tags: new[] {"environment:dev"});
                System.Threading.Thread.Sleep(100000);
            }
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

$i = 0;
while (TRUE) {
    $i++;
    $statsd->gauge('example_metric.gauge', $i, array('environment'=>'dev'));
    sleep(10);
}
```
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}
```javascript
const tracer = require('dd-trace');
tracer.init();

let i = 0;
while(true) {
  i++;
  tracer.dogstatsd.gauge('example_metric.gauge', i, { environment: 'dev' });
}
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

After running the code above, your metric data is available to graph in Datadog:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/gauge.png" alt="Gauge" >}}

### SET

`set(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)`
: Stored as a `GAUGE` type in Datadog. Each value in the stored timeseries is the count of unique values submitted to StatsD for a metric over the flush period.

#### Code examples

Emit a `SET` metric-stored as a `GAUGE` metric-to Datadog.

Run the following code to submit a DogStatsD `SET` metric to Datadog. Remember to `flush`/`close` the client when it is no longer needed.

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,PHP" >}}

{{< programming-lang lang="python" >}}
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
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
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
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
```go
package main

import (
    "fmt"
    "log"
    "math/rand"
    "time"

    "github.com/DataDog/datadog-go/statsd"
)

func main() {
    statsd, err := statsd.New("127.0.0.1:8125")
    if err != nil {
        log.Fatal(err)
    }
    var i float64
    for true {
        i += 1
        statsd.Set("example_metric.set", fmt.Sprintf("%f", i), []string{"environment:dev"}, 1)
        time.Sleep(time.Duration(rand.Intn(10)) * time.Second)
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
```java
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd").
            .hostname("localhost")
            .port(8125)
            .build();
        for (int i = 0; true; i++) {
            Statsd.recordSetValue("example_metric.set", i, new String[]{"environment:dev"});
            Thread.sleep(random.NextInt(10000));
        }
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}
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

        using (var dogStatsdService = new DogStatsdService())
        {
            if (!dogStatsdService.Configure(dogstatsdConfig))
                throw new InvalidOperationException("Cannot initialize DogstatsD. Set optionalExceptionHandler argument in the `Configure` method for more information.");
            var random = new Random(0);

            for (int i = 0; true; i++)
            {
                dogStatsdService.Set("example_metric.set", i, tags: new[] {"environment:dev"});
                System.Threading.Thread.Sleep(random.Next(100000));
            }
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

$i = 0;

while (TRUE) {
    $i++;
    $statsd->set('example_metric.set', $i, array('environment'=>'dev'));
    sleep(rand(0, 10));
}
```
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

After running the code above, your metrics data is available to graph in Datadog:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/set.png" alt="Set" >}}

### HISTOGRAM

`histogram(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)`
: Since multiple metrics are submitted, metric types stored (`GAUGE`, `RATE`) depend on the metric. See the [HISTOGRAM metric type][6] documentation to learn more.

#### Configuration

* Configure the aggregation to send to Datadog with the `histogram_aggregates` parameter in your [datadog.yaml configuration file][7]. By default, only `max`, `median`, `avg`, and `count` aggregations are sent.
* Configure the percentile aggregation to send to Datadog with the `histogram_percentiles` parameter in your [datadog.yaml configuration file][7]. By default, only `95pc` percentile is sent.

#### Code examples

The `HISTOGRAM` metric type is specific to DogStatsD. Emit a `HISTOGRAM` metric—stored as a `GAUGE` and `RATE` metric—to Datadog. Learn more about the `HISTOGRAM` type in the [metric types][6] documentation.


Run the following code to submit a DogStatsD `HISTOGRAM` metric to Datadog. Remember to `flush`/`close` the client when it is no longer needed.

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,PHP" >}}

{{< programming-lang lang="python" >}}
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
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

while true do
    statsd.histogram('example_metric.histogram', rand 20, tags: ['environment:dev'])
    sleep 2
end
```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
```go
package main

import (
    "log"
    "math/rand"
    "time"

    "github.com/DataDog/datadog-go/statsd"
)

func main() {
    statsd, err := statsd.New("127.0.0.1:8125")
    if err != nil {
        log.Fatal(err)
    }

    for true {
        statsd.Histogram("example_metric.histogram", float64(rand.Intn(20)), []string{"environment:dev"}, 1)
        time.Sleep(2 * time.Second)
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
```java
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd").
            .hostname("localhost")
            .port(8125)
            .build();
        while (true) {
            Statsd.recordHistogramValue("example_metric.histogram", new Random().nextInt(20), new String[]{"environment:dev"});
            Thread.sleep(2000);
        }
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}
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

        using (var dogStatsdService = new DogStatsdService())
        {
            if (!dogStatsdService.Configure(dogstatsdConfig))
                throw new InvalidOperationException("Cannot initialize DogstatsD. Set optionalExceptionHandler argument in the `Configure` method for more information.");
            var random = new Random(0);

            while (true)
            {
                dogStatsdService.Histogram("example_metric.histogram", random.Next(20), tags: new[] {"environment:dev"});
                System.Threading.Thread.Sleep(2000);
            }
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

while (TRUE) {
    $statsd->histogram('example_metric.histogram', rand(0, 20), array('environment'=>'dev'));
    sleep(2);
}
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

The above instrumentation produces the following metrics:

| Metric                                  | Description                             |
|-----------------------------------------|-----------------------------------------|
| `example_metric.histogram.count`        | Number of times this metric was sampled |
| `example_metric.histogram.avg`          | Average of the sampled values           |
| `example_metric.histogram.median`       | Median sampled value                    |
| `example_metric.histogram.max`          | Maximum sampled value                   |
| `example_metric.histogram.95percentile` | 95th percentile sampled value           |

After running the code above, your metrics data is available to graph in Datadog:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/histogram.png" alt="Histogram" >}}

#### TIMER

`TIMER` metric type in DogStatsD is an implementation of `HISTOGRAM` metric type (not to be confused with timers in the standard StatsD). It measures timing data only: for example, the amount of time a section of code takes to execute.

`timed(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)`
: Since multiple metrics are submitted, metric types stored (`GAUGE`, `RATE`) depend on the metric. See the [HISTOGRAM metric type][6] documentation to learn more.

##### Configuration

For a `TIMER`, the `HISTOGRAM` [configuration](#configuration) rules apply.

##### Code examples

Emit a `TIMER` metric—stored as a `GAUGE` and `RATE` metric—to Datadog. Learn more about the `HISTOGRAM` type in the [metric types][6] documentation. Remember to `flush`/`close` the client when it is no longer needed.

{{< programming-lang-wrapper langs="python,PHP" >}}

{{< programming-lang lang="python" >}}

In Python, timers are created with a decorator.

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

function runfunction() {
    sleep(rand(0, 20));
}

while (TRUE) {
  $start_time = microtime(TRUE);
  runfunction();
  $statsd->microtiming('example_metric.timer', microtime(TRUE) - $start_time);
}
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

As DogStatsD receives the timer metric data, it calculates the statistical distribution of render times and sends the following metrics to Datadog:

| Metric                              | Description                             |
|-------------------------------------|-----------------------------------------|
| `example_metric.timer.count`        | Number of times this metric was sampled |
| `example_metric.timer.avg`          | Average time of the sampled values      |
| `example_metric.timer.median`       | Median sampled value                    |
| `example_metric.timer.max`          | Maximum sampled value                   |
| `example_metric.timer.95percentile` | 95th percentile sampled value           |

DogStatsD treats `TIMER` as a `HISTOGRAM` metric. Whether you use the `TIMER` or `HISTOGRAM` metric type, you are sending the same data to Datadog. After running the code above, your metrics data is available to graph in Datadog:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/timer.png" alt="Timer" >}}

### DISTRIBUTION

`distribution(<METRIC_NAME>, <METRIC_VALUE>, <TAGS>)`
: Stored as a `DISTRIBUTION` type in Datadog. See the dedicated [Distribution documentation][8] to learn more.

#### Code examples

The `DISTRIBUTION` metric type is specific to DogStatsD. Emit a `DISTRIBUTION` metric-stored as a `DISTRIBUTION` metric-to Datadog. Learn more about the `DISTRIBUTION` type in the [metric types][9] documentation.

Run the following code to submit a DogStatsD `DISTRIBUTION` metric to Datadog. Remember to `flush`/`close` the client when it is no longer needed.

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,php,nodejs" >}}

{{< programming-lang lang="python" >}}
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
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

while true do
    statsd.distribution('example_metric.gauge', rand 20, tags: ['environment:dev'])
    sleep 2
end
```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
```go
package main

import (
    "log"
    "math/rand"
    "time"

    "github.com/DataDog/datadog-go/statsd"
)

func main() {
    statsd, err := statsd.New("127.0.0.1:8125")
    if err != nil {
        log.Fatal(err)
    }

    for true {
        statsd.Distribution("example_metric.distribution", float64(rand.Intn(20)), []string{"environment:dev"}, 1)
        time.Sleep(2 * time.Second)
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
```java
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd").
            .hostname("localhost")
            .port(8125)
            .build();
        while (true) {
            Statsd.recordDistributionValue("example_metric.distribution", new Random().nextInt(20), new String[]{"environment:dev"});
            Thread.sleep(2000);
        }
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}
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

        using (var dogStatsdService = new DogStatsdService())
        {
            if (!dogStatsdService.Configure(dogstatsdConfig))
                throw new InvalidOperationException("Cannot initialize DogstatsD. Set optionalExceptionHandler argument in the `Configure` method for more information.");
            var random = new Random(0);

            while (true)
            {
                dogStatsdService.Distribution("example_metric.distribution", random.Next(20), tags: new[] {"environment:dev"});
                System.Threading.Thread.Sleep(2000);
            }
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

while (TRUE) {
    $statsd->distribution('example_metric.distribution', rand(0, 20), array('environment'=>'dev'));
    sleep(2);
}
```
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}
```javascript
const tracer = require('dd-trace');
tracer.init();

while(true) {
  tracer.dogstatsd.distribution('example_metric.distribution', Math.random() * 20, { environment: 'dev' });
  await new Promise(r => setTimeout(r, 2000));
}
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

The above instrumentation calculates the `sum`, `count`, `average`, `minimum`, `maximum`, `50th percentile` (median), `75th percentile`, `90th percentile`, `95th percentile` and `99th percentile`. Distributions can be used to measure the distribution of *any* type of value, such as the size of uploaded files, or classroom test scores.

## Metric submission options

### Sample rates

Since the overhead of sending UDP packets can be too great for some performance intensive code paths, DogStatsD clients support sampling (only sending metrics a percentage of the time). It's useful if you sample many metrics, and your DogStatsD client is not on the same host as the DogStatsD server. The trade off: you decrease traffic but lose some precision and granularity.

A sample rate of `1` sends metrics 100% of the time, while a sample rate of `0` sends metrics 0% of the time.

Before sending a metric to Datadog, DogStatsD uses the `<SAMPLE_RATE>` to correct the metric value depending on the metric type (to estimate the value without sampling):

| Metric Type    | Sample rate correction                                                                                                                                                         |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `COUNT`        | Values received are multiplied by (`1/<SAMPLE_RATE>`). It's reasonable to assume that for one datapoint received, `1/<SAMPLE_RATE>` were actually sampled with the same value. |
| `GAUGE`        | No correction. The value received is kept as is.                                                                                                                               |
| `SET`          | No correction. The value received is kept as is.                                                                                                                               |
| `HISTOGRAM`    | The `histogram.count` statistic is a COUNT metric, and receives the correction outlined above. Other statistics are gauge metrics and aren't "corrected".                      |
| `DISTRIBUTION` | Values received are counted (`1/<SAMPLE_RATE>`) times. It's reasonable to assume that for one datapoint received, `1/<SAMPLE_RATE>` were actually sampled with the same value. |

#### Code examples

The following code only sends points half of the time:

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,php" >}}

{{< programming-lang lang="python" >}}
```python
statsd.increment('loop.count', sample_rate=0.5)
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
```ruby
statsd.increment('loop.count', :sample_rate => 0.5)
```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
```go
statsd.Incr("example_metric.increment", []string{}, 0.5)
```
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
```java
Statsd.incrementCounter("example_metric.increment", sampleRate=0.5);
```
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}
```csharp
dogStatsdService.Increment("example_metric.increment", sampleRate: 0.5);
```
{{< /programming-lang >}}

{{< programming-lang lang="php" >}}
```php
<? php
$statsd->increment('example_metric.increment', $sampleRate->0.5);
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Metric tagging

Add tags to any metric you send to DogStatsD with the `tags` parameter.

#### Code examples

The following code only adds the `environment:dev` and `account:local` tags to the `example_metric.increment` metric:

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,php,nodejs" >}}

{{< programming-lang lang="python" >}}
```python
statsd.increment('example_metric.increment', tags=["environment:dev","account:local"])
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
```ruby
statsd.increment('example_metric.increment', tags: ['environment:dev','account:local'])
```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
```go
statsd.Incr("example_metric.increment", []string{"environment:dev","account:local"}, 1)
```
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
```java
Statsd.incrementCounter("example_metric.increment", new String[]{"environment:dev","account:local"});
```
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}
```csharp
dogStatsdService.Increment("example_metric.increment", tags: new[] {"environment:dev","account:local"})
```
{{< /programming-lang >}}

{{< programming-lang lang="php" >}}
The `tags` argument can be a string:

```php
$statsd->increment('example_metric.increment', "environment:dev,account:local");
```

or an array:
```php
<?php
$statsd->increment('example_metric.increment', array('environment' => 'dev', 'account' => 'local'));
```
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}
```javascript
tracer.dogstatsd.increment('example_metric.increment', 1, { environment: 'dev', account: 'local' });
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

#### Host tag

The host tag is assigned automatically by the Datadog Agent aggregating the metrics. Metrics submitted with a host tag not matching the Agent hostname lose reference to the original host. The submitted host tag overrides any hostname collected by or configured in the Agent.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/dogstatsd/
[2]: /metrics/types/?tab=count#definition
[3]: /dashboards/functions/arithmetic/#cumulative-sum
[4]: /dashboards/functions/arithmetic/#integral
[5]: /metrics/types/?tab=gauge#definition
[6]: /metrics/types/?tab=histogram#definition
[7]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[8]: /metrics/distributions/
[9]: /metrics/types/?tab=distribution#definition
