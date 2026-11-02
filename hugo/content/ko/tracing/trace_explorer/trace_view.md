---
algolia:
  tags:
  - trace view
aliases:
- /ko/tracing/visualization/trace/
description: 플레임 그래프, 스팬 목록, 워터폴 및 상세 스팬 정보가 포함된 맵을 사용하여 개별 트레이스를 시각화하고 분석합니다.
further_reading:
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: 블로그
  text: '성능에서 영향까지: 공유 컨텍스트를 통한 프런트엔드 팀 연결하기'
- link: /tracing/trace_collection/
  tag: 설명서
  text: 애플리케이션에서 APM 트레이싱을 설정하는 방법 알아보기
- link: /internal_developer_portal/catalog/
  tag: 설명서
  text: Datadog에 보고하는 서비스를 검색 및 카탈로그화
- link: /tracing/services/service_page/
  tag: 설명서
  text: Datadog 서비스에 관해 자세히 알아보기
- link: /tracing/services/resource_page/
  tag: 설명서
  text: 리소스 성능 및 트레이스 자세히 살펴보기
- link: /tracing/trace_explorer/trace_view/
  tag: 설명서
  text: Datadog 트레이스 읽는 법 이해
title: 트레이스 보기
---
{{< img src="tracing/trace_view/trace_view.png" alt="트레이스 보기" style="width:90%;">}}

## 개요 {#overview}

개별 [트레이스][1]를 조회하여 모든 [스팬][2] 및 관련 메타데이터를 확인합니다. 각 트레이스는 플레임 그래프, 스팬 목록, 워터폴 또는 맵으로 시각화될 수 있습니다.

트레이스 헤더에는 루트 스팬의 서비스 이름, 리소스 이름, 트레이스 ID, 엔드투엔드 트레이스 지속 시간 및 트레이스 시작 시간 등 중요한 트레이스 정보가 표시됩니다. 트레이스에 대한 퍼머링크를 얻으려면 {{< ui >}}Open Full Page{{< /ui >}}를 클릭하고 URL을 저장합니다.

{{< img src="tracing/trace_view/trace_header.png" alt="트레이스 헤더" style="width:90%;">}}


## 트레이스 시각화 {#trace-visualizations}

{{< tabs >}}
{{% tab "플레임 그래프" %}}

{{< img src="tracing/trace_view/flamegraph.png" alt="플레임 그래프" style="width:90%;">}}

플레임 그래프는 트레이스의 모든 스팬을 색상별로 구분하여 타임라인에 표시하는 기본 시각화입니다. 이 그래프는 요청의 실행 경로와 트레이스 전체에서 시간이 소요된 위치를 파악하는 데 유용합니다.

플레임 그래프를 탐색하려면 스크롤하여 확대/축소하고, 클릭한 상태로 드래그하여 이동하고, 미니맵을 사용하여 선택한 스팬으로 확대하거나 전체 트레이스로 축소합니다.

범례에서는 플레임 그래프의 색상 구분 방식을 설명합니다. {{< ui >}}Service{{< /ui >}}(기본값), {{< ui >}}[Base service][1]{{< /ui >}}(스팬이 발생한 서비스), {{< ui >}}Host{{< /ui >}} 또는 {{< ui >}}Container{{< /ui >}}별로 스팬을 그룹화합니다. 선택하면 그룹별로 트레이스 실행 시간 비율({{< ui >}}% Exec Time{{< /ui >}}) 또는 스팬 수({{< ui >}}Spans{{< /ui >}})가 표시됩니다. {{< ui >}}Filter Spans{{< /ui >}} 아래의 {{< ui >}}Errors{{< /ui >}} 확인란을 선택하면 트레이스의 스팬에 오류가 있는 경우 플레임 그래프에서 해당 스팬이 강조 표시됩니다.

{{< site-region region="ap1,ap2,us3,us5,eu,us,uk1" >}}
[추론된 서비스][2]의 스팬은 윤곽선이 점선으로 표시됩니다.

