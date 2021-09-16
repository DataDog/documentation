---
aliases:
  - /fr/nmb-c7a-8rv
  - /fr/security_monitoring/default_rules/nmb-c7a-8rv
  - /fr/security_monitoring/default_rules/aws-sqs-encryption
cloud: aws
disable_edit: true
integration_id: amazon-sqs
kind: documentation
rule_category:
  - Cloud Configuration
scope: sqs
security: conformité
source: sqs
title: La file d'attente SQS est chiffrée côté serveur
type: security_rules
---
## Description

Sécurisez vos messages Amazon Simple Queue Service (SQS) grâce au chiffrement côté serveur.

## Raison

Le chiffrement garantit que les messages Amazon SQS, qui peuvent contenir des données sensibles, ne sont pas accessibles aux utilisateurs anonymes ou non autorisés.

## Remédiation

### Console

Consultez la documentation relative à [la configuration du chiffrement côté service pour une file d'attente (console)][1] pour découvrir comment créer et utiliser AWS Key Management Service (AWS KMS), afin de gérer les clés principales client (CMK) pour le chiffrement côté serveur.

### Interface de ligne de commande

1. Définissez `set-queue-attributes` dans [un fichier][2]. Utilisez votre ARN de KMS personnalisé pour `KmsMasterKeyID`. Enregistrez le fichier.

    {{< code-block lang="json" filename="set-queue-attributes.json" >}}
    {
      "KmsMasterKeyId": "custom_key_arn",
      "KmsDataKeyReusePeriodSeconds": "300"
    }
    {{< /code-block >}}

2. Exécutez `set-queue-attributes` avec l'[URL de la file d'attente et le fichier][2] créé au cours de l'étape 1.

    {{< code-block lang="bash" filename="set-queue-attributes.sh" >}}
    aws sqs set-queue-attributes
      --queue-url https://us-west-2.queue.amazonaws.com/123456789012/WebWorkerSQSQueue
      --attributes file://sqs-sse-enabled.json
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-server-side-encryption.html
[2]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-queues.html#aws-properties-sqs-queues-syntax
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sqs/set-queue-attributes.html#synopsis