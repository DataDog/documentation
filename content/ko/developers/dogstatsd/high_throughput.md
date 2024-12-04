---
description: 높은 처리량을 위한 DogStatsD 최적화
further_reading:
- link: developers/dogstatsd
  tag: 설명서
  text: DogStatsD 소개
- link: developers/libraries
  tag: 설명서
  text: 공식 및 커뮤니티에서 생성한 API 및 DogStatsD 클라이언트 라이브러리
title: 대량의 메트릭 전송
---

DogStatsD는 애플리케이션에서 생성된 메트릭을 트랜스포트 프로토콜을 통해 [에이전트][1]로 전송하는 방식으로 작동합니다. 이 프로토콜은 UDP (사용자 데이터그램 프로토콜) 또는 [UDS (유닉스 도메인 소켓)][2]입니다.

DogStatsD를 사용하여 단일 에이전트에 대량의 메트릭을 전송하는 경우 적절한 조치를 취하지 않으면 일반적으로 다음과 같은 증상이 발생합니다:

- 높은 에이전트 CPU 사용량
- 삭제된 데이터그램 / 메트릭
- DogStatsD 클라이언트 라이브러리(UDS)가 오류를 반환하는 경우

대부분의 경우 아래에 설명된 몇 가지 설정 옵션을 조정하여 증상을 완화할 수 있습니다.

## 일반적인 팁

### Datadog 공식 클라이언트 사용

Datadog독은 모든 주요 프로그래밍 언어에 대해 최신 버전의 [공식 DogStatsD 클라이언트][3]를 사용할 것을 권장합니다.

### 클라이언트에서 버퍼링 사용

일부 StatsD 및 DogStatsD 클라이언트는 기본적으로 데이터그램당 하나의 메트릭을 전송합니다. 이로 인해 클라이언트, 운영 체제 및 에이전트에 상당한 오버헤드가 추가됩니다. 클라이언트가 하나의 데이터그램에 여러 메트릭 버퍼링을 지원하는 경우 이 옵션을 활성화하면 눈에 띄게 개선됩니다.

<div class="alert alert-info">
버퍼링을 지원하는 커뮤니티 지원 DogStatsD 클라이언트를 사용하는 경우, 에이전트 측의 데이터그램당 버퍼 크기 (기본값 8KB, <code>dogstatsd_buffer_size</code>를 사용해 에이전트에서 설정 가능)와 네트워크/OS 최대 데이터그램 크기를 초과하지 않는 최대 데이터그램 크기를 설정해야 합니다.
</div>


다음은 [공식 DogStatsD 지원 클라이언트][3]에 대한 몇 가지 예입니다:

{{< programming-lang-wrapper langs="go,python,ruby,java,.NET,PHP" >}}
{{< programming-lang lang="go" >}}

기본적으로 Datadog의 공식 Golang 라이브러리 [DataDog/datadog-go][1]는 버퍼링을 사용합니다. 각 패킷의 크기와 메시지 수는 `UDS`와 `UDP`에 대해 서로 다른 기본값을 사용합니다. 클라이언트 설정에 대한 자세한 내용은 [DataDog/datadog-go][1]을 참조하세요.

```go
package main

import (
        "log"
        "github.com/DataDog/datadog-go/v5/statsd"
)

func main() {
  // 이 예제에서는 메트릭이 UDP에 대한 올바른 기본 설정으로 버퍼링됩니다.
  statsd, err := statsd.New("127.0.0.1:8125")
  if err != nil {
    log.Fatal(err)
  }

  statsd.Gauge("example_metric.gauge", 1, []string{"env:dev"}, 1)
}
```

[1]: https://github.com/DataDog/datadog-go
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

아래 예제에서는 Datadog의 공식 Python 라이브러리 [datadogpy][1]를 이용해 최소 패킷 수로 메트릭을 전송하는 버퍼링된 DogStatsD 클라이언트를 사용합니다. 버퍼링을 사용하면 패킷 크기 제한에서 300 밀리초마다 (설정 가능) 자동 플러싱이 수행됩니다.

```python
from datadog import DogStatsd


# 클라이언트 v0.43.0+를 사용하는 경우
dsd = DogStatsd(host="127.0.0.1", port=8125, disable_buffering=False)
dsd.gauge('example_metric.gauge_1', 123, tags=["environment:dev"])
dsd.gauge('example_metric.gauge_2', 1001, tags=["environment:dev"])
dsd.flush()  # Optional manual flush

# v0.43.0 이전 클라이언트를 사용하는 경우, 버퍼링을 사용하려면 컨텍스트 관리자가 필요합니다.
dsd = DogStatsd(host="127.0.0.1", port=8125)
with dsd:
    dsd.gauge('example_metric.gauge_1', 123, tags=["environment:dev"])
    dsd.gauge('example_metric.gauge_2', 1001, tags=["environment:dev"])
```

