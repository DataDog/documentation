---
disable_toc: false
further_reading:
- link: /real_user_monitoring/browser/
  tag: 설명서
  text: RUM 브라우저 모니터링
title: 브라우저 애플리케이션에서 서비스 정의 및 UI 구성 요소 추적
---

## 개요

RUM은 브라우저 애플리케이션에서 이벤트를 캡처하여 느린 페이지 및 코드 오류를 해결하거나 애플리케이션 사용 현황을 분석할 수 있도록 지원합니다. 캡처된 모든 이벤트는 [RUM Explorer][1]에서 쿼리, 대시보드, 알림 기능을 통해 확인할 수 있습니다.

브라우저 애플리케이션의 사이즈가 크다면 여러 웹 개발팀이 개발했을 가능성이 높습니다. 각 팀은 오류 및 속도 저하 문제 해결, 사용량 분석 등 각각의 전문 영역이 있습니다.

RUM에서 애플리케이션을 정의하는 방법을 알아보고, 대규모 애플리케이션에서 웹 개발 팀이 각 담당 영역의 상태와 사용 현황을 확인해야 하는 사례도 살펴보겠습니다.

## RUM 애플리케이션 생성

브라우저 애플리케이션을 추적하고 분석하는 첫 번째 단계는 [RUM 애플리케이션 생성][2]입니다. RUM 애플리케이션은 특정 도메인에서 사용 가능한 브라우저 애플리케이션을 매핑하여 고객이 웹사이트로 인식하도록 합니다.

## 브라우저 애플리케이션에서 페이지 추적

브라우저 애플리케이션이 단일 페이지 애플리케이션이든 서버 측 렌더링을 사용하는 애플리케이션이든, Browser RUM SDK는 자동으로 경로 변경을 추적하고 모든 경로 변경에 뷰 이벤트를 생성합니다.

- 뷰에는 `@view.url`에서 사용 가능한 **URL**이 있습니다 (예: `https://www.yourwebsite.com/about`).
- 뷰에는 `@view.url_path`에서 사용 가능한 **경로**가 있습니다 (예: `/about`).

예를 들어, 라우트 변경에 따른 자동 페이지뷰 캡처만으로 충분한 확인이 어렵다면 페이지에 다른 이름을 지정할 수 있습니다. 이를 위해 [수동으로 뷰를 추적][3]하고 각 페이지에 "About Us"와 같이 `@view.name`에서 사용 가능한 이름을 지정할 수 있습니다.

## 페이지 렌더링 수명 주기 동안 타이밍 추적

Browser SDK는 업계 표준 타이밍, Core Web Vitals, 페이지 로딩 시간 [등을][4] 자동으로 추적합니다.

또한 이미지나 구성 요소와 같이 페이지의 특정 항목이 렌더링되는 데 걸리는 시간을 추적할 수 있습니다. 코드에서 해당 시간을 캡처한 다음 뷰 이벤트에 값을 붙여넣으면 더 많은 시간을 추적할 수 있습니다. 자세한 내용은 [성능 타이밍 추가하기][5] 문서를 참고하세요.

타이밍이 캡처되면 자동 수집된 타이밍과 마찬가지로 사용할 수 있습니다. 타이밍을 사용하면 다음이 가능합니다.

- RUM Explorer에서 코드 버전별 시간 분포 분석
- [뷰 워터폴][6]에서 발생할 수 있는 높은 값 문제 해결

## 웹 페이지의 구성 요소 추적

브라우저 애플리케이션이 하나의 애플리케이션 및/또는 여러 어플리케이션 전반의 여러 페이지에 걸쳐 존재하는 UI 구성 요소를 사용하는 경우, 커스텀 계측으로 페이지 전반에 걸쳐 해당 구성 요소의 사용 현황과 렌더링 시간을 추적할 수 있습니다.

[커스텀 액션을 생성하여][7] 여러 페이지에서 구성 요소의 수명 주기를 추적합니다. 아래 검색창 구성 요소를 사용하는 `/myorders` 페이지와 `/search` 페이지가 있다고 가정해 보겠습니다.

{{< img src="real_user_monitoring/guide/define-applications-services-components-rum/rum-guide-autofill.jpg" alt="여러 페이지에서 구성 요소의 수명 주기를 추적하기 위한 커스텀 액션 생성" style="width:30%;">}}

커스텀 액션을 매회 전송하여 검색 구성 요소의 수명 주기에서 다음과 같은 주요 지점을 추적할 수 있습니다.

