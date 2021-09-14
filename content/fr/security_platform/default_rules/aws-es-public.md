---
aliases:
  - /fr/kbp-pln-54a
  - /fr/security_monitoring/default_rules/kbp-pln-54a
  - /fr/security_monitoring/default_rules/aws-es-public
cloud: aws
disable_edit: true
integration_id: amazon-elasticsearch
kind: documentation
rule_category:
  - Cloud Configuration
scope: elasticsearch
security: conformité
source: elasticsearch
title: Le domaine Elasticsearch n'est pas accessible au public
type: security_rules
---
## Description

Mettez à jour les domaines Amazon Elasticsearch accessibles au public pour bloquer les requêtes non signées.

## Raison

Mettre à niveau votre domaine Amazon Elasticsearch vers un domaine privé vous assure que les données ne peuvent être lues ou modifiées par les utilisateurs non autorisés.

## Remédiation

### Console

Consultez la documentation relative à [la configuration de stratégies d'accès][1] pour apprendre à mettre à jour vos domaines Amazon ElasticSearch accessibles au public dans la console AWS.

### Interface de ligne de commande

1. Créez un nouveau document de stratégie JSON. Vous pouvez suivre [le modèle de stratégie Amazon Elasticsearch][2] pour créer une stratégie personnalisée qui garantit un accès au domaine réservé à une IP spécifique.

    {{< code-block lang="bash" filename="ip-based-policy.json" >}}
    {
    ...
    "Statement": [
        ...
        "Action": "es:*",
        "Condition": {
            "IpAddress": {
            "aws:SourceIp": [
                "54.197.25.93/32"
            ]
            }
        },
        "Resource": "arn:aws:es:123456789123:
                    domain/es-cluster/*"
        }
    ]
    }
    {{< /code-block >}}

2. Exécutez `update-elasticsearch-domain-config` en utilisant le nom du [domaine Elasticsearch][3] créé lors de l'étape précédente.

    {{< code-block lang="bash" filename="ip-based-policy.json" >}}
    aws es update-elasticsearch-domain-config
        --domain-name es-cluster
        --access-policies file://ip-based-policy.json
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-createupdatedomains.html#es-createdomain-configure-access-policies
[2]: https://docs.aws.amazon.com/kms/latest/developerguide/determining-access-key-policy.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/es/update-elasticsearch-domain-config.html