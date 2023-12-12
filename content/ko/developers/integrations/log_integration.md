---
aliases:
- /ko/logs/faq/partner_log_integration
description: Datadog 로그 통합을 생성하는 방법에 대해 알아봅니다.
further_reading:
- link: /integrations/#cat-log-collection
  tag: 설명서
  text: 기존 Datadog 로그 통합 보기
- link: /logs/explorer/facets/
  tag: 설명서
  text: 로그 패싯에 대해 알아보기
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색기에 대해 알아보기
- link: /logs/log_configuration/pipelines/
  tag: 설명서
  text: 로그 파이프라인에 대해 알아보기
kind: 도움말
title: 로그 통합 생성하기
---
## 개요

이 페이지에서는 기술 파트너에게 Datadog 로그 통합 생성 과정을 안내합니다.

## 로그 통합

[로그 수집 HTTP 엔드포인트][1]를 사용하여 Datadog으로 로그를 전송합니다.

## 개발 프로세스

### 가이드라인

로그 통합을 생성할 때는 다음과 같은 모범 사례를 참고하세요.

데이터를 Datadog의 표준 속성에 매핑
: 다양한 기술과 애플리케이션의 로그를 중앙 집중화하면 로그 관리 환경에서 수십 또는 수백 가지의 다양한 속성이 생성될 수 있습니다. 통합은 [표준 명명 규칙][17]을 최대한 따라야 합니다.

`source` 태그를 통합 이름으로 설정합니다.
: Datadog은  `source` 태그를 `<integration_name>`로 설정하고 `service` 태그를 원격 측정을 생성하는 서비스의 이름으로 설정할 것을 권장합니다. 예를 들어, `service` 태그는 제품 라인별로 로그를 구별하는 데 사용할 수 있습니다. </br></br> 서로 다른 서비스가 없는 경우에는 `service`를 `source`과 같은 값으로 설정합니다. 통합 파이프라인 및 대시보드를 활성화하는 데 사용되므로 `source` 및 `service` 태그는 사용자가 편집할 수 없습니다. 태그는 페이로드에 설정하거나 `?ddsource=example&service=example`와 같이 쿼리 파라미터를 통해 설정할 수 있습니다. </br></br> `source` 및 `service`태그는 소문자여야 합니다.

통합은 모든 Datadog 사이트를 지원해야 합니다.
: 사용자는 해당될 때마다 다양한 Datadog 사이트 중에서 선택할 수 있어야 합니다. 사이트 간의 차이에 대한 자세한 내용은 [Datadog 사이트 시작하기][2]를 참조하세요. </br></br> Datadog 사이트 엔드포인트는 `http-intake.logs`입니다.{{< region-param key="dd_site" code="true" >}}.

사용자가 통합을 설정하는 동안 커스텀 태그를 첨부할 수 있도록 허용합니다.
: Datadog에서는 수동 사용자 태그를 JSON 본문의 키-값 속성으로 전송할 것을 권장합니다. 로그에 수동 태그를 추가할 수 없는 경우 `ddtags=<TAGS>` 쿼리 파라미터를 사용하여 태그를 보낼 수 있습니다. 예시는 [로그 전송 API 문서][1]를 참조하세요.

가능하면 JSON 본문에 배열 없이 데이터를 전송하세요.
: 일부 데이터를 태그로 보내는 것이 가능하지만 Datadog에서는 JSON 본문으로 데이터를 보내고 배열을 피하는 것이 좋습니다. 이를 통해 Datadog Log Management에서 데이터와 관련된 작업을 더 유연하게 수행할 수 있습니다.

Datadog API 키를 기록하지 마세요.
: Datadog API 키는 헤더에 전달하거나 HTTP 경로의 일부로 전달할 수 있습니다. 예시는 [로그 전송 API 문서][1]를 참조하세요. Datadog은 설정에서 API 키를 기록하지 않는 방법을 사용할 것을 권장합니다.

Datadog 애플리케이션 키를 사용하지 마세요.
: Datadog 애플리케이션 키는 API 키와 다르며 HTTP 엔드포인트를 사용하여 로그를 전송할 필요가 없습니다.

## Datadog 파트너 계정에서 로그 통합 에셋 설정

Datadog 기술 파트너가 되는 방법 및 통합 개발 샌드박스 액세스 권한을 얻는 방법은 [통합 구축][18]에서 자세히 알아보세요.

### 로그 파이프라인 필수 요건 

