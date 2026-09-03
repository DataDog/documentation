---
aliases:
- /ko/tracing/docker/
- /ko/tracing/setup/docker/
- /ko/agent/apm/docker
- /ko/agent/docker/apm
description: Datadog Agent를 사용하여 Docker 컨테이너에서 실행되는 애플리케이션에 대해 APM 트레이스 수집을 구성합니다.
further_reading:
- link: https://github.com/DataDog/datadog-agent/tree/main/pkg/trace
  tag: 소스 코드
  text: 소스 코드
- link: /integrations/amazon_ecs/#trace-collection
  tag: 설명서
  text: ECS 애플리케이션 추적
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
title: Docker 애플리케이션 추적
---
Agent 6.0.0부터 Trace Agent는 기본적으로 활성화되어 있습니다. 비활성화된 경우 `registry.datadoghq.com/agent` 컨테이너에서 환경 변수 `DD_APM_ENABLED=true`를 전달하여 다시 활성화할 수 있습니다.

이 페이지의 CLI 명령은 Docker 런타임 기준입니다. containerd 런타임을 사용하는 경우 `docker` 대신 `nerdctl`를 사용하고, Podman 런타임을 사용하는 경우 `podman`를 사용하세요.

<div class="alert alert-info">컨테이너화된 애플리케이션에서 트레이스를 수집하는 경우(Agent와 애플리케이션이 별도 컨테이너에서 실행되는 경우), 아래 지침 대신 SDK를 애플리케이션에 자동 주입할 수도 있습니다. 방법은 <a href="/tracing/trace_collection/library_injection_local/?tab=agentandappinseparatecontainers">라이브러리 주입</a> 설명서를 참조하세요.</div>

## 호스트에서 추적하기 {#tracing-from-the-host}

트레이싱은 `8126/tcp` 포트에서 사용할 수 있으며, _호스트에서만_ 접근 가능하도록 하려면 `docker run` 명령에 `-p 127.0.0.1:8126:8126/tcp` 옵션을 추가합니다.

_모든 호스트_에서 접근 가능하게 하려면 `-p 8126:8126/tcp`를 사용하세요.

예를 들어 다음 명령은 Agent가 호스트에서만 트레이스를 수신하도록 허용합니다.

{{< tabs >}}
{{% tab "Linux" %}}

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
              registry.datadoghq.com/agent:latest
