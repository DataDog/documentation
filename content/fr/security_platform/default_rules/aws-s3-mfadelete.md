---
aliases:
  - /fr/k20-cl4-oat
  - /fr/security_monitoring/default_rules/k20-cl4-oat
  - /fr/security_monitoring/default_rules/aws-s3-mfadelete
cloud: aws
disable_edit: true
integration_id: amazon-s3
kind: documentation
rule_category:
  - Cloud Configuration
scope: s3
security: conformité
source: s3
title: La fonctionnalité MFA Delete est activée sur le compartiment S3
type: security_rules
---
## Description

Configurez la fonctionnalité de suppression à authentification multifacteur (MFA) pour éviter la suppression d'objets Amazon S3.

## Raison

## Remédiation

L'activation de l'authentification multifacteur sur un compartiment Amazon S3 permet d'empêcher toute suppression accidentelle ou volontaire des objets S3 par les utilisateurs AWS qui ont accès à votre compartiment.

### Console

La fonctionnalité `MFA DELETE` [ne peut pas être activée via la console AWS][1]. Consultez les instructions pour l'interface de ligne de commande ci-dessous.

### Interface de ligne de commande

1. Exécutez `put-bucket-versioning` avec [le nom de votre compartiment, votre configuration de versioning et votre configuration d'authentification multifacteur][2].

  {{< code-block lang="bash" filename="put-bucket-acl.sh" >}}
  aws s3api put-bucket-versioning
    --bucket nom-du-compartiment-s3
    --versioning-configuration '{"MFADelete":"Enabled","Status":"Enabled"}'
    --mfa 'arn:aws:iam::aws_account_id:mfa/root-account-mfa-device'
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiFactorAuthenticationDelete.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-versioning.html#synopsis