---
description: Apprenez à utiliser le processeur Parse XML pour analyser des données
  XML afin qu'elles puissent être traitées et envoyées vers des destinations.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: Blog
  text: Acheminer les données OTel des applications IA vers ClickHouse et Datadog
    à l'aide d'Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: Blog
  text: Simplifiez la collecte et l'agrégation des logs pour les MSSP avec Datadog
    Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-parsing-xml-logs/
  tag: Blog
  text: Simplifiez la collecte et le traitement des logs XML avec Observability Pipelines
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Processeur Parse XML
---
{{< product-availability >}}

## Présentation {#overview}

Ce processeur analyse le langage de balisage extensible (XML) afin que les données puissent être traitées et envoyées vers différentes destinations. Le XML est un format de log utilisé pour stocker et transporter des données structurées. Il est organisé dans une structure arborescente pour représenter des informations imbriquées et utilise des tags et des attributs pour définir les données. Par exemple, voici des données XML utilisant uniquement des tags (`<recipe>`, `<type>` et `<name>`) et aucun attribut :

```xml
<recipe>
    <type>pasta</type>
    <name>Carbonara</name>
</recipe>
```

Voici un exemple XML où le tag `recipe` possède l'attribut `type` :

```xml
<recipe>
    <recipe type="pasta">
    <name>Carbonara</name>
</recipe>
```

L'image suivante montre un log d'événement Windows 4625 au format XML, à côté du même log analysé et généré au format JSON. En analysant le log XML, la taille de l'événement de log a été réduite d'environ 30 %.

{{< img src="observability_pipelines/processors/xml-side-by-side.png" alt="Le log XML et le log analysé résultant au format JSON" style="width:80%;" >}}

## Configuration {#setup}

Pour configurer ce processeur :

1. Définissez un {{< ui >}}filter query{{< /ui >}}. Consultez [Logs Search Syntax][1] pour plus d'informations.
   - Seuls les logs correspondant au filtre sont traités.
   - Tous les logs, qu'ils correspondent ou non à la requête de filtrage, sont envoyés à l'étape suivante du pipeline.
1. Saisissez le chemin d'accès au champ de log sur lequel vous souhaitez analyser le XML. Utilisez la notation de chemin `<OUTER_FIELD>.<INNER_FIELD>` pour faire correspondre les sous-champs. Consultez l'exemple de [notation de chemin](#path-notation-example-parse-xml) ci-dessous.
1. Optionnellement, dans le champ `Enter text key`, saisissez le nom de clé à utiliser pour le nœud de texte lorsque des attributs XML sont ajoutés. Consultez l'[exemple de clé de texte](#text-key-example). Si le champ est laissé vide, `value` est utilisé comme nom de clé.
1. Optionnellement, sélectionnez {{< ui >}}Always use text key{{< /ui >}} si vous souhaitez stocker du texte à l'intérieur d'un objet en utilisant la clé de texte même lorsqu'aucun attribut n'existe.
1. Optionnellement, activez {{< ui >}}Include XML attributes{{< /ui >}} si vous souhaitez inclure les attributs XML. Vous pouvez ensuite choisir d'ajouter le préfixe d'attribut que vous souhaitez utiliser. Voir [l'exemple de préfixe d'attribut](#attribute-prefix-example). Si le champ est laissé vide, la clé d'attribut d'origine est utilisée.
1. Optionnellement, sélectionnez si vous souhaitez convertir les types de données en nombres, booléens ou valeurs nulles.
    - Si {{< ui >}}Numbers{{< /ui >}} est sélectionné, les nombres sont analysés en tant qu'entiers et nombres à virgule flottante.
    - Si {{< ui >}}Booleans{{< /ui >}} est sélectionné, `true` et `false` sont analysés en tant que booléens.
    - Si {{< ui >}}Nulls{{< /ui >}} est sélectionné, la chaîne `null` est analysée en tant que valeur nulle.

### Exemple de notation de chemin {#path-notation-example-parse-xml}

{{% observability_pipelines/path_notation %}}

{{% observability_pipelines/path_notation_dots %}}

### Toujours utiliser l'exemple de clé de texte {#always-use-text-key-example}

Si {{< ui >}}Always use text key{{< /ui >}} est sélectionné, la clé de texte est la valeur par défaut (`value`), et vous avez le XML suivant :

```xml
<recipe>
    <recipe type="pasta">
    <name>Carbonara</name>
</recipe>
```

Le XML est converti en :

```json
{
    "recipe": {
        "type": "pasta",
        "value": "Carbonara"
        }
}
```

### Exemple de clé de texte {#text-key-example}

Si la clé est `text` et que vous avez le XML suivant :

```xml
<recipe>
    <recipe type="pasta">
    <name>Carbonara</name>
</recipe>
```

Le XML est converti en :

```json
{
    "recipe": {
        "type": "pasta",
        "text": "Carbonara"
        }
}
```

### Exemple de préfixe d'attribut {#attribute-prefix-example}

Si vous activez {{< ui >}}Include XML attributes{{< /ui >}}, l'attribut est ajouté en tant que préfixe à chaque attribut XML. Par exemple, si le préfixe d'attribut est `@` et que vous avez le XML suivant :

```xml
<recipe type="pasta">Carbonara</recipe>
```

Il est alors converti en JSON :

```json
{
    "recipe": {
        "@type": "pasta",
        "<text key>": "Carbonara"
        }
}
```

## Métriques de santé {#health-metrics}

Pour les [métriques de composants][2] et les [métriques de tampon de processeur][3] émises par tous les processeurs, consultez la documentation sur les [Métriques d'utilisation des pipelines][4]. Pour filtrer ou grouper par métriques de processeur d'analyse, utilisez le tag `component_type:parse`.

[1]: /fr/observability_pipelines/search_syntax/logs/
[2]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[4]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}