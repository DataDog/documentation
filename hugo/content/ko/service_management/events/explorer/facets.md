---
further_reading:
- link: service_management/events/explorer/attributes
  tag: 설명서
  text: 예약된 속성에 대해 알아보기
title: 패싯
---

## 개요

기본적으로 Datadog에서는 이벤트 속성을 패싯으로 인덱싱합니다. Event Explorer 패싯 측면 패널, 분석, 모니터에서 패싯에 액세스할 수 있습니다.

패싯에서는 속성 또는 태그의 고유 구성 요소를 표시하고, 표시되는 이벤트의 수와 같이 기본 분석 결과를 제공합니다. 패싯을 사용하면 주어진 속성을 기반으로 데이터세트를 피벗하거나 필터링할 수 있습니다. 필터링하려면 보고 싶은 값을 하나 선택하세요.

{{< img src="service_management/events/explorer/facets-location.png" alt="패싯 측면 패널" style="width:100%;" >}}

### 패싯 생성

패싯을 추가하려면 측면 패널에 있는 **+ Add**를 사용하세요.

패싯을 추가하면 해당 속성의 값이 새로운 보기에 전체에 저장되고, 검색 창 및 패싯 측면 패널에서 사용할 수 있습니다. 이벤트 모니터 및 그래프 위젯에서 그룹화할 때에도 사용할 수 있습니다.

### 예약된 속성
**Host**, **Service**, **Status**는 핵심 이벤트 속성입니다. 서비스, 호스트, 상태 태그에 새 패싯을 생성할 수 없습니다.

Datadog 모니터 이벤트의 경우 이벤트 속성을 설정할 때 이벤트 태그의 알파벳 순서에 따른 첫 이벤트 태그가 설정됩니다. 예를 들어 서비스 태그 `service:bcd; service:ace`이 여럿인 이벤트의 경우 `service:ace`를 사용해 이벤트 속성이 설정됩니다. 

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}