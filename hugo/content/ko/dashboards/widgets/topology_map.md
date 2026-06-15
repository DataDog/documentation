---
aliases:
- /ko/dashboards/widgets/service_map
description: 서비스를 호출하는 모든 서비스에 대한 서비스 맵과 해당 서비스가 호출하는 모든 서비스를 표시합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
- link: /tracing/services/services_map/
  tag: 설명서
  text: 서비스 맵
title: 토폴로지 맵 위젯
widget_type: topology_map
---

토폴로지 맵 위젯은 데이터 소스와 그 관계를 시각화하여 아키텍처를 통한 데이터 플로우를 파악하도록 도와드립니다.

## 설정

### 설정

1. 그래프화할 데이터를 선택합니다.
    * 서비스 맵: 위젯의 중앙에 위치한 노드는 매핑된 서비스를 나타냅니다. 매핑된 서비스를 호출하는 서비스는 호출자로부터 서비스까지를 화살표로 표시합니다. 서비스 맵에 대해 자세히 알아보려면 [애플리케이션 성능 모니터링(APM)의 서비스 맵 기능][1]을 참조하세요.

2. Enter a title for your graph.

## API

이 위젯은 **[대시보드 API][2]**와 함께 사용할 수 있습니다. [위젯 JSON 스키마 정의][3]에 대한 다음 표를 참조하세요.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/services/services_map/
[2]: /ko/api/latest/dashboards/
[3]: /ko/dashboards/graphing_json/widget_json/