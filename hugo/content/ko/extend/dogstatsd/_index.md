---
aliases:
- /ko/guides/dogstatsd/
- /ko/guides/DogStatsD/
- /ko/developers/faq/how-to-remove-the-host-tag-when-submitting-metrics-via-dogstatsd/
- /ko/integrations/faq/dogstatsd-and-docker
- /ko/agent/kubernetes/dogstatsd
- /ko/developers/dogstatsd/
description: 데이터 유형 및 태깅을 포함하는 DogStatsD 기능에 대한 개요입니다.
further_reading:
- link: integrations/node
  tag: 설명서
  text: Node.js 통합으로 Node.js용 DogStatsD 활성화
- link: extend/dogstatsd
  tag: 설명서
  text: DogStatsD 소개
- link: extend/libraries
  tag: 설명서
  text: 공식 및 커뮤니티에서 생성한 API 및 DogStatsD 클라이언트 라이브러리
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: 블로그
  text: Datadog를 통해 Azure App Service에서 Linux 웹 앱 모니터링
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: 블로그
  text: Datadog의 CSI 드라이버로 보안 Kubernetes 환경에 고성능 관측 가능성 실현
- link: https://learn.datadoghq.com/courses/create-custom-metrics-dogstatsd
  tag: 학습 센터
  text: DogStatsD로 Custom Metrics 생성
title: DogStatsD
---
사용자 지정 애플리케이션 메트릭을 Datadog으로 가져오는 가장 쉬운 방법은 Datadog Agent와 함께 번들로 제공되는 메트릭 집계 서비스인 DogStatsD로 보내는 것입니다. DogStatsD는 [StatsD][1] 프로토콜을 구현하고 몇 가지 Datadog 전용 확장을 추가합니다.

- 히스토그램 메트릭 유형
- 서비스 검사
- 이벤트
- 태깅

