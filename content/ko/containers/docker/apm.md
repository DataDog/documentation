---
aliases:
- /ko/tracing/docker/
- /ko/tracing/setup/docker/
- /ko/agent/apm/docker
- /ko/agent/docker/apm
further_reading:
- link: https://github.com/DataDog/datadog-agent/tree/main/pkg/trace
  tag: Github
  text: 소스 코드
- link: /integrations/amazon_ecs/#trace-collection
  tag: 설명서
  text: ECS 애플리케이션 추적하기
- link: /agent/docker/log/
  tag: 설명서
  text: 애플리케이션 로그 수집
- link: /agent/docker/integrations/
  tag: 설명서
  text: 애플리케이션 메트릭 및 로그 자동 수집
- link: /agent/guide/autodiscovery-management/
  tag: 설명서
  text: 데이터 수집을 컨테이너의 하위 집합으로만 제한
- link: /agent/docker/tag/
  tag: 설명서
  text: 컨테이너에서 내보내는 모든 데이터에 태그 할당
title: 도커(Docker) 애플리케이션 추적
---

에이전트 6.0.0부터 트레이스 에이전트는 기본적으로 활성화되어 있습니다. 비활성화되어 있다면`DD_APM_ENABLED=true`를 환경 변수로 전달하여 `gcr.io/datadoghq/agent` 컨테이너에서 다시 활성화할 수 있습니다.

CLI 명령은 Docker 런타임에 대한 명령입니다. 컨테이너화된 런타임인 경우 `docker`를 `nerdctl`로 대체하며, Podman 런타임의 경우 `podman`으로 대체합니다.

<div class="alert alert-info">컨테이너화된 앱(별도의 컨테이너에서 실행되는 에이전트와 앱)에서 트레이스를 수집하는 경우, 다음 지침의 대안으로 트레이스 라이브러리를 애플리케이션에 자동으로 삽입할 수 있습니다. 자세한 내용은 <a href="/tracing/trace_collection/library_injection_local/?tab=agentandappinseparatecontainers">라이브러리 삽입하기</a>를 참조하세요.</div>

## 호스트에서 추적하기

추적은 _your host only_의 `8126/tcp`포트에서 `-p 127.0.0.1:8126:8126/tcp` to the `docker run` 명령 옵션을 추가하여 사용할 수 있습니다.

_any host_에서 사용이 가능하게 하려면, 대신 `-p 8126:8126/tcp`를 사용하세요.

예를 들어, 다음 명령을 사용하면 에이전트가 호스트에서만 트레이스를 수신할 수 있습니다:

{{< tabs >}}
{{% tab "리눅스(Linux)" %}}

```shell
docker run -d --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              gcr.io/datadoghq/agent:latest
```
`<DATADOG_SITE>`의 위치는 {{< region-param key="dd_site" code="true" >}} (기본 설정은 `datadoghq.com`) 입니다.

{{% /tab %}}
{{% tab "윈도우즈(Windows)" %}}

```shell
docker run -d -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              gcr.io/datadoghq/agent:latest
```
`<DATADOG_SITE>`의 위치는 {{< region-param key="dd_site" code="true" >}} (기본 설정은 `datadoghq.com`)입니다.

{{% /tab %}}
{{< /tabs >}}

## 도커(Docker) APM 에이전트 환경 변수 

도커(Docker) 에이전트 내에서 추적할 수 있는 모든 환경 변수 목록:

