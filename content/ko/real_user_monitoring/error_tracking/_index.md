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
kind: 설명서
title: 웹 및 모바일 애플리케이션에 대한 오류 추적
---

## 개요

Datadog이 수집한 오류를 지속적으로 모니터링하는 것은 시스템 상태를 유지하는 데 매우 중요합니다. 개별 오류 이벤트가 많으면 문제 해결을 위해 오류의 우선순위를 정하기가 어려워집니다. 충돌을 추적, 분류, 디버깅하면 치명적인 오류가 웹 및 모바일 애플리케이션의 사용자 경험에 미치는 영향을 최소화할 수 있습니다.



{{< img src="real_user_monitoring/error_tracking/rum-error-tracking-2.png" alt="웹 및 모바일 애플리케이션의 충돌 보고서에서 문제를 표시하는 RUM용 오류 추적 탐색기" style="width:100%;" >}}

**웹 및 모바일 앱** 오류 추적에 대해 [RUM][2]을 설정하고 나면 이슈 목록이 카드로 채워집니다. [**UX Monitoring** > **Error Tracking**][1]으로 이동하여 열려 있는 문제, 무시된 문제 또는 모든 문제를 보고, 볼륨 또는 연령별로 문제를 정렬하며, 웹 및 모바일 애플리케이션의 모든 커스텀 및 기본 패싯별로 문제를 필터링할 수 있습니다.

오류 추적을 통해 다음을 수행할 수 있습니다:

- 오류 추적 이벤트에 대한 알림을 설정하세요. 이렇게 하면 발생할 수 있는 치명적인 문제에 대한 정보를 계속 확인할 수 있습니다.
- 유사한 오류를 이슈로 그룹화하여 중요한 오류를 쉽게 식별하고 노이즈를 줄일 수 있습니다.
- 시간 경과에 따라 문제를 추적하여 문제가 처음 시작된 시점, 계속 진행 중인지 여부, 문제가 발생하는 빈도를 파악합니다.
- 필요한 모든 컨텍스트를 한 곳에 모아 문제 해결을 용이하게 합니다.

## 소스 맵 업로드

{{< whatsnext desc="RUM용 Datadog 오류 추적 기능을 시작하려면 해당 설명서를 참조하여 프레임워크에 대한 소스 맵을 업로드하세요.:" >}}
    {{< nextlink href="real_user_monitoring/error_tracking/browser" >}}Browser{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/android" >}}Android{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/ios" >}}iOS{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/expo" >}}Expo{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/reactnative" >}}React Native{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/flutter" >}}Flutter{{< /nextlink >}}
{{< /whatsnext >}}

## 트러블슈팅 또는 디버깅을 시작하기 위한 이슈 검토

오류 추적은 웹 및 모바일 애플리케이션에서 수집된 충돌을 [오류 추적 탐색기][1]에서 이슈로 자동 분류합니다.

{{< img src="real_user_monitoring/error_tracking/issue-panel-2" alt="웹 및 모바일 애플리케이션의 충돌 보고서에서 문제를 표시하는 RUM용 오류 추적 탐색기" style="width:100%;" >}}

이슈를 클릭하면 스택 트레이스, 사용자 세션 타임라인, 메타데이터(사용자 위치, 버전, 충돌 보고서에 포함된 커스텀 속성 포함) 등의 디버깅 정보를 볼 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: /ko/real_user_monitoring/