[2]: /ko/tracing/services/inferred_services
{{< /site-region >}}

{{< img src="tracing/trace_view/flamegraph_legend.mp4" alt="플레임 그래프 범례" video="true" style="width:90%;">}}

[1]: /ko/tracing/guide/service_overrides#base-service
{{% /tab %}}
{{% tab "스팬 목록" %}}

{{< img src="tracing/trace_view/spanlist.png" alt="트레이스 보기" style="width:90%;">}}

[리소스][1]를 그룹(기본값: [서비스][2])별로 표시하고 스팬 수에 따라 정렬합니다. 이 시각화는 리소스 또는 그룹별로 지연 시간 정보를 스캔하는 데 유용합니다.

해당 버튼과 텍스트 기반 검색을 사용하여 유형 또는 명명 정보별로 리소스를 필터링할 수 있습니다.

{{< img src="tracing/trace_view/spanlist_headers.png" alt="스팬 목록 헤더" style="width:90%;">}}

{{< ui >}}RESOURCE{{< /ui >}}, {{< ui >}}SPANS{{< /ui >}}, 평균 기간({{< ui >}}AVG DURATION{{< /ui >}}), 실행 시간({{< ui >}}EXEC TIME{{< /ui >}}) 또는 트레이스 실행 시간 비율({{< ui >}}% EXEC TIME{{< /ui >}}) 등 해당하는 열 헤더를 클릭하여 그룹을 정렬할 수 있습니다.

[1]: /ko/tracing/glossary/#resources
[2]: /ko/tracing/glossary/#services
{{% /tab %}}
{{% tab "워터폴" %}}

{{< img src="tracing/trace_view/waterfall2.png" alt="워터폴" style="width:100%;">}}

타임라인에 트레이스의 모든 스팬을 표시합니다. 여기서 행 하나는 스팬 하나에 해당합니다. 이 시각화는 트레이스의 관련 부분을 격리하여 집중적으로 살펴보는 데 유용합니다.

각 행(스팬)은 다음 항목을 나타냅니다.

- **상대적 스팬 기간**: 색상별로 구분된 막대의 길이는 전체 트레이스 기간에 대한 비율에 해당합니다.
- **절대적 스팬 기간**: 밀리초(ms) 단위로 표시되는 절대 시간입니다.
- **스팬 세부 정보**: 해당 서비스 이름과 리소스 이름이 표시됩니다.
- **상태**: 해당하는 경우 HTTP 상태 코드가 표시됩니다.
- **색상 코딩**: 스팬은 서비스(기본값), 호스트 또는 컨테이너별로 색상이 지정됩니다. 스팬의 색상 지정 방식을 변경하려면 {{< ui >}}Color by{{< /ui >}} 드롭다운을 사용하세요.

{{< site-region region="ap1,ap2,us3,us5,eu,us,uk1" >}}
[추론된 서비스][1]의 스팬은 점선 밑줄로 표시됩니다.

[1]: /ko/tracing/services/inferred_services
{{< /site-region >}}

스팬 하위 항목을 확장하거나 축소하려면 행의 꺾쇠(>) 아이콘을 클릭합니다. 모든 스팬을 확장하거나 축소하려면 {{< ui >}}Expand all{{< /ui >}}(+) 또는 {{< ui >}}Collapse all{{< /ui >}}(-) 버튼을 클릭합니다.

{{% /tab %}}
{{% tab "맵" %}}

{{< img src="tracing/trace_view/trace-map.png" alt="트레이스 맵" style="width:100%;">}}

트레이스 맵은 단일 트레이스에 관련된 모든 서비스를 시각적으로 보여줍니다. 서비스 수준에서 트랜잭션 수명 주기에 대한 개요를 제공하고 서비스 종속성을 보여줍니다.

맵의 각 노드는 트랜잭션 수명 주기의 서비스를 나타냅니다. 맵에서 순환 의존성이 발생하지 않도록 하기 위해 최초 서비스에 의해 이미 호출된 다른 서비스를 다시 호출하는 서비스는 중복 노드로 표시됩니다. [추론된 서비스][2]는 윤곽선은 점선으로, 배경은 보라색으로 표시됩니다.

