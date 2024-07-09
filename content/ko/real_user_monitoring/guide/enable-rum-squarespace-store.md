---
further_reading:
- link: /real_user_monitoring/guide/rum-for-product-analytics/
  tag: 설명서
  text: 제품 분석을 위해 RUM 및 세션 재생 사용
- link: /real_user_monitoring/guide/alerting-with-conversion-rates/
  tag: 설명서
  text: 전환율로 알림
title: Squarespace 스토어에서 RUM 활성화
---

## 개요

고객이 웹 페이지와 상호 작용하는 방식을 이해하는 것은 온라인 스토어의 성공에 매우 중요합니다.

이 가이드는 Squarespace 기반 스토어에서 실제 사용자 모니터링(RUM)을 설정하는 방법을 안내합니다.

## 설정

1. Squarespace 관리 패널에 로그인하고 **Settings**을 클릭합니다.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-1.png" alt="Squarespace 스토어에서 RUM 활성화" style="width:30%;">}}

2. **Settings**에서 **Advanced**를 클릭합니다.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-2.png" alt="Squarespace 스토어에서 RUM 활성화" style="width:30%;">}}

3. 열린 메뉴에서 **Code Injection**을 클릭합니다.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-3.png" alt="Squarespace 스토어에서 RUM 활성화" style="width:30%;">}}

4. **Header** 섹션 내에 SDK 코드 스니펫을 추가하여 Browser RUM SDK를 초기화합니다. [RUM Browser Monitoring 문서][1]에서 어떤 설치 방법을 선택할지에 대한 자세한 내용을 확인하세요.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-4.png" alt="Squarespace 스토어에서 RUM 활성화" >}}

5. 변경 사항을 저장하기 위해 **Save** 버튼을 클릭합니다.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-5.png" alt="Squarespace 스토어에서 RUM 활성화" style="width:50%;">}}

[Squarespace 문서][2]에서 코드 삽입에 관한 자세한 내용을 참조하세요.

## 탐색 시작

RUM Browser SDK를 초기화한 후 Squarespace 스토어에서 실제 사용자 모니터링(RUM)을 사용할 수 있습니다.

예를 들어 다음을 수행할 수 있습니다:

- 스토어 개선을 위한 데이터 기반의 결정을 함으로써
고객 행동에 대한 인사이트를 확보할 수 있습니다.
- [세션 재생][3]으로 브라우저 녹화 기능이 강화된 세션을 시청하여 전환율을 높입니다.
- [퍼널 분석][4]을 사용하여 고객 여정을 더 잘 이해하거나
- 새로 캡처된 세션에서 [메트릭을 생성][5]합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/browser/setup/#choose-the-right-installation-method/
[2]: https://support.squarespace.com/hc/en-us/articles/205815908-Using-code-injection
[3]: /ko/real_user_monitoring/session_replay/browser/
[4]: /ko/product_analytics/journeys/funnel_analysis/
[5]: /ko/real_user_monitoring/generate_metrics/