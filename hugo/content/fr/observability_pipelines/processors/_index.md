---
aliases:
- /fr/observability_pipelines/processors/tail_based_sampling/
description: Découvrez les processeurs disponibles pour analyser, structurer et enrichir
  les logs, les métriques et les traces dans Observability Pipelines.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/rehydrate-archived-logs-with-observability-pipelines
  tag: Blog
  text: Réhydratez les logs archivés dans n'importe quel SIEM ou fournisseur de journalisation
    avec Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-transform-and-enrich-logs/
  tag: blog
  text: Transformez et enrichissez vos logs avec Datadog Observability Pipelines
title: Processeurs
---
## Présentation {#overview}

<div class="alert alert-info">Les processeurs décrits dans cette documentation sont spécifiques aux environnements de journalisation sur site. Pour analyser, structurer et enrichir les logs basés sur le cloud, consultez la documentation <a href="https://docs.datadoghq.com/logs/log_configuration/logs_to_metrics">Log Management</a>.</div>

Utilisez les processeurs d'Observability Pipelines pour analyser, structurer et enrichir vos logs et métriques. Lorsque vous créez un pipeline dans l'interface utilisateur, des processeurs présélectionnés sont ajoutés à votre groupe de processeurs en fonction du modèle sélectionné. Vous pouvez ajouter des processeurs supplémentaires et supprimer ceux existants en fonction de vos besoins de traitement.

Les groupes de processeurs sont exécutés de haut en bas. L'ordre des processeurs est important car les événements sont vérifiés par chaque processeur, mais seuls les événements qui correspondent aux filtres du processeur sont traités. Pour modifier l'ordre des processeurs, utilisez la poignée de glissement située dans le coin supérieur gauche du processeur que vous souhaitez déplacer.

**Remarque** : Pour un canevas de pipeline, il existe une limite de 25 groupes de processeurs et un total de 150 processeurs.

## Processeurs {#processors}

Voici les processeurs disponibles :

{{< tabs >}}
{{% tab "Logs" %}}

- [Processeur d'ajout de variables d'environnement][1]
- [Processeur d'ajout de nom de host][2]
- [Processeur personnalisé][3]
- [Processeur de déduplication][4]
- [Processeur de modification de champs][5]
- [Processeur de table d'enrichissement][6]
- [Processeur de filtrage][7]
- [Processeur de génération de métriques][8]
- [Processeur d'analyse Grok][9]
- [Processeur d'analyse JSON][10]
- [Processeur d'analyse XML][11]
- [Processeur de quota][12]
- [Processeur de réduction][13]
- [Processeur de remappage vers OCSF][14]
- [Processeur d'échantillonnage][15]
- [Processeur Sensitive Data Scanner][16]
- [Fractionner le tableau][17]
- [Tags][18]
- [Limiteur][19]

[1]: /fr/observability_pipelines/processors/add_environment_variables/
[2]: /fr/observability_pipelines/processors/add_hostname/
[3]: /fr/observability_pipelines/processors/custom_processor/
[4]: /fr/observability_pipelines/processors/dedupe/
[5]: /fr/observability_pipelines/processors/edit_fields/
[6]: /fr/observability_pipelines/processors/enrichment_table/
[7]: /fr/observability_pipelines/processors/filter/
[8]: /fr/observability_pipelines/processors/generate_metrics/
[9]: /fr/observability_pipelines/processors/grok_parser/
[10]: /fr/observability_pipelines/processors/parse_json/
[11]: /fr/observability_pipelines/processors/parse_xml/
[12]: /fr/observability_pipelines/processors/quota/
[13]: /fr/observability_pipelines/processors/reduce/
[14]: /fr/observability_pipelines/processors/remap_ocsf/
[15]: /fr/observability_pipelines/processors/sample/
[16]: /fr/observability_pipelines/processors/sensitive_data_scanner/
[17]: /fr/observability_pipelines/processors/split_array/
[18]: /fr/observability_pipelines/processors/tags/
[19]: /fr/observability_pipelines/processors/throttle/

{{% /tab %}}
{{% tab "Métriques" %}}

- [Agrégation][1]
- [Edit Tags][2]
- [Filter][3]
- [Tag Allow/Block List][4]
- [Tag Cardinality Control][5]

[1]: /fr/observability_pipelines/processors/aggregate/
[2]: /fr/observability_pipelines/processors/edit_tags/
[3]: /fr/observability_pipelines/processors/filter/
[4]: /fr/observability_pipelines/processors/tag_allow_block_list/
[5]: /fr/observability_pipelines/processors/tag_cardinality_control/

{{% /tab %}}
{{< /tabs >}}

## Groupes de processeurs {#processor-groups}

<div class="alert alert-info">La configuration d'un pipeline avec des groupes de processeurs n'est disponible que pour les versions 2.7 et ultérieures de Worker.</div>

{{< img src="observability_pipelines/processors/processor_groups.png" alt="Un pipeline avec une source Splunk HEC envoyant des logs à trois groupes de processeurs, chacun avec son propre filtre et ses propres processeurs, qui envoient ensuite les logs vers des destinations Microsoft Sentinel et Splunk HEC." style="width:100%;" >}}

Vous pouvez organiser vos processeurs en groupes logiques pour vous aider à les gérer. Chaque groupe de processeurs possède un filtre de groupe afin que ces processeurs ne soient appliqués qu'à des événements spécifiques. Par exemple, si vous souhaitez que les processeurs de groupe ne traitent que les événements provenant de `vpc`, utilisez alors le filtre de groupe `source:vpc`. Vous pouvez également ajouter des filtres pour chaque processeur individuel.

Les groupes de processeurs et les processeurs au sein de chaque groupe sont exécutés de haut en bas. L'ordre des processeurs est important car les événements sont vérifiés par chaque processeur, mais seuls les événements qui correspondent aux filtres du processeur sont traités. Pour modifier l'ordre des processeurs, utilisez la poignée de glissement située dans le coin supérieur gauche du processeur que vous souhaitez déplacer.

**Remarque** : Il existe une limite de 25 groupes de processeurs par canevas de pipeline. Par exemple, dans un pipeline à double envoi avec deux destinations, le nombre combiné de groupes de processeurs sur les deux destinations ne peut pas dépasser 25. Vous pouvez avoir les groupes dans n'importe quelle combinaison, comme 15 sur une destination et 10 sur l'autre.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}