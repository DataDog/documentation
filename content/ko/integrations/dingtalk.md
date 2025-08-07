---
app_id: dingtalk
categories:
- 협업
- 알림
custom_kind: 통합
description: DingTalk is a free and all-in-one enterprise communication and collaboration
  platform
media: []
title: DingTalk
---
## 개요

DingTalk를 통합해 다음 작업을 실행할 수 있습니다.

- DingTalk에서 Datadog 알림 및 이벤트 알림 받기
- DingTalk 그룹과 메시지 및 그래프 공유

## 설치

The DingTalk integration is installed with the Datadog [DingTalk integration tile](https://app.datadoghq.com/integrations/dingtalk).

## 설정

다음에 따라 Datadog을 DingTalk 그룹과 통합합니다.

1. DingTalk 앱에서 _Messages_로 이동한 후 Datadog 통합을 추가할 그룹을 클릭합니다.
1. 오른쪽 상단에서  _Group Settings_ 아이콘(줄임표 모양)을 클릭하고 _Group Robot_을 선택합니다.
1. 로봇 그룹 메뉴에서 Datadog을 선택하고 `Add`을 클릭합니다.
1. 로봇의 이름을 입력하고 `Finished`을 클릭합니다. 그러면 웹훅(webhook) 주소가 반환됩니다.
1. 웹훅(webhook) 주소를 복사한 다음 `Finished`을 클릭합니다.
1. On the DingTalk [integration tile](https://app.datadoghq.com/integrations/dingtalk), enter the DingTalk group where you added the Datadog integration into the _Group Name_ field and paste the webhook address into the _Group Robot Webhook_ field. Group names can contain letters, digits, and underscores.
1. _Install Configuration_ (또는 _Update Configuration_)을 클릭합니다.

After installing or updating the integration, you can use the [`@-notification` feature](https://docs.datadoghq.com/monitors/notifications/#notification) with your DingTalk group name.

## 수집한 데이터

### Metrics

DingTalk 통합은 메트릭을 포함하지 않습니다.

### 이벤트

DingTalk 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

DingTalk 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.