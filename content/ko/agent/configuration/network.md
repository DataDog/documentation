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
  tag: Documentation
  text: Datadog 사이트에 관해 자세히 알아보기
- link: /logs/
  tag: Documentation
  text: 로그 수집
- link: /infrastructure/process
  tag: Documentation
  text: 프로세스 수집
- link: tracing
  tag: Documentation
  text: 트레이스 수집
title: 네트워크 트래픽
---
## 개요

<div class="alert alert-danger">
트래픽은 항상 Agent에서 Datadog으로 시작됩니다. Datadog에서 Agent로 시작되는 세션은 없습니다.
</div>

모든 Agent 트래픽은 SSL을 통해 전송됩니다. Datadog 서비스 및 사이트에 따라 대상이 결정됩니다. [Datadog 사이트][11]에 따른 대상을 보려면 우측에 있는 `DATADOG SITE` 선택기를 클릭하세요.

## 설치

Agent 설치를 허용하려면 다음의 도메인을 포함 목록에 추가하세요.

 `install.datadoghq.com`
 `yum.datadoghq.com`
 `keys.datadoghq.com`
 `apt.datadoghq.com`
 `windowsagent.datadoghq.com`

## 대상
<div class="alert alert-warning">
버전 7.67.0부터 Agent는 DNS 쿼리 수를 줄이기 위해 Datadog 사이트를 완전한 적격 도메인 이름으로 변환합니다(도메인 끝에 점 추가).
예를 들어, APM 페이로드를 <code>trace.agent.datadoghq.com.</code>으로 전송합니다.<br>
이 동작은 버전 7.72.0 이상에서 <code>convert_dd_site_fqdn.enabled</code>를 <code>false</code>로 설정하거나 환경 변수 <code>DD_CONVERT_DD_SITE_FQDN_ENABLED=false</code>로 설정하여 비활성화할 수 있습니다.
</div>

[APM][1]
: `trace.agent.`{{< region-param key="dd_site" code="true" >}}<br>
`instrumentationtelemetryintake.`{{< region-param key="dd_site" code="true" >}}

[LLM Observabilty][23]
: `llmobsintake.`{{< region-param key="dd_site" code="true" >}}

[컨테이너 이미지][13]
: `contimageintake.`{{< region-param key="dd_site" code="true" >}}

[Live Containers][3], [Live Process][4], [Cloud Network Monitoring][24], [Universal Service Monitoring][25]
: `process.`{{< region-param key="dd_site" code="true" >}}

[Network Device Monitoring][10]
: `ndmintake.`{{< region-param key="dd_site" code="true" >}}<br>
`snmptrapsintake.`{{< region-param key="dd_site" code="true" >}}<br>
`ndmflowintake.`{{< region-param key="dd_site" code="true" >}}

[Network Path][14]
: `netpathintake.`{{< region-param key="dd_site" code="true" >}}

[오케스트레이터][5]
: `orchestrator.`{{< region-param key="dd_site" code="true" >}}<br>
`contlcycleintake.`{{< region-param key="dd_site" code="true" >}}

[프로파일링][7]
: `intake.profile.`{{< region-param key="dd_site" code="true" >}}

[Real User Monitoring(RUM)][6]
: {{< region-param key="browser_sdk_endpoint_domain" code="true" >}}

[Cloud Security 취약점][29]
: `sbomintake.`{{< region-param key="dd_site" code="true" >}}

[Synthetic Monitoring 비공개 위치][8]
: Synthetics Worker v1.5.0 이상: `intake.synthetics.`{{< region-param key="dd_site" code="true" >}} 가 구성해야 하는 유일한 엔드포인트입니다.<br>
Synthetics Worker > v0.1.6의 API 테스트 결과: `intake.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Synthetics Worker > v0.2.0의 브라우저 테스트 결과: `intakev2.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Synthetics Worker &lt; v0.1.5의 API 테스트 결과: `api.`{{< region-param key="dd_site" code="true" >}}

{{% site-region region="us,eu,us3,us5,ap1,ap2" %}}

