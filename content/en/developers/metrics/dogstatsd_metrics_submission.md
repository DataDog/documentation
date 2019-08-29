---
title: Metric submission with DogStatsD
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

While StatsD accepts only metrics, DogStatsD accepts all three of the major Datadog data types: metrics, events, and Service Checks. This section shows typical use cases for Metrics split down by metric types, and introduces [Sampling Rate](#sample-rates) and [Metrics tagging](#metrics-tagging) options which are specific to DogStatsD.

[Count](#count), [Gauge](#gauge), and [Set](#set) metric types are familiar to StatsD users. Histograms are specific to DogStatsD. Timers, which exist in StatsD, are a sub-set of histograms in DogStatsD. Additionally you can also submit [Histogram](#histogram) and [Distribution](#distribution) metric types using DogStatsD.

**Note**: Depending of the submission method used, the submission metric type and the actual metric type stored within Datadog might differ

After having [installed DogStatsD][1], find below the functions available to submit your metrics to Datadog depending of their metric type.

## Count

| Method                                       | Description                                               | Storage type                                                                                                                                             |
| :-----                                       | :-------                                                  | :---                                                                                                                                                     |
| `increment(MetricName, SampleRate, Tags)`    | Used to increment a count metric.                         | Stored as a `RATE` type in Datadog. Each value in the stored timeseries is a time-normalized delta of the counter's value over that StatsD flush period. |
| `decrement(MetricName, SampleRate, Tags)`    | Used to decrement a count metric.                         | Stored as a `RATE` type in Datadog. Each value in the stored timeseries is a time-normalized delta of the counter's value over that StatsD flush period. |
| `count(MetricName, Value, SampleRate, Tags)` | Use to increment a count metric from an arbitrary `Value` | Stored as a `RATE` type in Datadog. Each value in the stored timeseries is a time-normalized delta of the counter's value over that StatsD flush period. |

with the following parameters:

| Parameter    | Type            | Required | Description                                                                                                                                                                |
| --------     | -------         | -----    | ----------                                                                                                                                                                 |
| `MetricName` | String          | yes      | Name of the metric to submit.                                                                                                                                              |
| `Value`      | Double          | yes      | Value associated to your metric.                                                                                                                                           |
| `SampleRate` | Double          | no       | Sample rate, between `0` (no sample) and `1` (all datapoints are dropped), to apply to this particular metric. See the [Sample Rate section](#sample-rates) to learn more. |
| `Tags`       | List of Strings | no       | List of Tags to apply to this particular metric. See the [Metrics Tagging](#metrics-tagging) section to learn more.                                                        |

Note: Count type metrics can show a decimal value within Datadog since they are normalized over the flush interval to report a per-second units.

Find below short code snippets depending of your language that you can run to emit a `COUNT` metric type-stored as `RATE` metric type-into Datadog. Learn more about the [`COUNT` type in the metric types documentation][2].

{{< tabs >}}
{{% tab "Python" %}}

After having [setup DogStatsD on your host][1] run the following code to submit a DogStatsD `COUNT` metric type:

```python
from datadog import initialize, statsd
import time

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

while(1):
  statsd.increment('example_metric.increment')
  statsd.decrement('example_metric.decrement')
  time.sleep(10)
```

[1]: /developers/dogstatsd/?tab=python#setup
{{% /tab %}}
{{% tab "Ruby" %}}

After having [setup DogStatsD on your host][1] run the following code to submit a DogStatsD `COUNT` metric type:

```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

while true do
    statsd.increment('example_metric.increment')
    statsd.decrement('example_metric.decrement')
    statsd.count('example_metric.count', 2)
    sleep 10
end
```

[1]: /developers/dogstatsd/?tab=ruby#setup
{{% /tab %}}
{{% tab "Go" %}}

After having [setup DogStatsD on your host][1] run the following code to submit a DogStatsD `COUNT` metric type:

```go
package main

import (
	"log"
	"time"
	"github.com/DataDog/datadog-go/statsd"
)

func main() {
	dogstatsd_client, err := statsd.New("127.0.0.1:8125")
	if err != nil {
    		log.Fatal(err)
	}
	for {
		  dogstatsd_client.Incr("example_metric.increment", []string{}, 0.0)
  		dogstatsd_client.Decr("example_metric.decrement", []string{}, 0.0)
  		dogstatsd_client.Count("example_metric.count", 2, []string{}, 0.0)
  		time.Sleep(10)
	}
}
```

[1]: /developers/dogstatsd/?tab=go#setup
{{% /tab %}}
{{% tab "Java" %}}

After having [setup DogStatsD on your host][1] run the following code to submit a DogStatsD `COUNT` metric type:

```java
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("statsd", "localhost", 8125);
        for (int i = 0; i < 10; i++) {
            Statsd.incrementCounter("example_metric.increment");
            Statsd.decrementCounter("example_metric.decrement");
            Statsd.count("example_metric.count", 2);
            Thread.sleep(1000);
        }
    }
}
```

[1]: /developers/dogstatsd/?tab=java#setup
{{% /tab %}}
{{% tab ".NET" %}}

After having [setup DogStatsD on your host][1] run the following code to submit a DogStatsD `COUNT` metric type:

[1]: /developers/dogstatsd/?tab=net#setup
{{% /tab %}}
{{% tab "PHP" %}}

After having [setup DogStatsD on your host][1] run the following code to submit a DogStatsD `COUNT` metric type:

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
    $statsd->increment('example_metric.increment');
    $statsd->decrement('example_metric.decrement');
    sleep(10);
}
```

[1]: /developers/dogstatsd/?tab=php#setup
{{% /tab %}}
{{< /tabs >}}

After running the code above, your metrics data is available to graph in Datadog:

{{< img src="developers/metrics/dogstatsd_metrics_submission/increment_decrement.png" alt="Increment Decrement" responsive="true">}}

Since the value is submitted as a `COUNT` it's stored as `RATE` in Datadog. To get raw counts within Datadog, apply a function to your series such as [the Cumulative Sum function][3] or [the Integral function][4]:

{{< img src="developers/metrics/dogstatsd_metrics_submission/increment_decrement_cumsum.png" alt="Increment Decrement with Cumsum" responsive="true">}}

## Gauge

| Method | Datadog Storage type |
| :----- | :------- |
|`gauge(MetricName, Value, SampleRate, Tags)`| Stored as a `GAUGE` type in Datadog. Each value in the stored timeseries is the last gauge value submitted for that metric during the StatsD flush period.|

with the following parameter:

| Parameter    | Type            | Description                                                                                                                                                                |
| --------     | -------         | ----------                                                                                                                                                                 |
| `MetricName` | String          | Name of the metric to submit.                                                                                                                                              |
| `Value`      | Double          | Value associated to your metric. Only used with the `count()` function.                                                                                                                                           |
| `SampleRate` | Double          | Sample rate, between `0` (no sample) and `1` (all datapoints are dropped), to apply to this particular metric. See the [Sample Rate section](#sample-rates) to learn more. |
| `Tags`       | List of Strings | List of Tags to apply to this particular metric. See the [Metrics Tagging](#metrics-tagging) section to learn more.                                                        |

Find below short code snippets depending of your language that you can run to emit a `GAUGE` metric type-stored as `GAUGE` metric type-into Datadog. Learn more about the [`GAUGE` type in the metric types documentation][5].

{{< tabs >}}
{{% tab "Python" %}}

After having [setup DogStatsD on your host][1] run the following code to submit a DogStatsD `GAUGE` metric type into Datadog:

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
  statsd.gauge('example_metric.gauge', i )
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
    statsd.gauge('example_metric.gauge', i)
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
	dogstatsd_client, err := statsd.New("127.0.0.1:8125")
	if err != nil {
    		log.Fatal(err)
	}
	var i float64
	for {
		i += 1
		dogstatsd_client.Gauge("example_metric.gauge", i, []string{}, 0.0)
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
            Statsd.recordGaugeValue("example_metric.gauge", i);
            Thread.sleep(1000);
        }
    }
}
```

{{% /tab %}}
{{% tab ".NET" %}}

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
    $statsd->gauge('example_metric.gauge', $i);
    sleep(10);
}
```

{{% /tab %}}
{{< /tabs >}}

After running the code above, your metric data is available to graph in Datadog:

{{< img src="developers/metrics/dogstatsd_metrics_submission/gauge.png" alt="Gauge" responsive="true">}}

## Set

|Method | Datadog Storage type |
|:---|:---|
|`set(MetricName, Value, SampleRate, Tags)`| Stored as `GAUGE` type in Datadog. Each value in the stored timeseries is the count of unique values submitted to StatsD for a metric over that flush period.|

with the following parameter:

| Parameter    | Type            | Description                                                                                                                                                                |
| --------     | -------         | ----------                                                                                                                                                                 |
| `MetricName` | String          | Name of the metric to submit.                                                                                                                                              |
| `Value`      | Double          | Value associated to your metric.                                                                                                                                           |
| `SampleRate` | Double          | Sample rate, between `0` (no sample) and `1` (all datapoints are dropped), to apply to this particular metric. See the [Sample Rate section](#sample-rates) to learn more. |
| `Tags`       | List of Strings | List of Tags to apply to this particular metric. See the [Metrics Tagging](#metrics-tagging) section to learn more.                                                        |

Find below short code snippets depending of your language that you can run to emit a `SET` metric type-stored as `GAUGE` metric type-into Datadog. Learn more about the [`SET` type in the metric types documentation][6].

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
  statsd.set('example_metric.set', random.randint(0, 10))
  time.sleep(10)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

while true do
    statsd.set('example_metric.gauge', rand 10)
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
  "math/rand"
  "strconv"
	"github.com/DataDog/datadog-go/statsd"
)

func main() {
	dogstatsd_client, err := statsd.New("127.0.0.1:8125")
	if err != nil {
    		log.Fatal(err)
  }

	for {
		dogstatsd_client.Set("example_metric.set", strconv.Itoa(rand.Intn(10)), []string{}, 0.0)
  	time.Sleep(10)
	}
}
```

{{% /tab %}}
{{% tab ".NET" %}}

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
    $statsd->set('example_metric.set', rand(0, 10));
    sleep(10);
}
```

{{% /tab %}}
{{< /tabs >}}

With this code, the data is available to graph in Datadog. Here's an example:

TO DO: Run the script and add a screenshoot

## Histogram

| Method             | Datadog Storage type                                                                                  |
| :---               | :---                                                                                      |
| `histogram(MetricName, Value, SampleRate, Tags)` | Since multiple metrics are submitted, metric types stored depend of the metric. The two types stored are `GAUGE`, `Rate` See the [histogram metric type][7] documentation to learn more. |

with the following parameter:

| Parameter    | Type            | Description                                                                                                                                                                |
| --------     | -------         | ----------                                                                                                                                                                 |
| `MetricName` | String          | Name of the metric to submit.                                                                                                                                              |
| `Value`      | Double          | Value associated to your metric.                                                                                                                                           |
| `SampleRate` | Double          | Sample rate, between `0` (no sample) and `1` (all datapoints are dropped), to apply to this particular metric. See the [Sample Rate section](#sample-rates) to learn more. |
| `Tags`       | List of Strings | List of Tags to apply to this particular metric. See the [Metrics Tagging](#metrics-tagging) section to learn more.                                                        |

Histograms are specific to DogStatsD. Find below short code snippets depending of your language that you can run to emit a `HISTOGRAM` metric type-stored as `GAUGE` and `RATE` metric types-into Datadog. Learn more about the [`HISTOGRAM` type in the metric types documentation][7].

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
  statsd.histogram('example_metric.histogram', random.randint(0, 10))
  time.sleep(10)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

while true do
    statsd.set('example_metric.histogram', rand 10)
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
	"math/rand"
	"github.com/DataDog/datadog-go/statsd"
)

func main() {
	dogstatsd_client, err := statsd.New("127.0.0.1:8125")
	if err != nil {
    		log.Fatal(err)
  }

	for {
		dogstatsd_client.Histogram("example_metric.histogram", rand.Intn(10), []string{}, 0.0)
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
            Statsd.recordHistogramValue("example_metric.histogram", new Random().nextInt(10));
            Thread.sleep(1000);
        }
    }
}
```

{{% /tab %}}
{{% tab ".NET" %}}

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
    $statsd->histogram('example_metric.histogram', rand(0, 10));
    sleep(10);
}
```

{{% /tab %}}
{{< /tabs >}}

The above instrumentation produces the following metrics:

| Metric                               | Description                               |
| ------------------------------------ | ----------------------------------------- |
| `example_metric.histogram.count`          | Number of times this metric was sampled   |
| `example_metric.histogram.avg`            | Average time of the sampled values        |
| `example_metric.histogram.median`         | Median sampled value                      |
| `example_metric.histogram.max`            | Maximum sampled value                     |
| `example_metric.histogram.95percentile`   | 95th percentile sampled value             |

And the data is available to graph in Datadog. Here's an example:

TO DO: Run the script and add a screenshoot

### Timers

Timers in DogStatsD are an implementation of Histograms (not to be confused with timers in the standard StatsD). They measure timing data only: for example, the amount of time a section of code takes to execute. Choose your language below to see how to implement them according to your needs:

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

@statsd.timed('example_metric.timer')
def my_function():
  time.sleep(random.randint(0, 10))
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
  with statsd.timed('example_metric.timer'):
    # do something to be measured
    sleep(random.randint(0, 10))
```

