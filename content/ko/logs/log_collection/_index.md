---
algolia:
  tags:
  - grok
  - grok parser
  - logs parsing
  - Extracting Attributes
  - Remapping attributes
  - parsing
aliases:
- /ko/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
- /ko/logs/languages
- /ko/integrations/windows_event_log/
description: 호스트, 컨테이너 및 서비스에서 로그를 수집하도록 환경을 설정하세요.
further_reading:
- link: https://www.datadoghq.com/blog/log-file-control-with-logrotate/
  tag: Blog
  text: Logrotate를 사용하여 로그 파일을 관리하는 방법
- link: /agent/logs/advanced_log_collection
  tag: Documentation
  text: 고급 로그 수집 설정
- link: /logs/log_configuration/processors
  tag: Documentation
  text: 로그 처리 방법 알아보기
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: 구문 분석에 대해 배우기
- link: /logs/live_tail/
  tag: Documentation
  text: Datadog 라이브 테일 기능
- link: /logs/explorer/
  tag: Documentation
  text: 로그 탐색 방법 보기
- link: /logs/logging_without_limits/
  tag: Documentation
  text: Logging Without Limits*
title: 로그 수집 및 통합
---
## 개요

로그 수집을 시작하려면 아래 구성 옵션을 선택하세요. 이미 logshipper 데몬을 사용하고 있다면 [Rsyslog][1], [Syslogng][2], [NXlog][3], [FluentD][4] 또는 [Logstash][5] 전용 문서를 참조하세요

