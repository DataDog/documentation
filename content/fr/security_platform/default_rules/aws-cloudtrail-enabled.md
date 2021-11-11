---
aliases:
  - /fr/79d-8f7-432
  - /fr/security_monitoring/default_rules/79d-8f7-432
  - /fr/security_monitoring/default_rules/aws-cloudtrail-enabled
cloud: aws
disable_edit: true
integration_id: amazon-cloudtrail
kind: documentation
rule_category:
  - Cloud Configuration
scope: cloudtrail
security: conformité
source: cloudtrail
title: Journal de suivi Cloudtrail avec plusieurs régions activé
type: security_rules
---
## Description

Vérifiez qu'AWS CloudTrail est activé.

## Raison

Vous pouvez configurer dans AWS CloudTrail plusieurs régions depuis un seul emplacement, afin de garantir la sécurité de votre infrastructure.

## Remédiation

### Console

Suivez le [tutoriel AWS CloudTrail][1] pour débuter avec CloudTrail.

### Interface de ligne de commande

1. Exécutez `aws cloudtrail describe-trails`.
2. Exécutez `update-trail` à partir des noms de journaux de suivi renvoyés pour [activer multi-region-trail][2].

    {{< code-block lang="bash" filename="update-trail.sh" >}}
    aws cloudtrail update-trail
        --name GlobalTrailName
        --is-multi-region-trail
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-tutorial.html#tutorial-step2
[2]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail-by-using-the-aws-cli-update-trail.html