---
aliases:
- /ko/video-categories/flamegraph/
description: 가장 많이 사용되는 코드 줄(CPU, 메모리 등)과 관련한 세부 정보를 그래프로 표시합니다.
further_reading:
- link: /profiler/profile_visualizations/
  tag: 설명서
  text: 프로파일 시각화에 대해 알아보기
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
title: 프로파일링 플레임 그래프 위젯
widget_type: flame_graph
---

## 개요

{{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph.png" alt="프로파일링 플레임 그래프" >}}

[프로파일링 플레임 그래프 시각화][1]는 CPU 및 메모리와 같이 가장 많이 사용되는 코드 줄의 세부 정보를 보여줍니다. 이 위젯을 추가하면 프로파일링된 애플리케이션의 스택 트레이스를 시각화하고 빈번한 리소스 요청을 정확하게 파악할 수 있습니다.

## 설정

 {{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph_config.png" alt="프로파일링 플레임 그래프 위젯 설정에서 데이터 섹션을 그래프로 표시합니다." style="width:100%;" >}}

### 구성

1. 태그를 사용하여 프로파일링 데이터 범위를 지정합니다. 예: `host`, `container_name`, `service`, `env`, `version`.
2. **Show** 옆에 있는 드롭다운 메뉴를 클릭해 리소스를 선택합니다. 옵션으로는 `CPU Time`, `Allocated Memory`, `Thrown Exceptions`가 있습니다.
3. **by** 및 **for** 옆에 있는 드롭다운 메뉴를 클릭하여 각각 프레임 세분화 수준과 코드 출처를 선택합니다.
4. 그래프에 타이틀을 지정하거나, 제안된 타이틀 상자를 공란으로 두세요.
5. **Save**을 클릭합니다.

### 옵션

#### 고급 옵션 및 필터링

세 개의 점으로 된 줄임표를 클릭하여 고급 옵션을 열고 색상 및 해상도를 지정합니다.

플레임 그래프를 사용자 지정합니다. *Filter flame graph* 필드에 그래프 작업이나 필터를 추가합니다.

#### 엔드포인트 범위

총 소비량(`per Minute by Endpoint`) 또는 요청당 소비량(`per Endpoint Call`)을 보기 위해 특정 엔드포인트로 필터링합니다.

#### 함수 범위

다른 기준(예: `Method`, `Package`, `Thread name`, `Trace Operation`)으로 필터링합니다.

#### 글로벌 시간

위젯이 커스텀 타임프레임을 사용하는지 또는 대시보드의 글로벌 타임프레임을 사용하는지 선택합니다.

## API

이 위젯은 **[대시보드 API][2]**와 함께 사용할 수 있습니다. [위젯 JSON 스키마 정의][3]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/profiler/profile_visualizations/#flame-graph
[2]: /ko/api/latest/dashboards/
[3]: /ko/dashboards/graphing_json/widget_json/