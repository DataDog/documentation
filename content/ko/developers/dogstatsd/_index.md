---
aliases:
- /ko/guides/dogstatsd/
- /ko/guides/DogStatsD/
- /ko/developers/faq/how-to-remove-the-host-tag-when-submitting-metrics-via-dogstatsd/
- /ko/integrations/faq/dogstatsd-and-docker
- /ko/agent/kubernetes/dogstatsd
description: 데이터 유형 및 태깅을 포함하는 DogStatsD 기능에 대한 개요입니다.
further_reading:
- link: integrations/node
  tag: 도움말
  text: NodeJS 통합을 통해 NodeJS용 DogStatsD 활성화
- link: developers/dogstatsd
  tag: 도움말
  text: DogStatsD 소개
- link: developers/libraries
  tag: 설명서
  text: 공식적으로 커뮤니티에서 만든 API 및 DogStatsD 클라이언트 라이브러리
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: 블로그
  text: Datadog을 통해 Azure App Service에서 Linux 웹 앱을 모니터링하세요
kind: 설명서
title: DogStatsD
---

커스텀 애플리케이션 메트릭을 Datadog으로 가져오는 가장 쉬운 방법은 Datadog 에이전트와 함께 제공되는 메트릭 애그리게이션 서비스인 DogStatsD로 보내는 것입니다. DogStatsD는 [StatsD][1] 프로토콜을 구현하고 몇 가지  Datadog-specific 익스텐션을 추가합니다:

- 히스토그램 메트릭 유형
- 서비스 검사
- 이벤트 
- 태깅

