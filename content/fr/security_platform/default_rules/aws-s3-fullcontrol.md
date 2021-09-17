---
aliases:
  - /fr/8o9-i6i-hu6
  - /fr/security_monitoring/default_rules/8o9-i6i-hu6
  - /fr/security_monitoring/default_rules/aws-s3-fullcontrol
cloud: aws
disable_edit: true
integration_id: amazon-s3
kind: documentation
rule_category:
  - Cloud Configuration
scope: s3
security: conformité
source: s3
title: Le compartiment S3 n'autorise pas un accès avec contrôle total aux utilisateurs
type: security_rules
---
## Description

Mettez à jour votre autorisation ACL pour retirer l'accès `FULL_CONTROL` pour les comptes AWS authentifiés et les utilisateurs AWS IAM.

## Raison

L'accès `FULL_CONTROL` permet à tout utilisateur IAM ou compte AWS authentifié d'afficher, d'importer et de supprimer des objets S3 sans restriction.

## Remédiation

### Console

Consultez la documentation [Configuration d'ACL : utilisation de la console S3 pour définir des autorisations ACL pour un compartiment][1] pour retirer l'accès `FULL_CONTROL` et mettre à jour les autorisations ACL.

### Interface de ligne de commande

1. Exécutez `put-bucket-acl` avec le [nom de votre compartiment et ACL][2] sur `private`.

  {{< code-block lang="bash" filename="put-bucket-acl.sh" >}}
  aws s3api put-bucket-acl
    --bucket nom-du-compartiment-s3
    --acl private
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/managing-acls.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-acl.html#synopsis