---
aliases:
  - /fr/e6r-fkw-pih
  - /fr/security_monitoring/default_rules/e6r-fkw-pih
  - /fr/security_monitoring/default_rules/aws-sns-subscription
cloud: aws
disable_edit: true
integration_id: amazon-sns
kind: documentation
rule_category:
  - Cloud Configuration
scope: sns
security: conformité
source: sns
title: Des limites d'abonnement sont définies pour la rubrique SNS
type: security_rules
---
## Description

Mettez à jour vos autorisations d'abonnement pour Amazon Simple Notification Service (SNS).

## Raison

Les utilisateurs anonymes peuvent recevoir et s'abonner aux messages que vous publiez, mettant ainsi en danger la sécurité de votre application ou votre service.

## Remédiation

### Console

Suivez la documentation relative aux [recommandations préventives][1] pour savoir comment implémenter un accès de moindre privilège ou utiliser des rôles IAM pour vos applications et services AWS.

### Interface de ligne de commande

1. Mettez à jour votre [stratégie de contrôle d'accès][2] avec l'ARN de l'utilisateur IAM. Définissez `action` sur `SNS:Publish` et incluez votre ARN IAM AWS. Enregistrez le fichier.

    {{< code-block lang="json" filename="access-control-policy-sub.sh" >}}
    {
      ...
      "Statement": [
        ...
        {
          "Sid": "console_sub",
          "Effect": "Allow",
          "Principal": {
            "AWS": "arn:aws:iam::123456789012:root"
          },
          "Action": [
            "SNS:Subscribe",
            "SNS:Receive"
          ],
          ...
        }
      ]
    }
    {{< /code-block >}}

2. Exécutez `set-topic-attributes` avec l'[ARN de la rubrique SNS][3].

    {{< code-block lang="bash" filename="set-topic-attributes.sh" >}}
    aws sns set-topic-attributes
    --topic-arn arn:aws:sns:region:123456789012:YourTopic
    --attribute-name DisplayName
    --attribute-value YourTopicDisplayName
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/sns/latest/dg/sns-security-best-practices.html#preventative-best-practices
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sns/set-topic-attributes.html#set-topic-attributes