---
aliases:
- /ko/error_tracking/issue_correlation/
- /ko/ide_plugins/idea/error_tracking/
- /ko/developers/ide_plugins/idea/error_tracking/
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: 블로그
  text: Datadog의 GitLab 소스 코드 통합으로 더 빠르게 문제 해결하기
- link: https://www.datadoghq.com/blog/error-tracking-and-github/
  tag: 블로그
  text: Error Tracking에서 GitHub 커밋 및 소유권 데이터를 사용하여 근본 원인 문제 해결하기
- link: https://www.datadoghq.com/blog/go-error-handling/
  tag: 블로그
  text: Go에서의 오류 처리에 대한 실용적인 가이드
- link: https://www.datadoghq.com/blog/a-practical-guide-to-react-error-monitoring/
  tag: 블로그
  text: React 에러 모니터링에 대한 실용 가이드
title: Error Tracking
---
## 개요 {#overview}

{{< img src="error_tracking/error-tracking-overview-3.png" alt="Error Tracking Explorer의 문제 세부 정보" style="width:100%;" >}}

{{% error-tracking-description %}}

오류 소스에 따라 추가 기능을 사용할 수 있습니다. [지원되는 오류 소스](#supported-error-sources)를 참조하세요.

## 시작하기 {#getting-started}

- [Error Tracking Explorer][5] 문서에서 주요 Error Tracking 기능을 살펴보세요.
- 다음 섹션의 제품별 링크를 사용하여 특정 오류 소스에 대한 Error Tracking을 설정합니다.

## 설정 {#setup}
{{< whatsnext desc="Datadog Error Tracking을 시작하려면 다음 설정 옵션 중 하나를 선택합니다." >}}
    {{< nextlink href="agentic_onboarding/setup" >}}에이전트형 온보딩{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/browser" >}}브라우저{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/android" >}}Android{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/ios" >}}iOS{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/expo" >}}Expo{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/reactnative" >}}React Native{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/flutter" >}}Flutter{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/kotlin_multiplatform" >}}Kotlin Multiplatform{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/logs" >}}로그{{< /nextlink >}}
{{< /whatsnext >}}

## 지원되는 오류 소스 {#supported-error-sources}

Error Tracking은 웹, 모바일 및 백엔드 애플리케이션 전반에서 오류를 캡처하고 처리합니다. [Browser SDK][6], [Mobile SDK][7]를 사용하여 애플리케이션과 서비스를 계측하거나 Logs, Traces 및 Real User Monitoring 이벤트에서 오류를 수집할 수 있습니다. 

오류 소스에 따라 추가 기능을 사용할 수 있습니다. 예를 들어, APM 트레이스에서 발생한 오류의 경우 [Exception Replay][4] 기능이 프로덕션 변수 값을 자동으로 캡처합니다. 

자세한 내용은 제품별 오류 추적 문서를 참조하세요.

- [APM][1]
- [Log Management][2]
- [Real User Monitoring][3]

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/error_tracking#setup
[2]: /ko/logs/error_tracking#setup
[3]: /ko/real_user_monitoring/error_tracking#setup
[4]: /ko/error_tracking/backend/exception_replay
[5]: /ko/error_tracking/explorer
[6]: /ko/error_tracking/frontend/browser
[7]: /ko/error_tracking/frontend/mobile