<div class="alert alert-warning">
기본값으로 파이썬(Python) DogStatsD 클라이언트 예시(<code>statsd</code> 글로벌 예시 포함)는 프로세스 간에 공유할 수 없지만 스레드 안전 상태입니다. 따라서 상위 프로세스와 각 하위 프로세스는 클라이언트의 고유한 예시를 생성하거나 <code>disable_buffering</code>을 <code>True</code>로 설정하여 버퍼링을 명시적으로 해제해야 합니다. 자세한 내용은 <a href="https://datadogpy.readthedocs.io/en/latest/#datadog-dogstatsd">datadog.dogstatsd</a>의 설명서를 참조하세요.
</div>


[1]: https://github.com/DataDog/datadogpy
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

아래 예제는 Datadog의 공식 Ruby 라이브러리 [dogstatsd-ruby][1]를 사용합니다. 플러시가 트리거될 때 하나의 패킷으로 메트릭을 전송하는 버퍼링된 DogStatsD 클라이언트 인스턴스를 생성합니다:

```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('127.0.0.1', 8125)

statsd.increment('example_metric.increment', tags: ['environment:dev'])
statsd.gauge('example_metric.gauge', 123, tags: ['environment:dev'])

# synchronous flush
statsd.flush(sync: true)
```

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}


아래 예제에서는 Datadog의 공식 Java 라이브러리 [java-dogstatsd-client][1]를 사용하여 최대 패킷 크기가 1500바이트인 버퍼링된 DogStatsD 클라이언트 인스턴스를 생성합니다. 즉, 이 클라이언트 인스턴스에서 전송되는 모든 메트릭은 버퍼링되고 최대 `1500` 패킷 길이의 패킷으로 전송됩니다:

```java
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("namespace").
            .hostname("127.0.0.1")
            .port(8125)
            .maxPacketSizeBytes(1500)
            .build();

        Statsd.incrementCounter("example_metric.increment", ["environment:dev"]);
        Statsd.recordGaugeValue("example_metric.gauge", 100, ["environment:dev"]);
    }
}
```


[1]: https://github.com/DataDog/java-dogstatsd-client
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}
아래 예제는 Datadog의 공식 C# 라이브러리 [dogstatsd-csharp-client][1]를 사용하여 UDP를 트랜스포트로 사용하는 DogStatsD 클라이언트를 생성합니다:

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
                throw new InvalidOperationException("DogstatsD를 초기화할 수 없습니다. 자세한 내용을 위해 `Configure` 방식에서 optionalExceptionHandler 인수를 설정하세요.");

            // Counter and Gauge are sent in the same datagram
            dogStatsdService.Counter("example_metric.count", 2, tags: new[] { "environment:dev" });
            dogStatsdService.Gauge("example_metric.gauge", 100, tags: new[] { "environment:dev" });
        }
    }
}
```


[1]: https://github.com/DataDog/dogstatsd-csharp-client
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

아래 예제는 Datadog의 공식 PHP 라이브러리 [php-datadogstatsd][1]를 사용하여 블록이 완료될 때 하나의 패킷으로 메트릭을 전송하는 버퍼링된 DogStatsD 클라이언트 인스턴스를 생성합니다:

```php
<?php

require __DIR__ . '/vendor/autoload.php';

  use DataDog\BatchedDogStatsd;

$client = new BatchedDogStatsd(
  array('host' => '127.0.0.1',
          'port' => 8125,
     )
);

$client->increment('example_metric.increment', array('environment'=>'dev'));
$client->increment('example_metric.increment', $sampleRate->0.5 , array('environment'=>'dev'));
```


[1]: https://github.com/DataDog/php-datadogstatsd
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### 메트릭 샘플링

클라이언트에 대한 샘플 속도 값을 설정하여 DogStatsD 클라이언트에서 에이전트로 전송되는 트래픽을 줄일 수 있습니다. 예를 들어, `0.5`의 샘플 속도는 전송된 UDP 패킷 수를 절반으로 줄입니다. 이 솔루션은 트래픽을 줄이되 정밀도와 세분성이 약간 떨어질 수 있다는 단점이 있습니다.

자세한 정보와 코드 예제는 [DogStatsD "샘플 속도" 매개 변수 설명][4]을 참조하세요.

### UDS (유닉스 도메인 소켓)를 통한 DogStatsD 사용

UDS는 [DogStatsD 페이로드를 트랜스포트][2]하는 데 사용되는 프로세스 간 통신 프로토콜입니다. UDP와 비교했을 때 오버헤드가 거의 없으며 시스템에서 DogStatsD의 일반적인 설치 공간을 줄여줍니다.

### 클라이언트 사이드 애그리게이션

클라이언트 라이브러리는 클라이언트 측에서 메트릭을 집계함으로써 Datadog 에이전트에 제출해야 하는 메시지 수를 줄여 IO 성능과 처리량을 개선합니다.

{{< programming-lang-wrapper langs="go,java,.NET" >}}
{{< programming-lang lang="go" >}}

클라이언트 사이드 애그리게이션은 v5.0.0부터 시작되는 Go 클라이언트에서만 사용할 수 있습니다.

자세한 내용은 [클라이언트 사이드 애그리게이션][1]을 참조하세요.

[1]: https://github.com/DataDog/datadog-go#client-side-aggregation
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

클라이언트 사이드 애그리게이션은 java-dogstatsd-client 버전 2.11.0 이상에서 사용할 수 있으며, 버전 3.0.0부터 기본적으로 활성화되어 있습니다.

```java
StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
    // regular setup
    .enableAggregation(true)
    .build();
