---
aliases:
  - /fr/6lt-aha-t2f
  - /fr/security_monitoring/default_rules/6lt-aha-t2f
  - /fr/security_monitoring/default_rules/aws-s3-write_acp
cloud: aws
disable_edit: true
integration_id: amazon-s3
kind: documentation
rule_category:
  - Cloud Configuration
scope: s3
security: conformité
source: s3
title: Le compartiment S3 n'autorise pas les utilisateurs authentifiés à modifier les contrôles d'accès
type: security_rules
---
## Description

Modifiez vos autorisations de contrôle d'accès pour retirer l'accès `WRITE_ACP` pour les utilisateurs authentifiés.

## Raison

L'accès `WRITE_ACP` accorde à n'importe quel compte AWS ou utilisateur IAM authentifié les autorisations ACL (liste de contrôle d'accès) `READ` et `WRITE`. Ces autorisations permettent aux utilisateurs authentifiés de modifier, supprimer et mettre à jour des objets S3, ce qui peut entraîner des pertes de données ou des frais inattendus sur votre facture AWS.

## Remédiation

### Console

Consultez la documentation relative au [contrôle de l'accès à un compartiment avec des stratégies d'utilisateur][1] pour modifier votre stratégie existante et définir les autorisations de stratégie sur private.

### Interface de ligne de commande

1. Exécutez `put-bucket-acl` avec le [nom de votre compartiment S3 et l'ACL][2] sur `private`.

  {{< code-block lang="bash" filename="put-bucket-acl.sh" >}}
  aws s3api get-bucket-acl
    --bucket nom-du-compartiment
    --acl private
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/walkthrough1.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-versioning.html#synopsis