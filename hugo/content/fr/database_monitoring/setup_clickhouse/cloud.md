---
description: Installez et configurez Database Monitoring pour ClickHouse Cloud.
further_reading:
- link: /database_monitoring/
  tag: Documentation
  text: Database Monitoring
- link: /integrations/clickhouse/
  tag: Documentation
  text: Intégration ClickHouse
- link: /database_monitoring/troubleshooting/
  tag: Documentation
  text: Dépannage de la solution Database Monitoring
- link: /database_monitoring/guide/database_identifier/
  tag: Documentation
  text: Spécification d'un identifiant de base de données
- link: /database_monitoring/guide/clickhouse_agent_upgrade
  tag: Documentation
  text: Mise à niveau de l'intégration ClickHouse depuis des versions de l'Agent antérieures
    à 7.84
title: La configuration de Database Monitoring pour ClickHouse Cloud
---
Cette fonctionnalité est en préversion et nécessite Datadog Agent v7.84 ou une version ultérieure. Si vous configurez Database Monitoring pour ClickHouse avec une version de l'Agent antérieure à 7.84, consultez [Mise à niveau de l'intégration ClickHouse](/database_monitoring/guide/clickhouse_agent_upgrade/) pour accorder les autorisations supplémentaires avant d'effectuer la mise à niveau. Les clients qui participent à la préversion de Datadog Database Monitoring pour ClickHouse **ne seront pas facturés** pour l'utilisation encourue pendant la période de préversion. Aucune activation supplémentaire n'est requise ; suivez les instructions de configuration ci-dessous pour commencer.

Datadog Database Monitoring (DBM) pour ClickHouse offre une visibilité approfondie sur vos services ClickHouse Cloud en collectant des métriques de requêtes, des échantillons de requêtes en direct et des enregistrements de requêtes terminées pour vous aider à résoudre les problèmes et à optimiser les performances des requêtes sur l'ensemble de votre parc.

## Avant de commencer {#before-you-begin}

Versions de l'Agent prises en charge
: 7.84+

## Données collectées {#data-collected}

Database Monitoring collecte les données suivantes depuis ClickHouse :

**Instance de base de données**
: Collecte périodique (toutes les 5 minutes) des informations sur l'instance, notamment la version, le nom de host et la configuration. Les tags personnalisés définis dans l'option `tags` sont attachés à l'instance pour le filtrage et le regroupement par environnement, région, service ou toute autre dimension personnalisée.

**Métriques de requête**
: Métriques de performance agrégées pour les requêtes exécutées, permettant l'analyse du comportement des requêtes et des tendances au fil du temps. Collectées depuis `system.query_log`.

**Échantillons de requêtes**
: Des instantanés ponctuels des requêtes en cours d'exécution sont capturés à partir de `system.processes` à un intervalle d'une seconde. Comme les requêtes ClickHouse se terminent souvent en moins d'une seconde, les requêtes de courte durée peuvent ne pas toujours apparaître dans les échantillons.

**Achèvements de requêtes**
: Enregistrements des exécutions individuelles de requêtes terminées, capturant toutes les requêtes exécutées avec succès. Utilisez les achèvements de requêtes avec les échantillons de requêtes pour assurer une visibilité complète sur toute l'activité des requêtes, y compris les requêtes de courte durée non observées lors de l'échantillonnage.

