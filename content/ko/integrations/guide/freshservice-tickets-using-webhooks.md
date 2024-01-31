---
author: Trevor Veralrud
further_reading:
- link: /integrations/webhooks/
  tag: 설명서
  text: Webhooks 통합
kind: 가이드
title: Webhooks를 사용한 Freshservice 티켓
---

이 가이드는 모니터 알림 발생 시 Datadog Webhooks 통합을 사용하여 Freshservice에서 새 티켓을 여는 방법을 보여줍니다.

## 구성

시작하려면 [Webhooks 통합 타일][1]을 열고 Configuration 탭으로 이동한 다음 하단 양식으로 스크롤하여 새 Webhook을 추가하세요.

### 이름

Webhook에 이름을 제공하세요. 이 이름은 모니터 메시지([사용법](#usage) 참조)에서 `@webhook-<NAME>`과 함께 사용됩니다. 예를 들어 Webhook freshservice의 이름을 지정하면 모니터 메시지에 `@webhook-freshservice`를 언급하여 모니터에서 티켓을 열 수 있습니다.

### URL

Freshservice에는 두 가지 버전의 API가 있습니다. 이 가이드에서는 V2를 사용하지만 JSON 페이로드를 약간 수정하여 V1을 사용할 수도 있습니다.

URL 필드에 다음 엔드포인트를 입력합니다.

`https://<YOUR_DOMAIN>.freshservice.com/api/v2/tickets`

### 페이로드

새 티켓 JSON 페이로드를 입력하세요. 다음 예에서는 필수 필드만 사용하므로 페이로드 사용자 지정에 대한 추가 옵션은 [Freshservice의 티켓 엔드포인트][2]를 확인하세요.

```json
{
  "email": "[티켓과 연결할 이메일 주소]",
  "subject": "$EVENT_TITLE",
  "description": "<img src=\"$SNAPSHOT\" /><hr/>$TEXT_ONLY_MSG",
  "status": 2,
  "priority": 2
}
```

**참고**:

* `$EVENT_TITLE`과 같은 값은 Webhook 통합에서 사용되는 변수입니다. 이러한 변수와 해당 의미의 전체 목록은 Webhook 통합 타일 또는 [Webhook 통합 문서][3]를 참조하세요.
* *Event Stream* 댓글에서 Webhook를 언급할 때만 입력되고 *Monitor Alerts*에서는 사용되지 않는 `$EMAIL` 변수 대신 이메일 필드에 이메일 주소를 수동으로 입력하세요.
* 페이로드의 `description` 필드는 HTML을 허용합니다. 이 `$EVENT_MSG` 변수는 모니터의 메시지를 Markdown으로 렌더링하는데, 이는 Freshservice의 API에서 지원하지 않으므로 그래프 스냅샷과 함께 대신 `$TEXT_ONLY_MSG`가 사용됩니다.
* `status` 및 `priority` 필드는 서로 다른 값에 매핑된 숫자입니다. 이러한 값을 보려면 [Freshservice의 티켓 엔드포인트][2]를 검토하세요.

### 인증

Freshservice의 API는 [기본 액세스 인증][4]을 사용합니다. Base64로 인코딩된 자격 증명을 `Authorization` 요청 헤더로 전송해야 합니다. 허용되는 자격 증명은 `username:password` 형식의 사용자 이름과 비밀번호 또는 Freshservice API 키입니다.

Webhook에서 이를 설정하려면 **Headers** 섹션에 다음을 추가하세요:

```json
{"Authorization": "Basic <BASE64_ENCODED_CREDENTIALS>"}
```

### 마무리

Webhook 통합 타일에서 **Install Integration** 또는 **Update Configuration**(이전에 Webhook 정의를 입력한 경우)을 클릭하여 변경 사항을 저장합니다.

## 사용법

모니터 메시지에 `@webhook-<NAME>`을 추가하세요. 모니터의 상태가 변경되면 Webhook가 트리거됩니다.

다음과 같이 `{{#is_alert}}` 또는 `{{#is_warning}}` 조건문 내부에 @-멘션을 추가하는 것이 좋습니다.

```text
{{#is_alert}}
    {{host.name}} is down!
    @webhook-freshservice
{{/is_alert}}
```

모니터가 알림을 트리거하면 Freshservice 대시보드에 새 티켓이 나타납니다. 조건문을 사용하지 않기로 선택한 경우 Webhook이 다시 트리거되므로 모니터가 복구될 때 새 티켓이 생성됩니다.

## 한계

### 티켓 생성

Webhooks 통합은 티켓만 생성할 수 있습니다. 기존 티켓을 업데이트하려면 `PUT` 메서드가 필요하며 Webhooks 통합은 `POST` 메서드만 지원합니다.

### 상태 및 우선순위

`$ALERT_STATUS` 및 `$PRIORITY` 변수는 Freshservice의 API에서 예상하는 숫자 값 대신 문자열(예: `ALERT` 및 `NORMAL`)을 반환합니다. 다양한 레벨의 상태 및 우선순위를 설정하려면 하드 코딩된 상태 및 우선순위 필드를 사용하여 중복 Webhooks를 생성하세요. 그리고 다음과 같이 관련 조건문 내부에서 Webhooks를 `@-mention`하세요. 

```text
{{#is_warning}}
    Disk space usage is above 80%
    @webhook-freshservice-warning
{{/is_warning}}
{{#is_alert}}
    Disk space usage is above 95%
    @webhook-freshservice-alert
{{/is_alert}}
```

### 태그 설정

태그 지정은 Freshservice의 API에서 지원되지만 다음 사항에 유의하세요.

* JSON 페이로드의 태그 파라미터는 어레이(array) 여야 합니다. 즉, 쉼표로 구분된 문자열 목록을 반환하므로 `$TAGS` Webhook 변수를 사용할 수 없습니다.
* JSON 페이로드에 추가한 태그에 `:` 문자가 포함될 경우 모든 Datadog 태그를 Freshservice에 매핑하지 못할 수도 있습니다. 태그에 `:` 문자가 있으면 요청이 실패합니다.
* Freshservice 태그에 유용한 추가 변수는 [Webhook 통합 문서][3]를 참조하세요. 다음 예에서는 `$HOSTNAME` 및 `$ORG_ID`가 사용됩니다.

```json
{
  "email": "<EMAIL_ADDRESS_TO_ASSOCIATE_WITH_TICKET>",
  "subject": "$EVENT_TITLE",
  "description": "<img src=\"$SNAPSHOT\" /><hr/>$TEXT_ONLY_MSG",
  "status": 2,
  "priority": 2,
  "tags": ["$HOSTNAME", "$ORG_ID"]
}
```

### 트러블슈팅

모니터가 트리거된 후 Webhooks가 전송되지 않으면 이벤트 스트림으로 이동하여 `sources:webhooks``status:error`를 검색하세요. 이는 문제 해결 정보가 포함된 실패한 Webhooks가 있는 이벤트입니다. 예를 들어,

```text
- Reply status code was: HTTP 401
- Reply content was:
  {"code":"invalid_credentials","message":"You have to be logged in to perform this action."}
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#integrations/webhooks
[2]: https://api.freshservice.com/v2/#create_ticket
[3]: /ko/integrations/webhooks/#usage
[4]: https://en.wikipedia.org/wiki/Basic_access_authentication