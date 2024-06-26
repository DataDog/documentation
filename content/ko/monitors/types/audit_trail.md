---
aliases:
- /ko/monitors/create/types/audit_logs/
- /ko/monitors/create/types/audit_trail/
description: 지정된 유형의 감사 추적 이벤트가 감지되거나 임계값을 초과하면 알림을 보냅니다.
further_reading:
- link: /account_management/audit_trail/
  tag: 설명서
  text: 감사 추적에 대해 자세히 알아보기
- link: /monitors/notifications/
  tag: 설명서
  text: 모니터 알림 설정
- link: /monitors/downtimes/
  tag: 설명서
  text: 모니터 숨김을 위한 다운타임 예약
kind: documentation
title: 감사 추적 모니터
---

## 개요

감사 추적 모니터는 지정된 유형의 감사 이벤트가 지정된 기간 동안 사용자 정의 임계값을 초과하는 경우 알림을 보냅니다.

## 모니터 생성

Datadog에서 [감사 추적 모니터][1]를 생성하려면 기본 탐색을 사용하세요: *Monitors --> New Monitor --> Audit Trail*.

### 검색 쿼리 정의

감사 이벤트에 대한 검색 쿼리를 정의합니다. 검색어는 Log Explorer와 동일한 [검색 구문][2]을 따릅니다.

예를 들어, 특정 API 키가 특정 개수의 요청을 생성할 때 알림을 받으려면 `count by`를 해당 API 키 ID인 `@metadata.api_key.id`로 설정합니다. 그런 다음 특정 사용자 ID, `@usr.id` 또는 사용자 이메일, `@usr.email`을 기준으로 그룹화하여 요청하는 사용자를 명시하는 알림을 받을 수 있습니다.

### 경고 조건 설정

알림을 받으려는 값에 대한 알림 임계값을 설정합니다. 예를 들어 API 요청 수가 15개 이상에 도달할 때 알림을 받으려면 API 요청 수에 대한 알림 임계값을 `Alert threshold > 15`로 설정합니다. 임계값이 충족되기 전에 알림을 받으려면 알림 임계값을 15 미만의 숫자로 설정하세요.

트리거된 상태에서 이벤트를 해결하지 않거나 자동으로 해결하도록 선택할 수도 있습니다. `[Never]` (기본값)과 `After 24 Hours` 사이의 값을 설정합니다.

### Say what's happening

알림 이름을 만듭니다 (예: `API requests threshold met for {{[@usr.id].name}}`). [변수][3]를 사용하면 제목에 사용자 이름, 이메일 등을 자동으로 입력하여 어떤 계정이나 사용자가 알림을 트리거하는지 빠르게 파악할 수 있습니다.

모니터 메시지를 생성합니다. 여기에는 인시던트 발생 시 팀원이 어떻게 해결해야 하는지에 대한 단계가 포함됩니다.

그런 다음 모니터가 해결되지 않은 경우 `[Never]`에서 `Every 24 Hours`까지의 값을 선택하여 다시 알릴 수 있습니다. 또한 인시던트 발생 시 데이터의 상관 관계를 더 잘 나타내기 위해 태그와 우선 순위를 설정할 수도 있습니다.

### 팀에 알림 전송하기

알림을 보낼 서비스와 팀원을 선택하세요. 예를 들어 PagerDuty를 사용하여 대기 중인 컴플라이언스 팀에 알리거나 Slack 또는 이메일로 팀에 알림을 보내 평가를 시작할 수 있습니다.

또한, `Do Not Notify` 드롭다운 옵션을 사용하여 알림이 수정되면 서비스나 팀에 알리도록 선택할 수도 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/audit
[2]: /ko/logs/explorer/search_syntax/
[3]: /ko/monitors/notify/variables/