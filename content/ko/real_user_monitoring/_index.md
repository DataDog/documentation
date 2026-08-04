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
description: 사용자가 보는 프론트엔드 애플리케이션의 성능을 시각화, 관찰 및 분석하세요.
disable_sidebar: true
further_reading:
- link: /real_user_monitoring/application_monitoring/browser/data_collected/
  tag: 설명서
  text: 수집된 RUM 브라우저 데이터
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여하여 Real User Monitoring을 통해 인사이트를 얻으세요.
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: 블로그
  text: Datadog Real User Monitoring 소개
- link: https://www.datadoghq.com/blog/datadog-mobile-rum/
  tag: 블로그
  text: Datadog Mobile Real User Monitoring을 통해 모바일 사용자 경험 개선
- link: https://www.datadoghq.com/blog/mobile-monitoring-best-practices/
  tag: 블로그
  text: 모바일 앱 성능 모니터링을 위한 모범 사례
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: 블로그
  text: Datadog Error Tracking을 통해 애플리케이션 문제 파악
- link: https://www.datadoghq.com/blog/unify-apm-rum-datadog/
  tag: 블로그
  text: 전체 스택 가시성을 위해 애플리케이션 성능 모니터링(APM) 및 RUM 데이터 통합
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: 블로그
  text: 지오맵을 사용하여 위치별로 앱 데이터 시각화
- link: https://www.datadoghq.com/blog/datadog-rum-react-components/#tune-up-your-react-data-collection
  tag: 블로그
  text: 사용자 지정 React 구성 요소로 더 나은 RUM 데이터 얻기
- link: https://www.datadoghq.com/blog/hybrid-app-monitoring/
  tag: 블로그
  text: Datadog으로 하이브리드 모바일 애플리케이션 모니터링
- link: https://www.datadoghq.com/blog/how-datadogs-tech-solutions-team-rum-session-replay/
  tag: 블로그
  text: Datadog의 기술 솔루션 팀이 RUM, 세션 리플레이 및 Error Tracking을 사용하여 고객 문제를 해결하는 방법
- link: https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/
  tag: 블로그
  text: 정적 웹 애플리케이션 모니터링 모범 사례
- link: https://www.datadoghq.com/blog/progressive-web-application-monitoring/
  tag: 블로그
  text: 점진적 웹 애플리케이션 모범 사례
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: 블로그
  text: Datadog으로 효과적인 임원 대시보드 설계
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: 블로그
  text: '성능에서 영향까지: 공유 컨텍스트를 통한 프런트엔드 팀 연결'
- link: https://app.datadoghq.com/release-notes?category=Real%20User%20Monitoring
  tag: 릴리스 노트
  text: 최신 Datadog RUM 릴리스를 확인하세요! (앱 로그인 필요)
- link: https://learn.datadoghq.com/courses/intro-to-rum
  tag: 학습 센터
  text: Real User Monitoring(RUM) 소개
