---
description: Explorer et analyser l'état de santé et la configuration de vos hosts
  de base de données
title: Explorer les hosts de bases de données
---

{{< img src="database_monitoring/databases-list-4.png" alt="La page Databases dans Datadog" style="width:100%;" >}}

Sur la [page Databases][1], évaluez l'état de santé et l'activité de vos hosts de base de données et de vos [clusters](#regroupement-en-clusters). Triez et filtrez la liste pour prioriser les hosts et les clusters avec des alertes déclenchées, un volume élevé de requêtes et d'autres critères. Cliquez sur n'importe quel host dans la liste pour ouvrir un panneau de détails :


{{< img src="database_monitoring/db-list-details-panel-cropped-3.png" alt="Le panneau de détails d'un host de base de données individuel sur la page Databases" style="width:90%;" >}}

En plus d'un graphique filtrable des connexions actives pour ce host, le panneau de détails du host affiche les fonctionnalités suivantes.

|                                                 | Postgres  | SQL Server | MySQL     | Oracle    |
|-------------------------------------------------|-----------|------------|-----------|-----------|
| [Requêtes principales](#requêtes-principales)                     | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |
| [Procédures stockées](#procédures-stockées)         |           | {{< X >}}  |           |           |
| [Métriques](#metriques)                             | {{< X >}} | {{< X >}}  |           |           |
| [Connexions actives](#connexions-actives)       | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |
| [Schéma](#schéma)                               | {{< X >}} | {{< X >}}  |           |           |
| [Requêtes bloquantes](#requêtes-bloquantes)           | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |
| [Services appelants](#services-appelants)           | {{< X >}} | {{< X >}}  | {{< X >}} |           |
| [Détails de configuration](#détails-de-configuration) | {{< X >}} | {{< X >}}  | {{< X >}} |           |

## Regroupement en clusters
Un bouton **Regrouper en clusters** apparaît avec la liste des hosts de base de données si les tags du host indiquent la présence d'une topologie de cluster. Activez ce bouton pour regrouper les hosts en clusters dans la liste.

Les lignes de cluster affichent un badge **Cluster** et indiquent le nombre d'instances dans le cluster. Les colonnes des lignes de cluster affichent des données agrégées provenant de toutes les instances du cluster. Sélectionnez une ligne de cluster pour la développer et afficher la liste de toutes les instances qu'elle contient.

Le regroupement en clusters prend en charge les technologies de base de données et topologies de cluster suivantes :

<table>
  <colgroup>
    <col style="width:15%">
    <col style="width:20%">
    <col style="width:30%">
    <col style="width:35%">
  </colgroup>
  <thead>
    <tr>
      <th>Database</th>
      <th>Topologies</th>
      <th>Grouping Tags</th>
      <th>Cluster Name Source</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Amazon RDS<br><em>(AWS integration required)</em></td>
      <td>
        <ul>
          <li>Multi-AZ clusters</li>
          <li>Read replicas</li>
        </ul>
      </td>
      <td>
        <ul>
          <li><code>dbclusteridentifier</code></li>
          <li><code>region</code></li>
          <li><code>aws_account</code></li>
        </ul>
      </td>
      <td>
        <ul>
          <li><code>dbclusteridentifier</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>PostgreSQL<br><em>(Agent v7.58+ required)</em></td>
      <td>
        <ul>
          <li>Physical replication</li>
        </ul>
      </td>
      <td>
        <ul>
          <li><code>system_identifier</code></li>
          <li><code>env</code></li>
        </ul>
      </td>
      <td>
        <ul>
          <li><code>postgresql_cluster_name</code> (from instance <code>cluster_name</code> config)</li>
          <li>Primary instance name</li>
          <li><code>system_identifier</code></li>
        </ul>
      </td>
    </tr>
        <tr>
      <td>MySQL<br><em>(Agent v7.68+ required)</em></td>
      <td>
        <ul>
          <li>Regular replication (not group replication)</li>
        </ul>
      </td>
      <td>
        <ul>
          <li><code>cluster_uuid</code></li>
          <li><code>env</code></li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Primary instance name</li>
          <li><code>cluster_uuid</code></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## Requêtes principales

Dans l'onglet **Top Queries** du panneau de détails du host, triez les requêtes les plus courantes par durée maximale, latence moyenne et d'autres critères.

{{< img src="database_monitoring/db-list-top-queries.png" alt="L'onglet Top Queries du panneau de détails d'un host de base de données individuel sur la page Databases" style="width:90%;" >}}

Cliquez sur n'importe quelle instruction de requête pour ouvrir un panneau de détails qui inclut :
- les analyses de requêtes
- les graphiques de latence moyenne et d'autres métriques clés
- les plans d'exécution
- l'activité bloquante
- les hosts ayant exécuté la requête
- les services appelants

{{< img src="database_monitoring/db-list-query-details.png" alt="Le panneau de détails d'une requête principale individuelle" style="width:90%;" >}}

### Procédures stockées

Lorsqu'elles sont prises en charge, l'onglet **Top Queries** inclut une section **Stored Procedures** qui répertorie chaque procédure stockée par nom, avec sa durée moyenne, son nombre de lectures logiques, son nombre d'écritures logiques et d'autres informations. Développez une procédure stockée pour afficher ses requêtes SQL individuelles, et cliquez sur une requête pour afficher son panneau de détails.

{{< img src="database_monitoring/stored-procedures.png" alt="Une liste de procédures stockées, avec l'une d'elles développée pour afficher sa requête SQL" style="width:90%;" >}}

## Métriques

Dans l'onglet **Metrics** du panneau de détails du host, affichez et filtrez les métriques relatives à l'état du système, à l'activité des requêtes, aux opérations bloquantes, aux performances des fonctions et à d'autres domaines clés.

{{< img src="database_monitoring/db-list-metrics.png" alt="L'onglet Metrics du panneau de détails d'un host de base de données individuel sur la page Databases" style="width:90%;" >}}

## Connexions actives

L'onglet **Active Connections** du panneau de détails du host affiche les requêtes en cours d'exécution sur le host. Cliquez sur une instruction de requête pour ouvrir un panneau incluant les attributs d'événement, les traces associées et d'autres détails pertinents.

{{< img src="database_monitoring/db-list-active-connections-2.png" alt="L'onglet Active Connections du panneau de détails d'un host de base de données individuel sur la page Databases" style="width:90%;" >}}

## Schéma

Utilisez l'onglet **Schema** pour explorer les structures de base de données, les tables, les colonnes, les types de données, les clés étrangères existantes et les stratégies d'indexation pour chaque base de données d'un host.

{{< img src="database_monitoring/db-list-schema-tab.png" alt="L'onglet Schema du panneau de détails d'un host de base de données individuel sur la page Databases" style="width:90%;" >}}

## Requêtes bloquantes

Dans l'onglet **Blocking Queries** du panneau de détails du host, affichez des visualisations pour :

- les durées des requêtes bloquantes
- les exécutions des requêtes bloquantes
- le nombre de requêtes en attente -

Recherchez et filtrez les requêtes ou les échantillons. Cliquez sur n'importe quelle ligne de requête individuelle pour afficher les détails.

{{< img src="database_monitoring/db-list-blocking-queries.png" alt="L'onglet Blocking Queries du panneau de détails d'un host de base de données individuel sur la page Databases" style="width:90%;" >}}

## Services appelants

Dans l'onglet **Calling Services** du panneau de détails du host, affichez la liste des services ayant appelé le host. Les informations affichées sur les services incluent la date de déploiement du service, le nombre de requêtes effectuées vers le host par seconde, le nombre de requêtes de base de données exécutées et d'autres informations.

{{< img src="database_monitoring/db-list-calling-services.png" alt="L'onglet Calling Services du panneau de détails d'un host de base de données individuel sur la page Databases" style="width:90%;" >}}

Cliquez sur n'importe quelle ligne de service pour afficher son dashboard Datadog APM.

## Détails de configuration

<div class="alert alert-info">Le host doit avoir <code>collect_settings</code> activé dans sa <a href="https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example#L397">configuration d'instance</a> pour que cette fonctionnalité fonctionne correctement.</div>

L'onglet **Configuration** du panneau de détails du host offre une vue directe des paramètres de configuration du host sans compromettre la sécurité de la base de données. Utilisez-le pour identifier les paramètres de base de données mal configurés et ajuster les paramètres afin d'optimiser les performances de la base de données.

{{< img src="database_monitoring/db-list-configuration.png" alt="L'onglet Configuration du panneau de détails d'un host de base de données individuel sur la page Databases" style="width:90%;" >}}

[1]: https://app.datadoghq.com/databases