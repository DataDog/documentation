---
algolia:
  tags:
  - 오류 추적
description: 웹 및 모바일 애플리케이션에서 수집된 오류를 검색하고 관리하는 방법에 대해 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: 블로그
  text: Datadog 오류 추적을 통해 애플리케이션 문제 파악
- link: https://www.datadoghq.com/blog/ios-crash-reporting-datadog
  tag: 블로그
  text: Datadog RUM으로 iOS 충돌을 효율적으로 디버깅.
- link: https://www.datadoghq.com/blog/how-datadogs-tech-solutions-team-rum-session-replay/
  tag: 블로그
  text: Datadog의 기술 솔루션 팀이 RUM, 세션 재생 및 오류 추적을 사용하여 고객 문제를 해결하는 방법
- link: https://www.datadoghq.com/blog/error-tracking-logs/
  tag: 블로그
  text: Datadog 오류 추적으로 로그의 오류를 추적 및 분류
- link: /real_user_monitoring/error_tracking/explorer
  tag: 설명서
  text: 오류 추적 탐색기에 대해 알아보기
- link: /monitors/types/error_tracking/
  tag: 설명서
  text: 오류 추적 모니터 만들기
title: 웹 및 모바일 애플리케이션에 대한 오류 추적
---

## 개요

{{< img src="real_user_monitoring/error_tracking/rum-et-explorer.png" alt="오류 추적 탐색기에서 확인된 문제의 세부정보" style="width:100%;" >}}

{{% error-tracking-description %}}

RUM 오류 이슈에는 스택 트레이스, 사용자 세션 타임라인, 메타데이터(사용자 위치, 버전, 충돌 보고서에 포함된 모든 커스텀 속성 포함)가 포함됩니다.

[오류 추적 탐색기][3] 문서에서 주요 오류 추적 기능을 살펴보세요. RUM용 오류 추적 탐색기를 보려면 [**Digital Experience** > **Error Tracking**][1]으로 이동합니다.

## 설정

{{< whatsnext desc="RUM에 대한 Datadog 오류 추적을 시작하려면 해당 설명서를 참조하세요:" >}}
    {{< nextlink href="real_user_monitoring/error_tracking/browser" >}}Browser{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/android" >}}Android{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/ios" >}}iOS{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/expo" >}}Expo{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/reactnative" >}}React Native{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/flutter" >}}Flutter{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/roku" >}}Roku{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: /ko/real_user_monitoring/
[3]: /ko/error_tracking/explorer