---
disable_toc: false
further_reading:
- link: /agent/supported_platforms/
  tag: 설명서
  text: 지원 플랫폼
- link: /agent/configuration/
  tag: 설명서
  text: Agent 설정
title: Agent 아키텍처
---

## Agent 아키텍처

Agent 6과 7은 인프라 메트릭과 로그를 수집하고 [DogStatsD 메트릭][1]을 수신하는 주요 프로세스로 구성됩니다. 이 프로세스의 주요 구성 요소는 다음과 같습니다.

* Collector: 점검을 실행하고 메트릭을 수집합니다.
* Forwarder: Datadog에 페이로드를 보냅니다.

`datadog.yaml` 구성 파일에서 활성화된 경우 Agent는 두 가지 옵션의 프로세스를 생성합니다.

* APM Agent: [트레이스][2]를 수집하는 프로세스입니다. 기본적으로 활성화되어 있습니다.
* Process Agent: 실시간 프로세스 정보를 수집하는 프로세스입니다. 기본적으로 Process Agent는 사용 가능한 컨테이너만 수집하며, 그 외에는 비활성화되어 있습니다.

Windows에서는 서비스가 다음과 같이 표시됩니다.

| 서비스               | 설명           |
|-----------------------|-----------------------|
| DatadogAgent          | Datadog Agent         |
| datadog-trace-agent   | Datadog Trace Agent   |
| datadog-process-agent | Datadog Process Agent |

기본적으로 Agent는 Linux에서 3개의 [포트][3]를 바인딩하고 Windows 및 macOS에서는 4개의 포트를 바인딩합니다.

| 포트 | 설명                                                                                 |
|------|---------------------------------------------------------------------------------------------|
| 5000 | Agent에 대한 런타임 메트릭을 공개합니다.                                                    |
| 5001 | Agent CLI 및 GUI에서 명령을 보내고 실행 중인 Agent에서 정보를 가져오는 데 사용됩니다. |
| 5002 | Windows와 macOS에서 GUI 서버를 제공합니다.                                                   |
| 8125 | DogStatsD 서버가 외부 메트릭을 수신하는 데 사용됩니다.                                  |

포트 구성에 대한 정보는 [네트워크 트래픽][4]을 참고하세요.

### 컬렉터(Collector)

콜렉터는 15초마다 모든 표준 메트릭을 수집합니다. Agent 6은 통합 및 [사용자 지정 점검][5]을 실행하기 위해 Python 2.7 인터프리터를 내장하고 있습니다.

### 포워더(Forwarder)

Agent 포워더는 HTTPS를 통해 Datadog에 메트릭을 전송합니다. 버퍼링은 네트워크 분할이 메트릭 보고에 영향을 미치지 않도록 합니다. 메트릭은 미처리된 전송 요청의 크기 또는 개수가 제한에 도달할 때까지 메모리에 버퍼링됩니다. 이후에는 포워더의 메모리 사용량을 관리하기 위해 가장 오래된 메트릭이 삭제됩니다. 로그는 SSL 암호화된 TCP 연결을 통해 Datadog에 전송됩니다.

### DogStatsD

Agent 6에서 DogStatsD는 [Etsy의 StatsD][6] 메트릭 집계 데몬을 Golang으로 구현한 것입니다. DogStatsD는 UDP 또는 UNIX 소켓을 통해 임의의 메트릭을 수신하고 집계하여 지연 시간 없이 사용자 지정 코드를 적용할 수 있도록 합니다. [DogStatsD][7]에 대해 자세히 알아보세요.

## 추가 읽기

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#metrics
[2]: /ko/tracing/guide/terminology/
[3]: /ko/agent/configuration/network/#open-ports
[4]: /ko/agent/configuration/network#configure-ports
[5]: /ko/developers/custom_checks/write_agent_check/
[6]: https://github.com/etsy/statsd
[7]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/