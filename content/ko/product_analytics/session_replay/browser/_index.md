---
description: 세션 재생을 통해 사용자의 웹 검색 경험을 캡처하고 시각적으로 재생하는 방법에 대해 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: 블로그
  text: Datadog 세션 재생을 사용하여 실시간 사용자 여정 보기
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: 블로그
  text: 퍼널 분석을 사용하여 주요 사용자 흐름을 파악하고 최적화하기
- link: https://www.datadoghq.com/blog/zendesk-session-replay-integration/
  tag: 블로그
  text: Zendesk 및 Datadog Session Replay를 통해 사용자가 경험하는 문제를 시각적으로 재현합니다.
- link: /product_analytics/analytics_explorer
  tag: 설명서
  text: Analytics 탐색기에서 Product Analytics 데이터를 시각화하세요.
- link: /integrations/content_security_policy_logs
  tag: 설명서
  text: Datadog으로 CSP 위반 감지 및 집계
title: Browser Session Replay
---


## 개요

세션 재생은 사용자의 웹 브라우징 경험을 캡처하고 시각적으로 재생할 수 있도록 하여 사용자 경험 모니터링을 확장합니다. 세션 재생은 RUM 성능 데이터와 결합하여 오류 식별, 재현 및 해결에 유용하며 웹 애플리케이의 사용 패턴 및 설계상의 함정에 대한 인사이트를 제공합니다.

RUM Browser SDK는 [오픈 소스][1]이며 오픈 소스 [rrweb][2] 프로젝트를 활용합니다.

## 세션 재생 레코더

세션 재생 레코더는 RUM Browser SDK의 일부입니다. 레코더는 웹 페이지에서 발생하는 이벤트(예: DOM 수정, 마우스 이동, 클릭, 입력 이벤트)를 해당 이벤트의 타임스탬프와 함께 추적 및 기록하여 브라우저의 DOM 및 CSS의 스냅샷을 캡처합니다.

그런 다음 Datadog은 웹 페이지를 재구축하고 재생 보기에서 적절한 시점에 기록된 이벤트를 다시 적용합니다. 세션 재생은 일반적인 RUM 세션과 동일한 30일 보존 정책을 따릅니다.

세션 재생 레코더는 IE11을 제외한 RUM Browser SDK에서 지원하는 모든 브라우저를 지원합니다. 자세한 내용은 [브라우저 지원 테이블][3]을 참조하세요.

세션 재생이 네트워크에 미치는 영향을 줄이고 세션 재생 레코더가 애플리케이션 성능에 미치는 오버헤드를 최소화하기 위해, Datadog은 데이터를 전송하기 전에 데이터를 압축합니다. 또한 Datadog은 대부분의 CPU 집약적인 작업(예: 압축)을 전용 웹 워커에 위임하여 브라우저의 UI 스레드 부하를 줄입니다. 예상되는 네트워크 대역폭 영향은 100kB/분 미만입니다.

## 설정

세션 재생은 RUM Browser SDK에서 사용할 수 있으며, 세션 재생을 위한 데이터 수집을 시작하려면 RUM 애플리케이션 생성, 클라이언트 토큰 생성 및 RUM Browser SDK 초기화를 통해 [Datadog RUM 브라우저 모니터링][4]을 설정하세요. 모바일 환경에서의 설정은 [모바일 세션 재생][5]을 참조하세요.

<div class="alert alert-info">Session Replay는  SDK 버전 3.6.0 또는 이후 버전에서 지원됩니다.</div>

## 사용량

RUM Browser SDK v5.0.0부터 Session Replay는 `init()` 호출 시 자동으로 녹화를 시작합니다. 상황에 따라 녹화를 시작하려면 `startSessionReplayRecordingManually` init 파라미터를 사용하고 `startSessionReplayRecording()`를 호출하세요.

예를 들어, 인증된 사용자 세션만 기록하려면 다음을 따르세요.

```javascript
window.DD_RUM.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100,
  startSessionReplayRecordingManually: true,
  ...
});

if (user.isAuthenticated) {
    window.DD_RUM.startSessionReplayRecording();
}
```

세션 재생 기록을 중지하려면 `stopSessionReplayRecording()`를 호출합니다.

<div class="alert alert-danger">v5.0.0 이전 버전의 RUM Browser SDK를 사용하는 경우  Session Replay 녹화가 자동으로 시작되지 않습니다. 녹화를 시작하려면 <code>startSessionReplayRecording</code>을 호출하세요.

## 세션 재생 비활성화

세션 레코딩을 중단하려면 `sessionReplaySampleRate`을 `0`으로 설정하세요. 그러면 [Browser RUM & Session Replay 플랜][6]의 데이터 수집이 중단됩니다.

<div class="alert alert-danger">v5.0.0 이전 버전의 RUM Browser SDK를 사용하는 경우 <code>replaySampleRate</code>를 <code>0</code>으로 설정하세요.</div>

## 재생 기록

플레이어 페이지에 표시된 **watched** 횟수를 클릭하면 해당 세션 리플레이를 누가 시청했는지 확인할 수 있습니다. 이 기능을 사용하면 녹화 내용을 공유하려고 했던 사람이 이미 해당 내용을 시청했는지 확인할 수 있습니다.

{{< img src="real_user_monitoring/session_replay/session-replay-playback-history.png" alt="세션 녹화를 본 사람 확인" style="width:100%;" >}}

기록에는 플레이어 페이지나 [노트북][8] 또는 사이드 패널과 같은 내장 플레이어에서 발생한 재생만 포함됩니다. 해당 재생은 [Audit Trail][7] 이벤트도 생성합니다. 썸네일 미리보기는 기록에 포함되지 않습니다.

자신의 재생 기록을 보려면 [My Watch History][9] 재생 목록을 확인하세요.

## 모바일 세션 재생

[모바일 세션 재생][5]에 대해 알아보세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk
[2]: https://www.rrweb.io/
[3]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[4]: /ko/real_user_monitoring/browser/
[5]: /ko/real_user_monitoring/session_replay/mobile/
[6]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay
[7]: https://docs.datadoghq.com/ko/account_management/audit_trail/
[8]: https://docs.datadoghq.com/ko/notebooks/
[9]: https://app.datadoghq.com/rum/replay/playlists/my-watch-history