```
여기서 `<DATADOG_SITE>`는 {{< region-param key="dd_site" code="true" >}} (기본값: `datadoghq.com`)입니다.

{{% /tab %}}
{{% tab "Windows" %}}

```shell
docker run -d -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              registry.datadoghq.com/agent:latest
```
여기서 `<DATADOG_SITE>`는 {{< region-param key="dd_site" code="true" >}} (기본값: `datadoghq.com`)입니다.

{{% /tab %}}
{{< /tabs >}}

## Docker APM Agent 환경 변수 {#docker-apm-agent-environment-variables}

다음 환경 변수를 사용하여 Docker Agent의 트레이싱 기능을 구성할 수 있습니다. 자세한 내용은 [샘플 `config_template.yaml` 파일][8]을 참조하세요.

`DD_API_KEY`                      
: 필수 - _string_
<br/>[Datadog API 키][1]입니다.

`DD_SITE`
: 선택 사항 - _string_
<br/>[Datadog 사이트][7]입니다. 이를 다음으로 설정: `{{< region-param key="dd_site" >}}`.
<br/>**Default**: `datadoghq.com`

`DD_APM_ENABLED`                   
: 선택 사항 - _Boolean_ - **기본값**: `true`
<br/>`true`(기본값)로 설정하면 Datadog Agent가 트레이스 및 트레이스 메트릭을 수신합니다.

`DD_APM_RECEIVER_PORT`             
: 선택 사항 - _integer_ - **기본값**: `8126` 
<br/>Datadog Agent의 트레이스 수신기가 수신 대기하는 포트를 설정합니다. HTTP 수신기를 비활성화하려면 `0`로 설정하세요.

`DD_APM_RECEIVER_SOCKET`           
: 선택 사항 - _string_
<br/>UNIX Domain Socket을 통해 트레이스를 수집하려면 UNIX 소켓 경로를 지정합니다. 설정된 경우 호스트명 및 포트 설정보다 우선 적용되며, 유효한 소켓 파일을 가리켜야 합니다. 

`DD_APM_NON_LOCAL_TRAFFIC`         
: 선택 사항 - _Boolean_ - **기본값**: `false`
<br/>`true`로 설정하면 Datadog Agent가 로컬이 아닌 트래픽도 수신합니다. [다른 컨테이너에서 트레이싱하는 경우](#tracing-from-other-containers), 이 환경 변수를 `true`로 설정해야 합니다. 

`DD_APM_DD_URL`                    
: 선택 사항 - _string_
<br/>APM에 프록시를 사용하려면 엔드포인트와 포트를 `<ENDPOINT>:<PORT>` 형식으로 지정합니다. 프록시는 TCP 연결을 처리할 수 있어야 합니다.

`DD_APM_CONNECTION_LIMIT`          
: 필수 - _integer_ - **기본값**: `2000`
<br/>30초 시간 창 내에서 허용되는 최대 APM 연결 수를 설정합니다. 자세한 내용은 [Agent 속도 제한][6]을 참조하세요.

`DD_APM_IGNORE_RESOURCES`          
: 선택 사항 - _[string]_ 
<br/>Datadog Agent가 무시해야 하는 리소스의 제외 목록을 제공합니다. 트레이스의 리소스 이름이 이 목록의 정규식 중 하나 이상과 일치하는 경우 해당 트레이스는 Datadog으로 전송되지 않습니다. 
<br/>예시: `"GET /ignore-me","(GET\|POST) and-also-me"`.                                                                                                                                                                                                                                                                                   

`DD_APM_FILTER_TAGS_REQUIRE`       
: 선택 사항 - _object_
<br/>태그 기반 트레이스 필터링 규칙을 정의합니다. Datadog으로 전송되려면 트레이스에 이러한 태그가 있어야 합니다. [APM에서 원치 않는 리소스 무시][5]를 참조하세요. 

`DD_APM_FILTER_TAGS_REGEX_REQUIRE` 
: 선택 사항 - _object_
<br/>Agent 7.49 이상에서 지원됩니다. 정규식을 사용하는 태그 기반 트레이스 필터링 규칙을 정의합니다. Datadog으로 전송되려면 트레이스의 태그가 정의된 정규식 패턴과 일치해야 합니다. 

`DD_APM_FILTER_TAGS_REJECT`        
: 선택 사항 - _object_ 
<br/>태그 기반 트레이스 필터링 규칙을 정의합니다. 트레이스에 이러한 태그가 있으면 Datadog으로 전송되지 않습니다. 자세한 내용은 [APM에서 원치 않는 리소스 무시][5]를 참조하세요. 

`DD_APM_FILTER_TAGS_REGEX_REJECT`  
: 선택 사항 - _object_ 
<br/>Agent 7.49 이상에서 지원됩니다. 정규식을 사용하는 태그 기반 트레이스 필터링 규칙을 정의합니다. 태그가 이러한 정규식 패턴과 일치하는 경우 해당 트레이스는 Datadog으로 전송되지 않습니다. 

`DD_APM_REPLACE_TAGS`              
: 선택 사항 - _[object]_ 
<br/>[잠재적으로 민감한 정보를 포함하는 태그를 대체하거나 제거][2]하기 위한 규칙 집합을 정의합니다.

`DD_HOSTNAME`                      
: 선택 사항 - _string_ - **기본값**: 자동으로 감지됨 
<br/>자동 호스트 이름 감지에 실패한 경우 또는 Datadog Cluster Agent를 실행하는 경우 메트릭에 사용할 호스트 이름을 설정합니다.

`DD_DOGSTATSD_PORT`                
: 선택 사항 - _integer_ - **기본값**: `8125` 
<br/>DogStatsD 포트를 설정합니다.

`DD_PROXY_HTTPS`                   
: 선택 사항 - _string_
<br/>인터넷에 연결하기 위해 [프록시][4]를 사용하는 경우 URL을 제공합니다. 

`DD_BIND_HOST`                     
: 선택 사항 - _string_ - **기본값**: `localhost` 
<br/>DogStatsD 및 트레이스 수신을 위한 리스닝 호스트를 설정합니다.

`DD_LOG_LEVEL`                     
: 선택 사항 - _string_ - **기본값**: `info` 
<br/>최소 로깅 수준을 설정합니다. 유효한 옵션은 `trace`, `debug`, `info`, `warn`, `error`, `critical`, `off`입니다.

## 다른 컨테이너에서 트레이싱 {#tracing-from-other-containers}

DogStatsD와 마찬가지로, 다른 컨테이너에서도 [Docker 네트워크](#docker-network) 또는 [Docker 호스트 IP](#docker-host-ip)를 사용하여 Agent로 트레이스를 전송할 수 있습니다.

### Docker 네트워크 {#docker-network}

첫 번째 단계로, 사용자 정의 브리지 네트워크를 생성합니다:

```bash
docker network create <NETWORK_NAME>
```

이 페이지의 CLI 명령은 Docker 런타임 기준입니다. containerd 런타임을 사용하는 경우 `docker` 대신 `nerdctl`를 사용하고, Podman 런타임을 사용하는 경우 `podman`를 사용하세요.

다음으로는 이전에 만든 네트워크와 연결된 Agent 및 애플리케이션 컨테이너를 시작합니다.

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
              registry.datadoghq.com/agent:latest
# Application
docker run -d --name app \
              --network <NETWORK_NAME> \
              -e DD_AGENT_HOST=datadog-agent \
              company/app:latest
```

