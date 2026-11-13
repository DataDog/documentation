---
aliases:
- /ko/journey_monitoring/map/suggested_journeys/
description: 프런트엔드 애플리케이션의 사용자 활동을 기반으로 추천된 여정을 생성하세요.
further_reading:
- link: /journey_monitoring/
  tag: 문서
  text: Journey Monitoring에 대해 알아보기
- link: /journey_monitoring/map/
  tag: 문서
  text: 지도에 대해 알아보기
- link: /journey_monitoring/configuring_journeys/
  tag: 문서
  text: 여정 구성
title: 추천 여정
---
## 개요 {#overview}

매주 수요일 UTC 기준 자정에 Datadog은 프런트엔드 애플리케이션의 지난 30일간 [페이지 조회 및 클릭][3] 데이터를 분석합니다. Datadog은 이러한 활동을 기반으로 다음 항목이 포함된 추천 여정을 생성합니다.

- 여정 이름
- 여정 설명
- 시작 이벤트
- 종료 이벤트

[지도][1] 또는 [카탈로그][2]에서 추천 여정을 선택하여 [여정 생성 페이지][4]를 여세요. Datadog은 이름, 설명, 시작 이벤트 및 종료 이벤트를 자동으로 채웁니다. 여정을 생성하기 전에 이 필드를 검토하세요.

추천 여정 위로 마우스를 가져가 수락하거나 무시하세요. 추천 여정을 무시하려면 X 아이콘을 클릭하세요. 무시한 추천 항목은 다시 표시되지 않습니다.

<div class="alert alert-warning"><p>조직에서 Applied AI Experiences를 사용하지 않도록 설정했다면 추천 여정이 표시되지 않습니다.</p></div>

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/journey_monitoring/map/
[2]: /ko/journey_monitoring/overview/#journey-catalog
[3]: /ko/product_analytics/data_collected/
[4]: /ko/journey_monitoring/configuring_journeys/#choose-a-creation-method