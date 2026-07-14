---
further_reading:
- link: /continuous_integration/search/
  tag: Documentation
  text: Rechercher vos pipelines
- link: /continuous_integration/explorer/saved_views
  tag: Documentation
  text: En savoir plus sur les vues enregistrées
- link: /monitors/types/ci
  tag: Documentation
  text: En savoir plus sur les moniteurs de pipeline de CI
title: Exporter des exécutions de pipeline
---

## Présentation

Vous pouvez utiliser votre requête de recherche et vos graphiques CI Visibility dans des dashboards, monitors et notebooks, ou encore automatiser la recherche d'événements à l'aide de l'[endpoint de recherche d'événements de pipeline][1].

## Exporter une visualisation ou une requête de recherche

Vous pouvez copier, exporter ou télécharger votre requête de recherche ainsi que vos graphiques dans le [CI Visibility Explorer][2].

{{< img src="continuous_integration/explorer/pipeline_export.png" alt="Exporter votre vue de pipelines dans le CI Visibility Explorer" style="width:100%;">}}

Cliquez sur le bouton **Export** en haut à droite et sélectionnez une option dans le menu déroulant :

- Partagez votre [vue enregistrée][7] du [CI Visibility Explorer][3].
- Exportez vos résultats de recherche au sein d'un [monitor de pipeline de CI][5] qui déclenche des alertes basées sur des seuils prédéfinis.
- Exportez vos résultats de recherche au sein d'un [notebook existant][6] pour partager ou rassembler vos données.
- Téléchargez vos résultats de recherche sous forme de fichier CSV pour des événements de test ou de pipeline CI Visibility et des agrégations spécifiques.

Certains types de visualisation proposent des options qui ne sont pas disponibles dans d'autres types. Par exemple, il n'est pas possible de télécharger un graphique de distribution au format CSV.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/latest/ci-visibility-pipelines/#search-pipelines-events
[2]: https://app.datadoghq.com/ci/pipeline-executions
[3]: /fr/continuous_integration/explorer/
[4]: /fr/api/latest/
[5]: /fr/monitors/types/ci/
[6]: /fr/notebooks/
[7]: /fr/continuous_integration/explorer/saved_views/