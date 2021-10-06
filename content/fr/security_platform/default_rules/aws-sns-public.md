---
aliases:
  - /fr/fcc-nsq-vkn
  - /fr/security_monitoring/default_rules/fcc-nsq-vkn
  - /fr/security_monitoring/default_rules/aws-sns-public
cloud: aws
disable_edit: true
integration_id: amazon-sns
kind: documentation
rule_category:
  - Cloud Configuration
scope: sns
security: conformité
source: sns
title: La rubrique SNS n'est pas accessible au public
type: security_rules
---
## Description

Mettez à jour vos autorisations pour Amazon Simple Notification Service (SNS).

## Raison

Les rubriques accessibles au public permettent aux utilisateurs non autorisés de recevoir et publier des messages et de s'abonner aux rubriques exposées.

## Remédiation

### Console

Consultez la documentation relative à [l'utilisation de stratégies basées sur l'identité avec Amazon SNS][1] pour apprendre à créer ou ajouter une stratégie à votre console AWS.

### Interface de ligne de commande

Si vous ne disposez pas d'une stratégie de contrôle d'accès, [créez-en une][2].

1. Sélectionnez `SNS Topic Policy` comme type de stratégie.
2. Ajoutez une déclaration afin d'autoriser uniquement les utilisateurs et les rôles IAM spécifiques à accéder à la rubrique. Par exemple :

    {{< code-block lang="text">}}
    Effet : `Allow`
    Principal : `arn:aws:iam::123456789012:root`
    Action : `Add permission`
    Nom de la ressource Amazon : `arn:aws:iam::123456789012:root`
    {{< /code-block >}}

Si vous avez une stratégie de contrôle d'accès, consultez la documentation relative à [l'ajout de permissions][3] pour ajouter une permission à votre stratégie existante.

[1]: https://docs.aws.amazon.com/sns/latest/dg/sns-using-identity-based-policies.html#iam-and-sns-policies
[2]: https://awspolicygen.s3.amazonaws.com/policygen.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sqs/add-permission.html