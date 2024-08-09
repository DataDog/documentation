---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: 설명서
  text: 이벤트 검색
title: 이벤트 사이드 패널
---

## 개요

실제 사용자 모니터링(RUM) 탐색기에는 이 사이드 패널 형식이 포함된 개별 이벤트가 표시됩니다:

{{< img src="real_user_monitoring/explorer/events/performance_side_panel.png" alt="성능 탭의 애플리케이션 성능 그래프 및 코어 웹 바이탈" width="80%" >}}

일반적인 컨텍스트 정보는 상단에 제공되며, 워터폴 쪽으로 스크롤하면 이벤트의 실제 내용을 볼 수 있습니다.

이벤트가 생성될 때 OS, 국가, 코드 버전 등을 포함한 사용자 및 애플리케이션에 대한 컨텍스트가 캡처됩니다. 컨텍스트는 이벤트 유형과 관련된 정보를 포함하는 이벤트 자체를 의미하기도 합니다. 예를 들어, 이벤트 사이드 패널에는 보기 경로가 표시되고 **Errors** 사이드 패널에는 오류 메시지가 표시됩니다.

## 이벤트 사이드 패널

[RUM 탐색기][1]에서 이벤트 사이드 패널을 열려면 **List** 시각화 유형에서 테이블 행을 클릭합니다. 또는 **Show related events**를 클릭한 후 표시되는 사이드 패널 목록을 클릭합니다.

이벤트 사이드 패널에는 RUM 이벤트와 관련된 모든 정보가 표시됩니다. 워터폴에는 관련 리소스, 오류, 보기 및 액션이 표시되며, 오류를 유발하거나 과도한 로딩 시간이 발생하는 이벤트를 타임라인 형식(보기 미니맵)으로 시각화합니다.

워터폴에서 시간 선택기를 끌어다 놓아 시간 스팬을 확대하고 관심 있는 이벤트에 집중할 수도 있습니다.

{{< img src="real_user_monitoring/explorer/events/events_side_panel-1.mp4" alt="이벤트 타이밍 및 모바일 바이탈" video="true" width="80%" >}}

## 속성

RUM은 기본적으로 컨텍스트 정보를 수집합니다. [Global Context API][2]를 사용하여 추가적인 컨텍스트 속성을 추가할 수도 있습니다.

{{< img src="real_user_monitoring/explorer/events/attributes.png" alt="Attribute 탭" width="80%" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/explorer
[2]: /ko/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#global-context