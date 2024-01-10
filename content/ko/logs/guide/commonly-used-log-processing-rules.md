---
aliases:
- /ko/agent/faq/commonly-used-log-processing-rules
further_reading:
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리 방법 알아보기
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 파싱에 대해 배우기
- link: logs/live_tail
  tag: 설명서
  text: Datadog 라이브 테일 기능
- link: logs/explorer
  tag: 설명서
  text: 로그 탐색 방법 보기
- link: logs/logging_without_limits
  tag: 설명서
  text: 제한없는 로그 수집
kind: faq
title: 일반적으로 사용되는 로그 처리 규칙
---

이 페이지에서 일반적으로 사용되는 로그 처리 규칙 예시를 찾아보세요.

## 일반적은 문자열: "sensitive-info"

`sensitive-info` 문자열을 포함하는 열이 Datadog에 전송되지 않았습니다.

```yaml
  - type: exclude_at_match
    name: exclude_sensitive_info
    pattern: (?:sensitive\-info)
```

## My key

"my_key=" 문자열이 발견되면 문자열 뒤에 오는 문자, 숫자, 공백 및 밑줄은 `my_key=[VALUE REDACTED]`는 삭제됩니다.

```yaml
- type: mask_sequences
  name: redact_key_match_letters_numbers_spaces_unders
  replace_placeholder: "my_key=[VALUE REDACTED]"
  pattern: (?:my_key=[A-Za-z0-9\s_]*[A-Za-z0-9][A-Za-z0-9\s_])
```

"my_key=" 문자열이 발견되면 다음 마침표까지 문자열 뒤에 오는 모든 문자가 `my_key=[VALUE REDACTED]`로 삭제됩니다.

```yaml
- type: mask_sequences
  name: redact_key_match_to_period
  replace_placeholder: "my_key=[VALUE REDACTED]"
  pattern: (?:my_key=[^.])
```

## 사회보장번호(미국)

미국 사회보장번호를 삭제합니다.

```yaml
  - type: mask_sequences
    name: social_security_number_basic
    pattern: (?:\d{3}-?\d{2}-?\d{4})
    replace_placeholder: "[SSN REDACTED]"
```

## 이메일 주소

RFC 5322 레겍스 지정을 사용하는 이메일 주소를 삭제합니다.

```yaml
  - type: mask_sequences
    name: RFC_5322_email
    pattern: (?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
    replace_placeholder: "[EMAIL REDACTED]"
```

## 신용 카드 번호

 Visa, Mastercard, American Express, Diner's Club, Discover Card 및 JCB 신용 카드 번호를 삭제합니다.

```yaml
- type: mask_sequences
  name: visa_mc_amex_diners_discover_jcb_credit_card
  replace_placeholder: "[CREDIT CARD REDACTED]"
  pattern: (?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})
```

위 규칙은 트레이스 ID가 위 형식과 일치하여 로그와 트레이스를 연결할 때 추론을 야기할 수 있습니다. 로그와 트레이스를 연결하고 위 정규식을 이용하려는 경우, 아래 예시를 고려하세요.

```yaml
- type: mask_sequences
  name: visa_mc_amex_diners_discover_jcb_credit_card
  replace_placeholder: "[CREDIT CARD REDACTED]"
  pattern: \b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})\b
```

## 우편 번호

우편 번호(미국)을 삭제합니다.

```yaml
- type: mask_sequences
  name: postal_codes
  replace_placeholder: "[POSTAL CODE REDACTED]"
  pattern: (?:\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d)
```

## 괄호 안

`ExampleConfig(` 문자열 뒤에서 닫는 괄호까지 문자를 삭제합니다.

```yaml
- type: mask_sequences
  name: Example_config_redaction
  replace_placeholder: "ExampleConfig([REDACTED, REDACTED]"
  pattern: (?:ExampleConfig\([^\)]+)
```

## 꺾쇠 괄호 안

`on Example [` 문자열 이후 닫는 꺾쇠 괄호까지 문자를 삭제합니다.

```yaml
- type: mask_sequences
  name: on_Example_redaction
  replace_placeholder: "on Example [Example REDACTED]"
  pattern: (?:on Example\s?[^\s]+)
```

## 클래스 A IP 주소

클래스 A IP 주소 범위 1.0.0.1~126.255.255.254를 삭제합니다.

```yaml
- type: mask_sequences
  name: simple_ip_address
  replace_placeholder: "[IP REDACTED]"
  pattern: (?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<br>
*제한없는 로그 수집(Logging without Limits)은 Datadog, Inc.의 상표입니다.