{{% /tab %}}
{{< /tabs >}}

In either case, as DogStatsD receives the timer data, it calculates the statistical distribution of render times and sends the following metrics to Datadog:

| Metric                               | Description                               |
| ------------------------------------ | ----------------------------------------- |
| `example_metric.histogram.count`          | Number of times this metric was sampled   |
| `example_metric.histogram.avg`            | Average time of the sampled values        |
| `example_metric.histogram.median`         | Median sampled value                      |
| `example_metric.histogram.max`            | Maximum sampled value                     |
| `example_metric.histogram.95percentile`   | 95th percentile sampled value             |

Remember: under the hood, DogStatsD treats timers as histograms. Whether you use timers or histograms, you are sending the same data to Datadog.

## Distribution

**This feature is in BETA. [Contact Datadog support][8] for details on how to have it enabled for your account.**

| Method | Datadog Storage type |
| :----- | :------- |
| `distribution(MetricName, Value, Tags)` | Stored as a `Distribution` type in Datadog. See the dedicated [Distribution documentation][9] to learn more. |

with the following parameter:

| Parameter    | Type            | Description                                                                                                                                                                |
| --------     | -------         | ----------                                                                                                                                                                 |
| `MetricName` | String          | Name of the metric to submit.                                                                                                                                              |
| `Value`      | Double          | Value associated to your metric.                                                                                                                                           |
| `SampleRate` | Double          | Sample rate, between `0` (no sample) and `1` (all datapoints are dropped), to apply to this particular metric. See the [Sample Rate section](#sample-rates) to learn more. |
| `Tags`       | List of Strings | List of Tags to apply to this particular metric. See the [Metrics Tagging](#metrics-tagging) section to learn more.                                                        |

Distributoins are specific to DogStatsD. Find below short code snippets depending of your language that you can run to emit a `DISTRIBUTION` metric type-stored as `DISTRIBUTION` metric type-into Datadog. Learn more about the [`DISTRIBUTION` type in the metric types documentation][10].

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
  statsd.distribution('example_metric.distribution', random.randint(0, 10))
  time.sleep(10)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

while true do
    statsd.distribution('example_metric.gauge', rand 10)
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
	"math/rand"
	"github.com/DataDog/datadog-go/statsd"
)

func main() {
	dogstatsd_client, err := statsd.New("127.0.0.1:8125")
	if err != nil {
    		log.Fatal(err)
	}

	for {
		dogstatsd_client.Distribution("example_metric.distribution", rand.Intn(10), []string{}, 0.0)
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
            Statsd.recordDistributionValue("example_metric.gauge", new Random().nextInt(10));
            Thread.sleep(1000);
        }
    }
}
```

{{% /tab %}}
{{% tab ".NET" %}}

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
    $statsd->distribution('example_metric.distribution', rand(0, 10));
    sleep(10);
}
```

