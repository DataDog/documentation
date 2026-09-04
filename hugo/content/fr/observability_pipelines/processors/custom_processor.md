---
disable_toc: false
further_reading:
- link: /observability_pipelines/guide/remap_reserved_attributes/
  tag: Documentation
  text: Remappez les attributs réservés
- link: /logs/guide/regex_log_parsing/
  tag: guide
  text: Rédaction de règles de parsing Grok efficaces avec des expressions régulières
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: Blog
  text: Acheminer les données OTel des applications IA vers ClickHouse et Datadog
    à l'aide d'Observability Pipelines
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: Métriques
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Processeur personnalisé
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez ce processeur avec Vector Remap Language (VRL) pour modifier et enrichir vos logs ou métriques. Le VRL est un langage orienté expression, spécifique à un domaine, conçu pour transformer les données. Il propose des fonctions intégrées pour les cas d'utilisation liés à l'observabilité. Vous pouvez utiliser des fonctions personnalisées de la manière suivante :

- Manipuler des [tableaux](#array), des [chaînes de caractères](#string) et d'autres types de données.
- Encoder et décoder des valeurs en utilisant [Codec](#codec).
- [Chiffrer](#encrypt) et [déchiffrer](#decrypt) des valeurs.
- [Convertir](#coerce) un type de données en un autre (par exemple, d'un entier vers une chaîne de caractères).
- [Convertir des valeurs syslog](#convert) en valeurs lisibles.
- Enrichir des valeurs en utilisant des [tables d'enrichissement](#enrichment).
- [Manipuler des valeurs IP](#ip).
- Calculer [des distances géographiques](#map) et des azimuts avec la formule haversine.
- [Analyser](#parse) des valeurs avec des règles personnalisées (par exemple, grok, regex, etc.) et des fonctions prêtes à l'emploi (par exemple, syslog, apache, logs de flux VPC, etc.). Consultez [Rédaction de règles de parsing Grok efficaces avec des expressions régulières][3] pour plus d'informations.
- Manipuler des [chemins d'événements](#path).

Consultez [Fonctions personnalisées](#custom-functions) pour obtenir la liste complète des fonctions disponibles.

Consultez [Remappage des attributs réservés][1] pour savoir comment utiliser le processeur personnalisé afin de remapper manuellement et dynamiquement les attributs.

## Configuration {#setup}

Pour configurer ce processeur :

- Si vous n'avez pas encore créé de fonctions, cliquez sur {{< ui >}}Add custom processor{{< /ui >}} et suivez les instructions dans [Ajouter une fonction](#add-a-function) pour en créer une.
- Si vous avez déjà ajouté des fonctions personnalisées, cliquez sur {{< ui >}}Manage custom processors{{< /ui >}}. Cliquez sur une fonction dans la liste pour la modifier ou la supprimer. Vous pouvez utiliser la barre de recherche pour trouver une fonction par son nom. Cliquez sur {{< ui >}}Add Custom Processor{{< /ui >}} pour [ajouter une fonction](#add-a-function).

### Ajouter une fonction {#add-a-function}

1. Saisissez un nom pour votre processeur personnalisé.
1. Ajoutez votre script pour modifier vos données en utilisant [fonctions personnalisées][1]. Vous pouvez également cliquer sur {{< ui >}}Autofill with Example{{< /ui >}} et sélectionner l'un des cas d'utilisation courants pour commencer. Cliquez sur l'icône de copie pour l'exemple de script et collez-le dans votre script. Consultez [Commencez avec le processeur personnalisé][2] pour plus d'informations.
1. Optionnellement, cochez {{< ui >}}Drop events on error{{< /ui >}} si vous souhaitez supprimer les événements qui rencontrent une erreur lors du traitement.
1. Saisissez un événement exemple.
1. Cliquez sur {{< ui >}}Run{{< /ui >}} pour prévisualiser la façon dont les fonctions traitent l'événement. Une fois le script exécuté, vous pouvez voir le résultat pour l'événement.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

## Fonctions personnalisées {#custom-functions}

{{< whatsnext desc="Les fonctions sont organisées dans les catégories suivantes :" >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#array" >}}Tableau{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#codec" >}}Codec{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#convert" >}}Convertir{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#cryptography" >}}Cryptographie{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#debug" >}}Débogage{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#enrichment" >}}Enrichissement{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#ip" >}}IP{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#map" >}}Map{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#number" >}}Numéro{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#object" >}}Objet{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#parse" >}}Analyser{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#path" >}}Chemin{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#random" >}}Aléatoire{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#string" >}}String{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#system" >}}Système{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#timestamp" >}}Timestamp{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#type" >}}Type{{< /nextlink >}}
{{< /whatsnext >}}

{{< vrl-functions >}}

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][4] et les [métriques de tampon de processeur][5] émis par tous les processeurs, consultez la documentation sur les [métriques d'utilisation des pipelines][6]. Pour filtrer ou grouper par métrique du processeur personnalisé, utilisez le tag `component_type:remap_vrl`.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/observability_pipelines/guide/remap_reserved_attributes
[2]: /fr/observability_pipelines/guide/get_started_with_the_custom_processor
[3]: /fr/logs/guide/regex_log_parsing/
[4]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[5]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[6]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/