호환되는 모든 StatsD 클라이언트는 DogStatsD 및 Agent와 함께 작동하지만, [Datadog 전용 확장](#dive-into-dogstatsd)은 포함하지 않습니다.

**참고**: DogStatsD는 StatsD의 타이머를 네이티브 메트릭 유형으로 구현하지 않습니다([히스토그램][2]을 통해서는 지원함).

DogStatsD는 Datadog 컨테이너 레지스트리, GAR, ECR, Azure ACR 및 Docker Hub에서 사용할 수 있습니다.

| 레지스트리                   | 이미지                                   |
| -------------------------- | --------------------------------------- |
| Datadog 컨테이너 레지스트리 | [registry.datadoghq.com/dogstatsd][33]  |
| Google Artifact Registry   | [gcr.io/datadoghq/dogstatsd][4]         |
| Amazon ECR                 | [public.ecr.aws/datadog/dogstatsd][34]  |
| Azure ACR                  | datadoghq.azurecr.io/dogstatsd          |
| Docker Hub                 | [hub.docker.com/r/datadog/dogstatsd][3] |

<div class="alert alert-warning">Docker Hub에는 이미지 풀 속도 제한이 적용됩니다. Docker Hub 고객이 아닌 경우, Datadog은 Datadog 컨테이너 레지스트리를 사용하거나 클라우드 공급자 레지스트리를 사용하는 것을 권장합니다. 관련 지침은 <a href="/agent/guide/changing_container_registry">컨테이너 레지스트리 변경</a>을 참조하세요.</div>

## 작동 방식 {#how-it-works}

DogStatsD는 UDP를 통해 [Custom Metrics][5], [이벤트][6] 및 [서비스 검사][7]를 수락하고 이를 주기적으로 집계하여 Datadog으로 전달합니다.

이것은 UDP를 사용하기 때문에 애플리케이션이 메트릭을 DogStatsD로 보내고, 응답을 기다리지 않고 작업을 재개할 수 있습니다. DogStatsD를 사용할 수 없게 되더라도 애플리케이션에 중단이 발생하지 않습니다.

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/dogstatsd.png" alt="dogstatsd" >}}

DogStatsD는 데이터를 수신할 때 _Flush 간격_이라는 기간 동안 각각의 고유한 메트릭에 대한 데이터 포인트 여러 개를 데이터 포인트 하나로 집계합니다. DogStatsD는 10초의 Flush 간격을 사용합니다.

## 설정 {#setup}

DogStatsD는 서버(Datadog Agent와 번들됨)와 클라이언트 라이브러리(여러 언어로 사용 가능)로 구성됩니다. DogStatsD 서버는 Agent v6+에 대하여 UDP 포트 `8125`에서 기본적으로 활성화되어 있습니다. 필요한 경우 서버에 사용자 지정 포트를 설정할 수 있습니다. 클라이언트를 Datadog Agent DogStatsD 서버의 주소 및 포트와 일치하도록 구성하세요.

### Datadog Agent DogStatsD 서버 {#datadog-agent-dogstatsd-server}

{{< tabs >}}
{{% tab "Host Agent" %}}

포트를 변경해야 하는 경우, 기본 [Agent 구성 파일][1]의 `dogstatsd_port` 옵션을 구성한 다음 Agnet를 재시작합니다. DogStatsD가 [UNIX 도메인 소켓][2]을 사용하도록 구성할 수도 있습니다.

사용자 지정 Agent DogStatsD 서버 UDP 포트를 활성화하는 방법:

1. `dogstatsd_port` 파라미터 설정:

    ```yaml
    ## @param dogstatsd_port - integer - optional - default: 8125
    ## Override the Agent DogStatsD port.
    ## Note: Make sure your client is sending to the same UDP port.
    #
    dogstatsd_port: 8125
    ```

2. [Agent를 재시작합니다][3].

[1]: /ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[2]: /ko/extend/dogstatsd/unix_socket/
[3]: /ko/agent/configuration/agent-commands/
{{% /tab %}}
{{% tab "Container Agent" %}}

기본적으로 DogStatsD는 UDP 포트 **8125**에서 수신하므로, Agent를 컨테이너에서 수행하는 경우 이 포트를 호스트 포트에 바인딩해야 합니다. StatsD 메트릭이 `localhost` 외부에서 오는 경우, `DD_DOGSTATSD_NON_LOCAL_TRAFFIC`을 `true`로 설정하여 메트릭 수집을 허용해야 합니다. DogStatsD 서버를 가동하는 상태로 Agent를 실행하려면 다음 명령 실행:

```shell
docker run -d --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC="true" \
              -p 8125:8125/udp \
              registry.datadoghq.com/agent:latest
```

StatsD 메트릭을 수집하는 데 사용되는 포트를 변경해야 하는 경우, `DD_DOGSTATSD_PORT="<NEW_DOGSTATSD_PORT>` 환경 변수를 사용하세요. DogStatsD가 [UNIX 도메인 소켓][1]을 사용하도록 구성할 수도 있습니다.

[1]: /ko/extend/dogstatsd/unix_socket/
{{% /tab %}}
{{% tab "Datadog Operator" %}}

StatsD 메트릭 수집은 [UNIX 도메인 소켓][1]에서 기본적으로 활성화되어 있습니다. UDP를 통해 StatsD 메트릭 수집을 시작하려면 Operator 설정에서 DogStatsD 기능을 활성화해야 합니다.

1. `datadog-agent.yaml` 매니페스트에 `features.dogstatsd.hostPortConfig.enabled` 추가:

    ```yaml
    features:
        dogstatsd:
            hostPortConfig:
                enabled: true
    ```

    This is an example `datadog-agent.yaml` manifest:
    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      global:
        credentials:
          apiSecret:
            secretName: datadog-secret
            keyName: api-key
      features:
        dogstatsd:
          hostPortConfig:
            enabled: true
    ```

    This enables the Agent to collect StatsD metrics over UDP on port `8125`.

2. 변경 사항 적용:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

**경고**: `features.dogstatsd.hostPortConfig.hostPort` 파라미터는 호스트에서 포트를 엽니다. 방화벽이 애플리케이션 또는 신뢰할 수 있는 소스에서만 액세스를 허용하도록 해야 합니다. 네트워크 플러그인이`hostPorts`를 지원하지 않는 경우, Agent 포드 사양에 `hostNetwork: true`를 추가하세요. 이렇게 하면 호스트의 네트워크 네임스페이스를 Datadog Agent와 공유합니다. 또한 컨테이너에서 열린 모든 포트나 호스트에서 열린다는 의미이기도 합니다. 포트가 호스트 및 컨테이너 양쪽 모두에서 사용되는 경우, 충돌이 발생하며(동일한 네트워크 네임스페이스를 공유하기 때문에) 포드가 시작되지 않습니다. 일부 Kubernetes 설치는 이것을 허용하지 않습니다.

### StatsD 메트릭을 Agent로 전송 {#send-statsd-metrics-to-the-agent}

애플리케이션에는 호스트의 IP 주소를 판별할 신뢰할 수 있는 방법이 필요합니다. 이것은 Kubernetes 1.7에서는 포드에 환경 변수로 전달할 수 있는 속성 세트가 확장되어 간편해졌습니다. 1.7 이상 버전에서는 PodSpec에 환경 변수를 추가하여 어느 포드에든 호스트 IP를 전달할 수 있습니다. 예를 들어 애플리케이션 매니페스트는 다음과 같을 수 있습니다.

```yaml
env:
    - name: DD_AGENT_HOST
      valueFrom:
          fieldRef:
              fieldPath: status.hostIP
```

이 기능을 사용하면 애플리케이션을 실행하는 모든 포드가 `$DD_AGENT_HOST`에서 포트 `8125`를 사용해 DogStatsD 메트릭을 전송할 수 있습니다.

**참고**: Datadog은 속성을 할당할 때 unified service tagging을 사용하는 것을 모범 사례로 권장합니다. Unified service tagging은 Datadog `env`, `service`, `version`의 세 가지 표준 태그를 사용하여 Datadog 텔레메트리를 연결합니다. 환경을 통합하는 방법은 [unified service tagging][4]을 참조하세요.

[1]: /ko/extend/dogstatsd/unix_socket/
[2]: https://github.com/containernetworking/cni
[3]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
[4]: /ko/getting_started/tagging/unified_service_tagging
{{% /tab %}}
{{% tab "Helm" %}}

Helm을 사용하여 [DogStatsD][1]로 Custom Metrics을 수집하는 방법:

1. [datadog-values.yaml][2] 파일을 업데이트하여 DogStatsD 활성화:

    ```yaml
      dogstatsd:
        port: 8125
        useHostPort: true
        nonLocalTraffic: true
    ```

     **Note**: `hostPort` functionality requires a networking provider that adheres to the [CNI specification][3], such as Calico, Canal, or Flannel. For more information, including a workaround for non-CNI network providers, see the Kubernetes documentation: [HostPort services do not work][4].

     **Warning**: The `hostPort` parameter opens a port on your host. Make sure your firewall only allows access from your applications or trusted sources. If your network plugin doesn't support `hostPorts`, so add `hostNetwork: true` in your Agent pod specifications. This shares the network namespace of your host with the Datadog Agent. It also means that all ports opened on the container are opened on the host. If a port is used both on the host and in your container, they conflict (since they share the same network namespace) and the pod does not start. Some Kubernetes installations do not allow this.

2. Agent 구성 업그레이드:

    ``` shell
    helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
    ```

3. 애플리케이션 포드 업데이트: 애플리케이션에 호스트의 IP 주소를 판별할 신뢰할 수 있는 방법이 필요합니다. 이것은 Kubernetes 1.7에서는 포드에 환경 변수로 전달할 수 있는 속성 세트가 확장되어 간편해졌습니다. 1.7 이상 버전에서는 PodSpec에 환경 변수를 추가하여 어느 포드에든 호스트 IP를 전달할 수 있습니다. 예를 들어 애플리케이션 매니페스트는 다음과 같을 수 있습니다.

    ```yaml
    env:
        - name: DD_AGENT_HOST
          valueFrom:
              fieldRef:
                  fieldPath: status.hostIP
    ```

     With this, any pod running your application is able to send DogStatsD metrics through port `8125` on `$DD_AGENT_HOST`.

[1]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[3]: https://github.com/containernetworking/cni
[4]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
{{% /tab %}}
{{< /tabs >}}

### 출처 감지 {#origin-detection}

Datadog Agent v6.10.0은 _출처 감지_를 지원하며, DogStatsD는 이를 통해 컨테이너 메트릭의 출처가 어디인지 감지하고 메트릭을 자동으로 태그합니다. 출처 감지가 활성화되면 UDP를 통해 수신된 모든 메트릭은 
Autodiscovery 메트릭과 같은 포드 태그로 태그됩니다.

#### DogStatsD 클라이언트에서 {#in-a-dogstatsd-client}

모든 DogStatsD 클라이언트에서는 기본적으로 출처 감지가 활성화되어 있습니다.  

클라이언트에서 출처 감지를 **비활성화**하려면 다음 액션 중 한 가지를 수행하세요.
- 환경 변수 `DD_ORIGIN_DETECTION_ENABLED=false`  설정
- DogStatsD 라이브러리가 출처 감지를 비활성화하도록 구성합니다. 자세한 지침은 [DogStatsD 라이브러리별 설명서][10]를 참조하세요.

#### Datadog Agent에서 {#in-the-datadog-agent}
Datadog Agent에서는 출처 감지가 기본적으로 활성화되어 있지 않습니다. Datadog Agent에서 출처 감지를 **활성화**하려면 `DD_DOGSTATSD_ORIGIN_DETECTION_CLIENT` 환경 변수를 `true`로 설정하세요.

[포드 사양에서 `shareProcessNamespace:true`를 설정하면][12] Agent가 EKS Fargate에서 출처를 감지하는 데 도움이 됩니다.

#### 출처가 감지되는 방식 {#how-origins-are-detected}

출처 감지는 여러 가지 방식으로 실현됩니다. cgroups를 통한 출처 감지는 기본적으로 활성화되어 있습니다. UDP 또는 `DD_EXTERNAL_ENV`를 통한 출처 감지는 구성이 필요합니다.

{{< tabs >}}
{{% tab "cgroups" %}}
Linux에서는 `cgroups`와 관련된 `procfs` 항목에서 컨테이너 ID를 추출할 수 있습니다. 클라이언트는 `/proc/self/cgroup` 또는 `/proc/self/mountinfo`에서 데이터를 읽어 컨테이너 ID 파싱을 시도합니다. 

cgroup v2에서는 `/proc/self/cgroup`에서 cgroup 경로를 리졸브하고, 이를 `/proc/self/mountinfo`의 cgroup 마운트 지점과 결합하여 컨테이너 ID를 추론할 수 있습니다. 그 결과로 생성되는 디렉터리의 inode가 Datadog Agent로 전송됩니다. Datadog Agent가 클라이언트와 동일한 노드에 있는 경우, 이 정보를 사용하여 포드의 UID를 식별할 수 있습니다.
{{% /tab %}}

{{% tab "UDP" %}}
UDP를 통해 출처 감지를 활성화하려면, 애플리케이션 매니페스트에 다음 행을 추가합니다.

```yaml
env:
- name: DD_ENTITY_ID
    valueFrom:
      fieldRef:
        fieldPath: metadata.uid
```

DogStatsD 클라이언트는 내부 태그 `entity_id`를 추가합니다. 이 태그의 값은 `DD_ENTITY_ID` 환경 변수의 내용이며, 이것이 포드의 UID입니다. 

<div class="alert alert-info">UDP의 경우, <code>pod_name</code> <a href="/metrics/custom_metrics/">Custom Metrics</a>가 너무 많이 생성되지 않도록 하기 위해 태그가 기본적으로 추가되지 않습니다.</div>
{{% /tab %}}

{{% tab "DD_EXTERNAL_ENV" %}}
포드에 다음 레이블 추가:

```
admission.datadoghq.com/enabled: "true"
```

포드에 이 레이블이 있으면 [Admissions Controller][1]가 환경 변수 `DD_EXTERNAL_ENV`를 주입합니다. 이 변수의 값이 메트릭과 함께 필드로 전송되고, Datadog Agent가 이것을 사용하여 메트릭의 출처를 파악할 수 있습니다.

[1]: /ko/containers/cluster_agent/admission_controller
{{% /tab %}}
{{< /tabs >}}

#### 캐그 카디널리티 {#tag-cardinality}

태그 카디널리티에 관한 자세한 정보는 [태그 할당: 태그 카디널리티][11]를 참조하세요.

##### 전역적으로 {#globally}

전역적으로 태그 카디널리티를 지정하려면 `DD_CARDINALITY` 환경 변수를 설정하거나, 생성자에 `'cardinality'` 필드를 전달하면 됩니다. 

##### 메트릭당 {#per-metric}

메트릭당 태그 카디널리티를 지정하려면 `cardinality` 파라미터의 값을 전달하세요. 이 파라미터의 유효한 값은 `"none"`, `"low"`, `"orchestrator"` 또는 `"high"`입니다.

### DogStatsD 클라이언트 {#dogstatsd-client}

원하는 언어로 DogStatsD 클라이언트 라이브러리를 설치하고 Datadog 에이전트 DogStatsD 서버의 주소 및 포트와 일치하도록 구성합니다.

#### DogStatsD 클라이언트 설치 {#install-the-dogstatsd-client}

공식 Datadog-DogStatsD 클라이언트 라이브러리는 다음 언어로 사용할 수 있습니다. 호환되는 모든 StatsD 클라이언트는 DogStatsD 및 Agent와 함께 작동하지만, 위에 언급한 Datadog 전용 기능은 포함하지 않습니다.
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

Java DataDog StatsD C클라이언트는 Maven Central과 함께 배포되며, [Maven에서 다운로드][1]할 수 있습니다. 다음 구성을 `pom.xml`에 추가하여 시작:

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

다음 내용을 `composer.json`에 추가:

```text
"datadog/php-datadogstatsd": "1.6.*"
```

**참고**: Composer에서 제공되는 첫 번째 버전은 _0.0.3_입니다.

또는 [github.com/DataDog/php-datadogstatsd][1]에서 리포지토리를 수동으로 복제하고 `require './src/DogStatsd.php'`를 사용하여 설정하세요.



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


#### DogStatsD 클라이언트 인스턴스화 {#instantiate-the-dogstatsd-client}

DogStatsD 클라이언트가 설치되고 나면 코드에서 인스턴스화:
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

<div class="alert alert-danger">
  기본적으로 Python DogStatsD 클라이언트 인스턴스(글로벌 <code>statsd</code> 인스턴스 포함)는 프로세스 전체에서 공유할 수 없지만, 스레드 안전(thread-safe)합니다. 이 때문에, 상위 프로세스와 각 하위 프로세스가 클라이언트의 자체 인스턴스를 생성하거나 명시적으로 버퍼링을 비활성화해야 합니다( <code>disable_buffering</code> 을 <code>True</code>로 설정). 자세한 내용은 <a href="https://datadogpy.readthedocs.io/en/latest/#datadog-dogstatsd">datadog.dogstatsd</a> 설명서를 참조하세요.
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
  DogStatsD를 Containger Agent와 함께 사용하거나 Kubernetes에서 사용하는 경우, StatsD 메트릭스를 전달할 대상 호스트를 <code>$DD_DOGSTATSD_SOCKET</code> 환경 변수로 인스턴스화하거나(UNIX 도메인 소켓을 사용하는 경우), <code>$DD_AGENT_HOST</code> 환경 변수를 사용해 인스턴스화해야 합니다(호스트 포트 바인딩 방법을 사용하는 경우).
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

composer를 사용해 새 DogStatsd 개체 인스턴스화:

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

DogStatsd 클래스 구성:

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

### 클라이언트 인스턴스화 파라미터 {#client-instantiation-parameters}

**참고**: Datadog에서는 태그를 할 당할 때 unified service tagging을 사용하는 것을 모범 사례로 권장합니다. Unified service tagging은 Datadog `env`, `service`, `version`의 세 가지 표준 태그를 사용하여 Datadog 텔레메트리를 연결합니다. 환경을 통합하는 방법은 [unified service tagging][8]을 참조하세요.

필수 DogStatsD 구성(`url` 및 `port`) 외에 DogStatsD 클라이언트에 사용할 수 있는 옵션 파라미터는 다음과 같습니다.

{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}
{{< programming-lang lang="python" >}}
| 파라미터              | 유형            | 기본값     | 설명                                                                                                    |
| ---------------------- | --------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `statsd_host`          | 문자열          | `localhost` | DogStatsD 서버의 호스트입니다.                                                                             |
| `statsd_port`          | 정수         | `8125`      | DogStatsD 서버의 포트입니다.                                                                             |
| `statsd_socket_path`   | 문자열          | `null`      | DogStatsD UNIX 도메인 소켓의 경로입니다(`host` 및 `port`를 재정의함, Agent v6+에서만 지원됨). |
| `statsd_constant_tags` | 문자열 목록 | `null`      | 모든 메트릭, 이벤트, 서비스 검사에 적용되는 태그입니다.                                                      |
| `statsd_namespace`     | 문자열          | `null`      | 모든 메트릭, 이벤트, 서비스 검사에서 접두사로 사용할 네임스페이스입니다.                                                   |

`datadog.initialize()`에 사용할 수 있는 선택 사항 파라미터와 `datadog.dogstatsd.DogStatsd` 인스턴스를 명시적으로 인스턴스화하는 경우에만 사용할 수 있는 파라미터 전체 목록은 [Datadog Python 라이브러리][1]를 참조하세요.


[1]: https://datadogpy.readthedocs.io/en/latest
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

| 파라미터       | 유형            | 기본값     | 설명                                                                                                    |
| --------------- | --------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `host`          | 문자열          | `localhost` | DogStatsD 서버의 호스트입니다.                                                                             |
| `port`          | 정수         | `8125`      | DogStatsD 서버의 포트입니다.                                                                             |
| `socket_path`   | 문자열          | `null`      | DogStatsD UNIX 도메인 소켓의 경로입니다(`host` 및 `port`를 재정의함, Agent v6+에서만 지원됨). |
| `tags`          | 문자열 목록 | `null`      | 모든 메트릭, 이벤트, 서비스 검사에 적용되는 태그입니다.                                                      |
| `namespace`     | 문자열          | `null`      | 모든 메트릭, 이벤트, 서비스 검사에서 접두사로 사용할 네임스페이스입니다.                                                |
| `single_thread` | 부울         | `false`     | 활성화된 상태에서 클라이언트가 메트릭을 컴패니언 스레드가 아니라 메인 스레드에서 전송하게 합니다.           |

옵션 파라미터의 전체 목록은 GitHub의 [dogstatsd-ruby repo][1]를 참조하세요.


[1]: https://github.com/DataDog/dogstatsd-ruby
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Go 클라이언트에는 클라이언트의 동작을 설정할 수 있는 여러 옵션이 있습니다.

| 파라미터         | 유형            | 설명                                                                 |
| ----------------- | --------------- | --------------------------------------------------------------------------- |
| `WithNamespace()` | 문자열          | 모든 메트릭, 이벤트, 서비스 검사에서 접두사로 사용할 네임스페이스를 구성합니다. |
| `WithTags()`      | 문자열 목록 | 모든 메트릭, 이벤트 및 서비스 검사에 적용되는 전역 태그입니다.              |

사용 가능한 모든 옵션은 [Datadog의 GoDoc][1]을 참조하세요.


[1]: https://pkg.go.dev/github.com/DataDog/datadog-go/v5/statsd#Option
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

v2.10.0부터 권장되는 클라이언트 인스턴스화 방식은 NonBlockingStatsDClientBuilder를 사용하는 것입니다. 다음
빌더 메서드를 사용하여 클라이언트 파라미터를 정의할 수 있습니다.

| 빌더 메서드                               | 유형           | 기본값   | 설명                                                                        |
| -------------------------------------------- | -------------- | --------- | ---------------------------------------------------------------------------------- |
| `prefix(String val)`                         | 문자열         | null      | 모든 메트릭, 이벤트, 서비스 검사에 적용되는 접두사입니다.                    |
| `hostname(String val)`                       | 문자열         | localhost | 대상으로 지정된 StatsD 서버의 호스트 이름입니다.                                       |
| `port(int val)`                              | 정수        | 8125      | 대상으로 지정된 StatsD 서버의 포트입니다.                                            |
| `constantTags(String... val)`                | 문자열 varargs | null      | 모든 메트릭, 이벤트 및 서비스 검사에 적용될 전역 태그입니다.               |
| `blocking(boolean val)`                      | 부울        | false     | 인스턴스화할 클라이언트의 유형(차단 대 비차단)입니다.                       |
| `socketBufferSize(int val)`                  | 정수        | -1        | 기본 소켓 버퍼의 크기입니다.                                          |
| `enableTelemetry(boolean val)`               | 부울        | false     | 텔레메트리를 보고하는 클라이언트입니다.                                                        |
| `entityID(String val)`                       | 문자열         | null      | 출처 감지를 위한 엔터티 ID입니다.                                                    |
| `errorHandler(StatsDClientErrorHandler val)` | 정수        | null     | 내부 클라이언트 오류 발생 시 오류 처리기입니다.                                 |
| `maxPacketSizeBytes(int val)`                | 정수        | 8192/1432 | 최대 패킷 크기입니다(UDS에서 8192, UDP에서는 1432).                              |
| `processorWorkers(int val)`                  | 정수        | 1         | 제출을 위해 버퍼를 조립하는 프로세스 작업자 스레드 수입니다.          |
| `senderWorkers(int val)`                     | 정수        | 1         | 소켓에 버퍼를 제출하는 발신자 작업자 스레드 수입니다.              |
| `poolSize(int val)`                          | 정수        | 512       | 네트워크 패킷 버퍼 풀 크기입니다.                                                   |
| `queueSize(int val)`                         | 정수        | 4096      | 대기열에서 처리되지 않은 최대 메시지 수입니다.                               |
| `timeout(int val)`                           | 정수        | 100       | 차단 작업의 시간 제한(밀리초)입니다. Unix 소켓에만 적용됩니다. |

자세한 내용을 보려면Java DogStatsD [패키지][1]에서 NonBlockingStatsDClient 클래스 및 NonBlockingStatsDClientBuilder 클래스를 검색하세요. 클라이언트 릴리스와 일치하는 버전을 조회해야 합니다.


[1]: https://javadoc.io/doc/com.datadoghq/java-dogstatsd-client/latest/index.html
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

| 파라미터          | 유형            | 기본값     | 설명                                                                                                                                                                                            |
| ------------------ | --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `host`             | 문자열          | `localhost` | DogStatsD 서버의 호스트입니다. 이것이 설정되지 않은 경우, Agent는 `DD_AGENT_HOST` 또는 `DD_DOGSTATSD_URL` 환경 변수를 확인합니다.                                                               |
| `port`             | 정수         | `8125`      | DogStatsD 서버의 포트입니다. 이것이 설정되지 않은 경우, Agent는 `DD_DOGSTATSD_PORT` 또는 `DD_DOGSTATSD_URL` 환경 변수를 확인합니다.                                                          |
| `socket_path`      | 문자열          | `null`      | DogStatsD UNIX 도메인 소켓의 경로입니다(`host` 및 `port`를 재정의함). 이것은 Agent v6+에서만 지원됩니다. 이것이 설정되지 않은 경우, Agent는 `DD_DOGSTATSD_URL` 환경 변수를 확인합니다. |
| `global_tags`      | 문자열 목록 | `null`      | 모든 메트릭, 이벤트, 서비스 검사에 적용되는 태그입니다. `@dd.internal.entity_id` 태그는 `DD_ENTITY_ID` 환경 변수의 global_tags에 추가됩니다.                                    |
| `origin_detection` | 부울         | True        | 각 메트릭에 출처 감지 필드를 추가해야 합니까?                                                                                                                                                |
| `container_id`     | 문자열          | `null`      | 출처 감지를 위해 모든 메트릭에 태그할 컨테이너 id입니다.                                                                                                                                           |

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

| 파라미터          | 유형            | 기본값     | 설명                                                          |
| ------------------ | --------------- | ----------- | -------------------------------------------------------------------- |
| `StatsdServerName` | 문자열          | `localhost` | 대상으로 지정된 StatsD 서버의 호스트 이름입니다.                         |
| `StatsdPort`       | 정수         | `8125`      | 대상으로 지정된 StatsD 서버의 포트입니다.                              |
| `Prefix`           | 문자열          | `null`      | 모든 메트릭, 이벤트 및 서비스 검사에 적용할 접두사입니다.           |
| `ConstantTags`     | 문자열 목록 | `null`      | 모든 메트릭, 이벤트 및 서비스 검사에 적용될 전역 태그입니다. |
| `OriginDetection`  | 부울            | True        | 각 메트릭에 출처 감지 필드를 추가해야 합니까?              |
| `ContainerID`      | 문자열          | `null`      | 출처 감지를 위해 모든 메트릭에 태그할 컨테이너 id입니다.         |

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## DogStatsD 자세히 알아보기 {#dive-into-dogstatsd}

DogStatsD와 StatsD는 대체로 유사하지만, DogStatsD에는 사용 가능한 데이터 유형, 이벤트, 서비스 검사 및 태그를 포함한 Datadog 관련 고급 기능이 포함되어 있습니다.

{{< whatsnext desc="">}}
{{< nextlink href="/metrics/custom_metrics/dogstatsd_metrics_submission/" >}}DogStatsD를 사용하여 Datadog에 메트릭을 전송합니다.{{< /nextlink >}}
{{< nextlink href="/events/guides/dogstatsd/" >}}DogStatsD를 사용하여 Datadog에 이벤트를 전송합니다.{{< /nextlink >}}
{{< nextlink href="/extend/service_checks/dogstatsd_service_checks_submission/" >}}DogStatsD를 사용하여 Datadog에 서비스 검사를 전송합니다.{{< /nextlink >}}
{{< /whatsnext >}}

DogStatsD에서 사용하는 데이터그램 형식에 대해 자세히 알고 싶거나 자체 Datadog 라이브러리를 개발하려면 [데이터그램과 셸 사용량][9] 섹션을 참조하세요. 명령줄에서 직접 메트릭과 이벤트를 보내는 방법도 확인할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/statsd/statsd
[2]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://hub.docker.com/r/datadog/dogstatsd
[4]: https://gcr.io/datadoghq/dogstatsd
[5]: /ko/metrics/custom_metrics/
[6]: /ko/events/guides/dogstatsd/
[7]: /ko/extend/service_checks/dogstatsd_service_checks_submission/
[8]: /ko/getting_started/tagging/unified_service_tagging
[9]: /ko/extend/dogstatsd/datagram_shell/
[10]: /ko/extend/community/libraries/
[11]: /ko/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tags-cardinality
[12]: https://kubernetes.io/docs/tasks/configure-pod-container/share-process-namespace/
[33]: https://registry.datadoghq.com/v2/dogstatsd/tags/list
[34]: https://gallery.ecr.aws/datadog/dogstatsd