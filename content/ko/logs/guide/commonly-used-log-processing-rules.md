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
title: 일반적으로 사용되는 로그 처리 규칙
---

이 페이지에서는 일반적으로 사용되는 로그 처리 규칙의 예시를 확인할 수 있습니다.

## 일반 문자열: "sensitive-info"

`sensitive-info`가 포함된 줄은 Datadog에 전송되지 않습니다.

```yaml
  - type: exclude_at_match
    name: exclude_sensitive_info
    pattern: (?:sensitive\-info)
```

## My key

"my_key=" 문자열이 있으면 문자열 뒤에 있는 문자, 숫자, 띄어쓰기, 밑줄이 `my_key=[VALUE REDACTED]`로 수정됩니다.

```yaml
- type: mask_sequences
  name: redact_key_match_letters_numbers_spaces_unders
  replace_placeholder: "my_key=[VALUE REDACTED]"
  pattern: (?:my_key=[A-Za-z0-9\s_]*[A-Za-z0-9][A-Za-z0-9\s_])
```

"my_key=" 문자열이 있으면 이 문자열 뒤부터 마침표 사이에 있는 모든 문자가 `my_key=[VALUE REDACTED]`로 수정됩니다.

```yaml
- type: mask_sequences
  name: redact_key_match_to_period
  replace_placeholder: "my_key=[VALUE REDACTED]"
  pattern: (?:my_key=[^.])
```

## 사회 보장 번호(US)

미국 사회 보장 번호 수정

```yaml
  - type: mask_sequences
    name: social_security_number_basic
    pattern: (?:\d{3}-?\d{2}-?\d{4})
    replace_placeholder: "[SSN REDACTED]"
```

## 이메일 주소

RFC 5322 regex 사양을 사용해 이메일 주소를 수정합니다.

```yaml
  - type: mask_sequences
    name: RFC_5322_email
    pattern: (?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
    replace_placeholder: "[EMAIL REDACTED]"
```

## 신용 카드 번호

Visa, Mastercard, American Express, Diner's Club, Discover Card, JCB의 신용 카드 번호 수정

```yaml
- type: mask_sequences
  name: visa_mc_amex_diners_discover_jcb_credit_card
  replace_placeholder: "[CREDIT CARD REDACTED]"
  pattern: (?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})
```

위 규칙은 트레이스 ID가 위 형식과 일치할 수 있기 때문에 로그와 트레이스와 연결할 때 문제를 일으킬 수 있습니다. 로그와 트레이스와 연결해야 하고 위 정규식을 사용하고 싶은 경우 다음 예시를 참고하세요.

```yaml
- type: mask_sequences
  name: visa_mc_amex_diners_discover_jcb_credit_card
  replace_placeholder: "[CREDIT CARD REDACTED]"
  pattern: \b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})\b
```

## 우편 번호

우편 번호 수정(US)

```yaml
- type: mask_sequences
  name: postal_codes
  replace_placeholder: "[POSTAL CODE REDACTED]"
  pattern: (?:\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d)
```

## 둥근 괄호 사이

문자열 `ExampleConfig(` 뒤부터 둥근 괄호 닫기까지, 그 사이에 있는 문자를 수정

```yaml
- type: mask_sequences
  name: Example_config_redaction
  replace_placeholder: "ExampleConfig([REDACTED, REDACTED]"
  pattern: (?:ExampleConfig\([^\)]+)
```

## 대괄호 사이

`on Example [` 문자열 뒤부터 대괄호 닫기까지, 그 사이에 있는 문자를 수정

```yaml
- type: mask_sequences
  name: on_Example_redaction
  replace_placeholder: "on Example [Example REDACTED]"
  pattern: (?:on Example\s?[^\s]+)
```

## 클래스 A IP 주소

 클래스 A IP 주소 1.0.0.1부터 126.255.255.254까지 수정

```yaml
- type: mask_sequences
  name: simple_ip_address
  replace_placeholder: "[IP REDACTED]"
  pattern: (?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits는 Datadog, Inc.의 상표입니다.