---
algolia:
  tags:
  - 네트워크 트래픽
  - 대상
  - 포트
  - 데이터 버퍼링
aliases:
- /ko/account_management/faq/what-are-the-required-ip-s-and-ports-i-need-open-to-connect-to-the-datadog-service
- /ko/account_management/faq/can-i-whitelist-the-ip-addresses-for-data-coming-from-datadog-via-webhook-and-integrations
- /ko/agent/network
- /ko/agent/faq/network
- /ko/agent/guide/network
further_reading:
- link: /getting_started/site
  tag: 설명서
  text: Datadog 사이트에 관해 자세히 알아보기
- link: /logs/
  tag: 설명서
  text: 로그 수집
- link: /infrastructure/process
  tag: 설명서
  text: 프로세스 수집
- link: 추적
  tag: 설명서
  text: 트레이스 수집
title: 네트워크 트래픽
---

## 개요

<div class="alert alert-warning">
트래픽은 항상 에이전트에서 Datadog로 흐릅니다. Datadog에서 에이전트로 데이터가 흐르는 세션은 없습니다.
</div>

에이전트 트래픽은 모두 SSL을 통해 전송됩니다. Datadog 서비스와 사이트에 따라 대상이 결정됩니다. [Datadog 사이트][11]에 따른 대상을 보려면 우측에 있는 `DATADOG SITE` 선택기를 클릭하세요.

## 대상

[APM][1]
: `trace.agent.`{{< region-param key="dd_site" code="true" >}}<br>
`instrumentation-telemetry-intake.`{{< region-param key="dd_site" code="true" >}}

[라이브 컨테이너][3] & [라이브 프로세스][4]
: `process.`{{< region-param key="dd_site" code="true" >}}

[네트워크 디바이스 모니터링][10]
: `ndm-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`snmp-traps-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`ndmflow-intake.`{{< region-param key="dd_site" code="true" >}}

[오케스트레이터][5]
: `orchestrator.`{{< region-param key="dd_site" code="true" >}}

[프로파일링][7]
: `intake.profile.`{{< region-param key="dd_site" code="true" >}}

[Real User Monitoring(RUM)][6]
: {{< region-param key="browser_sdk_endpoint_domain" code="true" >}}

[Synthetic Monitoring Private Locations][8]
: Synthetics Worker v1.5.0 이상: `intake.synthetics.`{{< region-param key="dd_site" code="true" >}} 엔드포인트만 구성하면 됩니다.<br>
Synthetics Worker > v0.1.6 API 테스트 결과: `intake.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Synthetics Worker > v0.2.0 브라우저 테스트 결과: `intake-v2.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Synthetics Worker < v0.1.5 API 테스트 결과: `api.`{{< region-param key="dd_site" code="true" >}}

{{% site-region region="us,eu,us3,us5,ap1" %}}

[원격 구성][101]
: `config.`{{< region-param key="dd_site" code="true" >}}

[데이터베이스 모니터링][102]
: `dbm-metrics-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`dbquery-intake.`{{< region-param key="dd_site" code="true" >}}

[101]: /ko/agent/remote_config
[102]: /ko/database_monitoring/

{{% /site-region %}}

{{% site-region region="us" %}}
[로그][200] & [HIPAA 로그][201]
: TCP: `agent-intake.logs.datadoghq.com`<br>
HTTP: `agent-http-intake.logs.datadoghq.com`<br>기타: [로그 엔드포인트][203] 참고

[HIPAA 로그 레거시][201]
: `tcp-encrypted-intake.logs.datadoghq.com`<br>
`lambda-tcp-encrypted-intake.logs.datadoghq.com`<br>
`gcp-encrypted-intake.logs.datadoghq.com`<br>
`http-encrypted-intake.logs.datadoghq.com`

[200]: /ko/logs/
[201]: /ko/data_security/logs/#hipaa-enabled-customers
[203]: /ko/logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="eu" %}}
[로그][200] & [HIPAA 로그][201]
: TCP: `agent-intake.logs.datadoghq.eu`<br>
HTTP: `agent-http-intake.logs.datadoghq.eu`<br>
기타: [로그 엔드포인트][202] 참고

[HIPAA 로그 레거시][201]
: `tcp-encrypted-intake.logs.datadoghq.eu`<br>
`lambda-tcp-encrypted-intake.logs.datadoghq.eu`<br>
`gcp-encrypted-intake.logs.datadoghq.eu`<br>
`http-encrypted-intake.logs.datadoghq.eu`

[200]: /ko/logs/
[201]: /ko/data_security/logs/#hipaa-enabled-customers
[202]: /ko/logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="us3" %}}
[로그][200] & [HIPAA 로그][201]
: HTTP: `agent-http-intake.logs.us3.datadoghq.com`<br>
기타: [로그 엔드포인트][202] 참고

[HIPAA 로그 레거시][201]
: `lambda-tcp-encrypted-intake.logs.us3.datadoghq.com`<br>
`gcp-encrypted-intake.logs.us3.datadoghq.com`<br>
`http-encrypted-intake.logs.us3.datadoghq.com`

[200]: /ko/logs/
[201]: /ko/data_security/logs/#hipaa-enabled-customers
[202]: /ko/logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="us5" %}}
[로그][200] & [HIPAA 로그][201]
: HTTP: `agent-http-intake.logs.us5.datadoghq.com`<br>
기타: [로그 엔드포인트][202] 참고

[HIPAA 로그 레거시][201]
: `lambda-tcp-encrypted-intake.logs.us5.datadoghq.com`<br>
`gcp-encrypted-intake.logs.us5.datadoghq.com`<br>
`http-encrypted-intake.logs.us5.datadoghq.com`

[200]: /ko/logs/
[201]: /ko/data_security/logs/#hipaa-enabled-customers
[202]: /ko/logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="ap1" %}}
[로그][200] & [HIPAA 로그][201]
: HTTP: `agent-http-intake.logs.ap1.datadoghq.com`<br>
기타: [로그 엔드포인트][202] 참고

[200]: /ko/logs/
[201]: /ko/data_security/logs/#hipaa-enabled-customers
[202]: /ko/logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="gov" %}}
[로그][200] & [HIPAA 로그][201]
: HTTP: `agent-http-intake.logs.ddog-gov.com`<br>
기타: [로그 엔드포인트][202] 참고

[HIPAA 로그 레거시][201]
: `lambda-tcp-encrypted-intake.logs.ddog-gov.com`<br>
`gcp-encrypted-intake.logs.ddog-gov.com`<br>
`http-encrypted-intake.logs.ddog-gov.com`

[200]: /ko/logs/
[201]: /ko/data_security/logs/#hipaa-enabled-customers
[202]: /ko/logs/log_collection/#logging-endpoints
{{% /site-region %}}

그 외 모든 에이전트 데이터
: `<VERSION>-app.agent.`{{< region-param key="dd_site" code="true" >}}<br>
예를 들어 에이전트 v7.31.0는 `7-31-0-app.agent.`{{< region-param key="dd_site" code="true" >}}로 보고합니다. 방화벽 포함 목록에 `*.agent.`{{< region-param key="dd_site" code="true" >}}를 추가해야 합니다.<br>
에이전트 v6.1.0부터는 Datadog API도 쿼리해 부차적인 기능(예: 구성된 API 키 유효성 표시)도 제공합니다.<br>
에이전트 v7.18.0 또는 6.18.0 이상: `api.`{{< region-param key="dd_site" code="true" >}}<br>
에이전트 < v7.18.0 또는 6.18.0: `app.`{{< region-param key="dd_site" code="true" >}}

이 도메인은 정적 IP 주소를 가리키는 **CNAME** 레코드입니다. `https://ip-ranges.`{{< region-param key="dd_site" code="true" >}}에서 이 주소를 찾을 수 있습니다.

정보는 다음 스키마에 따라 JSON으로 구조화됩니다.

{{< code-block lang="text" disable_copy="true" >}}
{
    "version": 1,                          // <-- 정보가 변경될 때마다 증분됨
    "modified": "YYYY-MM-DD-HH-MM-SS",     // <-- 마지막으로 변경한 시간 타임 스탬프
    "agents": {                            // <-- 에이전트가 Datadog로 메트릭을 제출할 때 사용한 IP
        "prefixes_ipv4": [                 // <-- IPv4 CIDR 블록 목록
            "a.b.c.d/x",
            ...
        ],
        "prefixes_ipv6": [                 // <-- IPv6 CIDR 블록 목록
            ...
        ]
    },
    "api": {...},                          // <-- 에이전트가 부차적인 기능(API의 쿼리 정보)을 사용하기 위해 사용한 IP
    "apm": {...},                          // <-- 에이전트가 APM 데이터를 Datadog로 전송할 때 사용한 IP
    "logs": {...},                         // <-- 에이전트가 로그를 Datadog로 전송할 때 사용하는 IP
    "process": {...},                      // <-- 에이전트가 프로세스 데이터를 Datadog로 전송할 때 사용한 IP
    "orchestrator": {...},                 // <-- 에이전트가 컨테이너 데이터를 Datadog로 전송할 때 사용한 IP
    "remote-configuration": {...},         // <-- 에이전트가 동적 구성을 검색할 때 사용하는 IP
    "synthetics": {...},                   // <-- Synthetic Workers가 사용하는 소스 IP(에이전트가 사용하지 않음)
    "synthetics-private-locations": {...}, // <-- Synthetics Private Locations가 데이터를 Datadog로 전송할 때 사용하는 IP(에이전트가 사용하지 않음)
    "webhooks": {...}                      // <--  Datadog가 HTTP를 통해 서드 파티 인프라스트럭처에 연결할 때 사용하는 IP(에이전트가 사용하지 않음)
}
{{< /code-block >}}

각 섹션에는 전용 엔드포인트가 있습니다. 다음 예를 참고하세요.

- TCP를 통해 로그 데이터를 받을 때 사용하는 IP에는 `https://ip-ranges.{{< region-param key="dd_site" >}}/logs.json`을 사용합니다.
- APM 데이터를 받을 때 사용하는 IP에는 `https://ip-ranges.{{< region-param key="dd_site" >}}/apm.json`을 사용합니다.

### 포함

포함 목록에 `ip-ranges`를 모두 추가합니다. 항상 일부 하위 집합만이 활성화되어 있으나 정규 네트워크 운영과 유지관리 때문에 시간이 지남에 따라 전체 세트 내에 변형이 있습니다.

## 포트 열기

<div class="alert alert-warning">
아웃바운드 트래픽 모두는 TCP나 UDP를 통해 SSL로 전송됩니다.
<br><br>
방화벽 규칙이나 이와 유사한 네트워크 제한을 통해 애플리케이션이나 신뢰할 수 있는 네트워크 소스를 통해 에이전트에 액세스하세요. 신뢰할 수 없는 소스로 액세스가 가능할 경우 악성 작업자가 Datadog 계정에 트레이스와 메트릭을 쓰거나 구성과 서비스와 관련된 정보를 훔쳐가는 등 침해 행위를 할 수 있습니다.
</div>

