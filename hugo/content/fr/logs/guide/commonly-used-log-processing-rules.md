---
aliases:
- /fr/agent/faq/commonly-used-log-processing-rules
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Découvrir comment traiter vos logs
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: En savoir plus sur le parsing
- link: logs/live_tail
  tag: Documentation
  text: Fonctionnalité Live Tail de Datadog
- link: logs/explorer
  tag: Documentation
  text: Découvrir comment explorer vos logs
- link: logs/logging_without_limits
  tag: Documentation
  text: Logging without Limits*

title: Règles de nettoyage de logs couramment utilisées
---

Cette page recense des exemples de règles de traitement de logs couramment utilisées.

## Chaîne générique : « sensitive-info »

Les lignes contenant la chaîne `sensitive-info` ne sont pas envoyées à Datadog.

```yaml
  - type: exclude_at_match
    name: exclude_sensitive_info
    pattern: (?:sensitive\-info)
```

## my_key

Lorsque la chaîne « my_key= » est identifiée, les lettres, chiffres, espaces et underscores qui suivent sont remplacés par `my_key=[VALEUR CENSURÉE]`.

```yaml
- type: mask_sequences
  name: redact_key_match_letters_numbers_spaces_unders
  replace_placeholder: "my_key=[VALEUR CENSURÉE]"
  pattern: (?:my_key=[A-Za-z0-9\s_]*[A-Za-z0-9][A-Za-z0-9\s_])
```

Lorsque la chaîne « my_key= » est identifiée, tous les caractères qui suivent sont remplacés par `my_key=[VALEUR CENSURÉE]`, jusqu'au prochain point.

```yaml
- type: mask_sequences
  name: redact_key_match_to_period
  replace_placeholder: "my_key=[VALEUR CENSURÉE]"
  pattern: (?:my_key=[^.])
```

## Numéros de sécurité sociale (États-Unis)

Vous pouvez censurer des numéros de sécurité sociale américains

```yaml
  - type: mask_sequences
    name: social_security_number_basic
    pattern: (?:\d{3}-?\d{2}-?\d{4})
    replace_placeholder: "[NUMÉRO DE SÉCURITÉ SOCIALE CENSURÉ]"
```

## Adresse e-mail

Vous pouvez censurer des adresses e-mail à l'aide d'une expression régulière RFC 5322.

```yaml
  - type: mask_sequences
    name: RFC_5322_email
    pattern: (?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
    replace_placeholder: "[ADRESSE E-MAIL CENSURÉE]"
```

## Numéros de carte bancaire

Vous pouvez censurer les numéros de cartes bancaires Visa, Mastercard, American Express, Diner's Club, Discover Card et JCB.

```yaml
- type: mask_sequences
  name: visa_mc_amex_diners_discover_jcb_credit_card
  replace_placeholder: "[NUMÉRO DE CARTE BANCAIRE CENSURÉ]"
  pattern: (?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})
```

Si vous associez les logs aux traces, cette règle peut entraîner des conflits, puisque les ID de trace peuvent avoir le même format. Dans ce cas, utilisez plutôt l'expression suivante :

```yaml
- type: mask_sequences
  name: visa_mc_amex_diners_discover_jcb_credit_card
  replace_placeholder: "[NUMÉRO DE CARTE BANCAIRE CENSURÉ]"
  pattern: \b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})\b
```

## Codes postaux

Vous pouvez censurer des codes postaux américains.

```yaml
- type: mask_sequences
  name: postal_codes
  replace_placeholder: "[CODE POSTAL CENSURÉ]"
  pattern: (?:\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d)
```

## Contenu entre parenthèses

Vous pouvez censurer les caractères après la chaîne `ExampleConfig(` jusqu'à la parenthèse fermante.

```yaml
- type: mask_sequences
  name: Example_config_redaction
  replace_placeholder: "ExampleConfig([CENSURÉ, CENSURÉ]"
  pattern: (?:ExampleConfig\([^\)]+)
```

## Contenu entre crochets

Vous pouvez censurer les caractères après la chaîne `on Example [` jusqu'au crochet fermant.

```yaml
- type: mask_sequences
  name: on_Example_redaction
  replace_placeholder: "on Example [EXEMPLE CENSURÉ]"
  pattern: (?:on Example\s?[^\s]+)
```

## Adresses IP de classe A

Vous pouvez censurer des adresses IP de classe A allant de 1.0.0.1 à 126.255.255.254.

```yaml
- type: mask_sequences
  name: simple_ip_address
  replace_placeholder: "[ADRESSE IP CENSURÉE]"
  pattern: (?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits est une marque déposée de Datadog, Inc.