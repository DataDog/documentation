---
algolia:
  tags:
  - log facets
aliases:
- /ko/logs/facets
description: 로그 패싯과 패싯 패널
further_reading:
- link: logs/explorer/analytics
  tag: 설명서
  text: 로그 분석 수행
- link: logs/explorer/patterns
  tag: 설명서
  text: 로그 내 패턴 감지
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리 방법 알아보기
- link: logs/explorer/saved_views
  tag: 설명서
  text: Log Explorer 자동 구성
- link: https://learn.datadoghq.com/courses/log-explorer
  tag: 학습 센터
  text: Log Explorer 시작
title: 로그 패싯
---
{{< img src="logs/explorer/facet/facets_in_explorer.mp4" alt="탐색기 패싯의 패싯" video=true style="width:100%;">}}

## 개요 {#overview}

패싯은 인덱싱된 로그의 사용자가 정의한 태그와 특성입니다. 패싯은 정성적 또는 정량적 데이터 분석에 사용됩니다. 따라서 Log Explorer에서 다음의 작업에 패싯을 사용할 수 있습니다.

- [로그에서 검색][1]
- [로그 패턴 정의][2]
- [로그 분석 수행][3]

또 패싯을 사용해 [로그 모니터링][4] 및 [대시보드][5]와 [노트북][6]의 로그 위젯에서 로그를 조절할 수 있습니다.

**참고**: [로그 처리][7], [라이브테일 검색][8], [Log Explorer 검색][9], 로그에서의 [메트릭 생성][10], [아카이브][11] 전달 또는 [리하이드레이션][12]을 지원하는 데 패싯이 필요하지 않습니다. 필터를 사용하여 로그를 [Pipelines][13] 및 [Indexes][14]를 통해 라우팅하거나, [제외 필터][15]로 인덱스에서 로그를 제외하거나 샘플링할 때도 패싯이 필요 없습니다. 

이와 같은 컨텍스트에서는 자동 완료 기능에서 기존 패싯을 사용하나, 수신 로그와 일치하는 입력이라면 무엇이든 사용할 수 있습니다.

### 정성적 패싯 {#qualitative-facets}

#### 차원 {#dimensions}

다음의 경우에 정성적 패싯을 사용하세요.

- 값에 대한 **상대적 인사이트를 확보**해야 할 때 사용합니다. 예를 들어 [NGINX][16] 웹 액세스 로그에서 `http.network.client.geoip.country.iso_code`에 패싯을 생성하여 5XX 오류 수 대비 가장 영향을 많이 받은 상위 국가를 볼 수 있습니다. 이때 Datadog [GeoIP Processor][17]로 보강합니다.
- **고유 값 개수를 계산**해야 할 때 사용합니다. 예를 들어 [Kong][18] 로그에서 `user.email` 패싯을 생성해 하루에 몇 명이 웹사이트를 이용하는지 알 수 있습니다.
- 특정 값에 따라 로그를 자주 **필터링**해야 할 때 사용합니다. 예를 들어 `environment` [태그][19]에 패싯을 생성해 개발, 스테이징, 또는 프로덕션 환경까지 문제 해결 범위를 지정할 수 있습니다.

**참고**: 특성 값을 필터링할 때 패싯을 반드시 사용해야 할 필요는 없지만 문제를 조사할 때 자주 사용하는 특성에 패싯을 정의해두면 문제 해결 시간을 줄이는 데 도움이 됩니다.

#### 유형 {#types}

정성적 패싯의 유형은 문자열 또는 숫자(정수)일 수 있습니다. 문자열 유형을 차원에 할당하면 대부분의 경우 정상적으로 작동하지만 정수 유형을 범위에 사용하면 위에 언급한 모든 기능에 더해 범위 필터링이 가능합니다. 예를 들어 정수 유형 차원에 사용하는 유효한 쿼리에는 `http.status_code:[200 TO 299]`가 있습니다. 참고 자료는 [구문 검색][1]을 확인하세요.

### 정량적 패싯 {#quantitative-facets}
#### 수치 {#measures}

다음의 경우에 수치를 사용하세요.