서비스 노드에는 {{< ui >}}total execution time{{< /ui >}}의 백분율이 표시되며, 이를 통해 서비스 수준의 트레이스 지속 시간 구성을 확인할 수 있습니다.

[서비스 엔트리 스팬][1]이 오류 상태이면 결함이 있는 서비스를 강조하기 위해 해당 서비스 노드가 빨간색 테두리로 표시됩니다. 서비스 종료 스팬에서 오류가 발생하면 다음 서비스 호출을 나타내는 가장자리도 빨간색으로 강조 표시됩니다.

각 노드의 서비스 엔트리 스팬에 대한 추가 정보를 조회하려면 오류 상태 위로 마우스를 가져갑니다. 툴팁에는 서비스 엔트리 스팬의 작업 및 리소스 이름에 대한 세부 정보가 오류 메시지와 함께 표시됩니다. 자세히 조사하려면 {{< ui >}}View Entry Span{{< /ui >}}을 클릭하여 워터폴 보기로 전환합니다.

[1]: /ko/glossary/#service-entry-span
[2]: /ko/tracing/services/inferred_services
{{% /tab %}}
{{< /tabs >}}

### 스팬에 포커스 맞추기 {#focus-on-a-span}
워터폴 및 플레임 그래프 시각화에서 스팬에 포커스를 맞춰 해당 스팬과 그 하위 항목으로 보기 범위를 좁힐 수 있습니다. 이는 대규모 트레이스에서 유용하며, 포커스를 맞추면 나머지 트레이스로 인한 노이즈 없이 특정 작업 그룹을 격리하여 조사할 수 있습니다.

플레임 그래프에서 스팬을 선택한 다음 미니맵 옆의 포커스 아이콘을 클릭합니다. 워터폴에서 스팬 위로 마우스를 가져간 다음 오른쪽의 포커스 아이콘을 클릭합니다. 시각화는 선택한 스팬을 새로운 루트로 하여 크기가 조정되며, 그 하위 항목으로 타임라인이 채워집니다. 전체 트레이스로 돌아가려면 포커스를 재설정하세요.

{{< img src="/tracing/trace_view/flamegraph-focus-on-span.mp4" alt="스팬의 플레임 그래프 포커스" video="true" style="width:90%;">}}
{{< img src="tracing/trace_view/waterfall-focus-on-spans.mp4" alt="스팬의 워터폴 포커스" video="true" style="width:90%;">}}

<div class="alert alert-info">포커스를 맞추면 표시되는 내용만 달라집니다. 포커스를 맞춰도 검색 결과에서 스팬이 필터링되어 제외되거나 원본 트레이스가 변경되지 않습니다.</div>

### 트레이스 미리 보기 {#trace-preview}
트레이스 크기가 100MB를 초과하면 기본 트레이스 측면 패널을 사용하여 완전히 시각화할 수 없습니다. 이러한 경우 트레이스 미리 보기 모드가 활성화됩니다. 이 모드는 가장 중요한 스팬만 반환하여 계속해서 조사할 수 있도록 지원합니다. 여기에는 다음이 포함됩니다.

- 서비스 엔트리 수준 스팬
- 오류 스팬
- 장기 실행 스팬
- 다른 스팬 또는 트레이스에 연결된 스팬

대규모 트레이스에 사용할 수 있는 시각화 옵션은 워터폴 및 맵 보기로 제한됩니다. 미리 보기 모드에서 워터폴 보기는 기본적으로 포함되지 않은 스팬을 가져오는 추가 옵션을 제공합니다. 이러한 스팬은 그룹화되며 번호가 매겨진 배지를 사용하여 표시됩니다. 각 배지에는 해당 그룹에서 사용할 수 있는 총 스팬 수가 표시됩니다. 번호 배지를 클릭하여 해당 그룹 내의 모든 스팬을 확장하고 조회할 수 있습니다.

