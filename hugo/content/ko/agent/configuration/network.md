---
algolia:
  tags:
  - network traffic
  - destinations
  - ports
  - data buffering
  - static IP addresses
aliases:
- /ko/account_management/faq/what-are-the-required-ip-s-and-ports-i-need-open-to-connect-to-the-datadog-service
- /ko/account_management/faq/can-i-whitelist-the-ip-addresses-for-data-coming-from-datadog-via-webhook-and-integrations
- /ko/agent/network
- /ko/agent/faq/network
- /ko/agent/guide/network
further_reading:
- link: /getting_started/site
  tag: 설명서
  text: Datadog 사이트에 대해 알아보기
- link: /logs/
  tag: 설명서
  text: 로그 수집
- link: /infrastructure/process
  tag: 설명서
  text: 프로세스 수집
- link: tracing
  tag: 설명서
  text: 트레이스 수집
title: 네트워크 트래픽
---
## 개요 {#overview}

<div class="alert alert-danger">
트래픽은 항상 Agent에서 시작해 Datadog으로 이동합니다. Datadog에서 Agent로 시작되는 세션은 없습니다.
</div>

모든 Agent 트래픽은 SSL을 통해 전송됩니다. Datadog 서비스 및 사이트에 따라 대상이 결정됩니다. [Datadog 사이트][11]에 따른 대상을 보려면 오른쪽의 {{< ui >}}DATADOG SITE{{< /ui >}} 선택기를 클릭하세요.

## 설치 {#installation}

Agent 설치를 허용하려면 다음의 도메인을 포함 목록에 추가하세요.

- `install.datadoghq.com`
- `yum.datadoghq.com`
- `keys.datadoghq.com`
- `apt.datadoghq.com`
- `windows-agent.datadoghq.com`

## 대상 {#destinations}
<div class="alert alert-warning">
버전 7.67.0부터 Agent는 DNS 쿼리 수를 줄이기 위해 Datadog 사이트를 완전한 적격 도메인 이름으로 변환합니다(도메인 끝에 점 추가).
예를 들어 APM 페이로드를 다음으로 전송합니다 <code>trace.agent.datadoghq.com.</code>.<br>
이 동작은 버전 7.72.0 이상의 구성에서 <code>convert_dd_site_fqdn.enabled</code> 를 <code>false</code> 로 설정하거나 다음 환경 변수를 사용해 비활성화할 수 있습니다. <code>DD_CONVERT_DD_SITE_FQDN_ENABLED=false</code>.
</div>

[APM][1]
: `trace.agent.`{{< region-param key="dd_site" code="true" >}}<br>
`instrumentation-telemetry-intake.`{{< region-param key="dd_site" code="true" >}}

[LLM Observabilty][23]
: `llmobs-intake.`{{< region-param key="dd_site" code="true" >}}

[컨테이너 이미지][13]
: `contimage-intake.`{{< region-param key="dd_site" code="true" >}}

[Live Containers][3], [Live Process][4], [Cloud Network Monitoring][24], [Universal Service Monitoring][25]
: `process.`{{< region-param key="dd_site" code="true" >}}

[Network Device Monitoring][10]
: `ndm-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`snmp-traps-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`ndmflow-intake.`{{< region-param key="dd_site" code="true" >}}

[Network Path][14]
: `netpath-intake.`{{< region-param key="dd_site" code="true" >}}<br>
Agent v7.75+에서는 Network Path가 소스 호스트의 퍼블릭 IP를 리졸브하기 위해 HTTPS를 사용해 외부 서비스에 접속합니다. 이것은 선택 사항이고 Network Path는 이 기능 없이도 정상 작동하지만, 네트워크가 아웃바운드 트래픽을 제한하고 소스 퍼블릭 IP를 리졸브하고자 하는 경우, 허용 목록에 다음을 추가하세요. `icanhazip.com`, `ipinfo.io`, `checkip.amazonaws.com`, `api.ipify.org`, `whatismyip.akamai.com`. 자세한 내용은 [Network Path 설정][33]을 참조하세요.

[오케스트레이터][5]
: `orchestrator.`{{< region-param key="dd_site" code="true" >}}<br>
`contlcycle-intake.`{{< region-param key="dd_site" code="true" >}}