여기서 `<DATADOG_SITE>`는 {{< region-param key="dd_site" code="true" >}} (기본값: `datadoghq.com`)입니다.

{{% /tab %}}
{{% tab "Windows" %}}

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
              registry.datadoghq.com/agent:latest
# Application
docker run -d --name app \
              --network "<NETWORK_NAME>" \
              -e DD_AGENT_HOST=datadog-agent \
              company/app:latest
```
여기서 `<DATADOG_SITE>`는 {{< region-param key="dd_site" code="true" >}} (기본값: `datadoghq.com`)입니다.

{{% /tab %}}
{{< /tabs >}}

이렇게 하면 `app` 컨테이너 내에서 호스트 이름 `datadog-agent`가 노출됩니다.
`docker-compose`를 사용하는 경우 `<NETWORK_NAME>` 파라미터는 `docker-compose.yml`의 `networks` 섹션에서 정의된 값입니다.

애플리케이션 SDK는 이 주소로 트레이스를 전송하도록 구성되어야 합니다. 애플리케이션 컨테이너에서 `DD_AGENT_HOST`에는 Agent 컨테이너 이름을, `DD_TRACE_AGENT_PORT`에는 Agent Trace 포트를 설정하는 환경 변수를 지정하세요. 위 예시는 호스트 `datadog-agent`와 포트 `8126`(기본값이므로 별도 설정 불필요)을 사용합니다.

또는 아래 예시와 같이 지원되는 각 언어에서 Agent 호스트를 수동으로 설정할 수 있습니다.

{{< programming-lang-wrapper langs="java,python,ruby,go,nodeJS,.NET" >}}

{{< programming-lang lang="java" >}}

Java Agent 구성은 다음과 같이 환경 변수를 사용하여 업데이트할 수 있습니다.

```bash
DD_AGENT_HOST=datadog-agent \
DD_TRACE_AGENT_PORT=8126 \
java -javaagent:/path/to/the/dd-java-agent.jar -jar /your/app.jar
```

또는 시스템 속성을 통해 설정할 수 있습니다.

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

{{% tracing-go-v2 %}}

```go
package main

import (
  "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

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

계측된 애플리케이션을 실행하기 전에 환경 변수를 설정하세요.

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

`CORECLR_PROFILER_PATH` 환경 변수의 값은 애플리케이션이 실행되는 시스템에 따라 달라집니다.

   운영 체제 및 프로세스 아키텍처 | CORECLR_PROFILER_PATH 값
   ------------------------------------------|----------------------------
   Alpine Linux x64 | `<APP_DIRECTORY>/datadog/linux-musl-x64/Datadog.Trace.ClrProfiler.Native.so`
   Linux x64        | `<APP_DIRECTORY>/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so`
   Linux ARM64      | `<APP_DIRECTORY>/datadog/linux-arm64/Datadog.Trace.ClrProfiler.Native.so`
   Windows x64      | `<APP_DIRECTORY>\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll`
   Windows x86      | `<APP_DIRECTORY>\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll`

위 표에서 `<APP_DIRECTORY>`는 애플리케이션의 `.dll` 파일이 들어 있는 디렉터리를 의미합니다.

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Docker 호스트 IP {#docker-host-ip}

Agent 컨테이너의 포트 `8126`은 호스트에 직접 연결되어야 합니다.
애플리케이션 트레이서를 이 컨테이너의 기본 경로로 보고하도록 구성하세요(`ip route` 명령을 사용해 확인 가능).

다음은 `172.17.0.1`이 기본 경로라고 가정한 Python Tracer 예시입니다.

```python
from ddtrace import tracer

tracer.configure(hostname='172.17.0.1', port=8126)
```

### Unix Domain Socket(UDS) {#unix-domain-socket-uds}
소켓을 통해 트레이스를 전송하려면 해당 소켓을 Agent 컨테이너와 애플리케이션 컨테이너 모두에 마운트해야 합니다.

```bash
# Datadog Agent
docker run -d --name datadog-agent \
              --network <NETWORK_NAME> \
              --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -v /var/run/datadog/:/var/run/datadog/ \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              -e DD_APM_RECEIVER_SOCKET=/var/run/datadog/apm.socket \
              registry.datadoghq.com/agent:latest
# Application
docker run -d --name app \
              --network <NETWORK_NAME> \
              -v /var/run/datadog/:/var/run/datadog/ \
              -e DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket \
              company/app:latest
```

트레이서 설정에 대해서는 [언어별 APM 계측 문서][3]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ko/tracing/configure_data_security/#replace-tags
[3]: /ko/tracing/setup/
[4]: /ko/agent/proxy
[5]: /ko/tracing/guide/ignoring_apm_resources/
[6]: /ko/tracing/troubleshooting/agent_rate_limits
[7]: /ko/getting_started/site/
[8]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml