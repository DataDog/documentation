---
aliases:
- /ko/logs/processing/attributes_naming_convention/
description: 속성 및 명명 규칙에 대해 알아보기
further_reading:
- link: logs/log_configuration/pipelines
  tag: 설명서
  text: Datadog 파이프라인 살펴보기
- link: logs/log_configuration/processors
  tag: 설명서
  text: 사용 가능한 프로세서 목록
- link: logs/logging_without_limits
  tag: 설명서
  text: Logging without limit
- link: logs/explorer
  tag: 설명서
  text: 로그 탐색 방법 알아보기
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: 블로그
  text: CIDR 표기법 쿼리를 사용하여 네트워크 트래픽 로그 필터링
title: 속성과 별칭
---

## 개요

다양한 기술과 애플리케이션에서 얻은 로그를 중앙 집중화하면 로그 관리 환경에 수십 개에서 수백 개의 속성이 생성됩니다. 특히 여러 팀이 같은 환경에서 작업하는 경우 그 경향이 두드러집니다.

예를 들어 클라이언트 IP에는 `clientIP`, `client_ip_address`, `remote_address`, `client.ip` 등과 같은 다양한 로그 속성이 있을 수 있습니다. 요청 실행 시간은 `exec_time`, `request_latency`, `request.time_elapsed` 등으로 표시될 수 있습니다.

**속성**과 **별칭**을 사용하여 로그 환경을 통일하세요.

## 속성 유형 및 별칭