[프로파일링][7]
: `intake.profile.`{{< region-param key="dd_site" code="true" >}}

[Real User Monitoring(RUM)][6]
: {{< region-param key="browser_sdk_endpoint_domain" code="true" >}}

[Cloud Security 취약점][29]
: `sbom-intake.`{{< region-param key="dd_site" code="true" >}}

[Synthetic Monitoring 프라이빗 위치][8]
: Synthetics Worker v1.5.0 이상: `intake.synthetics.`{{< region-param key="dd_site" code="true" >}} 엔드포인트만 구성하면 됩니다.<br>
Synthetics Worker > v0.1.6의 API 테스트 결과: `intake.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Synthetics Worker > v0.2.0의 브라우저 테스트 결과: `intake-v2.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Synthetics Worker < v0.1.5의 API 테스트 결과: `api.`{{< region-param key="dd_site" code="true" >}}

{{% site-region region="us,eu,us3,us5,ap1,ap2" %}}

[Remote Configuration][101]
: `config.`{{< region-param key="dd_site" code="true" >}}

[Database Monitoring][102]
: `dbm-metrics-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`dbquery-intake.`{{< region-param key="dd_site" code="true" >}}

[101]: /ko/remote_configuration
[102]: /ko/database_monitoring/

{{% /site-region %}}

{{% logs-tcp-disclaimer %}}

[로그][30] 및 [HIPAA 로그][31]
: (사용 중단됨) TCP: {{< region-param key=tcp_endpoint code="true" >}}<br>
HTTP: {{< region-param key=agent_http_endpoint code="true" >}}<br>
기타: [로그 엔드포인트][32] 참조

[HIPAA 로그 레거시][31](사용 중단됨, TCP 지원되지 않음)
: {{< region-param key=hipaa_logs_legacy code="true" >}}

[Metrics][26], [서비스 검사][27], [이벤트][28] 및 기타 Agent 메타데이터
: `<VERSION>-app.agent.`{{< region-param key="dd_site" code="true" >}}<br>
예를 들어 Agent v7.31.0은 `7-31-0-app.agent.`{{< region-param key="dd_site" code="true" >}}에 보고합니다. 방화벽의 포함 목록에 `*.agent.`{{< region-param key="dd_site" code="true" >}} 를 추가해야 합니다.<br>
Agent는 v6.1.0 이후부터 Datadog의 API에 중요하지 않은 기능도 제공하도록 쿼리합니다(예를 들어 구성된 API 키의 유효성 표시).<br>
Agent v7.18.0 또는 6.18.0 이상: `api.`{{< region-param key="dd_site" code="true" >}}<br>
Agent < v7.18.0 또는 6.18.0: `app.`{{< region-param key="dd_site" code="true" >}}

[Agent flare][12]
: `<VERSION>-flare.agent.`{{< region-param key="dd_site" code="true" >}}<br>
예를 들어 Agent v7.31.0 은 flare 데이터를 `7-31-0-flare.agent.`{{< region-param key="dd_site" code="true" >}}로 보냅니다. 방화벽의 포함 목록에 `*.agent.`{{< region-param key="dd_site" code="true" >}} 를 추가해야 합니다.<br>

### 정적 IP 주소 {#static-ip-addresses}

이러한 모든 도메인은 일련의 정적 IP 주소를 가리키는 **CNAME** 레코드입니다. 이러한 주소는 `https://ip-ranges.`에서 확인할 수 있습니다.{{< region-param key="dd_site" code="true" >}}.

정보는 이 스키마를 따른 JSON 형식으로 구조화됩니다.

