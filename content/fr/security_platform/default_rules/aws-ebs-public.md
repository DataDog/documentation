---
aliases:
  - /fr/g1t-jj4-k8k
  - /fr/security_monitoring/default_rules/g1t-jj4-k8k
  - /fr/security_monitoring/default_rules/aws-ebs-public
cloud: aws
disable_edit: true
integration_id: amazon-ebs
kind: documentation
rule_category:
  - Cloud Configuration
scope: ebs
security: conformité
source: ebs
title: Snapshot de volume EBS non partagé avec d'autres comptes AWS
type: security_rules
---
## Description

Sécurisez vos snapshots Amazon Elastic Block Store (EBS).

## Raison

Les snapshots de volume Amazon ABS partagés contiennent des données d'application sensibles, qui peuvent être consultées, copiées, voire même exploitées.

## Remédiation

### Console

Consultez la section [Fonctionnement du chiffrement EBS][1] pour découvrir comment mettre en œuvre le chiffrement EBS. Les snapshots publics, qui sont chiffrés par défaut, ne sont pas pris en charge.

    **Remarque** : vous pouvez partager un snapshot chiffré avec certains comptes.

### Interface de ligne de commande

1. Exécutez `enable-ebs-encryption-by-default` pour [activer le chiffrement pour votre compte dans la région actuelle][2].

2. Exécutez `get-ebs-encryption-by-default` pour confirmer que le chiffrement est activé.

Consultez la documentation relative à la [définition des valeurs par défaut avec l'API et l'interface de ligne de commande][3] pour découvrir d'autres commandes associées au chiffrement EBS.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#how-ebs-encryption-works
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#encryption-by-default-api
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/enable-ebs-encryption-by-default.html