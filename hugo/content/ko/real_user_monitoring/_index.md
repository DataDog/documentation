---
algolia:
  tags:
  - rum
  - real user monitoring
aliases:
- /ko/real_user_monitoring/installation
- /ko/real_user_monitoring/faq/
cascade:
  algolia:
    rank: 70
description: 사용자가 보는 프런트엔드 애플리케이션의 성능을 시각화, 관찰 및 분석하세요.
disable_sidebar: true
further_reading:
- link: /real_user_monitoring/application_monitoring/browser/data_collected/
  tag: 설명서
  text: 수집된 RUM 브라우저 데이터
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: Real User Monitoring을 통해 인사이트를 얻는 대화형 세션 참여하기
- link: https://learn.datadoghq.com/courses/intro-to-rum
  tag: 학습 센터
  text: Real User Monitoring(RUM) 소개
- link: https://www.datadoghq.com/blog/ai-summaries-and-smart-chapters/
  tag: 블로그
  text: AI 요약 및 스마트 챕터로 세션 리플레이 더 빠르게 이해하기
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: 블로그
  text: Datadog Real User Monitoring 소개
- link: https://www.datadoghq.com/blog/datadog-mobile-rum/
  tag: 블로그
  text: Datadog Mobile Real User Monitoring을 통해 모바일 사용자 경험 개선하기
- link: https://www.datadoghq.com/blog/mobile-monitoring-best-practices/
  tag: 블로그
  text: 모바일 앱 성능 모니터링을 위한 모범 사례
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: 블로그
  text: Datadog Error Tracking을 통해 애플리케이션 문제 파악하기
- link: https://www.datadoghq.com/blog/unify-apm-rum-datadog/
  tag: 블로그
  text: 전체 스택 가시성을 위해 애플리케이션 성능 모니터링(APM) 및 RUM 데이터 통합하기
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: 블로그
  text: 지오맵을 사용하여 위치별로 앱 데이터 시각화하기
- link: https://www.datadoghq.com/blog/datadog-rum-react-components/#tune-up-your-react-data-collection
  tag: 블로그
  text: 사용자 지정 React 구성 요소로 더 나은 RUM 데이터 얻기
- link: https://www.datadoghq.com/blog/hybrid-app-monitoring/
  tag: 블로그
  text: Datadog으로 하이브리드 모바일 애플리케이션 모니터링하기
- link: https://www.datadoghq.com/blog/how-datadogs-tech-solutions-team-rum-session-replay/
  tag: 블로그
  text: Datadog의 기술 솔루션 팀이 RUM, Session Replay 및 Error Tracking을 사용하여 고객 문제를 해결하는
    방법
- link: https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/
  tag: 블로그
  text: 정적 웹 애플리케이션 모니터링 모범 사례
- link: https://www.datadoghq.com/blog/progressive-web-application-monitoring/
  tag: 블로그
  text: 점진적 웹 애플리케이션 모니터링 모범 사례
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: 블로그
  text: Datadog으로 효과적인 임원 대시보드 설계하기
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: 블로그
  text: '성능에서 영향까지: 공유 컨텍스트를 통한 프런트엔드 팀 연결하기'
- link: https://app.datadoghq.com/release-notes?category=Real%20User%20Monitoring
  tag: 릴리스 노트
  text: 최신 Datadog RUM 릴리스를 확인하세요! (앱 로그인 필요)
