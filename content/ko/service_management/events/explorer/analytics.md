---
kind: 설명서
title: 분석
---

## 개요

이벤트 애널리틱스는 트러블슈팅 및 모니터링을 위한 보기, 데이터 집계 및 그룹화 기능으로 이벤트 익스플로러 페이지를 확장합니다. 사용자는 다음을 관리할 수 있습니다.

- 분석할 보기 세트를 필터링하는 쿼리.
- 데이터를 그룹화할 범위.
- 집계 및 그룹에 대한 시각화 방법.

애널리틱스 시각화 기능을 내보내 대시보드 또는 노트북에서 위젯을 생성할 수 있습니다.

### 애널리틱스 쿼리 빌드

쿼리를 사용하여 Events Analytics에 표시되는 내용을 관리합니다.

1. 그래프화할 속성 또는 태그를 선택한 뒤 이를 패싯으로 추가합니다. 패싯을 그래프화하면 변수의 고유 카운트 값이 표시됩니다.
    {{< img src="service_management/events/explorer/facet-to-graph.png" alt="그래프화할 수 있는 패싯 목록을 표시" style="width:100%;" >}}
2. 패싯을 사용하여 그래프를 그룹화합니다. 여기에서 속성을 사용하려면 속성을 패싯으로 추가해야 합니다.
    {{< img src="service_management/events/explorer/split-graph.png" alt="데이터를 그룹화할 수 있는 패싯 목록을 표시" style="width:100%;" >}}
3. 그래프의 시간 간격을 선택합니다. 글로벌 시간 프레임을 변경하면 사용 가능한 타임스텝 값 목록이 변경됩니다. 그 결과를 시계열, 테이블 또는 상위 목록으로 표시할 수 있습니다.
    {{< img src="service_management/events/explorer/time-interval.png" alt="기본값인 5초를 포함해 가능한 시간 간격 목록을 표시" style="width:100%;" >}}
4. 선택된 측정값에 따라 상위 또는 하위 값을 표시하도록 선택합니다.
    {{< img src="service_management/events/explorer/display-values.png" alt="값을 상단 혹은 하단에 표시할지 선택" style="width:100%;" >}}