Datadog으로 전송된 로그는 [로그 파이프라인][13]에서 처리되어 검색 및 분석이 용이하도록 표준화됩니다.

로그 파이프라인을 설정하려면:

1. [**Logs**> **Pipeline**][3]으로 이동합니다.
2. **+ New Pipeline**을 클릭합니다.
3. **Filter** 필드에서 기술 파트너의 로그에 대한 로그 소스를 정의하는 고유 `source` 태그를 입력합니다. 예를 들어, Okta 통합의 경우 `source:okta`입니다. **참고**: 통합을 통해 전송된 로그가 Datadog으로 전송되기 전에 올바른 소스 태그로 태그가 지정되어 있는지 확인하세요.
4. 필요 시 태그 및 설명을 추가합니다.
5. **Create**를 클릭합니다.

파이프라인 내에 프로세서를 추가하여 데이터를 재구성하고 속성을 생성할 수 있습니다.

**필수 요건:**

- [날짜 리매퍼][4]를 사용하여 로그에 대한 공식 타임스탬프를 정의합니다.
- 상태 리매퍼를 사용하여 로그의 `status`를 다시 매핑하거나 [카테고리 프로세서][19]를 사용하여 범위로 매핑된 상태(HTTP 상태 코드와 마찬가지로)를 다시 매핑합니다.
- 속성 [리매퍼][5]를 사용하여 속성 키를 표준 [Datadog 속성][6]으로 다시 매핑합니다. 예를 들어 Datadog이 기본 대시보드에 기술 파트너 로그를 표시할 수 있도록 클라이언트 IP가 포함된 속성 키를 `network.client.ip`에 다시 매핑해야 합니다. 중복을 피하기 위해 `preserveSource:false`를 사용하여 다시 매핑할 때 원래 속성을 제거합니다.
- [서비스 리매퍼][7]를 사용하여 `service` 속성을 다시 매핑하거나 `source` 속성과 동일한 값으로 설정합니다.
- 더 나은 검색 및 분석을 위해 [grok 프로세서][8]를 사용하여 로그에서 값을 추출합니다. 최적의 성능을 유지하려면 grok 파서가 구체적이어야 합니다. 와일드카드 일치를 피하세요.
- [메시지 리매퍼][9]를 사용하여 로그의 공식 메시지를 정의하고 특정 속성을 전체 텍스트로 검색할 수 있도록 합니다.

모든 로그 프로세서 목록은 [프로세서][10]를 참조하세요.

**팁**: 프로세서 작성 및 표준 속성 활용에 대한 개요를 보려면 무료 과정인 [로그 처리에 대한 심화][20]를 수강하세요.

### 패싯 필수 요건

선택적으로 [로그 탐색기][16]에서 [패싯][12]을 생성할 수 있습니다. 패싯은 검색 결과를 필터링하고 범위를 좁히는 데 사용할 수 있는 특정 속성입니다. 패싯은 검색 결과를 필터링하는 데 꼭 필요한 것은 아니지만 사용자가 검색을 구체화하는데 있어 사용 가능한 범위을 이해하는 데 도움이 됩니다.

측정값은 범위에 대한 검색에 사용되는 특정 유형의 패싯입니다. 예를 들어 지연 시간에 대한 측정값을 추가하면 사용자는 특정 지연 시간을 초과하는 모든 로그를 검색할 수 있습니다. **참고**: 속성의 내용을 기반으로 측정값 패싯의 [단위][11]를 정의합니다.

패싯 또는 측정 값을 추가하려면:

1. 패싯을 추가하거나 측정할 속성이 포함된 로그를 클릭합니다.
2. 로그 패널에서 속성 옆에 있는 Cog 아이콘을 클릭합니다.
3. **Create facet/measure for @attribute**를 선택합니다.
4. 측정 값의 경우 단위를 정의하려면 **Advanced options**를 클릭합니다. 속성이 나타내는 내용에 따라 단위를 선택합니다.
5. **Add**를 클릭합니다.

**참고:** 표준 속성에 대한 패싯을 생성할 필요는 없습니다. 표준 속성에 대한 패싯은 로그 파이프라인이 게시될 때 Datadog에 의해 자동으로 추가됩니다. 특정 그룹 아래의 표준 Datadog 속성에 대한 [기본 표준 속성 목록][6]을 참조하세요.