[Remote Configuration][101]
: `config.`{{< region-param key="dd_site" code="true" >}}

[Database Monitoring][102]
: `dbmmetricsintake.`{{< region-param key="dd_site" code="true" >}}<br>
`dbqueryintake.`{{< region-param key="dd_site" code="true" >}}

[101]: /ko/remote_configuration
[102]: /ko/database_monitoring/

{{% /site-region %}}

{{% logs-tcp-disclaimer %}}

[로그][30] &amp; [HIPAA 로그][31]
: (지원 중단됨) TCP: {{< region-param key=tcp_endpoint code="true" >}}<br>
HTTP: {{< region-param key=agent_http_endpoint code="true" >}}<br>
기타: [로그 엔드포인트][32] 참고

[HIPAA 로그 레거시][31] (지원 중단됨, TCP 지원되지 않음)
: {{< region-param key=hipaa_logs_legacy code="true" >}}

[메트릭][26], [서비스 검사][27], [이벤트][28], 및 기타 Agent 메타데이터
: `<VERSION>app.agent.`{{< region-param key="dd_site" code="true" >}}<br>
예를 들어, Agent v7.31.0은 `7310app.agent.`{{< region-param key="dd_site" code="true" >}}에 보고합니다. `*.agent.`{{< region-param key="dd_site" code="true" >}} 를 방화벽의 포함 목록에 추가해야 합니다. <br>
v6.1.0 이후, Agent는 비핵심 기능을 제공하기 위해 Datadog의 API를 쿼리합니다 (예: 구성된 API 키의 유효성 표시):<br>
Agent &lt; v7.18.0 또는 6.18.0 이상: `api.`{{< region-param key="dd_site" code="true" >}}<br>
Agent &lt; v7.18.0 또는 6.18.0: `app.`{{< region-param key="dd_site" code="true" >}}

[Agent 플레어][12]
: `<VERSION>flare.agent.`{{< region-param key="dd_site" code="true" >}}<br>
예를 들어, Agent v7.31.0은 `7310flare.agent.`{{< region-param key="dd_site" code="true" >}}에 플레어 데이터를 전송합니다. `*.agent.`{{< region-param key="dd_site" code="true" >}} 를 방화벽의 포함 목록에 추가해야 합니다. <br>

### 고정 IP 주소

이 도메인은 모두 **CNAME** 레코드로, 고정 IP 주소 집합을 가리킵니다. 이 주소는 `https://ipranges.`{{< region-param key="dd_site" code="true" >}}에서 찾을 수 있습니다.

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

 `https://ipranges.{{< region-param key="dd_site" >}}/logs.json`은 TCP를 통해 로그 데이터를 수신하는 데 사용되는 IP입니다.
 `https://ipranges.{{< region-param key="dd_site" >}}/apm.json`은 APM 데이터를 수신하는 데 사용되는 IP입니다.

### 포함

포함 목록에 `ipranges`를 모두 추가합니다. 항상 일부 하위 집합만이 활성화되어 있으나 정규 네트워크 운영과 유지관리 때문에 시간이 지남에 따라 전체 세트 내에 변형이 있습니다.

## 포트 열기

<div class="alert alert-danger">
모든 아웃바운드 트래픽은 TCP 또는 UDP를 통해 SSL로 전송됩니다.
<br><br>
방화벽 규칙 또는 이와 유사한 네트워크 제한을 사용하여 애플리케이션 또는 신뢰할 수 있는 네트워크 소스에서만 Agent에 액세스할 수 있게 하세요. 악의적 공격자가 신뢰할 수 없는 액세스를 통해 Datadog 계정에 추적 및 메트릭을 기록하거나 구성 및 서비스에 대한 정보를 얻는 등, 여러 가지 침입 행위를 할 수 있습니다.
</div>

다음 포트를 열어 **Agent** 기능을 모두 활용하세요.

#### 아웃바운드

{{% site-region region="us,eu" %}}

