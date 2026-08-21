---
aliases:
- /fr/cloudprem/configure/cluster_sizing/
- /fr/cloudprem/operate/sizing/
description: En savoir plus sur le dimensionnement des clusters pour BYOC Logs
further_reading:
- link: /byoc-logs/configure/ingress/
  tag: Documentation
  text: Configurer BYOC Logs Ingress
- link: /byoc-logs/configure/pipelines/
  tag: Documentation
  text: Configurer BYOC Logs Log Processing
- link: /byoc-logs/introduction/architecture/
  tag: Documentation
  text: En savoir plus sur l’architecture de BYOC Logs
title: Dimensionnement des clusters
---
{{< jqmath-vanilla >}}

## Présentation {#overview}

Un dimensionnement de clusters approprié permet de garantir des performances optimales, une efficacité en termes de coûts et une fiabilité pour votre déploiement de BYOC Logs (Bring Your Own Cloud) Vos besoins en matière de dimensionnement dépendent de plusieurs facteurs, notamment le volume d'ingestion des journaux, les modèles de requête, la période de rétention et la complexité de vos données de journal.

Les [exemples de dimensionnement](#sizing-examples) ci-dessous fournissent des configurations de départ pour des volumes de logs quotidiens courants. Pour des conseils plus approfondis sur chaque composant, consultez les sections suivantes.

<div class="alert alert-tip">
Utilisez votre volume de logs quotidien prévu et vos taux d'ingestion de pointe comme points de départ, puis surveillez les performances de votre cluster et ajustez le dimensionnement si nécessaire.
</div>

## Exemples de dimensionnement {#sizing-examples}

Le tableau suivant fournit des configurations de point de départ pour des volumes de logs quotidiens courants. Il s'agit de recommandations de base ; ajustez-les en fonction des performances observées.

En règle générale pour une charge de travail mixte, prévoyez environ 12 vCPU par To/jour ingéré — 4 vCPU pour les indexeurs et 8 vCPU pour les chercheurs. Les charges de travail analytiques lourdes nécessitent 2 fois plus.

Ces recommandations de vCPU supposent l'utilisation de processeurs x86 modernes tels que les types d'instances AWS m6 (ou équivalent sur d'autres clouds). Les processeurs basés sur ARM tels qu'AWS Graviton peuvent offrir une meilleure rentabilité pour le même débit.

| Volume quotidien | Pods d'indexeur | Taille de pod d'indexeur | Pods de chercheur | Taille de pod de chercheur | Stockage objet (rétention de 30 jours, compression ~6x) |
|-------------|-------------|-----------------|---------------|-------------------|-----------------------------------------------------|
| **1 To/jour** | 2 | large | 2 | xlarge | ~5 To |
| **5 To/jour** | 5 | xlarge | 5 | 2xlarge | ~25 To |
| **10 To/jour** | 10 | xlarge | 5 | 4xlarge | ~50 To |
| **50 To/jour** | 25 | 2xlarge | 13 | 8xlarge | ~250 To |
| **100 To/jour** | 50 | 2xlarge | 25 | 8xlarge | ~500 To |

<div class="alert alert-info">
<strong>Facturation vs provisionnement :</strong> Les vCPU provisionnés et les vCPU facturés sont différents. Un cluster de production est intentionnellement surprovisionné pour absorber les pics d'ingestion et de recherche. Contactez votre représentant Datadog pour obtenir des conseils sur la facturation.
</div>

## Indexers {#indexers}

Les Indexers reçoivent les logs des Datadog Agents, puis les traitent, les indexent et les stockent sous forme de fichiers d'index (appelés _splits_) dans le stockage objet. Un dimensionnement approprié est essentiel pour maintenir le débit d'ingestion et garantir que votre cluster peut gérer votre volume de logs.

| Spécification | Recommandation | Remarques |
|---------------|----------------|-------|
| **Performance** | 5 Mo/s par vCPU | Débit de base pour déterminer le dimensionnement initial. Les performances réelles dépendent des caractéristiques des logs (taille, nombre d'attributs, niveau d'imbrication) |
| **Mémoire** | 4 Go de RAM par vCPU | |
| **Taille minimale de pod** | 2 vCPU, 8 Go de RAM | Minimum recommandé pour les pods d’Indexers |
| **Capacité de stockage** | Au moins 250 Go | Requis pour les données temporaires lors de la création et de la fusion des fichiers d'index |
| **Type de stockage** | Stockage en mode bloc attaché au réseau | Par exemple : Amazon EBS gp3, Azure Managed Disks ou GCP Persistent Disk. Les données sont temporairement stockées dans un journal de pré-écriture (WAL) avant d'être téléchargées vers le stockage objet. Le WAL n'est pas répliqué, donc l'utilisation de SSD locaux (éphémères) augmente le risque de perdre quelques minutes de données en cas de défaillance du disque. Le stockage en mode bloc attaché au réseau offre une redondance intégrée. |
| **E/S disque** | ~20 Mo/s par vCPU | Équivalent à 320 IOPS par vCPU pour Amazon EBS (en supposant 64 Ko par IOPS) |


{{% collapse-content title="Exemple : Dimensionnement pour 1 To de logs par jour" level="h4" expanded=false %}}
Pour indexer 1 To de logs par jour (~11,6 Mo/s), suivez ces étapes :

1. **Calculer les vCPU :** `11.6 MB/s ÷ 5 MB/s per vCPU ≈ 2.3 vCPUs`
2. **Calculer la RAM :** `2.3 vCPUs × 4 GB RAM ≈ 9 GB RAM`
3. **Ajouter une marge de sécurité :** Commencez avec un Indexer pod configuré avec **3 vCPUs, 12 Go de RAM et un disque de 200 Go** Ajustez ces valeurs en fonction des performances observées et des besoins en redondance.
{{% /collapse-content %}}

{{% collapse-content title="Dimensionnement par nombre d'événements" level="h4" expanded=false %}}
Si vous connaissez votre nombre quotidien d'événements mais pas votre volume en octets, utilisez cette formule pour estimer :

$$\\text\"Volume quotidien (To)\" = {\\text\"événements par jour\" × \\text\"taille moyenne d'un événement (octets)\"} / 10^\{12\}$$

Par exemple, avec 1 milliard d'événements/jour d'une taille moyenne de 1 Ko :

`1,000,000,000 × 1,000 / 1,000,000,000,000 = 1 TB/day`

Les tailles typiques des événements de journal varient de 500 octets (syslog court) à 2-3 Ko (JSON avec balises Kubernetes). Mesurez un échantillon représentatif de vos journaux pour obtenir une moyenne précise.
{{% /collapse-content %}}

## Searchers {#searchers}

Les Searchers traitent les requêtes de recherche depuis l'interface utilisateur Datadog, lisent les métadonnées du Metastore et récupèrent les données du stockage objet.

Un point de départ général consiste à provisionner environ le double du nombre total de vCPU alloués aux Indexers. Consultez nos exemples de dimensionnement.

- **Performance :** Les performances de recherche dépendent fortement de la charge de travail (complexité des requêtes, concurrence, quantité de données analysées). Par exemple, les requêtes de terme (`status:error AND message:exception`) sont généralement moins coûteuses en calcul que les requêtes de recherche par caractères génériques ou sur l'événement complet.
- **Mémoire :** 4 Go de RAM par vCPU de Searcher. Allouez plus de RAM si vous prévoyez de nombreuses demandes d'agrégation simultanées.


## Autres services {#other-services}

Allouez les ressources suivantes pour ces composants légers :

| Service | vCPUs | RAM | Replicas |
|---------|-------|-----|----------|
| **Plan de contrôle** | 2 | 4 Go | 1 |
| **Metastore** | 2 | 4 Go | 2 |
| **Janitor** | 2 | 4 Go | 1 |

## Estimation du stockage objet {#object-storage-estimation}

BYOC Logs compresse et indexe les données de logs avant de les stocker dans le stockage objet. Le taux de compression dépend du format, de la structure et de la redondance des logs dans vos données.

| Métrique | Plage typique |
|--------|---------------|
| **Taux de compression** | 5x à 8x (entrée brute par rapport à la taille stockée) |
| **Stockage par To/jour ingéré** | 125-200 Go/jour sur le stockage objet |

Pour estimer vos besoins en stockage objet :

$$\\text\"Données stockées par jour\" = {\\text\"Volume quotidien\"} / {\\text\"taux de compression\"}$$

$$\\text\"Stockage total\" = \\text\"Données stockées par jour\" × \\text\"période de rétention (jours)\"$$

{{% collapse-content title="Exemple : Stockage pour 10 To/jour avec une rétention de 30 jours" level="h4" expanded=false %}}
En supposant un taux de compression de 6x :

1. **Stocké par jour :** `10 TB / 6 ≈ 1.67 TB/day`
2. **Total pour 30 jours :** `1.67 TB × 30 ≈ 50 TB`

Utilisez un stockage d'objets de niveau standard (par exemple, S3 Standard, GCS Standard) pour les données actives. Les niveaux à moindre coût tels que S3 Infrequent Access ou GCS Nearline ne sont pas validés pour une utilisation avec BYOC Logs.
{{% /collapse-content %}}

## Base de données PostgreSQL {#postgresql-database}

- **Taille de l'instance :** Pour la plupart des cas d'utilisation, une instance PostgreSQL avec 1 vCPU et 4 Go de RAM est suffisante
- **Recommandation AWS RDS :** Si vous utilisez AWS RDS, le type d'instance `t4g.medium` est un point de départ approprié
- **Haute disponibilité :** Activez le déploiement Multi-AZ avec une réplique de secours pour une haute disponibilité

## Niveaux de dimensionnement du Helm chart {#helm-chart-sizing-tiers}

Le Helm chart BYOC Logs fournit des niveaux de ressources prédéfinis via les paramètres `indexer.podSize` et `searcher.podSize` `podSize` sélectionne les besoins en ressources du pod et les paramètres de réglage Quickwit associés. La valeur par défaut de `podSize` est `xlarge` pour les deux composants. Chaque préréglage est conçu pour laisser de l'espace sur un nœud correspondant pour les composants système Kubernetes, les DaemonSets et les modules complémentaires.

Les préréglages prennent en compte les ressources réservées aux composants système Kubernetes. Les montants de réservation sont basés sur le [calcul de réservation de nœud GKE](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/plan-node-sizes#resource_reservations). Un supplément de 250m de CPU et 512Mi de mémoire par nœud est réservé pour les DaemonSets et les modules complémentaires :

```text
Actual CPU request = (nominal pod CPU - Kubernetes system CPU reservation - 250m), rounded down to the nearest 100m
Actual memory request/limit = (nominal pod memory - Kubernetes system memory reservation - 512Mi), rounded down to the nearest 100Mi
```

| `podSize` | Demande de CPU nominale | Demande de CPU réelle | Demande/limite de mémoire nominale | Demande/limite de mémoire réelle |
|---|---:|---:|---:|---:|
| `large` | 2 | 1600m | 8Gi | 5700Mi |
| `xlarge` | 4 | 3600m | 16Gi | 13100Mi |
| `2xlarge` | 8 | 7600m | 32Gi | 28500Mi |
| `4xlarge` | 16 | 15600m | 64Gi | 59300Mi |
| `6xlarge` | 24 | 23600m | 96Gi | 90100Mi |
| `8xlarge` | 32 | 31600m | 128Gi | 120900Mi |

Les préréglages ne définissent pas de limite de CPU, ce qui permet à un pod d'utiliser le CPU inutilisé sur son nœud sans être limité. Les demandes et les limites de mémoire sont égales pour maintenir l'utilisation de la mémoire dans la capacité allouable du nœud.

Les valeurs définissant les tailles de file d'attente d'ingestion et les tailles de cache de recherche sont automatiquement appliquées pour le niveau sélectionné. Consultez le Helm chart sizing map [1] pour la configuration complète. Pour plus de détails sur chaque paramètre, consultez la documentation Quickwit pour [indexer parameters][2], [ingest API parameters][3] et [searcher parameters][4].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/cloudprem/sizing-map.yaml
[2]: https://quickwit.io/docs/configuration/node-config#indexer-configuration
[3]: https://quickwit.io/docs/configuration/node-config#ingest-api-configuration
[4]: https://quickwit.io/docs/configuration/node-config#searcher-configuration