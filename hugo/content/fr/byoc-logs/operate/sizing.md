---
aliases:
- /fr/cloudprem/configure/cluster_sizing/
- /fr/cloudprem/operate/sizing/
description: En savoir plus sur le dimensionnement des clusters pour les BYOC Logs
further_reading:
- link: /byoc-logs/configure/ingress/
  tag: Documentation
  text: Configurer l'Ingress des BYOC Logs
- link: /byoc-logs/configure/pipelines/
  tag: Documentation
  text: Configurer le traitement des BYOC Logs
- link: /byoc-logs/introduction/architecture/
  tag: Documentation
  text: En savoir plus sur l'architecture des BYOC Logs
title: Dimensionnement du cluster
---
{{< jqmath-vanilla >}}

## Présentation {#overview}

Un dimensionnement approprié du cluster permet de garantir des performances, une rentabilité et une fiabilité optimales pour votre déploiement de logs BYOC (Bring Your Own Cloud). Vos besoins en matière de dimensionnement dépendent de plusieurs facteurs, notamment le volume d'ingestion des logs, les modèles de requête, la période de rétention et la complexité de vos données de log.

Les [exemples de dimensionnement](#sizing-examples) ci-dessous fournissent des configurations de départ pour des volumes de logs quotidiens courants. Pour des conseils plus approfondis sur chaque composant, consultez les sections qui suivent.

<div class="alert alert-tip">
Utilisez votre volume de logs quotidien attendu et vos taux d'ingestion de pointe comme points de départ, puis surveillez les performances de votre cluster et ajustez le dimensionnement si nécessaire.
</div>

## Exemples de dimensionnement {#sizing-examples}

Le tableau suivant fournit des configurations de référence pour des volumes de logs quotidiens courants. Ces recommandations sont destinées à servir de points de départ et doivent être ajustées en fonction de l'utilisation des ressources et des performances de requête observées.

Comme point de départ, prévoyez environ :

- 2 vCPU d'indexeur par To de logs ingérés par jour
- 1 vCPU de compacteur pour 2 To de logs ingérés par jour

La capacité des Searchers dépend de la simultanéité des requêtes, de la complexité des requêtes et de la quantité de données analysées. Il doit donc être dimensionné en fonction de la charge de travail de recherche attendue plutôt que du seul volume d'ingestion. Les charges de travail intensives en analyse peuvent nécessiter jusqu'à deux fois la capacité de recherche de référence indiquée ci-dessous.

Ces recommandations supposent l'utilisation de processeurs x86 modernes, tels que ceux utilisés dans les types d'instances AWS M6, ou de processeurs équivalents d'autres fournisseurs de cloud. Les processeurs basés sur ARM, tels qu'AWS Graviton, peuvent offrir une meilleure rentabilité à débit comparable.

Le tableau suivant indique la capacité totale en vCPU pour chaque composant.

|   Volume quotidien | Total vCPU Indexeur | Total vCPU Compactor | Total vCPU Searcher |
|---------------:|--------------------:|----------------------:|---------------------:|
|   **1 To/jour** |                   2 |                   0,5 |                    4 |
|  **10 To/jour** |                  20 |                     5 |                   40 |
| **100 To/jour** |                 200 |                    50 |                  400 |

Utilisez les allocations de CPU et de mémoire par pod suivantes comme point de départ pour répartir la capacité totale entre les pods :

| Volume quotidien    | Indexeur par pod | Compactor par pod | Searcher par pod |
|-----------------|----------------:|------------------:|-----------------:|
| **Jusqu'à 30 To/jour** |  4 vCPU, 16 Go |    4 vCPU, 16 Go |  16 vCPU, 64 Go |
| **Au-delà de 30 To/jour** |  8 vCPU, 32 Go |    8 vCPU, 32 Go | 64 vCPU, 256 Go |

<div class="alert alert-info">
<strong>Facturation par rapport au provisionnement :</strong> Les vCPU provisionnés et les vCPU facturés sont différents. Un cluster de production est intentionnellement surprovisionné pour absorber les pics d'ingestion et de recherche. Contactez votre représentant Datadog pour obtenir des conseils sur la facturation.
</div>

## Indexeurs {#indexers}

Les indexeurs reçoivent les logs des agents Datadog, puis les traitent, les indexent et les stockent sous forme de fichiers d'index (appelés _splits_) dans le stockage objet. Un dimensionnement approprié est essentiel pour maintenir le débit d'ingestion et garantir que votre cluster peut gérer votre volume de logs.

| Spécification        | Recommandation                 | Remarques                                                                                                                                                                                                                                                                                                                                                                  |
|----------------------|--------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Performances**      | 8 Mo/s par vCPU                | Débit de base pour déterminer le dimensionnement initial. Les performances réelles dépendent des caractéristiques des logs (taille, nombre d'attributs, niveau d'imbrication)                                                                                                                                                                                                                         |
| **Mémoire**           | 4 Go de RAM par vCPU              |                                                                                                                                                                                                                                                                                                                                                                        |
| **Taille minimale de pod** | 2 vCPU, 8 Go de RAM              | Minimum recommandé pour les pods d'indexeur |
| **Capacité de stockage** | Au moins 30 Go | Requis pour les données temporaires lors de la création et de la fusion des fichiers d'index |
| **Type de stockage**     | Stockage en mode bloc attaché au réseau | Par exemple : Amazon EBS gp3, Azure Managed Disks ou GCP Persistent Disk. Les données sont temporairement stockées dans un log de pré-écriture (WAL) avant d'être téléchargées vers le stockage objet. Le WAL n'est pas répliqué, donc l'utilisation de SSD locaux (éphémères) augmente le risque de perdre quelques minutes de données en cas de défaillance du disque. Le stockage en mode bloc attaché au réseau offre une redondance intégrée. |
| **E/S disque**         | ~20 Mo/s par vCPU | Équivalent à 320 IOPS par vCPU pour Amazon EBS (en supposant 64 Ko par IOPS). Par exemple, le débit par défaut d'Amazon EBS gp3 de 125 Mio/s est suffisant pour un indexeur de 4 vCPU. |


{{% collapse-content title="Exemple : Dimensionnement pour 100 To de logs par jour" level="h3" expanded=false %}}
Pour indexer 100 To de logs par jour (~1 160 Mo/s), suivez ces étapes :

1. **Calculer les vCPU :** `1,160 MB/s ÷ 8 MB/s per vCPU ≈ 145 vCPUs`
2. **Calculer la RAM :** `145 vCPUs × 4 GB RAM per vCPU ≈ 580 GB RAM`
3. **Ajouter une marge de sécurité :** Commencez avec 50 pods indexeurs, chacun configuré avec **4 vCPU, 16 Go de RAM et un disque de 30 Go**. Ajustez ces valeurs en fonction des performances observées et des besoins en redondance.
{{% /collapse-content %}}

{{% collapse-content title="Dimensionnement par nombre d'événements" level="h3" expanded=false %}}
Si vous connaissez votre nombre quotidien d'événements mais pas votre volume en octets, utilisez cette formule pour estimer :

$$\\text\"Volume quotidien (To)\" = {\\text\"événements par jour\" × \\text\"taille moyenne d'un événement (octets)\"} / 10^\{12\}$$

Par exemple, avec 1 milliard d'événements/jour à une taille moyenne de 1 Ko :

`1,000,000,000 × 1,000 / 1,000,000,000,000 = 1 TB/day`

Les tailles typiques des événements de logs varient de 500 octets (syslog court) à 2–3 Ko (JSON avec des tags Kubernetes). Mesurez un échantillon représentatif de vos logs pour obtenir une moyenne précise.
{{% /collapse-content %}}

## Compacteurs {#compactors}

Le compacteur fusionne les petits segments d'index en segments plus grands pour réduire la fragmentation et améliorer l'efficacité de la recherche. Il supprime également les segments obsolètes pour récupérer de l'espace de stockage.

| Spécification    | Recommandation      | Notes                                                        |
|------------------|---------------------|--------------------------------------------------------------|
| **Performances**  | 1 vCPU par 2 To/jour | Référence pour le dimensionnement initial                                  |
| **Mémoire**       | 4 Go de RAM par vCPU   |                                                              |
| **Type de stockage** | SSD local           | Les instances avec SSD locaux, telles que AWS M8gd, sont recommandées |

## Searchers {#searchers}

Les Searchers traitent les requêtes de recherche depuis l'interface utilisateur Datadog, lisent les métadonnées du Metastore et récupèrent les données du stockage objet.

Un point de départ général consiste à provisionner environ le double du nombre total de vCPU alloués aux Indexeurs. Consultez nos exemples de dimensionnement.

- **Performances :** Les performances de recherche dépendent fortement de la charge de travail (complexité des requêtes, concurrence, quantité de données analysées). Par exemple, les requêtes de terme (`status:error AND message:exception`) sont généralement moins coûteuses en calcul que les requêtes de recherche par caractères génériques ou sur l'événement complet.
- **Mémoire :** 4 Go de RAM par vCPU de recherche. Allouez plus de RAM si vous prévoyez de nombreuses demandes d'agrégation simultanées.


## Autres services {#other-services}

Allouez les ressources suivantes pour ces composants légers :

| Service | vCPU | RAM | Réplicas |
|---------|-------|-----|----------|
| **Plan de contrôle** | 2 | 4 Go | 1 |
| **Metastore** | 2 | 4 Go | 2 |
| **Janitor** | 2 | 4 Go | 1 |

## Estimation du stockage objet {#object-storage-estimation}

BYOC Logs compresse et indexe les données de logs avant de les stocker dans un stockage d'objets. Le taux de compression dépend du format des logs, de la structure et de la redondance de vos données.

| Métrique | Plage typique |
|--------|---------------|
| **Taux de compression** | 5x à 8x (entrée brute par rapport à la taille stockée) |
| **Stockage par To/jour ingéré** | 125-200 Go/jour sur stockage objet |

Pour estimer vos besoins en stockage d'objets :

$$\\text\"Données stockées par jour\" = {\\text\"Volume quotidien\"} / {\\text\"Taux de compression\"}$$

$$\\text\"Stockage total\" = \\text\"Données stockées par jour\" × \\text\"période de rétention (jours)\"$$

Les exemples suivants supposent une période de rétention de 30 jours et un taux de compression de 6x :

|   Volume quotidien | Stockage d'objets |
|---------------:|---------------:|
|   **1 To/jour** |          ~5 To |
|  **10 To/jour** |         ~50 To |
| **100 To/jour** |        ~500 To |

{{% collapse-content title="Exemple : Stockage pour 10 To/jour avec une rétention de 30 jours" level="h3" expanded=false %}}
En supposant un taux de compression de 6x :

1. **Données stockées par jour :** `10 TB / 6 ≈ 1.67 TB/day`
2. **Total pour 30 jours :** `1.67 TB × 30 ≈ 50 TB`

Utilisez un stockage d'objets de niveau standard (par exemple, S3 Standard, GCS Standard) pour les données actives. Les niveaux de coût inférieur tels que S3 Infrequent Access ou GCS Nearline ne sont pas validés pour une utilisation avec BYOC Logs.
{{% /collapse-content %}}

## Base de données PostgreSQL {#postgresql-database}

- **Taille de l'instance :** Pour la plupart des cas d'utilisation, une instance PostgreSQL avec 1 vCPU et 4 Go de RAM est suffisante
- **Recommandation AWS RDS :** Si vous utilisez AWS RDS, le type d'instance `t4g.medium` est un point de départ approprié
- **Haute disponibilité :** Activez le déploiement Multi-AZ avec un réplica de secours pour une haute disponibilité

## Niveaux de dimensionnement du chart Helm {#helm-chart-sizing-tiers}

Le chart Helm BYOC Logs fournit des niveaux de ressources prédéfinis via les paramètres `indexer.podSize` et `searcher.podSize`. `podSize` sélectionne les besoins en ressources du pod et les paramètres de réglage Quickwit associés. La valeur par défaut `podSize` est `xlarge` pour les deux composants. Chaque préréglage est conçu pour laisser de l'espace sur un nœud correspondant pour les composants système Kubernetes, les DaemonSets et les modules complémentaires.

Les préréglages tiennent compte des ressources réservées aux composants système de Kubernetes. Les montants de réservation sont basés sur le [calcul de réservation de nœud GKE](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/plan-node-sizes#resource_reservations). Un supplément de 250m de CPU et 512Mi de mémoire par nœud est réservé pour les DaemonSets et les modules complémentaires :

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

Les préréglages ne définissent pas de limite de CPU, permettant à un pod d'utiliser le CPU inutilisé sur son nœud sans être limité. Les demandes et les limites de mémoire sont égales afin de maintenir l'utilisation de la mémoire dans la capacité allouable du nœud.

Les valeurs définissant les tailles de la file d'attente d'ingestion et les tailles du cache de recherche sont automatiquement appliquées pour le niveau sélectionné. Consultez la [carte de dimensionnement du chart Helm][1] pour la configuration complète. Pour plus de détails sur chaque paramètre, consultez la documentation de Quickwit pour les [paramètres de l'indexeur][2], les [paramètres de l'API d'ingestion][3] et les [paramètres du moteur de recherche][4].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/cloudprem/sizing-map.yaml
[2]: https://quickwit.io/docs/configuration/node-config#indexer-configuration
[3]: https://quickwit.io/docs/configuration/node-config#ingest-api-configuration
[4]: https://quickwit.io/docs/configuration/node-config#searcher-configuration