| 제품/기능                                                                                                                                                    | 포트                                           | 프로토콜         | 설명                                                                                                                                                                                 |
|  |  |  |  |
| Agent<br>APM<br>Containers<br>Live Processes<br>Metrics<br>Cloud Network Monitoring<br>Universal Service Monitoring                                                      | 443                                            | TCP              | 대부분의 Agent 데이터는 포트 443을 사용합니다.                                                                                                                                                              |
| [커스텀 Agent 오토스케일링][22]                                                                                                                                           | 8443                                           | TCP              |                                                                                                                                                                                             |
| 로그 수집                                                                                                                                                           | {{< region-param key=web_integrations_port >}} | (지원 중단됨) TCP | TCP를 통해 로그를 작성합니다. <br>**참고**:TCP 로그 수집은 **지원되지 않습니다**. Datadog은 TCP를 사용할 때 **전달 또는 안정성을 보장하지 않으며**, 로그 데이터는 예고 없이 손실될 수 있습니다. 안정적인 수집을 위해 HTTP 수집 엔드포인트, 공식 Datadog Agent 또는 포워더 통합을 대신 사용하세요. 다른 연결 유형에 대해서는 [로그 엔드포인트][21]를 참조하세요. |
| NTP                                                                                                                                                                      | 123                                            | UDP              | Network Time Protocol(NTP). [기본 NTP 대상][20]을 참조하세요.<br>NTP 문제 해결에 대한 정보는 [NTP 문제][19]를 참조하세요.                                                                |

[19]: /ko/agent/faq/networktimeprotocolntpoffsetissues/
[20]: /ko/integrations/ntp/#overview
[21]: /ko/logs/log_collection/#loggingendpoints
[22]: /ko/containers/guide/cluster_agent_autoscaling_metrics

{{% /site-region %}}

{{% site-region region="us3,us5,gov,ap1,ap2" %}}

| 제품/기능                                                                                               | 포트 | 프로토콜 | 설명                                                                                                                  |
|  |  |  |  |
| Agent<br>APM<br>Containers<br>Live Processes<br>Metrics<br>Cloud Network Monitoring<br>Universal Service Monitoring | 443  | TCP      | 대부분의 Agent 데이터는 포트 443을 사용합니다.                                                                                               |
| NTP                                                                                                                 | 123  | UDP      | Network Time Protocol(NTP). [기본 NTP 대상][20]을 참조하세요.<br>NTP 문제 해결에 대한 정보는 [NTP 문제][19]를 참조하세요. |

[19]: /ko/agent/faq/networktimeprotocolntpoffsetissues/
[20]: /ko/integrations/ntp/#overview

{{% /site-region %}}

#### 인바운드

호스트 내에서 로컬로 통신하는 Agent 서비스에만 사용됩니다.

| 제품/기능        | 포트 | 프로토콜 | 설명                                                                                                                    |
|  |  |  |  |
| [Agent 브라우저 GUI][16]      | 5002 | TCP      |                                                                                                                                |
| APM 수신기                 | 8126 | TCP      | 추적 및 프로파일러를 포함합니다.                                                                                             |
| [DogStatsD][18]              | 8125 | UDP      | `dogstatsd_non_local_traffic`가 true로 설정된 경우를 제외하고 DogStatsD의 포트. 이 포트는 IPv4 로컬 호스트(`127.0.0.1`)에서 사용 가능합니다. |
| go_expvar 서버(APM)       | 5012 | TCP      | 자세한 내용은 [go_expar 통합 문서][15]를 참조하세요.                                                        |
| go_expvar 통합 서버 | 5000 | TCP      | 자세한 내용은 [go_expar 통합 문서][15]를 참조하세요.                                                        |
| IPC API                      | 5001 | TCP      | 프로세스 간 통신(IPC)에 사용되는 포트입니다.                                                                               |
| Process Agent 디버그          | 6062 | TCP      | Process Agent의 디버그 엔드포인트입니다.                                                                                         |
| Process Agent 런타임        | 6162 | TCP      | Process Agent의 런타임 구성 설정입니다.                                                                          |

## 포트 구성

