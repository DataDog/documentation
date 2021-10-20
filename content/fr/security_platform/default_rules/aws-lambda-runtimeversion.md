---
aliases:
  - /fr/zbs-gp9-gp2
  - /fr/security_monitoring/default_rules/zbs-gp9-gp2
  - /fr/security_monitoring/default_rules/aws-lambda-runtimeversion
cloud: aws
disable_edit: true
integration_id: amazon-lambda
kind: documentation
rule_category:
  - Cloud Configuration
scope: lambda
security: conformité
source: lambda
title: La fonction Lambda utilise la dernière version de l'environnement d'exécution
type: security_rules
---
## Description

Mettez à jour votre fonction Amazon Lambda vers la dernière version de l'environnement d'exécution.

## Raison

Amazon recommande de mettre à jour systématiquement votre environnement d'exécution vers la dernière version pour obtenir les patchs de sécurité, les corrections de bugs et les dernières fonctionnalités.

## Remédiation

### Console

Consultez la documentation relative à la [configuration des fonctions dans la console][1] pour découvrir comment mettre à jour l'environnement Lambda qui exécute votre fonction.

### Interface de ligne de commande

1. Exécutez `update-function-configuration` avec [le nom de votre fonction et la version la plus récente de l'environnement d'exécution][2] pris en charge par AWS.

  {{< code-block lang="bash" filename="update-function-configuration.sh" >}}
  aws lambda update-function-configuration
    --function-name VotreFonctionLambda
    --runtime "python3.8"
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-console.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/update-function-configuration.html#synopsis