{{< code-block lang="text" disable_copy="true" >}}
{
    "version": 1,                          // <-- incremented every time this information is changed
    "modified": "YYYY-MM-DD-HH-MM-SS",     // <-- timestamp of the last modification
    "agents": {                            // <-- the IPs used by the Agent to submit metrics to Datadog
        "prefixes_ipv4": [                 // <-- list of IPv4 CIDR blocks
            "a.b.c.d/x",
            ...
        ],
        "prefixes_ipv6": [                 // <-- list of IPv6 CIDR blocks
            ...
        ]
    },
    "api": {...},                          // <-- the IPs used by the Agent for non-critical functionality (querying information from API)
    "apm": {...},                          // <-- the IPs used by the Agent to submit APM data to Datadog
    "logs": {...},                         // <-- the IPs used by the Agent to submit logs to Datadog
    "process": {...},                      // <-- the IPs used by the Agent to submit process data to Datadog
    "orchestrator": {...},                 // <-- the IPs used by the Agent to submit container data to Datadog
    "remote-configuration": {...},         // <-- the IPs used by the Agent to retrieve its dynamic configuration
    "synthetics": {...},                   // <-- the source IPs used by Synthetic workers (not used by the Agent)
    "synthetics-private-locations": {...}, // <-- the IPs used by Synthetics Private Locations workers to submit data to Datadog (not used by the Agent)
    "webhooks": {...}                      // <-- the source IPs used by Datadog to connect to 3rd party infrastructure over HTTP (not used by the Agent)
}
{{< /code-block >}}

각 섹션에는 전용 엔드포인트가 있습니다. 다음 예를 참고하세요.

- `https://ip-ranges.{{< region-param key="dd_site" >}}/logs.json`은 TCP를 통해 로그 데이터를 수신하는 데 사용되는 IP입니다.
- `https://ip-ranges.{{< region-param key="dd_site" >}}/apm.json`은 APM 데이터를 수신하는 데 사용되는 IP입니다.

### 포함 {#inclusion}

`ip-ranges`를 모두 포함 목록에 추가하세요. 언제든 부분 집합 하나만 활성 상태이지만, 정기 네트워크 작업 및 유지 관리로 인해 시간이 지나면서 전체 세트 안에 변형 버전이 생깁니다.

## 포트 열기 {#open-ports}

<div class="alert alert-danger">
모든 아웃바운드 트래픽은 TCP 또는 UDP를 통해 SSL로 전송됩니다.
<br><br>
방화벽 규칙 또는 이와 유사한 네트워크 제한을 사용하여 애플리케이션 또는 신뢰할 수 있는 네트워크 소스에서만 Agent에 액세스할 수 있게 하세요. 신뢰할 수 없는 액세스 권한이 있으면 악성 행위자가 몇 가지 침해적 액션을 수행할 수 있습니다. 예를 들어 Datadog 계정에 트레이스 및 메트릭을 쓰거나 구성 및 서비스에 관한 정보를 얻을 수도 있고, 이에 국한하는 것은 아닙니다.
</div>

다음 포트를 열어 **Agent** 기능을 모두 활용하세요.

#### 아웃바운드 {#outbound}

{{% site-region region="us,eu" %}}

| 제품/기능                                                                                                                                                    | 포트                                           | 프로토콜         | 설명                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Agent<br>APM<br>Containers<br>Live Processes<br>Metrics<br>Cloud Network Monitoring<br>Universal Service Monitoring                                                      | 443                                            | TCP              | 대부분의 Agent 데이터는 포트 443을 사용합니다.                                                                                                                                                              |
| [사용자 지정 Agent Autoscaling][22]                                                                                                                                           | 8443                                           | TCP              |                                                                                                                                                                                             |
| 로그 수집                                                                                                                                                           | {{< region-param key=web_integrations_port >}} | (사용 중단됨) TCP | TCP를 통해 로깅합니다. <br>**참고**:TCP 로그 수집은 지원되지 **않습니다**. Datadog은 TCP 사용 시 **전달 또는 안정성을 보장하지 않으며** 통보 없이 로그 데이터가 손실될 수 있습니다. 안정적으로 수집하려면 공식 Datadog Agent인 HTTP 인테이크 엔드포인트를 사용하거나, 포워더 통합을 사용하세요. 다른 연결 유형은 [로그 엔드포인트][21]를 참조하세요. |
| NTP                                                                                                                                                                      | 123                                            | UDP              | Network Time Protocol(NTP). [기본 NTP 대상][20]을 참조하세요.<br>NTP 문제 해결에 대한 자세한 내용은 [NTP 문제][19]를 참조하세요.                                                                |

