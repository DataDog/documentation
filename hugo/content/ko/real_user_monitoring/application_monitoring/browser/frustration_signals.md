---
aliases:
- /ko/real_user_monitoring/frustration_signals
- /ko/real_user_monitoring/browser/frustration_signals/
description: RUM 불만 신호(연속 클릭, 무반응 클릭 및 오류 클릭 포함)를 활용하여 사용자 마찰 지점을 식별하고 사용자 경험을 개선하며
  이탈을 줄입니다.
further_reading:
- link: https://www.datadoghq.com/blog/analyze-user-experience-frustration-signals-with-rum/
  tag: 블로그
  text: Datadog 불만 신호로 사용자의 불편한 점 탐지
- link: /real_user_monitoring/platform/dashboards/usage#frustration-signals
  tag: 문서
  text: 불만 신호 대시보드
- link: /real_user_monitoring/explorer
  tag: 문서
  text: RUM Explorer에 대해 자세히 알아보기
- link: /session_replay/
  tag: 문서
  text: Session Replay에 대해 알아보기
title: 불만 신호
---
## 개요 {#overview}

불만 신호는 사용자가 불만을 표출하는 순간을 파악하여 애플리케이션에서 사용자 마찰이 가장 높은 지점을 식별하는 데 도움이 됩니다.

RUM은 3가지 유형의 불만 신호를 수집합니다.

연속 클릭
: 사용자가 1초 슬라이딩 창에서 요소를 3번 이상 클릭합니다.

무반응 클릭
: 사용자가 페이지에서 아무런 액션도 일으키지 않는 정적 요소를 클릭합니다.

오류 클릭
: 사용자가 JavaScript 오류가 발생하기 직전에 요소를 클릭합니다.

불만 신호를 활성화하면 Datadog은 기본적으로 3가지 신호 유형을 모두 수집합니다.

## 요구 사항 {#requirements}

먼저 Browser RUM SDK 버전 >= 4.14.0이 필요합니다.

불만 신호 수집을 시작하려면 SDK 구성에 다음을 추가하세요.

{{% collapse-content title="최신 버전" level="h3" expanded=true %}}

```javascript
window.DD_RUM.init({
  trackUserInteractions: true,
})
```

{{% /collapse-content %}}

{{% collapse-content title="v5.0.0 이전" level="h3" expanded=false %}}

```javascript
window.DD_RUM.init({
  trackUserInteractions: true,
  trackFrustrations: true
})
```

불만 신호에는 액션이 필요합니다. `trackFrustrations`를 활성화하면 `trackUserInteractions`가 자동으로 활성화됩니다.

{{% /collapse-content %}}

## 사용 방법 {#usage}

불만 신호는 [{{< ui >}}RUM Applications{{< /ui >}} 페이지][1]에서 사용자 불만의 원인을 나타내는 상위 수준 데이터 포인트로 표시됩니다. [RUM 탐색기][2]에 불만 발생 횟수 목록을 표시하려면 {{< ui >}}Options{{< /ui >}} 버튼을 클릭하고 `@session.frustration.count`에 대한 열을 추가하세요.

### 애플리케이션 목록 {#application-list}

브라우저 세션 목록 위로 마우스를 가져간 다음 세션을 클릭하여 사용자의 불만 클릭 동작을 관찰하세요. 또는 {{< ui >}}Frustrated Sessions{{< /ui >}}를 클릭하여 불만 신호가 있는 세션에 액세스하세요.

### 불만 신호 대시보드 탐색 {#explore-the-frustration-signals-dashboard}

{{< ui >}}Frustration Signals{{< /ui >}} 대시보드는 애플리케이션 전반에서 사용자가 느끼는 불만 수준에 대한 개요를 제공하며, 가장 불만이 많은 사용자와 불만 신호가 가장 많이 발생한 페이지 등의 항목을 표시합니다.

이 대시보드를 복제하고 필요에 맞게 사용자 지정할 수 있습니다. 자세한 내용은 [불만 신호 대시보드][3]를 참조하세요.

### 불만 신호 검색 {#search-for-frustration-signals}

[RUM 탐색기][4]에서 RUM이 수집한 모든 데이터를 검색하여 불만 신호의 추세를 파악하고, 더 큰 컨텍스트로 패턴을 분석하거나, [대시보드][5] 및 [모니터][6]로 내보낼 수 있습니다.

검색을 시작하려면 검색 쿼리에 패싯을 입력하세요. 사용 가능한 검색 필드는 다음과 같습니다.

불만 유형
: 불만 신호가 있는 액션을 찾습니다. 예를 들어, 연속 클릭이 발생한 액션을 보려면 검색 쿼리에 `action.frustration.type:rage_click`을 추가하세요.

불만 횟수
: 불만 신호가 발생한 세션 및 뷰를 찾습니다. 예를 들어, 최소 하나 이상의 불만 신호가 있는 사용자 세션이나 뷰를 찾으려면 검색 쿼리에 `session.frustration.count:>1` 또는 `view.frustration.count:>1`을 추가하세요.

#### 세션 {#sessions}

