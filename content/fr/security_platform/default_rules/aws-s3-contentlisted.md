---
aliases:
  - /fr/eel-ic1-rey
  - /fr/security_monitoring/default_rules/eel-ic1-rey
  - /fr/security_monitoring/default_rules/aws-s3-contentlisted
cloud: aws
disable_edit: true
integration_id: amazon-s3
kind: documentation
rule_category:
  - Cloud Configuration
scope: s3
security: conformité
source: s3
title: Le contenu du compartiment S3 ne peut pas être listé par les utilisateurs
type: security_rules
---
## Description

Mettez à jour votre autorisation ACL pour retirer l'accès `READ` pour les comptes AWS ou utilisateurs IAM authentifiés.

## Raison

L'accès `READ` permet à n'importe quel utilisateur IAM ou compte AWS authentifié de lister tous les objets dans votre compartiment et d'exploiter des objets avec des autorisations ACL mal configurées.

## Remédiation

### Console

Consultez la documentation [Configuration d'ACL : utilisation de la console S3 pour définir des autorisations ACL pour un compartiment][1] pour déselectionner l'autorisation `Bucket ACL - Read` et mettre à jour les autorisations ACL.

### Interface de ligne de commande

1. Exécutez `put-bucket-acl` avec le [nom de votre compartiment et votre ACL][2] sur `private`.

  {{< code-block lang="bash" filename="put-bucket-acl.sh" >}}
  aws s3api put-bucket-acl
    --bucket nom-du-compartiment-s3
    --acl private
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/managing-acls.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-acl.html#synopsis