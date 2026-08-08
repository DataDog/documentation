---
aliases:
- /ko/logs/processing/attributes_naming_convention/
description: 특성 및 명명 규칙에 대해 알아보기
further_reading:
- link: logs/log_configuration/pipelines
  tag: 설명서
  text: Datadog Pipelines 살펴보기
- link: logs/log_configuration/processors
  tag: 설명서
  text: 사용 가능한 프로세서 전체 목록 참조
- link: logs/logging_without_limits
  tag: 설명서
  text: 제한 없는 로깅
- link: logs/explorer
  tag: 설명서
  text: 로그 탐색 방법 알아보기
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: 블로그
  text: CIDR 표기법 쿼리를 사용해 네트워크 트래픽 로그 필터링
title: 특성 및 별칭
---
## 개요 {#overview}

다양한 기술과 애플리케이션에서 얻은 로그를 중앙 집중화하면 로그 관리 환경에 수십 개에서 수백 개의 특성이 생성됩니다. 특히 여러 팀이 같은 환경에서 작업하는 경우 그 경향이 두드러집니다.

예를 들어, 클라이언트 IP에는 `clientIP`, `client_ip_address`, `remote_address`, `client.ip` 등과 같은 다양한 로그 특성이 있을 수 있습니다. 요청 실행 시간은 `exec_time`, `request_latency`, `request.time_elapsed` 등으로 지칭할 수 있습니다.

**특성** 및 **별칭**을 사용하여 로그 환경을 통일하세요.

## 특성 유형 및 별칭 {#attribute-types-and-aliasing}

