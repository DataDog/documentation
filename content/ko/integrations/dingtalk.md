---
categories:
- 협업
- 알림
custom_kind: 통합
dependencies: []
description: 팀의 DingTalk 그룹에 Datadog 알림과 그래프를 전송하세요.
doc_link: https://docs.datadoghq.com/integrations/dingtalk/
draft: false
git_integration_title: dingtalk
has_logo: true
integration_id: dingtalk
integration_title: DingTalk
integration_version: ''
is_public: true
manifest_version: '1.0'
name: dingtalk
public_title: Datadog-DingTalk 통합
short_description: 팀의 DingTalk 그룹에 Datadog 알림과 그래프를 전송하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

DingTalk를 통합해 다음 작업을 실행할 수 있습니다.

-   DingTalk에서 Datadog 알림 및 이벤트 알림 받기
-   DingTalk 그룹과 메시지 및 그래프 공유

## 설치

DingTalk 통합은 Datadog [DingTalk 통합 타일][1]과 함께 설치됩니다.

## 설정

다음에 따라 Datadog을 DingTalk 그룹과 통합합니다.

1. DingTalk 앱에서 _Messages_로 이동한 후 Datadog 통합을 추가할 그룹을 클릭합니다.
2. 오른쪽 상단에서  _Group Settings_ 아이콘(줄임표 모양)을 클릭하고 _Group Robot_을 선택합니다.
3. 로봇 그룹 메뉴에서 Datadog을 선택하고 `Add`을 클릭합니다.
4. 로봇의 이름을 입력하고 `Finished`을 클릭합니다. 그러면 웹훅(webhook) 주소가 반환됩니다.
5. 웹훅(webhook) 주소를 복사한 다음 `Finished`을 클릭합니다.
6. DingTalk [통합 타일][1]의 _Group Name_ 필드에 Datadog 통합을 추가한 DingTalk 그룹을 입력하고, _Group Robot Webhook_ 필드에 웹훅(webhook) 주소를 붙여넣습니다. 그룹 이름에 문자, 숫자, 밑줄을 포함할 수 있습니다.
7. _Install Configuration_ (또는 _Update Configuration_)을 클릭합니다.

통합을 설치하거나 업데이트한 후 [`@-notification` 기능][2]을 DingTalk 그룹명으로 사용할 수 있습니다.

## 수집한 데이터

### 메트릭

DingTalk 통합은 메트릭을 포함하지 않습니다.

### 이벤트

DingTalk 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

DingTalk 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://app.datadoghq.com/integrations/dingtalk
[2]: https://docs.datadoghq.com/ko/monitors/notifications/#notification
[3]: https://docs.datadoghq.com/ko/help/