호환되는 StatsD 클라이언트는 DogStatsD 및 에이전트와 함께 작동하지만 [Datadog-specific 익스텐션](#dive-into-dogstatsd)은 포함하지 않습니다.

**참고**: DogStatsD는 StatsD의 타이머를 네이티브 메트릭 유형으로 구현하지 않습니다(그러나 [히스토그램][2]을 통해서는 지원).

DogStatsD는 Docker Hub 및 GCR에서 사용할 수 있습니다:

| Docker Hub                                       | GCR                                                       |
|--------------------------------------------------|-----------------------------------------------------------|
| [hub.docker.com/r/datadog/dogstatsd][3]          | [gcr.io/datadoghq/dogstatsd][4]                           |

<div class="alert alert-warning">Docker Hub는 이미지 풀 속도 제한에 영향을 받습니다. Datadog에서는 Docker Hub를 사용하지 않는 사용자의 경우 Datadog 에이전트와 클러스터 에이전트 구성을 GCR 또는 ECR에서 Datadog 에이전트에서 풀하여 업데이트할 것을 권장합니다. 자세한 설명은 <a href="/agent/guide/changing_container_registry">컨테이너 레지스트리 변경</a>을 참고하세요.</div>

## 작동 방식

DogStatsD는 UDP를 통해 [커스텀 메트릭][5], [이벤트][6] 및 [서비스 검사][7]를 수락하고 이를 주기적으로 집계하여 Datadog으로 전달합니다.

UDP를 사용함에 따라 애플리케이션은 DogStatsD로 메트릭을 전송할 수 있으며, 응답을 기다릴 필요 없이 작업을 다시 시작할 수 있습니다. DogStatsD를 사용할 수 없게 되더라도 애플리케이션이 중단되지 않습니다.

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/dogstatsd.png" alt="dogstatsd" >}}

DogStatsD는 데이터를 수신할 때 _flush interval_이라는 기간 동안 고유 메트릭 각각에 대한 여러 데이터 포인트를 단일 데이터 포인트로 집계합니다. DogStatsD는 10초의 플러시 간격을 사용합니다.

## 설정

DogStatsD는 기본적으로 에이전트 v6+에 대해 UDP 포트 `8125`로 활성화됩니다. 이 포트를 변경할 필요가 없는 경우, [코드에 DogStatsD 설정](#code) 방법을 참조하세요.

### 에이전트

{{< tabs >}}
{{% tab "Host Agent" %}}

기본적으로 DogStatsD는 UDP 포트 **8125**에서 수신합니다. 이 옵션을 변경해야 하는 경우 기본 [에이전트 설정 파일][1]에서 `dogstatsd_port` 옵션을 설정하고 에이전트를 재시작하세요. 또한,  DogStatsD가 [Unix 도메인 소켓][2]을 사용하도록 설정할 수 있습니다. 커스텀 에이전트 DogStatsD 서버 UDP 포트를 활성화하려면 다음과 같이 설정하세요:

1. `datadog.yaml` 파일을 편집하여 `use_dogstatsd`및 `dogstatsd_port` 매개 변수의 주석을 제거합니다:

    ```yaml
    ## @param use_dogstatsd - boolean - optional - default: true
    ## Set this option to false to disable the Agent DogStatsD server.
    #
    use_dogstatsd: true

    ## @param dogstatsd_port - integer - optional - default: 8125
    ## Override the Agent DogStatsD port.
    ## Note: Make sure your client is sending to the same UDP port.
    #
    dogstatsd_port: 8125
    ```

2. [에이전트를 재시작합니다][3].


[1]: /ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[2]: /ko/developers/dogstatsd/unix_socket/
[3]: /ko/agent/configuration/agent-commands/
{{% /tab %}}
{{% tab "Container Agent" %}}

기본적으로 DogStatsD는 UDP 포트 **8125**에서 수신하므로 컨테이너에서 에이전트를 실행할 때 이 포트를 호스트 포트에 바인딩해야 합니다. StatsD 메트릭이 `localhost`의 외부에서 오는 경우 `DD_DOGSTATSD_NON_LOCAL_TRAFFIC`를 `true`로 설정하여 메트릭 수집을 허용해야 합니다. DogStatsd 서버를 실행한 상태에서 에이전트를 실행하려면 다음 명령을 실행하세요:

```shell
docker run -d --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC="true" \
              -p 8125:8125/udp \
              gcr.io/datadoghq/agent:latest
```

StatsD 메트릭 수집 시 필요한 포트를 변경해야 하는 경우`DD_DOGSTATSD_PORT="<NEW_DOGSTATSD_PORT>` 환경 변수를 사용합니다. 또한 DogStatsD가 [Unix 도메인 소켓][1]을 사용하도록 설정할 수 있습니다.

#### UDP를 통한 출처 감지

출처 감지는 에이전트 v6.10.0 이상에서 지원되며, DogStatsD가 컨테이너 메트릭의 출처를 감지하고 자동으로 메트릭에 태그를 지정할 수 있도록 합니다. 이 모드가 활성화되면 UDP를 통해 수신된 모든 메트릭은 자동 탐지 메트릭과 동일한 포드 태그로 태그가 지정됩니다.

쿠버네테스가 아닌 환경에서의 출처 감지는 [데이터그램 형식 및 Shell 사용량][2]의 DogStatsD 프로토콜 확장을 기반으로 합니다. 에이전트에서 이 기능을 실행하려면 `DD_DOGSTATSD_ORIGIN_DETECTION_CLIENT` 환경 변수를  `true`로 설정합니다.

**참고**: Fargate 환경에서는 출처 감지가 지원되지 않습니다.

[1]: /ko/developers/dogstatsd/unix_socket/
[2]: /ko/developers/dogstatsd/datagram_shell/?tab=metrics#dogstatsd-protocol-v12
{{% /tab %}}
{{% tab "Kubernetes" %}}

StatsD 메트릭 수집을 시작하려면 DogStatsD 포트를 호스트 포트에 바인딩해야 합니다. DogStatsD가 [Unix 도메인 소켓][1]을 사용하도록 설정할 수도 있습니다.

1. `datadog-agent.yaml` 매니페스트에 `hostPort`를 추가합니다:

    ```yaml
    ports:
        - containerPort: 8125
          hostPort: 8125
          name: dogstatsdport
          protocol: UDP
    ```

   이 설정을 통해 애플리케이션이 실행 중인 노드의 `8125`포트에서 DogStatsD로 메트릭을 전송할 수 있습니다.

   **참고**: `hostPort` 기능을 사용하려면 Calico, Canal 또는 Flannel과 같이 [CNI 사양][2]을 준수하는 네트워크 제공자가 필요합니다. CNI를 준수하지 않는 네트워크 제공자에 대한 해결 방법과 자세한 내용은 쿠버네티스 설명서 [HostPort 서비스가 작동하지 않음][3]을 참조하세요.

   **참고**: 오퍼레이터 디플로이먼트인 경우 `agent.config.hostPort`를 사용하여 호스트 포트를 설정합니다.

2. DogStatsD 비로컬 트래픽을 활성화하여 StatsD 데이터 수집을 하려면  `datadog-agent.yaml` 매니페스트에서`DD_DOGSTATSD_NON_LOCAL_TRAFFIC`을 `true`로 설정합니다:

    ```yaml
    - name: DD_DOGSTATSD_NON_LOCAL_TRAFFIC
      value: 'true'
    ```

   이 설정을 통해 에이전트를 실행하는 컨테이너가 아닌 다른 컨테이너에서 StatsD 데이터를 수집할 수 있습니다.

3. 변경 사항을 적용합니다:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

**경고**: `hostPort`파라미터는 호스트의 포트를 엽니다. 방화벽이 애플리케이션 또는 신뢰할 수 있는 소스로부터의 액세스만 허용하는지 확인하세요. 네트워크 플러그인이 `hostPorts`를 지원하지 않는 경우 에이전트 포드 사양에 `hostNetwork: true`을 추가합니다. 그러면 호스트의 네트워크 네임스페이스가 Datadog 에이전트와 공유됩니다. 또한 컨테이너에서 열려 있는 모든 포트가 호스트에서 열려 있음을 의미합니다. 포트가 호스트와 컨테이너 모두에서 사용되는 경우 포트가 충돌하여(같은 네트워크 네임스페이스를 공유하므로) 포드가 시작되지 않습니다. 일부 쿠버네티스 설치에서는 이를 허용하지 않습니다.

### StatsD 메트릭을 에이전트로 전송

애플리케이션에서 호스트의 IP 주소를 확인할 수 있는 정확한 방법이 필요합니다. 이에 쿠버네티스 1.7에서는 환경 변수로 포드에 전달할 수 있는 속성 집합을 확장하는 것이 가능합니다. 버전 1.7 이상에서는 PodSpec에 환경 변수를 추가하여 모든 포드에 호스트 IP를 전달할 수 있습니다. 예를 들어, 애플리케이션 매니페스트는 다음과 같습니다:

```yaml
env:
    - name: DD_AGENT_HOST
      valueFrom:
          fieldRef:
              fieldPath: status.hostIP
```

이 기능을 사용하면 애플리케이션을 실행하는 모든 포드가 `$DD_AGENT_HOST`에서 `8125` 포트를 통해DogStatsD 메트릭을 전송할 수 있습니다.

**참고**: Datadog는 속성을 할당할 때 통합 서비스 태깅을 사용할 것을 권장합니다. 통합 서비스 태깅은 세 가지 표준 태그인 `env`,`service` 및 `version`을 사용하여 Datadog 텔레메트리를 연결합니다. 환경 통합 방법에 대한 자세한 내용은 [통합 서비스 태깅][4]을 참조하세요.

#### UDP를 통한 출처 감지

출처 감지는 에이전트 6.10.0+에서 지원되며 DogStatsD는 컨테이너 메트릭의 출처를 탐지하고 메트릭에 자동으로 태그를 지정할 수 있습니다. 이 모드를 사용하도록 설정하면 UDP를 통해 수신된 모든 메트릭이 자동탐지 메트릭과 동일한 포드 태그로 태그가 지정됩니다.

**참고**: 

* UDP를 통한 출처 감지는 포드 ID를 엔티티 ID로 사용하므로 컨테이너 레벨 태그가 방출되지 않습니다.
* UDP 대신 [유닉스 도메인 소켓][5]이 있습니다.

UDP를 통해 출처 감지를 활성화하려면, 애플리케이션 매니페스트에 다음 행을 추가합니다:

```yaml
env:
    - name: DD_ENTITY_ID
      valueFrom:
          fieldRef:
              fieldPath: metadata.uid
```

출처 감지를 사용하여 수집된 메트릭에 대해 [태그 카디널리티][6]를 설정하려면 환경 변수`DD_DOGSTATSD_TAG_CARDINALITY`를 `low`(기본값) 또는 `orchestrator`로 설정합니다.

**참고:** UDP의 경우 [커스텀 메트릭][7]이 너무 많이 생성되는 것을 방지하기 위해 `pod_name` 태그가 기본값으로 추가되지 않습니다.

[1]: /ko/developers/dogstatsd/unix_socket/
[2]: https://github.com/containernetworking/cni
[3]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
[4]: /ko/getting_started/tagging/unified_service_tagging
[5]: /ko/developers/dogstatsd/unix_socket/?tab=host#using-origin-detection-for-container-tagging
[6]: /ko/getting_started/tagging/assigning_tags/#environment-variables
[7]: /ko/metrics/custom_metrics/
{{% /tab %}}
{{% tab "Helm" %}}

Helm을 사용하여 [DogStatsD][1]로 커스텀 메트릭을 수집하려면:

1. [datadog-values.yaml][2] 파일을 업데이트하여 DogStatsD를 활성화합니다:

    ```yaml
      dogstatsd:
        port: 8125
        useHostPort: true
        nonLocalTraffic: true
    ```

   **참고**: `hostPort` 기능을 사용하려면 Calico, Canal 또는 Flannel과 같이 [CNI 사양][2]을 준수하는 네트워크 제공자가 필요합니다. CNI를 준수하지 않는 네트워크 제공자에 대한 해결 방법과 자세한 내용은 쿠버네티스 설명서 [HostPort 서비스가 작동하지 않음][3]을 참조하세요.

   **경고**: `hostPort`파라미터는 호스트의 포트를 엽니다. 방화벽이 애플리케이션 또는 신뢰할 수 있는 소스로부터의 액세스만 허용하는지 확인하세요. 네트워크 플러그인이 `hostPorts`를 지원하지 않는 경우 에이전트 포드 사양에 `hostNetwork: true`을 추가합니다. 그러면 호스트의 네트워크 네임스페이스가 Datadog 에이전트와 공유됩니다. 또한 컨테이너에서 열려 있는 모든 포트가 호스트에서 열려 있음을 의미합니다. 포트가 호스트와 컨테이너 모두에서 사용되는 경우 포트가 충돌하여(같은 네트워크 네임스페이스를 공유하므로) 포드가 시작되지 않습니다. 일부 쿠버네티스 설치에서는 이를 허용하지 않습니다.

2. 에이전트 설정을 업그레이드합니다:

    ``` shell
    helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
    ```

3. 애플리케이션 포드 업데이트: 애플리케이션에서 호스트의 IP 주소를 확인할 수 있는 정확한 방법이 필요합니다. 이에 쿠버네티스 1.7에서는 환경 변수로 포드에 전달할 수 있는 속성 집합을 확장하는 것이 가능합니다. 버전 1.7 이상에서는 PodSpec에 환경 변수를 추가하여 모든 포드에 호스트 IP를 전달할 수 있습니다. 예를 들어, 애플리케이션 매니페스트는 다음과 같습니다:

    ```yaml
    env:
        - name: DD_AGENT_HOST
          valueFrom:
              fieldRef:
                  fieldPath: status.hostIP
    ```

   이 기능을 사용하면 애플리케이션을 실행하는 모든 포드가 `$DD_AGENT_HOST`의 `8125`포트를 통해 DogStatsD 메트릭을 전송할 수 있습니다.

[1]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[3]: https://github.com/containernetworking/cni
[4]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
{{% /tab %}}
{{< /tabs >}}

### 코드

#### DogStatsD 클라이언트 설치

공식 Datadog-DogStatsD 클라이언트 라이브러리는 다음 언어로 사용할 수 있습니다. 호환되는 StatsD 클라이언트는 DogStatsD 및 에이전트와 함께 작동하지만 위에서 언급한  Datadog-specific 기능은 포함하지 않습니다:
{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}

{{< programming-lang lang="python" >}}

```shell
pip install datadog
```

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

```shell
gem install dogstatsd-ruby
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```shell
go get github.com/DataDog/datadog-go/v5/statsd
```

{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

Java DataDog StatsD 클라이언트는 Maven Central과 함께 배포되며 [Maven에서 다운로드][1]할 수 있습니다. 먼저 다음 설정을 `pom.xml`에 추가합니다:

```xml
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>java-dogstatsd-client</artifactId>
    <version>4.2.1</version>
</dependency>
```



[1]: https://search.maven.org/search?q=g:com.datadoghq%20a:java-dogstatsd-client
{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

다음을 `composer.json`에 추가합니다:

```text
"datadog/php-datadogstatsd": "1.4.*"
```

**참고**: Composer에서 제공되는 첫 번째 버전은 _0.0.3_입니다.

또는 [github.com/DataDog/php-datadogstatsd ][1]에 있는 리포지토리를 수동으로 복제하고 `require './src/DogStatsd.php'`를 사용하여 설정합니다.



[1]: https://github.com/DataDog/php-datadogstatsd#php-datadog-statsd-client
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

Nuget CLI를 사용하여 패키지를 직접 설치하거나 [NuGet에서 PackageReference][1]를 가져옵니다.

```shell
dotnet add package DogStatsD-CSharp-Client
```

[1]: https://www.nuget.org/packages/DogStatsD-CSharp-Client
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}


#### DogStatsD 클라이언트 인스턴스화

DogStatsD 클라이언트가 설치되면 코드에서 인스턴스화합니다:
{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}

{{< programming-lang lang="python" >}}

```python
from datadog import initialize, statsd

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)
```

<div class="alert alert-warning">
기본값으로 파이썬(Python) DogStatsD 클라이언트 인스턴스(<code>statsd</code> 글로벌 인스턴스 포함)는 프로세스 간에 공유할 수 없지만 스레드-세이프입니다. 따라서 상위 프로세스와 각 하위 프로세스는 클라이언트의 고유한 인스턴스를 생성하거나 <code>disable_buffering</code>을 <code>True</code>로 설정하여 버퍼링을 명시적으로 해제해야 합니다. 자세한 내용은 <a href="https://datadogpy.readthedocs.io/en/latest/#datadog-dogstatsd">datadog.dogstatsd</a>의 설명서를 참조하세요.
</div>

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

```ruby
# Import the library
require 'datadog/statsd'

# Create a DogStatsD client instance.
statsd = Datadog::Statsd.new('localhost', 8125)
```

<div class="alert alert-info">
컨테이너 에이전트나 쿠버네티스에서 DogStatsD를 사용하는 경우, StatsD 메트릭이 전달되는 호스트를 인스턴스화해야 합니다. 이를 위해 유닉스 도메인 소켓을 사용하는 경우 <code>$DD_DOGSTATSD_SOCKET</code> 환경 변수를 사용하거나, 호스트 포트 바인딩 방식을 사용하는 경우 <code>$DD_AGENT_HOST</code> 환경 변수를 사용해야 합니다.
</div>

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
dogstatsd_client, err := statsd.New("127.0.0.1:8125")
if err != nil {
    log.Fatal(err)
}
```

자세한 옵션은 [Datadog의 GoDoc][1]을 참조하세요.



[1]: https://pkg.go.dev/github.com/DataDog/datadog-go/v5/statsd
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

```java
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd")
            .hostname("localhost")
            .port(8125)
            .build();


        // alternatively
        StatsDClient statsdAlt = new NonBlockingStatsDClient(
            new NonBlockingStatsDClientBuilder(
                .prefix("statsd")
                .hostname("localhost")
                .port(8125)
                .resolve()));

    }
}
```

{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

Composer를 사용하여 새 DogStatsd 개체를 인스턴스화합니다:

```php
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('host' => '127.0.0.1',
          'port' => 8125,
     )
  );
```

{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

DogStatsd 클래스를 설정합니다:

```csharp
// The code is located under the StatsdClient namespace
using StatsdClient;

// ...

var dogstatsdConfig = new StatsdConfig
{
    StatsdServerName = "127.0.0.1",
    StatsdPort = 8125,
};

using (var dogStatsdService = new DogStatsdService())
{
    if (!dogStatsdService.Configure(dogstatsdConfig))
        throw new InvalidOperationException("Cannot initialize DogstatsD. Set optionalExceptionHandler argument in the `Configure` method for more information.");
    // ...
} // Flush metrics not yet sent
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### 클라이언트 인스턴스화 파라미터

**참고**: Datadog는 태그를 할당할 때 통합 서비스 태깅을 사용할 것을 권장합니다. 통합 서비스 태깅은 세 가지 표준 태그 `env`,`service`, `version`를 사용하여 Datadog 텔레메트리를 연결합니다. 환경 통합 방법에 대한 자세한 내용은 [통합 서비스 태깅][8]을 참조하세요.

필수 DogStatsD 설정 (`url` 및 `port`) 외에도 DogStatsD 클라이언트에 대해 다음 파라미터를 사용할 수 있습니다:

{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}
{{< programming-lang lang="python" >}}
| Parameter              | Type            | Default     | Description                                                                                                    |
| ---------------------- | --------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `statsd_host`          | String          | `localhost` | The host of your DogStatsD server.                                                                             |
| `statsd_port`          | Integer         | `8125`      | The port of your DogStatsD server.                                                                             |
| `statsd_socket_path`   | String          | `null`      | The path to the DogStatsD Unix domain socket (overrides `host` and `port`, only supported with the Agent v6+). |
| `statsd_constant_tags` | List of strings | `null`      | Tags to apply to all metrics, events, and service checks.                                                      |
| `statsd_namespace`     | String          | `null`      | Namespace to prefix all metrics, events, and service checks.                                                   |

`datadog.dogstatsd.DogStatsd` 인스턴스를 명시적으로 인스턴스화할 때만 사용할 수 있는 매개 변수뿐만 아니라 `datadog.initialize()`를 위해서도 사용할 수 있는 매개 변수 전체 목록은 [Datadog Python 라이브러리][1]를 참조하세요.


[1]: https://datadogpy.readthedocs.io/en/latest
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

| 파라미터       | 유형            | 기본값     | 설명                                                                                                    |
| --------------- | --------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `host`          | 문자열          | `localhost` | DogStatsD 서버의 호스트입니다.                                                                             |
| `port`          | 정수         | `8125`      | DogStatsD 서버의 포트입니다.                                                                             |
| `socket_path`   | 문자열          | `null`      | DogStatsD 유닉스 도메인 소켓의 경로입니다(`host` 및 `port`를 재정의, 에이전트 v6+에서만 지원됨). |
| `tags`          | 문자열 목록 | `null`      | 모든 메트릭, 이벤트 및 서비스 검사에 적용되는 태그입니다.                                                      |
| `namespace`     | 문자열          | `null`      | 모든 메트릭, 이벤트 및 서비스 검사에서 접두사로 사용할 네임스페이스입니다.                                                |
| `single_thread` | 부울 연산자         | `false`     | 활성화된 상태에서 클라이언트가 메트릭을 컴패니언 스레드가 아닌 메인 스레드에서 전송하도록 합니다.           |

부수적 파라미터의 전체 목록은 GitHub의 [dogstatsd-ruby repo][1]를 참조하세요.


[1]: https://github.com/DataDog/dogstatsd-ruby
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Go 클라이언트에는 클라이언트의 동작을 설정할 수 있는 여러 옵션이 있습니다.

| 파라미터                     | 유형            | 설명                                                                  |
| ----------------------------- | --------------- | ---------------------------------------------------------------------------- |
| `WithNamespace()`             | 문자열          | 모든 메트릭, 이벤트 및 서비스 검사에서 접두사로 사용할 네임스페이스를 설정합니다.  |
| `WithTags()`                  | 문자열 목록 | 모든 메트릭, 이벤트 및 서비스 검사에 적용되는 글로벌 태그입니다.               |

사용 가능한 모든 옵션은 [Datadog의 GoDoc][1]을 참조하세요.


[1]: https://pkg.go.dev/github.com/DataDog/datadog-go/v5/statsd#Option
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

v2.10.0 버전부터 클라이언트 인스턴스화 권장 방법은 NonBlockingStatsDClientBuilder를 사용하는 것입니다. 다음 빌더 방식을 사용하여 클라이언트 파라미터를 정의할 수 있습니다.

| 빌더 방식                               | 유형           | 기본값   | 설명                                                                         |
| -------------------------------------------- | -------------- | --------- | ----------------------------------------------------------------------------------- |
| `prefix(String val)`                         | 문자열         | null      | 모든 메트릭, 이벤트 및 서비스 검사에 적용할 접두사입니다.                     |
| `hostname(String val)`                       | 문자열         | 로컬호스트 | 타겟팅된 StatsD 서버의 호스트 이름입니다.                                        |
| `port(int val)`                              | 정수        | 8125      | 타겟팅된 StatsD 서버의 포트입니다.                                             |
| `constantTags(String... val)`                | 문자열 변수 | null      | 모든 메트릭, 이벤트 및 서비스 검사에 적용할 글로벌 태그입니다.                |
| `blocking(boolean val)`                      | 부울 연산자        | false     | 인스턴스화할 클라이언트 유형: 차단 대 비차단.                        |
| `socketBufferSize(int val)`                  | 정수        | -1        | 기본 소켓 버퍼의 크기입니다.                                           |
| `enableTelemetry(boolean val)`               | 부울 연산자        | false     | 텔레메트리를 보고하는 클라이언트입니다.                                                         |
| `entityID(String val)`                       | 문자열         | null      | 출처 감지를 위한 엔티티 ID입니다.                                                   |
| `errorHandler(StatsDClientErrorHandler val)` | 정수        | null      | 내부 클라이언트 오류 발생 시 오류 처리기.                                  |
| `maxPacketSizeBytes(int val)`                | 정수        | 8192/1432 | 최대 패킷 크기; UDS에서는 8192, UDP에서는 1432.                               |
| `processorWorkers(int val)`                  | 정수        | 1         | 제출을 위해 버퍼를 조립하는 프로세서 작업자 스레드 수입니다.           |
| `senderWorkers(int val)`                     | 정수        | 1         | 소켓에 버퍼를 제출하는 발신자 작업자 스레드 수입니다.               |
| `poolSize(int val)`                          | 정수        | 512       | 네트워크 패킷 버퍼 풀 크기입니다.                                                    |
| `queueSize(int val)`                         | 정수        | 4096      | 큐에서 처리되지 않은 최대 메시지 수입니다.                                |
| `timeout(int val)`                           | 정수        | 100       | 차단 작업의 시간 제한(밀리초)을 설정합니다. 유닉스 소켓에만 적용됩니다.  |

자세한 내용을 보려면, Java DogStatsD [패키지][1]에서 NonBlockingStatsDClient 클래스와 NonBlockingStatsDClientBuilder 클래스를 검색하세요. 클라이언트 릴리스와 버전이 일치하는지 반드시 확인하세요.


[1]: https://javadoc.io/doc/com.datadoghq/java-dogstatsd-client/latest/index.html
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

| 파라미터     | 유형            | 기본값    | 설명                                                                                                                                                                            
          |
| ------------- | --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `host`        | 문자열         | `localhost` | DogStatsD 서버의 호스트입니다. 설정되지 않은 경우  Agent는 `DD_AGENT_HOST` 또는 `DD_DOGSTATSD_URL` 환경 변수를 확인합니다.                                                          |
| `port`        | 정수         | `8125`      | DogStatsD 서버의 포트입니다. 설정되지 않은 경우 Agent는 `DD_DOGSTATSD_PORT` 또는 `DD_DOGSTATSD_URL` 환경 변수를 확인합니다.                                             |
| `socket_path` | 문자열        | `null`      | DogStatsD Unix 도메인 소켓에 대한 경로입니다(`host`및 `port` 재정의). Agent v6+에서만 지원됩니다. 설정되지 않은 경우 Agent는 `DD_DOGSTATSD_URL` 환경 변수를 확인합니다. |
| `global_tags` | 문자열 목록 | `null`      | 모든 메트릭, 이벤트 및 서비스 검사에 적용할 태그입니다. `@dd.internal.entity_id` 태그는 `DD_ENTITY_ID` 환경 변수의 global_tags에 추가됩니다. |

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

| 파라미터          | 유형            | 기본값     | 설명                                                          |
| ------------------ | --------------- | ----------- | -------------------------------------------------------------------- |
| `StatsdServerName` | 문자열          | `localhost` | 타겟팅된 StatsD 서버의 호스트 이름입니다.                         |
| `StatsdPort`       | 정수         | `8125`      | 타겟팅된 StatsD 서버의 포트입니다.                              |
| `Prefix`           | 문자열          | `null`      | 모든 메트릭, 이벤트 및 서비스 검사에 적용할 접두사입니다.           |
| `ConstantTags`     | 문자열 목록 | `null`      | 모든 메트릭, 이벤트 및 서비스 검사에 적용할 글로벌 태그입니다. |

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## DogStatsD 자세히 알아보기

DogStatsD와 StatsD는 대체로 유사하지만, DogStatsD에는 사용 가능한 데이터 유형, 이벤트, 서비스 검사 및 태그를 포함한 DataDog 관련 고급 기능이 포함되어 있습니다:

{{< whatsnext desc="">}}
{{< nextlink href="/metrics/custom_metrics/dogstatsd_metrics_submission/" >}}DogStatsD를 사용하여 Datadog에 메트릭 전송.{{< /nextlink >}}
{{< nextlink href="/service_management/events/guides/dogstatsd/" >}}DogStatsD를 사용하여 Datadog에 이벤트 전송.{{< /nextlink >}}
{{< nextlink href="/developers/service_checks/dogstatsd_service_checks_submission/" >}}DogStatsD를 사용하여 Datadog에 서비스 검사 전송.{{< /nextlink >}}
{{< /whatsnext >}}

DogStatsD에서 사용하는 데이터그램 형식에 대해 자세히 알고 싶거나 자체 Datadog 라이브러리를 개발하려면 [데이터그램과 쉘 사용(율)][9] 섹션을 참조하세요. 명령줄에서 직접 메트릭과 이벤트를 보내는 방법도 확인할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/etsy/statsd
[2]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://hub.docker.com/r/datadog/dogstatsd
[4]: https://gcr.io/datadoghq/dogstatsd
[5]: /ko/metrics/custom_metrics/
[6]: /ko/service_management/events/guides/dogstatsd/
[7]: /ko/developers/service_checks/dogstatsd_service_checks_submission/
[8]: /ko/getting_started/tagging/unified_service_tagging
[9]: /ko/developers/dogstatsd/datagram_shell/