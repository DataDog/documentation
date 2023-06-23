---
aliases:
- /ko/developers/faq/reduce-submission-rate
- /ko/developers/faq/why-is-my-counter-metric-showing-decimal-values
- /ko/developers/faq/dog-statsd-sample-rate-parameter-explained
- /ko/developers/metrics/dogstatsd_metrics_submission/
- /ko/metrics/dogstatsd_metrics_submission
description: '애플리케이션에서 직접 커스텀 메트릭을 제출합니다. '
further_reading:
- link: /developers/dogstatsd/
  tag: 설명서
  text: DogStatsD 소개
- link: /metrics/types/
  tag: 설명서
  text: Datadog 메트릭 유형
kind: 설명서
title: '메트릭 제출: DogStatsD'
---

StatsD는 메트릭만 허용하지만, DogStatsD는 세 가지 주요 Datadog 데이터 유형인 메트릭, 이벤트 및 서비스 검사를 모두 허용합니다. 이 섹션에서는 메트릭 유형별 사용 사례를 보여주고, DogStatsD를 위한 [샘플링 속도](#sample-rates) 및 [메트릭 태깅](#metric-tagging) 옵션을 소개합니다.

[COUNT](#count), [GAUGE](#gauge) 및 [SET](#set) 메트릭 유형은 StatsD 사용자에게 익숙합니다. StatsD의 `TIMER` 는 DogStatsD의 `HISTOGRAM`의 하위 집합입니다. 또한 DogStatsD를 사용하여 [HISTOGRAM](#histogram) 및 [DISTRIBUTION](#distribution) 메트릭 유형을 제출할 수 있습니다.

**참고**: 사용된 제출 방법에 따라 Datadog에 저장된 실제 메트릭 유형은 제출 메트릭 유형과 다를 수 있습니다. DogStatsD를 통해 RATE 메트릭 유형을 제출하는 경우, 메트릭은 여러 에이전트 간에 관련성 있는 비교가 이루어질 수 있도록 인앱에서 GAUGE로 표시됩니다.

## 함수

[DogStatsD 설치][1]한 후, 메트릭 유형에 따라 다음 함수를 사용하여 Datadog에 메트릭을 제출할 수 있습니다. 함수에는 다음과 같이 공유된 파라미터가 있습니다:

| 파라미터        | 유형            | 필수 | 설명                                                                                                                                                                                    |
|------------------|-----------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | 스트링          | 예      | 제출할 메트릭 이름                                                                                                                                                                  |
| `<METRIC_VALUE>` | Double          | 예      | 메트릭과 연결된 값                                                                                                                                                             |
| `<SAMPLE_RATE>`  | Double          | 아니요       | 메트릭에 적용할 샘플 속도입니다. `0`(모든 것이 샘플링되므로, 아무것도 전송되지 않음)과 `1`(샘플 없음) 사이의 값을 취합니다. 자세한 내용은 [샘플 속도 섹션](#sample-rates)을 참조하세요. |
| `<TAGS>`         | 스트링 목록 | 아니요       | 메트릭에 적용할 태그 목록입니다. 자세한 내용은 [메트릭 태깅](#metric-tagging) 섹션을 참조하세요.                                                                                       |

### 개수

`increment(<METRIC_NAME>, <SAMPLE_RATE>, <TAGS>)`
: COUNT 메트릭을 증가시키는 데 사용됩니다. Datadog에 `RATE` 유형으로 저장됩니다. 저장된 시계열의 각 값은 StatsD 플러시 기간 동안 메트릭 값의 시간 정규화된 델타입니다.

`decrement(<METRIC_NAME>, <SAMPLE_RATE>, <TAGS>)`
: COUNT 메트릭을 감소시키는 데 사용됩니다. Datadog에 `RATE` 유형으로 저장됩니다. 저장된 시계열의 각 값은 StatsD 플러시 기간 동안 메트릭 값의 시간 정규화된 델타입니다.

`count(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)`
: 임의의 `Value`에서 COUNT 메트릭을 증가시키는 데 사용됩니다. Datadog에 `RATE` 유형으로 저장됩니다. 저장된 시계열의 각 값은 StatsD 플러시 기간 동안 메트릭 값의 시간 정규화된 델타입니다.
:**참고:** `count`는 파이썬(Python)에서는 지원되지 않습니다.

**참고**: `COUNT` 유형 메트릭은 초당 단위를 보고하기 위해 플러시 간격 동안 정규화되므로 Datadog 내에서 십진수 값을 표시할 수 있습니다.

#### 코드 예

`RATE` 메트릭으로 저장된 `COUNT` 메트릭을 Datadog에 내보냅니다. [메트릭 유형][2] 설명서에서 `COUNT` 유형에 대해 자세히 알아보세요.

다음 코드를 실행하여 DogStatsD `COUNT` 메트릭을 Datadog에 제출합니다. 더 이상 필요하지 않을 때 클라이언트를 `flush`/`close` 하는 것을 기억하세요. 

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,php" >}}

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

**참고:** `statsd.count`는 파이썬(Python)에서 지원되지 않습니다.

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
    for {

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
        for (int i = 0; i < 10; i++) {
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

            for (int i = 0; i < 10; i--)
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

{{< /programming-lang-wrapper >}}

위의 코드를 실행한 후, 메트릭 데이터를 Datadog에서 그래프로 사용할 수 있습니다:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/increment_decrement.png" alt="증가 감소" >}}

값이 `COUNT`로 제출되기 때문에 Datadog에는 `RATE`로 저장됩니다. Datadog 내에서 원시 카운트를 가져오려면 [Cumulative Sum][3] 또는 [Integral][4] 함수와 같은 함수를 시리즈에 적용합니다:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/increment_decrement_cumsum.png" alt="Cumsum 증가 감소" >}}

### 게이지

`gauge(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)`
: Datadog에 `GAUGE` 유형으로 저장됩니다. 저장된 시계열의 각 값은 StatsD 플러시 기간 동안 메트릭에 대해 제출된 마지막 게이지 값입니다.

#### 코드 예

`GAUGE` 메트릭으로 저장된 `GAUGE` 메트릭을 Datadog에 내보냅니다. [메트릭 유형][5] 설명서에서 `GAUGE` 유형에 대해 자세히 알아보세요.

다음 코드를 실행하여 DogStatsD `GAUGE` 메트릭을 Datadog에 제출합니다. 더 이상 필요하지 않을 때 클라이언트를 `flush`/`close` 하는 것을 기억하세요. 

**참고:** 메트릭 제출 호출은 비동기식입니다. 메트릭이 제출되었는지 확인하려면, 프로그램이 종료되기 전에 `flush`를 호출하세요. 

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,php" >}}

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
    for {
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
        for (int i = 0; i < 10; i++) {
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

            for (int i = 0; i < 10; i--)
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
{{< /programming-lang-wrapper >}}

위의 코드 실행 후, 메트릭 데이터를 Datadog에서 그래프로 사용할 수 있습니다:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/gauge.png" alt="게이지" >}}

### 설정(SET)

`set(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)`
: Datadog에 `GAUGE` 유형으로 저장됩니다. 저장된 시계열의 각 값은 플러시 기간 동안 StatsD에 제출된 메트릭의 고유한 값의 개수입니다.

#### 코드 예

`GAUGE` 메트릭으로 저장된 `SET` 메트릭을 Datadog에 내보냅니다.

다음 코드를 실행하여 DogStatsD `SET`메트릭을 Datadog에 제출합니다. 더 이상 필요하지 않을 때 클라이언트를 `flush`/`close` 하는 것을 기억하세요. 

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
    for {
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
        for (int i = 0; i < 10; i++) {
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

            for (int i = 0; i < 10; i--)
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

위의 코드를 실행한 후, 메트릭 데이터를 Datadog에서 그래프로 사용할 수 있습니다:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/set.png" alt="Set" >}}

### 히스토그램(HISTOGRAM)

`histogram(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)`
: 여러 메트릭이 제출되므로, 저장된 메트릭 유형(`GAUGE`, `RATE`)은 메트릭에 따라 다릅니다. 자세한 내용은 [HISTOGRAM 메트릭 유형][6] 문서를 참조하세요.

#### 설정

* [datadog.yaml 설정 파일][7]의 `histogram_aggregates` 파라미터를 사용하여 Datadog에 보낼 애그리게이션을 설정합니다. 기본적으로 `max`, `median`, `avg` 및 `count` 애그리게이션만 전송됩니다.
* [datadog.yaml 설정 파일][7]의 `histogram_percentiles` 파라미터를 사용하여 Datadog에 보낼 백분위수 애그리게이션을 설정합니다. 기본적으로, `95pc` 백분위수만 전송됩니다.

#### 코드 예

`HISTOGRAM` 메트릭 유형은 DogStatsD에만 해당됩니다. `GAUGE` 및 `RATE` 메트릭으로 저장된`HISTOGRAM`메트릭을 Datadog에 내보냅니다. [메트릭 유형][6] 문서에서 `HISTOGRAM` 유형에 대해 자세히 알아보세요.


다음 코드를 실행하여 DogStatsD `HISTOGRAM` 메트릭을 Datadog에 제출합니다. 더 이상 필요하지 않을 때 클라이언트를 `flush`/`close` 하는 것을 기억하세요. 

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

    for {
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
        for (int i = 0; i < 10; i++) {
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

            for (int i = 0; i < 10; i--)
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

위의 계측은 다음 메트릭을 생성합니다:

| 메트릭                                  | 설명                             |
|-----------------------------------------|-----------------------------------------|
| `example_metric.histogram.count`        | 이 메트릭이 샘플링된 횟수 |
| `example_metric.histogram.avg`          | 샘플링된 값의 평균           |
| `example_metric.histogram.median`       | 샘플링된 값의 중간값                    |
| `example_metric.histogram.max`          | 최대 샘플링 값                    |
| `example_metric.histogram.95percentile` | 95번째 백분위수 샘플링 값           |

위의 코드를 실행한 후, 메트릭 데이터를 Datadog에서 그래프로 사용할 수 있습니다:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/histogram.png" alt="Histogram" >}}

#### TIMER

DogStatsD의 `TIMER` 메트릭 유형은 `HISTOGRAM` 메트릭 유형의 구현입니다 (표준 StatsD의 타이머와 혼동하지 말 것). 타이밍 데이터만 측정합니다. 예를 들어, 코드 섹션을 실행하는 데 걸리는 시간입니다.

`timed(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)`
: 여러 메트릭이 제출되기 때문에 저장된 메트릭 유형(`GAUGE`, `RATE`)은 메트릭에 따라 다릅니다. 자세한 내용은 [HISTOGRAM 메트릭 유형][6] 설명서를 참조하세요.

##### 설정

`TIMER`의 경우, `HISTOGRAM` [설정](#configuration) 규칙이 적용됩니다.

##### 코드 예

`GAUGE` 및 `RATE` 메트릭으로 저장된 —`TIMER` 메트릭을 Datadog에 내보냅니다. [메트릭 유형][6] 문서에서 `HISTOGRAM` 유형에 대해 자세히 알아보세요. 더 이상 필요하지 않을 때 클라이언트를 `flush`/`close` 하는 것을 기억하세요. 

{{< programming-lang-wrapper langs="python,PHP" >}}

{{< programming-lang lang="python" >}}

파이썬(Python)에서, 타이머는 데코레이터로 생성됩니다.

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

또는 컨텍스트 관리자와 함께:

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

DogStatsD는 타이머 메트릭 데이터를 수신하면서, 렌더링 시간의 통계적 분포를 계산하고 다음 메트릭을 Datadog에 보냅니다:

| 메트릭                              | 설명                             |
|-------------------------------------|-----------------------------------------|
| `example_metric.timer.count`        | 이 메트릭이 샘플링된 횟수 |
| `example_metric.timer.avg`          | 샘플링된 값의 평균 시간      |
| `example_metric.timer.median`       | 중앙값 샘플링 값                    |
| `example_metric.timer.max`          | 최대 샘플링 값                    |
| `example_metric.timer.95percentile` | 95번째 백분위수 샘플링 값           |

DogStatsD는 `TIMER`를  `HISTOGRAM` 메트릭으로 취급합니다. `TIMER` 또는 `HISTOGRAM` 메트릭 유형을 사용하더라도 동일한 데이터를 Datadog에 전송합니다. 위의 코드를 실행한 후, 메트릭 데이터를 Datadog에서 그래프로 사용할 수 있습니다:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/timer.png" alt="Timer" >}}

### 배포

`distribution(<METRIC_NAME>, <METRIC_VALUE>, <TAGS>)`
: Datadog에 `DISTRIBUTION` 유형으로 저장됩니다. 자세한 내용은 전용 [Distribution 설명서][8]를 참조하세요.

#### 코드 예

`DISTRIBUTION` 메트릭 유형은 DogStatsD에만 해당되며, `DISTRIBUTION` 메트릭으로 저장된 `DISTRIBUTION` 메트릭을 Datadog에 내보냅니다. [메트릭 유형][9] 문서에서 `DISTRIBUTION` 유형에 대해 자세히 알아보세요.

다음 코드를 실행하여 DogStatsD `DISTRIBUTION` 메트릭을 Datadog에 제출합니다. 더 이상 필요하지 않을 때 클라이언트를 `flush`/`close` 하는 것을 기억하세요. 

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,php" >}}

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

    for {
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
        for (int i = 0; i < 10; i++) {
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

            for (int i = 0; i < 10; i--)
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

{{< /programming-lang-wrapper >}}

위의 계측은 `sum`, `count`, `average`, `minimum`, `maximum`, `50th percentile` (중앙값), `75th percentile`, `90th percentile`, `95th percentile` 및 `99th percentile` 을 계산합니다. 분포는 업로드된 파일의 크기 또는 강의실 시험 점수와 같은 *모든* 유형의 값 분포를 측정하는 데 사용할 수 있습니다.

## 메트릭 제출 옵션

### 샘플 속도

일부 성능 집약적인 코드 경로에서는 UDP 패킷을 전송하는 오버헤드가 너무 클 수 있으므로, DogStatsD 클라이언트는 샘플링을 지원합니다(일정 비율의 시간 동안만 메트릭 전송). 이 기능은 많은 메트릭을 샘플링하고 DogStatsD 클라이언트가 DogStatsD 서버와 동일한 호스트에 있지 않은 경우에 유용합니다. 단점: 트래픽은 감소하지만 정확도와 세분성이 다소 떨어집니다.

`1`의 샘플링 속도는 메트릭을 100% 전송하고 `0`의 샘플 속도는 메트릭을 0% 전송합니다.

Datadog에 메트릭을 보내기 전에, DogStatsD는 `<SAMPLE_RATE>`를 사용하여 메트릭 유형에 따라 메트릭 값을 수정합니다(샘플링 없이 값을 추정하기 위함):

| 메트릭 유형 | 샘플 속도 수정                                                                                                                                                         |
|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `COUNT`     | 수신된 값에 (`1/<SAMPLE_RATE>`)를 곱합니다. 수신된 하나의 데이터 포인트에 대해 실제로 동일한 값으로 `1/<SAMPLE_RATE>`이 샘플링되었다고 가정하는 것이 합리적입니다. |
| `GAUGE`     | 수정하지 않습니다. 받은 값은 그대로 유지됩니다.                                                                                                                               |
| `SET`       | 수정하지 않습니다. 수신된 값은 그대로 유지됩니다.                                                                                                                               |
| `HISTOGRAM` | `histogram.count` 통계는 COUNT 메트릭이며, 위에서 설명한 수정을 수신합니다. 다른 통계는 게이지 메트릭이며 "수정"되지 않습니다.                      |

#### 코드 예

다음 코드는 시간의 절반만 포인트를 전송합니다:

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

### 메트릭 태깅

`tags` 파라미터를 사용하여 DogStatsD에 보내는 모든 메트릭에 태그를 추가하세요. 

#### 코드 예

다음 코드는 `example_metric.increment` 메트릭에 `environment:dev` 및 `account:local` 태그만 추가합니다.

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,php" >}}

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
`tags` 인수는 문자열일 수 있습니다:

```php
$statsd->increment('example_metric.increment', "environment:dev,account:local");
```

또는 배열:
```php
<?php
$statsd->increment('example_metric.increment', array('environment' => 'dev', 'account' => 'local'));
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

#### 호스트 태그

호스트 태그는 메트릭을 집계하는 Datadog 에이전트에 의해 자동으로 할당됩니다. 에이전트 호스트 이름과 일치하지 않는 호스트 태그와 함께 제출된 메트릭은 원래 호스트에 대한 래퍼런스를 잃습니다. 제출된 호스트 태그는 에이전트에 서 수집되었거나 설정된 모든 호스트 이름보다 우선합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/developers/dogstatsd/
[2]: /ko/metrics/types/?tab=count#definition
[3]: /ko/dashboards/functions/arithmetic/#cumulative-sum
[4]: /ko/dashboards/functions/arithmetic/#integral
[5]: /ko/metrics/types/?tab=gauge#definition
[6]: /ko/metrics/types/?tab=histogram#definition
[7]: /ko/agent/guide/agent-configuration-files/#agent-main-configuration-file
[8]: /ko/metrics/distributions/
[9]: /ko/metrics/types/?tab=distribution#definition