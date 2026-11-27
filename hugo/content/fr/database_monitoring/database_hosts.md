---
description: Explorez et analysez la santé et la configuration de vos hosts de base
  de données
title: Explorer les hosts de bases de données
---
{{< img src="database_monitoring/databases-list-4.png" alt="La page Databases dans Datadog" style="width:100%;" >}}

Sur la [page Databases][1], vous pouvez évaluer la santé et l'activité de vos hosts de base de données et [clusters](#cluster-grouping). Triez et filtrez la liste pour hiérarchiser les hosts et les clusters avec des alertes déclenchées, un volume de requêtes élevé et d'autres critères. Cliquez sur n'importe quel host dans la liste pour ouvrir un panneau de détails :


{{< img src="database_monitoring/db-list-details-panel-cropped-3.png" alt="Le panneau de détails d'un seul host de base de données sur la page Databases" style="width:90%;" >}}

En plus d'un graphique filtrable des connexions actives pour ce host, le panneau de détails du host affiche les fonctionnalités suivantes.

|                                                 | Postgres  | SQL Server | MySQL     | Oracle    |
|-------------------------------------------------|-----------|------------|-----------|-----------|
| [Top queries](#top-queries)                     | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |
| [Stored procedures](#stored-procedures)         |           | {{< X >}}  |           |           |
| [Metrics](#metrics)                             | {{< X >}} | {{< X >}}  |           |           |
| [Active connections](#active-connections)       | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |
| [Schema](#schema)                               | {{< X >}} | {{< X >}}  |           |           |
| [Blocking queries](#blocking-queries)           | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |
| [Calling services](#calling-services)           | {{< X >}} | {{< X >}}  | {{< X >}} |           |
| [Configuration details](#configuration-details) | {{< X >}} | {{< X >}}  | {{< X >}} |           |

## Regroupement par cluster {#cluster-grouping}
Un bouton {{< ui >}}Group into clusters{{< /ui >}} apparaît avec la liste des hosts de base de données si les tags des hosts indiquent la présence d'une topologie de cluster. Activez ce bouton pour regrouper les hosts en clusters dans la liste.

Les lignes de cluster affichent un badge {{< ui >}}Cluster{{< /ui >}} et indiquent le nombre d'instances dans le cluster. Les colonnes des lignes de cluster affichent des données agrégées provenant de toutes les instances au sein du cluster. Sélectionnez une ligne de cluster pour la développer et afficher une liste de toutes les instances que le cluster contient.

Le regroupement par cluster prend en charge la technologie de base de données et les topologies de cluster suivantes :

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
      <td>Amazon RDS<br><em>(intégration AWS requise)</em></td>
      <td>
        <ul>
          <li>Multi-AZ clusters</li>
          <li>Réplicas en lecture</li>
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
      <td>PostgreSQL<br><em>(Agent v7.58+ requis)</em></td>
      <td>
        <ul>
          <li>Réplication physique</li>
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
          <li><code>postgresql_cluster_name</code> (depuis l'instance <code>cluster_name</code> config)</li>
          <li>Nom de l'instance principale</li>
          <li><code>system_identifier</code></li>
        </ul>
      </td>
    </tr>
        <tr>
      <td>MySQL<br><em>(Agent v7.68+ requis)</em></td>
      <td>
        <ul>
          <li>Réplication standard (pas de réplication de groupe)</li>
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
          <li>Nom de l'instance principale</li>
          <li><code>cluster_uuid</code></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## Top queries {#top-queries}

Dans l'onglet {{< ui >}}Top Queries{{< /ui >}} du panneau de détails du host, vous pouvez trier les requêtes les plus courantes par durée maximale, latence moyenne et plus encore.

{{< img src="database_monitoring/db-list-top-queries.png" alt="L'onglet Top Queries du panneau de détails d'un seul host de base de données sur la page Databases" style="width:90%;" >}}

Cliquez sur n'importe quelle instruction de requête pour ouvrir un panneau de détails qui inclut :
- aperçu des requêtes
- graphiques pour la latence moyenne et d'autres métriques clés
- plans d'exécution
- activité de blocage
- hôtes ayant exécuté la requête
- services appelants

{{< img src="database_monitoring/db-list-query-details.png" alt="Le panneau de détails d'une requête principale donnée" style="width:90%;" >}}

### Stored procedures {#stored-procedures}

Lorsque cela est pris en charge, l'onglet {{< ui >}}Top Queries{{< /ui >}} inclut une section {{< ui >}}Stored Procedures{{< /ui >}} qui répertorie chaque procédure stockée par nom, ainsi que sa durée moyenne, le nombre de lectures logiques, le nombre d'écritures logiques et plus encore. Développez une procédure stockée pour afficher ses requêtes SQL individuelles, et cliquez sur une requête pour afficher son panneau de détails.

{{< img src="database_monitoring/stored-procedures.png" alt="Une liste de procédures stockées, dont une est développée pour afficher sa requête SQL" style="width:90%;" >}}

## Métriques {#metrics}

Dans l'onglet {{< ui >}}Metrics{{< /ui >}} du panneau de détails du host, vous pouvez afficher et filtrer les métriques relatives à l'état du système, à l'activité des requêtes, aux opérations de blocage, aux performances des fonctions et à d'autres domaines clés.

{{< img src="database_monitoring/db-list-metrics.png" alt="L'onglet Metrics du panneau de détails d'un seul host de base de données sur la page Databases" style="width:90%;" >}}

## Active connections {#active-connections}

L'onglet {{< ui >}}Active Connections{{< /ui >}} du panneau de détails du host affiche les requêtes en cours d'exécution sur le host. Cliquez sur une instruction de requête pour ouvrir un panneau incluant les attributs d'événement, les traces associées et d'autres détails pertinents.

{{< img src="database_monitoring/db-list-active-connections-2.png" alt="L'onglet Active Connections du panneau de détails d'un seul host de base de données sur la page Databases" style="width:90%;" >}}

## Schema {#schema}

Utilisez l'onglet {{< ui >}}Schema{{< /ui >}} pour explorer les structures des bases de données, les tables, les colonnes, les types de données, les clés étrangères existantes et les stratégies d'indexation de chaque base de données sur un host.

{{< img src="database_monitoring/db-list-schema-tab.png" alt="L'onglet Schema du panneau de détails d'un seul host de base de données sur la page Databases" style="width:90%;" >}}

## Blocking queries {#blocking-queries}

Dans l'onglet {{< ui >}}Blocking Queries{{< /ui >}} du panneau de détails du host, vous pouvez afficher des visualisations des éléments suivants :

- durées des requêtes bloquantes
- exécutions de requêtes bloquantes
- nombre de requêtes en attente

Vous pouvez rechercher et filtrer les requêtes ou les échantillons. Cliquez sur n'importe quelle ligne de requête pour afficher les détails.

{{< img src="database_monitoring/db-list-blocking-queries.png" alt="L'onglet Blocking Queries du panneau de détails d'un seul host de base de données sur la page Databases" style="width:90%;" >}}

## Calling services {#calling-services}

Dans l'onglet {{< ui >}}Calling Services{{< /ui >}} du panneau de détails du host, vous pouvez afficher la liste des services ayant appelé le host. Les informations de service affichées incluent la date de déploiement du service, le nombre de requêtes effectuées vers le host par seconde, le nombre de requêtes de base de données exécutées et plus encore.

{{< img src="database_monitoring/db-list-calling-services.png" alt="L'onglet Calling Services du panneau de détails d'un seul host de base de données sur la page Databases" style="width:90%;" >}}

Cliquez sur n'importe quelle ligne de service pour afficher son dashboard APM.

## Configuration details {#configuration-details}

<div class="alert alert-info">Le host doit avoir <code>collect_settings</code> activé dans sa <a href="https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example#L397">configuration d'instance</a> pour que cette fonctionnalité fonctionne correctement.</div>

L'onglet {{< ui >}}Configuration{{< /ui >}} du panneau de détails du host offre une vue directe sur les paramètres de configuration du host sans compromettre la sécurité de la base de données. Utilisez-le pour identifier les paramètres de base de données mal configurés et ajuster les réglages afin d'optimiser les performances de la base de données.

{{< img src="database_monitoring/db-list-configuration.png" alt="L'onglet Configuration du panneau de détails pour un seul host de base de données sur la page Databases" style="width:90%;" >}}

[1]: https://app.datadoghq.com/databases