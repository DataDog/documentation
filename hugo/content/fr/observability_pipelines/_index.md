---
description: Découvrez comment Observability Pipelines vous permet de collecter, traiter
  et acheminer des logs et des métriques au sein de votre propre infrastructure vers
  des destinations telles que Datadog, Amazon S3, Splunk et Microsoft Sentinel.
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/explore_templates/
  tag: Documentation
  text: Configurez des pipelines
- link: /observability_pipelines/configuration/set_up_pipelines/
  tag: Documentation
  text: Explorez les cas d'utilisation et les modèles
- link: /observability_pipelines/configuration/install_the_worker/
  tag: Documentation
  text: Installez l'Observability Pipelines Worker
- link: /agent/configuration/dual-shipping/#yaml-configuration
  tag: Documentation
  text: Envoi en double avec Observability Pipelines
- link: /observability_pipelines/guide/strategies_for_reducing_log_volume/
  tag: Documentation
  text: Stratégies pour réduire le volume de logs
- link: https://learn.datadoghq.com/courses/course-getting-started-observability-pipelines
  tag: Centre d'apprentissage
  text: Démarrage avec Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-reference-tables-log-enrichment/
  tag: Blog
  text: Ajoutez un contexte mis à jour dynamiquement aux logs avec les tables de référence
    et Observability Pipelines
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: Blog
  text: Acheminer les données OTel des applications IA vers ClickHouse et Datadog
    à l'aide d'Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-sensitive-data-redaction/
  tag: blog
  text: Masquez les données sensibles de vos logs sur site à l'aide d'Observability
    Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-dual-ship-logs/
  tag: blog
  text: Envoyez vos logs en double avec Datadog Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-log-volume-control/
  tag: blog
  text: Contrôlez vos volumes de logs avec Datadog Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-archiving/
  tag: blog
  text: Archivez vos logs avec Observability Pipelines pour une migration simple et
    abordable vers Datadog
- link: https://www.datadoghq.com/blog/observability-pipelines/
  tag: blog
  text: Agrégez, traitez et acheminez facilement vos logs avec Datadog Observability
    Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-stream-logs-in-ocsf-format/
  tag: blog
  text: Diffusez vos logs au format OCSF vers vos fournisseurs de sécurité ou lacs
    de données préférés avec Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-route-logs-microsoft-sentinel/
  tag: blog
  text: Simplifiez votre migration SIEM vers Microsoft Sentinel avec Datadog Observability
    Pipelines
- link: https://www.datadoghq.com/blog/sled-observability-pipelines/
  tag: blog
  text: Comment les organisations étatiques, locales et éducatives peuvent gérer leurs
    logs de manière flexible et efficace en utilisant Datadog Observability Pipelines
- link: https://www.datadoghq.com/blog/optimize-high-volume-logs/
  tag: blog
  text: Comment optimiser les données de logs à haut volume sans compromettre la visibilité
- link: https://www.datadoghq.com/blog/archive-search/
  tag: Blog
  text: Recherchez vos logs historiques plus efficacement avec Datadog Archive Search
- link: https://www.datadoghq.com/blog/introducing-datadog-cloudprem/
  tag: blog
  text: Stockez et recherchez des logs à l'échelle du pétaoctet dans votre propre
    infrastructure avec Datadog BYOC Logs
- link: https://www.datadoghq.com/blog/manage-high-volume-logs-with-observability-pipeline-packs/
  tag: blog
  text: Maîtrisez les coûts de journalisation sur n'importe quel SIEM ou lac de données
    à l'aide de Packs avec Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-otel-cost-control/
  tag: Blog
  text: Utilisez OpenTelemetry avec Observability Pipelines pour une collecte de logs
    indépendante des fournisseurs et un contrôle des coûts
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: Blog
  text: Simplifiez la collecte et l'agrégation des logs pour les MSSP avec Datadog
    Observability Pipelines
- link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
  tag: Blog
  text: Gérez le volume de métriques et les tags dans votre environnement avec Observability
    Pipelines
title: Observability Pipelines
---
## Présentation {#overview}

{{< img src="observability_pipelines/op_marketecture_06042025.png" alt="Un graphique montrant des données agrégées à partir de diverses sources, traitées et enrichies par l'Observability Pipelines Worker dans votre propre environnement, puis acheminées vers les destinations de sécurité, d'analyse et de stockage de votre choix" style="width:100%;" >}}

Datadog Observability Pipelines vous permet de collecter et de traiter des logs et des métriques au sein de votre propre infrastructure, puis d'acheminer les données vers différentes destinations. Il vous donne le contrôle sur vos données d'observabilité avant qu'elles ne quittent votre environnement.