다음 포트를 열어 **에이전트**의 혜택을 모두 누리세요.
{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

#### 아웃바운드

{{% site-region region="us" %}}

443/tcp
: 대다수 에이전트 데이터용 포트(메트릭 APM, 라이브 프로세스 & 컨테이너).

123/udp
: NTP용 포트 ([NTP의 중요성에 관한 상세 정보][1]).<br>
[NTP 대상 기본값][2]을 참고하세요.

10516/tcp
: TCP를 통한 로그 수집용 포트.<br>
다른 연결 유형에 관한 정보는 [로그 엔드포인트][3]를 참고하세요.

10255/tcp
: [쿠버네티스 HTTP Kubelet][4]용 포트.

10250/tcp
: [쿠버네티스 HTTPS Kubelet][4]용 포트.

[1]: /ko/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /ko/integrations/ntp/#overview
[3]: /ko/logs/log_collection/#logging-endpoints
[4]: /ko/agent/basic_agent_usage/kubernetes/

{{% /site-region %}}

{{% site-region region="eu" %}}

443/tcp
: 대다수 에이전트 데이터용 포트(메트릭 APM, 라이브 프로세스 & 컨테이너).

123/udp
: NTP용 포트 ([NTP의 중요성에 관한 상세 정보][1]).<br>
[NTP 대상 기본값][2]을 참고하세요.

443/tcp
: TCP를 통한 로그 수집용 포트.<br>
다른 연결 유형에 관한 정보는 [로그 엔드포인트][3]를 참고하세요.

10255/tcp
: [쿠버네티스 HTTP Kubelet][4]용 포트.

10250/tcp
: [쿠버네티스 HTTPS Kubelet][4]용 포트.

[1]: /ko/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /ko/integrations/ntp/#overview
[3]: /ko/logs/log_collection/#logging-endpoints
[4]: /ko/agent/basic_agent_usage/kubernetes/

{{% /site-region %}}

{{% site-region region="us3,us5,gov" %}}

443/tcp
: 대다수 에이전트 데이터용 포트(메트릭 APM, 라이브 프로세스 & 컨테이너).

123/udp
: NTP용 포트 ([NTP의 중요성에 관한 상세 정보][1]).<br>
[NTP 대상 기본값][2]을 참고하세요.

10255/tcp
: [쿠버네티스 HTTP Kubelet][4]용 포트.

10250/tcp
: [쿠버네티스 HTTPS Kubelet][4]용 포트.

[1]: /ko/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /ko/integrations/ntp/#overview
[3]: /ko/logs/log_collection/#logging-endpoints
[4]: /ko/agent/basic_agent_usage/kubernetes/

{{% /site-region %}}

#### 인바운드

호스트 내에서만 로컬로 상호작용하는 에이전트 서비스에 이용됨.

5000/tcp
: [go_expvar 서버][1]용 포트.

5001/tcp
: IPC API가 리스닝하는 포트.

5002/tcp
: [에이전트 브라우저 GUI][2]용 포트.

5012/tcp
: APM [go_expvar 서버][1]용 포트.

6062/tcp
: 프로세스 에이전트의 엔드포인트 디버그용 포트.

6162/tcp
: 프로세스 에이전트의 런타임 설정용 포트.

8125/udp
: DogStatsD용 포트. `dogstatsd_non_local_traffic`이 true로 설정된 경우에는 사용되지 않음. 이 포트는 로컬 호스트 `127.0.0.1`, `::1`, `fe80::1`에서 사용할 수 있음.

8126/tcp
: [APM 수신기][3]용 포트

[1]: /ko/integrations/go_expvar/
[2]: /ko/agent/basic_agent_usage/#gui
[3]: /ko/tracing/
{{% /tab %}}
{{% tab "Agent v5 & v4" %}}

#### 아웃바운드

443/tcp
: 대다수 에이전트 데이터용 포트(메트릭 APM, 라이브 프로세스 & 컨테이너).

123/udp
: NTP용 포트 ([NTP의 중요성에 관한 상세 정보][1]).<br>
[NTP 대상 기본값][2]을 참고하세요.

#### 인바운드

6062/tcp
: 프로세스 에이전트의 엔드포인트 디버그용 포트.

6162/tcp
: 프로세스 에이전트의 런타임 설정용 포트.

8125/udp
: DogStatsD용 포트. `dogstatsd_non_local_traffic`이 true로 설정된 경우에는 사용되지 않음. 이 포트는 로컬 호스트 `127.0.0.1`, `::1`, `fe80::1`에서 사용할 수 있음.

8126/tcp
: [APM 수신기][3]용 포트.

17123/tcp
: 네트워크가 에이전트와 Datadog로 분리된 경우 트래픽을 버퍼하기 위해 사용되는 에이전트 전달자.

17124/tcp
: 선택 사용할 수 있는 그래파이트 어댑터

[1]: /ko/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /ko/integrations/ntp/#overview
[3]: /ko/tracing/
{{% /tab %}}
{{< /tabs >}}

## 포트 구성

네트워크에 있는 기존 서비스에 기본 포트를 이미 사용 중이라서 인바운드 포트를 변경해야 하는 경우 `datadog.yaml` 구성 파일을 편집하세요. 파일의 **Advanced Configuration** 섹션에서 포트 대부분을 찾을 수 있습니다.

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true" collapsible="true" >}}
## @param expvar_port - integer - optional - default: 5000
## @env DD_EXPVAR_PORT - integer - optional - default: 5000
## go_expvar 서버용 포트.
#
# expvar_port: 5000

## @param cmd_port - integer - optional - default: 5001
## @env DD_CMD_PORT - integer - optional - default: 5001
## IPC API가 리스닝할 때 사용하는 포트.
#
# cmd_port: 5001

## @param GUI_port - integer - optional
## @env DD_GUI_PORT - integer - optional
## 브라우저 GUI용 포트.
## GUI를 완전히 끄려면 'GUI_port: -1'로 설정
## 기본값:
##  * Windows & macOS: `5002`
##  * Linux: `-1`
##
#
# GUI_port: <GUI_PORT>

{{< /code-block >}}

APM 수신기와 DogStatsD 포트는 `datadog.yaml` 파일 내 **Trace Collection Configuration**과 **DogStatsD Configuration** 섹션에 각각 위치하고 있습니다.

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true" collapsible="true" >}}
## @param dogstatsd_port - integer - optional - default: 8125
## @env DD_DOGSTATSD_PORT - integer - optional - default: 8125
## 에이전트 DogStatsD 포트를 재정의합니다.
## 참고: 클라이언트가 같은 UDP 포트로 전송하도록 합니다.
#
# dogstatsd_port: 8125

[...]

## @param receiver_port - integer - optional - default: 8126
## @env DD_APM_RECEIVER_PORT - integer - optional - default: 8126
## 트레이스 수신기 리스닝용 포트.
## HTTP 수신기를 비활성화하려면 0으로 설정합니다.
#
# receiver_port: 8126
{{< /code-block >}}

<div class="alert alert-warning">여기에서 DogStatsD 포트나 APM 수신기 포트 값을 변경하면 해당 포트의 APM 추적 라이브러리 설정도 변경해야 합니다. 구성 포트와 관련된 정보는 <a href="/tracing/trace_collection/library_config/">내 언어에 맞는 라이브러리 구성 설명서</a>를 참고하세요.</div>

## 프록시 사용

프록시 설정과 관련한 상세한 구성 가이드는 [에이전트 프록시 구성][9]을 참고하세요.

## 데이터 버퍼링

네트워크를 사용할 수 없는 경우 에이전트는 메트릭을 메모리에 저장합니다.
메트릭을 저장할 수 있는 최대 메모리 용량은 `forwarder_retry_queue_payloads_max_size` 구성 설정에서 정의할 수 있습니다. 용량이 최대치에 도달하면 메트릭을 더 이상 저장하지 않습니다.

에이전트 v7.27.0 이상에서는 메모리 용량이 최대치에 도달하면 디스크에 메트릭을 저장합니다. `forwarder_storage_max_size_in_bytes`를 양수 값으로 설정하면 이 기능을 사용할 수 있습니다. 메트릭을 디스크에 저장할 용량을 바이트 단위로 설정할 수 있습니다.

`forwarder_storage_path` 설정에 따라 폴더에 메트릭이 저장됩니다. Unix 시스템에서는 `/opt/datadog-agent/run/transactions_to_retry`가 기본값이고, Windows에서는 `C:\ProgramData\Datadog\run\transactions_to_retry`가 기본값입니다.

저장 공간이 초과되는 것을 막기 위해 에이전트에서는 총 사용 중인 저장 공간이 95 퍼센트 미만일 경우에만 디스크에 메트릭을 저장합니다. 이 제한값은 `forwarder_storage_max_disk_ratio` 설정에서 정의할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/
[2]: /ko/database_monitoring/
[3]: /ko/infrastructure/livecontainers/
[4]: /ko/infrastructure/process/
[5]: /ko/infrastructure/containers/#kubernetes-orchestrator-explorer
[6]: /ko/real_user_monitoring/
[7]: /ko/profiler/
[8]: /ko/synthetics/private_locations
[9]: /ko/agent/configuration/proxy/
[10]: /ko/network_monitoring/devices
[11]: /ko/getting_started/site/