title: RUM 및 Session Replay
---
{{< learning-center-callout header="교육 웨비나 세션 참가" hide_image="true" btn_title="등록" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=RUM">}}
  구체적인 비즈니스 니즈에 맞춘 사용자 지정 사용자 액션을 생성하여 사용자 행동을 정확하게 추적하는 방법을 알아보세요.
{{< /learning-center-callout >}}

## Real User Monitoring이란? {#what-is-real-user-monitoring}

{{< img src="real_user_monitoring/performance-summary-browser.png" alt="RUM 대시보드" >}}

Datadog의 *Real User Monitoring(RUM)*을 이용하면 개별 사용자의 실시간 활동 및 경험을 엔드투엔드로 파악할 수 있는 가시성을 확보할 수 있습니다. RUM은 웹 및 모바일 애플리케이션 모니터링과 관련해 다음과 같은 4가지 유형의 사용 사례를 지원합니다.

* **성능**: 웹 페이지, 모바일 애플리케이션 화면, 사용자 액션, 네트워크 요청, 프런트엔드 코드의 성능을 추적합니다.
* **오류 관리**: 진행 중인 버그와 문제를 모니터링하고 시간 및 버전별로 추적합니다.
* **분석/사용량**: 애플리케이션 사용자를 파악하고(국가, 장치, OS), 개별 사용자의 여정을 모니터링하며, 사용자가 애플리케이션과 상호작용하는 방식을 분석합니다(가장 많이 방문한 페이지, 클릭 수, 상호작용 및 기능 사용량).
* **지원**: 하나의 사용자 세션과 관련된 모든 정보를 검색하여 문제를 해결합니다(세션 지속 시간, 방문한 페이지, 상호작용, 로드된 리소스 및 오류).

### 세션 정의 {#session-definition}

사용자 세션이란 웹 또는 모바일 애플리케이션에서의 사용자 여정을 말합니다. 세션에는 관련된 각종 탐색 이벤트(RUM 뷰), 사용자 액션(RUM 액션), 네트워크 요청(RUM 리소스), 크래시 및 오류(RUM 오류), 그리고 사용자 경험을 충실히 재현하는 기타 이벤트 및 신호가 모두 포함됩니다.

RUM 세션 하나는 최대 4시간 지속될 수 있으며, 15분 동안 활동이 없으면 만료됩니다. 사용자가 두 제한 중 하나에 도달한 후 애플리케이션과 상호작용하면 자동으로 새 세션이 시작됩니다.

### 기술적 제한 사항 {#technical-limitations}

| 속성                                   | 제한 사항               |
| ------------------------------------------ | ------------------------ |
| 세션 최대 지속 시간              | 4시간                  |
| 세션 시간 초과                       | 15분간 활동 없음 |
| 세션당 최대 이벤트 수       | 1,000만              |
| 이벤트당 최대 속성 수     | 1,000                    |
| 이벤트당 최대 속성 깊이          | 20                       |
| 최대 이벤트 크기                         | 1MB                     |
| 최대 수집 페이로드 크기                | 5MB                     |
| 최대 소스 맵 및 매핑 파일 크기 | 파일당 500MB          |
| 최대 dSYM 파일 크기                    | 파일당 2GB            |
| 최대 수집 지연 시간                 | 24시간                 |

이벤트가 위에 나열된 기술적 제한 사항 중 하나라도 초과하면 Datadog 인테이크가 해당 이벤트를 거부합니다.

## Session Replay란? {#what-is-session-replay}

Datadog의 *Session Replay*를 사용하면 사용자의 웹 탐색 경험을 캡처하여 시각적으로 재생할 수 있습니다.

Session Replay를 RUM 성능 데이터와 함께 사용하면 오류를 식별, 재현 및 해결하는 데 도움이 되며 웹 애플리케이션의 사용 패턴과 설계상의 문제점에 관한 인사이트를 얻을 수 있습니다.

## 시작 {#get-started}

RUM 데이터를 수집할 애플리케이션 유형을 선택하세요.

{{< card-grid card_width="210" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/browser/" src="integrations_logos/javascript_large.svg" alt="browser" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/android/setup" src="integrations_logos/android_large.svg" alt="Android" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/ios/setup" src="integrations_logos/ios_large.svg" alt="iOS" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup" src="integrations_logos/react-native_large.svg" alt="React Native" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/flutter/setup" src="integrations_logos/flutter_large.svg" alt="Flutter" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/android/setup" src="integrations_logos/android_tv_large.svg" alt="Android TV" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/ios/setup" src="integrations_logos/tv_os_large.svg" alt="tvOS" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/roku/setup" src="integrations_logos/roku_large.svg" alt="Roku" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/unity/setup" src="integrations_logos/rum-unity_large.svg" alt="RUM-Unity" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup" src="integrations_logos/kotlin-multiplatform_large.svg" alt="Kotlin Multiplatform" >}}
{{< /card-grid >}}

### 기능 및 플랫폼 지원 {#capabilities-and-platform-support}

**참고**: Datadog Flutter SDK는 MacOS, Windows 또는 Linux에서는 지원되지 않습니다.

다음 표는 각 플랫폼에서 지원되는 RUM 기능을 보여줍니다.

| 기능                               | 브라우저 | Android | iOS |   Flutter   | React Native | Roku | KMP | Unity |  참고 |
| ------------------------------------- | --------|---------|---------|---------|--------------|------|-----|-------|--------|
| Datadog으로 로그 전송  | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| 네트워크 요청 분산 추적 | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | - **Roku**는 일부 유형의 HTTP 요청만 추적할 수 있습니다.<br> - **Unity**는 `UnityWebRequest`를 래핑하여 요청을 추적합니다. |
| 뷰 및 액션 추적(RUM) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | - **Flutter Web**에서 추적된 모든 액션은 `custom`으로 기록됩니다. <br> - **Roku** 및 **Unity**는 수동 액션 추적만 지원합니다. |
| Feature Flags 추적 및 릴리스 추적 | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |
| 오류 추적 및 소스 매핑 | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| 충돌 추적, 기호화, 난독화 해제 | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |  |
| 세션 중지(키오스크 모니터링) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}}  |  |
| 웹뷰에서 이벤트 추적 |  | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  |
| 플랫폼별 바이탈 모니터링 | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  |
| 로그의 글로벌 컨텍스트/속성 추적  | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |
| 클라이언트 측 추적 |  | {{< X >}} |  {{< X >}}|  |  |  |  |  |  |  |
| Session Replay | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  | **Flutter** Session Replay는 미리 보기 상태입니다. |
| 불만 신호 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | 모든 **모바일** 및 **Roku** 장치에서는 일부 기능만 지원됩니다. |

