---
aliases:
  - /fr/rys-j0l-jyg
  - /fr/security_monitoring/default_rules/rys-j0l-jyg
  - /fr/security_monitoring/default_rules/aws-s3-publicaccess
cloud: aws
disable_edit: true
integration_id: amazon-s3
kind: documentation
rule_category:
  - Cloud Configuration
scope: s3
security: conformité
source: s3
title: Le compartiment S3 n'est pas librement accessible aux utilisateurs anonymes
type: security_rules
---
## Description

Définissez votre compartiment Amazon S3 comme privé.

## Raison

Les compartiments Amazon S3 accessibles au public accordent un accès `FULL_CONTROL` à tous les utilisateurs, y compris ceux anonymes. L'accès `FULL_CONTROL` permet aux utilisateurs d'importer, de modifier, de supprimer et d'afficher des objets S3.

## Remédiation

### Console

Consultez la documentation [Configuration d'ACL : utilisation de la console S3 pour définir des autorisations ACL pour un compartiment][1] pour retirer l'accès `FULL_CONTROL` et mettre à jour les autorisations ACL.

### Interface de ligne de commande

1. Exécutez `put-bucket-acl` avec le [nom de votre compartiment et votre ACL][2] sur `private`.

  {{< code-block lang="bash" filename="put-bucket-acl.sh" >}}
  aws s3api put-bucket-acl
    --bucket nom-du-compartiment
    --acl private
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/managing-acls.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-acl.html#synopsis