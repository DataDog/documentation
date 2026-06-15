---
aliases:
- /fr/cloudprem/configure/cluster_sizing/
description: Découvrir le dimensionnement des clusters pour CloudPrem
further_reading:
- link: /cloudprem/configure/ingress/
  tag: Documentation
  text: Configurer l'ingress CloudPrem
- link: /cloudprem/configure/pipelines/
  tag: Documentation
  text: Configurer le traitement des logs CloudPrem
- link: /cloudprem/introduction/architecture/
  tag: Documentation
  text: En savoir plus sur l'architecture de CloudPrem
title: Dimensionnement du cluster
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en bêta" >}}
  Participez à la bêta de CloudPrem pour profiter de nouvelles fonctionnalités autohébergées de gestion des logs.
{{< /callout >}}

## Présentation

Un dimensionnement correct du cluster garantit des performances optimales, une rentabilité et une fiabilité optimales pour votre déploiement CloudPrem. Vos besoins en matière de dimensionnement dépendent de plusieurs facteurs, notamment le volume d'ingestion de logs, les schémas de requêtes et la complexité de vos données de logs.

Ce guide fournit des recommandations de base pour le dimensionnement des composants de votre cluster CloudPrem : indexeurs, moteurs de recherche, services de support et base de données PostgreSQL.

<div class="alert alert-tip">
Utilisez votre volume de logs journalier attendu et vos taux d'ingestion aux heures de pointe comme points de départ, puis surveillez les performances de votre cluster et ajustez le dimensionnement en conséquence.
</div>

## Indexeurs

Les indexeurs reçoivent les logs des Agents Datadog, puis les traitent, les indexent et les stockent sous forme de fichiers d'index (appelés _splits_) dans un stockage objet. Un dimensionnement correct est essentiel pour maintenir le débit d'ingestion et garantir que votre cluster peut gérer votre volume de logs.

| Spécification | Recommandation | Remarques |
|---------------|----------------|-------|
| **Performances** | 5 Mo/s par vCPU | Débit de base pour déterminer le dimensionnement initial. Les performances réelles dépendent des caractéristiques des logs (taille, nombre d'attributs, niveau d'imbrication) |
| **Mémoire** | 4 Go de RAM par vCPU | |
| **Taille minimale des pods** | 2 vCPU, 8 Go de RAM | Minimum recommandé pour les pods d'indexation |
| **Capacité de stockage** | Au moins 200 Go | Requis pour les données temporaires lors de la création et de la fusion de fichiers d'index |
| **Type de stockage** | SSD locaux (recommandé) | Les HDD locaux ou le stockage en mode bloc attaché au réseau (Amazon EBS, Azure Managed Disks) peuvent également être utilisés |
| **E/S disque** | ~20 Mo/s par vCPU | Équivalent à 320 IOPS par vCPU pour Amazon EBS (en supposant 64 Ko par IOPS) |


{{% collapse-content title="Exemple : dimensionnement pour 1 To de logs par jour" level="h4" expanded=false %}}
Pour indexer 1 To de logs par jour (~11,6 Mo/s), suivez les étapes suivantes :

1. **Calculez les vCPU :** `11,6 Mo/s ÷ 5 Mo/s par vCPU ≈ 2,3 vCPU`
2. **Calculez la RAM :** `2,3 vCPU × 4 Go de RAM ≈ 9 Go de RAM`
3. **Ajoutez une marge :** commencez avec un pod d'indexation configuré avec **3 vCPU, 12 Go de RAM et un disque de 200 Go**. Ajustez ces valeurs en fonction des performances observées et des besoins en redondance.
{{% /collapse-content %}}

## Moteurs de recherche

Les moteurs de recherche traitent les requêtes de recherche depuis l'interface Datadog, en lisant les métadonnées depuis le Metastore et en récupérant les données depuis le stockage objet.

Un point de départ général consiste à provisionner environ le double du nombre total de vCPU alloués aux indexeurs.

- **Performances :** les performances de recherche dépendent fortement de la charge de travail (complexité des requêtes, simultanéité, quantité de données analysées). Par exemple, les requêtes de termes (`status:error AND message:exception`) sont généralement moins coûteuses en calcul que les agrégations.
- **Mémoire :** 4 Go de RAM par vCPU de moteur de recherche. Provisionnez davantage de RAM si vous prévoyez de nombreuses requêtes d'agrégation simultanées.

## Autres services

Allouez les ressources suivantes pour ces composants légers :