{{% /tab %}}
{{< /tabs >}}

The data is now available to graph in Datadog:


The above instrumentation calculates the following data: `sum`, `count`, `average`, `minimum`, `maximum`, `50th percentile` (median), `75th percentile`, `90th percentile`, `95th percentile` and `99th percentile`. Distributions are not only for measuring times. They can be used to measure the distribution of *any* type of value, such as the size of uploaded files, or classroom test scores, for example.

## Metric Submission options

### Sample rates

Since the overhead of sending UDP packets can be too great for some performance intensive code paths, DogStatsD clients support sampling, i.e. only sending metrics a percentage of the time. It's not useful in all cases, but can be interesting if you sample many metrics, and your DogStatsD client is not on the same host as the DogStatsD server. This is a trade off: you decrease traffic but slightly lose in precision/granularity.

Before sending the metric to Datadog, DogStatsD uses the `sample_rate` to correct the metric value depending of the metric type, i.e. to estimate what it would have been without sampling:

| Metric Type | Sample rate correction |
| ----------- | ----------------- |
| `Count` | Values received are multiplied by (1/sample_rate), because it's reasonable to suppose in most cases that for 1 datapoint received, `1/sample_rate` were actually sampled with the same value. |
| `Gauge` | No correction. The value received is kept as it is. |
| `Set` | Bo correction. The value received is kept as it is. |
| `Histogram` | The `histogram.count` statistic is a counter metric, and receives the correction outlined above. Other statistics are gauge metrics and aren't "corrected." |