- 여러 로그의 **값을 집계**해야 할 때 사용합니다. 예를 들어 맵 서버의 [Varnish 캐시][20]를 이용하는 타일 크기 수치를 생성하고 일일 **평균** 처리량을 추적하거나 요청 타일 크기 **총합**별 상위 참조자를 볼 수 있습니다.
- 로그의 **필터링 범위를 지정**해야 할 때 사용합니다. 예를 들어 [Ansible][21] 작업 실행 시간의 수치를 생성하고 실행하는 데 10초 넘게 소요되는 서버 목록을 볼 수 있습니다.
- 특정 값의 **로그를 정렬**해야 할 때 사용합니다. 예를 들어 [Python][22] 마이크로서비스로 실행한 결제량 수치를 생성할 수 있습니다. 그런 다음 가장 높은 금액의 로그부터 모든 로그를 검색하는 것이 가능합니다.

#### 유형 {#types-1}

수치에는 (long) integer 또는 double 값이 사용되며, 두 형식은 동등한 기능을 제공합니다.

#### 단위 {#units}

수치는 쿼리 시간 및 표시 시간에서 자릿수를 처리하기 위한 **시간** 또는 **크기** 단위를 지원합니다.

| 유형        | 단위                                                                                                                                                                                                                                                                                                                    |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| BYTES       | 비트/바이트/키비바이트/메비바이트/기비바이트/테비바이트/페비바이트/엑스비바이트                                                                                                                                                                                                                                               |
| TIME        | 나노초/마이크로초/밀리초/초/분/시/일/주                                                                                                                                                                                                                                               |

단위는 필드가 아닌 수치 자체의 속성입니다. 예를 들어, 나노초 단위의 `duration`측정을 고려해 보겠습니다. `service:A`에 로그가 있을 때 여기서 `duration:1000`은 1000밀리초를 나타내며 `service:B`에 다른 로그가 있을 때 여기서 `duration:500`은 500마이크로초를 나타냅니다.

1. [산술 프로세서][23]를 사용하여 모든 로그의 지속 시간을 나노초로 변환합니다. `*1000000` 배수를 `service:A`의 로그에 적용하고, `*1000` 배수를 `service:B`의 로그에 적용하세요.
2. `duration:>20ms`([검색 구문][1] 참조)를 사용하여 두 서비스의 스팬 태그를 일관되게 쿼리하고 최대 `1 min`의 집계 결과를 확인합니다.

## 패싯 패널 {#facet-panel}

검색창은 데이터를 필터링하고 그룹화하기 위한 가장 포괄적인 상호 작용 세트를 제공합니다. 그러나 대부분의 경우 패싯 패널을 통해 데이터를 간단하게 탐색할 수 있습니다. 현재 쿼리 범위에 대한 내용 요약을 확인하려면 패싯을 여세요.

**패싯(정성적)**에는 고유한 값의 상위 목록과 각 값과 일치하는 로그 개수가 함께 제공됩니다.

{{< img src="logs/explorer/facet/dimension_facet.png" alt="차원 패싯" style="width:30%;">}}

하나의 값을 클릭해 검색 쿼리 범위를 조정하세요. 값을 클릭하여 해당 고유 값과 전체 값 검색 결과를 토글할 수 있습니다. 확인란을 클릭해 특정 값을 전체 값 목록에서 추가하거나 삭제할 수 있고 내용을 검색할 수도 있습니다.

{{< img src="logs/explorer/facet/dimension_facet_wildcard.png" alt="패싯 자동 완성" style="width:30%;">}}

**수치**는 최소값 및 최대값을 나타내는 슬라이더와 함께 제공됩니다. 슬라이더를 사용하거나 숫자 값을 입력하여 검색 쿼리의 범위를 다르게 조정할 수 있습니다.

{{< img src="logs/explorer/facet/measure_facet.png" alt="수치 패싯" style="width:30%;">}}

### 패싯 숨기기 {#hide-facets}

조직에는 다양한 팀의 여러 사용 사례에 맞게 처리하기 위해 수집하는 패싯 종류가 매우 많습니다. 그러나 보통 특정 문제 해결 상황에서는 이 패싯의 하위 집합만 유용하게 사용됩니다. 문제 해결 세션에서 평상시에 사용하지 않는 패싯을 숨기고 필요한 패싯만 표시하세요.
1. [Log Explorer][30]에서 숨기려는 패싯을 찾습니다.
1. 패싯 옆에 있는 톱니 아이콘을 클릭합니다.
1. {{< ui >}}Hide Facet{{< /ui >}}을 선택합니다.

