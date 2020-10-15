---
aliases:
  - /fr/01b-a6f-d0c
cloud: aws
disable_edit: true
kind: documentation
rule_category:
  - Configuration du cloud
scope: vpc
security: compliance
source: vpc
title: Trafic entrant non restreint par les ACL réseau
type: security_rules
---
## Présentation

### Description

Examinez les listes de contrôle d'accès réseau (NACL) AWS pour vérifier la présence de règles autorisant l'ouverture de plusieurs ports et limitant le trafic entrant en fonction de la plage de ports.

### Meilleure pratique

Éliminez les risques d'attaques malveillantes non autorisées, telles que les attaques par déni de service (DoS) ou par déni de service distribué (DDoS), en ouvrant uniquement les ports dont votre application a besoin pour fonctionner.

### Étapes à suivre

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