네트워크의 기존 서비스에서 기본 포트를 이미 사용하는 경우, 인바운드 포트를 변경해야 합니다. `datadog.yaml` 구성 파일을 편집하세요. 대부분의 포트는 파일의 **Advanced Configuration** 섹션에서 찾을 수 있습니다.

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

APM 수신기와 DogStatsD 포트는 각각 `datadog.yaml` 구성 파일의 **Trace Collection Configuration** 및 **DogStatsD 구성** 섹션에 위치해 있습니다.

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

<div class="alert alert-danger">여기에서 DogStatsD 포트나 APM 수신기 포트 값을 변경하면 해당 포트의 APM 추적 라이브러리 설정도 변경해야 합니다. 구성 포트와 관련된 정보는 <a href="/tracing/trace_collection/library_config/">내 언어에 맞는 라이브러리 구성 설명서</a>를 참고하세요.</div>

## 프록시 사용

프록시 설정에 대한 자세한 구성 가이드는 [Agent 프록시 구성][9]을 참조하세요.

## 데이터 버퍼링

네트워크를 사용할 수 없게 되면 Agent가 메모리에 메트릭을 저장합니다.
메트릭을 저장하기 위한 최대 메모리 사용량은 `forwarder_retry_queue_payloads_max_size` 구성 설정에 의해 정의됩니다. 이 한도에 도달하면 메트릭이 삭제됩니다.

Agent v7.27.0 이상은 메모리 한도에 도달했을 때 메트릭을 디스크에 저장합니다. 이 기능을 활성화하려면 `forwarder_storage_max_size_in_bytes`를 Agent가 디스크에 메트릭을 저장하는 데 사용할 수 있는 최대 저장 공간(바이트 단위)을 나타내는 양수 값으로 설정하세요.

메트릭은 `forwarder_storage_path` 설정에 의해 정의된 폴더에 저장됩니다. Unix 시스템에서는 `/opt/datadogagent/run/transactions_to_retry`가 기본값이고, Windows에서는 `C:\ProgramData\Datadog\run\transactions_to_retry`가 기본값입니다.

저장 공간 부족을 방지하기 위해 Agent는 총 사용 저장 공간이 80% 미만인 경우에만 메트릭을 디스크에 저장합니다. 이 한도는 `forwarder_storage_max_disk_ratio` 설정에 의해 정의됩니다.

## Datadog Operator 설치

제한된 연결성의 Kubernetes 환경에서 Datadog Operator를 설치하는 경우, 레지스트리에 따라 TCP 포트 443에 대해 다음 엔드포인트를 허용 목록에 추가해야 합니다.

 `registry.datadoghq.com`(Datadog 컨테이너 레지스트리)
   `usdocker.pkg.dev/datadogprod/publicimages`(`registry.datadoghq.com`으로부터 리디렉션 수집할 수 있음)
 `gcr.io/datadoghq`(GCR US)
 `eu.gcr.io/datadoghq`(GCR Europe)
 `asia.gcr.io/datadoghq`(GCR Asia)
 `datadoghq.azurecr.io`(Azure)
 `public.ecr.aws/datadog`(AWS)
 `docker.io/datadog`(DockerHub)


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/
[2]: /ko/database_monitoring/
[3]: /ko/infrastructure/livecontainers/
[4]: /ko/infrastructure/process/
[5]: /ko/infrastructure/containers/#kubernetesorchestratorexplorer
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
[19]: /ko/agent/faq/networktimeprotocolntpoffsetissues/
[20]: /ko/integrations/ntp/#overview
[21]: /ko/logs/log_collection/#loggingendpoints
[22]: /ko/containers/guide/cluster_agent_autoscaling_metrics
[23]: /ko/llm_observability/
[24]: /ko/network_monitoring/cloud_network_monitoring/
[25]: /ko/universal_service_monitoring/
[26]: /ko/metrics/
[27]: /ko/extend/service_checks/
[28]: /ko/events/
[29]: /ko/security/cloud_security_management/vulnerabilities/
[30]: /ko/logs/
[31]: /ko/data_security/logs/#hipaaenabledcustomers
[32]: /ko/logs/log_collection/#loggingendpoints