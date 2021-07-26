---
aliases:
  - /fr/146-kl4-mas
  - /fr/security_monitoring/default_rules/146-kl4-mas
  - /fr/security_monitoring/default_rules/aws-ebs-encrypted
cloud: aws
disable_edit: true
integration_id: amazon-ebs
kind: documentation
rule_category:
  - Cloud Configuration
scope: ebs
security: conformité
source: ebs
title: Chiffrement des volumes EBS
type: security_rules
---
## Description

Activez le chiffrement pour Elastic Block Store (EBS).

## Raison

Le chiffrement AES-256, utilisé par EBS, permet de protéger les données stockées dans vos volumes, les E/S de disque et les snapshots créés à partir d'un volume afin de protéger vos données sensibles des failles et des utilisateurs non autorisés.

## Remédiation

### Console

Consultez la documentation relative au [chiffrement EBS][1] pour découvrir les exigences et les méthodes pour activer le chiffrement dans la console AWS.

### Interface de ligne de commande

1. Exécutez `enable-ebs-encryption-by-default` pour [activer le chiffrement pour votre compte dans la région actuelle][2].

2. Exécutez `get-ebs-encryption-by-default` pour confirmer que le chiffrement est activé.

Consultez la documentation relative à la [définition des valeurs par défaut avec l'API et l'interface de ligne de commande][3] pour découvrir d'autres commandes associées au chiffrement EBS.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#ebs-encryption-requirements
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/enable-ebs-encryption-by-default.html
[3]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#encryption-by-default-api