특성은 Log Explorer에서 필터링 및 검색에 사용되는 [로그 패싯][1] 및 [태그][2]를 규정합니다.

  * [**예약된 특성**](#reserved-attributes)은 자동으로 수집됩니다.

  * [**표준 특성**](#standard-attributes)은 조직 명명 규칙의 핵심입니다. [앱][3]에서 사용할 수 있는 기본 표준 특성 세트가 있지만 이를 사용자 지정하여 팀의 **명명 규칙**을 만들 수 있습니다.

  * 표준 특성으로 명명 규칙을 구현했거나 여러 로그 소스에서 고유한 표준 패싯을 생성하려는 경우 [**별칭**](#aliasing)을 사용하세요. 예를 들어, 표준 `duration` 패싯과 함께 표준 `Network Client IP` 패싯을 사용하여 하이브리드 [Apache][4] 및 [Amazon Cloud Front][5] 인프라스트럭처에서 지연의 영향을 가장 많이 받는 클라이언트를 추적할 수 있습니다. 별칭을 사용하면 팀의 기술 스택을 변경하지 않고도 명명 규칙을 구현할 수 있습니다.

## 예약된 특성 {#reserved-attributes}

다음은 로그와 함께 자동으로 수집되는 예약된 특성 목록입니다.

**참고**: 추적 또는 메트릭을 수집하는 경우 unified service tagging을 구성하는 것이 좋습니다. 이 구성은 `env`, `service`, `version`의 세 가지 표준 태그를 사용하여 Datadog 텔레메트리를 연결합니다. 자세한 내용은 전용 [unified service tagging][6] 설명서를 참조하세요.

| 특성 | 설명                                                                                                                                                                                                                                |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | 메트릭에 정의된 원본 호스트의 이름입니다. Datadog은 Datadog의 일치하는 호스트에서 해당하는 호스트 태그를 자동으로 검색해 사용자의 로그에 적용합니다. Agent는 이 값을 자동으로 설정합니다.                          |
| `source`  | 로그의 출처가 되는 기술, 즉 통합 이름에 해당합니다. 이 값이 통합 이름과 일치하면 Datadog이 해당하는 구문 분석 도구 및 패싯을 자동으로 설치합니다. 예를 들어 `nginx`, `postgresql` 등이 있습니다. |
| `status`  | 로그의 수준/심각도에 해당합니다. [패턴][7]을 정의하는 데 사용되며, Datadog 로그 UI에 전용 레이아웃이 있습니다.                                                                                                     |
| `service` | 로그 이벤트를 생성하는 애플리케이션 또는 서비스의 이름입니다. 로그에서 APM으로 전환하는 데 사용되므로, 두 제품을 모두 사용할 때 같은 값을 정의해야 합니다.                                                                |
| `trace_id` | 추적에 사용되는 트레이스 ID에 해당합니다. [로그와 그 추적을 상호 연결][8]하는 데 사용됩니다.                                                                                                                                 |
| `message` | 기본적으로 Datadog은 `message` 특성 값을 로그 항목의 본문으로 수집합니다. 그런 다음 해당 값이 강조 표시되고 Live Tail에 표시되어 전체 텍스트 검색을 위해 인덱싱됩니다.                                    |

## 표준 특성 {#standard-attributes}

로그 통합은 기본적으로 표준 특성의 [기본 세트][9]를 사용합니다.

표준 특성 테이블에는 [미리 정의된 표준 특성](#default-standard-attribute-list)의 집합이 포함되어 있습니다. 해당 목록에 자체 특성을 추가하고, 기존 표준 특성을 수정하거나 삭제할 수 있습니다.

### 새 표준 특성 생성 {#create-a-new-standard-attribute}
**관리자 사용자**는 표준 특성 목록을 선별할 수 있습니다.
1. 표준 특성 [구성 페이지][3]로 이동합니다.
1. {{< ui >}}New Standard Attribute{{< /ui >}}를 클릭합니다.
1. 표준 특성을 다음과 같이 정의합니다.
    - {{< ui >}}Path{{< /ui >}}: JSON에서 찾을 수 있는 표준 특성의 경로(예: network.client.ip)입니다.
    - {{< ui >}}Type{{< /ui >}}: (`string`, `integer`, `double`, `boolean`): 리매핑 목록의 요소를 캐스팅하는 데 사용되는 특성의 유형입니다.
    - {{< ui >}}Description{{< /ui >}}: 사람이 읽을 수 있는 특성 설명입니다.
    - (선택 사항) {{< ui >}}Remapping list{{< /ui >}}: 표준 특성에 리매핑되어야 하는 비표준 특성 목록으로, 쉼표로 구분됩니다.

### 기본 표준 특성 목록 {#default-standard-attribute-list}

기능 도메인으로 분리된 [로그 관리 기본 표준 특성][9]의 전체 목록을 참조하세요.
  
| 표준 특성               | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [네트워크/통신][10]     | 이러한 특성은 네트워크 통신에 사용되는 데이터와 관련이 있습니다. 모든 필드와 메트릭에는 `network` 접두사가 붙습니다.                                                                                                                                                                                                                                                                                                                                                                             |
| [지리적 위치][11]                | 이러한 특성은 네트워크 통신에 사용되는 IP 주소의 지리적 위치와 관련이 있습니다. 모든 필드에는 `network.client.geoip` 또는 `network.destination.geoip` 접두사가 붙습니다.                                                                                                                                                                                                                                                                                                                     |
| [HTTP 요청][12]              | 이러한 특성은 HTTP 요청 및 액세스에 일반적으로 사용되는 데이터와 관련이 있습니다. 모든 특성에는 `http` 접두사가 붙습니다. 이러한 특성을 사용하는 일반적인 통합에는 [Apache][4], Rails, [AWS CloudFront][13], 웹 애플리케이션 서버 등이 포함됩니다. URL 세부 정보 특성에는 `http.url_details` 접두사가 붙습니다. 이러한 특성은 HTTP URL의 구문 분석된 부분에 대한 세부 정보를 제공합니다. [URL 구문 분석 도구][14]에 의해 생성됩니다.                             |
| [소스 코드][15]                | 이러한 특성은 사용자 정의 애플리케이션에서 로거를 사용하여 로그 또는 오류가 생성될 때 사용되는 데이터와 관련이 있습니다. 모든 특성에는 `logger` 또는 `error` 접두사가 붙습니다. 이러한 특성을 사용하는 일반적인 통합에는 Java, Node.js, .NET, Golang, Python 등이 있습니다.                                                                                                                                                                        |
| [데이터베이스][16]                   | 이러한 특성을 사용하는 일반적인 통합은 [Cassandra][17], [MySQL][18], [RDS][19], [Elasticsearch][20] 등이 있습니다.                                                                                                                                                                                                                                                                                                                                                                         |
| [성능][21]                | 이러한 특성은 성능 메트릭과 관련이 있습니다. Datadog은 이 특성에 대한 로그가 [트레이스 검색][23]의 기본 [측정값][1]으로 표시되고 사용되므로 해당 로그 내의 모든 기간을 [리매핑][22]할 것을 권장합니다.                                                                                                                                                                                                                                                                           |
| [사용자 관련 특성][24]    | 모든 특성과 측정값에는 `usr` 접두사가 붙습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [Syslog 및 로그 전송 도구][25]    | 이러한 특성은 syslog 또는 로그 전송 도구 에이전트에 의해 추가된 데이터와 관련이 있습니다. 모든 필드와 메트릭에는 `syslog` 접두사가 붙습니다. 이에 의존하는 통합에는 [Rsyslog][26], [NxLog][27], [Syslog-ng][28], [Fluentd][29] 및 [Logstash][30] 등이 있습니다.                                                                                                                                                                                                                                              |
| [DNS][31]                        | 모든 특성과 측정값에는 `dns` 접두사가 붙습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [Events][32]                     | 모든 특성에는 `evt` 접두사가 붙습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

## 별칭 {#aliasing}

대상 특성에 매핑되는 소스 특성에 대한 별칭을 생성하면 로그가 소스 및 대상 특성을 모두 전달할 수 있습니다.

사용자는 별칭이 지정된(소스) 패싯 특성 또는 표준(대상) 패싯 특성과 상호 작용할 수 있습니다. 그러나 별칭이 지정된 패싯 속성보다 표준 패싯 속성을 사용하는 것이 [권장][33]됩니다. 이 경우 명명 규칙에 대한 지침이 제공되며 사용자가 비표준 내용을 기반으로 자산(예: 저장된 뷰 또는 대시보드)을 구축하는 것을 방지합니다.

**별칭에 관한 추가 세부정보**:

- 별칭 지정은 로그가 파이프라인에 의해 처리된 후 이루어집니다. 추출되거나 처리된 모든 특성은 별칭의 소스로 사용될 수 있습니다.
- Datadog은 별칭이 지정된 특성의 유형을 적용합니다. 불가능한 경우에는 별칭 지정을 건너뜁니다.
- 이미 대상 특성을 전달하는 로그의 경우 별칭 지정은 해당 로그의 값을 재정의합니다.
- 여러 특성의 별칭이 지정된 표준 특성의 경우, 로그에 이러한 소스 특성 중 여러 개가 있으면 해당 소스 특성 중 하나만 별칭이 지정됩니다.
- 표준 특성에 대한 모든 업데이트 또는 추가 사항은 새로 수집된 로그에만 적용됩니다.
- 표준 특성에는 별칭을 지정할 수 없습니다.
- 특성은 표준 특성으로만 별칭을 지정할 수 있습니다.
- 로그의 JSON 구조를 따르기 위해서는 하나의 표준 특성을 다른 특성의 하위 항목으로 지정할 수 없습니다(예를 들어, `user` 및 `user.name` 둘 다 표준 특성일 수는 없습니다).

자세한 내용은 [별칭이 지정된 패싯][34]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/explorer/facets/
[2]: /ko/logs/search_syntax/#tags
[3]: https://app.datadoghq.com/logs/pipelines/standard-attributes
[4]: /ko/integrations/apache/
[5]: /ko/integrations/amazon_cloudfront/
[6]: /ko/getting_started/tagging/unified_service_tagging/
[7]: /ko/logs/explorer/patterns/
[8]: /ko/tracing/other_telemetry/connect_logs_and_traces/
[9]: /ko/standard-attributes/?product=log+management
[10]: /ko/standard-attributes/?product=log+management&search=network
[11]: /ko/standard-attributes/?product=log+management&search=geolocation
[12]: /ko/standard-attributes/?search=http.&product=log+management
[13]: /ko/integrations/amazon_elb/
[14]: /ko/logs/log_configuration/processors/url_parser/
[15]: /ko/standard-attributes/?search=logger+error&product=log+management
[16]: /ko/standard-attributes/?search=db&product=log+management
[17]: /ko/integrations/cassandra/
[18]: /ko/integrations/mysql/
[19]: /ko/integrations/amazon_rds/
[20]: /ko/integrations/elastic/
[21]: /ko/standard-attributes/?search=duration&product=log+management
[22]: /ko/logs/log_configuration/processors/remapper/
[23]: /ko/tracing/app_analytics/search/
[24]: /ko/standard-attributes/?search=usr&product=log+management
[25]: /ko/standard-attributes/?search=syslog&product=log+management
[26]: /ko/integrations/rsyslog/
[27]: /ko/integrations/nxlog/
[28]: /ko/integrations/syslog_ng/
[29]: /ko/integrations/fluentd/
[30]: /ko/integrations/logstash/
[31]: /ko/standard-attributes/?search=dns&product=log+management
[32]: /ko/standard-attributes/?search=evt&product=log+management
[33]: /ko/logs/explorer/facets/#aliased-facets
[34]: /ko/logs/explorer/facets/#alias-facets