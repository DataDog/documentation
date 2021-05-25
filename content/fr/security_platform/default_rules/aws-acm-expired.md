---
aliases:
  - /fr/2g5-b7o-dqd
  - /fr/security_monitoring/default_rules/2g5-b7o-dqd
  - /fr/security_monitoring/default_rules/aws-acm-expired
cloud: aws
disable_edit: true
integration_id: amazon-acm
kind: documentation
rule_category:
  - Cloud Configuration
scope: acm
security: conformité
source: acm
title: Certificat ACM actif
type: security_rules
---
## Description

Supprimez les certificats Secure Socket Layer (SSL) ou Transport Layer Security (TLS) expirés avec AWS Certificate Manager (ACM).

## Raison

Les certificats SSL/TLS AWS ACM expirés qui sont déployés vers une autre ressource risquent de déclencher des erreurs frontend et de nuire à la fiabilité d'une application Web.

## Remédiation

### Console

Consultez la section [Suppression de certificats gérés par ACM][1] pour découvrir comment supprimer des certificats SSL/TLS depuis la console AWS.

### Interface de ligne de commande

1. Exécutez `delete-certificate` avec l'[ARN du certificat][2].

    {{< code-block lang="bash" filename="delete-certificate.sh" >}}
    aws acm delete-certificate
        --certificate-arn arn:aws:acm:region:123456789012:certificate/12345678-1234-1234-1234-123456789012
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-delete.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/acm/delete-certificate.html