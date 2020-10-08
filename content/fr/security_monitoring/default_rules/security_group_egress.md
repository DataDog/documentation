---
aliases:
  - /fr/cfd-f0b-f05
cloud: aws
disable_edit: true
kind: documentation
rule_category:
  - Configuration du cloud
scope: ec2
security: compliance
source: ec2
title: Groupe de sécurité avec accès sortant non restreint sur tous les ports
type: security_rules
---
## Présentation

### Description
Limitez les risques d'accès non autorisé en vous assurant que les règles d'accès sortant de vos [groupes de sécurité EC2][1] n'autorisent pas l'accès à n'importe quel port TCP/UDP et ne restreignent pas l'accès aux adresses IP qui nécessitent ce port.

### Meilleure pratique

L'absence de restrictions sur les accès sortants laisse la porte ouverte aux activités malveillantes, telles que les attaques par déni de service (DoS) et les attaques par déni de service distribué (DDoS).

### Remédiation

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