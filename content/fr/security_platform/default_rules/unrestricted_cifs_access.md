---
aliases:
  - /fr/3ce-77d-28a
  - /fr/security_monitoring/default_rules/3ce-77d-28a
  - /fr/security_monitoring/default_rules/unrestricted_cifs_access
cloud: aws
disable_edit: true
integration_id: amazon-ec2
kind: documentation
rule_category:
  - Cloud Configuration
scope: ec2
security: conformité
source: ec2
title: Accès CIFS entrant restreint
type: security_rules
---
## Description

Limitez les risques d'accès non autorisé en vous assurant que les règles d'accès entrant de vos [groupes de sécurité EC2][1] n'autorisent pas le libre accès au port TCP 445, couramment utilisé par les applications client/serveur, et ne restreignent pas l'accès aux adresses IP qui nécessitent ce port.

## Raison

L'octroi d'un accès CIFS (Common Internet File System) non restreint peut entraîner des activités malveillantes, comme des attaques par déni de service (DoS) ou de type man-in-the-middle (MITM). Le port TCP 445 est couramment utilisé par les applications client/serveur comme moyen de communication entre les nœuds réseau.

## Remédiation

### Console

Suivez la documentation relative aux [règles de groupe de sécurité][4] pour découvrir comment ajouter une règle de groupe de sécurité visant à restreindre l'accès aux adresses IP qui nécessitent un port spécifique.

### Interface de ligne de commande

1. Exécutez `revoke-security-group-ingress` pour [supprimer les règles entrantes][2] qui permettent un accès non restreint sur le port 445.

    {{< code-block lang="bash" filename="revoke-security-group-ingress.sh" >}}
        aws ec2 revoke-security-group-ingress
            --group-name group-name
            --protocol tcp
            --port 445
            --cidr 0.0.0.0/0
    {{< /code-block >}}

2. Exécutez `authorize-security-group-ingress` pour [ajouter de nouvelles règles entrantes][3] qui restreignent l'accès CIFS.

    {{< code-block lang="bash" filename="revoke-security-group-ingress.sh" >}}
        aws ec2 authorize-security-group-ingress
            --group-name your-group-name
            --protocol tcp
            --port 445
            --cidr 192.0.2.0/24
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/revoke-security-group-ingress.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/authorize-security-group-ingress.html
[4]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html#SecurityGroupRules