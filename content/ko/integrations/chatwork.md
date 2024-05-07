---
categories:
- collaboration
- notifications
dependencies: []
description: 팀의 Chatwork 룸에 Datadog 알림과 그래프를 전송하세요.
doc_link: https://docs.datadoghq.com/integrations/chatwork/
draft: false
git_integration_title: chatwork
has_logo: true
integration_id: chatwork
integration_title: Chatwork
integration_version: ''
is_public: true
kind: 통합
manifest_version: '1.0'
name: chatwork
public_title: Datadog-Chatwork 통합
short_description: 팀의 Chatwork 룸에 Datadog 알림과 그래프를 전송하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/chatwork/chatwork_event.png" alt="Chatwork Event" popup="true">}}

## 개요

Chatwork를 통합해 다음 작업을 실행할 수 있습니다.

- 스트림에 누군가가 게시물을 올리면 알림을 받습니다.
- 메트릭 알림이 트리거되면 알림을 받습니다.

## 설정

### 설치

1. 먼저 Datadog 업데이트를 게시할 Chatwork 조직 계정에서 Datadog 사용자를 생성합니다.
2. Chatwork API는 여전히 미리 보기 상태이므로 [액세스를 요청해야 합니다][1].
3. 확인 이메일을 기다립니다(최대 2일이 소요될 수 있음).
4. 토큰을 받으려면 [이러한 지침][2]을 따르세요.
5. 이 [필드]에 붙여넣기합니다.
6. 액세스를 원하는 채팅 이름과 ID를 입력합니다(ID는 채팅룸의 URL에서 찾을 수 있음).
7. 모든 코멘트에 대해 알림을 받으려면 확인란에 체크 표시합니다. 아니면 `@chatwork-chat_namesyntax`를 사용해야 합니다.
   {{< img src="integrations/chatwork/chatwork_tile.png" alt="Chatwork tile" popup="true">}}

8. [설정 저장][3]

## 수집한 데이터

### 메트릭

Chatwork 통합은 메트릭을 포함하지 않습니다.

### 이벤트

Chatwork 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Chatwork 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

[1]: https://www.chatwork.com/login.php?redirect=apply_beta&package=chatwork&subpackage=api&args=
[2]: http://developer.chatwork.com/ja/authenticate.html
[3]: https://app.datadoghq.com/integrations/chatwork
[4]: https://docs.datadoghq.com/ko/help/