{{< ui >}}Frustration Count{{< /ui >}} 열에 값이 있는 세션을 클릭하여 탐지된 사용자 불만을 검토하세요. 신호 유형(`rage click`, `dead click` 또는 `error click`)과 세션 중에 발생한 일을 보여주는 이벤트 타임라인을 확인할 수 있습니다.

#### 뷰 {#views}

뷰를 클릭하면 `frustration detected` 태그가 있는 특정 페이지에서 사용자가 불만을 느꼈는지 확인할 수 있습니다.

{{< img src="real_user_monitoring/frustration_signals/frustration_signals_in_performance_tab.png" alt="성능 워터폴 그래프의 이벤트 드롭다운 메뉴에 있는 불만 신호 액션" style="width:90%;" >}}

성능 워터폴은 불만 신호를 포함하는 액션을 표시합니다.

{{< img src="real_user_monitoring/frustration_signals/actions_frustration_signal.png" alt="액션으로 탐지된 불만 신호" style="width:90%;" >}}

#### 액션 {#actions}

선택한 액션에 불만 신호가 포함된 경우 {{< ui >}}Actions{{< /ui >}} 탭에 `frustration detected` 태그가 표시됩니다.

액션에서 여러 번의 불만 신호가 발생할 경우 액션 패널의 {{< ui >}}What Happened{{< /ui >}} 아래에 표시됩니다.

{{< img src="real_user_monitoring/frustration_signals/actions_panel_multiple_frustration_signals.png" alt="What Happened 아래의 액션에서 탐지된 여러 불만 신호 유형" style="width:90%;" >}}

#### 오류 {#errors}

{{< ui >}}Errors{{< /ui >}} 탭에서 오류를 클릭하면 오류 세부 정보가 포함된 사이드 패널이 열립니다. 여기에서 불만 신호가 발생했는지 확인할 수 있습니다.

{{< img src="real_user_monitoring/frustration_signals/errors_tab.png" alt="액션 사이드 패널의 오류 탭" style="width:90%;" >}}

## Session Replay에서 불만 신호 보기 {#watch-frustration-signals-in-session-replay}

[Session Replay][7]에서 실제 사용자 활동을 비디오처럼 재현한 내용을 관찰할 수 있습니다. 리플레이는 사용자가 불만의 징후를 보일 때 취하는 행동에 대한 비디오 증거를 제공합니다.

Session Replay의 사용자 여정은 시간순으로 발생하는 이벤트를 자세히 보여줍니다. 이벤트 위로 마우스를 가져가면 리플레이의 해당 시점으로 이동할 수 있습니다(예: 무반응 클릭이 발생한 시점).

{{< img src="real_user_monitoring/frustration_signals/session_replay_frustration_signals.png" alt="브라우저 녹화에 불만 신호가 나타납니다." style="width:90%;" >}}

 자세한 내용은 [Session Replay 설명서][8]를 참조하세요.

## 불만 신호에 대한 알림 만들기 {#create-alerts-for-frustration-signals}

모니터를 만들고 불만 신호에 대한 알림을 설정하여 애플리케이션의 중요한 페이지에서 불만 신호가 발생할 경우 사용자 또는 팀에 알릴 수 있습니다.

예를 들어, 특정 페이지에서 불만 신호가 발생한 경우 알림을 설정하려면:

{{< img src="real_user_monitoring/frustration_signals/rum_monitor_frustration_count.png" alt="불만 신호 수에 대해 알림을 보내는 RUM 모니터를 만듭니다." style="width:90%;" >}}

자세한 내용은 [Real User Monitoring 모니터 설명서][9]를 참조하세요.

## 문제 해결 {#troubleshooting}

### 사용자가 키보드에서 키(예: Delete)를 누를 때 연속 클릭이 생성되지 않습니다 {#rage-clicks-are-not-being-created-when-a-user-presses-a-key-like-delete-on-the-keyboard}

불만 신호는 키보드 입력이 아닌 마우스 클릭으로 생성됩니다.

### 사이드 패널에는 세션의 불만 신호 수가 이벤트 타임라인과 다르다는 사실이 표시되지 않습니다 {#the-side-panel-does-not-show-that-a-session-has-a-different-number-of-frustration-signals-than-in-the-event-timeline}

세션이 라이브 상태인 경우 정보를 가져오는 중이므로 배너에 타임라인에 표시된 숫자와 다른 숫자가 반영될 수 있습니다.

<div class="alert alert-danger">
피드백을 제공하거나 기능 요청을 제출하려면 <a href="/help/">Datadog 지원팀</a>에 문의하세요.
</div>

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/list
[2]: /ko/real_user_monitoring/explorer/
[3]: /ko/real_user_monitoring/platform/dashboards/usage#frustration-signals
[4]: https://app.datadoghq.com/rum/explorer
[5]: /ko/dashboards/
[6]: /ko/monitors/
[7]: https://app.datadoghq.com/rum/replay/sessions/
[8]: /ko/session_replay/
[9]: /ko/monitors/types/real_user_monitoring/
[10]: mailto:success@datadoghq.com