---
aliases:
  - /fr/60f-89d-fee
disable_edit: true
kind: documentation
rule_category:
  - Détection des logs
scope: gcp.cloudsql.database
security: compliance
source: gcp
title: Modification de base de données GCP Cloud SQL
type: security_rules
---
## Présentation

### Objectif
Détecter quand une base de données Cloud SQL a été modifiée.

### Stratégie
Cette règle vous permet de surveiller les logs d'audit liés aux activités d'administration de bases de données GCP Cloud SQL afin de déterminer si l'une des méthodes suivantes est invoquée :

* `cloudsql.instances.create`
* `cloudsql.instances.create`
* `cloudsql.users.update`

### Triage et réponse
1. Examinez la base de données Cloud SQL et assurez-vous qu'elle est configurée correctement avec les autorisations appropriées.