---
description: Session Replay와의 Shadow DOM 호환성에 대한 안내입니다.
further_reading:
- link: /session_replay/
  tag: 문서
  text: Session Replay에 대해 알아보기
title: Shadow DOM 구성요소로 세션 재생 강화하기
---
<div class="alert alert-danger">
Datadog은 open Shadow DOM만 지원합니다.
</div>

## 개요 {#overview}

Shadow DOM을 사용하면 개발자가 격리된 재사용 가능 구성 요소를 코드에 통합하여 더 현대적인 웹사이트를 구축할 수 있습니다. 깔끔한 코드 구조를 유지하고 스타일 충돌을 방지하기 위해 자주 사용되는 Shadow DOM은 현대 웹 개발에서 점점 더 널리 사용되고 있습니다. 

## 설정 {#setup}

[RUM Browser SDK][1] `v4.31.0`부터 Datadog은 추가 구성 없이 open Shadow DOM을 지원합니다. shadow root 내부의 구성 요소는 Session Replay에서 자동으로 캡처됩니다. 이 기능은 다음 항목을 지원하지 않습니다.
* closed Shadow DOM
* dynamic Shadow DOM
* 동적 CSS 스타일 변경

**참고**: open Shadow DOM 호환성은 주요 프레임워크에서 테스트되었습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/application_monitoring/browser/