{{< img src="tracing/visualization/trace/trace-preview.png" alt="트레이스 미리 보기" style="width:100%;">}}

## 스팬 검색 {#span-search}

워터폴 및 플레임 그래프 시각화에서는 검색 옵션으로 특정 쿼리와 일치하는 스팬을 찾을 수 있습니다. 검색 쿼리와 일치하는 스팬은 트레이스 보기에서 강조 표시되며, 검색 창 옆의 화살표를 사용하여 이러한 일치 항목 간에 이동할 수 있습니다.

<img src="https://github.com/user-attachments/assets/4c6fc35a-65b7-42ee-bc24-fcb9adb9d0b8" alt="Search bar" style="width:90%;">

**참고**: `Error` 확인란을 선택하면 검색 결과에는 쿼리와 일치하고 오류 상태인 스팬이 반환됩니다.

트레이스 측면 패널의 검색 쿼리는 다음 옵션을 지원합니다.

- **자유 텍스트 검색:**
자유 형식 텍스트 검색을 사용하면 서비스, 리소스 또는 작업 이름별로 필터링할 수 있습니다. 이러한 카테고리 내에서 지정된 텍스트를 포함하는 스팬이 강조 표시됩니다.
예: `web`
- **키-값 검색:**
key:value 표현식을 사용하여 특정 키-값 쌍이 있는 스팬을 필터링할 수 있습니다.
예: `service:web-ui`

**참고**: 트레이스 검색 창에서는 와일드카드가 지원되지 않습니다.

**지원되는 표현식:**
- 그룹 표현식: `language:(go OR python)`
- 불리언 표현식: `service:event-query OR terminator`
- 범위 표현식: `duration:>200ms`

**참고**: 숫자 값은 `<`, `>`, `<=`, `>=` 표현식을 지원합니다.


## 추가 정보{#more-information}

트레이스 보기의 높이 조절 가능한 하단에는 선택한 스팬 및 트레이스 정보가 표시됩니다.

<div class="alert alert-tip">오류가 포함된 트레이스의 경우 트레이스 세부 정보 패널에서 <strong>Bits AI로 조사</strong>를 클릭하여 자동 조사를 시작하세요. Bits AI는 스팬 트리를 탐색하여 요청이 실패한 위치를 식별하고 발견 결과를 관련 로그와 연관시킵니다. 자세한 내용은 <a href="/bits_ai/bits_chat/">Bits Chat</a>을 참조하세요.</div>

스팬 헤더에는 선택한 스팬의 서비스, 작업, 리소스 이름과 지연 시간 정보가 포함되어 있습니다. 이름 배지를 클릭하여 플랫폼의 다른 부분으로 이동하거나 [Trace Explorer][5] 검색 범위를 좁힐 수 있습니다.

{{< img src="tracing/trace_view/span_header.png" alt="스팬 헤더" style="width:90%;">}}

{{< site-region region="ap1,ap2,us3,us5,eu,us,uk1" >}}
스팬이 계측된 서비스에서 데이터베이스, 대기열 또는 타사 서비스로의 클라이언트 호출을 나타내는 경우 스팬 헤더에는 서비스와 추론된 엔터티가 표시됩니다.

{{< img src="tracing/trace_view/span_header_inferred.png" alt="추론된 스팬 헤더" style="width:90%;">}}
{{< /site-region >}}

{{< tabs >}}
{{% tab "스팬 정보" %}} 

사용자 지정 태그를 포함해 스팬 메타데이터를 모두 확인하세요. 스팬 태그를 클릭하여 Trace Explorer의 검색 쿼리를 업데이트하거나 태그 값을 클립보드에 복사할 수 있습니다.

기타 정보는 다양한 조건에 따라 표시될 수 있습니다.
- 오류 메시지 및 스택 트레이스(오류 스팬의 경우)
- SQL 쿼리 마크업(데이터베이스 스팬의 경우)
- RUM 컨텍스트 및 메타데이터(RUM 스팬의 경우)
- Spark 메트릭(Spark 작업 스팬의 경우)
- Git 경고 메시지(CI 테스트에서 Git 정보가 누락된 경우)

