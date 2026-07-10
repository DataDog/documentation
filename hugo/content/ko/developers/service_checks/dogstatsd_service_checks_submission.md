---
description: 데이터 유형 및 태깅을 포함하는 DogStatsD 기능에 대한 개요입니다.
further_reading:
- link: /developers/dogstatsd/
  tag: 설명서
  text: DogStatsD 소개
- link: /developers/community/libraries/
  tag: 설명서
  text: 공식 및 커뮤니티에서 생성한 API 및 DogStatsD 클라이언트 라이브러리
title: '서비스 검사 제출: DogStatsD'
---

StatsD는 메트릭만 허용하지만, DogStatsD는 세 가지 주요 Datadog 데이터 유형인 메트릭, 이벤트, 서비스 검사 모두를 허용합니다. 이 섹션에서는 서비스 검사에 대한 일반적인 사용 사례를 코드 예제와 함께 설명합니다.

## 기능

[DogStatsD 설치][1] 후, 다음 기능을 사용하여 Datadog에 서비스 검사를 보낼 수 있습니다:

```text
service_check(<SERVICE_CHECK_NAME>, <STATUS>, <TAGS>, <HOSTNAME>, <MESSAGE>)
```

서비스 검사 기능 매개 변수:

| 파라미터              | 유형            | 필수 | 기본값 | 설명                                                                                                |
|------------------------|-----------------|----------|---------------|------------------------------------------------------------------------------------------------------------|
| `<SERVICE_CHECK_NAME>` | 스트링          | 예      | -             | 서비스 점검의 이름.                                                                             |
| `<STATUS>`             | Int             | 예      | -             | 서비스 상태를 설명하는 상수: OK는 `0`, WARN은 `1`, CRITICAL은 `2`, 그리고 UNKNOWN은 `3`. |
| `<TAGS>`               | 키:값 쌍 목록 | 아니요       | -             | 서비스 검사와 연결할 태그 목록입니다.                                                        |
| `<HOSTNAME>`           | 스트링          | 아니요       | 현재 호스트  | 서비스 검사와 연결할 호스트 이름입니다.                                                          |
| `<MESSAGE>`            | 스트링          | 아니요       | -             | 상태가 발생한 이유에 대한 추가 정보 또는 설명입니다.                                        |

### 코드 예

다음 코드를 실행하여 DogStatsD를 통해 Datadog에 서비스 검사를 제출합니다. 더 이상 필요하지 않을 때 클라이언트를 `flush`/`close`하는 것을 기억하세요. 

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

서비스 검사가 보고되면 이를 통해 [서비스 검사 모니터][2]를 트리거합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/developers/dogstatsd/
[2]: /ko/monitors/types/service_check/