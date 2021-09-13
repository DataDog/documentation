---
aliases:
  - /fr/625-933-d8d
  - /fr/security_monitoring/default_rules/625-933-d8d
  - /fr/security_monitoring/default_rules/aws-rds-enabled-encryption
cloud: aws
disable_edit: true
integration_id: amazon-rds
kind: documentation
rule_category:
  - Cloud Configuration
scope: rds
security: conformité
source: rds
title: Chiffrement des instances de base de données RDS
type: security_rules
---
## Description

Vérifiez que vos instances de base de données AWS RDS sont chiffrées.

## Raison

Le chiffrement de vos clusters AWS RDS protège vos données sensibles contre tout accès non autorisé.

## Remédiation

### Console

Suivez la documentation relative à l'[activation du chiffrement Amazon RDS pour une instance de base de données][1] afin de vous assurer que vos instances sont chiffrées.

### Interface de ligne de commande

1. Exécutez `describe-db-instances` avec une requête d'identificateur d'instance pour énumérer les noms de bases de données RDS.

    {{< code-block lang="bash" filename="describe-db-instances.sh" >}}
    aws rds describe-db-instances
        --query 'DBInstances[*].DBInstanceIdentifier'
    {{< /code-block >}}

2. Exécutez `create-db-snapshot` avec toute instance de base de données renvoyée que vous souhaitez modifier.

    {{< code-block lang="bash" filename="create-db-snapshot.sh" >}}
    aws rds create-db-snapshot
        --db-snapshot-identifier my-db-snapshot
        --db-instance-identifier my-db-id
    {{< /code-block >}}

3. Exécutez `list-aliases` pour énumérer les alias de clés KMS par région.

    {{< code-block lang="bash" filename="list-aliases.sh" >}}
    aws kms list-aliases
        --region us-west-1
    {{< /code-block >}}

4. Exécutez `copy-db-snapshot` avec l'instance `kms-key-id` renvoyée à l'étape 3.

    {{< code-block lang="bash" filename="copy-db-snapshot.sh" >}}
    aws rds copy-db-snapshot
        --region us-west-1
        --source-db-snapshot-identifier original-db-snapshot-id
        --target-db-snapshot-identifier encrypted-db-snapshot-id
        --copy-tags
        --kms-key-id 01234567-1a2b-1234a-b45c-abcdef123456
    {{< /code-block >}}

5. Exécutez `restore-db-instance-from-db-snapshot` pour rétablir le snapshot créé précédemment.

    {{< code-block lang="bash" filename="restore-db-instance.sh" >}}
    aws rds restore-db-instance-from-db-snapshot
        --region us-west-1
        --db-instance-identifier encrypted-db-id
        --db-snapshot-identifier encrypted-db-snapshot-id
    {{< /code-block >}}

6. Exécutez `describe-db-instances` avec une requête pour vous assurer que les bases de données sont chiffrées.

    {{< code-block lang="bash" filename="describe-db-instances.sh" >}}
    aws rds describe-db-instances
        --region us-west-1
        --db-instance-identifier encrypted-db-snapshot-id
        --query 'DBInstances[*].StorageEncrypted'
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html#Overview.Encryption.Enabling