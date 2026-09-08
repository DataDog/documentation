---
aliases:
- /ko/developers/events/email/
- /ko/guides/eventsemail
- /ko/service_management/events/guides/email/
title: 이메일을 이용한 이벤트
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">이메일을 이용한 이벤트가 지원되지 않는 사이트: {{< region-param key=dd_datacenter code="true" >}}</div>
{{< /site-region >}}

애플리케이션에 기존 [Datadog 통합][1]이 없고 [사용자 지정 Agent 점검][2]을 생성하지 않을 경우에는 이메일로 이벤트를 전송할 수 있습니다. 이 작업은 Amazon SNS 주제에 게시된 메시지로도 수행할 수 있습니다. 자세한 내용은 [Amazon SNS 이메일에서 Datadog 이벤트 생성][6] 가이드를 참조하세요.

## 설정 {#setup}

이메일로 이벤트를 전송하려면 Datadog에 전용 이메일 주소가 있어야 합니다.

1. [Datadog 계정][3]에 로그인합니다.
2. 왼쪽 하단의 {{< ui >}}Account{{< /ui >}} 메뉴에서 {{< ui >}}Organization Settings{{< /ui >}}을 선택합니다.
3. {{< ui >}}Events API emails{{< /ui >}} 탭을 클릭합니다.
4. {{< ui >}}Format{{< /ui >}} 드롭다운에서 메시지 형식을 선택합니다(`Plain text` 또는 `JSON v2`).
5. 필요 시 이 페이지의 [속성 정의 섹션](#attribute-definitions)에 나열된 다른 속성을 정의합니다.
6. {{< ui >}}Create Email{{< /ui >}} 버튼을 클릭합니다.

{{< ui >}}Events API emails{{< /ui >}} 섹션에는 애플리케이션에 사용할 수 있는 모든 이메일과 이메일을 만든 사람이 표시됩니다.

### 속성 정의 {#attribute-definitions}

| 이름 | 설명 | 예시 |
|---|---|---|
| 설명 | 이메일의 용도에 대한 설명입니다. | 'MyService 알림에 사용됨' |
| 태그 | 이메일을 통해 수신한 각 이벤트에 추가할 태그 목록입니다. JSON 메시지에 다른 태그가 있을 경우, 해당 태그가 모두 추가됩니다.<br>이메일당 태그 **20**개로 한도가 제한됩니다. | `tag1:val1`, `tag2:val2` |
| 수신자 | 이메일을 통해 생성된 모든 이벤트의 메시지 시작 부분에 추가할 핸들 목록으로, `@` 접두사는 생략합니다. 자세한 내용은 [알림 수신자][7]를 참조하세요.<br>이메일당 수신자 **10**명으로 한도가 제한됩니다. | `my@email.com`, `slack-acc-ch` |
| 경고 유형 | {{< ui >}}Plain text{{< /ui >}} 및 {{< ui >}}JSON{{< /ui >}} 형식의 주소에 대해 이벤트의 경고 유형을 설정합니다. JSON 이메일에 `alert_type` 필드가 있다면 이 설정보다 우선합니다. **JSON v2를 지원하지 않습니다**. 대신 이메일 JSON 본문에서 카테고리 및 관련 필드를 설정하세요. | `Info` |

## 제출 {#submission}

이메일로 이벤트를 전송하는 방법은 세 가지로, 아래 탭({{< ui >}}JSON{{< /ui >}}, {{< ui >}}Plain text{{< /ui >}}, {{< ui >}}JSON v2{{< /ui >}})에서 설명합니다. `JSON` 형식은 더 이상 새로운 이벤트 이메일 주소를 지원하지 않습니다. 해당 형식으로 새로운 주소를 만들 수는 없지만 기존의 `JSON` 주소는 계속 사용할 수 있습니다. JSON 형식 이메일을 전송하는 새로운 애플리케이션의 경우 `JSON v2`를 사용하세요.

{{< tabs >}}
{{% tab "JSON" %}}

애플리케이션에서 전송하는 이메일을 완전히 제어할 권한이 있는 경우, JSON 형식 메시지를 전송할 수 있습니다. 이메일 본문은 [**Events API v1**][1](`POST /api/v1/events`)의 JSON 구조를 따라야 합니다. {{< ui >}}v1{{< /ui >}} API 버전을 선택하여 요청 본문 필드를 확인하세요. 이메일 본문의 JSON은 Datadog에 표시되는 이벤트 필드를 설정합니다.

### 소스 이메일 {#source-email-1}

`JSON` 형식 이메일을 사용하면 다음 필드를 제어할 수 있습니다.

* 발신자의 이메일 주소
* [**Events API v1**][1]에서 지원하는 모든 필드(예: `title`, `text`, `tags`, `alert_type`)

**참고**: JSON 형식이 올바르지 않거나 이메일이 제목 없이 전송되면 이벤트가 이벤트 스트림에 표시되지 않습니다.

### Datadog 이벤트 {#datadog-event-1}

`JSON` 형식 이메일에서는 이메일 제목이 이벤트에 표시되지 않습니다. 제목 속성 값이 이벤트 제목으로 사용됩니다. 이벤트에 표시되는 모든 데이터는 이메일 본문에서 JSON으로 정의되어야 합니다. 또한 본문은 올바른 형식의 순수 JSON이어야 하며, 그렇지 않을 경우 메시지가 무시됩니다. JSON으로 전송된 이벤트 예시:

{{< img src="extend/events/json-event.png" alt="json 이벤트" >}}

**참고**: 표준 이메일 클라이언트로 이메일을 테스트하는 경우, 본문이 HTML로 변환될 수 있습니다. 이 경우 본문이 더 이상 순수 JSON이 아니게 되어 결과적으로 이메일이 무시됩니다.

[1]: /ko/api/latest/events/#post-an-event
{{% /tab %}}
{{% tab "일반 텍스트" %}}

애플리케이션에서 보낸 이메일을 제어할 권한이 부족한 경우에는 일반 텍스트 형식의 메시지를 사용하세요.

### 소스 이메일 {#source-email-2}

일반 텍스트 형식의 이메일에서는 다음 필드를 제어할 수 있습니다.

| 필드                | 필수 | 설명                     |
|----------------------|----------|---------------------------------|
| 발신자 이메일 주소 | 예      | 발신자의 이메일 주소 |
| 제목              | 예      | 이메일 제목        |
| 본문                 | 예      | 이메일 본문           |

예를 들어, 아래 이메일은 유효한 제출에 해당합니다.

```text
Sender's email: matt@datadog.com
Subject: Env:Test - System at 50% CPU - #test
Body: This is a test message showing that env:test is at 50% CPU - #test
```

### 이메일 본문 처리 {#email-body-2}
이메일 본문은 가독성과 보안을 강화하기 위해 여러 정리 단계를 거칩니다. 예상되는 변경 사항은 다음과 같습니다.

- **HTML을 Markdown으로 변환**: HTML 콘텐츠가 해당하는 Markdown으로 변환됩니다.
- **HTML 새니타이징**: 보안을 위해 이메일 본문은 새니타이징 처리되며, 특정 HTML 태그(`a`, `br`, `caption`, `code`, `div`, `em`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `hr`, `iframe`, `img`, `li`, `ol`, `p`, `pre`, `span`, `strong`, `table`, `tbody`, `td`, `tfoot`, `th`, `thead`, `tr`, `ul`)만 허용됩니다. `<>`로 묶인 문자열을 포함하여 다른 모든 HTML 태그는 삭제됩니다.
- **답장/전달 내용 제거**: 스레드에서 가장 최근 이메일만 유지되며, 이전 답장 및 전달 내용은 삭제됩니다.

### Datadog 이벤트 {#datadog-event-2}

이메일 제목은 이벤트 제목이 되고, 이메일 본문은 이벤트 메시지가 됩니다. 이메일 발신자는 이벤트 하단에 표시됩니다. 메시지 본문에 `#`을 사용하여 태그를 추가할 수 있습니다.

Datadog은 이러한 기본 필드 한도를 초과하는 값을 잘라냅니다.

| 필드   | 최댓값         |
|---------|-----------------|
| 제목   | 300자  |
| 메시지 | 4,000자 |
| 태그    | 태그 200개        |

일반 텍스트로 전송된 이벤트 예시:

{{< img src="extend/events/plain-event.png" alt="일반 이벤트" >}}

{{% /tab %}}
{{% tab "JSON v2" %}}

애플리케이션에서 전송하는 이메일을 완전히 제어할 권한이 있는 경우, JSON 형식 메시지를 전송할 수 있습니다. 이메일 본문은 [**Events API v2**][1](`POST /api/v2/events`)의 JSON 구조를 따라야 합니다. 이메일 본문의 JSON은 Datadog에 표시되는 이벤트 필드를 설정합니다.

### 소스 이메일 {#source-email-json-v2}

`JSON v2` 형식 이메일을 사용하면 다음 필드를 제어할 수 있습니다.

* 발신자의 이메일 주소
* [**Events API v2**][1]에서 지원하는 모든 필드(예: `data.attributes.title`, `data.attributes.message`, `data.attributes.tags`, `data.attributes.category`)

경고 이벤트의 이메일 본문 예시입니다. 변경 및 정보 이벤트는 `data.attributes.attributes` 하위의 다른 필드를 사용합니다. 해당 카테고리에 대한 내용은 API 참조를 확인하세요.

```json
{
  "data": {
    "attributes": {
      "category": "alert",
      "title": "CPU threshold exceeded",
      "message": "Host prod-web-01 averaged 92% CPU for five minutes.",
      "tags": [
        "env:production",
        "region:us-east"
      ],
      "integration_id": "custom-events",
      "attributes": {
        "status": "error",
        "priority": "3"
      }
    },
    "type": "event"
  }
}
```

**참고**: JSON 형식이 올바르지 않거나 이메일이 제목 없이 전송되면 이벤트가 이벤트 스트림에 표시되지 않습니다.

### Datadog 이벤트 {#datadog-event-json-v2}

`JSON v2` 형식 이메일에서는 이메일 제목이 이벤트에 표시되지 않습니다. JSON 본문의 제목 필드 값이 이벤트 제목으로 사용됩니다. 이벤트에 표시되는 모든 데이터는 이메일 본문에서 JSON으로 정의되어야 합니다. 또한 본문은 올바른 형식의 순수 JSON이어야 하며, 그렇지 않을 경우 메시지가 무시됩니다.

**참고**: 표준 이메일 클라이언트로 이메일을 테스트하는 경우, 본문이 HTML로 변환될 수 있습니다. 이 경우 본문이 더 이상 순수 JSON이 아니게 되어 결과적으로 이메일이 무시됩니다.

[1]: /ko/api/latest/events/#post-an-event
{{% /tab %}}
{{< /tabs >}}

### Markdown {#markdown}

Datadog 이벤트 텍스트는 [Markdown][5]을 지원하지만 Markdown에 HTML을 임베딩하는 작업은 지원하지 않습니다. 이벤트 텍스트에서 Markdown을 사용하려면 텍스트 블록을 `%%% \n`으로 시작하고 `\n %%%`으로 끝내세요.

```json
{
  "title": "Did you hear the news today?",
  "text": "%%% \n [an example link](http://example.com/session_id \"Title\") \n %%%",
  "priority": "normal",
  "tags": ["environment:test"],
  "alert_type": "info"
}
```

Markdown 블록에 링크를 포함하려는 경우에는 URL이 올바르게 인코딩되었는지 확인하세요.

```text
# Not encoded
http://example.com/session_id:123456

# Encoded
http://example.com/session_id%3A123456
```

### 이메일 크기 {#email-size}
내용과 첨부 파일을 포함한 최대 허용 이메일 크기는 20MB입니다. 이 한도를 초과하는 이메일은 무시됩니다.

### 사용량 추적 {#usage-tracking}
현재 사용 중이며 이벤트를 수신하는 이메일이 무엇인지 파악하려면 조직 설정의 {{< ui >}}Last Used{{< /ui >}} 탭에 있는 {{< ui >}}Events API Emails{{< /ui >}} 열을 확인하세요. 이는 각 주소에 대해 이메일이 처리된 가장 최근 날짜를 표시하며, 사용 기록이 없는 경우 {{< ui >}}No data{{< /ui >}}를 표시합니다.

[1]: /ko/integrations/
[2]: /ko/agent/agent_checks/
[3]: https://app.datadoghq.com
[5]: http://daringfireball.net/projects/markdown/syntax#lin
[6]: /ko/integrations/guide/events-from-sns-emails/
[7]: /ko/monitors/notify/#notification-recipients