| Service | vCPU | RAM | Réplicas |
|---------|-------|-----|----------|
| **Plan de contrôle** | 2 | 4 Go | 1 |
| **Metastore** | 2 | 4 Go | 2 |
| **Janitor** | 2 | 4 Go | 1 |

## Base de données PostgreSQL

- **Taille de l'instance :** pour la plupart des cas d'utilisation, une instance PostgreSQL avec 1 vCPU et 4 Go de RAM est suffisante
- **Recommandation AWS RDS :** si vous utilisez AWS RDS, le type d'instance `t4g.medium` constitue un bon point de départ
- **Haute disponibilité :** activez le déploiement Multi-AZ avec un réplica de secours pour la haute disponibilité

## Niveaux de dimensionnement du Helm chart

Le Helm chart CloudPrem fournit des niveaux de dimensionnement prédéfinis via les paramètres `indexer.podSize` et `searcher.podSize`. Chaque niveau définit les limites de ressources en vCPU et en mémoire pour un pod, et configure automatiquement les paramètres spécifiques aux composants.

| Taille | vCPU | Mémoire |
|------|-------|--------|
| medium | 1 | 4 Go |
| large | 2 | 8 Go |
| xlarge | 4 | 16 Go |
| 2xlarge | 8 | 32 Go |
| 4xlarge | 16 | 64 Go |
| 6xlarge | 24 | 96 Go |
| 8xlarge | 32 | 128 Go |

{{% collapse-content title="Configuration de l'indexeur par niveau" level="h4" expanded=false %}}

Les valeurs suivantes sont automatiquement appliquées lorsque vous définissez `indexer.podSize` dans le Helm chart. Pour plus de détails sur chaque paramètre, consultez la section [Configuration de l'indexeur Quickwit][1].

| Taille | split_store_max_num_bytes | split_store_max_num_splits |
|------|---------------------------|----------------------------|
| medium | 200G | 10000 |
| large | 200G | 10000 |
| xlarge | 200G | 10000 |
| 2xlarge | 200G | 10000 |
| 4xlarge | 200G | 10000 |
| 6xlarge | 200G | 10000 |
| 8xlarge | 200G | 10000 |

{{% /collapse-content %}}

{{% collapse-content title="Configuration de l'API d'ingestion par niveau" level="h4" expanded=false %}}

Les valeurs suivantes sont automatiquement appliquées lorsque vous définissez `indexer.podSize` dans le Helm chart. Pour plus de détails sur chaque paramètre, consultez la section [Configuration de l'API d'ingestion Quickwit][2].

| Taille | max_queue_memory_usage | max_queue_disk_usage |
|------|------------------------|----------------------|
| medium | 2GiB | 4GiB |
| large | 4GiB | 8GiB |
| xlarge | 8GiB | 16GiB |
| 2xlarge | 16GiB | 32GiB |
| 4xlarge | 32GiB | 64GiB |
| 6xlarge | 48GiB | 96GiB |
| 8xlarge | 64GiB | 128GiB |

{{% /collapse-content %}}

{{% collapse-content title="Configuration du moteur de recherche par niveau" level="h4" expanded=false %}}

Les valeurs suivantes sont automatiquement appliquées à la configuration du moteur de recherche lorsque vous définissez `searcher.podSize` dans le Helm chart. Pour plus de détails sur chaque paramètre, consultez la section [Configuration du moteur de recherche Quickwit][3].

| Taille | fast_field_cache_capacity | split_footer_cache_capacity | partial_request_cache_capacity | max_num_concurrent_split_searches | aggregation_memory_limit |
|------|---------------------------|-----------------------------|-------------------------------|-----------------------------------|--------------------------|
| medium | 1GiB | 500MiB | 64MiB | 2 | 500MiB |
| large | 2GiB | 1GiB | 128MiB | 4 | 1GiB |
| xlarge | 4GiB | 2GiB | 256MiB | 8 | 2GiB |
| 2xlarge | 8GiB | 4GiB | 512MiB | 16 | 4GiB |
| 4xlarge | 16GiB | 8GiB | 1GiB | 32 | 8GiB |
| 6xlarge | 24GiB | 12GiB | 1536MiB | 48 | 12GiB |
| 8xlarge | 32GiB | 16GiB | 2GiB | 64 | 16GiB |

{{% /collapse-content %}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://quickwit.io/docs/configuration/node-config#indexer-configuration
[2]: https://quickwit.io/docs/configuration/node-config#ingest-api-configuration
[3]: https://quickwit.io/docs/configuration/node-config#searcher-configuration