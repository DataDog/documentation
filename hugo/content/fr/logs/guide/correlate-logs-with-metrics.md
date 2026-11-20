---
further_reading:
- link: /logs/explorer/
  tag: Documentation
  text: Découvrir comment explorer vos logs
- link: /logs/logging_without_limits/
  tag: Documentation
  text: Logging without Limits*
- link: /logs/live_tail/
  tag: Documentation
  text: Fonctionnalité Live Tail de Datadog

title: Mettre en corrélation vos logs et vos métriques
---

## Présentation

Il existe plusieurs façons de mettre en corrélation des logs avec des métriques dans l'app Datadog. Les vues, comme le [Log Explorer][1], les [dashboards][2] et le [Metrics Explorer][3], proposent des volets détaillés. Il est également possible de passer instantanément d'une vue à une autre. Vous pouvez ainsi cerner plus facilement le contexte d'un problème et le mapper dans l'ensemble de votre service.

Ce guide vous explique comment mettre en corrélation des logs et des métriques dans ces vues.

## Log Explorer

Pour mettre en corrélation des logs et des métriques dans le [Log Explorer][4] :

1. Cliquez sur un log dans la colonne **Content**. Un volet s'affiche alors, avec des informations détaillées sur le log.
2. Cliquez sur l'onglet **Metrics** dans le volet.

{{< img src="logs/guide/correlate-logs-with-metrics/log-explorer-metrics-tab.jpg" alt="Métriques du Log Explorer" >}}

## Dashboards

Pour mettre en corrélation des logs et des métriques dans un [dashboard][5] :

1. Accédez à votre dashboard.
2. Cliquez sur un point de donnée dans n'importe quel widget pour remplir le [menu de graphique][6].
3. Si votre widget contient des **événements de log que vous souhaitez mettre en corrélation avec des métriques** :
    1. Sélectionnez **View related logs** pour remplir un volet avec des détails sur les logs associés.
    2. Sélectionnez un événement de log précis.
    3. Cliquez sur l'onglet **Metrics**.
4. Si votre widget contient des **métriques que vous souhaitez mettre en corrélation avec des logs** :
    1. Sélectionnez **View related logs**.

## Metrics Explorer

Pour mettre en corrélation des logs et des métriques sur la page [Metrics Explorer][7] :

1. Sélectionnez une métrique à représenter.
2. Cliquez sur un point du graphique pour remplir le menu de graphique.
3. Sélectionnez **View related logs**.

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}


\*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: /fr/logs/explorer/
[2]: /fr/dashboards/
[3]: /fr/metrics/explorer/
[4]: https://app.datadoghq.com/logs
[5]: https://app.datadoghq.com/dashboard/lists
[6]: /fr/dashboards/#graph-menu
[7]: https://app.datadoghq.com/metric/explorer