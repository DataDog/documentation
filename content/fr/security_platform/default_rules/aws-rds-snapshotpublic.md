---
aliases:
  - /fr/fo0-6re-l0f
  - /fr/security_monitoring/default_rules/fo0-6re-l0f
  - /fr/security_monitoring/default_rules/aws-rds-snapshotpublic
cloud: aws
disable_edit: true
integration_id: amazon-rds
kind: documentation
rule_category:
  - Cloud Configuration
scope: rds
security: conformité
source: rds
title: Le snapshot RDS n'est pas accessible au public
type: security_rules
---
## Description

Sécurisez vos snapshots de base de données Amazon Relational Database Service (RDS).

## Raison

Les snapshots qui sont accessibles au public donnent aux autres comptes AWS l'autorisation de copier un snapshot et de créer des instances de base de données à partir de celui-ci, ce qui risque d'exposer vos données privées.

## Remédiation

### Console

Consultez la documentation de la console AWS pour découvrir comment [arrêter de partager un snapshot de base de données manuel avec un compte AWS][1].

### Interface de ligne de commande

Exécutez `modify-db-snapshot-attribute` avec [l'identifiant du snapshot, le nom de l'attribut et les valeurs à supprimer][2]. Cela permet d'empêcher un compte AWS spécifique de restaurer le snapshot de base de données.

    {{< code-block lang="bash" filename="modify-db-snapshot-attribute.sh" >}}
    aws rds modify-db-snapshot-attribute
        --db-snapshot-identifier votresnapshotdebdd
        --attribute-name restore
        --values-to-remove 1111222233333
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ShareSnapshot.html#USER_ShareSnapshot.Sharing
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/modify-db-snapshot-attribute.html#synopsis