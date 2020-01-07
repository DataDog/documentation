---
title: Générer des métriques à partir de logs ingérés
kind: documentation
beta: true
aliases:
  - /fr/logs/processing/logs_to_metrics/
description: Générez des métriques à partir de logs ingérés.
further_reading:
  - link: logs/processing/processors
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: logs/logging_without_limits
    tag: Documentation
    text: Contrôler le volume de logs indexés par Datadog
---
<div class="alert alert-warning">
Cette fonctionnalité est en version bêta.
</div>

## Présentation

La fonctionnalité [Logging without Limits][1]* de Datadog vous permet de choisir de façon dynamique les éléments à inclure ou à exclure de vos index. Les métriques basées sur des logs constituent une solution rentable vous permettant d'obtenir une synthèse des données de log à partir de l'ensemble du flux d'ingestion. Ainsi, même si vous utilisez des [filtres d'exclusion][2] pour limiter les index aux logs essentiels sur le plan opérationnel, vous pouvez toujours visualiser les tendances et les anomalies sur toutes vos données de log, avec une granularité complète pendant 15 mois.

Avec des métriques basées sur des logs, vous pouvez enregistrer le nombre de logs qui correspondent à une requête ou résumer une valeur numérique contenue dans un log, comme la durée des requêtes.

## Générer une métrique basée sur des logs

{{< img src="logs/processing/logs_to_metrics/generate_logs_to_metric.png" alt="Générer une métrique basée sur des logs"  style="width:80%;">}}

Pour générer une nouvelle métrique basée sur des logs, accédez à la [page Configuration][3] de votre compte Datadog et sélectionnez l'onglet *[Generate Metrics][4]*, puis le bouton **New Metric+**.

### Ajouter une nouvelle métrique basée sur des logs

{{< img src="logs/processing/logs_to_metrics/create_custom_metrics.png" alt="Créer une métrique basée sur des logs"  style="width:80%;">}}

1. **Saisissez une requête pour filtrer le flux de logs** : la syntaxe de la requête est la même que pour la [recherche du Log Explorer][5]. Seuls les logs ingérés avec un timestamp ne dépassant pas les 20 dernières minutes sont pris en compte lors de l'agrégation.
2. **Sélectionnez le champ que vous souhaitez surveiller** : sélectionnez `*` pour obtenir le nombre total de logs qui correspondent à votre requête, ou saisissez un attribut de log (p. ex., `@network.bytes_written`) pour agréger une valeur numérique et créer sa métrique agrégée correspondante (`count`, `min`, `max`, `sum` et `avg`).
3. **Ajoutez des dimensions en fonction desquelles effectuer le regroupement avec `group by`** : sélectionnez des attributs ou des clés de tag à appliquer à la métrique basée sur des logs pour les transformer en [tags][6], avec le format `<KEY>:<VALUE>`. Les métriques basées sur des logs sont considérées comme des [métriques custom][7]. Évitez d'effectuer un regroupement d'attributs non liés ou présentant une cardinalité extrêmement élevée, tels que des timestamps, des ID utilisateur, des ID de requête ou des ID de session, pour empêcher une hausse conséquente de vos coûts.
4. **Donnez un nom à votre métrique** : les noms de métriques basées sur des logs doivent suivre la [convention de nommage des métriques][8].

**Remarque** : les points de données pour les métriques basées sur des logs sont générés à des intervalles d'une minute.

### Mettre à jour une métrique basée sur des logs

Lorsqu'une métrique est créée, seuls les champs suivants peuvent être mis à jour :

* Stream filter query
* Aggregation groups

Pour modifier le type ou le nom d'une métrique, une nouvelle métrique doit être créée.

## Commentaires

Nous serions ravis de lire vos commentaires sur cette fonctionnalité. Vous pouvez envoyer vos commentaires directement [depuis ce formulaire][9].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: /fr/logs
[2]: /fr/logs/indexes/#exclusion-filters
[3]: https://app.datadoghq.com/logs/pipelines
[4]: https://app.datadoghq.com/logs/pipelines/generate-metrics
[5]: /fr/logs/explorer/search/#search-syntax
[6]: /fr/tagging
[7]: /fr/developers/metrics/custom_metrics
[8]: /fr/developers/metrics/#naming-metrics
[9]: https://docs.google.com/forms/d/e/1FAIpQLSepcuHsNfJN7mpQp-8iBf9l6AslubKVSUHW21kmGg7VOJlxoA/viewform