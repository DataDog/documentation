---
aliases:
- /es/agent/faq/commonly-used-log-processing-rules
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Descubre cómo procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtén más información sobre el parseo
- link: logs/live_tail
  tag: Documentación
  text: Función Live Tail de Datadog
- link: logs/explorer
  tag: Documentación
  text: Consulta cómo explorar tus logs
- link: logs/logging_without_limits
  tag: Documentación
  text: Logging without Limits*
kind: preguntas frecuentes
title: Reglas de limpieza de logs utilizadas con frecuencia
---

En esta página encontrarás ejemplos de reglas de uso común para procesar logs.

## Cadena genérica: "sensitive-info"

Las líneas que contienen la cadena `sensitive-info` no se envían a Datadog.

```yaml
  - type: exclude_at_match
    name: exclude_sensitive_info
    pattern: (?:sensitive\-info)
```

## My key

Cuando se encuentra la cadena "my_key=", las letras, números, espacios y guiones bajos que siguen a la cadena se redactan con `my_key=[VALUE REDACTED]`.

```yaml
- type: mask_sequences
  name: redact_key_match_letters_numbers_spaces_unders
  replace_placeholder: "my_key=[VALUE REDACTED]"
  pattern: (?:my_key=[A-Za-z0-9\s_]*[A-Za-z0-9][A-Za-z0-9\s_])
```

Cuando se encuentra la cadena "my_key=", todos los caracteres que siguen a la cadena hasta el siguiente punto se eliminan con `my_key=[VALUE REDACTED]`.

```yaml
- type: mask_sequences
  name: redact_key_match_to_period
  replace_placeholder: "my_key=[VALUE REDACTED]"
  pattern: (?:my_key=[^.])
```

## Números de Seguridad Social (EE. UU.)

Redacta los números de Seguridad Social de Estados Unidos.

```yaml
  - type: mask_sequences
    name: social_security_number_basic
    pattern: (?:\d{3}-?\d{2}-?\d{4})
    replace_placeholder: "[SSN REDACTED]"
```

## Dirección de correo electrónico

Redacta direcciones de correo electrónico utilizando la especificación de regex RFC 5322.

```yaml
  - type: mask_sequences
    name: RFC_5322_email
    pattern: (?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
    replace_placeholder: "[EMAIL REDACTED]"
```

## Números de tarjeta de crédito

Redacta los números de las tarjetas de crédito Visa, Mastercard, American Express, Diner's Club, Discover Card y JCB.

```yaml
- type: mask_sequences
  name: visa_mc_amex_diners_discover_jcb_credit_card
  replace_placeholder: "[CREDIT CARD REDACTED]"
  pattern: (?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})
```

La regla anterior puede causar interferencias al conectar logs y trazas (traces), ya que los ID de traza pueden coincidir con el formato anterior. Si conectas logs y trazas y deseas utilizar la expresión regular anterior, considera el siguiente ejemplo:

```yaml
- type: mask_sequences
  name: visa_mc_amex_diners_discover_jcb_credit_card
  replace_placeholder: "[CREDIT CARD REDACTED]"
  pattern: \b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})\b
```

## Códigos postales

Redacta códigos postales (EE. UU.).

```yaml
- type: mask_sequences
  name: postal_codes
  replace_placeholder: "[POSTAL CODE REDACTED]"
  pattern: (?:\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d)
```

## Entre paréntesis

Redacta los caracteres después de la cadena `ExampleConfig(` hasta el paréntesis de cierre.

```yaml
- type: mask_sequences
  name: Example_config_redaction
  replace_placeholder: "ExampleConfig([REDACTED, REDACTED]"
  pattern: (?:ExampleConfig\([^\)]+)
```

## Entre corchetes

Redacta los caracteres después de la cadena `on Example [` hasta el corchete de cierre.

```yaml
- type: mask_sequences
  name: on_Example_redaction
  replace_placeholder: "on Example [Example REDACTED]"
  pattern: (?:on Example\s?[^\s]+)
```

## Direcciones IP de clase A

Redacta direcciones IP de clase A, rango 1.0.0.1 a 126.255.255.254.

```yaml
- type: mask_sequences
  name: simple_ip_address
  replace_placeholder: "[IP REDACTED]"
  pattern: (?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits es una marca registrada de Datadog, Inc.