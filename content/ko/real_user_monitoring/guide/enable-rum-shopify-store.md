---
further_reading:
- link: /real_user_monitoring/guide/rum-for-product-analytics/
  tag: 설명서
  text: 제품 분석을 위해 RUM 및 세션 재생 사용
- link: /real_user_monitoring/guide/alerting-with-conversion-rates/
  tag: 설명서
  text: 전환율로 알림
title: Shopify 스토어에서 RUM 활성화
---

## 개요

고객이 웹 페이지와 상호 작용하는 방식을 이해하는 것은 온라인 스토어의 성공에 매우 중요합니다.

이 가이드는 Shopify 기반 스토어에서 실제 사용자 모니터링(RUM)을 설정하는 방법을 안내합니다.

## 설정

1. Shopify 관리 패널에 로그인합니다.
2. **Sales channels**에서 **Online Store**을 클릭합니다.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-1.png" alt="Shopify 스토어에서 RUM 활성화" style="width:30%;">}}

3. 새 메뉴가 열리면 **Themes**를 클릭합니다.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-2.png" alt="Shopify 스토어에서 RUM 활성화" style="width:30%;">}}

4. 현재 테마에 대한 **Edit code** 버튼을 클릭합니다.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-3.png" alt="Shopify 스토어에서 RUM 활성화" >}}

5. **Layout** 디렉토리에서 테마 **theme.liquid**의 기본 파일을 찾은 후 클릭하여 편집합니다.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-4.png" alt="Shopify 스토어에서 RUM 활성화" style="width:30%;">}}

6. `<head>` 태그 내부에 SDK 코드 스니펫을 추가하여 Browser RUM SDK를 초기화합니다. 어떤 설치 방법을 선택할지에 대한 자세한 내용은 [RUM Browser Monitoring 문서][1]를 참조하세요.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-5.png" alt="Shopify 스토어에서 RUM 활성화" >}}

7. 변경 사항을 저장하기 위해 **Save** 버튼을 클릭합니다.

업데이트된 내용은 Shopify UI에서 다음과 같습니다.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-6.png" alt="Shopify 스토어에서 RUM 활성화" style="width:50%;">}}

[Shopify 설명서][2]에서 테마 코드 편집에 대한 자세한 내용을 참조하세요.

## 탐색 시작

Browser RUM SDK를 초기화하고 나면 Shopify 스토어에서 실제 사용자 모니터링(RUM)을 사용할 수 있습니다.

예를 들어 다음을 수행할 수 있습니다:

- 스토어 개선을 위해 데이터 기반의 결정을 함으로써
고객 행동에 대한 인사이트를 확보할 수 있습니다.
- [세션 재생][3]을 통해 브라우저 녹화본을 시청하고 전환율을 높입니다.
- [퍼널 분석][4]을 사용하여 고객 여정을 더 잘 이해하거나
- 새로 캡처된 세션에서 [메트릭을 생성][5]합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/browser/setup/#choose-the-right-installation-method/
[2]: https://help.shopify.com/en/manual/online-store/themes/theme-structure/extend/edit-theme-code
[3]: /ko/real_user_monitoring/session_replay/browser/
[4]: /ko/product_analytics/journeys/funnel_analysis
[5]: /ko/real_user_monitoring/platform/generate_metrics/