See the [Datadog Agent aggregation code][11] to learn more about this behavior.

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


{{% /tab %}}
{{% tab "Java" %}}

{{% /tab %}}
{{% tab ".NET" %}}

{{% /tab %}}
{{% tab "PHP" %}}

{{% /tab %}}
{{% tab "C++" %}}

{{% /tab %}}
{{< /tabs >}}

### Metrics Tagging

Add tags to any metric you send to DogStatsD with the `tags` parameter:

{{< tabs >}}
{{% tab "Python" %}}

{{% /tab %}}
{{% tab "Ruby" %}}

{{% /tab %}}
{{% tab "Go" %}}


{{% /tab %}}
{{% tab "Java" %}}

{{% /tab %}}
{{% tab ".NET" %}}

{{% /tab %}}
{{% tab "PHP" %}}

{{% /tab %}}
{{% tab "C++" %}}

{{% /tab %}}
{{< /tabs >}}

#### Host tag key

The host tag is assigned automatically by the Datadog Agent aggregating the metrics. Metrics submitted with a host tag not matching the Agent hostname lose reference to the original host. The host tag submitted overrides any hostname collected by or configured in the Agent.

**Note**: Because of the global nature of Distributions, extra tools for tagging are provided. See the [Distribution Metrics][12] page for more details.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: /developers/dogstatsd
[2]: /developers/metrics/metrics_type/?tab=count#metric-type-definition
[3]: /graphing/functions/arithmetic/#cumulative-sum
[4]: /graphing/functions/arithmetic/#integral
[5]: /developers/metrics/metrics_type/?tab=gauge#metric-type-definition
[6]: /developers/metrics/metrics_type/?tab=set#metric-type-definition
[7]: /developers/metrics/metrics_type/?tab=histogram#metric-type-definition
[8]: /help
[9]: /graphing/metrics/distributions
[10]: /developers/metrics/metrics_type/?tab=distribution#metric-type-definition
[11]: https://github.com/DataDog/dd-agent/blob/master/aggregator.py
[12]: /graphing/metrics/distributions