속성은 Log Explorer에서 필터링 및 검색에 사용되는 [로그 패싯][1] 및 [태그][2]를 규정합니다.

  * [**예약된 속성**](#reserved-attributes)은 자동으로 수집됩니다.

  * [**표준 속성**](#standard-attributes)은 조직의 명명 규칙의 핵심입니다. [앱][3]에서 사용할 수 있는 기본 표준 속성 세트가 있으나 이를 사용자 지정하여 팀의 **명명 규칙**을 만들 수 있습니다.

  * 표준 속성으로 명명 규칙을 구현했거나 여러 로그 소스에서 고유한 표준 패싯을 생성하려는 경우 [**별칭**](#aliasing)을 사용하세요. 예를 들어, 표준 `duration`과 함께 표준 `Network Client IP` 패싯을 사용하여 하이브리드 [Apache][4] 및 [Amazon Cloud Front][5] 인프라스트럭처에서 지연 시간의 영향을 가장 많이 받는 클라이언트를 추적합니다. 별칭을 사용하면 팀의 기술 스택을 변경하지 않고도 명명 규칙을 구현할 수 있습니다.

## 예약된 속성

다음은 로그와 함께 자동으로 수집되는 예약된 속성 목록입니다.

**참고**: 트레이스 또는 메트릭도 수집하는 경우 통합 서비스 태그를 설정하는 것이 좋습니다. 이 설정은 세 가지 표준 태그(`env`, `service` 및 `version`)를 사용하여 Datadog 원격 측정을 함께 연결합니다. 자세한 내용은 전용 [통합 서비스 태깅][6] 문서를 참조하세요.

| 속성 | 설명                                                                                                                                                                                                                                |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | 메트릭에 정의된 원래 호스트의 이름입니다. Datadog은 Datadog의 일치하는 호스트에서 해당 호스트 태그를 자동으로 검색하여 로그에 적용합니다. Agent는 이 값을 자동으로 설정합니다.                          |
| `source`  | 이는 로그에서 발생한 기술인 통합 이름에 해당합니다. 통합 이름과 일치하면 Datadog은 해당 파서와 패싯을 자동으로 설치합니다. 예를 들어, `nginx`, `postgresql` 등이 있습니다. |
| `status`  | 이는 로그의 수준/심각도에 해당합니다. [패턴][7]을 정의하는 데 사용되며 Datadog Log UI에 전용 레이아웃이 있습니다.                                                                                                     |
| `service` | 로그 이벤트를 생성하는 애플리케이션 또는 서비스의 이름입니다. Logs에서 APM으로 전환하는 데 사용되므로 두 제품을 모두 사용할 때 동일한 값을 정의해야 합니다.                                                                |
| `trace_id` | 이는 트레이스에 사용되는 트레이스 ID입니다. 이는 [로그와 트레이스 연결][8]에 사용됩니다.                                                                                                                                 |
| `message` | 기본적으로 Datadog은 `message` 속성 값을 로그 항목의 본문으로 수집합니다. 그런 다음 해당 값이 강조 표시되고 Live Tail에 나타나며, 여기에서 전체 텍스트 검색을 위해 색인이 생성됩니다.                                    |

## 표준 속성

로그 통합은 기본적으로 표준 속성의 [기본 세트][9]를 사용합니다.

조직의 관리자는 목록을 선별할 수 있습니다.

- [Log Explorer][1]에서: 기존 속성을 표준 속성으로 **승격**합니다.
- 표준 속성 [설정 페이지][3]에서: 새 표준 속성을 **생성**합니다.

{{< img src="logs/processing/attribute_naming_convention/standard_attribute_config.png" alt="표준 속성" style="width:60%;">}}

표준 속성 테이블은 [사전 정의된 표준 속성](#default-standard-attribute-list) 세트와 함께 제공됩니다. 해당 목록에 고유한 속성을 추가하고 기존 표준 속성을 편집하거나 삭제할 수 있습니다.

{{< img src="logs/processing/attribute_naming_convention/edit_standard_attributes.png" alt="표준 속성 편집" style="width:80%;">}}

표준 속성은 다음과 같이 정의됩니다.

- `Path`: 표준 속성으로 **승격된** 속성의 경로(JSON에서 찾을 수 있음) (예: `network.client.ip`).
- `Type`: (`string`, `integer`, `double`, `boolean`): 재매핑 목록의 요소를 캐스팅하는 데 사용되는 속성의 유형.
- `Aliasing list`: **별칭**을 지정해야 하는 쉼표로 구분된 속성 목록.
- `Description`: 사람이 읽을 수 있는 속성 설명.

표준 속성 패널은 새 표준 속성을 추가하거나 기존 속성을 편집할 때 나타납니다.

{{< img src="logs/processing/attribute_naming_convention/define_standard_attribute.png" alt="표준 속성 정의" style="width:80%;">}}

### 기본 표준 속성 목록 

기능 도메인으로 분리된 [로그 관리 기본 표준 속성][9]의 전체 목록을 참조하세요.

- [네트워크/통신][10]
  - 이러한 속성은 네트워크 통신에 사용되는 데이터와 관련이 있습니다. 모든 필드와 메트릭 앞에는 `network`가 접두사로 붙습니다.
- [지리적 위치][11]
  - 이러한 속성은 네트워크 통신에 사용되는 IP 주소의 지리적 위치와 관련됩니다. 모든 필드에는 `network.client.geoip` 또는 `network.destination.geoip` 접두사가 붙습니다.
- [HTTP 요청][12]
  - 이러한 속성은 HTTP 요청 및 액세스에 일반적으로 사용되는 데이터와 관련이 있습니다. 모든 속성에는 `http` 접두사가 붙습니다.
  - 이러한 속성을 사용하는 일반적인 통합에는 [Apache][4], Rails, [AWS CloudFront][13], 웹 애플리케이션 서버 등이 포함됩니다.
  - URL 세부정보 속성 앞에는 `http.url_details`가 붙습니다. 이러한 속성은 HTTP URL의 파싱된 부분에 대한 세부정보를 제공합니다. [URL 파서][14]에 의해 생성됩니다.
- [소스 코드][15]
  - 이러한 속성은 커스텀 애플리케이션의 로거로 인해 로그 또는 오류가 생성될 때 사용되는 데이터와 관련이 있습니다. 모든 속성에는 `logger` 또는 `error` 접두사가 붙습니다.
  - 이러한 속성을 사용하는 일반적인 통합에는 Java, NodeJs, .NET, Golang, Python 등이 있습니다.
- [데이터베이스][16]
  - 이러한 속성을 사용하는 일반적인 통합은 [Cassandra][17], [MySQL][18], [RDS][19], [Elasticsearch][20] 등입니다.
- [성능][21]
  - 이러한 속성은 성능 메트릭과 관련이 있습니다. 이 속성에 대한 로그 내의 모든 기간이 [트레이스 검색][23]의 기본 [측정값][1]으로 표시되고 사용되므로 [리매핑][22]할 것을 권장합니다.
- [사용자 관련 속성][24]
  - 모든 속성과 측정값에는 `usr` 접두사가 붙습니다.
- [Syslog 및 로그 운송자][25]
  - 이러한 속성은 syslog 또는 로그 운송자 에이전트가 추가한 데이터와 관련이 있습니다. 모든 필드와 메트릭에는 접두사`syslog`가 붙습니다.
  - 이에 의존하는 통합에는 [Rsyslog][26], [NxLog][27], [Syslog-ng][28], [Fluentd][29] 및 [Logstash][30]가 포함됩니다.
- [DNS][31]
  - 모든 속성과 측정값에는 `dns` 접두사가 붙습니다.
- [이벤트][32]
  - 모든 속성에는 `evt` 접두사가 붙습니다.

## 별칭

대상 속성에 매핑되는 소스 속성에 대한 별칭을 생성하면 로그가 소스 및 대상 속성을 모두 전달할 수 있습니다.

사용자는 별칭(소스) 또는 표준(대상) 패싯 속성과 상호 작용할 수 있습니다. 그러나 사용자는 별칭이 아닌 표준 패싯을 사용하는 것이 [좋습니다][33]. 이는 명명 규칙에 대한 지침을 제공하고 사용자가 비표준 콘텐츠를 기반으로 자산(예: 저장된 보기 또는 대시보드)을 구축하는 것을 방지합니다.

**별칭에 관한 추가 세부정보**:

- 별칭은 파이프라인에서 로그를 처리한 후에 발생합니다. 추출되거나 처리된 모든 속성은 별칭의 소스로 사용될 수 있습니다.
- Datadog은 별칭 속성의 유형을 적용합니다. 불가능한 경우 별칭을 건너뜁니다.
- 이미 대상 속성을 전달하는 로그의 경우 별칭은 해당 로그의 값을 재정의합니다.
- 여러 속성의 별칭이 지정된 표준 속성의 경우 로그에 이러한 소스 속성 중 여러 개가 있으면 해당 소스 속성 중 하나만 별칭이 지정됩니다.
- 표준 속성에 대한 모든 업데이트 또는 추가 사항은 새로 수집된 로그에만 적용됩니다.
- 표준 속성에는 별칭을 지정할 수 없습니다.
- 속성은 표준 속성으로만 별칭을 지정할 수 있습니다.
- 로그의 JSON 구조를 따르기 위해서는 하나의 표준 속성을 다른 속성의 하위로 갖는 것이 불가능합니다(예를 들어, `user` 및 `user.name` 둘 다 표준 속성일 수는 없습니다).

자세한 내용은 [별칭 패싯][34]을 참조하세요.

## 참고 자료

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
[14]: /ko/logs/log_configuration/processors/#url-parser
[15]: /ko/standard-attributes/?search=logger+error&product=log+management
[16]: /ko/standard-attributes/?search=db&product=log+management
[17]: /ko/integrations/cassandra/
[18]: /ko/integrations/mysql/
[19]: /ko/integrations/amazon_rds/
[20]: /ko/integrations/elastic/
[21]: /ko/standard-attributes/?search=duration&product=log+management
[22]: /ko/logs/log_configuration/processors/#remapper
[23]: /ko/tracing/app_analytics/search/
[24]: /ko/standard-attributes/?search=usr&product=log+management
[25]: /ko/standard-attributes/?search=syslog&product=log+management
[26]: /ko/integrations/rsyslog/
[27]: /ko/integrations/nxlog/
[28]: integrations/syslog_ng/
[29]: /ko/integrations/fluentd/
[30]: /ko/integrations/logstash/
[31]: /ko/standard-attributes/?search=dns&product=log+management
[32]: /ko/standard-attributes/?search=evt&product=log+management
[33]: /ko/logs/explorer/facets/#aliased-facets
[34]: /ko/logs/explorer/facets/#alias-facets