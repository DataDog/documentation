---
app_id: eversql
categories:
- automation
- data stores
- developer tools
custom_kind: integration
description: Optimisation automatique des requêtes SQL et des bases de données pour
  MySQL, PostgreSQL, Aurora
integration_version: 1.0.0
media:
- caption: Optimisation SQL avec EverSQL
  image_url: images/1.png
  media_type: image
- caption: Différence entre requêtes avec EverSQL
  image_url: images/2.png
  media_type: image
- caption: Bases de données prises en charge par EverSQL
  image_url: images/3.png
  media_type: image
- caption: Systèmes d'exploitation pris en charge par EverSQL
  image_url: images/4.png
  media_type: image
supported_os:
- linux
- windows
- macos
title: 'EverSQL : Optimisation des bases de données'
---
## Section Overview

[EverSQL] (https://www.eversql.com/) est un moyen d'accélérer votre base de données et d'optimiser les requêtes SQL, en fournissant un réglage et une indexation SQL automatiques pour les développeurs, les administrateurs de bases de données et les ingénieurs DevOps.

EverSQL est non intrusif, ce qui signifie qu'il n'accède jamais aux données sensibles de votre base de données.

### Utilisation

Les requêtes SQL lentes trouvées dans le tableau de bord Datadog Database Monitoring peuvent être optimisées à l'aide d'EverSQL. Copiez la requête SQL lente depuis Datadog et collez-la directement dans le processus [Optimisation SQL](https://www.eversql.com/sql-query-optimizer/) d'EverSQL. Pour en savoir plus sur la résolution d'une requête lente, consultez le guide [Getting Started with Database Monitoring](https://docs.datadoghq.com/getting_started/database_monitoring/#troubleshoot-a-slow-query).

### Bases de données prises en charge :

MySQL, PostgreSQL, AWS Aurora, Google Cloud SQL, Azure DB, Percona et MariaDB.

## Configuration

### Configuration

Pour accélérer les requêtes SQL lentes identifiées par Datadog :

1. Accédez au tableau de bord [Datadog Database Monitoring ](https://app.datadoghq.com/databases/) et localisez le tableau des requêtes SQL lentes.
1. Filtrez les données en fonction de la base de données qui vous intéresse, puis triez-les en fonction d'une métrique de performances pertinente, telle que la latence moyenne.
1. Après avoir identifié la requête SQL que vous souhaitez accélérer, copiez-la depuis Datadog.
1. Naviguez vers [EverSQL] (https://www.eversql.com/sql-query-optimizer/) et collez la requête SQL dans le cadre du processus d'optimisation de la requête.
1. À partir du rapport d'optimisation, copiez et créez les index optimisés dans votre base de données.
1. Copiez la nouvelle requête optimisée dans le code de votre application.

## Données collectées

### Métriques

EverSQL n'inclut aucune métrique.

### Checks de service

EverSQL n'inclut aucun check de service.

### Événements

EverSQL n'inclut aucun événement.

## Assistance

Besoin d'aide ? Contactez [EverSQL support] (https://eversql.freshdesk.com/support/tickets/new).