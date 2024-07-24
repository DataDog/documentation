---
algolia:
  tags:
  - rum
  - 실제 사용자 모니터링
aliases:
- /ko/real_user_monitoring/installation
- /ko/real_user_monitoring/faq/
cascade:
  algolia:
    rank: 70
description: '사용자가 보는 프론트엔드 애플리케이션의 성능을 시각화, 관찰 및 분석하세요. '
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Real%20User%20Monitoring
  tag: 릴리스 노트
  text: 최신 Datadog RUM 릴리스를 확인하세요! (앱 로그인 필요)
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여하여 실제 사용자 모니터링을 통해 인사이트를 얻으세요.
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: 블로그
  text: Datadog 실제 사용자 모니터링 소개
- link: https://www.datadoghq.com/blog/datadog-mobile-rum/
  tag: 블로그
  text: Datadog 모바일 실제 사용자 모니터링을 통해 모바일 사용자 경험 개선
- link: https://www.datadoghq.com/blog/mobile-monitoring-best-practices/
  tag: 블로그
  text: 모바일 앱 성능 모니터링을 위한 모범 사례
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: 블로그
  text: Datadog 오류 추적을 통해 애플리케이션 문제 파악
- link: https://www.datadoghq.com/blog/unify-apm-rum-datadog/
  tag: 블로그
  text: 전체 스택 가시성을 위해 애플리케이션 성능 모니터링(APM) 및 RUM 데이터 통합
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: 블로그
  text: 지오맵을 사용하여 위치별로 앱 데이터 시각화
- link: https://www.datadoghq.com/blog/datadog-rum-react-components/#tune-up-your-react-data-collection
  tag: 블로그
  text: 커스텀 React 컴포넌트로 더 나은 RUM 데이터 확보
- link: https://www.datadoghq.com/blog/hybrid-app-monitoring/
  tag: 블로그
  text: Datadog으로 하이브리드 모바일 애플리케이션 모니터링
- link: https://www.datadoghq.com/blog/how-datadogs-tech-solutions-team-rum-session-replay/
  tag: 블로그
  text: Datadog의 기술 솔루션 팀이 RUM, 세션 재생 및 오류 추적을 사용하여 고객 문제를 해결하는 방법
- link: https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/
  tag: 블로그
  text: 정적 웹 애플리케이션 모니터링 모범 사례
- link: /real_user_monitoring/browser/data_collected/
  tag: 설명서
  text: 수집된 RUM 브라우저 데이터
title: RUM & 세션 재생
---

{{< img src="real_user_monitoring/rum-performance-summary-2.png" alt="RUM Dashboard" >}}

## 실제 사용자 모니터링이란?

Datadog의 *RUM(실제 사용자 모니터링)*은 개별 사용자의 실시간 활동과 경험에 대한 엔드투엔드 가시성을 제공합니다. RUM은 웹 및 모바일 애플리케이션 모니터링을 위한 네 가지 유형의 사용 사례를 해결합니다:

* **성능**: 웹 페이지, 모바일 애플리케이션 화면, 사용자 작업, 네트워크 요청 및 프론트엔드 코드의 성능을 추적합니다.
* **Error Management**: 진행 중인 버그와 문제를 모니터링하고 시간과 버전별로 추적합니다.
* **Analytics / Usage**: 누가 애플리케이션을 사용하는지 파악하고(국가, 디바이스, OS), 개별 사용자의 활동을 모니터링하며, 사용자가 애플리케이션과 상호작용하는 방식(가장 많이 방문한 페이지, 클릭, 상호작용, 기능 사용)을 분석합니다.

* **Support**: 한 사용자 세션과 관련된 모든 정보를 검색하여 문제(세션 기간, 방문한 페이지, 상호 작용, 로드된 리소스 및 오류)를 해결합니다.

사용자 세션은 최대 4시간 동안 지속되는 웹 또는 모바일 애플리케이션에서의 사용자 여정을 의미합니다. 세션에는 일반적으로 페이지뷰 및 관련 원격 분석이 포함됩니다. 사용자가 15분 동안 애플리케이션과 상호 작용하지 않으면 세션이 완료된 것으로 간주됩니다. 사용자가 애플리케이션과 다시 상호 작용하면 새 세션이 시작됩니다.

## 세션 재생이란?

Datadog의 *세션 재생*을 통해 사용자의 웹 브라우징 경험을 캡처하고 시각적으로 재생할 수 있습니다.

RUM 성능 데이터와 결합된 세션 재생은 오류 식별, 재생 및 해결에 유용하며 웹 애플리케이션의 사용 패턴과 설계상의 위험에 대한 인사이트를 제공합니다.

## 시작하기

애플리케이션 유형을 선택하여 RUM 데이터 수집을 시작합니다:

{{< partial name="rum/rum-getting-started.html" >}}

</br>

### 기능 및 플랫폼 지원

**참고**: MacOS, Windows, 또는 Linux에서는 Datadog Flutter SDK가 지원되지 않습니다.

다음 표는 각 플랫폼에서 지원되는 RUM 기능을 보여줍니다:

