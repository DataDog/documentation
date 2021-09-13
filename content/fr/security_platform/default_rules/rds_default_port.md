---
aliases:
  - /fr/2fa-56b-77b
  - /fr/security_monitoring/default_rules/2fa-56b-77b
  - /fr/security_monitoring/default_rules/rds_default_port
cloud: aws
disable_edit: true
integration_id: amazon-rds
kind: documentation
rule_category:
  - Cloud Configuration
scope: rds
security: conformité
source: rds
title: Aucune instance RDS n'utilise le port par défaut
type: security_rules
---
## Description

Vérifiez que les [instances de base de données Amazon RDS][1] n'utilisent pas de ports par défaut. Ces ports incluent le port MySQL/Aurora 3306, le port SQL Server 1433 et le port PostgreSQL 5432.

## Raison

L'utilisation d'un port personnalisé permet de renforcer la protection contre les attaques par brute force et par dictionnaire.

## Remédiation

### Console

Suivez la documentation relative à la [modification d'une instance de base de données Amazon RDS][4] pour vérifier que vous n'utilisez aucun port par défaut. Pour modifier le port utilisé, mettez à jour les [paramètres de l'instance de base de données][5].

### Interface de ligne de commande

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
[4]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.Modifying.html
[5]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.Modifying.html#USER_ModifyInstance.Settings