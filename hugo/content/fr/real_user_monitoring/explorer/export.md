---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentation
  text: Rechercher des événements
- link: /dashboards
  tag: Documentation
  text: En savoir plus sur les dashboards
- link: /notebooks
  tag: Documentation
  text: En savoir plus sur les notebooks
- link: /monitors
  tag: Documentation
  text: En savoir plus sur les monitors
title: Exporter des événements et des graphiques RUM
---

## Présentation

Vous pouvez utiliser votre requête et vos graphiques RUM dans des dashboards, monitors et notebooks, ou encore automatiser la recherche d'événements à l'aide de l'[endpoint de recherche d'événements RUM][1].

## Exporter une visualisation ou une requête de recherche

Vous pouvez copier, exporter ou télécharger votre requête de recherche agrégée et vos graphiques dans le [RUM Explorer][2].

{{< img src="real_user_monitoring/explorer/export/rum-explorer-export-5.png" alt="Bouton Export en haut à droite du RUM Explorer" width="100%" >}}

Cliquez sur le bouton **More** en haut à droite et sélectionnez une option dans le menu déroulant :

- Copiez votre requête en tant que commande cURL pour la tester dans le [RUM Explorer][3] et créer des rapports personnalisés à l'aide des [API Datadog][4].
- Exportez vos résultats de recherche au sein d'un [monitor][6] qui déclenchent des alertes basées sur des seuils prédéfinis.
- Exportez vos résultats de recherche au sein d'un [notebook existant][7] pour partager ou rassembler vos données.
- Téléchargez vos résultats de recherche au sein d'un fichier CSV pour obtenir des événements RUM individuels et des agrégations spécifiques. Vous pouvez exporter jusqu'à 5 000 événements RUM sous forme de listes et jusqu'à 500 agrégations pour des séries temporelles, des top lists et des graphiques de tableau.
- Générez une [nouvelle métrique][5] à l'aide de vos résultats de recherche, afin de pouvoir la visualiser dans le Metrics Explorer.

Certains types de visualisation proposent des options qui ne sont pas disponibles avec d'autres types. Par exemple, il n'est pas possible de télécharger un graphique de distribution au format CSV.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/api/latest/rum/#search-rum-events
[2]: https://app.datadoghq.com/rum/explorer
[3]: /fr/real_user_monitoring/explorer/
[4]: https://docs.datadoghq.com/fr/api/latest/rum/
[5]: /fr/metrics/explorer/
[6]: /fr/monitors/types/real_user_monitoring/
[7]: /fr/notebooks/