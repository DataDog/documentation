---
description: Datadog 앱이 설치된 Slack 워크스페이스에서 Slack 작업을 사용하여 인시던트, On-Call, 모니터, 대시보드,
  워크플로, 양식 및 계정을 직접 관리합니다.
further_reading:
- link: /integrations/slack/?tab=datadogforslack
  tag: 설명서
  text: Slack 통합
title: Slack 작업
---
## 개요 {#overview}

Slack 작업은 Datadog 앱이 설치된 모든 Slack 워크스페이스에서 사용할 수 있습니다. 워크스페이스에서 `/dd`를 입력하여 사용 가능한 모든 작업이 나열된 작업 트레이를 엽니다. 또는 전체 명령을 직접 입력합니다.

## 인시던트 {#incidents}
인시던트 탐색을 위해 다음 명령을 사용하세요. 모든 명령에서 `/dd in`를 `/dd incident`의 별칭으로 사용할 수 있습니다. 자세한 내용은 [Slack과 Datadog Incident Management 통합][2]을 참조하세요.

| 명령 | 설명|
| ------------------ | ---------- |
| `/dd in` 또는 `/dd incident` | 인시던트를 선언합니다.|
| `/dd in test` | 테스트 인시던트를 선언합니다.|
| `/dd in update` 또는 `/dd in edit`| 인시던트의 제목, 상태, 심각도 및 속성을 업데이트합니다.|
| `/dd in responders`| 인시던트 대응 팀을 관리합니다.|
| `/dd in investigate` | Bits Investigation을 트리거합니다. |
| `/dd in summary` | AI로 인시던트 요약을 생성합니다. Gov 및 Gov2 리전에서는 사용할 수 없습니다.|
| `/dd in notify` | 인시던트에 대한 알림을 @-핸들로 전송합니다. |
| `/dd in list` | 진행 중인 인시던트 목록을 표시합니다.|
| `/dd in private`| 현재 채널을 보관하고, 비공개 채널을 생성하며, 기존의 모든 담당자를 추가합니다.|
| `/dd in public` | 인시던트 읽기 권한이 있는 모든 사용자가 인시던트와 타임라인을 볼 수 있도록 설정합니다. |
| `/dd followup` | 새로운 후속 작업을 생성합니다.|
| `/dd followup list`  | 인시던트 후속 작업 목록을 표시합니다.|
| `/dd task` | 인시던트 작업을 생성합니다.|
| `/dd task list` | 인시던트 작업 목록을 표시합니다.|
| `/dd shortcuts` | 인시던트 작업을 조회합니다.|

## On-Call {#on-call}
On-Call에 대해 다음 명령을 사용하세요. 자세한 내용은 [On-Call 페이지][3]를 참조하세요.

| 명령 | 설명|
| ------------------ | ---------- |
| `/dd page` | On-Call 팀에 호출을 보냅니다.|
| `/dd shifts`| 예정된 On-Call 교대 근무를 확인합니다.|
| `/dd override`| On-Call 교대 근무를 대신해 줄 사람을 요청합니다. |

## 모니터 {#monitors}
모니터에 대해 다음 명령을 사용하세요. 모니터에 Slack을 추가하는 방법에 대한 자세한 정보는 [모니터 알림][4]을 참조하세요.

| 명령 | 설명|
| ------------------ | ---------- |
| `/dd monitors` | 현재 경보 중인 모니터링 목록을 표시합니다.|


## 대시보드 {#dashboard}
[대시보드][5]에 대해 다음 명령을 사용하세요.

| 명령 | 설명|
| ------------------ | ---------- |
| `/dd dashboard` | 대시보드 위젯을 이 채널에 공유합니다.|


## 워크플로 {#workflows}
워크플로에 대해 다음 명령을 사용하세요. 워크플로에서 Slack을 사용하는 방법에 대한 자세한 내용은 [워크플로 트리거][6]를 참조하세요.

| 명령 | 설명|
| ------------------ | ---------- |
| `/dd workflow` | 자동화 워크플로를 실행합니다.|


## 양식 {#forms}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">
<strong>양식 공유</strong> Slack 작업은 {{< region-param key="dd_site_name" >}} 사이트에서 지원되지 않습니다.
</div>
{{% /site-region %}}

양식에 대해 다음 명령을 사용하세요. 자세한 내용은 [양식][8]을 참조하세요.

| 명령 | 설명|
| ------------------ | ---------- |
| `/dd`, 그런 다음 **양식 공유** | Datadog 양식을 검색하고 이 채널에 공유합니다. 수신자는 Slack에서 작성하거나 Datadog에서 열 수 있습니다. |


## 계정 {#accounts}
[계정 관리][7]에 다음 명령을 사용하세요.

| 명령 | 설명|
| ------------------ | ---------- |
| `/dd accounts` | 연결된 Datadog 계정을 관리합니다. |


[1]: /ko/integrations/slack/?tab=datadogforslack
[2]: /ko/incident_response/incident_management/setup_and_configuration/integrations/slack/#slack-commands
[3]: /ko/incident_response/on-call/pages/#through-slack
[4]: /ko/monitors/notify/#notification-recipients
[5]: /ko/dashboards/
[6]: /ko/actions/workflows/trigger/#slack-triggers
[7]: /ko/account_management/
[8]: /ko/actions/forms/