---
aliases:
  - /fr/cfd-f0b-f05
  - /fr/security_monitoring/default_rules/cfd-f0b-f05
  - /fr/security_monitoring/default_rules/security_group_egress
cloud: aws
disable_edit: true
integration_id: amazon-ec2
kind: documentation
rule_category:
  - Cloud Configuration
scope: ec2
security: conformité
source: ec2
title: Accès sortant restreint sur tous les ports
type: security_rules
---
## Description
Limitez les risques d'accès non autorisé en vous assurant que les règles d'accès sortant de vos [groupes de sécurité EC2][1] n'autorisent pas l'accès à n'importe quel port TCP/UDP et ne restreignent pas l'accès aux adresses IP qui nécessitent ce port.

## Raison

L'absence de restrictions sur les accès sortants laisse la porte ouverte aux activités malveillantes, telles que les attaques par déni de service (DoS) et les attaques par déni de service distribué (DDoS).

## Remédiation

### Console

Suivez la documentation relative aux [règles de groupe de sécurité][2] pour découvrir comment ajouter une règle de groupe de sécurité visant à restreindre l'accès aux adresses IP qui nécessitent un port spécifique.

### Interface de ligne de commande

1. Exécutez `revoke-security-group-egress` pour supprimer les autorisations IP pour le groupe de sécurité EC2 sélectionné.

    {{< code-block lang="bash" filename="revoke-security-group-egress.sh" >}}
    aws ec2 revoke-security-group-egress
        --group-id your-group-id
        --ip-permissions '[{"IpProtocol": "tcp", "FromPort": 22, "ToPort": 22, "IpRanges": [{"CidrIp": "0.0.0.0/0"}]}]'
    {{< /code-block >}}

2. Exécutez `authorize-security-group-egress` avec les nouveaux paramètres pour restreindre l'accès sortant à des destinations spécifiques.

    {{< code-block lang="bash" filename="authorize-security-group-egress.sh" >}}
    aws ec2 authorize-security-group-egress
        --group-id your-group-id
        --ip-permissions '[{"IpProtocol": "tcp", "FromPort": 22, "ToPort": 22, "IpRanges": [{"CidrIp": "0.0.0.0/0"}]}]'
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html
[2]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html#SecurityGroupRules