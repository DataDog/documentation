---
description: RUM 이벤트에 알림을 생성하는 방법을 안내합니다.
further_reading:
- link: /real_user_monitoring/platform/dashboards/
  tag: 설명서
  text: RUM 대시보드
- link: /monitors/create/types/real_user_monitoring/
  tag: 설명서
  text: RUM 모니터
- link: /monitors/
  tag: 설명서
  text: 경고
kind: 가이드
title: RUM 데이터 알림 생성하기
---

## 개요

실시간 사용자 모니터링을 사용하면 애플리케이션의 비정상적 동작을 알려주는 알림을 생성할 수 있습니다. 복잡한 조건, 사전 정의된 임계값, 평균값과 비율을 계산하는 여러 쿼리, 성능 표시기 메트릭(예: Apdex)을 적용한 RUM 모니터를 생성할 수 있습니다.

## 검색 쿼리 정의

RUM 모니터를 생성하려면 먼저 [RUM 모니터 설명서][1]를 살펴보세요. [RUM Explorer][2]에서 RUM 데이터에 여러 필터를 추가할 수 있습니다. 애플리케이션 수준이나 그보다 더 세부적인 수준인 특정 페이지 수준 등 각 쿼리의 범위를 지정할 수 있습니다.

[커스텀 패싯과 측정치][3]를 포함해 RUM이 수집하는 패싯이라면 어떤 것이든 사용할 수 있습니다. 로드 시간, 소비한 시간, 오류 수와 같은 보기 관련 측정치를 보려면 `measure by` 필드를 사용하세요.

{{< img src="real_user_monitoring/guide/alerting-with-rum/high-rum-views-errors.png" alt="보기에 오류 수가 8개가 넘으면 알림을 전송하는 검색 쿼리" style="width:100%;">}}

위 예시는 Shopist iOS 애플리케이션에서 설정된 RUM 모니터의 검색 쿼리로, `Application ID`와 `View Path`와 같은 패싯이 사용되었습니다. 이 예시 모니터의 경우 보기에 오류 수가 많을 경우(예: 8개) 알림을 전송합니다.

## 쿼리를 모니터로 내보내기

쿼리 컨텍스트를 유지하고 싶을 경우 [Rum Explorer][2]에서 모니터로 검색 쿼리를 내보낼 수 있습니다.

{{< img src="real_user_monitoring/guide/alerting-with-rum/export-to-monitor-3.mp4" alt="RUM Explorer 오른쪽 코너에 있는 내보내기 버튼" video="true" style="width:100%;" >}}

위 검색 쿼리 예시에서는 이미지가 1Mb보다 클 경우를 보여주도록 RUM 모니터를 구성했습니다. 이미지 규모가 크면 애플리케이션의 성능이 떨어질 수 있습니다.

**Export** 버튼을 눌러 검색 쿼리를 사전 정의된 RUM 모니터로 내보낼 수 있습니다. 자세한 정보는 [RUM 이벤트 내보내기][4]를 참고하세요.

## 알림 라우팅하기

알림을 생성한 뒤에는 메시지를 쓰고 테스트 알림을 보내 알림을 개인이나 팀 채널로 라우팅할 수 있습니다. 자세한 정보는 [알림][5]을 참고하세요.

## 알림 예시

다음은 RUM 데이터 알림 사용 사례이니 참고하세요.

### 수익 저하

RUM [글로벌 컨텍스트][6]를 사용하면 각 사용자의 구매량과 같은 사업 특정 속성을 사용해 RUM 이벤트를 강화할 수 있습니다.

이 예시 애플리케이션에서는 사용자가 보통 $800~$1000을 사용한다고 가정하겠습니다. 이 예시 RUM 모니터는 사용자의 주별 소비 패턴의 변화를 보여주도록 구성되었습니다.

{{< img src="real_user_monitoring/guide/alerting-with-rum/revenue-dips-example-monitor.png" alt="수익 저하를 보여주는 RUM 모니터" style="width:100%;" >}}

이번 주 구매량을 저번 주 구매량과 비교하려면 `roll up every` 필드 옆에 `week_before`와 같은 함수를 추가합니다. 또 절대 값을 적용해 저번 주와 이번 주의 구매량 차이를 계산할 수도 있습니다. 전주 대비 증감률이 $50을 초과하면 알림을 보냅니다.

{{< img src="real_user_monitoring/guide/alerting-with-rum/revenue-dips-example-alerting-conditions.png" alt="수익 저하를 보여주는 RUM 모니터의 알림 조건" style="width:100%;" >}}

### 오류율

요청 대비 오류율은 요청 실패 비율을 계산해 줍니다.

이 예시에서는 샘플 애플리케이션인 Shop.ist에서 `/cart` 페이지의 오류율을 나타내는 RUM 모니터를 보여줍니다.

{{< img src="real_user_monitoring/guide/alerting-with-rum/error-rate-example-monitor.png" alt="오류율을 보여주는 RUM 모니터" style="width:100%;" >}}

### 성능 활력 징후

실시간 사용자 모니터링은 [Core Web Vitals][7]와 [Mobile Vitals][8]로 애플리케이션의 성능을 측정하고, 계산하고, 점수를 매깁니다. 예를 들어 LCP(Largest Contentful Paint)의 경우 로딩 성능을 측정하고 페이지가 로딩되기 시작할 때 2.5초를 벤치마킹합니다.

이 예시에서는 샘플 애플리케이션인 Shop.ist에서 `/cart` 페이지의 LCP를 나타내는 RUM 모니터를 보여줍니다.

{{< img src="real_user_monitoring/guide/alerting-with-rum/high-largest-contentful-paint-example-monitor.png" alt="LCP(Largest Contentful Paint)를 보여주는 RUM 모니터" style="width:100%;" >}}

이 예시 모니터의 경우 LCP가 로딩되는데 2초가 걸리면 경고 상태로 변하고 2.5초보다 더 걸리면 경보 상태가 됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/types/real_user_monitoring/#create-a-rum-monitor
[2]: https://app.datadoghq.com/rum/explorer
[3]: /ko/real_user_monitoring/guide/send-rum-custom-actions/#create-facets-and-measures-on-attributes
[4]: /ko/real_user_monitoring/explorer/export/
[5]: /ko/monitors/notify/
[6]: /ko/real_user_monitoring/browser/advanced_configuration/?tab=npm#global-context
[7]: /ko/real_user_monitoring/browser/monitoring_page_performance/#all-performance-metrics
[8]: /ko/real_user_monitoring/android/mobile_vitals/