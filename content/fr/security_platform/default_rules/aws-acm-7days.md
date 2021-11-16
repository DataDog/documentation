---
aliases:
  - /fr/fz6-l0k-bbu
  - /fr/security_monitoring/default_rules/fz6-l0k-bbu
  - /fr/security_monitoring/default_rules/aws-acm-7days
cloud: aws
disable_edit: true
integration_id: amazon-acm
kind: documentation
rule_category:
  - Cloud Configuration
scope: acm
security: conformité
source: acm
title: "Certificat ACM expirant dans plus de 7\_jours"
type: security_rules
---
## Description

Renouvelez votre certificat SSL/TLS géré par AWS Certificat Manager, car il vous reste 7 jours pour le renouveler.

## Raison

Les certificats qui ne sont pas renouvelés avant leur date d'expiration perdent leur validité, ce qui risque de compromettre la sécurité des communications entre le client et les ressources AWS.

## Remédiation

### Console

ACM renouvelle automatiquement les certificats (si vous utilisez la validation DNS) ou envoie une notification par e-mail lorsque la date d'expiration approche. Consultez la page [Renouvelle géré des certificats ACM][1] pour en savoir plus.

### Interface de ligne de commande

1. Exécutez `import-certificate` en précisant l'[ARN du certificat SSL/TLS][2] à renouveler. Cette commande renvoie l'ARN du certificat SSL/TLS renouvelé.

  {{< code-block lang="bash" filename="import-certificate.sh" >}}
    aws acm import-certificate
      --certificate-arn <valeur>
      --certificate <valeur>
      --private-key <valeur>
      --certificate-chain <valeur>
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/acm/import-certificate.html