{{< img src="tracing/trace_view/info_tab.png" alt="스팬 정보 탭" style="width:90%;">}}

{{< site-region region="ap1,ap2,us3,us5,eu,us,uk1" >}}
서비스 이름이 기본 서비스 이름에서 재정의된 경우 정보 섹션 상단에 다음이 표시됩니다.
- {{< ui >}}[Base service][2]{{< /ui >}}: `@base_service` 속성으로 식별되는, 스팬을 생성한 서비스.
- {{< ui >}}[Service override][3]{{< /ui >}}: 기본 서비스 이름과 다른 서비스 이름으로, Datadog 통합에서 자동 설정되거나 프로그래밍 방식 API를 통해 변경된 값. 서비스 재정의는 `service` 예약된 속성으로 식별됩니다.
- {{< ui >}}[Inferred service][4]{{< /ui >}} (_해당되는 경우_): 기본 서비스가 호출하는 추론된 엔터티의 이름([피어 속성][5] 중 하나로 식별됨).

{{< img src="tracing/trace_view/base_override_inferred_service.png" alt="기본, 재정의 및 추론 서비스" style="width:80%;">}}

[2]: /ko/tracing/guide/service_overrides#base-service
[3]: /ko/tracing/guide/service_overrides
[4]: /ko/tracing/services/inferred_services
[5]: /ko/tracing/services/inferred_services#peer-tags
{{< /site-region >}}

[1]: /ko/tracing/glossary/#trace
{{% /tab %}}
{{% tab "인프라" %}}

선택한 스팬에 대해 호스트 수준과 컨테이너 수준(사용 가능한 경우)의 인프라 정보 간에 전환할 수 있습니다.

관련 태그와 CPU, 메모리, I/O를 포함한 주요 호스트/컨테이너 메트릭 그래프를 트레이스가 발생한 시점의 오버레이와 함께 살펴볼 수 있습니다.

{{< img src="tracing/trace_view/infrastructure_tab.png" alt="인프라 탭" style="width:90%;">}}

{{% /tab %}}
{{% tab "로그" %}}

트레이스 발생 시점의 서비스 관련 로그를 살펴볼 수 있습니다. 로그 위로 마우스를 가져가면 트레이스 플레임 그래프에 해당 로그의 타임스탬프를 나타내는 선이 표시됩니다. 로그를 클릭하면 [Log Explorer 검색][1]으로 이동합니다.

{{< img src="tracing/connect_logs_and_traces/logs-trace-correlation.png" alt="트레이스의 로그" style="width:100%;">}}


[1]: /ko/logs/explorer/search/
{{% /tab %}}
{{% tab "프로세스" %}}

서비스의 스팬을 클릭하면 해당 서비스의 기본 인프라에서 실행 중인 프로세스를 볼 수 있습니다. 서비스의 스팬 프로세스는 요청 시점에 서비스가 실행되는 호스트 또는 포드와 연관되어 있습니다. CPU 및 RSS 메모리와 같은 프로세스 메트릭을 코드 수준의 오류와 함께 분석하면 문제가 애플리케이션 자체에 있는지, 아니면 더 광범위한 인프라 문제인지 구분할 수 있습니다. 프로세스를 클릭하여 [Live Processes 페이지][1]로 이동합니다. 스팬별 프로세스를 조회하려면 [프로세스 수집][2]을 활성화합니다. 관련 프로세스는 현재 서버리스 및 브라우저 트레이스에서는 지원되지 않습니다. 

{{< img src="tracing/trace_view/processes_tab.png" alt="프로세스 탭" style="width:90%;">}}

[1]: https://docs.datadoghq.com/ko/infrastructure/process/?tab=linuxwindows
[2]: https://docs.datadoghq.com/ko/infrastructure/process/?tab=linuxwindows#installation
{{% /tab %}}

