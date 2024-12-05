---
app_id: eversql
app_uuid: bc900600-d0cf-4ddf-83b7-cdaba44d1525
assets: {}
author:
  homepage: https://eversql.com
  name: EverSQL
  sales_email: sales@eversql.com
  support_email: support@eversql.com
categories:
- monitoring
- automation
- languages
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/eversql/README.md
display_on_public_website: true
draft: false
git_integration_title: eversql
integration_id: eversql
integration_title: 'EverSQL : Optimisation des bases de données'
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: eversql
public_title: 'EverSQL : Optimisation des bases de données'
short_description: Optimisation automatique des requêtes SQL et des bases de données
  pour MySQL, PostgreSQL, Aurora
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Monitoring
  - Category::Automation
  - Category::Languages
  configuration: README.md#Setup
  description: Optimisation automatique des requêtes SQL et des bases de données pour
    MySQL, PostgreSQL, Aurora
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
  overview: README.md#Overview
  support: README.md#Support
  title: 'EverSQL : Optimisation des bases de données'
---



## Présentation

[EverSQL][1] est un outil conçu pour accélérer votre base de données et optimiser vos requêtes SQL. Il offre des fonctions de réglage et d'indexation automatiques des requêtes SQL pour les développeurs, les administrateurs de base de données et les ingénieurs DevOps.

EverSQL est non intrusif, ce qui signifie qu'il n'accède jamais aux données sensibles de votre base de données.

### Utilisation

Les requêtes SQL lentes identifiées dans le dashboard Database Monitoring de Datadog peuvent être optimisées avec EverSQL. Copiez la requête SQL lente depuis Datadog et collez-la directement dans le processus d'[optimisation SQL][2] d'EverSQL. Pour en savoir plus sur le dépannage des requêtes lentes, consultez le guide [Prise en main de la solution Database Monitoring][3].

### Bases de données prises en charge :
MySQL, PostgreSQL, AWS Aurora, Google Cloud SQL, Azure DB, Percona et MariaDB.

## Configuration

### Configuration
Pour accélérer les requêtes SQL lentes identifiées par Datadog :
1. Accédez au dashboard [Database Monitoring de Datadog][4] et repérez la table des requêtes SQL lentes.
2. Filtrez les données en fonction de la base de données qui vous intéresse, puis triez-les en fonction d'une métrique de performances pertinente, telle que la latence moyenne.
3. Après avoir identifié la requête SQL que vous souhaitez accélérer, copiez-la depuis Datadog.
4. Accédez à [EverSQL][2] et collez la requête SQL dans le processus d'optimisation de requête.
5. À partir du rapport d'optimisation, copiez et créez les index optimisés dans votre base de données.
6. Copiez la nouvelle requête optimisée dans le code de votre application.

## Données collectées

### Métriques

EverSQL n'inclut aucune métrique.

### Checks de service

EverSQL n'inclut aucun check de service.

### Événements

EverSQL n'inclut aucun événement.

## Assistance

Besoin d'aide ? Contactez [l'assistance EverSQL][5].

[1]: https://www.eversql.com/
[2]: https://www.eversql.com/sql-query-optimizer/
[3]: https://docs.datadoghq.com/fr/getting_started/database_monitoring/#troubleshoot-a-slow-query
[4]: https://app.datadoghq.com/databases/
[5]: https://eversql.freshdesk.com/support/tickets/new