[19]: /ko/agent/faq/network-time-protocol-ntp-offset-issues/
[20]: /ko/integrations/ntp/#overview
[21]: /ko/logs/log_collection/#logging-endpoints
[22]: /ko/containers/guide/cluster_agent_autoscaling_metrics

{{% /site-region %}}

{{% site-region region="us3,us5,gov,gov2,ap1,ap2" %}}

| 제품/기능                                                                                               | 포트 | 프로토콜 | 설명                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------- | ---- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Agent<br>APM<br>Containers<br>Live Processes<br>Metrics<br>Cloud Network Monitoring<br>Universal Service Monitoring | 443  | TCP      | 대부분의 Agent 데이터는 포트 443을 사용합니다.                                                                                               |
| NTP                                                                                                                 | 123  | UDP      | Network Time Protocol(NTP). [기본 NTP 대상][20]을 참조하세요.<br>NTP 문제 해결에 대한 자세한 내용은 [NTP 문제][19]를 참조하세요. |

[19]: /ko/agent/faq/network-time-protocol-ntp-offset-issues/
[20]: /ko/integrations/ntp/#overview

{{% /site-region %}}

#### 인바운드 {#inbound}

호스트 내에서 로컬로 서로 통신하는 Agent 서비스에만 사용됩니다.

| 제품/기능        | 포트 | 프로토콜 | 설명                                                                                                                    |
| ---------------------------- | ---- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [Agent 브라우저 GUI][16]      | 5002 | TCP      |                                                                                                                                |
| APM 수신기                 | 8126 | TCP      | Tracing 및 Profiler를 포함합니다.                                                                                             |
| [DogStatsD][18]              | 8125 | UDP      | DogStatsD의 포트입니다. 단, `dogstatsd_non_local_traffic`이 true로 설정된 경우는 예외입니다. 이 포트는 다음 IPv4 localhost에서 사용 가능: `127.0.0.1`. |
| go_expvar 서버(APM)       | 5012 | TCP      | 자세한 내용은 [go_expar 통합 설명서][15]를 참조하세요.                                                        |
| go_expvar 통합 서버 | 5000 | TCP      | 자세한 내용은 [the go_expar 통합 설명서][15]를 참조하세요.                                                        |
| IPC API                      | 5001 | TCP      | 프로세스 간 통신(IPC)에 사용되는 포트입니다.                                                                               |
| Process Agent 디버그          | 6062 | TCP      | Process Agent의 디버그 엔드포인트입니다.                                                                                         |
| Process Agent 런타임        | 6162 | TCP      | Process Agent의 런타임 구성 설정입니다.                                                                          |

## 포트 구성 {#configure-ports}

기본 포트를 이미 네트워크상의 기존 서비스가 사용 중이라서 인바운드 포트를 변경해야 하는 경우, `datadog.yaml` 구성 파일을 편집하세요. 대부분의 포트는 파일의 **고급 구성** 섹션에서 확인할 수 있습니다.

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true" collapsible="true" >}}
## @param expvar_port - integer - optional - default: 5000
## @env DD_EXPVAR_PORT - integer - optional - default: 5000
## The port for the go_expvar server.
#
# expvar_port: 5000

## @param cmd_port - integer - optional - default: 5001
## @env DD_CMD_PORT - integer - optional - default: 5001
## The port on which the IPC api listens.
#
# cmd_port: 5001

## @param GUI_port - integer - optional
## @env DD_GUI_PORT - integer - optional
## The port for the browser GUI to be served.
## Setting 'GUI_port: -1' turns off the GUI completely
## Default is:
##  * Windows & macOS : `5002`
##  * Linux: `-1`
##
#
# GUI_port: <GUI_PORT>

{{< /code-block >}}

APM 수신기 및 DogStatsD 포트는 `datadog.yaml` 구성 파일에서 각각 **Trace Collection Configuration**, **DogStatsD Configuration** 섹션에 있습니다.

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true" collapsible="true" >}}
## @param dogstatsd_port - integer - optional - default: 8125
## @env DD_DOGSTATSD_PORT - integer - optional - default: 8125
## Override the Agent DogStatsD port.
## Note: Make sure your client is sending to the same UDP port.
#
# dogstatsd_port: 8125

[...]

