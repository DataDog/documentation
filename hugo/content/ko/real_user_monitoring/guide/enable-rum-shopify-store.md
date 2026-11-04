---
description: Shopify 스토어에서 RUM 모니터링을 설정하여 전자상거래 최적화를 위해 고객 상호 작용, 성능 및 전환율을 추적합니다.
further_reading:
- link: /real_user_monitoring/guide/rum-for-product-analytics/
  tag: 설명서
  text: Product Analytics를 위해 RUM 및 Session Replay 사용
- link: /real_user_monitoring/guide/alerting-with-conversion-rates/
  tag: 설명서
  text: 전환율로 알림
private: true
title: Shopify 스토어에서 RUM 활성화
---
<div class="alert alert-danger">
<a href="https://www.shopify.com/plus/upgrading-to-checkout-extensibility">Shopify의 체크아웃 확장성</a>은 RUM 추적에서 지원되지 않습니다. 이 기능이 비즈니스 요구 사항에 필수적인 경우 <a href="https://docs.datadoghq.com/help/">Datadog 지원팀</a>에 티켓을 생성하세요.
</div>

## 개요 {#overview}

고객이 웹 페이지와 상호 작용하는 방식을 이해하는 것은 온라인 스토어의 성공에 매우 중요합니다.

이 가이드는 Shopify 기반 스토어에서 Real User Monitoring(RUM)을 설정하는 방법을 안내합니다.

## 설정 {#setup}

1. Shopify 관리 패널에 로그인합니다.
2. {{< ui >}}Sales channels{{< /ui >}} 아래에서 {{< ui >}}Online Store{{< /ui >}}를 클릭합니다.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-1.png" alt="Shopify 스토어에서 RUM 활성화" style="width:30%;">}}

3. 새 메뉴가 열리면 {{< ui >}}Themes{{< /ui >}}를 클릭합니다.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-2.png" alt="Shopify 스토어에서 RUM 활성화" style="width:30%;">}}

4. 현재 테마의 {{< ui >}}Edit code{{< /ui >}} 버튼을 클릭합니다.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-3.png" alt="Shopify 스토어에서 RUM 활성화" >}}

5. {{< ui >}}Layout{{< /ui >}} 디렉터리에서 테마의 기본 파일인 `theme.liquid`를 찾습니다. 파일을 클릭하여 편집합니다.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-4.png" alt="Shopify 스토어에서 RUM 활성화" style="width:30%;">}}

6. `<head>` 태그 안에 SDK 코드 스니펫을 추가하여 Browser RUM SDK를 초기화합니다. 어떤 설치 방법을 선택할지에 대한 자세한 내용은 [RUM 브라우저 모니터링 문서][1]를 참조하세요.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-5.png" alt="Shopify 스토어에서 RUM 활성화" >}}

7. 변경 사항을 저장하려면 {{< ui >}}Save{{< /ui >}} 버튼을 클릭합니다.

업데이트된 내용은 Shopify UI에서 다음과 같습니다.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-6.png" alt="Shopify 스토어에서 RUM 활성화" style="width:50%;">}}

[Shopify 설명서][2]에서 테마 코드 편집에 대한 자세한 내용을 참조하세요.

## 탐색 시작 {#start-exploring}

Browser RUM SDK를 초기화하고 나면 Shopify 스토어에서 Real User Monitoring(RUM)을 사용할 수 있습니다.

예를 들어 다음을 수행할 수 있습니다.

- 다음 방법을 통해 고객 행동에 대한 유용한 인사이트를 얻으세요.
고객 행동에 대한 인사이트를 확보할 수 있습니다.
- [Session Replay][3]를 통해 브라우저 녹화가 추가된 세션을 시청하여 전환율을 높이세요.
- 새로 캡처된 세션에서 [메트릭을 생성하세요][5].

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/application_monitoring/browser/setup/#choose-the-right-installation-method/
[2]: https://help.shopify.com/en/manual/online-store/themes/theme-structure/extend/edit-theme-code
[3]: /ko/session_replay/
[5]: /ko/real_user_monitoring/platform/generate_metrics/