---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: 설명서
  text: 이벤트 검색
title: 이벤트 사이드 패널
---

## 개요

Product Analytics Explorer는 개별 이벤트를 사이드 패널 형식으로 표시합니다.

{{< img src="real_user_monitoring/explorer/events/performance_side_panel.png" alt="성능 탭의 애플리케이션 성능 그래프 및 코어 웹 바이탈" width="80%" >}}

일반적인 컨텍스트 정보는 상단에 제공되며, 워터폴 쪽으로 스크롤하면 이벤트의 실제 내용을 볼 수 있습니다.

이벤트가 생성될 때 OS, 국가, 코드 버전 등을 포함한 사용자 및 애플리케이션에 대한 컨텍스트가 캡처됩니다. 컨텍스트는 이벤트 유형과 관련된 정보를 포함하는 이벤트 자체를 의미하기도 합니다. 예를 들어, 이벤트 사이드 패널에는 보기 경로가 표시되고 **Errors** 사이드 패널에는 오류 메시지가 표시됩니다.

## 이벤트 사이드 패널

[Analytics Explorer][1]에서 이벤트 사이드 패널을 열려면 **List** 시각화 유형에서 테이블 행을 클릭합니다. 또는 **Show related events**를 클릭하여 측면 패널 목록을 클릭합니다.

이벤트 측면 패널에는 Product Analytics 이벤트와 관련된 모든 정보가 표시됩니다. 폭포에는 관련 보기와 작업이 표시됩니다.

## 속성

Product Analytics는 기본적으로 컨텍스트를 수집합니다. [Global Context API][2]를 사용하여 추가 컨텍스트 속성을 추가할 수도 있습니다.

{{< img src="real_user_monitoring/explorer/events/attributes.png" alt="Attribute 탭" width="80%" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/explorer
[2]: /ko/real_user_monitoring/browser/advanced_configuration/?tab=npm#global-context