## SDK 도메인에서 지원되는 엔드포인트 {#supported-endpoints-for-sdk-domains}

모든 Datadog SDK 트래픽은 SSL(기본값 443)을 통해 다음 도메인으로 전송됩니다.

| 사이트 | 사이트 URL                                      |
|------|-----------------------------------------------|
| US1  | `https://browser-intake-datadoghq.com`        |
| US3  | `https://browser-intake-us3-datadoghq.com`    |
| US5  | `https://browser-intake-us5-datadoghq.com`    |
| EU1  | `https://browser-intake-datadoghq.eu`         |
| US1-FED  | `https://browser-intake-ddog-gov.com`     |
| US2-FED  | `https://browser-intake-us2-ddog-gov.com` |
| AP1  | `https://browser-intake-ap1-datadoghq.com`    |
| AP2  | `https://browser-intake-ap2-datadoghq.com`    |
| UK1  | `https://browser-intake-uk1-datadoghq.com`    |

### Browser Profiling용 추가 엔드포인트 {#additional-endpoints-for-browser-profiling}

[Browser Profiling][19]을 활성화하면 SDK는 현재 세션에서 프로파일링이 허용되는지 확인하기 위해 할당량 API에도 연결합니다. 이는 표준 수집 출처의 `quota.` 하위 도메인을 사용합니다.

| 사이트 | 쿼터 API URL                                             |
|------|-----------------------------------------------------------|
| US1  | `https://quota.browser-intake-datadoghq.com`             |
| US3  | `https://quota.browser-intake-us3-datadoghq.com`         |
| US5  | `https://quota.browser-intake-us5-datadoghq.com`         |
| EU1  | `https://quota.browser-intake-datadoghq.eu`              |
| US1-FED  | `https://quota.browser-intake-ddog-gov.com`          |
| US2-FED  | `https://quota.browser-intake-us2-ddog-gov.com`      |
| AP1  | `https://quota.browser-intake-ap1-datadoghq.com`         |
| AP2  | `https://quota.browser-intake-ap2-datadoghq.com`         |
| UK1  | `https://quota.browser-intake-uk1-datadoghq.com`         |

[프록시][20]를 사용하거나 [콘텐츠 보안 정책(CSP)][21]이 있는 경우, 이러한 `quota.` 도메인도 허용되는지 확인하세요. 자세한 내용은 [Browser Profiling 설정][19] 페이지를 참조하세요.

## Datadog RUM 살펴보기 {#explore-datadog-rum}

