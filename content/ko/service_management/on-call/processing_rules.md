---
further_reading:
- link: /service_management/on-call/
  tag: 설명서
  text: Datadog On-Call
title: 처리 규칙
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">On-Call은 선택한 <a href="/getting_started/site">Datadog 사이트</a> ({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>
{{< /site-region >}}

## 개요

On-call 처리 규칙을 사용하면 팀은 다양한 유형의 수신 이벤트에 대한 대응 전략을 맞춤 설정할 수 있습니다. 이를 통해 팀은 이벤트의 메타데이터를 기반으로 에스컬레이션 정책에 이벤트와 긴급도 수준을 추가할 수 있습니다. 긴급도가 낮은 페이지는 에스컬레이션 프로세스를 트리거하지 않습니다.

Datadog은 [팀을 On-Call에 온보딩][1]할 때 기본 처리 규칙을 생성합니다.

## 팀의 처리 규칙 보기

On-Call 팀의 처리 규칙을 보려면 [팀 목록][2]에서 팀 이름을 클릭하세요.

## 쿼리 구문

처리 규칙은 Datadog의 일반적인 쿼리 구문을 따릅니다. 지원되는 속성은 다음과 같습니다.

* `tags`: 수신 알림에 설정된 태그. 예: `tags.env:prod`.
* `groups`: 수신 알림이 특정 모니터 그룹과 관련이 있는지 확인. 예: `groups:"service:checkout-service"`.
* `priority`: 모니터의 우선 순위 필드 값. 가능한 값은 1부터 5까지. 예: `priority:(1 OR 2)`.
* `alert_status`: 모니터 상태 값. 가능한 값은 `error`, `warn`, `success`. 예: `alert_status:(error OR warn)`.

특정 필터를 적용하지 않으려면 `*`을 사용하세요.

## 순서

처리 규칙의 순서가 중요합니다. 시스템은 위에서 아래로 이동하여 첫 번째 일치 규칙에서 멈춥니다. 들어오는 알림과 일치하는 쿼리나 시간 필터가 없으면 기본 처리 규칙이 사용됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/service_management/on-call/teams
[2]: https://app.datadoghq.com/on-call/teams