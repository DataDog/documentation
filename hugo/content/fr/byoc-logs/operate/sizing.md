---
aliases:
- /fr/cloudprem/configure/cluster_sizing/
- /fr/cloudprem/operate/sizing/
description: En savoir plus sur le dimensionnement des clusters pour les BYOC Logs
further_reading:
- link: /byoc-logs/configure/ingress/
  tag: Documentation
  text: Configurer l'entrée de BYOC Logs
- link: /byoc-logs/configure/pipelines/
  tag: Documentation
  text: Configurer le traitement des logs BYOC Logs
- link: /byoc-logs/introduction/architecture/
  tag: Documentation
  text: En savoir plus sur l'architecture de BYOC Logs
title: Dimensionnement du cluster
---
{{< jqmath-vanilla >}}

## Présentation {#overview}

Dimensionnez votre cluster BYOC (Bring Your Own Cloud) Logs en trois étapes :

1. Estimez votre volume d'ingestion quotidien en TB/jour.
2. Choisissez une [configuration de démarrage](#starter-configurations) pour ce volume.
3. Surveillez le cluster et ajustez le nombre de réplicas et la taille des pods.

La capacité des searchers dépend de la concurrence des requêtes, de la complexité des requêtes et de la quantité de données analysées, et non du seul volume d'ingestion.

Ces recommandations supposent l'utilisation de processeurs x86 modernes, tels que ceux utilisés dans les types d'instances AWS M6, ou de processeurs équivalents d'autres fournisseurs de cloud. Les processeurs basés sur ARM, tels qu'AWS Graviton, peuvent offrir une meilleure rentabilité à débit comparable.

## Configurations de démarrage {#starter-configurations}

Utilisez ces totaux comme point de départ :

- **Indexeurs :**2 vCPU par TB/jour
- **Compactors :**1 vCPU par 2 TB/jour
- **Searchers :**environ deux fois le total de vCPU des indexeurs. Les charges de travail intensives en analytique peuvent nécessiter jusqu'au double des valeurs indiquées dans le tableau.

Les totaux de stockage objet supposent une rétention de 30 jours et un taux de compression de 6x.

|   Volume quotidien |  Indexeurs | Compactors |  Searchers | Stockage objet |
|---------------:|----------:|-----------:|-----------:|---------------:|
|   **1 TB/jour** |   2 vCPU |   0,5 vCPU |    4 vCPU |          ~5 TB |
|  **10 TB/jour** |  20 vCPU |     5 vCPU |   40 vCPU |         ~50 TB |
| **100 TB/jour** | 200 vCPU |    50 vCPU |  400 vCPU |        ~500 TB |

Taille recommandée pour chaque pod :

| Volume quotidien        | Indexeurs        | Compactors      | Searchers        |
|---------------------|----------------:|----------------:|-----------------:|
| **Jusqu'à 30 TB/jour** |  4 vCPU, 16 Go |  4 vCPU, 16 Go |  16 vCPU, 64 Go |
| **Au-delà de 30 TB/jour** |  8 vCPU, 32 Go |  8 vCPU, 32 Go | 64 vCPU, 256 Go |

<div class="alert alert-info">
<strong>Facturation par rapport au provisionnement :</strong> Les vCPU provisionnés et les vCPU facturés sont différents. Un cluster de production est intentionnellement surprovisionné pour absorber les pics d'ingestion et de recherche. Contactez votre représentant Datadog pour obtenir des conseils sur la facturation.
</div>

## Dimensionnez chaque composant {#size-each-component}

Ajustez la configuration de démarrage composant par composant. Pour le rôle que joue chaque composant, consultez [Architecture][2].

### Indexeurs {#indexers}

- **Performance :** 2 vCPU par TB/jour
- **Mémoire :** 4 Go de RAM par vCPU
- **Type de stockage :** Stockage en mode bloc attaché au réseau pour le log de pré-écriture. Consultez [Configurer le stockage persistant pour les indexeurs][3].

{{% collapse-content title="Dimensionnement par nombre d'événements" level="h4" expanded=false %}}
Si vous connaissez votre nombre quotidien d'événements mais pas votre volume en octets, utilisez cette formule pour estimer :

$$\\text\"Volume quotidien (To)\" = {\\text\"événements par jour\" × \\text\"taille moyenne d'un événement (octets)\"} / 10^\{12\}$$

Par exemple, avec 1 milliard d'événements/jour à une taille moyenne de 1 Ko :

`1,000,000,000 × 1,000 / 1,000,000,000,000 = 1 TB/day`

Les tailles typiques des événements de logs varient de 500 octets (syslog court) à 2–3 Ko (JSON avec des tags Kubernetes). Mesurez un échantillon représentatif de vos logs pour obtenir une moyenne précise.
{{% /collapse-content %}}

### Compactors {#compactors}

- **Performance :** 1 vCPU par 2 TB/jour
- **Mémoire :** 4 Go de RAM par vCPU
- **Type de stockage :** SSD local. Utilisez des instances avec des SSD locaux, comme AWS M8gd.

### Searchers {#searchers}

Dimensionnez les searchers en fonction de la charge de travail de recherche attendue, et non du seul volume d'ingestion. Un point de départ correspond à environ deux fois le total de vCPU des indexeurs.

- **Performance :** Les requêtes de terme (`status:error AND message:exception`) utilisent généralement moins de CPU que les recherches par caractères génériques ou sur l'événement complet. Les requêtes d'agrégation nécessitent plus de CPU et de mémoire.
- **Mémoire :** 4 Go de RAM par vCPU de searcher. Allouez plus de RAM si vous prévoyez de nombreuses demandes d'agrégation simultanées.

Si la latence de recherche est élevée, ajoutez des réplicas de searcher ou augmentez la mémoire par pod. Consultez [Dimensionner les searchers en fonction de vos modèles de requête][4].

### Autres services {#other-services}

Allouez les ressources suivantes pour ces composants légers :

| Service | vCPU | RAM | Réplicas |
|---------|-------|-----|----------|
| **Plan de contrôle** | 2 | 4 Go | 1 |
| **Metastore** | 2 | 4 Go | 2 |
| **Janitor** | 2 | 4 Go | 1 |

### Base de données PostgreSQL {#postgresql-database}

- **Taille de l'instance :** Pour la plupart des cas d'utilisation, une instance PostgreSQL avec 1 vCPU et 4 Go de RAM est suffisante.
- **Recommandation Amazon RDS :** Sur Amazon RDS, commencez avec le type d'instance `t4g.medium`.
- **Haute disponibilité :** Activez le déploiement Multi-AZ avec un réplica de secours.

Activez les sauvegardes automatisées sur la base de données du metastore. Consultez [Activer les sauvegardes automatisées sur la base de données du metastore][5].

### Stockage d'objets {#object-storage}

BYOC Logs compresse et indexe les données de logs avant de les stocker dans un stockage d'objets. La compression est généralement de 5x à 8x, ce qui correspond à environ 125-200 Go stockés par TB ingéré par jour.

$$\\text\"Données stockées par jour\" = {\\text\"Volume quotidien\"} / {\\text\"Taux de compression\"}$$

$$\\text\"Stockage total\" = \\text\"Données stockées par jour\" × \\text\"période de rétention (jours)\"$$

<div class="alert alert-info">
Utilisez un stockage d'objets de niveau standard (par exemple, S3 Standard ou GCS Standard) pour les données actives. Les niveaux de coût inférieur tels que S3 Infrequent Access ou GCS Nearline ne sont pas validés pour une utilisation avec BYOC Logs.
</div>

Pour estimer le volume et le coût des requêtes PUT, consultez [Object Storage Request Estimation][6].

## Niveaux de dimensionnement du chart Helm {#helm-chart-sizing-tiers}

Définissez `indexer.podSize` et `searcher.podSize` pour qu'ils correspondent au CPU et à la mémoire par pod dans la [configuration de démarrage](#starter-configurations). La valeur par défaut est `xlarge`. Chaque préréglage applique également des tailles de file d'attente d'ingestion et de cache de recherche.

| `podSize` | CPU | Mémoire |
|---|---:|---:|
| `large` | 2 | 8Gi |
| `xlarge` | 4 | 16Gi |
| `2xlarge` | 8 | 32Gi |
| `4xlarge` | 16 | 64Gi |
| `6xlarge` | 24 | 96Gi |
| `8xlarge` | 32 | 128Gi |

{{% collapse-content title="Requêtes Kubernetes réelles" level="h3" expanded=false %}}
Chaque `podSize` demande moins que son CPU et sa mémoire nominaux, afin de laisser de la place pour kube-system, les DaemonSets et les modules complémentaires. Les montants de réservation suivent le [calcul de réservation de nœud GKE](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/plan-node-sizes#resource_reservations), plus 250m de CPU et 512Mi de mémoire par nœud pour les DaemonSets et les modules complémentaires.

| `podSize` | Requête CPU réelle | Requête/limite de mémoire réelle |
|---|---:|---:|
| `large` | 1600m | 5700Mi |
| `xlarge` | 3600m | 13100Mi |
| `2xlarge` | 7600m | 28500Mi |
| `4xlarge` | 15600m | 59300Mi |
| `6xlarge` | 23600m | 90100Mi |
| `8xlarge` | 31600m | 120900Mi |

```text
Actual CPU request = (nominal pod CPU - Kubernetes system CPU reservation - 250m), rounded down to the nearest 100m
Actual memory request/limit = (nominal pod memory - Kubernetes system memory reservation - 512Mi), rounded down to the nearest 100Mi
```
{{% /collapse-content %}}

Consultez la [carte de dimensionnement du chart Helm][1] pour la configuration complète.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/cloudprem/sizing-map.yaml
[2]: /fr/byoc-logs/introduction/architecture/
[3]: /fr/byoc-logs/operate/best_practices/#configure-persistent-storage-for-indexers
[4]: /fr/byoc-logs/operate/best_practices/#scale-searchers-based-on-your-query-patterns
[5]: /fr/byoc-logs/operate/best_practices/#enable-automated-backups-on-your-metastore-database
[6]: /fr/byoc-logs/operate/object_storage_requests/