{{% tab "네트워크" %}}

서비스의 스팬을 클릭하여 요청을 수행하는 서비스의 네트워크 종속성을 확인할 수 있습니다. 볼륨, 오류(TCP 재전송), 네트워크 지연 시간(TCP 왕복 시간)과 같은 주요 네트워크 성능 메트릭을 사용하여, 특히 코드 오류가 생성되지 않았을 때 애플리케이션 관련 문제와 네트워크 전체 문제를 구분할 수 있습니다. 예를 들어, 네트워크 텔레메트리를 사용하여 긴 요청 지연 시간이 관련 애플리케이션의 트래픽 과부하 때문인지, 아니면 다운스트림 포드, 보안 그룹 또는 기타 태그가 지정된 엔드포인트와의 잘못된 종속성 때문인지 확인할 수 있습니다. 프로세스를 클릭하면 [Network Analytics][1] 페이지로 이동합니다. 스팬별 프로세스를 조회하려면 [Cloud Network Monitoring][2]을 활성화합니다.

**참고**: 현재, 관련 네트워크 텔레메트리는 서버리스 트레이스에는 지원되지 않습니다.

{{< img src="tracing/trace_view/network_tab.png" alt="네트워크 탭" style="width:90%;">}}

[1]: /ko/network_monitoring/performance/network_analytics
[2]: /ko/network_monitoring/performance/setup
{{% /tab %}}

{{% tab "보안" %}}

분산 트레이스의 서비스를 대상으로 하는 공격 시도를 확인할 수 있습니다. 공격자가 사용한 패턴, 공격을 탐지한 규칙, 공격자가 서비스에서 취약성을 발견했는지 여부를 확인할 수 있습니다.

{{< ui >}}View in AAP{{< /ui >}}를 클릭하면 [Datadog App and API Protection][1]을 사용하여 자세히 조사할 수 있습니다.

{{< img src="tracing/trace_view/security_tab.png" alt="보안 탭" style="width:90%;">}}

[1]: /ko/security/application_security/how-it-works/
{{% /tab %}}
{{% tab "프로필" %}}

[프로필][1]을 조회하여 성능 문제와 관련된 코드 라인을 식별할 수 있습니다. 왼쪽 값은 선택한 스팬 동안 각 메서드 호출에 소요된 시간을 나타냅니다.

{{< img src="profiler/profiles_tab.png" alt="선택한 스팬의 각 메서드에서 소요된 시간을 보여주는 프로필 탭" style="width:90%;">}}

[1]: /ko/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces

{{% /tab %}}
{{% tab "스팬 링크" %}}

[스팬 링크][4]는 인과 관계가 있지만 일반적인 상위-하위 관계가 없는 하나 이상의 스팬을 상호 연관시킵니다.

플레임 그래프에서 스팬을 클릭하여 스팬 링크와 연결된 스팬을 표시할 수 있습니다.

{{< img src="tracing/span_links/span_links_tab_2.png" alt="스팬 링크 탭" style="width:90%;">}}

**참고**: 스팬 링크는 [보존 필터][1] 등을 사용하여 해당 스팬이 수집 및 인덱싱된 경우에만 표시됩니다.

스팬 링크에 대한 자세한 내용과 사용자 지정 계측을 통해 스팬 링크를 추가하는 방법은 [스팬 링크][4]를 참조하세요.

[1]: /ko/tracing/trace_pipeline/trace_retention/
[2]: /ko/tracing/trace_collection/custom_instrumentation/php#adding-span-links-beta
[3]: /ko/tracing/trace_collection/otel_instrumentation/java#requirements-and-limitations
[4]: /ko/tracing/trace_collection/span_links/

{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/glossary/#trace
[2]: /ko/tracing/glossary/#spans
[3]: /ko/tracing/glossary/#services
[4]: /ko/tracing/glossary/#resources
[5]: /ko/tracing/trace_explorer
[6]: /ko/glossary/#service-entry-span