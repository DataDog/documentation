---
aliases:
  - /fr/dsk-1y0-pv3
  - /fr/security_monitoring/default_rules/dsk-1y0-pv3
  - /fr/security_monitoring/default_rules/aws-sqs-public
cloud: aws
disable_edit: true
integration_id: amazon-sqs
kind: documentation
rule_category:
  - Cloud Configuration
scope: sqs
security: conformité
source: sqs
title: La file d'attente SQS n'est pas accessible au public
type: security_rules
---
## Description

Mettre à jour vos autorisations pour Amazon Simple Queue Service (SQS).

## Raison

Les queues SQS Amazon accessibles au public donnent l'accès suffisant aux utilisateurs non autorisés pour intercepter, supprimer, ou envoyer des messages de queue, ce qui peut provoquer des fuites de données.

## Remédiation

### Console

Consultez la documentation relative à [la gestion des accès aux ressources][1] pour apprendre à implémenter des stratégies de permissions dans la console AWS.

### Interface de ligne de commande

1. Exécutez `list-queues` pour obtenir une liste des URLs de queue.
2. Exécutez `get-queue-attributes` avec une [URL de queue][2] renvoyée au cours de l'étape 1.

    {{< code-block lang="bash" filename="get-queue-attributes.sh" >}}
    aws sqs get-queue-attributes
        --queue-url https://queue.amazonaws.com/123456789012/YourQueue
        --attribute-names Policy
    {{< /code-block >}}

3. Exécutez `add-permission` pour [ajouter une nouvelle déclaration][3] à votre stratégie de queue.

    {{< code-block lang="bash" filename="add-permission.sh" >}}
    aws sqs add-permission
        --queue-url https://queue.amazonaws.com/123456789012/YourQueue
        --label SendMessages
        --aws-account-ids 123456789012
        --actions SendMessage
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-overview-of-managing-access.html#sqs-managing-access-to-resources
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sqs/get-queue-attributes.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sqs/add-permission.html