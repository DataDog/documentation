---
aliases:
- /ko/real_user_monitoring/frustration_signals
further_reading:
- link: https://www.datadoghq.com/blog/analyze-user-experience-frustration-signals-with-rum/
  tag: 블로그
  text: Datadog 좌절 신호를 통해 사용자의 고충을 파악
- link: /real_user_monitoring/platform/dashboards/usage#frustration-signals
  tag: 설명서
  text: 좌절 신호 대시보드
- link: /real_user_monitoring/explorer
  tag: 설명서
  text: RUM 탐색기에 대해 자세히 알아보기
- link: /real_user_monitoring/session_replay
  tag: 설명서
  text: 세션 재생에 대해 알아보기
title: 좌절 신호
---

## 개요

좌절 신호는 사용자가 불만을 표시하는 순간을 표시하여 애플리케이션에서 사용자 마찰이 가장 높은 지점을 식별하는 데 도움이 됩니다.

RUM은 세 가지 유형의 좌절 신호를 수집합니다:

Rage Clicks
: 사용자는 1초 슬라이딩 창에서 요소를 세 번 이상 클릭합니다.

Dead Clicks
: 사용자가 페이지에 아무런 액션도 생성하지 않는 정적 요소를 클릭합니다.

Error Clicks
: 사용자가 JavaScript 오류가 발생하기 직전에 요소를 클릭합니다.

좌절 신호를 활성화함으로써 Datadog은 기본적으로 세 가지 신호 유형을 모두 수집합니다.

## 필수 요건

먼저 Browser RUM SDK 버전 >= 4.14.0이 필요합니다.

좌절 신호 수집을 시작하려면 SDK 구성에 다음을 추가합니다:

<details open>
  <summary>Latest version</summary>

```javascript
window.DD_RUM.init({
  trackUserInteractions: true,
})
```

</details>
<details>
  <summary>Before <code>v5.0.0</code></summary>

```javascript
window.DD_RUM.init({
  trackUserInteractions: true,
  trackFrustrations: true
})
```

좌절 신호에는 조치가 필요합니다. `trackFrustrations`을 활성화하면 `trackUserInteractions`가 자동으로 활성화됩니다.
</details>

## 사용량

좌절 신호는 [**RUM Applications** 페이지][1]에서 사용자 좌절 원인을 나타내는 상위 수준의 데이터 포인트로 나타납니다. [RUM 탐색기][2]에서 좌절 횟수 목록을 표시하려면 **Options** 버튼을 클릭하고 `@session.frustration.count`에 대한 열을 추가합니다.

### 애플리케이션 목록

브라우저 세션 목록 위에 마우스를 올려놓고 세션을 클릭하여 사용자가 좌절을 느끼는 클릭 동작을 관찰하거나 **Frustrated Sessions**를 클릭하여 좌절 신호가 있는 세션에 액세스합니다.

### 좌절 신호 대시보드 탐색

**Frustration Signals** 대시보드는 애플리케이션 전반에서 사용자가 느끼는 좌절 수준에 대한 개요를 제공하며, 가장 불만이 많은 사용자 및 좌절 신호가 가장 많이 발생한 페이지와 같은 주제를 표시합니다.

이 대시보드를 복제하여 필요에 맞게 사용자 지정할 수 있습니다. 자세한 내용은 [좌절 신호 대시보드][3]를 참조하세요.

### 좌절 신호 검색

[RUM 탐색기][4]에서 RUM이 수집한 모든 데이터를 검색하여 좌절 신호의 추세를 파악하고, 더 큰 컨텍스트로 패턴을 분석하거나, [대시보드][5] 및 [모니터][6]로 내보낼 수 있습니다.

검색 쿼리에 패싯을 입력하여 검색을 시작합니다. 사용 가능한 검색 필드는 다음과 같습니다:

Frustration Type
: 좌절 신호가 있는 액션을 찾습니다. 예를 들어, 분노 클릭이 발생한 액션을 보려면 검색 쿼리에 `action.frustration.type:rage_click`를 추가합니다.

Frustration Count
: 좌절 신호가 발생한 세션 및 보기를 찾습니다. 예를 들어, 좌절 신호가 적어도 하나 이상 있는 사용자 세션 또는 보기를 찾으려면 `session.frustration.count:>1` 또는 `view.frustration.count:>1`를 검색 쿼리에 추가합니다.

#### 세션

