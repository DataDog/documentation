---
aliases:
- /ko/guides/basic_agent_usage/
- /ko/agent/faq/where-is-the-configuration-file-for-the-agent/
- /ko/agent/faq/log-location
further_reading:
- link: /agent/faq/how-datadog-agent-determines-the-hostname/
  tag: FAQ
  text: Datadog에서는 에이전트 호스트 이름을 어떻게 결정하나요?
- link: /agent/configuration/agent-commands/
  tag: FAQ
  text: 모든 에이전트 명령 목록
- link: /agent/configuration/agent-configuration-files/
  tag: FAQ
  text: 모든 에이전트 설정 파일의 위치
- link: https://www.datadoghq.com/blog/engineering/performance-improvements-in-the-datadog-agent-metrics-pipeline/
  tag: 블로그
  text: Datadog 에이전트 메트릭 파이프라인의 성능 향상
kind: 설명서
title: 에이전트 기본 사용법
---

{{< partial name="platforms/platforms.html" links="platforms" >}}

## 에이전트 아키텍처

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

에이전트 v6 및 v7는 인프라스트럭처 메트릭과 로그를 수집하는 부분과 [DogStatsD 메트릭][1] 수신을 담당하는 부분으로 주요 프로세스가 구성되어 있습니다. 이 프로세스의 주요 구성 요소는 다음과 같습니다.

* 컬렉터(Collector)에서는 점검을 실행하고 메트릭을 수집합니다.
* 포워더(Forwarder)에서는 Datadog으로 페이로드를 보냅니다.

`datadog.yaml` 설정 파일에서 활성화한 경우, 에이전트에서 선택 사항인 프로세스 두 개를 생성합니다.

* 애플리케이션 성능 모니터링(APM) 에이전트는 [트레이스][2](기본적으로 활성화됨)을 수집하는 프로세스입니다.
* 프로세스 에이전트는 실시간 프로세스 정보를 수집하는 프로세스로, 기본적으로 사용 가능한 컨테이너만 수집하며, 그렇지 않으면 실행 중지됩니다.

Windows 서비스는 다음 목록을 참고하세요.

| 서비스               | 설명           |
|-----------------------|-----------------------|
| DatadogAgent          | Datadog 에이전트         |
| datadog-trace-agent   | Datadog 트레이스 에이전트   |
| datadog-process-agent | Datadog 프로세스 에이전트 |

에이전트는 기본적으로 Linux에서 [포트][3] 3개를 바인딩하고, Windows 및 OSX에서는 포트 4개를 바인딩합니다.

| 포트 | 설명                                                                                 |
|------|---------------------------------------------------------------------------------------------|
| 5000 | 에이전트의 런타임 메트릭을 표시합니다.                                                    |
| 5001 | 에이전트 CLI와 GUI에서 사용되며, 실행 중인 에이전트에 명령을 보내고 정보를 가져올 때 사용됩니다. |
| 5002 | Windows 및 OSX에서 GUI 서버를 제공할 때 사용됩니다.                                                   |
| 8125 | DogStatsD 서버가 외부 메트릭을 수신할 때 사용됩니다.                                  |

포트 설정에 관한 자세한 내용은 [네트워크 트래픽][4]을 참고하세요.

### 컬렉터(Collector)

컬렉터는 15초마다 표준 메트릭을 모두 수집합니다. 에이전트 버전 6에는 Python 2.7 인터프리터가 내장되어 있어 통합 및 [커스텀 점검][5]를 실행합니다.

### 포워더(Forwarder)

에이전트 포워더(Forwarder)는 HTTPS를 통해 메트릭을 Datadog으로 전송합니다. 버퍼링은 네트워크 분할이 메트릭 보고에 영향을 미치는 것을 방지합니다. 메트릭은 크기 제한이나 미결 전송 요청 수 제한에 도달할 때까지 메모리에서 버퍼링됩니다. 그 후 가장 오래된 메트릭은 포워더 메모리 사용량을 관리 가능하게 유지하기 위해 삭제됩니다. 로그는 Datadog의 SSL 암호화 TCP 연결을 통해 전송됩니다.

### DogStatsD

