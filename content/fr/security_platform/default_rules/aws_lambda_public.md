---
aliases:
  - /fr/rl5-ki5-ja8
  - /fr/security_monitoring/default_rules/rl5-ki5-ja8
  - /fr/security_monitoring/default_rules/aws_lambda_public
cloud: aws
disable_edit: true
integration_id: amazon-lambda
kind: documentation
rule_category:
  - Cloud Configuration
scope: lambda
security: conformité
source: lambda
title: La fonction Lambda n'est pas accessible au public
type: security_rules
---
## Description

Modifiez la stratégie d'accès de votre fonction Lambda AWS pour empêcher les utilisateurs non autorisés d'accéder à votre fonction.

## Raison

Si des utilisateurs anonymes sont autorisés à appeler des fonctions Lambda, cela risque d'entraîner des pertes de données, des divulgations d'informations ainsi qu'une hausse inattendue de vos coûts AWS.

## Remédiation

### Console

Suivez les instructions de la page [Utilisation de stratégies basées sur les ressources pour AWS Lambda][1] pour modifier les autorisations de votre fonction Lambda AWS.

### Interface de ligne de commande

1. Exécutez la commande `remove-permission` en indiquant votre [nom de fonction et ID de déclaration][2].

  {{< code-block lang="bash" filename="remove-permission.sh" >}}
  aws lambda remove-permission
    --function-name votre-nom-fonction
    --statement-id ab-12ab34c5-6a78-9b0c-123d-a123b456c789
  {{< /code-block >}}

2. Exécutez la commande `add-permission` en indiquant votre [nom de fonction, ID de déclaration, principal pour le compte de confiance et action][3].

  {{< code-block lang="bash" filename="add-permission.sh" >}}
  aws lambda add-permission
    --function-name votre-nom-fonction
    --statement-id ab-12ab34c5-6a78-9b0c-123d-a123b456c789
    --principal 0123456780123
    --action lambda:InvokeFunction
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/lambda/latest/dg/access-control-resource-based.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/remove-permission.html#synopsis
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/add-permission.html#synopsis