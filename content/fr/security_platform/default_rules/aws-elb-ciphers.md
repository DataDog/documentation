---
aliases:
  - /fr/chz-onk-sn5
  - /fr/security_monitoring/default_rules/chz-onk-sn5
  - /fr/security_monitoring/default_rules/aws-elb-ciphers
cloud: aws
disable_edit: true
integration_id: amazon-elb
kind: documentation
rule_category:
  - Cloud Configuration
scope: elb
security: conformité
source: elb
title: La stratégie de sécurité de l'ELB ne contient pas de chiffrement non sécurisé
type: security_rules
---
## Description

Mettez à jour le SSL de votre équilibreur de charge élastique en ajoutant un chiffrement sécurisé. 

## Raison

Les connexions SSL qui utilisent un chiffrement non sécurisé ou obsolète peuvent être exploitées.

## Remédiation

### Console

Consultez la documentation relative aux [configurations de négociation SSL des équilibreurs de charge classiques][1] (en anglais) pour découvrir comment configurer un chiffrement SSL sécurisé.

### Interface de ligne de commande

1. Exécutez `describe-load-balancer-policies` pour [répertorier toutes les stratégies de sécurité prédéfinies][2].

    {{< code-block lang="bash" filename="describe-load-balancer-policy.sh" >}}
    aws elb describe-load-balancer-policies
    --output table
    {{< /code-block >}}

2. Exécutez `create-load-balancer-policy` pour [créer une stratégie avec un chiffrement sécurisé][3] à l'aide de l'une des configurations SSL répertoriées lors de l'étape précédente.

    {{< code-block lang="bash" filename="create-load-balancer-policy.sh" >}}
    aws elb create-load-balancer-policy
        --load-balancer-name YourLoadBalancerName
        --policy-name YourCustomSecurityPolicy
        --policy-type-name YourPolicyTypeName
        --policy-attributes AttributeName=Protocol-TLSv1.2,AttributeValue=true AttributeName=Protocol-TLSv1.1,AttributeValue=true AttributeName=ECDHE-RSA-AES128-SHA,AttributeValue=true AttributeName=Server-Defined-Cipher-Order,AttributeValue=true
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-ssl-security-policy.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elb/describe-load-balancer-policies.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elb/create-load-balancer-policy.html