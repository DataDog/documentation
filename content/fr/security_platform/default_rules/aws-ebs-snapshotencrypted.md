---
aliases:
  - /fr/n68-nzh-pl8
  - /fr/security_monitoring/default_rules/n68-nzh-pl8
  - /fr/security_monitoring/default_rules/aws-ebs-snapshotencrypted
cloud: aws
disable_edit: true
integration_id: amazon-ebs
kind: documentation
rule_category:
  - Cloud Configuration
scope: ebs
security: conformité
source: ebs
title: Snapshot EBS chiffré
type: security_rules
---
## Description

Chiffrez vos snapshots Amazon Elastic Block Store (EBS) avec des clés de chiffrement de snapshot de volume.

## Raison

Les snapshots Amazon EBS contiennent des données sensibles, et les snapshots publics peuvent être copiés. Protégez vos données contre toute faille ou tout accès non autorisé grâce aux fonctionnalités de gestion de clés AWS.

## Remédiation

### Console

Consultez la section [Clé KMS par défaut pour le chiffrement EBS][1] pour découvrir comment chiffrer un snapshot depuis la console AWS.

### Interface de ligne de commande

1. Exécutez `get-ebs-default-kms-key-id` pour décrire la [clé principale client (CMK) par défaut][2].

2. Si vous devez créer une clé, consultez la section [Création de clés][3] de la documentation sur AWS Console ou la section [create-key][4] (en anglais) de la documentation sur l'interface de ligne de commande.

3. Exécutez `modify-ebs-default-kms-key-id` avec votre `--kms-key-id` pour [modifier la clé principale client (CMK) par défaut utilisée pour chiffrer les volumes EBS][3].

Consultez la section [get-ebs-default-kms-key-id][2] (en anglais) pour en savoir plus.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#EBSEncryption_key_mgmt
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/get-ebs-default-kms-key-id.html
[3]: https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/kms/create-key.html
[5]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/modify-ebs-default-kms-key-id.html
[6]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#encryption-by-default-api