Grâce à des modèles prêts à l'emploi, vous pouvez créer des pipelines qui masquent les données sensibles, enrichissent les données, filtrent les événements inutiles et acheminent les données vers des destinations telles que Datadog, des outils SIEM ou le stockage cloud.

## Composants clés {#key-components}

### Observability Pipelines Worker {#observability-pipelines-worker}

L'Observability Pipelines Worker s'exécute au sein de votre infrastructure pour agréger, traiter et acheminer les données.

<div class="alert alert-info">
Datadog vous recommande de mettre à jour l'Observability Pipelines Worker (OPW) à chaque version mineure et correctif, ou au minimum, chaque mois. <br><br> La mise à niveau vers une version majeure de l'OPW et son maintien à jour constituent la seule méthode prise en charge pour bénéficier des dernières fonctionnalités, correctifs et mises à jour de sécurité de l'OPW. Consultez <a href="/observability_pipelines/configuration/install_the_worker/#upgrade-the-worker">Mettre à niveau le Worker</a> pour effectuer la mise à jour vers la dernière version du Worker</a>.
</div>

### Interface utilisateur d'Observability Pipelines {#observability-pipelines-ui}

L'interface utilisateur d'Observability Pipelines fournit un plan de contrôle centralisé où vous pouvez :

- Créez et modifiez des pipelines avec des modèles guidés.
- Déployez et gérez des Workers.
- Activez les moniteurs pour suivre l'état de santé du pipeline.

## Démarrez {#get-started}

1. Accédez à [Observability Pipelines][1].
1. Sélectionnez un [modèle](#common-use-cases-and-templates) en fonction de votre cas d'utilisation.
1. Configurez votre pipeline :
    1. Choisissez une [source][2] de logs.
    1. Configurez les [processeurs][3].
    1. Ajoutez une ou plusieurs [destinations][4].
1. [Installez le Worker][5] dans votre environnement
1. Activez les moniteurs pour une observabilité en temps réel de l'état de santé de votre pipeline.

Consultez [Set Up Pipelines][6] pour des instructions détaillées.

## Cas d'utilisation courants et modèles {#common-use-cases-and-templates}

Observability Pipelines inclut des modèles prédéfinis pour les flux de travail courants de routage et de transformation de données. Vous pouvez les personnaliser entièrement ou les combiner pour répondre à vos besoins.

{{< img src="observability_pipelines/eight_templates.png" alt="L'interface utilisateur d'Observability Pipelines montrant les huit modèles" style="width:100%;" >}}

### Modèles {#templates}

{{< tabs >}}
{{% tab "Logs" %}}

| Modèle | Description |
|----------|-------------|
| Archivage des logs | Stockez les logs bruts dans Amazon S3, Google Cloud Storage ou Azure Storage pour une conservation à long terme et une réhydratation. |
| Double envoi de logs | Envoyez le même flux de logs vers plusieurs destinations (par exemple, Datadog et un SIEM). |
| Générer des métriques basées sur les logs | Convertissez les logs à haut volume en métriques de comptage ou de distribution pour réduire les besoins de stockage. |
| Enrichissement des logs | Ajoutez des métadonnées à partir de tables de référence ou de mappages statiques pour des requêtes plus efficaces. |
| Contrôle du volume des logs | Réduisez le volume des logs indexés en filtrant les logs à faible valeur avant leur stockage. |
| Masquage des données sensibles | Détectez et supprimez les informations personnellement identifiables (PII) et les secrets à l'aide de règles intégrées ou personnalisées. |
| Fractionnement des logs | Acheminez les logs par type (par exemple, sécurité ou application) vers différents outils. |

{{% /tab %}}
{{% tab "Métriques" %}}

| Modèle | Description |
|----------|-------------|
| Gouvernance des tags de métriques | Gérez la qualité et le volume de vos métriques en ne conservant que celles dont vous avez besoin, en standardisant le balisage des métriques et en supprimant les tags indésirables pour éviter une cardinalité élevée. |

{{% /tab %}}
{{< /tabs >}}

Consultez [Explore templates][7] pour plus d'informations.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/sources/
[3]: /fr/observability_pipelines/processors/
[4]: /fr/observability_pipelines/destinations/
[5]: /fr/observability_pipelines/configuration/install_the_worker/
[6]: /fr/observability_pipelines/configuration/set_up_pipelines/
[7]: /fr/observability_pipelines/configuration/explore_templates/