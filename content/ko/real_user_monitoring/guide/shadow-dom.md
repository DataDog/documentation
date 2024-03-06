---
description: Session Replay와의 Shadow DOM 호환성에 대한 안내입니다.
further_reading:
- link: /real_user_monitoring/session_replay/
  tag: 설명서
  text: 세션 재생에 대해 알아보기
kind: 가이드
title: Shadow DOM 구성요소로 세션 재생 강화
---

<div class="alert alert-warning">
Datadog는 Shadow DOM만 지원합니다.
</div>

## 개요

Shadow DOM은 개발자가 격리되고 재사용 가능한 구성 요소를 코드에 통합할 수 있도록 하여 더 모던한 웹사이트를 구축하는 데 도움을 줍니다. Shadow DOM은 최근 웹 개발에서 많이 사용됩니다. 깔끔한 코드 구조를 유지하고 스타일 충돌을 피하는 데 유용한 도구입니다.

## 설정

[RUM 브라우저 SDK][1] `v4.31.0`부터 Datadog는 추가 구성 없이 개방형 Shadow DOM을 지원합니다. 섀도우 루트 내부에 있는 구성 요소는 Session Replay에 의해 자동으로 캡처됩니다. 이 기능은 다음에 대해서는 지원되지 않습니다.
* 종료된 Shadow DOM
* 동적 Shadow DOM
* 동적 CSS 스타일 변경

**참고**: 개방형 Shadow DOM 호환성은 주류 프레임워크에서 테스트되었습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/browser/