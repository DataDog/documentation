---
author: Trevor Veralrud
further_reading:
- link: /integrations/webhooks/
  tag: 설명서
  text: Webhooks 통합
title: Webhooks를 사용한 Freshservice 티켓
---

이 가이드에서는 모니터 알림을 받았을 때 Datadog Webhooks 통합을 사용해 Freshservice에서 새 티켓을 여는 방법을 설명합니다.

## 설정

먼저 [Webhooks 통합 타이틀][1]을 열고 Configuration 탭으로 이동한 후 맨 하단으로 스크롤하여 새 Webhook을 추가하는 양식을 선택합니다.

### 이름

Webhook 이름을 지정하세요. 이 이름은 내 모니터 메시지(`@webhook-<NAME>`과 [사용량](#usage) 참고)에 사용됩니다. 예를 들어 Webhook 이름을 freshwater로 지정하면 모니터 메시지에서 `@webhook-freshservice`를 언급해 모니터에서 티켓을 열 수 있습니다.

### URL

Freshservice에는 API 버전 두 개가 있습니다. 이 가이드에서는 API V2를 설명합니다. 그러나 JSON 페이로드를 약간 수정해 V1을 사용할 수도 있습니다.

URL 필드에 다음 엔드포인트를 입력하세요.

`https://<YOUR_DOMAIN>.freshservice.com/api/v2/tickets`

### 페이로드

새 티켓 JSON 페이로드를 입력하세요. 다음 예시에서는 필수 필드만 사용합니다. 내 페이로드를 맞춤화할 수 있는 더 많은 옵션을 보려면 [Freshservice의 티켓 엔드포인트][2]를 확인하세요. 

```json
{
  "email": "[email address to associate with ticket]",
  "subject": "$EVENT_TITLE",
  "description": "<img src=\"$SNAPSHOT\" /><hr/>$TEXT_ONLY_MSG",
  "status": 2,
  "priority": 2
}
```

**참고**:

* `$EVENT_TITLE`과 같은 값은 Webhook 통합에서 사용되는 변수입니다. 이 변수 전체 목록과 의미를 보려면 Webhook 통합 타이틀 또는 [Webhook 통합 설명서][3]를 참고하세요.
* 이메일 필드에는 `$EMAIL` 변수를 사용하는 대신 수동으로 이메일 주소를 입력하세요. 이메일 변수의 경우 *Event Stream* 코멘트에서 언급할 때만 채워지고 *Monitor Alerts* 내에서는 사용되지 않습니다.
* 페이로드의 `description` 필드에 HTML 형식을 사용할 수 있습니다. `$EVENT_MSG` 변수는 모니터 메시지를 마크다운으로 렌더링하며, 이는 Freshservice API에서 지원되지 않습니다. 대신 `$TEXT_ONLY_MSG`와 그래프 스냅샷을 사용합니다.
* `status`와 `priority` 필드는 다른 값으로 매핑되는 수치 값입니다. 이 값을 보려면 [Freshservice의 티켓 엔드포인트][2]를 참고하세요.

### 인증

Freshservice API에서는 [기본 액세스 인증][4]을 사용합니다. Base64 인코딩 보안 인증 정보가 `Authorization` 요청 헤더에 전송됩니다. `username:password` 형식의 사용자 이름과 암호 또는 Freshservice API 키가 허용되는 보안 인증 정보입니다.

Webhook에 이를 설정하려면 내 **Headers** 섹션에 다음을 추가하세요.

```json
{"Authorization": "Basic <BASE64_ENCODED_CREDENTIALS>"}
```

### 마무리

Webhook 통합 타이틀에서 **Install Integration** 또는 **Update Configuration**(이전에 Webhook 정의를 입력한 경우)을 클릭해 변경 사항을 저장하세요.

## 사용법

모니터 메시지에 `@webhook-<NAME>`를 추가하세요. 모니터 상태가 변할 때 Webhook이 트리거됩니다.

`{{#is_alert}}` 또는 `{{#is_warning}}` 조건부 내에 @-mention을 추가하는 것이 좋습니다. 다음 예를 참고하세요.

```text
{{#is_alert}}
    {{host.name}} is down!
    @webhook-freshservice
{{/is_alert}}
```

모니터에서 알림을 트리거하면 Freshservice 대시보드에 새 티켓이 나타납니다. 조건부 문을 사용하지 않으면 Webhook이 다시 트리거되기 때문에 모니터가 복구될 때 새 티켓이 또 생성됩니다.

## 한계

### 티켓 생성

Webhooks 통합에서는 티켓 생성만 가능합니다. 기존 티켓을 업데이트하는 데에는 `PUT` 메서드가 필요한데 Webhooks 통합에서는 `POST` 메서드만 지원됩니다.

### 상태 및 우선 순위

`$ALERT_STATUS`와 `$PRIORITY` 변수에서는 Freshservice API에서 읽기 가능한 수치 값이 아닌 문자열을 반환합니다(예: `ALERT` 및 `NORMAL`). 따라서 서로 다른 상태 및 우선 순위를 설정하려면 하드 코딩된 상태와 우선 순위 필드를 지정한 Webhooks 중복 파일을 생성해야 합니다. 그리고 관련 조건부 문 내에서 이 Webhooks를 `@-mention`하세요. 다음 예를 참고하세요.

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

### 태깅

Freshservice API에서는 태깅을 지원합니다. 그러나 다음 사항에 유의하세요.

* JSON 페이로드에 있는 태그 파라미터가 어레이여야 합니다. 따라서 `$TAGS` Webhook 변수의 경우 쉼표로 구분된 문자열 목록을 반환하기 때문에 사용할 수 없습니다.
* JSON 페이로드에 추가된 태그에는 `:` 문자가 포함될 수 없습니다. 따라서 Datadog 태그 모두를 Freshservice에 매핑하지 못할 수 있습니다. 태그에 `:` 문자가 있으면 요청이 실패합니다.
* Freshservice 태그에 유용한 변수를 더 보려면 [Webhook 통합 설명서][3]를 검토하세요. 다음 예시에서는 `$HOSTNAME`과 `$ORG_ID`가 사용되었습니다.

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

모니터가 트리거된 후 Webhooks 전송에 실패한 경우 Event Stream으로 이동해 `sources:webhooks` `status:error`를 검색해 보세요. 이 검색어로 트러블슈팅 정보를 포함한 실패 Webhooks 이벤트를 찾을 수 있습니다. 다음 예를 참고하세요.

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