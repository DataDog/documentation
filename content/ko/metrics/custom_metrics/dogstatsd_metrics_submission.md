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
title: '메트릭 제출: DogStatsD'
---

StatsD는 메트릭만 허용하지만 DogStatsD는 세 가지 주요 Datadog 데이터 유형인 메트릭, 이벤트, 그리고 서비스 점검을 모두 허용합니다. 이 섹션에서는 메트릭의 일반적인 사용 사례를 메트릭 유형별로 나누어 보여주고, DogStatsD와 관련된 [샘플링 속도](#sample-rates) 및 [메트릭 태깅](#metric-tagging) 옵션에 대해 소개합니다.

[개수](#count), [측정](#gauge), [설정](#set) 메트릭 유형은 StatsD 사용자에게 익숙합니다. StatsD의 `TIMER`는 DogStatsD에서 `HISTOGRAM`의 하위 집합입니다. 또한 DogStatsD을 사용하여  [히스토그램](#histogram) 및[분포](#distribution) 메트릭 유형을 제출할 수 있습니다.

**참고**: 사용된 제출 방법에 따라 Datadog 내에 저장된 실제 메트릭 유형은 제출된 메트릭 유형과 다를 수 있습니다. DogStatsD를 통해 비율(RATE) 메트릭 유형을 제출하는 경우, 서로 다른 에이전트 간 관련 비교를 할 수 있도록 앱내 게이지(GAUGE)로 메트릭이 표시됩니다.

## 함수

[DogStatsD][1]을 설치한 후 메트릭 유형에 따라 Datadog에 메트릭을 제출하는 데 다음 함수를 사용할 수 있습니다. 함수는 다음 공유 파라미터를 갖습니다.

| 파라미터        | 유형            | 필수 | 설명                                                                                                                                                                                    |
|------------------|-----------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | 문자열          | Yes      | 제출할 메트릭 이름                                                                                                                                                                  |
| `<METRIC_VALUE>` | Double          | 예      | 메트릭과 관련된 값입니다.                                                                                                                                                             |
| `<SAMPLE_RATE>`  | Double          | No       | 메트릭에 적용할 샘플 비율입니다.  `0`(모든 것이 샘플링되므로 아무것도 전송되지 않음)과 `1`(샘플 없음) 사이의 값을 사용합니다. 자세한 내용은 [샘플 비율 섹션](#sample-rates)을 참조하세요. |
| `<TAGS>`         | 문자열 목록 | No       | 메트릭에 적용할 태그 목록입니다. 자세한 내용은 [메트릭 태깅](#metric-tagging) 섹션을 참조하세요.                                                                                       |

### 개수(COUNT)

`increment(<METRIC_NAME>, <SAMPLE_RATE>, <TAGS>)`
: COUNT 메트릭을 증가시키는 데 사용됩니다. Datadog에 `RATE` 유형으로 저장됩니다. 저장된 시계열의 각 값은 StatsD 플러시 기간 동안 메트릭 값의 시간 정규화된 델타입니다.

`decrement(<METRIC_NAME>, <SAMPLE_RATE>, <TAGS>)`
: COUNT 메트릭을 감소시키는 데 사용됩니다. Datadog에 `RATE` 유형으로 저장됩니다. 저장된 시계열의 각 값은 StatsD 플러시 기간 동안 메트릭 값의 시간 정규화된 델타입니다.

`count(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)`
: 임의의 `Value`에서 COUNT 메트릭을 증가시키는 데 사용됩니다. Datadog에 `RATE` 유형으로 저장됩니다. 저장된 시계열의 각 값은 StatsD 플러시 기간 동안 메트릭 값의 시간 정규화된 델타입니다.
: **참고: `count`는 파이썬(Python)에서 지원되지 않습니다.

**참고**: `COUNT` 유형 메트릭은 초당 단위를 보고하기 위해 플러시 간격 동안 정규화되므로 Datadog 내에서 십진수 값을 표시할 수 있습니다.

#### 코드 예시

`RATE` 메트릭으로 저장된 `COUNT` 메트릭을 Datadog로 전송합니다. `COUNT` 유형에 대한 자세한 내용은 [메트릭 유형][2] 설명서를 참조하세요.

다음 코드를 실행하여 DogStatsD `COUNT` 메트릭을 Datadog에 제출합니다. 더 이상 필요하지 않을 때 클라이언트를 `flush`/`close`하는 것을 기억하세요. 

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

**참고: `statsd.count`는 파이썬(Python)에서 지원되지 않습니다.

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

위의 코드를 실행하면 Datadog에서 메트릭 데이터를 그래프로 표시할 수 있습니다.

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/increment_decrement.png" alt="증가 감소" >}}

값은 `COUNT`로 제출되므로 Datadog 에서 `RATE`로 저장됩니다. Datadog 내에서 원시 개수를 얻으려면 [누적 합계][3] 또는 [적분][4] 함수와 같은 계열에 함수를 적용합니다:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/increment_decrement_cumsum.png" alt="Cumsum을 사용한 증가 감소" >}}

### GAUGE

`gauge(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)`
:Datadog에 `GAUGE` 유형으로 저장됩니다. 저장된 시계열의 각 값은 StatsD 플러시 기간 동안 메트릭에 대해 제출된 마지막 측정 값입니다.

#### 코드 예시

`GAUGE` 메트릭으로 저장된 `GAUGE` 메트릭을 Datadog로 전송합니다. `GAUGE` 유형에 대한 자세한 내용은 [메트릭 유형][5] 설명서를 참조하세요.

다음 코드를 실행하여 DogStatsD `GAUGE` 메트릭을 Datadog로 전송하세요. 더 이상 필요하지 않은 경우 `flush`/`close` 클라이언트를 삭제하는 것을 잊지 마세요.

**참고: 메트릭 제출 호출은 비동기식입니다. 메트릭 제출을 확인하려면 프로그램이 종료되기 전에 `flush`를 호출하세요.

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

위의 코드를 실행하면 Datadog에서 메트릭 데이터를 그래프로 표시할 수 있습니다:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/gauge.png" alt="Gauge" >}}

### SET

`set(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)`
: Datadog에 `GAUGE` 유형으로 저장됩니다. 저장된 시계열의 각 값은 플러시 기간 동안 메트릭의 StatsD에 제출된 고유 값의 수입니다.

#### 코드 예시

`GAUGE` 메트릭으로 저장된 `SET` 메트릭을 Datadog에 내보냅니다.

다음 코드를 실행하여 DogStatsD `SET` 메트릭 를 Datadog 으로 전송하세요. 더 이상 필요하지 않은 경우 `flush`/`close` 클라이언트 을 삭제하는 것을 잊지 마세요.

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

위의 코드를 실행하면 Datadog에서 메트릭 데이터를 그래프로 표시할 수 있습니다:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/set.png" alt="Set" >}}

### HISTOGRAM

`histogram(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)`
: 여러 개의 메트릭이 제출되므로 저장된 메트릭 유형(`GAUGE`, `RATE`)은 메트릭에 따라 달라집니다. 자세한 내용은 [히스토그램 메트릭 유형][6] 설명서를 참조하세요.

#### 설정

* [Datadog.yaml 설정 파일][7]에 `histogram_aggregates` 파라미터를 사용하여 Datadog로 전송할 집계를 설정합니다. 기본적으로 `max`, `median`, `avg`, `count` 집계만 전송됩니다.
* [Datadog.yaml 설정 파일][7]에 `histogram_percentiles` 파라미터를 사용하여 설정백분위수 집계를 Datadog로 전송합니다. 기본적으로 `95pc` 백분위수만 전송됩니다.

#### 코드 예시

`HISTOGRAM` 메트릭 유형은 DogStatsD에만 해당됩니다. `GAUGE` 및 `RATE` 메트릭으로 저장된 `HISTOGRAM` 메트릭을 Datadog로 전송합니다. `HISTOGRAM`유형에 대한 자세한 내용은 [메트릭 유형][6] 설명서를 참조하세요.


다음 코드를 실행하여 DogStatsD `HISTOGRAM` 메트릭을 Datadog로 전송하세요. 더 이상 필요하지 않은 경우 `flush`/`close` 클라이언트를 삭제하는 것을 잊지 마세요.

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

위의 계측은 다음 메트릭을 생성합니다:

| 메트릭                                  | 설명                             |
|-----------------------------------------|-----------------------------------------|
| `example_metric.histogram.count`        | 이 메트릭이 샘플링된 횟수 |
| `example_metric.histogram.avg`          | 샘플링된 값의 평균           |
| `example_metric.histogram.median`       | 샘플링된 값의 중앙값                    |
| `example_metric.histogram.max`          | 최대 샘플링 값                    |
| `example_metric.histogram.95percentile` | 95번째 백분위수 샘플링 값           |

위의 코드를 실행하면 Datadog 에서 메트릭 데이터를 그래프로 표시할 수 있습니다:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/histogram.png" alt="Histogram" >}}

#### TIMER

`TIMER` 메트릭 DogStatsD 유형은 `HISTOGRAM` 메트릭 유형을 구현한 것입니다. 표준 StatsD의 타이머와 혼동하지 마세요. 예를 들어 코드 섹션이 실행되는 데 걸리는 시간 등 타이밍 데이터만 측정합니다.

`timed(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)`
: 여러 개의 메트릭이 제출되므로 저장된 메트릭 유형(`GAUGE`, `RATE`)은 메트릭에 따라 달라집니다. 자세한 내용은 [히스토그램 메트릭 유형][6] 문서를 참조하세요.

##### 설정

`TIMER`의 경우, `HISTOGRAM` [설정](#configuration) 규칙이 적용됩니다.

##### 코드 예시

`GAUGE` 및 `RATE` 메트릭으로 저장된 `TIMER` 메트릭을 Datadog로 전송합니다. `HISTOGRAM` 유형에 대한 자세한 내용은 [메트릭 유형][6] 설명서를 참조하세요. 더 이상 필요하지 않은 경우 클라이언트를 `flush`/`close`로 변경하는 것을 잊지 마세요.

{{< programming-lang-wrapper langs="python,PHP" >}}

{{< programming-lang lang="python" >}}

파이썬(Python)에서 타이머는 데코레이터를 사용하여 생성됩니다.

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

또는 컨텍스트 관리자가 사용됩니다.

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

DogStatsD는 타이머 메트릭 데이터를 수신하면서, 렌더링 시간의 통계적 분포를 계산하고 다음 메트릭을 Datadog에 전송합니다.

| 메트릭                              | 설명                             |
|-------------------------------------|-----------------------------------------|
| `example_metric.timer.count`        | 이 메트릭이 샘플링된 횟수 |
| `example_metric.timer.avg`          | 샘플링된 값의 평균 시간      |
| `example_metric.timer.median`       | 샘플링된 값의 중앙값                    |
| `example_metric.timer.max`          | 최대 샘플링 값                    |
| `example_metric.timer.95percentile` | 95번째 백분위수 샘플링 값           |

DogStatsD 는 `TIMER`를 `HISTOGRAM` 메트릭으로 간주합니다. `TIMER` 또는 `HISTOGRAM` 메트릭 유형을 사용하든 동일한 데이터를 Datadog로 전송하는 것입니다. 위의 코드를 실행하면 메트릭 데이터를 Datadog에서 그래프로 표시할 수 있습니다:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/timer.png" alt="Timer" >}}

### DISTRIBUTION

`distribution(<METRIC_NAME>, <METRIC_VALUE>, <TAGS>)`
: Datadog에 `DISTRIBUTION` 유형으로 저장합니다. 자세한 내용은 전용 [분포 설명서][8]를 참조하세요.

#### 코드 예시

`DISTRIBUTION` 메트릭 유형은 DogStatsD에만 해당됩니다. `DISTRIBUTION` 메트릭으로 저장된 `DISTRIBUTION` 메트릭을 Datadog로 전송합니다. `DISTRIBUTION` 유형에 대한 자세한 내용은 [메트릭 유형][9] 설명서를 참조하세요.

다음 코드를 실행하여 DogStatsD `DISTRIBUTION` 메트릭을 Datadog로 전송하세요. 더 이상 필요하지 않은 경우 `flush`/`close` 클라이언트를 삭제하는 것을 잊지 마세요.

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
    statsd.distribution('example_metric.distribution', rand 20, tags: ['environment:dev'])
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

위의 계측은 `sum`, `count`, `average`, `minimum`, `maximum`, `50th percentile` (중앙값), `75th percentile`, `90th percentile`, `95th percentile` 및 `99th percentile`을 계산합니다. 분포는 업로드된 파일의 크기 또는 강의실 시험 점수 등 *모든* 유형 값의 분포를 측정하는 데 사용할 수 있습니다.

## 메트릭 제출 옵션

### 샘플 속도

일부 성능 집약적인 코드 경로의 경우 UDP 패킷을 전송하는 오버헤드가 너무 클 수 있으므로 DogStatsD 클라이언트는 샘플링을 지원합니다(일정 비율의 시간 동안만 메트릭을 전송). 메트릭을 많이 샘플링하고 DogStatsD 클라이언트가 DogStatsD 서버와 동일한 호스트에 있지 않은 경우에 유용합니다. 트래픽이 감소하지만 정밀도와 세분성이 다소 떨어지는 것이 단점입니다.

샘플 속도가 `1` 인 경우 메트릭 을 100% 전송하는 반면, 샘플 속도가 `0` 인 경우 메트릭 을 0% 전송합니다.

메트릭을 Datadog로 보내기 전에 DogStatsD는 `<SAMPLE_RATE>`를 사용하여 메트릭 유형에 따라 메트릭 값을 수정합니다(샘플링 없이 값을 추정하기 위해).

| 메트릭 유형    | 샘플 비율 보정                                                                                                                                                         |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `COUNT`        | 수신된 값에 (`1/<SAMPLE_RATE>`)를 곱합니다. 수신된 하나의 데이터포인트에 대해 `1/<SAMPLE_RATE>` 이 실제로 동일한 값으로 샘플링되었다고 가정하는 것이 합리적입니다. |
| `GAUGE`        | 수정하지 않습니다. 받은 값은 그대로 유지됩니다.                                                                                                                               |
| `SET`          | 수정하지 않습니다. 받은 값은 그대로 유지됩니다.                                                                                                                               |
| `HISTOGRAM`    | `histogram.count` 통계는 개수(COUNT) 메트릭 이며 위에 설명된 보정을 적용받습니다. 다른 통계는 게이지(GAUGE) 메트릭 이며 "수정"되지 않았습니다.                      |
| `DISTRIBUTION` | 수신된 값은 (`1/<SAMPLE_RATE>`)번 카운트됩니다. 수신된 하나의 데이터포인트에 대해 `1/<SAMPLE_RATE>`이 실제로 동일한 값으로 샘플링되었다고 가정하는 것이 합리적입니다. |

#### 코드 예시

다음 코드는 포인트를 절반만 전송합니다:

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

`tags` 파라미터를 사용해 DogStatsD에 전송할 메트릭에 태그를 추가합니다.

#### 코드 예시

다음 코드는 `example_metric.increment` 메트릭에 `environment:dev` 및 `account:local` 태그만 추가합니다.

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

{{< programming-lang lang="PHP" >}}
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

{{< programming-lang lang="nodejs" >}}
```javascript
tracer.dogstatsd.increment('example_metric.increment', 1, { environment: 'dev', account: 'local' });
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

#### 호스트 태그

호스트 태그는 Datadog 에이전트에 의해 자동 할당되어 메트릭을 집계합니다. 에이전트 호스트 이름과 일치하지 않은 호스트 태그로 제출된 메트릭은 원래 호스트로의 참조를 잃습니다. 제출된 호스트 태그는 에이전트에서 설저되거나 수집된 호스트 이름을 덮어씁니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/developers/dogstatsd/
[2]: /ko/metrics/types/?tab=count#definition
[3]: /ko/dashboards/functions/arithmetic/#cumulative-sum
[4]: /ko/dashboards/functions/arithmetic/#integral
[5]: /ko/metrics/types/?tab=gauge#definition
[6]: /ko/metrics/types/?tab=histogram#definition
[7]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[8]: /ko/metrics/distributions/
[9]: /ko/metrics/types/?tab=distribution#definition