```

클라이언트 사이드 애그리게이션은 게이지, 카운터 및 세트에 사용할 수 있습니다.

자세한 내용은 [클라이언트 사이드 애그리게이션][1]을 참조하세요.

[1]: https://github.com/DataDog/java-dogstatsd-client#aggregation
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

클라이언트 사이드 애그리게이션은 DogStatsD C# 클라이언트 v7.0.0 이상에서 사용할 수 있으며 기본적으로 활성화되어 있습니다. 클라이언트 사이드 애그리게이션은 게이지, 카운터 및 세트에 사용할 수 있습니다.

```csharp
var dogstatsdConfig = new StatsdConfig
{
    StatsdServerName = "127.0.0.1",
    StatsdPort = 8125,
    ClientSideAggregation = new ClientSideAggregationConfig()
};
```


자세한 내용은 [C#용 DogStatsD 리포지토리][1]를 참조하세요.

[1]: https://github.com/DataDog/dogstatsd-csharp-client#client-side-aggregation
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### 여러 메트릭 처리 파이프라인을 실행하여 패킷 드롭을 제한하세요.

DogStatsD 서버가 UDS를 사용하며 높은 처리량으로 패킷을 드롭하는 경우, 더 많은 CPU를 사용하도록 서버를 설정하면 처리 속도가 향상되고 패킷 드롭이 감소할 수 있습니다.

클라이언트 텔레메트리에 패킷 드롭이 표시되고 서버가 CPU 2개 또는 코어 2개를 초과하여 사용하지 않는 경우 DogStatsD 서버를 설정할 수 있습니다.

패킷 드롭 양을 줄이려면:

1. 클라이언트 큐 크기를 `8192`로 늘립니다. 자세한 내용은 클라이언트 라이브러리 설정을 참조하세요. 드롭 양이 줄어들고 애플리케이션에서 더 많은 RAM을 사용할 수 있습니다.
2. 또한, Datadog 에이전트 설정에서 `dogstatsd_pipeline_autoadjust: true` 기능을 활성화할 수 있습니다. 에이전트는 여러 코어를 사용하여 커스텀 메트릭을 처리하므로 CPU 사용량은 증가하지만 패킷 드롭은 감소할 수 있습니다.

## 운영 체제 커널 버퍼

대부분의 운영 체제는 메트릭이 포함된 수신 UDP 및 UDS 데이터그램을 최대 크기의 버퍼에 추가합니다. 최대 크기에 도달하면 메트릭이 포함된 데이터그램이 삭제되기 시작합니다. 값을 조정하여 에이전트가 들어오는 메트릭을 처리할 시간을 더 확보할 수 있습니다:

### UDP (사용자 데이터그램 프로토콜) 이용

#### 리눅스(Linux)

대부분의 Linux 배포판에서는 커널 버퍼의 최대 크기가 기본적으로 `212992`로 설정되어 있습니다( (208 KiB). 다음 명령을 사용하여 확인할 수 있습니다:

```bash
$ sysctl net.core.rmem_max
net.core.rmem_max = 212992
```

DogStatsD 소켓 버퍼의 최대 크기를 25MiB로 설정하려면:

```bash
sysctl -w net.core.rmem_max=26214400
```

이 변경 사항을 영구적으로 적용하려면 다음 설정을 `/etc/sysctl.conf`에 추가합니다:

```conf
net.core.rmem_max = 26214400
```

그런 다음 에이전트 `dogstatsd_so_rcvbuf` 설정 옵션을 `datadog.yaml`에서 동일한 번호로 설정합니다:

```yaml
dogstatsd_so_rcvbuf: 26214400
```

쿠버네티스에 에이전트 또는 DogStatsD를 배포하는 경우 [쿠버네티스의 sysctl에 대한 참고 사항][5] 섹션을 참조하세요.

### UDS (유닉스 도메인 소켓) 사용

#### 리눅스(Linux)

UDS 소켓의 경우, 읽기 속도가 쓰기 속도보다 느리면 Linux는 큐에서 데이터그램을 내부적으로 버퍼링합니다. 이 큐의 크기는 Linux가 소켓당 버퍼링하는 최대 데이터그램 수를 나타냅니다. 이 값은 다음 명령으로 쿼리할 수 있습니다:

```bash
sysctl net.unix.max_dgram_qlen
```

값이 512 미만인 경우 이 명령을 사용하여 512 이상으로 늘릴 수 있습니다:

```bash
sysctl -w net.unix.max_dgram_qlen=512
```

이 변경 사항을 영구적으로 적용하려면 다음 설정을 `/etc/sysctl.conf`에 추가합니다:

```conf
net.unix.max_dgram_qlen = 512
```

같은 방식으로 `net.core.wmem_max`를 4MiB로 늘려서 클라이언트 쓰기 성능을 향상시킬 수 있습니다:

```conf
net.core.wmem_max = 4194304
```

그런 다음 에이전트 `dogstatsd_so_rcvbuf` 설정 옵션을 `datadog.yaml`에서 동일한 번호로 설정합니다:

```yaml
dogstatsd_so_rcvbuf: 4194304
```

#### 쿠버네티스의 sysctl에 대한 참고 사항

에이전트 및/또는 DogStatsD를 배포하기 위해 쿠버네티스를 사용 중이고 위에서 언급한 대로 sysctls를 설정하려면 컨테이너별로 값을 설정합니다. `net.*` sysctls가 네임스페이스인 경우, 포드별로 설정할 수 있습니다.  [쿠버네티스 클러스터에서 sysctls 사용하기][6]를 참조하세요.

## 적절한 패킷 크기 보장

적절한 크기의 패킷을 DogStatsD 에이전트의 DogStatsD 서버로 전송하여 추가 CPU 사용을 방지하세요. 최신 버전의 공식 DogStatsD 클라이언트는 성능에 최적화된 크기의 패킷을 전송합니다.

최신 Datadog DogStatsD 클라이언트 중 하나를 사용하는 경우 이 섹션을 건너뛸 수 있습니다.

전송된 패킷이 너무 작은 경우, Datadog 에이전트는 여러 개의 패킷을 함께 묶어 나중에 파이프라인에서 일괄 처리합니다. 공식 DogStatsD 클라이언트는 패킷당 메트릭 수의 최적 비율을 갖도록 메트릭을 그룹화할 수 있습니다.

DogStatsD 클라이언트가 `dogstatsd_buffer_size` 크기의 패킷을 전송하는 경우 Datadog 에이전트가 가장 최적의 성능을 발휘합니다. 패킷이 버퍼 크기보다 작아야 에이전트가 메트릭 손상 없이 패킷을 버퍼에 완전하게 로드할 수 있습니다. DogStatsD 클라이언트에서 해당 설정 필드를 사용하세요. 

<div class="alert alert-info">
<strong>UDP에 대한 참고 사항</strong>: UDP 패킷은 일반적으로 이더넷과 IP 계층을 통과하기 때문에 패킷 크기를 네트워크의 단일 이더넷 프레임보다 작은 값으로 제한하면 IP 패킷 조각화를 방지할 수 있습니다. 대부분의 경우 IPv4 네트워크는 1500바이트의 MTU로 설정되므로 이 경우 전송되는 패킷의 크기는 1472로 제한해야 합니다.
</div>


<div class="alert alert-info">
<strong>UDP에 대한 참고 사항</strong>: 최상의 성능을 위해 UDS 패킷 크기는 8192바이트여야 합니다.
</div>



## 에이전트의 최대 메모리 사용량 제한

에이전트는 DogStatsD 클라이언트가 전송하는 메트릭 버스트를 흡수하기 위해 메모리를 사용해야 합니다. 비록 이것이 짧은 시간 동안이고 이 메모리가 OS로 빠르게 해제되더라도, 스파이크가 발생하며 이는 메모리 사용량 제한으로 인해 포드나 컨테이너를 퇴거시킬 수 있는 컨테이너화된 환경에서 문제가 될 수 있습니다.

애플리케이션에서 메트릭을 버스트로 전송하지 마세요. Datadog 에이전트가 최대 메모리 사용량에 도달하는 것을 방지할 수 있습니다.

최대 메모리 사용량을 제한하기 하기 위한 또 다른 방법은 버퍼링을 줄이는 것입니다. 에이전트 내 DogStatsD 서버의 기본 버퍼는 `dogstatsd_queue_size` 필드를 사용하여 설정할 수 있으며 (Datadog 에이전트 6.1.0부터 가능), 기본값 `1024`는 대략적인 최대 메모리 사용량인 768MB를 유도합니다.

<div class="alert alert-warning">
<strong>참고</strong>: 버퍼 크기를 줄이면 패킷 드롭 횟수가 증가할 수 있습니다.
</div>


이 예제에서는 DogStatsD의 최대 메모리 사용량을 약 384MB로 줄입니다:

```yaml
dogstatsd_queue_size: 512
```

애플리케이션에서 발생하는 메트릭 버스트 감지에 도움이 될 다음 섹션을 참조하세요.

## 메트릭 처리 통계 및 버스트 감지 활성화

DogStatsD에는 가장 많이 처리된 메트릭을 확인할 수 있는 통계 모드가 있습니다.

<div class="alert alert-warning">
<strong> 참고 </strong>: 메트릭 통계 모드를 활성화하면 DogStatsD 성능이 저하될 수 있습니다.
</div>


통계 모드를 사용하려면 다음과 같이 하세요:

- 설정 파일에서 `dogstatsd_stats_enable`를 `true`로 설정
- 환경 변수 `DD_DOGSTATSD_STATS_ENABLE`를 `true`로 설정
- 런타임에 활성화하려면 `datadog-agent config set dogstatsd_stats true` 명령을 사용합니다. 또는, 런타임에서 명령 `datadog-agent config set dogstatsd_stats false`을 사용하여 비활성화할 수 있습니다.

이 모드가 활성화되면 명령 `datadog-agent dogstatsd-stats`을 실행합니다. 처리된 메트릭 목록이 수신된 메트릭에 따라 내림차순으로 반환됩니다.

이 모드에서 실행되는 동안 DogStatsD 서버는 버스트 감지 메커니즘을 실행합니다. 버스트가 감지되면 경고 로그가 생성됩니다. 예를 들어:

```text
DogStatSd에서 메트릭 버스트가 감지되었습니다: 다음은 지난 5초 동안의 메트릭 수입니다: [250 230 93899 233 218]
```

## 클라이언트 사이드 텔레메트리

DogStatsD 클라이언트는 기본적으로 텔레메트리 메트릭을 에이전트로 전송합니다. 이를 통해 병목 현상을 해결할 수 있습니다. 각 메트릭에는 클라이언트 언어 및 클라이언트 버전으로 태그가 지정됩니다. 이러한 메트릭은 커스텀 메트릭으로 간주되지 않습니다.

각 클라이언트는 공통 태그 세트를 공유합니다.

| 태그                | 설명                                       | 예시                |
| ------------------ | ------------------------------------------------- | ---------------------- |
| `client`           | 클라이언트 언어                        | `client:py`            |
| `client_version`   | 클라이언트 버전                         | `client_version:1.2.3` |
| `client_transport` | 클라이언트가 사용하는 트랜스포트 (`udp` 또는 `uds`) | `client_transport:uds` |

**참고**: UDP를 사용하면 클라이언트에서 네트워크 오류를 감지할 수 없으며 해당 메트릭에는 바이트 또는 패킷 드롭이 반영되지 않습니다.

{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}
{{< programming-lang lang="python" >}}

Python 클라이언트 `0.34.0` 버전으로 시작합니다.

`datadog.dogstatsd.client.metrics`
: **메트릭 유형**: 카운트<br>
애플리케이션이 DogStatsD 클라이언트로 전송한 `metrics` 개수 (샘플링 전)입니다.


`datadog.dogstatsd.client.events`
: **메트릭 유형**: 카운트<br>
애플리케이션에서 DogStatsD 클라이언트로 전송한 `events` 횟수입니다.

`datadog.dogstatsd.client.service_checks`
: **메트릭 유형**: 카운트<br>
애플리케이션이 DogStatsD 클라이언트로 전송한 `service_checks` 횟수입니다.

`datadog.dogstatsd.client.bytes_sent`
: **메트릭 유형**: 카운트<br>
에이전트에 성공적으로 전송된 바이트 수입니다.

`datadog.dogstatsd.client.bytes_dropped`
: **메트릭 유형**: 카운트<br>
DogStatsD 클라이언트가 삭제한 바이트 수입니다.

`datadog.dogstatsd.client.packets_sent`
: **메트릭 유형**: 카운트<br>
에이전트에게 성공적으로 전송된 데이터그램의 수입니다.

`datadog.dogstatsd.client.packets_dropped`
: **메트릭 유형**: 카운트<br>
DogStatsD 클라이언트가 삭제한 데이터그램의 수입니다.

텔레메트리를 비활성화하려면 `disable_telemetry` 방법을 사용합니다:

```python
statsd.disable_telemetry()
```

클라이언트 설정에 대한 자세한 내용은 [DataDog/datadogpy][1]을 참조하세요.


[1]: https://github.com/DataDog/datadogpy
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Ruby 클라이언트의 `4.6.0` 버전으로 시작합니다.

`datadog.dogstatsd.client.metrics`
: **메트릭 유형**:<br>
애플리케이션이 DogStatsD 클라이언트로 전송한 `metrics` 개수 (샘플링 전)입니다.


`datadog.dogstatsd.client.events`
: **메트릭 유형**: 카운트<br>
애플리케이션이 DogStatsD 클라이언트로 전송한 `events` 횟수입니다.

`datadog.dogstatsd.client.service_checks`
: **메트릭 유형**: 카운트<br>
애플리케이션이 DogStatsD 클라이언트로 전송한 `service_checks` 횟수입니다.

`datadog.dogstatsd.client.bytes_sent`
: **메트릭 유형**: 카운트<br>
에이전트에 성공적으로 전송된 바이트 수입니다.

`datadog.dogstatsd.client.bytes_dropped`
: **메트릭 유형**: 카운트<br>
DogStatsD 클라이언트가 삭제한 바이트 수입니다.

`datadog.dogstatsd.client.packets_sent`
: **메트릭 유형**: 카운트<br>
에이전트에게 성공적으로 전송된 데이터그램의 수입니다.

`datadog.dogstatsd.client.packets_dropped`
: **메트릭 유형**: 카운트<br>
DogStatsD 클라이언트가 삭제한 데이터그램의 수입니다.

텔레메트리를 비활성화하려면, `disable_telemetry` 매개 변수를 `true`로 설정합니다:

```ruby
Datadog::Statsd.new('localhost', 8125, disable_telemetry: true)
```

클라이언트 설정에 대한 자세한 내용은 [DataDog/dogstatsd-ruby][1]를 참조하세요.


[1]: https://github.com/DataDog/dogstatsd-ruby
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Go 클라이언트 `3.4.0` 버전으로 시작합니다. 

`datadog.dogstatsd.client.metrics`
: **메트릭 유형**: 카운트<br>
애플리케이션이 DogStatsD 클라이언트로 전송한 `metrics` 횟수(샘플링 및 애그리게이션 전)입니다.

`datadog.dogstatsd.client.metrics_by_type`
: **메트릭 유형**: 카운트<br>
샘플링 및 애그리게이션 전에 DogStatsD 클라이언트가 전송한 `metrics` 개수로, 메트릭 유형 (`gauge`, `set`, `count`, `timing`, `histogram`, `distribution`)으로 태그가 지정됩니다. Go 클라이언트 v5.0.0으로 시작합니다.

`datadog.dogstatsd.client.events`
: **메트릭 유형**: 카운트<br>
애플리케이션이 DogStatsD 클라이언트로 전송한 `events` 횟수입니다.

`datadog.dogstatsd.client.service_checks`
: **메트릭 유형**: 카운트<br>
애플리케이션이 DogStatsD 클라이언트로 전송한 `service_checks` 횟수입니다.

`datadog.dogstatsd.client.bytes_sent`
: **메트릭 유형**: 카운트<br>
에이전트에 성공적으로 전송된 바이트 수입니다.

`datadog.dogstatsd.client.bytes_dropped`
: **메트릭 유형**: 카운트<br>
DogStatsD 클라이언트가 삭제한 바이트 수입니다 (`datadog.dogstatsd.client.bytes_dropped_queue` 및 `datadog.dogstatsd.client.bytes_dropped_writer` 포함).


`datadog.dogstatsd.client.bytes_dropped_queue`
: **메트릭 유형**: 카운트<br>
DogStatsD 클라이언트 큐가 꽉 차서 삭제된 바이트 수입니다.

`datadog.dogstatsd.client.bytes_dropped_writer`
: **메트릭 유형**: 카운트<br>
네트워크 시간 초과 또는 오류로 인해 Datadog에 쓰는 동안 삭제된 바이트 수입니다.

`datadog.dogstatsd.client.packets_sent`
: **메트릭 유형**: 카운트<br>
에이전트에게 성공적으로 전송된 데이터그램의 수입니다.

`datadog.dogstatsd.client.packets_dropped`
: **메트릭 유형**: 카운트<br>
DogStatsD 클라이언트가 삭제한 데이터그램의 수입니다 (`datadog.dogstatsd.client.packets_dropped_queue` 및 `datadog.dogstatsd.client.packets_dropped_writer` 포함).


`datadog.dogstatsd.client.packets_dropped_queue`
: **메트릭 유형**: 카운트<br>
DogStatsD 클라이언트 큐가 꽉 차서 삭제된 데이터그램 수입니다.

`datadog.dogstatsd.client.packets_dropped_writer`
: **메트릭 유형**: 카운트<br>
네트워크 시간 초과 또는 오류로 인해 Datadog에 쓰는 동안 삭제된 데이터그램 수입니다.

`datadog.dogstatsd.client.metric_dropped_on_receive`
: **메트릭 유형**: 카운트<br>
내부 수신 채널이 꽉 차서 메트릭 개수가 감소했습니다(`WithChannelMode()` 사용 시). `WithChannelMode()`
가 활성화된 경우 Go 클라이언트 v3.6.0으로 시작합니다.

`datadog.dogstatsd.client.aggregated_context`
: **메트릭 유형**: 카운트<br>
클라이언트 사이드 애그리게이션이 활성화된 경우 클라이언트가 플러시한 컨텍스트의 총 개수입니다. Go 클라이언트 v5.0.0으로 시작합니다. 이 메트릭은 애그리게이션이 활성화된 경우에만 보고됩니다 (기본값).

`datadog.dogstatsd.client.aggregated_context_by_type`
: **메트릭 유형**: 카운트<br>
클라이언트 사이드 애그리게이션이 활성화된 경우 클라이언트가 플러시한 컨텍스트의 총 개수로, 메트릭 유형별(`gauge`, `set`, `count`, `timing`, `histogram`, `distribution`)로 태그가 지정됩니다. Go 클라이언트 v5.0.0으로 시작하며, 이 메트릭은 애그리게이션이 활성화된 경우에만 보고됩니다 (기본값).

텔레메트리를 비활성화하려면 `WithoutTelemetry` 설정을 사용합니다:

```go
statsd, err: = statsd.New("127.0.0.1:8125", statsd.WithoutTelemetry())
```

클라이언트 설정에 대한 자세한 내용은 [DataDog/datadog-go][1]를 참조하세요.


[1]: https://github.com/DataDog/datadog-go
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

 Java 클라이언트 `2.10.0` 버전으로 시작합니다.

`datadog.dogstatsd.client.metrics`
: **메트릭 유형**:<br>
애플리케이션이 DogStatsD 클라이언트로 전송한 `metrics` 개수 (샘플링 전)입니다.


`datadog.dogstatsd.client.events`
: **메트릭 유형**: 카운트<br>
애플리케이션에서 DogStatsD 클라이언트로 전송한 `events` 수입니다.

`datadog.dogstatsd.client.service_checks`
: **메트릭 유형**: 카운트<br>
애플리케이션에서 DogStatsD 클라이언트로 전송한 `service_checks` 수입니다.

`datadog.dogstatsd.client.bytes_sent`
: **메트릭 유형**: 카운트<br>
에이전트에 성공적으로 전송된 바이트 수입니다.

`datadog.dogstatsd.client.bytes_dropped`
: **메트릭 유형**: 카운트<br>
DogStatsD 클라이언트가 삭제한 바이트 수입니다.

`datadog.dogstatsd.client.packets_sent`
: **메트릭 유형**: 카운트<br>
에이전트에게 성공적으로 전송된 데이터그램의 수입니다.

`datadog.dogstatsd.client.packets_dropped`
: **메트릭 유형**: 카운트<br>
DogStatsD 클라이언트가 삭제한 데이터그램의 수입니다.

`datadog.dogstatsd.client.packets_dropped_queue`
: **메트릭 유형**: 카운트<br>
DogStatsD 클라이언트 큐가 꽉 차서 삭제된 데이터그램 수입니다.

`datadog.dogstatsd.client.aggregated_context`
: **메트릭 유형**: 카운트<br>
클라이언트 사이드 애그리게이션이 활성화된 경우 집계된 컨텍스트의 수입니다. `v2.11.0` 버전으로 시작합니다.

`datadog.dogstatsd.client.aggregated_context_by_type`
: **메트릭 유형**: 카운트<br>
클라이언트 사이드 애그리게이션이 활성화되었을 때 유형별로 집계된 컨텍스트의 수입니다. `v2.13.0`으로 시작합니다. 메트릭은 기본적으로 `v3.0.0`으로 시작하지만 `v2.13.0`에 대해서는 `enableDevMode(true)`가 필요합니다. 메트릭의 태그는 `metrics_type`입니다.

`datadog.dogstatsd.client.metrics_by_type`
: **메트릭 유형**: 카운트<br>
유형별로 태그가 지정된 애플리케이션이 DogStatsD 클라이언트로 전송한 메트릭의 수 (샘플링 전)입니다. `enableDevMode(true)` 사용 시 `v2.13.0`으로 시작하며, 기본적으로는 `v3.0.0`으로 시작합니다. 메트릭의 태그는 `metrics_type`입니다.

텔레메트리를 비활성화하려면, `enableTelemetry(false)` 빌더 옵션을 사용하세요:

```java
StatsDClient client = new NonBlockingStatsDClientBuilder()
.hostname("localhost")
.port(8125)
.enableTelemetry(false)
.build();
```

클라이언트 설정에 대한 자세한 내용은 [DataDog/java-dogstatsd-client][1]를 참조하세요.


[1]: https://github.com/DataDog/java-dogstatsd-client
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

PHP 클라이언트 `1.5.0` 버전으로 시작합니다. `BatchedDogStatsd` 클라이언트에 대해서는 텔레메트리가 기본적으로 활성화되어 있으며, `DogStatsd` 클라이언트에 대해서는 기본적으로 비활성화되어 있습니다.

`datadog.dogstatsd.client.metrics`
: **메트릭 유형**:<br>
애플리케이션이 DogStatsD 클라이언트로 전송한 `metrics` 개수 (샘플링 전)입니다.


`datadog.dogstatsd.client.events`
: **메트릭 유형**: 카운트<br>
애플리케이션에서 DogStatsD 클라이언트로 전송한 `events` 수입니다.

`datadog.dogstatsd.client.service_checks`
: **메트릭 유형**: 카운트<br>
애플리케이션에서 DogStatsD 클라이언트로 전송한 `service_checks` 수입니다.

`datadog.dogstatsd.client.bytes_sent`
: **메트릭 유형**: 카운트<br>
에이전트에 성공적으로 전송된 바이트 수입니다.

`datadog.dogstatsd.client.bytes_dropped`
: **메트릭 유형**: 카운트<br>
DogStatsD 클라이언트가 삭제한 바이트 수입니다.

`datadog.dogstatsd.client.packets_sent`
: **메트릭 유형**: 카운트<br>
에이전트에게 성공적으로 전송된 데이터그램의 수입니다.

`datadog.dogstatsd.client.packets_dropped`
: **메트릭 유형**: 카운트<br>
DogStatsD 클라이언트가 삭제한 데이터그램의 수입니다.

텔레메트리를 활성화 또는 비활성화하려면 `disable_telemetry` 인수를 사용합니다. 주의할 것은, 
`DogStatsd` 클라이언트와 텔레메트리를 함께 사용하면 네트워크 사용량이 크게 증가합니다.
따라서, 텔레메트리 사용 시 `BatchedDogStatsd`를 사용하는 것이 좋습니다.

`DogStatsd` 클라이언트에서 이를 활성화하려면:

```php
use DataDog\DogStatsd;