title: RUM 및 세션 리플레이
---
{{< learning-center-callout header="활성화 웨비나 세션에 참가하기" hide_image="true" btn_title="등록" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=RUM">}}
  구체적인 비즈니스 니즈에 맞춘 사용자 지정 사용자 액션을 생성하여 사용자 행동을 정확하게 추적하는 방법을 알아보세요.
{{< /learning-center-callout >}}

## Real User Monitoring이란? {#what-is-real-user-monitoring}

{{< img src="real_user_monitoring/performance-summary-browser.png" alt="RUM 대시보드" >}}

Datadog의 *Real User Monitoring(RUM)*을 이용하면 개별 사용자의 실시간 활동 및 경험에 대한 엔드투엔드 가시성을 확보할 수 있습니다. RUM은 웹 및 모바일 애플리케이션 모니터링과 관련해 다음과 같은 4가지 유형의 사용 사례를 해결합니다.

* **성능**: 웹 페이지, 모바일 애플리케이션 화면, 사용자 액션, 네트워크 요청, 프런트엔드 코드의 성능을 추적합니다.
* **오류 관리**: 진행 중인 버그와 문제를 모니터링하고 시간 및 버전에 걸쳐 추적합니다.
* **분석/사용량**: 애플리케이션을 누가 사용하는지 파악하고(국가, 장치, OS), 개별 사용자의 여정을 모니터링하며, 사용자가 애플리케이션과 어떻게 상호작용하는지 분석합니다(가장 많이 방문한 페이지, 클릭 수, 상호작용 및 기능 사용량).
* **지원**: 하나의 사용자 세션과 관련된 모든 정보를 검색하여 문제를 해결합니다(세션 지속 시간, 방문한 페이지, 상호작용, 로드된 리소스 및 오류).

### 세션 정의 {#session-definition}

사용자 세션이란 웹 또는 모바일 애플리케이션에서의 사용자 여정을 말합니다. 세션에는 각종 관련 탐색 이벤트(RUM 조회), 사용자 액션(RUM 액션), 네트워크 요청(RUM 리소스), 크래시 및 오류(RUM 오류), 그리고 합쳐서 사용자 경험을 충실히 재현하는 데 사용할 수 있는 기타 이벤트 및 신호가 모두 포함됩니다.

RUM 세션 하나는 최대 4시간 지속될 수 있고, 활동이 없으면 15분 후에 만료됩니다. 사용자가 두 한도 중 하나가 지난 뒤에 애플리케이션과 상호작용을 하면 자동으로 새 세션이 시작됩니다.

### 기술적인 한계 {#technical-limitations}

| 속성                                   | 한계               |
| ------------------------------------------ | ------------------------ |
| 세션 최대 기간              | 4시간                  |
| 세션 시간 초과                       | 15분간 활동 없음 |
| 세션당 최대 이벤트 수       | 1천만              |
| 이벤트당 최대 속성 수     | 1,000                    |
| 이벤트당 최대 속성 깊이          | 20                       |
| 이벤트 최대 크기                         | 1MB                     |
| 인테이크 페이로드 최대 크기                | 5MB                     |
| 소스 맵 및 매핑 파일 최대 크기 | 파일당 500MB          |
| dSYM 파일 최대 크기                    | 파일당 2GB            |
| 수집 시 최대 지연                 | 24시간                 |

이벤트가 위에 나열된 기술적 한계 중 하나라도 초과하면 Datadog 인테이크가 해당 이벤트를 거부합니다.

## 세션 리플레이란? {#what-is-session-replay}

Datadog의 *세션 리플레이*를 사용하면 사용자의 웹 탐색 경험을 캡처하여 시각적으로 재생할 수 있습니다.

세션 리플레이를 RUM 성능 데이터와 함께 사용하면 오류 식별, 재현, 해결에 유익하며 웹 애플리케이션의 사용량 패턴과 설계상 위험에 관한 인사이트를 얻을 수 있습니다.

## 시작하기 {#get-started}

RUM 데이터를 수집할 애플리케이션 유형 선택:

{{< card-grid card_width="210" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/browser/" src="integrations_logos/javascript_large.svg" alt="browser" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/android/setup" src="integrations_logos/android_large.svg" alt="android" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/ios/setup" src="integrations_logos/ios_large.svg" alt="ios" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup" src="integrations_logos/react-native_large.svg" alt="react native" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/flutter/setup" src="integrations_logos/flutter_large.svg" alt="flutter" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/android/setup" src="integrations_logos/android_tv_large.svg" alt="android tv" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/ios/setup" src="integrations_logos/tv_os_large.svg" alt="tv OS" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/roku/setup" src="integrations_logos/roku_large.svg" alt="Roku" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/unity/setup" src="integrations_logos/rum-unity_large.svg" alt="rum-unity" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup" src="integrations_logos/kotlin-multiplatform_large.svg" alt="Kotlin Multiplatform" >}}
{{< /card-grid >}}

</br>

### 기능 및 플랫폼 지원 {#capabilities-and-platform-support}

**참고**: Datadog Flutter SDK는 MacOS, Windows 또는 Linux에서는 지원되지 않습니다.

다음 표에 각 플랫폼에서 지원되는 RUM 기능이 무엇인지 표시했습니다.

| 기능                               | 브라우저 | Android | iOS |   Flutter   | React Native | Roku | KMP | Unity |  참고 |
| ------------------------------------- | --------|---------|---------|---------|--------------|------|-----|-------|--------|
| Datadog에 로그 보내기  | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| 네트워크 요청에 대한 분산 추적 | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | - **Roku**는 일부 유형의 HTTP 요청만 추적할 수 있습니다.<br> - **Unity**는 요청 추적을 위해 `UnityWebRequest`를 감싸는 래퍼를 사용합니다. |
| 조회 및 액션 추적(RUM) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | - **Flutter Web**에서 추적한 모든 액션은 `custom`으로 기록됩니다. <br> - **Roku** 및 **Unity**는 수동 액션 추적만 지원합니다. |
| 기능 플래그 추적 및 릴리스 추적 | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |
| Error Tracking 및 소스 매핑 | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | **React Native**에 부분적으로만 지원됩니다. |
| 크래시 추적, 기호화, 난독화 해제 | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |  |
| 세션 중지(키오스크 모니터링) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}}  |  |
| 웹 보기에서 이벤트 추적 |  | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  |
| 플랫폼별 바이탈 모니터링 | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  |
| 로그의 글로벌 컨텍스트/속성 추적  | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |
| 클라이언트 측 추적 |  | {{< X >}} |  {{< X >}}|  |  |  |  |  |  |  |
| 세션 리플레이 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  | **Flutter** 세션 리플레이는 미리 보기 상태입니다. |
| 불만 신호 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | 모든 **모바일** 및 **Roku** 장치에 부분적으로만 지원됩니다. |

