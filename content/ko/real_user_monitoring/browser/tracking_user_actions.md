---
algolia:
  tags:
  - 사용자 액션
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: 블로그
  text: Datadog 실제 사용자 모니터링 소개
- link: /real_user_monitoring/explorer/
  tag: 설명서
  text: Datadog에서 보기 탐색
- link: /real_user_monitoring/explorer/visualize/
  tag: 설명서
  text: 이벤트에 시각화 적용
- link: /real_user_monitoring/platform/dashboards/
  tag: 설명서
  text: RUM 대시보드에 대해 알아보기
kind: 설명서
title: 사용자 액션 추적
---

## 개요

Browser Monitoring은 사용자가 활동하는 중에 수행되는 사용자 상호 작용을 자동으로 감지하여 애플리케이션의 모든 클릭을 수동으로 계측할 필요 없이 사용자 행동에 대한 인사이트를 제공합니다.

다음과 같은 목표를 달성할 수 있습니다:

* 주요 상호작용(예: **Add to cart** 버튼 클릭)의 성과를 파악합니다.
* 기능 채택 정량화
* 특정 브라우저 오류로 이어진 단계 파악하기

## 수집 중인 정보 관리

`trackUserInteractions` 초기화 파라미터를 사용하면 애플리케이션에서 사용자 클릭을 수집할 수 있습니다. 이는 사용자가 상호작용한 요소를 확인하기 위해 페이지에 있는 민감한 개인 데이터가 포함될 수 있음을 의미합니다.

Datadog에 전송되는 정보를 제어하려면 [액션 이름을 수동으로 설정](#declare-a-name-for-click-actions)하거나, [Datadog Browser SDK for RUM에서 글로벌 스크러빙 규칙을 구현][1]하세요.

## 사용자 상호작용 추적

RUM Browser SDK는 클릭을 자동으로 추적합니다. **다음 조건이 모두 충족**되면 클릭 액션이 생성됩니다:

* 클릭 이후의 활동이 감지됩니다. 자세한 내용은 [페이지 활동 계산 방법][2]을 참조하세요.
* 클릭해도 새 페이지가 로드되지 않는 경우, Datadog Browser SDK는 다른 RUM 보기 이벤트를 생성합니다.
* 액션의 이름을 생성할 수 있습니다. 자세한 내용은 [클릭 액션 이름 선언하기](#declare-a-name-for-click-actions)를 참조하세요.

## 액션 타이밍 메트릭

모든 RUM 이벤트 유형의 기본 속성에 대한 자세한 내용은 [수집된 RUM 브라우저 데이터][3]를 참조하세요.

| 메트릭    | 유형   | 설명              |
|--------------|--------|--------------------------|
| `action.loading_time` | 숫자 (ns) | 액션 로딩 시간.  |
| `action.long_task.count`        | 숫자      | 이 액션에 대해 수집된 모든 긴 작업의 수. |
| `action.resource.count`         | 숫자      | 이 액션에 대해 수집된 모든 리소스의 수. |
| `action.error.count`      | 숫자      | 이 액션에 대해 수집된 모든 오류의 수.|

Datadog Browser SDK for RUM은 모든 클릭 후 페이지 활동을 모니터링하여 작업 로딩 시간을 계산합니다. 페이지에 더 이상 활동이 없으면 액션이 완료된 것으로 간주합니다. 자세한 내용은 [페이지 활동 계산 방법][2]을 참조하세요.

샘플링 또는 글로벌 컨텍스트 설정에 대한 자세한 내용은 [RUM 데이터 및 컨텍스트 수정하기][1]를 참조하세요.

## 액션 속성

| 속성    | 유형   | 설명              |
|--------------|--------|--------------------------|
| `action.id` | 문자열 | 사용자 액션의 UUID. |
| `action.type` | 문자열 | 사용자 액션의 유형. 커스텀 사용자 액션의 경우 `custom`으로 설정됩니다. |
| `action.target.name` | 문자열 | 사용자가 상호 작용한 요소. 자동으로 수집된 액션에만 해당합니다. |
| `action.name` | 문자열 | 사용자 친화적인 이름이 생성됩니다(예: `Click on #checkout`). 커스텀 사용자 액션의 경우 API 호출에 지정된 액션 이름입니다. |

## 클릭 액션의 이름 선언

Datadog Browser SDK for RUM은 다양한 전략을 사용하여 클릭 액션의 이름을 얻습니다. 더 많은 제어를 원한다면 클릭 가능한 요소(또는 그 상위 요소)에서 액션의 이름을 지정하는 데 사용되는 `data-dd-action-name` 속성을 정의할 수 있습니다.

예시:

```html
<a class="btn btn-default" href="#" role="button" data-dd-action-name="Login button">Try it out!</a>

<div class="alert alert-danger" role="alert" data-dd-action-name="Dismiss alert">
    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
    <span class="visually-hidden">Error:</span>
    Enter a valid email address
</div>
```

[버전 2.16.0][4]부터는 `actionNameAttribute` 초기화 파라미터를 사용하여 액션의 이름을 지정하는 데 사용되는 커스텀 속성을 지정할 수 있습니다.

예시:

```html
<script>
  window.DD_RUM.init({
    ...
    trackUserInteractions: true,
    actionNameAttribute: 'data-custom-name',
  ...
  })
</script>

<a class="btn btn-default" href="#" role="button" data-custom-name="Login button">Try it out!</a>
```

`data-dd-action-name`은 두 속성이 모두 요소에 있을 때 선호됩니다.

## 커스텀 액션 전송

사용자 상호작용 수집을 확장하려면 `addAction` API를 사용하여 커스텀 액션을 전송하세요. 이러한 커스텀 액션은 사용자가 활동하는 중에 발생하는 이벤트와 관련된 정보를 전송합니다.

자세한 내용은 [커스텀 액션 보내기][5]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/browser/advanced_configuration/
[2]: /ko/real_user_monitoring/browser/monitoring_page_performance/#how-page-activity-is-calculated
[3]: /ko/real_user_monitoring/browser/data_collected/#default-attributes
[4]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2160
[5]: /ko/real_user_monitoring/guide/send-rum-custom-actions