$statsd = new DogStatsd(
array('host' => '127.0.0.1',
'port' => 8125,
'disable_telemetry' => false,
)
);
```

`BatchedDogStatsd` 클라이언트에서 텔레메트리를 비활성화하려면:

```php
use DataDog\BatchedDogStatsd;

$statsd = new BatchedDogStatsd(
array('host' => '127.0.0.1',
'port' => 8125,
'disable_telemetry' => true,
)
);
```

클라이언트 설정에 대한 자세한 내용은 [DataDog/php-datadogstatsd][1]을 참조하세요.

[1]: https://github.com/DataDog/php-datadogstatsd
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

.NET 클라이언트 `5.0.0`으로 시작합니다.

`datadog.dogstatsd.client.metrics`
: **메트릭 유형**: 카운트<br>
애플리케이션이 DogStatsD 클라이언트로 전송한 `metrics` 개수 (샘플링 전)입니다.


`datadog.dogstatsd.client.events`
: **메트릭 유형**: 카운트<br>
애플리케이션에서 DogStatsD 클라이언트로 전송한 `events` 수입니다.

`datadog.dogstatsd.client.service_checks`
: **메트릭 유형**: 카운트<br>
애플리케이션에서 DogStatsD 클라이언트로 전송한 `service_checks` 수입니다.

`datadog.dogstatsd.client.bytes_sent`
: **메트릭 유형**: 카운트<br>
에이전트에게 성공적으로 전송된 바이트 수입니다.

`datadog.dogstatsd.client.bytes_dropped`
: **메트릭 유형**: 카운트<br>
DogStatsD 클라이언트가 삭제한 바이트 수입니다.


`datadog.dogstatsd.client.packets_sent`
: **메트릭 유형**: 카운트<br>
에이전트에게 성공적으로 전송된 데이터그램의 수입니다.

`datadog.dogstatsd.client.packets_dropped`
: **메트릭 유형**: 카운트<br>
DogStatsD 클라이언트가 삭제한 데이터그램의 수입니다.

`datadog.dogstatsd.client.packets_dropped_queue`
: **메트릭 유형**: 카운트<br>
DogStatsD 클라이언트 큐가 꽉 차서 삭제된 데이터그램의 수입니다.


`datadog.dogstatsd.client.aggregated_context_by_type`
: **메트릭 유형**: 카운트<br>
클라이언트 사이드 애그리게이션이 활성화된 경우 유형별로 집계된 컨텍스트의 수입니다. `7.0.0` 버전으로 시작합니다.

텔레메트리를 비활성화하려면, `TelemetryFlushInterval`를 `null`로 설정합니다:

```csharp
var dogstatsdConfig = new StatsdConfig
{
    StatsdServerName = "127.0.0.1",
    StatsdPort = 8125,
};

// Disable Telemetry
dogstatsdConfig.Advanced.TelemetryFlushInterval = null;
```

클라이언트 설정에 대한 자세한 내용은 [DataDog/dogstatsd-csharp-client][1]를 참조하세요.



[1]: https://github.com/DataDog/dogstatsd-csharp-client
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/
[2]: /ko/developers/dogstatsd/unix_socket/
[3]: /ko/developers/dogstatsd/#code
[4]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#sample-rates
[5]: /ko/developers/dogstatsd/high_throughput/#note-on-sysctl-in-kubernetes
[6]: https://kubernetes.io/docs/tasks/administer-cluster/sysctl-cluster/