| 환경 변수       | 설명                                                                                                                                                                                                                                                                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_API_KEY`               | [Datadog API 키][1]                                                                                                                                                                                                                                                                                                                                 |
| `DD_PROXY_HTTPS`           | 사용할 프록시의 URL을 설정합니다.                                                                                                                                                                                                                                                                                                                 |
| `DD_APM_REPLACE_TAGS`      | [스팬의 태그에서 민감한 데이터를 제거합니다][2].                                                                                                                                                                                                                                                                                                     |
| `DD_APM_FILTER_TAGS_REQUIRE`      | Datadog에 전송하기 위해 트레이스에 있어야 하는 필수 태그를 정의합니다.                                                                                                                                                                                                                                                                                                     |
| `DD_APM_FILTER_TAGS_REJECT`      | 거부 태그를 정의합니다. 에이전트는 이러한 태그가 있는 트레이스를 삭제합니다.        |
| `DD_HOSTNAME`              | 자동 감지에 실패한 경우, 혹은 Datadog 클러스터 에이전트를 실행할 때 메트릭에 사용할 호스트 이름을 수동으로 설정하세요.                                                                                                                                                                                                                                         |
| `DD_DOGSTATSD_PORT`        | DogStatsD 포트를 설정합니다.                                                                                                                                                                                                                                                                                                                              |
| `DD_APM_RECEIVER_SOCKET`   | Unix 유닉스 도메인 소켓을 통해 트레이스를 수집하며, 설정된 경우 호스트 이름 및 포트 설정보다 우선합니다. 기본적으로는 비활성화되어 있으며, 설정 시에 유효한 sock 파일을 지정해야 합니다.                                                                                                                                                                       |
| `DD_BIND_HOST`             | StatsD 및 리시버 호스트 이름을 설정합니다.                                                                                                                                                                                                                                                                                                                  |
| `DD_LOG_LEVEL`             | 로그 레벨을 설정합니다. (`trace`/`debug`/`info`/`warn`/`error`/`critical`/`off`)                                                                                                                                                                                                                                                                      |
| `DD_APM_ENABLED`           | `true` (기본 설정)로 되어있는 경우, Datadog 에이전트는 트레이스와 트레이스 메트릭를 수락합니다.                                                                                                                                                                                                                                                                                          |
| `DD_APM_CONNECTION_LIMIT`  | 30초 시간 창에 대한 최대 접속 제한을 설정합니다. 기본 제한은 2000개의 접속입니다.                                                                                                                                                                                                                                                    |
| `DD_APM_DD_URL`            | 트레이스가 전송되는 Datadog API 엔드포인트를 설정합니다: `https://trace.agent.{{< region-param key="dd_site" >}}`. 기본 설정은 `https://trace.agent.datadoghq.com`입니다.                                                                                                                                                                                                                            |
| `DD_APM_RECEIVER_PORT`     | Datadog 에이전트의 트레이스 리시버가 사용하는 포트입니다. 기본값은 `8126`입니다.                                                                                                                                                                                                                                                                    |
| `DD_APM_NON_LOCAL_TRAFFIC` | [다른 컨테이너에서 추적](#tracing-from-other-containers)할 때 로컬이 아닌 트래픽을 허용합니다.                                                                                                                                                                                                                                                        |
| `DD_APM_IGNORE_RESOURCES`  | 에이전트가 무시할 리소스를 설정합니다. 형식은 쉼표로 구분하며, 정규식이어야 합니다. 예: <code>GET /ignore-me,(GET\|POST) /and-also-me</code>.                                                                                                                                                                                |                                                                                                                                                                                                                                                                                        

## 다른 컨테이너에서 추적하기 

DogStatsD와 마찬가지로, 트레이스는 [도커(Docker) 네트워크](#docker-network) 또는 [도커(Docker) 호스트 IP](#docker-host-ip)를 사용하여 다른 컨테이너에서 에이전트로 제출할 수 있습니다.

### 도커(Docker) 네트워크 

첫 번째 단계로, 사용자 정의 브리지 네트워크를 생성합니다:

```bash
docker network create <NETWORK_NAME>
```

CLI 명령은 Docker 런타임에 대한 명령입니다. 컨테이너화된 런타임인 경우 `docker`를 `nerdctl`로 대체하며, Podman 런타임의 경우 `podman`으로 대체합니다.

다음으로는 이전에 만든 네트워크와 연결된 에이전트 및 애플리케이션 컨테이너를 시작합니다.

{{< tabs >}}
{{% tab "Standard" %}}

```bash
# Datadog Agent
docker run -d --name datadog-agent \
              --network <NETWORK_NAME> \
              --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              gcr.io/datadoghq/agent:latest
# Application
docker run -d --name app \
              --network <NETWORK_NAME> \
              -e DD_AGENT_HOST=datadog-agent \
              company/app:latest
```

`<DATADOG_SITE>`의 위치는 {{< region-param key="dd_site" code="true" >}} (기본 설정 `datadoghq.com`)입니다.

{{% /tab %}}
{{% tab "윈도우즈(Windows)" %}}

```bash
# Datadog Agent
docker run -d --name datadog-agent \
              --cgroupns host \
              --pid host \
              --network "<NETWORK_NAME>" \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              gcr.io/datadoghq/agent:latest
# Application
docker run -d --name app \
              --network "<NETWORK_NAME>" \
              -e DD_AGENT_HOST=datadog-agent \
              company/app:latest
```
`<DATADOG_SITE>`의 위치는 {{< region-param key="dd_site" code="true" >}} (기본 설정 `datadoghq.com`)입니다.

{{% /tab %}}
{{< /tabs >}}

이는 `app` 컨테이너에서 `datadog-agent` 호스트 이름을 노출합니다.
`docker-compose`, `<NETWORK_NAME>` 를 사용하는 경우 매개 변수는 `docker-compose.yml`의 `networks` 섹션 아래에 정의됩니다. 

트레이스를 이 주소로 제출하도록 애플리케이션 트레이서를 설정해야 합니다. `DD_AGENT_HOST`를 에이전트 컨테이너 이름으로, `DD_TRACE_AGENT_PORT`를 애플리케이션 컨테이너의 에이전트 트레이스 포트로 하여 환경 변수를 설정합니다. 위의 예에서는 `datadog-agent` 호스트와 `8126` 포트를 사용합니다(기본값이므로 따로 설정할 필요가 없음).

또는 아래 예시를 참조하여 지원되는 각 언어로 에이전트 호스트를 수동으로 설정하세요:

{{< programming-lang-wrapper langs="java,python,ruby,go,nodeJS,.NET" >}}

{{< programming-lang lang="java" >}}

또는 환경 변수를 사용하여 자바(Java) 에이전트 설정을 업데이트하세요:

```bash
DD_AGENT_HOST=datadog-agent \
DD_TRACE_AGENT_PORT=8126 \
java -javaagent:/path/to/the/dd-java-agent.jar -jar /your/app.jar
```

또는 시스템 속성을 통하여:

```bash
java -javaagent:/path/to/the/dd-java-agent.jar \
     -Ddd.agent.host=datadog-agent \
     -Ddd.agent.port=8126 \
     -jar /your/app.jar
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

```python
from ddtrace import tracer

tracer.configure(
    hostname='datadog-agent',
    port=8126,
)
```

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

```ruby
Datadog.configure do |c|
  c.agent.host = 'datadog-agent'
  c.agent.port = 8126
end
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(tracer.WithAgentAddr("datadog-agent:8126"))
    defer tracer.Stop()
}
```

{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

```javascript
const tracer = require('dd-trace').init({
    hostname: 'datadog-agent',
    port: 8126
});
```

{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

계측된 앱을 실행하기 전에 환경 변수를 설정합니다:

```bash
# Environment variables
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=<SYSTEM_DEPENDENT_PATH>
export DD_DOTNET_TRACER_HOME=/opt/datadog

# For containers
export DD_AGENT_HOST=datadog-agent
export DD_TRACE_AGENT_PORT=8126

# Start your application
dotnet example.dll
```

`CORECLR_PROFILER_PATH` 환경 변수 값은 애플리케이션이 실행 중인 시스템에 따라 다릅니다:

   운영 체제 및 프로세스 아키텍처 | CORECLR_PROFILER_PATH Value
   ------------------------------------------|----------------------------
   알파인 리눅스 x64 | `<APP_DIRECTORY>/datadog/linux-musl-x64/Datadog.Trace.ClrProfiler.Native.so`
   리눅스 x64        | `<APP_DIRECTORY>/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so`
   리눅스 ARM64      | `<APP_DIRECTORY>/datadog/linux-arm64/Datadog.Trace.ClrProfiler.Native.so`
   윈도우즈(Windows) x64      | `<APP_DIRECTORY>\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll`
윈도우즈(Windows) x86      | `<APP_DIRECTORY>\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll`

위 표에서, `<APP_DIRECTORY>`는 애플리케이션의 `.dll` 파일이 들어 있는 디렉토리를 나타냅니다.

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### 도커(Docker) 호스트 IP

`8126` 에이전트 컨테이너 포트는 호스트에 직접 연결되어야 합니다.
이 컨테이너의 기본 경로에 보고하도록 애플리케이션 트레이서를 설정합니다(`ip route`명령을 사용하여 결정).

다음은 `172.17.0.1`이 기본 경로라고 가정한 파이썬(Python) 트레이서의 예입니다:

```python
from ddtrace import tracer

tracer.configure(hostname='172.17.0.1', port=8126)
```



{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ko/tracing/guide/security/#replace-rules