v6에서 DogStatsD는 [Etsy's StatsD][6] 메트릭 집계 데몬을 Golang으로 구현한 것입니다. UDP 또는 유닉스 소켓을 통해 임의 메트릭을 수신하고 롤업하는 데 사용되므로 지연 시간을 추가하지 않고 커스텀  코드를 계측할 수 있습니다. [DogStatsD][7]에서 자세히 알아보세요.

[1]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#metrics
[2]: /ko/tracing/guide/terminology/
[3]: /ko/agent/configuration/network/#open-ports
[4]: /ko/agent/configuration/network#configure-ports
[5]: /ko/developers/custom_checks/write_agent_check/
[6]: https://github.com/etsy/statsd
[7]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/
{{% /tab %}}
{{% tab "Agent v5" %}}

{{< img src="agent/agent5architecture.jpg" alt="Agent v5 아키텍처" >}}

에이전트 v5에는 주요 구성 요소가 4개 있으며, 각 구성 요소는 Python으로 작성된 별도의 프로세스로 실행됩니다.

* **컬렉터(Collector)**(`agent.py`): 컬렉터(Collector)가 현재 시스템에서 설정된 [통합][1]에 점검을 실행하고 메모리 및 CPU와 같은 시스템 메트릭을 캡처합니다.
* **DogStatsD**(`dogstatsd.py`): 애플리케이션에서 [커스텀 메트릭][2]을 보낼 수 있는 StatsD 호환 백엔드 서버입니다.
* **포워더(Forwarder)**(`ddagent.py`): 포워더(Forwarder)는 DogStatsD와 컬렉터(Collector)에서 모두 데이터를 검색하여 대기열에 올린 후 Datadog로 전송합니다.
* **SupervisorD**: 이는 모두 감독 프로세스 하나로 제어됩니다. 모든 파트를 함께 실행하지 않는 한 각 애플리케이션의 오버헤드를 제한하기 위해 별도로 유지되나, 일반적으로 모든 파트를 함께 실행하는 것을 권장합니다.

**참고**: Windows 사용자의 경우 4개의 에이전트 프로세스가 모두 `DevOps' best friend` 설명과 함께 `ddagent.exe`의 인스턴스로 표시됩니다.

### 감독, 권한, 네트워크 포트

SupervisorD 기본 프로세스는 `dd-agent` 사용자로 실행되며, 분기된 모든 하위 프로세스는 동일한 사용자로 실행됩니다. 이는 Datadog 에이전트가 시작하는 시스템 호출(`iostat`/`netstat`) 모두에도 적용됩니다. 에이전트 설정은 `/etc/dd-agent/datadog.conf`와 `/etc/dd-agent/conf.d`에 있습니다. 모든 설정은 `dd-agent`에서 읽을 수 있어야 합니다. 설정 파일에는 API 키와 메트릭 액세스에 필요한 기타 자격 증명이 포함되어 있으므로 권장 권한은 0600입니다.

다음 [포트][3]를 사용할 수 있습니다.

| 포트      | 설명                         |
|-----------|-------------------------------------|
| tcp/17123 | 일반적인 운영용 포워더 |
| tcp/17124 | 그래파이트 서포트용 포워더  |
| udp/8125  | DogStatsD                           |

모든 수신 프로세스는 기본적으로 에이전트의 v3.4.1+의 `127.0.0.1` 및/또는 `::1`에 바인딩됩니다. 이전 버전에서는 `0.0.0.0`에(모든 인터페이스) 바인딩되었습니다. 프록시를 통해 에이전트를 실행하는 방법에 관한 내용은 [에이전트 프록시 설정][4]을 참고하세요. 허용할 IP 범위에 관한 내용은 [네트워크 트래픽][5]을 참고하세요.

오픈 파일 디스크립터의 권장 개수는 1024개입니다. `ulimit -a` 명령어를 사용하면 이 값을 볼 수 있습니다. Shell Form Bomb Protection과 같이 권장 값 이하로 어려운 제한이 있는 경우, `supervisord.conf`에 다음을 추가해 문제를 해결할 수 있습니다.

```conf
[supervisord]
minfds = 100  # Your hard limit
```

[1]: /ko/integrations/
[2]: /ko/metrics/custom_metrics/
[3]: /ko/agent/configuration/network/?tab=agentv5v4#open-ports
[4]: /ko/agent/configuration/proxy/?tab=agentv5
[5]: /ko/agent/faq/network/
{{% /tab %}}
{{< /tabs >}}

## GUI

`datadog.yaml`파일에서 GUI가 실행되는 포트를 설정할 수 있습니다. GUI를 비활성화하려면 해당 포트의 값을 `-1`로 설정합니다. Windows와 macOS의 경우, GUI은 기본값으로 활성화되어 있고 포트 5002에서 실행됩니다. Linux의 경우 기본적으로 GUI가 비활성화되어 있습니다.

에이전트가 실행 중일 때 `datadog-agent launch-gui` 명령을 사용하여 기본 웹 브라우저에서 GUI를 엽니다.

**참고**: 에이전트 GUI는 32비트 Windows 플랫폼에서 지원되지 않습니다.

### 요건

1. 브라우저에서 쿠키를 활성화한 상태여야 합니다. GUI는 브라우저에서 토큰을 생성하고 저장하는데, 이를 활용해 GUI 서버와의 모든 커뮤니케이션을 인증합니다.

2. GUI를 시작하려면 사용자에게 필요한 권한이 있어야 하며 `datadog.yaml`을 열 수 있으면 GUI를 사용할 수 있습니다.

3. 보안상의 이유로 로컬 네트워크 인터페이스(`localhost`/`127.0.0.1`)에서**만** GUI에 액세스할 수 있으므로 에이전트가 실행 중인 호스트에서 작업해야 합니다. 즉, VM이나 컨테이너에서 에이전트를 실행하고 호스트 시스템에서 액세스할 수 없습니다.

## CLI

에이전트 v6+의 경우 명령줄 인터페이스는 하위 명령을 기반으로 합니다. 하위 명령을 실행하려면 먼저 에이전트 바이너리를 호출하세요.

```text
<AGENT_BIN_PATH> <SUB_COMMAND> <OPTIONS>
```

| 하위 명령        | 참고                                                                       |
|-------------------|-----------------------------------------------------------------------------|
| `check`           | 지정한 점검을 실행합니다.                                                    |
| `configcheck`     | 실행 중인 에이전트의 로드 및 해결된 모든 설정을 인쇄합니다.              |
| `diagnose`        | 시스템에서 연결 진단을 실행합니다.                              |
| `flare`           | [플레어를 수집헤 Datadog에 보냅니다][1].                                |
| `health`          | 현재 에이전트 상태를 인쇄합니다.                                             |
| `help`            | 명령과 관련한 도움말입니다.                                                     |
| `hostname`        | 에이전트에서 사용하는 호스트 이름을 인쇄합니다.                                       |
| `import`          | 이전 버전의 에이전트에서 설정 파일을 가져오고 변환합니다. |
| `launch-gui`      | Datadog 에이전트 GUI를 시작합니다.                                                |
| `restart`         | [에이전트를 다시 시작합니다][2].                                                     |
| `restart-service` | 서비스 제어 관리자 내에서 에이전트를 다시 시작합니다.                       |
| `start`           | [에이전트를 시작합니다][3].                                                       |
| `start-service`   | 서비스 제어 관리자 내에서 에이전트를 시작합니다.                         |
| `status`          | [현재 에이전트 상태를 인쇄합니다][4].                                        |
| `stream-logs`     | 실행 중인 에이전트에서 처리 중인 로그를 스트림합니다.                         |
| `stop`            | [에이전트를 중지합니다][5].                                                        |
| `stopservice`     | 서비스 제어 관리자 내에서 에이전트를 중지합니다.                          |
| `version`         | 버전 정보를 인쇄합니다.                                                         |

**참고**: 일부 옵션에는 도움말 메시지에 설명된 자체 플래그 및 옵션 세트가 있습니다. 예를 들어 `check` 하위 명령을 사용하는 방법을 보려면 다음을 실행합니다.

```text
<AGENT_BIN_PATH> check --help
```

## 에이전트 오버헤드

다음은 Datadog 에이전트 리소스 사용량의 예시입니다. Amazon EC2 시스템의 `c5.xlarge` 인스턴스(4VCPU/8GB RAM)에서 테스트를 실행했으며 리소스가 비슷한 ARM64 기반 인스턴스에서도 비슷한 성능을 보였습니다. 에이전트 자체를 모니터링하기 위한 프로세스 검사와 `datadog-agent`가 기본 구성으로 실행되었습니다. 더 많은 통합을 사용하도록 설정하면 에이전트 리소스 사용량이 증가할 수 있습니다.
JMX 점검을 활성화하면 모니터링되는 JVM에 노출된 Bean 수에 따라 더 많은 메모리를 사용하도록 에이전트를 강제합니다. 트레이스 에이전트와 프로세스 에이전트를 활성화하면 리소스 소모도 증가합니다.

* 에이전트 테스트 버전: 7.34.0
* CPU: 평균 CPU 사용량의 ~ 0.08%
* 메모리: RAM 사용량의 ~ 130MB(RSS 메모리)
* 네트워크 대역폭: ~ 140B/s ▼ | 800B/s ▲
* 디스크:
  * 분포에 따라 Linux 830MB에서 880MB까지
  * Windows: 870MB

**로그 수집**:

아래 결과는 [HTTP 포워더][6]가 활성화된 파일에서 *초당 110KB의 로그 수*를 수집한 결과입니다. 사용 가능한 여러 압축 레벨에 따른 리소스 사용의 변화를 보여줍니다.

{{< tabs >}}
{{% tab "HTTP 압축 수준 6" %}}

* 에이전트 테스트 버전: 6.15.0
* CPU: 평균 CPU 사용량의 ~ 1.5%
* 메모리: RAM 사용량의 ~ 95MB
* 네트워크 대역폭: ~ 14KB/s ▲

{{% /tab %}}
{{% tab "HTTP 압축 수준 1" %}}

* 에이전트 테스트 버전: 6.15.0
* CPU: 평균적으로 사용되는 CPU의 ~ 1%
* 메모리: RAM 사용량의 ~ 95MB
* 네트워크 대역폭: ~ 20KB/s ▲

{{% /tab %}}
{{% tab "HTTP 비압축 형식" %}}

* 에이전트 테스트 버전: 6.15.0
* CPU: 평균 사용 CPU의 ~ 0.7%
* 메모리: RAM 사용량의 ~ 90MB(RSS 메모리)
* 네트워크 대역폭: ~ 200KB/s ▲

{{% /tab %}}
{{< /tabs >}}

## Datadog 에이전트 사용 방법 더 자세히 알아보기

### 에이전트 업데이트

지정된 호스트의 부 버전 두 개 사이에 Datadog 에이전트 코어를 수동으로 업데이트하려면 [플랫폼에 해당하는 설치 명령][7]을 실행합니다.

**참고**: 특정 에이전트 통합을 수동으로 업데이트하려면 [통합 관리 가이드][8]를 참고하세요.

### 설정 파일

[에이전트 설정 파일 설명서][9]를 참고하세요.

### Datadog 사이트

[에이전트의 기본 설정 파일][10], `datadog.yaml`, `site`을 편집해 파라미터를 설정합니다(기본값 `datadoghq.com`).

```yaml
site: {{< region-param key="dd_site" >}}
```

**참고**: `site` 파라미터와 관련한 자세한 내용은 [Datadog 사이트 설명서로 시작하기][11]를 참고하세요.

### 로그 위치

[에이전트 로그 파일 설명서][12]를 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/troubleshooting/send_a_flare/
[2]: /ko/agent/configuration/agent-commands/#restart-the-agent
[3]: /ko/agent/configuration/agent-commands/#start-the-agent
[4]: /ko/agent/configuration/agent-commands/#service-status
[5]: /ko/agent/configuration/agent-commands/#stop-the-agent
[6]: /ko/agent/logs/log_transport/?tab=https#enforce-a-specific-transport
[7]: https://app.datadoghq.com/account/settings/agent/latest
[8]: /ko/agent/guide/integration-management/
[9]: /ko/agent/configuration/agent-configuration-files/
[10]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[11]: /ko/getting_started/site/
[12]: /ko/agent/configuration/agent-log-files/