## SDK 도메인에 지원되는 엔드포인트 {#supported-endpoints-for-sdk-domains}

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

## Datadog RUM 둘러보기 {#explore-datadog-rum}

RUM에 액세스하려면 [**디지털 경험 > 성능 요약**][1]으로 이동합니다.

상단 탐색 창에서 애플리케이션을 선택하거나 [브라우저][15] 또는 [모바일][16] 설정 지침을 따라 첫 애플리케이션을 추가합니다.

{{< img src="real_user_monitoring/rum-performance-application-selector.png" alt="RUM 애플리케이션 선택" >}}

**팁**: Datadog 글로벌 검색에서 RUM을 열려면 <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd>를 누르고 `real user monitoring`을 검색하세요.

## 성능 모니터링 요약 {#performance-monitoring-summary}

| 브라우저 성능 요약 | 모바일 성능 요약 |
|---------|---------|
| {{< img src="real_user_monitoring/performance-summary-browser.png" alt="브라우저 애플리케이션의 RUM 성능 모니터링 요약 페이지" >}} | {{< img src="real_user_monitoring/performance-summary-mobile-2.png" alt="모바일 애플리케이션의 RUM 성능 모니터링 요약 페이지" >}} | 

[RUM 성능 모니터링 요약][1] 페이지에 웹 및 모바일 애플리케이션 양쪽 모두의 관련 인사이트 및 실행 가능한 인사이트가 표시됩니다. 각 플랫폼에 맞춤형 경험이 제공되어 다음과 같이 도움이 됩니다.

플랫폼별로 - **주요 데이터 포인트에 집중**(예를 들어 웹 또는 모바일 크래시의 경우 UI 지연 시간)
- **애플리케이션 상태 모니터링**(웹 앱의 경우 코어 웹 바이탈, iOS의 경우 멈춤 빈도와 같이 친숙한 KPI를 통해 앱 안정성 평가)
- **심층 조사에 직접 돌입**(페이지를 종료할 필요 없이 대화형 위젯에서 직접 시작)

**웹 앱**의 경우, 검색 창을 사용해 데이터를 필터링하고, 속도가 느린 페이지를 파악하고 UI를 따라 [RUM 최적화 조사][17] 페이지로 이동하세요.

**모바일 앱**의 경우, 페이지 맨 아래에서 최근 크래시를 검토하고 문제 해결에는 [Error Tracking][6] 사이드 패널을 사용하세요.

### 즉시 사용 가능한 대시보드 {#out-of-the-box-dashboards}

[즉시 사용 가능한 RUM 대시보드][2]를 사용해 자동으로 수집된 사용자 세션, 성능, 모바일 애플리케이션, 불만 신호, 네트워크 리소스 및 오류 관련 정보를 분석합니다.

{{< img src="real_user_monitoring/rum-out-of-the-box-dashboard.png" alt="RUM 대시보드" >}}

### RUM 탐색기 및 시각화 {#rum-explorer-and-visualizations}

[시각화][3]를 사용해 사용자 세션을 세그먼트별로 조회합니다. 예를 들어 지연 시간이 프리미엄 고객에게 영향을 미치는 시점을 검사합니다. 사용자 지정 검색에 대한 데이터를 탐색하고, 뷰를 저장하고 [모니터][4]를 생성합니다.

{{< img src="real_user_monitoring/explorer/analytics/rum_analytics.mp4" alt="RUM 분석" video=true >}}