## @param receiver_port - integer - optional - default: 8126
## @env DD_APM_RECEIVER_PORT - integer - optional - default: 8126
## The port that the trace receiver should listen on.
## Set to 0 to disable the HTTP receiver.
#
# receiver_port: 8126
{{< /code-block >}}

<div class="alert alert-danger">여기에서 DogStatsD 포트 또는 APM 수신기 포트 값을 변경하는 경우, 해당하는 포트의 Datadog SDK 구성도 변경해야 합니다. 포트 구성에 관한 <a href="/tracing/trace_collection/library_config/">언어별 라이브러리 구성 설명서</a>의 정보를 참조하세요.</div>

## 프록시 사용 {#using-proxies}

프록시 설정에 대한 자세한 구성 가이드는 [Agent 프록시 구성][9]을 참조하세요.

## 데이터 버퍼링 {#data-buffering}

네트워크를 사용할 수 없게 되면 Agent가 메모리에 메트릭을 저장합니다.
메트릭 저장을 위한 메모리 최대 사용량은 `forwarder_retry_queue_payloads_max_size` 구성 설정으로 정의됩니다. 이 한도에 도달하면 메트릭이 삭제됩니다.

Agent v7.27.0 이상은 메모리 한도에 도달했을 때 메트릭을 디스크에 저장합니다. 이 기능을 활성화하려면 `forwarder_storage_max_size_in_bytes`를 양수로 설정하세요. 이것이 Agent가 메트릭을 디스크에 저장하는 데 사용할 수 있는 최대 스토리지 공간 양을 나타냅니다(바이트 단위).

메트릭은 `forwarder_storage_path` 설정에서 정의된 폴더에 저장되며, 이는 기본적으로 Unix 시스템의 경우 `/opt/datadog-agent/run/transactions_to_retry`, Windows의 경우 `C:\ProgramData\Datadog\run\transactions_to_retry`입니다.

저장 공간 부족을 방지하기 위해 Agent는 총 사용 저장 공간이 80% 미만인 경우에만 메트릭을 디스크에 저장합니다. 이 한도는`forwarder_storage_max_disk_ratio` 설정으로 정의됩니다.

## Datadog Operator 설치{#installing-the-datadog-operator}

연결에 한계가 있는 Kubernetes 환경에 Datadog Operator를 설치하는 경우, 레지스트리에 따라 다음과 같은 TCP 포트 443 엔드포인트를 허용 목록에 추가해야 합니다.

- `registry.datadoghq.com`(Datadog 컨테이너 레지스트리)
  - `us-docker.pkg.dev/datadog-prod/public-images`(`registry.datadoghq.com`에서 리디렉션을 수신할 수 있음)
- `gcr.io/datadoghq`(GCR US)
- `eu.gcr.io/datadoghq`(GCR Europe)
- `asia.gcr.io/datadoghq`(GCR Asia)
- `datadoghq.azurecr.io`(Azure)
- `public.ecr.aws/datadog`(AWS)
- `docker.io/datadog`(DockerHub)


## 추가 자료 {#further-reading}

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
[12]: /ko/agent/troubleshooting/send_a_flare
[13]: /ko/infrastructure/containers/container_images
[14]: /ko/network_monitoring/network_path/
[15]: /ko/integrations/go_expvar/
[16]: /ko/agent/basic_agent_usage/#gui
[17]: /ko/tracing/
[18]: /ko/extend/dogstatsd/
[19]: /ko/agent/faq/network-time-protocol-ntp-offset-issues/
[20]: /ko/integrations/ntp/#overview
[21]: /ko/logs/log_collection/#logging-endpoints
[22]: /ko/containers/guide/cluster_agent_autoscaling_metrics
[23]: /ko/llm_observability/
[24]: /ko/network_monitoring/cloud_network_monitoring/
[25]: /ko/universal_service_monitoring/
[26]: /ko/metrics/
[27]: /ko/extend/service_checks/
[28]: /ko/events/
[29]: /ko/security/cloud_security_management/vulnerabilities/
[30]: /ko/logs/
[31]: /ko/data_security/logs/#hipaa-enabled-customers
[32]: /ko/logs/log_collection/#logging-endpoints
[33]: /ko/network_monitoring/network_path/setup/#source-public-ip-resolution