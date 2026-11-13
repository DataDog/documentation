---
aliases:
- /ko/video-categories/flamegraph/
description: 프로파일링된 코드 경로 전반의 리소스 소비를 시각화하세요.
further_reading:
- link: /profiler/profile_visualizations/
  tag: 설명서
  text: 프로파일 시각화에 대해 알아보기
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축하기
title: 프로파일링 플레임 그래프 위젯
widget_type: flame_graph
---
## 개요 {#overview}

{{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph_2.png" alt="프로파일링 플레임 그래프" >}}

[프로파일링 플레임 그래프][1]는 Continuous Profiler에서 수집한 스택 추적을 시각화합니다. 각 프레임은 메서드나 라인과 같은 코드 단위를 나타냅니다. 프레임의 너비는 선택한 프로필 메트릭의 점유율을 나타내며, 다음 행의 프레임은 위쪽 프레임이 호출한 코드를 나타냅니다. 위젯을 사용하여 프로파일링된 애플리케이션 전반에서 리소스 집약적인 코드 경로를 식별하세요.

## 설정 {#setup}
 
 {{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph_config_2.png" alt="프로파일링 플레임 그래프 위젯 구성의 Graph your data 섹션" style="width:100%;" >}}

### 데이터 그래프화 {#graph-your-data}

1. 검색 필드에서 태그를 사용하여 프로파일링 데이터의 범위를 설정합니다. 예: `host`, `container_name`, `service`, `env` 또는 `version`.
2. {{< ui >}}Show{{< /ui >}} 메뉴에서 프로필 유형을 선택합니다. [사용 가능한 프로필 유형][2]은 언어에 따라 다릅니다.
3. {{< ui >}}by{{< /ui >}} 메뉴에서 메서드나 라인과 같은 프레임 세분성을 선택합니다.
4. {{< ui >}}color by{{< /ui >}} 및 {{< ui >}}sort{{< /ui >}} 메뉴를 사용하여 프레임의 음영 처리 및 정렬 방식을 선택합니다.
5. 범위 섹션을 사용하여 플레임 그래프를 세분화합니다.
   - {{< ui >}}Scope to methods{{< /ui >}}: 포함할 메서드를 선택합니다. 이 섹션의 이름은 {{< ui >}}by{{< /ui >}} 메뉴에서 선택한 세분성에 따라 변경됩니다.
   - {{< ui >}}Scope to endpoints{{< /ui >}}: 특정 엔드포인트로 필터링합니다. `per Minute by Endpoint`를 선택하여 총 리소스 소비를 조회하거나 `per Endpoint Call`을 선택하여 요청당 리소스 소비를 조회합니다.

### 시간 기본 설정 지정하기 {#set-time-preferences}

대시보드의 시간 범위를 사용하려면 {{< ui >}}Global dashboard time{{< /ui >}}을 선택하고, 위젯의 시간 범위를 설정하려면 {{< ui >}}Custom time{{< /ui >}}을 선택하세요.

**참고**: 위젯이 고정된 {{< ui >}}Custom time{{< /ui >}} 범위를 사용하는 경우 Notebooks 는 플레임 그래프 데이터를 1년 동안 보관합니다. 위젯을 생성할 때 범위는 [8일 프로파일링 데이터 보존 기간][5] 내에 있어야 합니다.

### 제목 및 설명 추가하기 {#add-a-title-and-description}

그래프에 타이틀을 지정하거나, 제안된 타이틀 상자를 공란으로 두세요. 선택 사항으로 설명을 추가할 수도 있습니다. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

## 위젯과 상호 작용 {#interact-with-the-widget}

프레임 위로 마우스를 가져가면 프로필 값을 조회합니다. 프레임을 선택하여 해당 코드 경로에 집중합니다. 프로필을 더 자세히 조사하려면 플레임 그래프 오른쪽 상단 모서리에 있는 전체 페이지에서 열기 아이콘을 클릭합니다.

## API {#api}

이 위젯은 **[Dashboards API][3]**와 함께 사용할 수 있습니다. [위젯 JSON 스키마 정의][4]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/profiler/profile_visualizations/#flame-graph
[2]: /ko/profiler/profile_types/
[3]: /ko/api/latest/dashboards/
[4]: /ko/dashboards/graphing_json/widget_json/
[5]: /ko/data_security/data_retention_periods/