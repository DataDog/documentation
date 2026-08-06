---
categories:
- 협업
- 알림
custom_kind: 통합
dependencies: []
description: Datadog 알림 및 그래프를 팀의 Google Chat 스페이스로 전송합니다.
doc_link: https://docs.datadoghq.com/integrations/google_hangouts_chat/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/google-hangouts-chat-integration/
  tag: 블로그
  text: Datadog과 Google Chat 통합하기
- link: https://developers.google.com/hangouts/chat/
  tag: 외부 문서
  text: Google Chat
git_integration_title: google_hangouts_chat
has_logo: true
integration_id: google-hangouts-chat
integration_title: Google Chat
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_hangouts_chat
public_title: Datadog-Google Chat 통합
short_description: Datadog 알림 및 그래프를 팀의 Google Chat 방으로 전송합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Google Chat을 Datadog에 연결하면 다음과 같이 팀 협업을 지원할 수 있습니다.

- 팀의 비공개 또는 공개 스페이스에서 동료와 그래프를 공유합니다.
- Google 채팅 내에서 Datadog이 전송한 경고 및 알림을 수신합니다.

## 설정

### 설치

Datadog 사이트의 [통합 타일][1]을 통해서 또는 Google Chat 스페이스에 봇을 추가하여 Google Chat 통합을 설치합니다.

### 구성

1. `@Datadog`을 사용하여 Google Chat 스페이스에 Datadog 애플리케이션을 추가합니다. **참고:** 채팅방에 추가하려면 [Datadog 챗봇을 허용 목록에 추가][2]하세요.
2. `@Datadog install`을 입력하여 Google Chat 스페이스에 Datadog 애플리케이션을 설치합니다. **참고:** 기본 도메인(`app.datadoghq.com`)이 아닌 다른 사이트에 설치하려면 `@Datadog install mydomain.datadoghq.eu`와 같이 명령어에 도메인을 추가합니다.
3. 봇의 안내에 따라 Datadog 계정에 로그인한 후 Datadog 사이트를 통해 설정합니다.
4. [`@-notification` 기능][3]을 활용하여 봇이 메시지를 게시하도록 하려는 채팅방의 `names` 및 `urls` 주소를 추가합니다.

{{% site-region region="us" %}}
### Datadog 챗봇 명령 요약
| 명령어                            | 설명                                                                                                                                                                                                                                   |
|------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@Datadog install (domain)`        | 설치 워크플로우를 시작합니다. **참고:** Datadog 계정 두 개 이상에 속한 경우 설치 워크플로우 도중 **계정 선택** 페이지가 표시됩니다.                                                                                |
| `@Datadog list installed accounts` | Google Chat이 설치된 모든 계정의 목록을 반환합니다.                                                                                                                                                                               |
| `@Datadog remove account`          | 특정 Datadog 계정에서 Google Chat을 삭제하는 워크플로우를 시작합니다. 설치된 모든 계정에 대한 삭제 링크가 포함된 카드가 반환됩니다. 삭제할 계정을 클릭하면 Datadog 챗봇이 삭제된 계정 이름으로 응답합니다. |
{{% /site-region %}}

## Datadog 계정에서 삭제하기
{{% site-region region="us" %}}
다음 세 가지 방법으로 Datadog 계정에서 Google Chat을 삭제할 수 있습니다.
1. `@Datadog remove account` 명령을 사용하여 스페이스 멤버가 선택한 Datadog 계정에서 챗봇을 삭제할 수 있습니다.
2. Datadog 계정으로 Google Chat 통합 타일에서 스페이스를 삭제합니다.
3. 스페이스에서 챗봇을 삭제하면 설치된 모든 계정에서 챗봇이 삭제됩니다.
{{% /site-region %}}

{{% site-region region="ap1,us5,us3,eu,gov" %}}
Datadog 계정으로 Google Chat 통합 타일에서 스페이스를 삭제합니다.
{{% /site-region %}}

## 수집한 데이터

### 메트릭

Google Chat 통합은 메트릭을 포함하지 않습니다.

### 이벤트

Google Chat 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Chat 통합은 서비스 점검을 포함하지 않습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/google_hangouts_chat
[2]: https://support.google.com/a/answer/6089179
[3]: https://docs.datadoghq.com/ko/monitors/notifications/#notification