### 로그, APM 및 프로파일러와 통합 {#integration-with-logs-apm-and-profiler}

[백엔드 트레이스, 로그 및 인프라 메트릭][5]을 애플리케이션 성능에 영향을 미치는 정확한 코드 줄까지 조회하세요. 이러한 내용은 사용자 경험 및 보고된 문제와 일치합니다.

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_apm_logs-2.png" alt="RUM 및 APM" >}}

### Error tracking 및 크래시 보고 {#error-tracking-and-crash-reporting}

[Error tracking][6]을 통해 이상값과 오류 그룹, 시간 초과 및 충돌에 대한 자동 경고를 받아 MTTR을 크게 줄일 수 있습니다.

{{< img src="real_user_monitoring/error_tracking/errors_rum.mp4" alt="RUM 오류 추적" video=true >}}

### 웹 및 모바일 바이탈 {#web-and-mobile-vitals}

[iOS 및 tvOS][8]용 코어 웹 바이탈 및 모바일 바이탈 또는 [안드로이드 및 안드로이드 TV 애플리케이션][9]과 같은 [브라우저 애플리케이션][7]의 성능 점수 및 텔레메트리를 확인합니다.

### 웹 보기 추적 {#web-view-tracking}

[iOS 및 tvOS][10] 또는 [Android 및 Android TV][11]에 대한 웹 보기 추적을 통해 기본 웹 애플리케이션에서 정보를 수집하고 하이브리드 보기를 탐색할 수 있습니다.

{{< img src="real_user_monitoring/webview_tracking/webview_tracking_light.png" alt="RUM 탐색기의 사용자 세션에 캡처된 웹 보기" >}}

## Datadog 세션 리플레이 둘러보기 {#explore-datadog-session-replay}

### 세션 리플레이 {#session-replays}

웹사이트와 상호작용을 하는 실제 사용자의 [브라우저 녹화본][12]을 보고 조직의 [개인정보 보호 제어][13]를 설정하세요.

### 개발자 도구 {#developer-tools}

[브라우저 개발 도구][14]을 사용하여 애플리케이션 문제 해결 시 트리거된 로그, 오류 및 성능 정보에 액세스합니다.


## 권한 {#permissions}

기본적으로 모든 사용자가 애플리케이션의 RUM 구성을 변경할 수 있습니다.

특정 애플리케이션의 RUM 구성을 편집할 수 있는 [역할][18]을 제한하려면 세분화된 액세스 제어 사용:
1. 애플리케이션의 RUM 구성을 조회하는 중에 화면 맨 위에 있는 **애플리케이션 편집** 버튼을 클릭합니다. 드롭다운이 표시됩니다.
1. **앱 권한 관리**를 선택합니다.
1. **액세스 제한**을 클릭합니다.
1. 대화 상자가 업데이트되어 기본적으로 **뷰어** 액세스 권한이 있는 조직 구성원이 표시됩니다.
1. 드롭다운을 사용하여 노트북을 편집할 수 있는 역할, 팀 또는 사용자를 하나 이상 선택합니다.
1. **추가**를 클릭합니다.
1. 대화 상자가 업데이트되어 선택한 역할에 **편집자** 권한이 있는 것으로 표시됩니다.
1. **저장**을 클릭합니다.

**참고:** 애플리케이션에 대한 편집 액세스를 유지하려면 저장하기 전에 사용자가 구성원인 역할을 하나 이상 포함해야 합니다(시스템 요구 사항).

제한된 애플리케이션에 대한 일반 액세스를 복원하려면 편집 액세스 권한이 있어야 합니다. 다음 단계를 완료하세요.
1. 애플리케이션의 RUM 구성을 조회하는 중에 화면 맨 위에 있는 **애플리케이션 편집** 버튼을 클릭합니다. 드롭다운이 표시됩니다.
1. **앱 권한 관리**를 선택합니다.
1. **전체 액세스 복원**을 클릭합니다.
1. **저장**을 클릭합니다.


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
[13]: /ko/session_replay/browser/privacy_options/
[14]: /ko/session_replay/browser/dev_tools/
[15]: /ko/real_user_monitoring/application_monitoring/browser/setup/
[16]: /ko/real_user_monitoring/application_monitoring/
[17]: https://app.datadoghq.com/rum/optimization/inspect
[18]: /ko/account_management/rbac/