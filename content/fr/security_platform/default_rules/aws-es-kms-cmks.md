---
aliases:
  - /fr/617-v5l-ed8
  - /fr/security_monitoring/default_rules/617-v5l-ed8
  - /fr/security_monitoring/default_rules/aws-es-kms-cmks
cloud: aws
disable_edit: true
integration_id: amazon-elasticsearch
kind: documentation
rule_category:
  - Cloud Configuration
scope: elasticsearch
security: conformité
source: elasticsearch
title: Les domaines Elasticsearch sont chiffrés par des clés principales client KMS
type: security_rules
---
## Description

Chiffrez vos domaines Amazon Elasticsearch avec des clés principales client (CMKs).

## Raison

Les clés principales client KMS protègent vos domaines et vous permettent d'avoir un contrôle plus granulaire sur le processus de chiffrement/déchiffrement.

## Remédiation

### Console

Consultez la documentation relative à [l'activation du chiffrement de données au repos][1] pour apprendre à chiffrer les domaines Amazon ElasticSearch dans la console AWS.

### Interface de ligne de commande

1. Créez un nouveau document de stratégie JSON à l'aide de la [configuration][2] suivante :

    {{< code-block lang="json" filename="es-kms-cmk-policy.json" >}}
    {
    "Id": "es-custom-key-policy",
    "Statement": [
        {
        "Sid": "Enable IAM User Permissions",
        "Effect": "Allow",
        "Principal": {"AWS": "arn:aws:iam::111122223333:root"},
        "Action": "kms:*",
        "Resource": "*"
        },
        {
        "Sid": "Grant access to CMK manager",
        "Effect": "Allow",
        "Principal": {"AWS": "arn:aws:iam::111122223333:role/AmazonESManager"},
        "Action": [
            "kms:Create*",
            "kms:Describe*",
            "kms:Enable*",
            "kms:List*",
            "kms:Put*",
            "kms:Update*",
            "kms:Revoke*",
            "kms:Disable*",
            "kms:Get*",
            "kms:Delete*",
            "kms:ScheduleKeyDeletion",
            "kms:CancelKeyDeletion"
        ],
        "Resource": "*"
        },
        {
        "Sid": "Allow the use of the CMK",
        "Effect": "Allow",
        "Principal": {"AWS": "arn:aws:iam::111122223333:user/ESAdmin"},
        "Action": [
            "kms:Encrypt",
            "kms:Decrypt",
            "kms:ReEncrypt*",
            "kms:GenerateDataKey*",
            "kms:DescribeKey"
        ],
        "Resource": "*"
        },
        {
        "Sid": "Allow attachment of persistent resources",
        "Effect": "Allow",
        "Principal": {"AWS": "arn:aws:iam::111122223333:user/ESAdmin"},
        "Action": [
            "kms:CreateGrant",
            "kms:ListGrants",
            "kms:RevokeGrant"
        ],
        "Resource": "*",
        "Condition": {
            "Bool": {"kms:GrantIsForAWSResource": "true"}
        }
        }
    ]
    }
    {{< /code-block >}}

2. Exécutez `create-key` pour [créer une clé KMS][3] avec le nouveau document de stratégie.

    {{< code-block lang="bash" filename="create-key.sh" >}}
    aws kms create-key
    --description 'KMS CMK policy for encrypting es domain data'
    --policy file://es-kms-cmk-policy.json
    {{< /code-block >}}

3. Exécutez `create-alias` avec la clé ARN renvoyée pour [associer un nouvel alias][4] à la CMK.

    {{< code-block lang="bash" filename="create-alias.sh" >}}
    aws kms create-alias
        --alias-name your-alias/ESCustomCMK
        --target-key-id arn:aws:kms:111122223333:key/abcdabcd-aaaa-bbbb-cccc-abcdabcdabcd
    {{< /code-block >}}

4. Exécutez `create-elasticsearch-domain` à l'aide des données de configuration renvoyées au cours de l'étape 3 afin de [créer le domaine sélectionné][5] avec la valeur de `encryption-at-rest-options` définie sur `enabled= true` et `KmsKeyId=your-key-id`.

    {{< code-block lang="bash" filename="create-elasticsearch-domain.sh" >}}
    aws es create-elasticsearch-domain
        --domain-name your-domain-name
        ....
        --encryption-at-rest-options Enabled=true,KmsKeyId="abcdabcd-aaaa-bbbb-cccc-abcdabcdabcd"
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-createupdatedomains.html#es-createdomain-configure-access-policies
[2]: https://docs.aws.amazon.com/kms/latest/developerguide/determining-access-key-policy.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/kms/create-key.html
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/kms/create-alias.html#options
[5]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/es/create-elasticsearch-domain.html#options