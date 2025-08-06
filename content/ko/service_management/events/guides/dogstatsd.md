---
aliases:
- /ko/developers/events/dogstatsd/
- /ko/events/guides/dogstatsd
description: 데이터 유형 및 태깅을 포함하는 DogStatsD 기능에 대한 개요입니다.
further_reading:
- link: /developers/dogstatsd/
  tag: 설명서
  text: DogStatsD 소개
- link: /developers/community/libraries/
  tag: 설명서
  text: 공식 및 커뮤니티에서 생성한 API 및 DogStatsD 클라이언트 라이브러리
title: DogStatsD이 있는 이벤트
---

## 제출

[DogStatsD 설치][1] 후 다음 기능을 사용하여 [Datadog 이벤트 익스플로러][2]에 이벤트를 내보낼 수 있습니다.

```text
event(<title>, <message>, <alert_type>, <aggregation_key>, <source_type_name>, <date_happened>, <priority>, <tags>, <hostname>)
```

**정의**:

| 파라미터            | 유형            | 필수 | 설명                                                                                |
|----------------------|-----------------|----------|--------------------------------------------------------------------------------------------|
| `<title>`            | 문자열          | Yes      | 이벤트 타이틀                                                                     |
| `<message>`          | 문자열          | Yes      | 이벤트 텍스트 본문                                                                 |
| `<alert_type>`       | 문자열          | 아니요       | `error`, `warning`, `success` 또는 `info`(기본값 `info`)                              |
| `<aggregation_key>`  | 문자열          | 아니요       | 이벤트 집계에 사용할 키                                                        |
| `<source_type_name>` | 문자열          | 아니요       | 소스 유형 이름(기본값은 `my_apps`)                                               |
| `<date_happened>`    | 정수         | 아니요       | 이벤트의 epoch 타임스탬프(기본값은 DogStatsD 서버의 현재 시간) |
| `<priority>`         | 문자열          | 아니요       | 이벤트의 우선도를 지정합니다(`normal` 또는 `low`).                                    |
| `<tags>`             | 문자열 목록 | 아니요       | 이 이벤트와 연결된 태그 목록                                                  |
| `<hostname>`         | 문자열          | 아니요       | 호스트 이름                                                                       |

### 예시

DogStatsD 이벤트가 있는 Datadog 오류 및 예외를 보려면 다음 코드를 실행하세요. 클라이언트가 더 이상 필요하지 않으면 클라이언트를 `flush`/`close`하세요.

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,php" >}}

{{< programming-lang lang="python" >}}

```python
from datadog import initialize, statsd

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

statsd.event('오류 발생', '오류 메시지', alert_type='오류', tags=['env:dev'])
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

statsd.event('오류 발생', "오류 메시지", alert_type: '오류', tags: ['env:dev'])
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
        dogstatsdClient.SimpleEvent("오류 발생", "오류 메시지")
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
            .prefix("statsd")
            .hostname("localhost")
            .port(8125)
            .build();

        Event event = Event.builder()
          .withTitle("An error occurred")
          .withText("Error message")
          .withAlertType(Event.AlertType.ERROR)
          .withTags("env:prod", "tagkey:value")
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
            if (!dogStatsdService.Configure(dogstatsdConfig))
                throw new InvalidOperationException("DogstatsD를 시작할 수 없습니다. 자세한 내용은 `Configure` 방법에서 optionalExceptionHandler 인수를 설정하세요.");
            dogStatsdService.Event("오류 발생", "오류 메시지", alertType: "오류", date_happened='TIMESTAMP', tags: new[] { "env:dev" }); 
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

$statsd->event('오류 발생.',
    array( 'text' => '오류 메시지',
           'alert_type' => '오류'
    )
  );
```

DogStatsD-PHP 라이브러리를 사용하면 TCP를 통해 Datadog API에 직접 이벤트를 제출할 수 있습니다. 이벤트가 UDP를 사용하여 애플리케이션에서 에이전트로 전달되기 때문에 에이전트 DogStatsD 인스턴스를 사용할 때보다 느리지만 안성성은 높습니다.
이를 사용하려면 로컬 DogStatS 인스턴스 대신 [Datadog API 및 애플리케이션 키][1]로 라이브러리를 설정해야 합니다.

```php
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('api_key' => '<DATADOG_API_KEY>',
          'app_key' => '<DATADOG_APPLICATION_KEY>',
     )
  );

$statsd->event('오류 발생.',
    array( 'text' => '오류 메시지',
           'alert_type' => '오류'
    )
  );
```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

**참고**:

* 이 방법으로 이벤트를 전송하면 API 요청에 cURL이 사용됩니다.
* Datadog API와의 커뮤니케이션 문제에 대한 경고나 오류를 예방하려면 `try`/`catch` 코드 블록을 사용해야 합니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/developers/dogstatsd/
[2]: /ko/service_management/events/