| 기능                               | 브라우저 | 안드로이드 | iOS |   Flutter   | React Native | Roku | 참고 |
| ------------------------------------- | --------|---------|---------|---------|--------------|------|-------|
| Datadog에 로그 보내기  | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} |  |
| 네트워크 요청에 대한 분산 추적 | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | **Datadog Roku SDK**는 일부 유형의 HTTP 요청만 추적할 수 있습니다. |
| 보기 및 액션 추적 (RUM) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | - **Flutter Web**에서 추적되는 모든 액션은 `custom`<br> 으로 기록됩니다 - **Roku**는 수동 액션 추적만 지원합니다. |
| 기능 플래그 추적 및 릴리스 추적 | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  |  |
| 오류 추적 및 소스 매핑 | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | **React Native**에 대해 부분적으로 지원됩니다 |
| 크래시 추적, 기호화 및 난독화 해제 | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} |  |
| 세션 중지 (키오스크 모니터링) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  |  |
| 웹 보기에서 이벤트 추적 |  | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  |  |
| 플랫폼별 바이탈 모니터링 | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  |  |
| 로그의 글로벌 컨텍스트/속성 추적  | {{< X >}} |  |  |  |  |  |  |
| 클라이언트 쪽 추적 |  | {{< X >}} |  {{< X >}}|  |  |  |  |  |
| 세션 재생 | {{< X >}} | {{< X >}} | {{< X >}} |  |  |  | Mobile Session Replay는 기본 모바일 앱용 공개 베타 버전입니다. |
| 히트맵 | {{< X >}} |  |  |  |  |  |  |
| 장애물 신호 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | 모든 **모바일** 및 **Roku** 기기에 대해 부분적으로만 지원됨 |

## SDK 도메인에 대해 지원되는 엔드포인트

모든 Datadog SDK 트래픽은 SSL(기본값 443)을 통해 다음 도메인으로 전송됩니다:

| 사이트 | 사이트 URL                                      |
|------|-----------------------------------------------|
| US1  | `https://browser-intake-datadoghq.com`        |
| US3  | `https://browser-intake-us3-datadoghq.com`    |
| US5  | `https://browser-intake-us5-datadoghq.com`    |
| EU1  | `https://browser-intake-datadoghq.eu`         |
| US1-FED  | `https://browser-intake-ddog-gov.com`     |
| AP1  | `https://browser-intake-ap1-datadoghq.com`    |

## Datadog RUM 탐색

[**디지털 경험 > 성과 요약**][1]으로 이동하여 RUM에 액세스합니다.

### 기본 제공 대시보드

[기본 제공 RUM 대시보드][2]를 통해 자동으로 수집되는 사용자 세션, 성능, 모바일 애플리케이션, 장애물 신호, 네트워크 리소스 및 오류에 대한 정보를 분석할 수 있습니다.

{{< img src="real_user_monitoring/rum-out-of-the-box-dashboard.png" alt="RUM 대시보드" >}}

### RUM 탐색기 및 시각화

[시각화][3]를 통해 지연 시간이 프리미엄 고객에게 영향을 미치는 시점을 확인하는 등 사용자 세션을 세그먼트별로 확인하세요. 데이터를 탐색하고, 보기를 저장하고, 사용자 지정 검색에 대한 [모니터][4]를 만들 수 있습니다.

{{< img src="real_user_monitoring/explorer/analytics/rum_analytics.mp4" alt="RUM Analytics" video=true >}}

### 로그, 애플리케이션 성능 모니터링(APM) 및 프로파일러와의 통합

[백엔드 트레이스, 로그 및 인프라스트럭처 메트릭][5]을 사용자 경험과 보고된 문제에 대응하여 애플리케이션 성능에 영향을 주는 코드의 정확한 행까지 표시합니다.

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_apm_logs.png" alt="RUM 및 APM" >}}

### 오류 추적 및 크래시 보고

[오류 추적][6]을 통해 이상값과 오류 그룹, 시간 초과 및 충돌에 대한 자동 경고를 받아 MTTR을 크게 줄일 수 있습니다.

{{< img src="real_user_monitoring/error_tracking/errors_rum.mp4" alt="RUM 오류 추적" video=true >}}

### 웹 및 모바일 바이탈

[iOS 및 tvOS][8]용 코어 웹 바이탈 및 모바일 바이탈 또는 [안드로이드 및 안드로이드 TV 애플리케이션[9]과 같은 [브라우저 애플리케이션][7]의 성능 점수 및 텔레메트리를 확인합니다.

### 웹 보기 추적

[iOS 및  tvOS][10] 또는 [안드로이드 및 안드로이드 TV][11]에 대한 웹 보기 추적을 통해 기본 웹 애플리케이션에서 정보를 수집하고 하이브리드 보기를 탐색할 수 있습니다.

{{< img src="real_user_monitoring/webview_tracking/webview_tracking_light.png" alt="RUM 탐색기의 사용자 세션에서 캡처한 웹 보기" >}}

## Datadog 세션 재생 탐색

### 세션 재생

웹사이트와 상호작용하는 실제 사용자의 [브라우저 녹화][12]를 보고 조직을 위한 [개인정보 보호 컨트롤][13]을 설정하세요.


### 개발자 도구

[브라우저 개발 도구][14]을 사용하여 애플리케이션 문제 해결 시 트리거된 로그, 오류 및 성능 정보에 액세스합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/performance-monitoring
[2]: /ko/real_user_monitoring/platform/dashboards/
[3]: /ko/real_user_monitoring/explorer/visualize/
[4]: /ko/monitors/types/real_user_monitoring/
[5]: /ko/real_user_monitoring/platform/connect_rum_and_traces/
[6]: /ko/real_user_monitoring/error_tracking/
[7]: /ko/real_user_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[8]: /ko/real_user_monitoring/ios/mobile_vitals/
[9]: /ko/real_user_monitoring/android/mobile_vitals/
[10]: /ko/real_user_monitoring/ios/web_view_tracking/
[11]: /ko/real_user_monitoring/android/web_view_tracking/
[12]: /ko/real_user_monitoring/session_replay/browser/
[13]: /ko/real_user_monitoring/session_replay/browser/privacy_options/
[14]: /ko/real_user_monitoring/session_replay/browser/developer_tools/