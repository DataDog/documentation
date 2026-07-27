---
categories:
- collaboration
- notifications
custom_kind: 통합
dependencies: []
description: ' Datadog 알림 및 그래프를 팀의 Hipchat 방으로 보내세요.'
doc_link: https://docs.datadoghq.com/integrations/hipchat/
draft: false
git_integration_title: hipchat
has_logo: true
integration_id: ''
integration_title: HipChat
integration_version: ''
is_public: true
manifest_version: '1.0'
name: hipchat
public_title: Datadog-HipChat 통합
short_description: Datadog 알림 및 그래프를 팀의 Hipchat 방으로 전송하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/hipchat/hipchat_graph.png" alt="Hipchat 그래프" popup="true">}}

## 개요

Hipchat 통합에서 Datadog를 통해 알림을 Hipchat 방 또는 개별 핸들로 전송할 수 있습니다. 다음을 전송할 수 있습니다.

- Datadog 모니터가 트리거될 때 메시지 및 그래프
- 이벤트 스트림 활동에 대한 메시지(예: 팀원의 댓글)

## 설정

### 설정

1. Datadog에 대한 [새 액세스 토큰을 생성합니다[1]. 알림 수준 액세스만 필요합니다.
2. 키를 복사하여 [HipChat 통합 타일][2]에 입력합니다.
3. Datadog로 메시지를 보낼 수 있는 방 이름을 입력합니다.
   설정된 모든 방에서 모든 댓글에 대해 알림을 받으려면 이 확인란을 선택합니다. 선택하지 않은 경우, 댓글 작성자는 HipChat으로 보낼 각 메시지에 `@hipchat-<CHAT_NAME>`을 포함해야 합니다.

4. 설정을 저장합니다.

또한 `@hipchat-<CHAT_NAME>`을 사용하여 그래프를 공유하거나 HipChat 방에 모니터링 알림을 전송할 수도 있습니다.

<div class="alert alert-danger">
HipChat API V1 토큰을 사용 중이고 채팅 핸들에 쉼표나 대괄호와 같은 특수 문자가 포함되어 있는 경우, 핸들을 입력할 때 이스케이프 처리할 필요가 없으며 자동 완성 상자가 자동으로 처리해 줍니다.
</div>

#### HipChat 서버

자체 HipChat 서버를 호스팅하는 경우 [Datadog-Hipchat 타일][2]에 서버의 호스트명을 입력합니다. 서버는 인터넷에서 액세스할 수 있어야 합니다.

HipChat 서버의 인증서가 자체 서명된 경우에만 **SSL 무시** 확인란을 선택합니다.

{{< img src="integrations/hipchat/hipchat_hostname.png" alt="Hipchat 호스트명" popup="true">}}

## 수집한 데이터

### 메트릭

Hipchat 통합에는 메트릭이 포함되어 있지 않습니다.

### 이벤트

Hipchat 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Hipchat 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하시나요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://www.hipchat.com/admin/api
[2]: https://app.datadoghq.com/integrations/hipchat
[3]: https://docs.datadoghq.com/ko/help/