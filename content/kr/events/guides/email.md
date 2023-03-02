---
aliases:
- /kr/developers/events/email/
- /kr/guides/eventsemail
kind: 설명서
title: 이메일을 이용한 이벤트
---

애플리케이션에 기존 [Datadog 통합][1]이 없고 [커스텀 Agent 점검][2]을 생성하지 않을 경우에는 이메일로 이벤트를 전송할 수 있습니다.

## 구성

이메일로 이벤트를 전송하려면 Datadog에 전용 이메일 주소가 있어야 합니다.

1. [Datadog 계정][3]에 로그인합니다.
2. 왼쪽 하단의 **Account** 메뉴에서 **Organization Settings**을 선택합니다.
3. **Events API emails** 탭을 클릭합니다.
4. **Format** 드롭다운(`Plain text` 또는 `JSON`)에서 메시지 형식을 선택합니다.
5. **Create API email** 버튼을 클릭합니다.
6. 결과를 [API 페이지][4]에서 확인합니다.

**Events API emails** 섹션에는 애플리케이션에 사용할 수 있는 모든 이메일과 이메일을 만든 사람이 표시됩니다.

## 제출

이메일로 이벤트를 전송하는 방법은 두 가지입니다.

{{< tabs >}}
{{% tab "JSON" %}}

애플리케이션에서 전송한 이메일을 완전히 제어할 수 있는 경우에는 JSON 형식 메시지 설정 기능을 사용할 수 있습니다. 이 형식을 사용하면 Datadog에 나타나는 이벤트의 모든 요소를 설정할 수 있습니다.

### 소스 이메일{#source-email-1}

JSON 형식 이메일을 사용하면 다음 필드를 제어할 수 있습니다.

* 전송자의 이메일 주소
* [Datadog Events API][1]의 모든 인수

**참고**: JSON 형식이 올바르지 않거나 이메일이 제목 없이 전송되면 이벤트가 이벤트 스트림에 표시되지 않습니다.

### Datadog 이벤트 {#datadog-event-1}

JSON 형식 이메일에서는 이메일 제목이 이벤트에 표시되지 않습니다. 타이틀 속성값은 이벤트 타이틀에 사용됩니다. 이벤트에 나타나는 모든 데이터는 이메일 본문에 JSON으로 정의되어야 합니다. 또한 본문은 변경 없는 올바른 형식의 JSON이어야 합니다. 그렇지 않으면 메시지가 무시됩니다. JSON으로 전송된 이벤트의 예시는 다음과 같습니다.

{{< img src="developers/events/json-event.png" alt="json 이벤트" >}}

**참고**: 표준 이메일 클라이언트로 이메일을 테스트하는 경우 본문이 HTML로 변환될 수 있습니다. 이로 인해 본문은 변경된 JSON이 되므로 이메일이 무시됩니다.

[1]: /kr/api/v1/events/
{{% /tab %}}
{{% tab "Plain text" %}}

애플리케이션에서 보낸 이메일을 제어할 권한이 부족한 경우에는 일반 텍스트 형식의 메시지를 사용하세요.

### 소스 이메일{#source-email-2}

일반 텍스트 형식의 이메일에서는 다음 필드를 제어할 수 있습니다.

| 항목                | 필수 | 설명                     |
|----------------------|----------|---------------------------------|
| 전송자 이메일 주소 | 예      | 전송자 이메일 주소 |
| 제목              | 예      | 이메일 제목        |
| 본문                 | 예      | 이메일 본문           |

예를 들어, 아래 이메일은 유효한 제출에 해당합니다.

```text
Sender's email: matt@datadog.com
Subject: Env:Test - 50% CPU - #test 중인 시스템
본문: 이것은 env:test가 50% CPU - #test 중임을 보여주는 테스트 메시지입니다.
```

### Datadog 이벤트{#datadog-event-2}

이메일 제목은 이벤트 타이틀이 되고, 이메일 본문은 이벤트 메시지가 됩니다. 이메일 전송자는 이벤트 하단에 나타납니다. 메시지 본문에 `#`(을)를 사용하여 태그를 추가할 수 있습니다. 일반 텍스트로 전송된 이벤트의 예시는 다음과 같습니다.

{{< img src="developers/events/plain-event.png" alt="일반 이벤트" >}}

{{% /tab %}}
{{< /tabs >}}

### Markdown

Datadog 이벤트 텍스트는 [Markdown][5]을 지원하지만, Markdown에 HTML을 포함하는 것은 지원되지 않습니다. 이벤트 텍스트에서 Markdown을 사용하려면 `%%% \n`이(가) 있는 텍스트 블록으로 시작하고 `\n %%%`이(가) 있는 텍스트 블록으로 종료하세요.

```json
{
  "title": "오늘 소식 들으셨나요?",
  "text": "%%% \n [예시 링크](http://example.com/session_id \"Title\") \n %%%",
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

[1]: /kr/integrations/
[2]: /kr/agent/agent_checks/
[3]: https://app.datadoghq.com
[4]: https://app.datadoghq.com/account/settings#api
[5]: http://daringfireball.net/projects/markdown/syntax#lin