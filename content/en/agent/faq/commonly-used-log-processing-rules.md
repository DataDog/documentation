---
title: Commonly Used Log Scrubbing Rules
kind: faq
further_reading:
- link: "logs/processing"
  tag: "Documentation"
  text: "Discover how to process your logs"
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "logs/live_tail"
  tag: "Documentation"
  text: "Datadog live tail functionality"
- link: "logs/explorer"
  tag: "Documentation"
  text: "See how to explore your logs"
- link: "logs/logging_without_limits"
  tag: "Documentation"
  text: "Logging without Limits*"
---

Find on this page examples of commonly used log processing rules.

## Generic string: "sensitive-info"

Lines containing the string `sensitive-info` are not sent to Datadog.

```yaml
  - type: exclude_at_match
    name: exclude_sensitive_info
    pattern: (?:sensitive\-info)
```

## My key

When the string "my_key=" is found, letters, numbers, spaces, and underscores following the string are redacted with `my_key=[VALUE REDACTED]`.

```yaml
- type: mask_sequences
  name: redact_key_match_letters_numbers_spaces_unders
  replace_placeholder: "my_key=[VALUE REDACTED]"
  pattern: (?:my_key=[A-Za-z0-9\s_]*[A-Za-z0-9][A-Za-z0-9\s_])
```

When the string "my_key=" is found, all characters following the string until the next period are redacted with `my_key=[VALUE REDACTED]`.

```yaml
- type: mask_sequences
  name: redact_key_match_to_period
  replace_placeholder: "my_key=[VALUE REDACTED]"
  pattern: (?:my_key=[^.])
```

## Social Security numbers

Redact Social Security numbers.

```yaml
  - type: mask_sequences
    name: social_security_number_basic
    pattern: (?:\d{3}-?\d{2}-?\d{4})
    replace_placeholder: "[SSN REDACTED]"
```

## Email address

Redact email addresses using the RFC 5322 regex specification.

```yaml
  - type: mask_sequences
    name: RFC_5322_email
    pattern: (?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
    replace_placeholder: "[EMAIL REDACTED]"
```

## Credit card numbers

Redact credit card numbers for Visa, Mastercard, American Express, Diner's Club, Discover Card, and JCB.

```yaml
- type: mask_sequences
  name: visa_mc_amex_diners_discover_jcb_credit_card
  replace_placeholder: "[CREDIT CARD REDACTED]"
  pattern: (?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})
```

## Postal codes

Redact postal codes (US).

```yaml
- type: mask_sequences
  name: postal_codes
  replace_placeholder: "[POSTAL CODE REDACTED]"
  pattern: (?:\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d)
```

## Between parentheses

Redact characters after string `ExampleConfig(` until the closing paranthesis.

```yaml
- type: mask_sequences
  name: Example_config_redaction
  replace_placeholder: "ExampleConfig([REDACTED, REDACTED]"
  pattern: (?:ExampleConfig\([^\)]+)
```

## Between brackets

Redact characters after string `on Example [` until the closing bracket.

```yaml
- type: mask_sequences
  name: on_Example_redaction
  replace_placeholder: "on Example [Example REDACTED]"
  pattern: (?:on Example\s?[^\s]+)
```

## Class A IP addresses

Redact Class A IP addresses, range 1.0.0.1 to 126.255.255.254.

```yaml
- type: mask_sequences
  name: simple_ip_address
  replace_placeholder: "[IP REDACTED]"
  pattern: (?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits is a trademark of Datadog, Inc.