**Frustration Count** 열에 값이 있는 세션을 클릭하여 감지된 사용자 좌절을 조사할 수 있습니다. 신호의 유형(`rage click`, `dead click` 또는 `error click`)과 이벤트 타임라인을 통해 세션 중에 어떤 일이 발생했는지 확인할 수 있습니다.

#### 보기

보기를 클릭하면 `frustration detected` 태그가 있는 특정 페이지에서 사용자가 불만을 느꼈는지 확인할 수 있습니다.

{{< img src="real_user_monitoring/frustration_signals/frustration_signals_in_performance_tab.png" alt="성능 워터폴 그래프의 이벤트 드롭다운 메뉴에서 좌절 신호 액션을 확인하세요." style="width:90%;" >}}

성능 워터폴은 좌절 신호를 포함하는 액션을 표시합니다.

{{< img src="real_user_monitoring/frustration_signals/actions_frustration_signal.png" alt="액션으로 감지된 좌절 신호" style="width:90%;" >}}

#### 액션

**Actions** 탭은 선택한 액션에 좌절 신호가 포함되어 있는 경우 `frustration detected` 태그를 표시합니다.

액션에서 여러 번의 좌절 신호가 발생할 경우 액션 패널의 **What Happened** 아래에 표시됩니다.

{{< img src="real_user_monitoring/frustration_signals/actions_panel_multiple_frustration_signals.png" alt="What Happened 아래의 액션에서 여러 가지 좌절 신호 유형이 감지되었습니다." style="width:90%;" >}}

#### 오류

**Errors** 탭에서 오류를 클릭하면 오류 세부 정보가 있는 사이드 패널이 열립니다. 좌절 신호가 발생했는지 확인할 수 있습니다.

{{< img src="real_user_monitoring/frustration_signals/errors_tab.png" alt="액션 사이드 패널의 오류 탭" style="width:90%;" >}}

## 세션 재생에서 좌절 신호 보기

[세션 재생][7]에서는 실제 사용자 활동의 비디오와 같은 복제본을 관찰할 수 있습니다. 세션 재생은 사용자가 좌절의 징후를 보일 때 취하는 행동에 대한 비디오 증거를 제공합니다.

세션 재생의 사용자 이동 경로는 시간 순서대로 발생하는 이벤트를 자세히 설명합니다. 이벤트 위로 마우스를 가져가면 재생에서 해당 시점으로 이동합니다(예: 데드 클릭이 발생한 시점).

{{< img src="real_user_monitoring/frustration_signals/session_replay_frustration_signals.png" alt="브라우저 레코딩에 좌절 신호가 나타납니다." style="width:90%;" >}}

 자세한 내용은 [세션 재생 설명서][8]를 참조하세요.

## 좌절 신호에 대한 알림 만들기

모니터를 만들고 좌절 신호에 대한 알림을 설정하여 애플리케이션의 중요한 페이지에서 좌절 신호가 발생할 경우 사용자 또는 팀에 알릴 수 있습니다.

예를 들어, 특정 페이지에서 좌절 신호가 발생한 경우 알림을 설정하려면:

{{< img src="real_user_monitoring/frustration_signals/rum_monitor_frustration_count.png" alt="좌절 신호 횟수를 알려주는 RUM 모니터 만들기" style="width:90%;" >}}

자세한 내용은 [실제 사용자 모니터링 모니터 설명서][9]를 참조하세요.

## 트러블슈팅

### 사용자가 키보드에서 키(예: Delete)를 누를 때 분노 클릭이 생성되지 않습니다.

좌절 신호는 키보드 입력이 아닌 마우스 클릭으로 생성됩니다.

### 사이드 패널에는 세션에 이벤트 타임라인과 다른 수의 좌절 신호가 있음이 표시되지 않습니다.

세션이 라이브 상태인 경우 정보를 가져오는 중이므로 배너에 타임라인에 표시된 숫자와 다른 숫자가 반영될 수 있습니다.

<div class="alert alert-danger">
피드백을 제공하거나 기능 요청을 제출하려면 <a href="/help/">Datadog 지원팀</a>에 문의하세요.
</div>

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/list
[2]: /ko/real_user_monitoring/explorer/
[3]: /ko/real_user_monitoring/platform/dashboards/usage#frustration-signals
[4]: https://app.datadoghq.com/rum/explorer
[5]: /ko/dashboards/
[6]: /ko/monitors/
[7]: https://app.datadoghq.com/rum/replay/sessions/
[8]: /ko/real_user_monitoring/session_replay/browser/
[9]: /ko/monitors/types/real_user_monitoring/
[10]: mailto:success@datadoghq.com