- `search_component_render`: 검색 구성 요소가 렌더링됩니다
- `search_component_input`: 검색 구성 요소는 사용자 키보드에서 입력을 받습니다
- `search_component_suggestions_display`: 검색 구성 요소가 제안을 표시합니다

그런 다음 커스텀 작업은 자동으로 다음 속성을 전달합니다.

- 사용된 RUM 애플리케이션
- `@view`: 렌더링된 페이지
- `@geo`: 지리적 위치 정보(사용 가능한 경우)
- `@session`: 사용자의 세션 식별자

커스텀 계측을 사용하면 커스텀 작업에 다음 속성을 할당할 수 있습니다. 

- 소속팀
- 렌더링 소요 시간

```
datadogRum.addAction('search_component_render', {
    'team': 'Team A', // 예: 42.12
    'time_to_full_render': 16.5, // 예: ['tomato', 'strawberries']
})
```

RUM Explorer에서 다음을 분석할 수 있습니다.

- 구성 요소가 가장 많이 사용된 페이지
- 구성 요소가 가장 많이 사용된 브라우저 애플리케이션
- 구성 요소가 완전히 렌더링되는 데 걸리는 시간의 P75 백분위수

## 팀 소유권 추적

### 페이지 세트를 소유한 팀

웹 개발팀이 아래 예와 같은 페이지 세트를 소유하고 있다고 가정해 보겠습니다.

{{< img src="real_user_monitoring/guide/define-applications-services-components-rum/rum-guide-track-team-ownership-2.png" alt="웹 개발자가 소유할 수 있는 페이지 세트의 예" style="width:90%;">}}

RUM 애플리케이션 내부에서 다음을 실행하여 팀이 소유한 각 페이지 세트에 서비스를 만듭니다.

1. 구성 옵션 `trackViewsManually`를 `true`로 설정하여 수동 뷰 추적을 켭니다.
2. [기본 RUM 뷰 이름 재정의 지침][8]에 따라 웹사이트의 각 페이지에 뷰 이름과 서비스를 할당합니다.
   - `/checkout`, `/payment`, `/confirmOrder`에서 사용 가능한 페이지의 `"purchase"` 서비스.
   - `/beds`, `/chairs/123`, `/search`에서 사용 가능한 페이지의 `"catalog"` 서비스.
3. [각 서비스의 소스 맵을 업로드][9]하면 Error Tracking에서 최소화되지 않은 스택 트레이스를 확인할 수 있습니다.

RUM의 `service` 속성을 사용하여 특정 팀 범위의 성능이나 채택 상태를 파악할 수 있습니다.

1. RUM Application Overview 페이지에서 `service`별로 모든 그래프를 필터링하여 팀 범위의 종합적인 정보를 확인할 수 있습니다.
2. RUM Explorer에서 실행한 모든 쿼리는 `service` 속성을 사용하여 필터링할 수 있습니다.
   - 서비스별 오류
   - 서비스별 페이지뷰

{{< img src="real_user_monitoring/guide/define-applications-services-components-rum/rum-guide-rum-applications-overview-page-4.png" alt="Shopist의 Cart 페이지에서 사용자 이름별로 그룹화된 액션에 관한 검색 쿼리" style="width:90%;">}}

### UI 구성 요소를 소유한 팀

{{< img src="real_user_monitoring/guide/define-applications-services-components-rum/rum-guide-team-owns-ui-components-2.png" alt="커스텀 액션으로 구성 요소 추적 가능" style="width:90%;">}}

[위에서 언급한][10] 커스텀 액션을 사용해 구성 요소를 추적할 수 있습니다.

1. 커스텀 액션 정의 내에 팀 속성을 추가합니다.
2. 구성 요소 수명 주기 동안 로딩 시간 및 기타 시간을 커스텀 액션 속성으로 추적합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/explorer/
[2]: /ko/real_user_monitoring/browser/setup/
[3]: /ko/real_user_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names
[4]: /ko/real_user_monitoring/browser/monitoring_page_performance/#all-performance-metrics
[5]: /ko/real_user_monitoring/browser/monitoring_page_performance/#add-your-own-performance-timing
[6]: /ko/real_user_monitoring/browser/monitoring_page_performance/#overview
[7]: /ko/real_user_monitoring/guide/send-rum-custom-actions/?tab=npm
[8]: /ko/real_user_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names
[9]: /ko/real_user_monitoring/guide/upload-javascript-source-maps/?tabs=webpackjs#upload-your-source-maps
[10]: #track-components-in-web-pages