[{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Performance Summary{{< /ui >}}][1]로 이동하여 RUM에 액세스하세요.

상단 탐색 창에서 애플리케이션을 선택하거나 [브라우저][15] 또는 [모바일][16] 설정 지침을 따라 첫 애플리케이션을 추가하세요.

{{< img src="real_user_monitoring/rum-performance-application-selector.png" alt="RUM 애플리케이션 선택" >}}

**팁**: Datadog 글로벌 검색에서 RUM을 열려면 <kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>K</kbd> 키를 누르고 `real user monitoring`을 검색하세요.

## 성능 모니터링 요약 {#performance-monitoring-summary}

| 브라우저 성능 요약 | 모바일 성능 요약 |
|---------|---------|
| {{< img src="real_user_monitoring/performance-summary-browser.png" alt="브라우저 애플리케이션의 RUM 성능 모니터링 요약 페이지" >}} | {{< img src="real_user_monitoring/performance-summary-mobile-2.png" alt="모바일 애플리케이션의 RUM 성능 모니터링 요약 페이지" >}} | 

[RUM Performance Monitoring summary][1] 페이지에는 웹 및 모바일 애플리케이션 양쪽 모두의 관련성이 높고 실행 가능한 인사이트가 표시됩니다. 각 플랫폼에 맞게 최적화된 환경을 통해 다음을 수행할 수 있습니다.

- **플랫폼별 주요 데이터 포인트에 집중**: 웹의 UI 지연 시간이나 모바일 충돌 등 주요 지표를 확인합니다.
- **애플리케이션 상태 모니터링**: 웹 앱의 Core Web Vitals이나 iOS의 중단 비율과 같은 익숙한 KPI를 통해 앱 안정성을 평가합니다.
- **즉시 조사 시작**: 페이지를 종료하지 않고 대화형 위젯에서 바로 조사할 수 있습니다.

**웹 앱**의 경우, 검색 창을 사용하여 데이터를 필터링하고, 속도가 느린 페이지를 파악하고 UI를 따라 [RUM Optimization Inspect][17] 페이지로 이동하세요.

**모바일 앱**의 경우, 페이지 맨 아래에서 최근 충돌을 검토하고 [Error Tracking][6] 사이드 패널을 사용하여 문제를 해결하세요.

### 기본 제공 대시보드 {#out-of-the-box-dashboards}

[기본 제공 RUM 대시보드][2]를 사용하여 자동으로 수집된 사용자 세션, 성능, 모바일 애플리케이션, 불만 신호, 네트워크 리소스 및 오류 관련 정보를 분석합니다.

{{< img src="real_user_monitoring/rum-out-of-the-box-dashboard.png" alt="RUM 대시보드" >}}

### RUM 탐색기 및 시각화 {#rum-explorer-and-visualizations}

[시각화][3]를 사용해 사용자 세션을 세그먼트별로 조회하세요. 예를 들어 지연 시간이 프리미엄 고객에게 영향을 미치는 시점을 확인할 수 있습니다. 데이터를 탐색하고, 뷰를 저장하고 사용자 지정 검색을 기반으로 [모니터][4]를 생성하세요.

{{< img src="real_user_monitoring/explorer/analytics/rum_analytics.mp4" alt="RUM 분석" video=true >}}

### 로그, APM 및 프로파일러 통합 {#integration-with-logs-apm-and-profiler}

[백엔드 트레이스, 로그 및 인프라 메트릭][5]을 애플리케이션 성능에 영향을 미치는 정확한 코드 줄까지 조회하세요. 이러한 내용은 사용자 경험 및 보고된 문제와 일치합니다.

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_apm_logs-2.png" alt="RUM 및 APM" >}}

### 오류 추적 및 충돌 보고 {#error-tracking-and-crash-reporting}

[Error Tracking][6]을 통해 이상치와 오류 그룹, 시간 초과 및 충돌에 대한 경보를 자동으로 받아 MTTR을 크게 줄일 수 있습니다.

{{< img src="real_user_monitoring/error_tracking/errors_rum.mp4" alt="RUM 오류 추적" video=true >}}

### 웹 및 모바일 바이탈 {#web-and-mobile-vitals}

[브라우저 애플리케이션][7]의 Core Web Vitals와 [iOS, iPadOS, tvOS 및 visionOS][8] 또는 [Android 및 Android TV 애플리케이션][9]의 Mobile Vitals와 같은 성능 점수 및 텔레메트리를 조회하세요.

### 웹뷰 추적 {#web-view-tracking}

[iOS, iPadOS 및 visionOS][10] 또는 [Android 및 Android TV][11]용 Web View Tracking을 사용하여 네이티브 웹 애플리케이션의 정보를 수집하고 하이브리드 웹뷰를 탐색하세요.

{{< img src="real_user_monitoring/webview_tracking/webview_tracking_light.png" alt="RUM 탐색기의 사용자 세션에 캡처된 웹뷰" >}}

## Datadog Session Replay 살펴보기 {#explore-datadog-session-replay}

### 세션 리플레이 {#session-replays}

실제 사용자가 웹사이트와 상호작용하는 [브라우저 녹화][12]를 확인하고 조직의 [개인정보 보호 제어][13]를 설정하세요.

### 개발자 도구 {#developer-tools}

애플리케이션 문제 해결 시 [브라우저 개발 도구][14]를 사용하여 트리거된 로그, 오류 및 성능 정보에 액세스하세요.


## 권한 {#permissions}

기본적으로 모든 사용자가 애플리케이션의 RUM 구성을 변경할 수 있습니다.

세분화된 액세스 제어를 사용하여 특정 애플리케이션의 RUM 구성을 편집할 수 있는 [역할][18]을 제한할 수 있습니다.
1. 애플리케이션의 RUM 구성을 조회하는 중에 화면 맨 위에 있는 {{< ui >}}Edit application{{< /ui >}} 버튼을 클릭합니다. 드롭다운이 표시됩니다.
1. {{< ui >}}Manage App Permissions{{< /ui >}}를 선택합니다.
1. {{< ui >}}Restrict Access{{< /ui >}}를 클릭합니다.
1. 대화 상자가 업데이트되어 조직 구성원이 기본적으로 {{< ui >}}Viewer{{< /ui >}} 액세스 권한이 있는 것으로 표시됩니다.
1. 드롭다운을 사용하여 노트북을 편집할 수 있는 하나 이상의 역할, 팀 또는 사용자를 선택합니다.
1. {{< ui >}}Add{{< /ui >}}를 클릭합니다.
1. 대화 상자가 업데이트되어 선택한 역할에 {{< ui >}}Editor{{< /ui >}} 권한이 있는 것으로 표시됩니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

**참고:** 애플리케이션에 대한 편집 액세스를 유지하려면 저장하기 전에 사용자가 속한 역할을 하나 이상 포함해야 합니다.

제한된 애플리케이션에 대한 일반 액세스를 복원하려면 편집 권한이 있어야 합니다. 다음 단계를 따르세요.
1. 애플리케이션의 RUM 구성을 조회하는 중에 화면 맨 위에 있는 {{< ui >}}Edit application{{< /ui >}} 버튼을 클릭합니다. 드롭다운이 표시됩니다.
1. {{< ui >}}Manage App Permissions{{< /ui >}}를 선택합니다.
1. {{< ui >}}Restore Full Access{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/performance-monitoring
[2]: /ko/real_user_monitoring/platform/dashboards/
[3]: /ko/real_user_monitoring/explorer/visualize/
[4]: /ko/monitors/types/real_user_monitoring/
[5]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm/
[6]: /ko/real_user_monitoring/error_tracking/
[7]: /ko/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[8]: /ko/real_user_monitoring/application_monitoring/ios/mobile_vitals/
[9]: /ko/real_user_monitoring/application_monitoring/android/mobile_vitals/
[10]: /ko/real_user_monitoring/application_monitoring/ios/web_view_tracking/
[11]: /ko/real_user_monitoring/application_monitoring/android/web_view_tracking/
[12]: /ko/session_replay/browser/
[13]: /ko/session_replay/privacy_options?platform=browser
[14]: /ko/session_replay/dev_tools
[15]: /ko/real_user_monitoring/application_monitoring/browser/setup/
[16]: /ko/real_user_monitoring/application_monitoring/
[17]: https://app.datadoghq.com/rum/optimization/inspect
[18]: /ko/account_management/rbac/
[19]: /ko/real_user_monitoring/correlate_with_other_telemetry/profiling
[20]: /ko/real_user_monitoring/guide/proxy-rum-data
[21]: /ko/integrations/content_security_policy_logs