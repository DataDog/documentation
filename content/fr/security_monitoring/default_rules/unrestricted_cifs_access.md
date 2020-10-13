---
aliases:
  - /fr/3ce-77d-28a
cloud: aws
disable_edit: true
kind: documentation
rule_category:
  - Configuration de cloud
scope: ec2
security: compliance
source: ec2
title: Groupe de sécurité avec accès CIFS entrant non restreint
type: security_rules
---
## Présentation

### Description

Limitez les risques d'accès non autorisé en vous assurant que les règles d'accès entrant de vos [groupes de sécurité EC2][1] n'autorisent pas le libre accès au port TCP 445, couramment utilisé par les applications client/serveur, et ne restreignent pas l'accès aux adresses IP qui nécessitent ce port.

### Meilleure pratique

L'octroi d'un accès CIFS (Common Internet File System) non restreint sur le port TCP 445 peut entraîner des activités malveillantes, comme des attaques par déni de service (DoS) ou de type man-in-the-middle (MITM). Ce port est couramment utilisé par les applications client/serveur comme moyen de communication entre les nœuds réseau.

### Étapes à suivre

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