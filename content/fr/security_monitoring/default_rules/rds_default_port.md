---
aliases:
  - /fr/2fa-56b-77b
cloud: aws
disable_edit: true
kind: documentation
rule_category:
  - Configuration du cloud
scope: rds
security: compliance
source: rds
title: Port RDS par défaut
type: security_rules
---
## Présentation

### Description

Vérifiez que les [instances de base de données Amazon RDS][1] n'utilisent pas de ports par défaut. Ces ports incluent le port MySQL/Aurora 3306, le port SQL Server 1433 et le port PostgreSQL 5432.

### Meilleure pratique

L'utilisation d'un port personnalisé permet de renforcer la protection contre les attaques par brute force et par dictionnaire.

### Remédiation

1. Exécutez `create-db-snapshot` avec les identifiants de votre base de données et de votre snapshot pour [créer un snapshot][2]

    {{< code-block lang="bash" filename="create-db-snapshot.sh" >}}
    aws rds create-db-snapshot \
        --db-instance-identifier database-mysql \
        --db-snapshot-identifier snapshotidentifier
    {{< /code-block >}}

2. Exécutez `modify-db-instance` avec un nouveau numéro de port valide. Une [liste des numéros de port est disponible][3].

    {{< code-block lang="bash" filename="modify-db-instance.sh" >}}
    aws rds modify-db-instance \
        --db-instance-identifier database-identifier \
        --option-group-name test-group-name \
        --db-parameter-group-name test-sqlserver-name \
        --apply-immediately
    {{< /code-block >}}



[1]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/create-db-snapshot.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/modify-db-instance.html#options