필요한 경우 숨겨진 패싯이 패싯 검색에 계속 표시됩니다([패싯 필터링](#filter-facets) 섹션 참조). 패싯 검색에서 숨겨진 패싯을 숨김 해제하세요.


숨긴 패싯은 검색창 자동 완성과 Log Explorer의 분석 결과 드롭다운(예: 수치, 그룹별)에서도 숨겨집니다. 그러나 검색 쿼리에서는 패싯을 숨겨도 유효한 상태로 표시됩니다(예: 로그 탐색기 링크를 복사 후 붙여넣기한 경우).

숨긴 패싯은 Log Explorer(예: 대시보드의 라이브테일, 모니터링 또는 위젯 정의) 외에 미치는 영향이 없습니다.

#### 숨겨진 패싯 및 팀원 {#hidden-facets-and-teammates}

패싯을 숨기는 것은 자체 문제 해결 상황에만 적용되며, [저장된 뷰][24]를 업데이트하는 경우를 제외하고는 팀원의 뷰에는 아무런 영향을 미치지 않습니다. 이 경우, 숨긴 패싯은 저장된 뷰에 저장된 컨텍스트의 일부가 됩니다.

### 패싯 그룹화 {#group-facets}

패싯을 쉽게 탐색할 수 있도록 패싯 목록에 의미 있는 주제로 그룹화되어 있습니다. 패싯 그룹을 할당 및 재할당할 경우, 패싯 목록 디스플레이에만 영향을 미치며 검색 및 분석 기능에는 아무런 영향을 주지 않습니다.

{{< img src="logs/explorer/facet/group_facets.png" alt="패싯 그룹화" style="width:30%;">}}

패싯을 그룹화하려면 다음 단계를 따르세요.

1. 패싯의 톱니바퀴 아이콘을 클릭합니다.
2. {{< ui >}}Edit facet{{< /ui >}}을 선택합니다.
3. {{< ui >}}Advanced options{{< /ui >}} 섹션을 클릭하여 확장합니다.
4. {{< ui >}}Group{{< /ui >}} 필드에 해당 패싯이 속하도록 지정할 그룹 이름을 입력합니다.
5. {{< ui >}}Update{{< /ui >}}를 클릭합니다.

### 패싯 필터링 {#filter-facets}

패싯의 검색 상자를 사용해 전체 패싯 목록에서 범위를 좁혀 상호작용해야 하는 패싯으로 더 신속하게 이동할 수 있습니다. 패싯 검색 시 패싯 표시 이름과 패싯 필드 이름을 사용해 검색 결과를 조정할 수 있습니다.

{{< img src="logs/explorer/facet/search_facet.png" alt="패싯 검색" style="width:30%;">}}

### 별칭이 지정된 패싯 {#aliased-facets}

일부 패싯에는 별칭이 지정되었을 수 있습니다([패싯 별칭 지정](#alias-facets) 섹션 참조). 별칭이 지정된 패싯은 여전히 슬라이싱 및 다이싱에 사용할 수 있지만, 조직에서 더 이상 사용하지 않는 것으로 간주됩니다.

{{< img src="logs/explorer/facet/aliased_facet.png" alt="별칭이 지정된 패싯" style="width:30%;">}}

문제 해결 시 다른 팀의 내용이 _별칭이 지정된_ 패싯보다 _표준_ 패싯에서 (귀하 팀의 내용과 함께) 표시될 가능성이 더 큽니다. 이를 통해 다양한 출처 내 내용 간의 상관관계를 더욱 쉽게 파악할 수 있습니다.

패싯 목록에서 별칭이 지정된 패싯이 표시되면 {{< ui >}}switch to alias{{< /ui >}} 메뉴 항목을 클릭해 _표준_ 패싯을 대신 사용해 보세요. 이 작업은 별칭이 지정된 패싯을 숨기고 표준 패싯의 숨김을 해제합니다. 이때 저장된 뷰를 업데이트해야 하는 경우, 저장된 뷰를 저장해 해당 뷰를 사용하는 사용자 모두에게 별칭이 적용되도록 하세요.

{{< img src="logs/explorer/facet/switch_facet.png" alt="패싯 전환" style="width:30%;">}}

예전 내용(조직에서 해당 패싯의 별칭을 설정하기 이전)에 대한 문제 해결을 수행하는 경우 _별칭이 지정된_ 비표준 패싯 버전을 저장해야 할 수도 있습니다.

## 패싯 관리 {#manage-facets}

### 기본 제공 패싯 {#out-of-the-box-facets}

가장 일반적으로 사용하는 패싯인 `Host`와 `Service`는 기본적으로 제공되기 때문에 로그 인덱스에 로그가 전송되면 즉시 문제 해결에 사용할 수 있습니다.

[예약된 특성][25]과 대부분의 [표준 특성][26] 패싯은 기본적으로 사용할 수 있습니다.

### 인덱스 패싯 {#index-facet}

인덱스 패싯은 조직에 [여러 인덱스][27]가 있거나, 활성화된 [내역 뷰][28]가 있는 경우에만 표시되는 특정 패싯입니다. 쿼리를 인덱스의 하위 집합으로 범위를 좁히고 싶다면 이 패싯을 사용하세요.

{{< img src="logs/explorer/facet/index_facet_.png" alt="패싯 생성" style="width:30%;">}}

### 패싯 생성 {#create-facets}

모범 사례로 운영하려면 언제나 새 패싯을 생성하기보다 기존 패싯 사용을 먼저 고려하세요([별칭이 지정된 패싯](#alias-facets) 섹션 참고). 비슷한 정보를 얻을 때 고유한 패싯을 사용하면 팀 간의 협력을 증진할 수 있습니다.

JSON 개체 어레이에서 패싯을 생성하려면 먼저 [grok 구문 분석 도구][29]를 사용해 특성을 추출하고 해당 특성의 패싯을 생성하세요.

**참고**: 패싯이 생성되면 **새 로그 전체**에 해당 내용이 채워집니다. Log Management 솔루션을 최적으로 사용할 수 있도록 Datadog은 최대 1,000개의 패싯 사용을 권장합니다.

#### 로그 사이드 패널 {#log-side-panel}

패싯을 생성하는 가장 간단한 방법은 로그 사이드 패널에서 해당 패싯을 추가하는 것입니다. 여기에는 필드 이름이나 데이터의 기본 유형 등 대부분의 패싯 세부 정보가 미리 채워져 있어 확인만 하면 됩니다. [Log Explorer][1]에서 패싯을 생성할 필드가 있는 관심 로그로 이동하세요. 이동한 로그의 사이드 패널을 열고 해당 필드(태그나 특성 중 하나)를 클릭한 후 패싯을 생성하세요.

- 필드의 값이 문자열인 경우에는 패싯 생성만 가능합니다.
- 필드의 값이 숫자인 경우에는 패싯 및 수치 생성이 모두 가능합니다.

{{< img src="logs/explorer/facet/create_facet_from_attribute.png" alt="특성으로 패싯 생성" style="width:30%;">}}

**참고**: 패싯을 1,000개 이하로 사용하는 것이 모범 사례로 권장됩니다.

#### 패싯 목록 {#facet-list}

일치하는 로그를 찾을 수 없는 경우, _패싯 추가_ 버튼을 사용하여 패싯 패널에서 바로 새 패싯을 생성하세요.

이 패싯의 기본 필드(키) 이름을 다음과 같이 정의합니다.

- 태그에는 태그 키 이름을 사용합니다.
- 특성의 경우, `@` 접두사를 포함한 특성 경로를 사용합니다.

현재 뷰 내 로그의 내용에 기반한 자동 완성은 적절한 필드 이름을 정의하는 데 도움을 줍니다. 다만, 인덱스에 일치하는 로그가 아직 유입되지 않은 경우에는 사실상 어떤 값이든 사용할 수 있습니다.

{{< img src="logs/explorer/facet/create_facet_from_scratch.png" alt="처음부터 패싯 생성" style="width:30%;">}}

### 별칭이 지정된 패싯 {#alias-facets}

고유한 패싯에 유사한 내용을 모으면 팀 간 분석과 문제 해결이 가능합니다. [명명 규칙][26]을 참고하세요.

별칭 기능을 옵션으로 사용하면 명명 규칙이 일관되지 않은 팀 간에 원활하게 일관성을 도입할 수 있습니다. 별칭 기능을 사용하면 팀원들이 조직에서 생성하는 표준 패싯을 모두 사용할 수 있습니다.

#### 다른 패싯에 별칭 지정 {#aliasing-facet-to-facet}

조직 내 여러 팀이 이미 유사한 내용에 여러 개의 패싯을 생성한 경우에 이 방법을 사용하는 것이 좋습니다.

_별칭이 지정된_ 패싯을 _표준_ 패싯으로 별칭을 지정하는 경우

- 사용자는 문제 해결을 위해 별칭이 지정된 패싯과 표준 패싯 중 하나를 사용할 수 있습니다. 다양하고 다차원적인 소스에서 유입되는 내용의 상관 관계를 쉽게 수립하려면 표준 패싯을 이용하는 것이 좋습니다.
- 별칭이 지정된 패싯 대신 표준 패싯을 사용하도록 권장하는 메시지가 사용자에게 표시됩니다.

표준 패싯으로 패싯에 별칭을 지정하려면 패싯 메뉴에서 {{< ui >}}Alias to...{{< /ui >}} 작업 항목을 선택하세요. 조직 내 기존 [표준][14] 패싯 전체 목록 중에서 대상 패싯을 선택하세요.

{{< img src="logs/explorer/facet/alias_modal.png" alt="별칭 모달" style="width:30%;">}}

#### 특성으로 패싯에 별칭 지정 {#aliasing-attribute-to-facet}

새 소스에서 유입되는 로그를 온보딩할 경우에 가장 적합한 방법입니다. 해당 로그의 일부 필드에 패싯을 생성하고 표준 패싯으로 별칭을 지정하여 패싯에 대한 지원이 바로 중단되도록 하는 대신, 기존 패싯으로 필드의 별칭을 바로 지정할 수 있습니다.

{{< img src="logs/explorer/facet/alias_facet_from_attribute.png" alt="특성으로 패싯 별칭 지정" style="width:30%;">}}

## 패싯 삭제 {#delete-a-facet}

<div class="alert alert-warning">인덱스, 모니터링, 대시보드, 제한 쿼리 또는 다른 팀에서 사용 중인 패싯을 삭제하면 구성에 오류가 발생할 수 있습니다.</div>

패싯을 삭제하려면 다음 단계를 따르세요.

- 패싯 패널 상단에서 {{< ui >}}Showing xx of xx{{< /ui >}}를 클릭합니다.
- 패싯을 검색합니다.
- 패싯의 연필 아이콘을 클릭합니다.
- {{< ui >}}Delete{{< /ui >}}를 클릭합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/search_syntax/
[2]: /ko/logs/explorer/patterns/
[3]: /ko/logs/explorer/analytics/
[4]: /ko/monitors/types/log/
[5]: /ko/dashboards/widgets/
[6]: /ko/notebooks/
[7]: /ko/logs/log_configuration/processors
[8]: /ko/logs/live_tail/
[9]: /ko/logs/explorer/
[10]: /ko/logs/logs_to_metrics/
[11]: /ko/logs/archives/
[12]: /ko/logs/archives/rehydrating/
[13]: /ko/logs/log_configuration/pipelines
[14]: /ko/logs/indexes/#indexes-filters
[15]: /ko/logs/indexes/#exclusion-filters
[16]: /ko/integrations/nginx/
[17]: /ko/logs/log_configuration/processors/geoip_parser/
[18]: /ko/integrations/kong/
[19]: /ko/getting_started/tagging/assigning_tags/
[20]: /ko/integrations/varnish/
[21]: /ko/integrations/ansible/
[22]: /ko/integrations/python/
[23]: /ko/logs/log_configuration/processors/arithmetic_processor/
[24]: /ko/logs/explorer/saved_views/
[25]: /ko/logs/log_configuration/attributes_naming_convention/#reserved-attributes
[26]: /ko/logs/log_configuration/attributes_naming_convention
[27]: /ko/logs/indexes/#indexes
[28]: /ko/logs/log_configuration/rehydrating
[29]: /ko/logs/log_configuration/parsing/?tab=matchers#nested-json
[30]: https://app.datadoghq.com/logs