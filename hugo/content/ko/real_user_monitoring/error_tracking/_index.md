---
algolia:
  tags:
  - error tracking
description: 웹 및 모바일 애플리케이션에서 수집된 오류를 검색하고 관리하는 방법을 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: 블로그
  text: Datadog Error Tracking을 통해 애플리케이션 문제 파악하기
- link: https://www.datadoghq.com/blog/ios-crash-reporting-datadog
  tag: 블로그
  text: Datadog RUM을 통해 iOS 충돌을 효율적으로 디버깅하기
- link: https://www.datadoghq.com/blog/how-datadogs-tech-solutions-team-rum-session-replay/
  tag: 블로그
  text: Datadog의 기술 솔루션 팀이 RUM, Session Replay 및 Error Tracking을 사용하여 고객 문제를 해결하는
    방법
- link: https://www.datadoghq.com/blog/error-tracking-logs/
  tag: 블로그
  text: Datadog Error Tracking으로 로그의 오류를 추적하고 분류하기
- link: /real_user_monitoring/error_tracking/explorer
  tag: 설명서
  text: Error Tracking 탐색기에 대해 알아보기
- link: /monitors/types/error_tracking/
  tag: 설명서
  text: Error Tracking 모니터 만들기
title: 웹 및 모바일 애플리케이션을 위한 Error Tracking
---
## 개요 {#overview}

{{< img src="real_user_monitoring/error_tracking/rum-error-tracking-explorer-1.png" alt="Error Tracking 탐색기의 이슈 세부 정보" style="width:100%;" >}}

{{% error-tracking-description %}}

RUM 오류로 인해 발생한 이슈에는 스택 트레이스, 사용자 세션 타임라인과 사용자 위치, 버전, 충돌 보고서에 포함한 모든 사용자 지정 속성을 비롯한 메타데이터가 있습니다.

[Error Tracking Explorer][3] 설명서에서 Error Tracking의 주요 기능을 살펴보세요. RUM용 Error Tracking Explorer를 보려면 [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Error Tracking{{< /ui >}}][1]으로 이동하세요.

## 설정 {#setup}

{{< whatsnext desc="RUM용 Datadog Error Tracking을 시작하려면 해당 설명서를 참조하세요." >}}
    {{< nextlink href="real_user_monitoring/error_tracking/browser" >}}브라우저{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/application_monitoring/electron/error_tracking" >}}Electron{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/android" >}}Android{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/ios" >}}iOS{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/expo" >}}Expo{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/reactnative" >}}React Native{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/flutter" >}}Flutter{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/roku" >}}Roku{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/kotlin_multiplatform" >}}Kotlin Multiplatform{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/maui" >}}.NET MAUI{{< /nextlink >}}
{{< /whatsnext >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: /ko/real_user_monitoring/
[3]: /ko/error_tracking/explorer