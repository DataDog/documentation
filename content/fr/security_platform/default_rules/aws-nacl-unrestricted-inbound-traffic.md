---
aliases:
  - /fr/01b-a6f-d0c
  - /fr/security_monitoring/default_rules/01b-a6f-d0c
  - /fr/security_monitoring/default_rules/aws-nacl-unrestricted-inbound-traffic
cloud: aws
disable_edit: true
integration_id: amazon-vpc
kind: documentation
rule_category:
  - Cloud Configuration
scope: vpc
security: conformité
source: vpc
title: Trafic entrant restreint par les ACL réseau
type: security_rules
---
## Description

Examinez les listes de contrôle d'accès réseau (NACL) AWS pour vérifier la présence de règles autorisant l'ouverture de plusieurs ports et limitant le trafic entrant en fonction de la plage de ports.

## Raison

Éliminez les risques d'attaques malveillantes non autorisées, telles que les attaques par déni de service (DoS) ou par déni de service distribué (DDoS), en ouvrant uniquement les ports dont votre application a besoin pour fonctionner.

## Remédiation

### Console

Suivez la documentation relative à [l'ajout et la suppression de règles][2] pour limiter le trafic entrant en fonction d'une plage de ports.

### Interface de ligne de commande

1. Exécutez `replace-network-acl-entry` pour créer une règle qui autorise uniquement le trafic entrant à partir d'une plage de ports spécifique.

    {{< code-block lang="bash" filename="replace-network-acl-entry.sh" >}}
    aws ec2 replace-network-acl-entry
        --network-acl-id id-01234567
        --ingress
        --rule-number 01
        --protocol tcp
        --port-range From=000,To=000
        --rule-action allow
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#default-network-acl
[2]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#Rules