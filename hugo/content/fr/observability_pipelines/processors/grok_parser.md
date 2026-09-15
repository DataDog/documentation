---
description: Apprenez à utiliser le processeur Grok Parser pour générer des règles
  de parsing qui structurent les logs personnalisés ou non standard.
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
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Processeur Grok Parser
---
{{< product-availability >}}

{{< callout url="#" btn_hidden="true" header="Rejoignez la Preview !" >}}
Les filtres par règle et les règles de parsing générées par IA sont en prévisualisation. Contactez votre responsable de compte pour demander l'accès.
{{< /callout >}}

## Vue d'ensemble
 {#overview}

Les logs d'application personnalisés ou non standard sont souvent difficiles à analyser dans des formats structurés. Pour résoudre ce problème, utilisez le processeur Grok Parser pour générer des règles de parsing à l'aide de l'IA, appliquez des règles de bibliothèque pour les formats spécifiques aux fournisseurs (tels qu'Apache, Airflow et MySQL), ou créez vos propres règles de parsing. Ensuite, testez les règles sur des exemples de données pour valider la syntaxe et prévisualiser la sortie du log analysé.

**Remarques** :
- Vous devez créer un Grok Parser distinct pour chaque champ que vous souhaitez analyser.
- Un log n'est analysé que par la première règle à laquelle il correspond, donc [l'ordre de vos règles est important](#order-of-custom-rules).
- Si vous utilisez des versions de Worker antérieures à 2.17, vos logs doivent comporter le champ `source` ou `ddsource` et le champ `message` pour que le processeur puisse les analyser.

## Configuration
 {#setup}

Le processeur Grok Parser effectue les opérations suivantes :

1. Utilise la requête de filtre au niveau du processeur pour déterminer quels logs sont envoyés au parser.
1. Identifie le champ spécifié à analyser dans le log.
1. (Aperçu) Utilise la requête de filtre au niveau de la règle pour appliquer la première règle de parsing qui correspond au log.
1. Écrase le champ de log spécifié avec la sortie de la règle, puis envoie le log à l'étape suivante du pipeline.

{{< img src="observability_pipelines/processors/grok_parser_setup.png" alt="Le panneau du processeur Grok Parser affichant la requête de filtre et les paramètres du champ à analyser." style="width:50%;" >}}

Pour configurer le processeur Grok Parser :

1. Définissez une requête de filtre au niveau du processeur. Seuls les logs qui correspondent à cette requête de filtre sont envoyés au parser. Tous les logs, qu'ils soient analysés par le processeur ou non, sont envoyés à l'étape suivante du pipeline. Consultez la [Syntaxe de recherche des logs][3] pour plus d'informations sur la création de requêtes.
1. Saisissez le champ du log sur lequel effectuer le parsing. Par exemple, si vous saisissez `logmessage`, le contenu de l'attribut `logmessage` est analysé. Si aucun champ n'est spécifié, `message` est le champ par défaut utilisé.
1. Désactivez {{< ui >}}Enable Library Rules{{< /ui >}} pour désactiver toutes les règles de parsing de bibliothèque.
   <br>**Remarques** :
   - Vous devez créer une règle de parsing personnalisée avant de pouvoir désactiver les règles de bibliothèque.
   - Les règles de bibliothèque sont appliquées par défaut. Désactivez les règles de bibliothèque uniquement si vous vous appuyez sur des règles de parsing personnalisées.
1. Cliquez sur {{< ui >}}View Library Rules{{< /ui >}} pour prévisualiser les règles prédéfinies pour les intégrations. Vous pouvez tester les règles de parsing prêtes à l'emploi avec vos exemples de logs. Consultez [Règles de bibliothèque](#library-rules) pour plus d'informations.

### Créer une règle de parsing personnalisée ou générée par IA 
 {#create-an-ai-generated-or-custom-parsing-rule}

Pour configurer une règle de parsing personnalisée ou assistée par IA, cliquez sur {{< ui >}}Create Parsing Rules{{< /ui >}} dans le processeur Grok Parser :

1. Saisissez un nom pour la règle de parsing.
1. (Aperçu) Saisissez une requête de filtre pour définir les logs auxquels cette règle s'applique. Le Grok Parser exécute une règle uniquement si un log correspond à la requête de filtre par règle, ce qui vous permet d'appliquer différentes règles de parsing à différents formats de logs. Consultez la [Syntaxe de recherche des logs][3] pour plus d'informations sur la création de requêtes.
1. Saisissez un exemple de log que vous souhaitez analyser. Les exemples de journaux peuvent être copiés depuis Live Capture ou collés depuis une autre source.
1. (Aperçu) Cliquez sur {{< ui >}}Generate New Rule{{< /ui >}} pour que l'IA génère une nouvelle règle de parsing basée sur l'exemple de log. Sinon, consultez [Écrire manuellement des règles](#manually-write-rules) pour rédiger vos propres règles.
    1. Examinez le log analysé dans le panneau {{< ui >}}Preview Changes{{< /ui >}}.
    1. Cliquez sur {{< ui >}}Generate New Rule{{< /ui >}} pour relancer le générateur de règles IA ou mettez à jour manuellement la règle afin que le log soit analysé correctement. Consultez [Parsing][1] pour plus d'informations sur la rédaction de règles de parsing.
    <br>**Remarques** :
        - Si vous relancez le générateur de règles IA, une nouvelle règle est créée. Vous devez supprimer manuellement les règles précédemment créées par l'IA si vous n'en voulez pas.
        - Vous pouvez exécuter le générateur de règles IA au maximum trois fois par échantillon.
    1. Répétez l'étape 4 pour créer des règles basées sur des exemples de logs supplémentaires. Consultez [Ordre des règles personnalisées](#order-of-custom-rules) pour savoir comment l'ordre des règles détermine celle qui analyse un log.
1. Après avoir ajouté une règle, vous pouvez ajouter des règles de bibliothèque en sélectionnant une règle de bibliothèque dans le menu déroulant {{< ui >}}reference a library rule{{< /ui >}}. Vous pouvez ajouter plusieurs règles de bibliothèque. Consultez [Règles de bibliothèque](#library-rules) pour plus d'informations.
1. Cliquez sur {{< ui >}}Advanced Settings{{< /ui >}} si vous souhaitez ajouter des règles d'assistance. Consultez [Utilisation de règles d'assistance pour réutiliser des modèles courants][2] pour plus d'informations.
1. Cliquez sur {{< ui >}}Create Rule{{< /ui >}}.

{{< img src="observability_pipelines/processors/grok_parser_create_rule.png" alt="La fenêtre modale Create Parsing Rule dans le processeur Grok Parser." style="width:50%;" >}}

Si un log est envoyé au processeur mais n'est analysé par aucune règle, le Worker génère un log avec l'erreur : `The parser failed to apply rule`.

#### Ordre des règles personnalisées
 {#order-of-custom-rules}

Lorsque vous avez plusieurs règles personnalisées pour un processeur Grok Parser, un log est analysé par la première règle dont la requête correspond, puis envoyé à l'étape suivante du pipeline. Le processeur n'essaie pas de faire correspondre le log aux règles suivantes. Par conséquent, l'ordre des règles importe si un log peut correspondre à plusieurs règles. Pour réorganiser les règles, faites-les glisser et déposez-les dans l'ordre souhaité.

##### Exemple
 {#example}

Considérez un parser avec ces règles de parsing :

1. Exemple de règle 1
1. Exemple de règle 2
1. Exemple de règle 3

Si un log envoyé au parser correspond aux trois requêtes de règle, le log est _uniquement_ analysé par l'Exemple de règle 1, car il est listé avant les règles 2 et 3.

{{< img src="observability_pipelines/processors/grok_parser_rule_order.png" alt="Trois règles de parsing listées dans l'ordre dans le processeur Grok Parser." style="width:50%;" >}}

#### Écrire manuellement des règles
 {#manually-write-rules}

Pour écrire manuellement des règles de parsing, dans la fenêtre modale {{< ui >}}Create Parsing Rule{{< /ui >}} :

1. Cliquez sur {{< ui >}}write rules manually{{< /ui >}}.
1. Saisissez les règles pour analyser les logs. Consultez [Parsing][1] pour plus d'informations sur la rédaction de règles de parsing avec les modèles Grok de Datadog. **Remarque** : Les filtres `url`, `useragent` et `csv` ne sont pas disponibles.
1. Examinez le log analysé dans le panneau {{< ui >}}Preview Changes{{< /ui >}} et mettez à jour la règle jusqu'à ce que le log soit analysé comme prévu.
1. Cliquez sur {{< ui >}}Add rule{{< /ui >}} pour écrire manuellement une autre règle.

### Règles de bibliothèque
 {#library-rules}

Lorsqu'un log est envoyé au parser, les règles de bibliothèque sont automatiquement appliquées au log s'il contient un champ `source` ou `ddsource`. Par exemple, si un log contient `source:mysql`, le parser applique les règles de la bibliothèque MySQL à ce log. Pour parcourir toutes les règles de bibliothèque disponibles, cliquez sur {{< ui >}}View Library Rules{{< /ui >}} dans le processeur Grok Parser. Vous pouvez effectuer une recherche dans le tableau des règles de bibliothèque et cliquer sur n'importe quelle règle pour prévisualiser la façon dont elle est appliquée à vos logs.

Vous pouvez également ajouter des règles de bibliothèque lorsque vous créez une règle personnalisée. Consultez [Créer une règle de parsing personnalisée ou assistée par IA](#create-an-ai-assisted-or-custom-parsing-rule) pour plus d'informations.

## Métriques de santé
 {#health-metrics}

Pour les [métriques de composant][4] et les [métriques de tampon de processeur][5] émises par tous les processeurs, consultez la documentation sur les [Métriques d'utilisation des pipelines][6]. Pour filtrer ou grouper par métriques de processeur d'analyse, utilisez le tag `component_type:parse`.

[1]: /fr/logs/log_configuration/parsing/

[2]: /fr/logs/log_configuration/parsing/?tab=matchers#using-helper-rules-to-reuse-common-patterns

[3]: /fr/observability_pipelines/search_syntax/logs/

[4]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics

[5]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics

[6]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/


## Pour aller plus loin
 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}