**Plans d'exécution**
: Plans d'exécution de requêtes, collectés en exécutant `EXPLAIN` sur les tableaux référencés par les requêtes observées dans les achèvements de requêtes, pour aider à diagnostiquer les performances des requêtes. Seules les instructions `SELECT` (y compris les requêtes `WITH`) prennent en charge la collecte des plans d'exécution. Toutes les données collectées, y compris les plans d'exécution, sont obscurcies. Cette collecte nécessite un accès `SELECT` aux tableaux référencés par les requêtes surveillées, en plus de l'accès aux tableaux système décrit dans [Configuration](#setup).

**Parties et fusions**
: Données sur l'état du stockage, y compris les parties actives, les parties détachées, les fusions en arrière-plan, les mutations en attente et la profondeur de la file d'attente de réplication, collectées à partir de `system.parts`, `system.detached_parts`, `system.merges`, `system.mutations`, `system.replication_queue` et `system.merge_tree_settings`. Cela aide à identifier les problèmes de stockage et de réplication, tels que les fusions bloquées ou un retard de réplication croissant.

**Insertions asynchrones**
: Activité d'insertion asynchrone, disponible avec l'Agent 7.83 ou une version ultérieure et désactivée par défaut. Les instantanés de tampon en attente provenant de `system.asynchronous_inserts` montrent la quantité de données en attente d'être vidées et le moment où chaque tampon est programmé pour être vidé. Les enregistrements de vidage provenant de `system.asynchronous_insert_log` montrent chaque vidage, s'il a réussi, ainsi que le nombre d'octets et de lignes écrits. Cela aide à identifier les vidages qui échouent et les tampons qui augmentent plus rapidement qu'ils ne sont vidés.

## Configuration {#setup}

### Étape 1 : Accorder l'accès à Datadog Agent {#step-1-grant-datadog-agent-access}

Créez un utilisateur dédié `datadog`:

```sql
CREATE USER datadog IDENTIFIED BY '<PASSWORD>';
```

Accordez les autorisations requises sur les tableaux système :

```sql
GRANT SELECT ON system.metrics TO datadog;
GRANT SELECT ON system.events TO datadog;
GRANT SELECT ON system.asynchronous_metrics TO datadog;
GRANT SELECT ON system.errors TO datadog;
GRANT SELECT ON system.parts TO datadog;
GRANT SELECT ON system.replicas TO datadog;
GRANT SELECT ON system.dictionaries TO datadog;
GRANT SELECT ON system.macros TO datadog;
GRANT SELECT ON system.clusters TO datadog;
GRANT SELECT ON system.settings TO datadog;
GRANT SELECT ON system.table_engines TO datadog;
GRANT SELECT ON system.one TO datadog;
GRANT SELECT ON system.query_log TO datadog;
GRANT SELECT ON system.processes TO datadog;
GRANT SELECT ON system.detached_parts TO datadog;
GRANT SELECT ON system.merges TO datadog;
GRANT SELECT ON system.mutations TO datadog;
GRANT SELECT ON system.replication_queue TO datadog;
GRANT SELECT ON system.merge_tree_settings TO datadog;
GRANT SHOW ON *.* TO datadog;
```

Les accès `system.processes` et `system.query_log` sont requis pour la collecte des requêtes DBM. Les accès `system.parts`, `system.detached_parts`, `system.merges`, `system.mutations`, `system.replication_queue` et `system.merge_tree_settings` sont requis pour la collecte des parties et des fusions (santé du stockage). Le privilège `SHOW` est requis pour découvrir automatiquement les métadonnées telles que les noms de bases de données, les noms de tables, les colonnes et les vues. Les accès restants permettent la collecte des métriques d'infrastructure ClickHouse principales.

Accordez les autorisations `REMOTE` pour permettre l'interrogation inter-répliques :

```sql
GRANT REMOTE ON *.* TO datadog;
```

Le privilège `REMOTE` est requis car l'Agent utilise la fonction de table `clusterAllReplicas()` de ClickHouse pour agréger les données sur toutes les répliques d'un service ClickHouse Cloud via l'endpoint unique. Ce privilège permet l'exécution de requêtes inter-nœuds ; il **n'accorde pas** l'accès à des bases de données ou des tables supplémentaires au-delà de ce qui a été explicitement accordé ci-dessus. La syntaxe `ON *.*` est une exigence de ClickHouse pour ce type de privilège et n'étend pas le périmètre de l'accès aux données.

Les accès ci-dessus sont suffisants pour la collecte des métriques de requêtes, des échantillons de requêtes, des complétions de requêtes, ainsi que des parties et des fusions. Ils **n'accordent pas** à l'Agent l'accès aux données de votre application.

#### Optionnel : Accorder l'accès pour la collecte des plans d'exécution {#optional-grant-access-for-explain-plan-collection}

La collecte des plans d'exécution nécessite un accès `SELECT` aux tableaux référencés par les requêtes surveillées, et pas seulement aux tableaux système ci-dessus :

```sql
GRANT SELECT ON <database>.* TO datadog;
```

Si cet accès n'est pas accordé, l'Agent ne peut pas exécuter `EXPLAIN` pour les requêtes sur ces tableaux. Les métriques, échantillons et complétions de requêtes continuent de fonctionner, mais les plans d'exécution ne sont pas collectés pour les requêtes concernées, et Datadog affiche une erreur de collecte pour ces requêtes.

#### Optionnel : Accorder l'accès pour la surveillance des insertions asynchrones {#optional-grant-access-for-async-insert-monitoring}

Si vous activez la surveillance des insertions asynchrones (Agent 7.83 ou version ultérieure), accordez l'accès aux tableaux système d'insertion asynchrone :

```sql
GRANT SELECT ON system.asynchronous_inserts TO datadog;
GRANT SELECT ON system.asynchronous_insert_log TO datadog;
```

`system.asynchronous_inserts` est requis pour les instantanés de tampon en attente (`collect_pending_async_inserts`). `system.asynchronous_insert_log` est requis pour les enregistrements de vidage (`collect_async_inserts`). Pour activer les deux, ajoutez ce qui suit à la configuration de votre instance :

```yaml
    collect_pending_async_inserts:
      enabled: true
    collect_async_inserts:
      enabled: true
```

### Étape 2 : Configurer l'Agent {#step-2-configure-the-agent}

Pour ClickHouse Cloud, l'Agent se connecte directement à l'endpoint du service. Les données sont collectées au niveau du service (agrégées sur toutes les répliques), et non par nœud individuel.

Sur les déploiements ClickHouse serverless avec suspension automatique activée, l'activité de collecte DBM peut empêcher le cluster de se suspendre pendant les périodes d'inactivité, ce qui peut avoir un impact sur la facturation.

Cette intégration utilise l'interface **HTTP** de ClickHouse (port 8443), et non le protocole TCP natif (port 9440).

```yaml
# /etc/datadog-agent/conf.d/clickhouse.d/conf.yaml

init_config:

instances:
  - dbm: true
    server: xyz.us-east-2.aws.clickhouse.cloud
    port: 8443
    username: datadog
    password: <PASSWORD>

    # Required for ClickHouse Cloud
    tls_verify: true
    verify: true
    single_endpoint_mode: true

    tags:
      - env:production
      - deployment:cloud

    query_metrics:
      enabled: true
      collection_interval: 10

    query_samples:
      enabled: true
      collection_interval: 1

    query_completions:
      enabled: true
      collection_interval: 10
```

`single_endpoint_mode: true` est requis pour ClickHouse Cloud. Cela permet aux requêtes `clusterAllReplicas()` de collecter des données sur tous les nœuds derrière un endpoint unique.

Une fois activé, l'Agent interroge les métriques des tables système (à partir de `system.events`, `system.metrics`, `system.asynchronous_metrics` et `system.errors`) sur tous les nœuds derrière l'endpoint en utilisant `clusterAllReplicas()`. Chaque série résultante est marquée avec `clickhouse_node` afin que vous puissiez distinguer les données par nœud. Cette collecte par nœud nécessite la version 7.83.0 ou ultérieure de l'Agent.

Sans ce paramètre, l'Agent pourrait atteindre un nœud différent à chaque cycle de collecte. Pour les compteurs cumulatifs par nœud comme `clickhouse.query.failed.count`, cette incohérence produit des valeurs inexactes car le compteur n'est pas lu à partir de la même source à chaque fois.

## Personnalisation de l'identifiant de base de données {#customizing-the-database-identifier}

L'option `database_identifier` contrôle la façon dont l'instance de base de données apparaît dans DBM. Datadog recommande d'utiliser le nom du service comme tag personnalisé pour l'identification et le regroupement.

```yaml
instances:
  - dbm: true
    server: xyz.us-east-2.aws.clickhouse.cloud
    port: 8443
    # ... other settings ...

    database_identifier:
      template: "$env-$server:$port"

    tags:
      - env:production
      - service_name:user-service
```

Avec `env:production`, `server: xyz.us-east-2.aws.clickhouse.cloud` et `port: 8443`, cela produit :


| Modèle                  | Résultat                                               |
| ------------------------- | ---------------------------------------------------- |
| `$server:$port` (par défaut) | `xyz.us-east-2.aws.clickhouse.cloud:8443`            |
| `$env-$server:$port`      | `production-xyz.us-east-2.aws.clickhouse.cloud:8443` |




## Référence de configuration {#configuration-reference}



### Paramètres de connexion {#connection-settings}


| Champ      | Type    | Requis | Par défaut   | Description                                                                                                                 |
| ---------- | ------- | -------- | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| `server`   | chaîne  | Oui      | -         | Nom de host du service ClickHouse Cloud (par exemple, `xyz.us-east-2.aws.clickhouse.cloud`).                                      |
| `port`     | entier | Non       | `8123`    | Port HTTP. Utilisez `8443` pour ClickHouse Cloud (HTTPS).                                                                         |
| `username` | chaîne  | Non       | `default` | Compte utilisateur ClickHouse avec lequel l'Agent s'authentifie. Datadog recommande un utilisateur `datadog` dédié avec des autorisations limitées. |
| `password` | chaîne  | Non       | -         | Mot de passe pour l'utilisateur spécifié.                                                                                            |
| `db`       | chaîne  | Non       | `default` | Base de données à laquelle se connecter. La plupart des métriques proviennent des tableaux système, donc `default` est généralement approprié.                          |




### Paramètres TLS {#tls-settings}


| Champ         | Type    | Par défaut | Description                                                                                                     |
| ------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| `tls_verify`  | Booléen | `false` | Activer TLS. Requis pour ClickHouse Cloud.                                                                      |
| `verify`      | Booléen | `true`  | Valider le certificat SSL du serveur. Définir `false` en production constitue un risque de sécurité.                        |
| `tls_ca_cert` | chaîne  | -       | Chemin d'accès à un fichier de certificat CA personnalisé. Non requis pour ClickHouse Cloud, qui utilise des certificats provenant d'autorités de certification publiques. |




### Paramètres DBM {#dbm-settings}


| Champ                  | Type    | Par défaut | Description                                                                                                                                                                                                                                                                                                                               |
| ---------------------- | ------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dbm`                  | Booléen | `false` | Activer Database Monitoring. Requis pour la collecte des métriques de requêtes, des échantillons et des complétions de requêtes.                                                                                                                                                                                                                                              |
| `single_endpoint_mode` | Booléen | `false` | Requis pour ClickHouse Cloud. Active les requêtes `clusterAllReplicas()` pour collecter des données sur tous les nœuds derrière un endpoint unique. Collecte également les métriques standard des tables système par nœud (marquées avec `clickhouse_node`) afin que les compteurs cumulatifs rapportent des valeurs précises par nœud. La collecte par nœud nécessite la version 7.83.0 ou ultérieure de l'Agent. |




### Identifiant de base de données {#database-identifier}


| Champ                          | Type   | Par défaut         | Description                                                                                                                                          |
| ------------------------------ | ------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `database_identifier.template` | chaîne | `$server:$port` | Modèle pour l'identifiant unique de base de données. Prend en charge les variables : `$server`, `$port` et toutes les clés de tag personnalisées (par exemple, `$env`, `$service_name`). |




### Métriques de requête {#query-metrics}

Collecte des statistiques de requête agrégées à partir de `system.query_log`.


| Champ                               | Type    | Par défaut | Description                                            |
| ----------------------------------- | ------- | ------- | ------------------------------------------------------ |
| `query_metrics.enabled`             | Booléen | `true`  | Activer la collecte des métriques de requête. Nécessite `dbm: true`. |
| `query_metrics.collection_interval` | nombre  | `10`    | Intervalle de collecte en secondes.                        |




### Échantillons de requêtes {#query-samples}

Collecte les requêtes en cours d'exécution à partir de `system.processes`.


| Champ                               | Type    | Par défaut | Description                                            |
| ----------------------------------- | ------- | ------- | ------------------------------------------------------ |
| `query_samples.enabled`             | Booléen | `true`  | Activer la collecte d'échantillons de requêtes. Nécessite `dbm: true`. |
| `query_samples.collection_interval` | nombre  | `1`     | Intervalle de collecte en secondes.                        |
| `query_samples.payload_row_limit`   | entier | `1000`  | Nombre maximal de requêtes actives par instantané.         |




### Terminaisons de requêtes {#query-completions}

Collecte des enregistrements des requêtes terminées individuellement à partir de `system.query_log`.


| Champ                                          | Type    | Par défaut | Description                                                    |
| ---------------------------------------------- | ------- | ------- | -------------------------------------------------------------- |
| `query_completions.enabled`                    | Booléen | `true`  | Activer la collecte des complétions de requêtes. Nécessite `dbm: true`.     |
| `query_completions.collection_interval`        | nombre  | `10`    | Intervalle de collecte en secondes.                                |
| `query_completions.samples_per_hour_per_query` | nombre  | `15`    | Nombre maximal d'échantillons collectés par heure et par signature de requête unique. |

### Insertions asynchrones en attente {#pending-async-inserts}

Collecte des instantanés des tampons d'insertion asynchrone en attente à partir de `system.asynchronous_inserts`. Nécessite l'Agent 7.83 ou une version ultérieure.

| Champ | Type | Par défaut | Description |
|-------|------|---------|-------------|
| `collect_pending_async_inserts.enabled` | Booléen | `false` | Activer la collecte des tampons d'insertion asynchrone en attente. Nécessite `dbm: true`. |
| `collect_pending_async_inserts.collection_interval` | nombre | `10` | Intervalle de collecte en secondes. |
| `collect_pending_async_inserts.max_samples_per_collection` | entier | `1000` | Nombre maximal de tampons collectés par exécution. |

### Vidages d'insertion asynchrone {#async-insert-flushes}

Collecte les enregistrements des vidages d'insertion asynchrone individuels à partir de `system.asynchronous_insert_log`. Nécessite l'Agent 7.83 ou une version ultérieure.

| Champ | Type | Par défaut | Description |
|-------|------|---------|-------------|
| `collect_async_inserts.enabled` | Booléen | `false` | Activer la collecte des vidages d'insertion asynchrone. Nécessite `dbm: true`. |
| `collect_async_inserts.collection_interval` | nombre | `60` | Intervalle de collecte en secondes. |
| `collect_async_inserts.max_samples_per_collection` | entier | `1000` | Nombre maximal d'enregistrements des vidages d'insertion asynchrone collectés par exécution. |


{{< partial name="whats-next/whats-next.html" >}}