패싯 목록을 쉽게 탐색할 수 있도록 패싯이 그룹화됩니다. 통합 로그와 관련된 필드의 경우 `source` 태그와 동일한 이름을 가진 단일 그룹을 생성합니다.

1. 로그 패널에서 새 그룹에서 원하는 속성 옆에 있는 Cog 아이콘을 클릭합니다.
2. **Edit facet/measure for @attribute**를 선택합니다. 아직 속성에 대한 패싯이 없으면 **Create facet/measure for @attribute**를 선택합니다.
3. **Advanced options**를 클릭합니다.
4. **Group** 필드에 새 그룹의 이름과 설명을 입력하고 **New group**을 선택합니다.
5. **Update**를 클릭합니다.

**필수 요건:**
- 가능한 한 표준 속성을 사용하세요. 그렇지 않으면, 패싯이 Datadog 전체에서 공유되므로 충돌을 피하기 위해 특정 네임스페이스(예: 통합 이름)를 사용하세요.
- 패싯에는 소스가 있습니다. 속성에 대해서는 `log` 또는 태그에 대해서는 `tag`입니다.
- 패싯에는 속성 유형과 일치하는 유형(문자열, 부울, 더블 또는 정수)이 있습니다. 속성 값의 유형이 패싯 유형과 일치하지 않는 경우 속성은 패싯으로 인덱싱되지 않습니다.
- 더블 및 정수 패싯은 단위를 가질 수 있습니다. 단위는 패밀리(예: 시간 또는 바이트)와 이름(예: 밀리초 또는 지비바이트)으로 구성됩니다.
- 패싯은 그룹으로 저장되며 설명이 있습니다.
- 속성을 다시 매핑하고 둘 다 유지하는 경우 단일 속성에 패싯을 정의하세요.

## 통합 검토 및 배포

Datadog은 이 페이지에 문서화된 지침 및 요구 사항을 기반으로 로그 통합을 검토하고 기술 파트너에게 피드백을 제공합니다. 그러면 기술 파트너가 검토하고 그에 따라 변경합니다.

검토 프로세스를 시작하려면 최종 파이프라인, 프로세서 및 패싯 정의에 대한 내용을 가지고 [Datadog 파트너 포털][21]에 문의해 주세요.

통합을 통해 Datadog으로 전송될 것으로 예상되는 모든 속성과 함께 샘플 원본 로그를 포함해야 합니다. 원본 로그는 Datadog에서 수집되기 전에 소스에서 직접 생성된 원본 메시지로 구성됩니다.

검토가 완료되면 Datadog은 새 로그 통합 에셋을 생성하고 배포합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/api/latest/logs/#send-logs
[2]: https://docs.datadoghq.com/ko/getting_started/site/
[3]: https://app.datadoghq.com/logs/pipelines
[4]: https://docs.datadoghq.com/ko/logs/log_configuration/processors/?tab=ui#log-date-remapper
[5]: https://docs.datadoghq.com/ko/logs/log_configuration/processors/?tab=ui#remapper
[6]: https://docs.datadoghq.com/ko/logs/log_configuration/attributes_naming_convention/#default-standard-attribute-list
[7]: https://docs.datadoghq.com/ko/logs/log_configuration/processors/?tab=ui#service-remapper
[8]: https://docs.datadoghq.com/ko/logs/log_configuration/processors/?tab=ui#grok-parser
[9]: https://docs.datadoghq.com/ko/logs/log_configuration/processors/?tab=ui#log-message-remapper
[10]: https://docs.datadoghq.com/ko/logs/log_configuration/processors/
[11]: https://docs.datadoghq.com/ko/logs/explorer/facets/#units
[12]: https://docs.datadoghq.com/ko/logs/explorer/facets/
[13]: https://docs.datadoghq.com/ko/logs/log_configuration/pipelines/
[14]: https://docs.datadoghq.com/ko/glossary/#facet
[15]: https://docs.datadoghq.com/ko/glossary/#measure
[16]: https://docs.datadoghq.com/ko/logs/explorer/
[17]: https://docs.datadoghq.com/ko/logs/log_configuration/attributes_naming_convention/#standard-attributes
[18]: https://docs.datadoghq.com/ko/developers/integrations/?tab=integrations
[19]: https://docs.datadoghq.com/ko/logs/log_configuration/processors/?tab=ui#category-processor
[20]: https://learn.datadoghq.com/courses/going-deeper-with-logs-processing
[21]: https://partners.datadoghq.com/