로그를 Datadog에 직접 전송하려면 [사용 가능한 Datadog 로그 수집 엔드포인트 목록](#logging-endpoints)을 참조하세요.

**참고**: JSON 형식의 로그를 Datadog에 보낼 때 Datadog 내에서 특정 의미를 갖는 예약된 속성 세트가 있습니다. 자세한 내용은 [예약된 속성 섹션](#attributes-and-tags)을 참조하세요.

## 설정

{{< tabs >}}
{{% tab "호스트" %}}

1. [Datadog Agent][1]를 설치합니다.
2. 로그 수집을 활성화하려면 Agent의 주요 구성 파일(`datadog.yaml`)에서 `logs_enabled: false`를 `logs_enabled: true`로 변경하세요. 자세한 내용과 예시는 [Host Agent Log 수집 문서][5]를 참조하세요.
3. 활성화되면 Datadog Agent는 [로그 파일 추적 또는 UDP/TCP를 통해 전송된 로그 수신][2], [로그 필터링 또는 민감한 데이터 삭제][3], [여러 행 로그 집계][4]를 위한 목적으로 설정될 수 있습니다.

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ko/agent/logs/#customlogcollection
[3]: /ko/agent/logs/advanced_log_collection/#filterlogs
[4]: /ko/agent/logs/advanced_log_collection/#multilineaggregation
[5]: /ko/agent/logs/
{{% /tab %}}

{{% tab "애플리케이션" %}}

1. [Datadog Agent][1]를 설치합니다.
2. 로그 수집을 활성화하려면 Agent의 주요 구성 파일(`datadog.yaml`)에서 `logs_enabled: false`를 `logs_enabled: true`로 변경하세요. 자세한 내용과 예시는 [Host Agent Log 수집 문서][2]를 참조하세요.
3. 애플리케이션 언어 설치 지침에 따라 로거를 구성하고 로그 생성을 시작하세요.

{{< partial name="logs/logs-languages.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ko/agent/logs/
{{% /tab %}}

{{% tab "컨테이너" %}}

컨테이너 또는 오케스트레이터 공급자를 선택하고 로그 수집 지침을 따르세요.

{{< partial name="logs/logs-containers.html" >}}

**참고**:

 Datadog Agent는 로깅 드라이버를 사용하지 않고도 [컨테이너 stdout/stderr에서 직접 로그를 수집][1]할 수 있습니다. Agent의 Docker 검사가 활성화되면 컨테이너 및 오케스트레이터 메타데이터가 자동으로 로그에 태그로 추가됩니다.

 모든 컨테이너 또는 [컨테이너 이미지, 라벨 또는 이름으로 필터링된 하위 집합만][2] 로그를 수집할 수 있습니다.

 Autodiscovery를 사용하여 [컨테이너 레이블에서 직접 로그 수집을 구성][3]할 수도 있습니다.

 Kubernetes 환경에서는 [데몬셋 설치][4]를 활용할 수도 있습니다.

[1]: /ko/agent/docker/log/
[2]: /ko/agent/guide/autodiscoverymanagement/
[3]: /ko/agent/kubernetes/integrations/
[4]: /ko/agent/basic_agent_usage/kubernetes/#logcollectionsetup
{{% /tab %}}

{{% tab "서버리스" %}}

Datadog Forwarder는 로그를 사용자 환경에서 Datadog로 전송하는 AWS Lambda 함수입니다. AWS 서버리스 환경에서 로그 수집을 활성화하려면 [Datadog Forwarder 설명서][1]를 참조하세요.

[1]: /ko/serverless/forwarder
{{% /tab %}}

{{% tab "Cloud/Integration" %}}

로그를 자동으로 수집하여 Datadog에 전달하는 방법을 보려면 아래에서 클라우드 제공업체를 선택하세요.

{{< partial name="logs/logs-cloud.html" >}}

Datadog 통합과 로그 수집은 서로 연결되어 있습니다. 통합의 기본 구성 파일을 사용하여 Datadog에서 전용 [프로세서][1], [구문 분석][2] 및 [패싯][3]을 활성화할 수 있습니다. 통합으로 로그 수집을 시작하려면 다음 지침을 따르세요.

1. [Integrations 페이지][6]에서 통합을 선택하고 설정 지침을 따릅니다.
2. 통합의 로그 수집 지침을 따릅니다. 이 섹션에서는 해당 통합 `conf.yaml` 파일에서 로그 섹션의 주석 처리를 제거하고 환경에 맞게 구성하는 방법을 다룹니다.

## 데이터 전송 수수료 절감

Datadog의 [Cloud Network Monitoring][7]을 사용하여 조직에서 처리량이 가장 많은 애플리케이션을 파악하세요. 지원되는 프라이빗 연결을 통해 Datadog에 연결하고 프라이빗 네트워크를 통해 데이터를 전송함으로써 공용 인터넷을 사용하지 않고 데이터 전송 수수료를 절감할 수 있습니다. 프라이빗 링크로 전환한 후에는 Datadog의 [Cloud Cost Management][8] 도구를 사용하여 클라우드 비용의 감소와 영향을 모니터링하세요.

자세한 내용은 [데이터 전송 수수료를 줄이면 로그를 Datadog로 보내는 방법][9]을 참조하세요.

[1]: /ko/logs/log_configuration/processors
[2]: /ko/logs/log_configuration/parsing
[3]: /ko/logs/explorer/facets/
[4]: /ko/agent/kubernetes/log/#autodiscovery
[5]: /ko/agent/docker/log/#logintegrations
[6]: /ko/integrations/#catlogcollection
[7]: /ko/network_monitoring/cloud_network_monitoring/
[8]: /ko/cloud_cost_management/
[9]: /ko/logs/guide/reduce_data_transfer_fees/


{{% /tab %}}

{{% tab "Agent 검사" %}}

사용자 정의 Agent 통합을 개발하는 경우, `send_log` 메서드를 사용하여 Agent 검사 내에서 프로그래밍 방식으로 로그를 제출할 수 있습니다. 이렇게 하면 사용자 정의 통합이 메트릭, 이벤트 및 서비스 체크와 함께 로그를 방출할 수 있습니다.

사용자 정의 Agent 검사에서 로그를 제출하는 방법에 대한 자세한 내용은 [Agent 통합 로그 수집][15]을 참조하세요.

[15]: /ko/logs/log_collection/agent_checks/
{{% /tab %}}
{{< /tabs >}}

## 추가 구성 옵션

### 로깅 엔드포인트

Datadog은 SSL 암호화 연결과 비암호화 연결 모두에 대한 로깅 엔드포인트를 제공합니다. 가능하면 암호화된 엔드포인트를 사용하세요. Datadog Agent는 암호화된 엔드포인트를 사용하여 Datadog에 로그를 보냅니다. 자세한 내용은 [Datadog 보안 문서][6]에서 확인할 수 있습니다.

#### 지원되는 엔드포인트

Datadog 사이트에서 지원되는 엔드포인트를 보려면 페이지 오른쪽에 있는 [사이트][13] 선택기 드롭다운을 사용하세요.

| 사이트 | 유형 | 엔드포인트 | 포트 | 설명 |
||||||
| {{< region-param key=dd_datacenter >}} | HTTPS | <code>{{< region-param key=http_endpoint >}}</code> | 443 | 커스텀 포워더가 HTTPS를 통해 JSON 또는 일반 텍스트 형식으로 로그를 보내는 데 사용됩니다. [Logs HTTP API 문서][16]를 참조하세요. |
| {{< region-param key=dd_datacenter >}} | HTTPS | <code>{{< region-param key=agent_http_endpoint >}}</code> | 443 | Agent에서 HTTPS를 통해 JSON 형식으로 로그를 보내는 데 사용됩니다. [Host Agent Log 수집 문서][17]를 참조하세요. |
| {{< region-param key=dd_datacenter >}} | HTTPS | <code>{{< region-param key=lambda_http_endpoint >}}</code> | 443 | Lambda 함수가 HTTPS를 통해 원시값, Syslog 또는 JSON 형식으로 로그를 전송하는 데 사용됩니다. |
| {{< region-param key=dd_datacenter >}} | HTTPS | <code>로그.{{< region-param key=browser_sdk_endpoint_domain >}}</code> | 443 | Browser SDK에서 HTTPS를 통해 JSON 형식으로 로그를 보내는 데 사용됩니다. |

### 커스텀 로그 전달

**HTTP**를 통해 로그를 전달할 수 있는 모든 사용자 정의 프로세스 또는 로깅 라이브러리를 Datadog Logs와 함께 사용할 수 있습니다.

HTTP를 통해 Datadog 플랫폼에 로그를 보낼 수 있습니다. 시작하려면 [Datadog Log HTTP API 문서][15]를 참조하세요.

**참고**:

* HTTPS API는 최대 1MB 크기의 로그를 지원합니다. 그러나 최적의 성능을 위해서는 개별 로그가 25K바이트를 초과하지 않는 것이 좋습니다. 로깅을 위해 Datadog Agent를 사용하는 경우 로그를 900kB(900000바이트)로 분할하도록 구성됩니다.
* 로그 이벤트에는 태그가 100개 미만이어야 하며, 각 태그는 256자를 초과할 수 없고 하루에 최대 1,000만 개의 고유 태그를 사용할 수 있습니다.
* JSON 형식으로 변환된 로그 이벤트에는 256개 미만의 속성이 포함되어야 합니다. 각 속성의 키는 50자 미만이어야 하고 20개 미만의 연속 수준에 중첩되어야 하며 패싯으로 승격된 경우 해당 값은 1024자 미만이어야 합니다.
* 로그 이벤트는 과거 최대 18시간의 [타임스탬프][14]와 함께 제출될 수 있습니다.

<div class="alert alert-info">
<b>미리보기 가능</b>: 현재의 18시간 제한 대신 지난 7일의 로그를 제출할 수 있습니다. <a href="https://www.datadoghq.com/product-preview/ingest-logs-up-to-7-days-old/">미리보기를 등록하세요</a>.
</div>

이러한 제한을 준수하지 않는 로그 이벤트는 시스템에 의해 변환되거나 잘릴 수 있으며, 제공된 시간 범위를 벗어나는 경우 색인이 생성되지 않을 수 있습니다. 그러나 Datadog은 가능한 한 많은 사용자 데이터를 보존하려고 노력합니다.

색인된 로그에만 적용되는 필드에 추가 잘림이 있습니다. 메시지 필드의 경우 값이 75KiB로 잘리고 메시지 이외의 필드는 25KiB로 잘립니다. Datadog에는 전체 텍스트가 저장되며 Logs Explorer의 일반 목록 쿼리에 표시됩니다. 그러나 잘린 버전은 그룹화된 쿼리를 수행할 때 표시됩니다. 예를 들어 잘린 필드로 로그를 그룹화하거나 특정 필드를 표시하는 유사 작업을 수행할 때 표시됩니다.

{{% collapse-content title="TCP" level="h3" expanded=false %}}

{{% logs-tcp-disclaimer %}}


| 사이트 | 유형        | 엔드포인트                                                                  | 포트         | 설명                                                                                                                                                                 |
||||||
| US   | TCP         | `agentintake.logs.datadoghq.com`                                         | 10514 | Agent가 TLS 없이 로그를 보내는 데 사용됩니다.
| US   | TCP 및 TLS | `agentintake.logs.datadoghq.com`                                         | 10516 | Agent가 TLS 없이 로그를 보내는 데 사용됩니다.
| US   | TCP 및 TLS | `intake.logs.datadoghq.com`                                               | 443   | SSL로 암호화된 TCP 연결을 통해 원시값, Syslog 또는 JSON 형식으로 로그를 전송하기 위해 커스텀 포워더에서 사용됩니다.                                                                 |
| US   | TCP 및 TLS | `functionsintake.logs.datadoghq.com`                                     | 443   | Azure 함수에서 SSL로 암호화된 TCP 연결을 통해 원시값, Syslog 또는 JSON 형식으로 로그를 보내는 데 사용됩니다. **참고**: 이 엔드포인트는 다른 클라우드 제공업체에 유용할 수 있습니다. |
| US   | TCP 및 TLS | `lambdaintake.logs.datadoghq.com`                                        | 443   | SSL로 암호화된 TCP 연결을 통해 원시값, Syslog 또는 JSON 형식으로 로그를 전송하기 위해 Lambda 함수에서 사용됩니다.                                                                  |
| EU   | TCP 및 TLS | `agentintake.logs.datadoghq.eu`                                          | 443  | SSL로 암호화된 TCP 연결을 통해 protobuf 형식으로 로그를 전송하기 위해 Agent에서 사용됩니다.                                                                                     |
| EU   | TCP 및 TLS | `functionsintake.logs.datadoghq.eu`                                      | 443  | Azure 함수에서 SSL로 암호화된 TCP 연결을 통해 원시값, Syslog 또는 JSON 형식으로 로그를 보내는 데 사용됩니다. **참고**: 이 엔드포인트는 다른 클라우드 제공업체에 유용할 수 있습니다. |
| EU   | TCP 및 TLS | `lambdaintake.logs.datadoghq.eu`                                         | 443  | SSL로 암호화된 TCP 연결을 통해 원시값, Syslog 또는 JSON 형식으로 로그를 전송하기 위해 Lambda 함수에서 사용됩니다.                                                                  |

{{% /collapse-content %}}

### 속성 및 태그

속성은 Log Explorer에서 필터링 및 검색에 사용되는 [로그 패싯][9]을 규정합니다. 예약된 속성과 표준 속성 목록을 알아보고 로그 속성과 별칭을 사용하여 명명 규칙을 지원하는 방법을 알아보려면 전용 [속성 및 별칭][10] 문서를 참조하세요.

#### 스택 트레이스의 속성

스택 트레이스를 로깅할 때 Datadog 애플리케이션 내에 로거 이름, 현재 스레드, 오류 유형, 스택 트레이스 자체와 같은 전용 UI 표시가 있는 특정 속성이 있습니다.

{{< img src="logs/log_collection/stack_trace.png" style="width:80%;" alt="구문 분석된 스택 트레이스의 속성" >}}

이러한 기능을 활성화하려면 다음 속성 이름을 사용합니다.

| 속성            | 설명                                                             |
|||
| `logger.name`        | 로거의 이름                                                      |
| `logger.thread_name` | 현재 스레드의 이름                                              |
| `error.stack`        | 실제 스택 트레이스                                                      |
| `error.message`      | 스택 트레이스에 포함된 오류 메시지                              |
| `error.kind`         | 오류의 유형 또는 "종류"(예: "Exception" 또는 "OSError") |

**참고**: 기본적으로 통합 파이프라인은 기본 로깅 라이브러리 파라미터를 해당 특정 속성으로 리매핑하고 스택 추적 또는 트레이스백을 구문 분석하여 자동으로 `error.message`와 `error.kind`를 추출하려고 시도합니다.

자세한 내용은 전체 [소스 코드 속성 문서][11]를 참조하세요.

## 다음 단계

로그가 수집 및 수집(ingest)되면 **Log Explorer**에서 사용할 수 있습니다. Log Explorer는 로그를 검색하고, 보강하고, 경고를 조회할 수 있는 곳입니다. 로그 데이터 분석을 시작하려면 [Log Explorer][12] 문서를 참조하거나 아래의 추가 로그 관리 문서를 참조하세요.

{{< img src="logs/explore.png" alt="Log Explorer에 나타나는 로그" style="width:100%" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits는 Datadog, Inc.의 상표입니다.

[1]: /ko/integrations/rsyslog/
[2]: /ko/integrations/syslog_ng/
[3]: /ko/integrations/nxlog/
[4]: /ko/integrations/fluentd/#logcollection
[5]: /ko/integrations/logstash/#logcollection
[6]: /ko/data_security/logs/#informationsecurity
[7]: /ko/agent/logs/#sendlogsoverhttps
[8]: /ko/api/v1/logs/#sendlogs
[9]: /ko/logs/explorer/facets/
[10]: /ko/logs/log_configuration/attributes_naming_convention
[11]: /ko/logs/log_configuration/attributes_naming_convention/#sourcecode
[12]: /ko/logs/explore/
[13]: /ko/getting_started/site/
[14]: /ko/logs/log_configuration/pipelines/?tab=date#dateattribute
[15]: /ko/api/latest/logs/#sendlogs
[16]: /ko/api/latest/logs/#sendlogs
[17]: /ko/agent/logs/#sendlogsoverhttps