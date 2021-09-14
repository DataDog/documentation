---
aliases:
  - /fr/62v-0kq-n6b
  - /fr/security_monitoring/default_rules/62v-0kq-n6b
  - /fr/security_monitoring/default_rules/aws-es-encryption
cloud: aws
disable_edit: true
integration_id: amazon-elasticsearch
kind: documentation
rule_category:
  - Cloud Configuration
scope: elasticsearch
security: conformité
source: elasticsearch
title: Domaines Elasticsearch chiffrés
type: security_rules
---
## Description

Mettez en place un chiffrement au repos pour votre domaine Amazon Elasticsearch grâce au service AWS KMS.

## Raison

L'ajout d'un chiffrement au repos vous permet de protéger votre domaine contre tout accès non autorisé et de garantir le respect de vos exigences en matière de sécurité et de conformité.

## Remédiation

### Console

Consultez la documentation relative à [l'activation du chiffrement de données au repos][1] (en anglais) pour découvrir comment mettre en place un chiffrement pour votre domaine.

### Interface de ligne de commande

1. Exécutez `describe-elasticsearch-domain` avec votre domaine Elasticsearch (ES) pour renvoyer les métadonnées de configuration.

    {{< code-block lang="bash" filename="describe-elasticsearch-domain.sh" >}}
    aws es describe-elasticsearch-domain
        --domain-name votre-domaine-es
    {{< /code-block >}}

2. Exécutez `create-elasticsearch-domain` avec votre nom de domaine et `encryption-at-rest-options`. Utilisez les métadonnées renvoyées lors de l'étape précédente pour [créer et relancer votre domaine ES afin d'activer le chiffrement au repos][3].

    {{< code-block lang="bash" filename="create-elasticsearch-domain.sh" >}}
    aws es create-elasticsearch-domain
        --domain-name votre-domaine-es
        ...
        --encryption-at-rest-options Enabled=true,KmsKeyId="abcdabcd-aaaa-bbbb-cccc-abcdabcdabcd"
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/encryption-at-rest.html#enabling-ear
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/es/describe-elasticsearch-domain.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/es/create-elasticsearch-domain.html