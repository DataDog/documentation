---
aliases:
  - /fr/syd-qyw-b0e
  - /fr/security_monitoring/default_rules/syd-qyw-b0e
  - /fr/security_monitoring/default_rules/aws-dynamodb-encryption
cloud: aws
disable_edit: true
integration_id: amazon-dynamodb
kind: documentation
rule_category:
  - Cloud Configuration
scope: dynamodb
security: conformité
source: dynamodb
title: La table DynamoDB est chiffrée
type: security_rules
---
## Description

Implémentez un chiffrement côté serveur pour vos données AWS DynamoDB.

## Raison

Le chiffrement côté serveur, ou chiffrement au repos, fournit une couche de protection supplémentaire en sécurisant vos données dans une table chiffrée. Le chiffrement au repos fait appel à AWS Key Management Service (KMS) pour gérer les clés de chiffrement qui sont utilisées pour chiffrer ces tables.

## Remédiation

### Console

Consultez le [tutoriel sur la gestion des tables chiffrées dans DynamoDB][1] pour découvrir comment créer et à mettre à jour une table dans la console AWS.

### Interface de ligne de commande

Exécutez `create-table` avec une configuration de table pour [créer une table chiffrée][2]. Vous pouvez créer une table chiffrée avec la clé CMK appartenant à AWS par défaut, la clé CMK gérée par AWS ou une clé CMK gérée par un client. Consultez la [documentation AWS pour découvrir des exemples de chaque configuration][3]. Par exemple :

    {{< code-block lang="bash" filename="create-table.sh" >}}
    aws dynamodb create-table
    --table-name votre-table
    ...
    --sse-specification Enabled=true,SSEType=KMS,KMSMasterKeyId=abcd1234-abcd-1234-a123-ab1234a1b234
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/encryption.tutorial.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/dynamodb/create-table.html
[3]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/encryption.tutorial.html#encryption.tutorial-creating