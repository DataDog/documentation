---
aliases:
- /fr/graphing/widgets/geomap/
description: Visualisez des données géographiques avec des régions ombrées ou des
  points pour afficher des métriques et des tendances basées sur la localisation.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
- link: /notebooks/
  tag: Documentation
  text: Notebooks
title: Widget Geomap
widget_type: geomap
---

Le widget Geomap visualise des données géographiques avec des régions ombrées ou des points. Il peut être utilisé pour :
- Afficher les sessions utilisateurs par pays.
- Filtrer pour voir la liste de toutes les sessions dans un nouvel onglet.
- Afficher les sessions utilisateurs filtrées par employé.
- Surveiller des métriques de performance telles que le temps de chargement, les Core Web Vitals et le pourcentage de vues avec des erreurs.

{{< img src="/dashboards/widgets/geomap/geomap_zoom_region.mp4" alt="Zoom sur une région dans le widget Geomap" video=true >}}

## Configuration

{{< img src="dashboards/widgets/geomap/geomap_setup3.png" alt="Section Geomap Graph your data de la configuration du widget Geomap">}} 

### Configuration
1. Choisissez la couche de visualisation :
    * **Regions** : agrégez des mesures au niveau des pays ou des subdivisions de pays.
    * **Points** : superposez des événements sous forme de points sur la carte pour afficher des données d'événements géographiques.

2. Choisissez les données à représenter : <br>
  **Remarque** : la prise en charge des sources de données varie selon la couche de visualisation sélectionnée.
  {{< tabs >}}
  {{% tab "Regions" %}}
  | Source de données | Remarques |
  | --------------  | -------- |
  |Log Events   | Le tag de regroupement doit inclure un code ISO de pays (format ISO alpha-2) ou un code ISO de subdivision de pays (format ISO-3166-2). Vous pouvez utiliser le [processeur GeoIP][1] à cet effet, ou inclure manuellement les [tags à l'ingestion][2]. Consultez la [documentation sur la recherche de logs][3] pour configurer une requête d'événements de log.| 
  |Metric | Le tag de regroupement doit inclure un code ISO de pays (format ISO alpha-2) ou un code ISO de subdivision de pays (format ISO-3166-2). Vous pouvez [générer des métriques à partir de logs ingérés][4], ou inclure manuellement les [tags à l'ingestion][2]. Consultez la [documentation sur les requêtes][5] pour configurer une requête de métrique.|
  |RUM   | Consultez la [documentation dédiée][6] pour configurer une requête RUM. | 
  |SLO | Voir la [documentation de recherche SLO][7] pour configurer une requête SLO. |
  |Security Signals <br> Protection des applications et des API <br> Audit Trail | Consultez la [documentation sur la recherche de logs][3] pour configurer une requête. |

  [1] : /logs/log_configuration/processors/#geoip-parser
  [2] : /getting_started/tagging/#define-tags
  [3] : /logs/search_syntax/
  [4] : /logs/logs_to_metrics/
  [5] : /dashboards/querying/
  [6] : /real_user_monitoring/explorer/search_syntax/
  [7] : /service_level_objectives/#searching-slos
  {{% /tab %}}

  {{% tab "Points" %}}
  |  Source de données | Remarques |
  | -----------  | ----- |
  |Log Events   | Le tag de regroupement doit inclure un code ISO de pays au format ISO alpha-2. Vous pouvez utiliser le [processeur GeoIP][1] à cet effet, ou inclure manuellement les [tags à l'ingestion][2]. Consultez la [documentation sur la recherche de logs][3] pour configurer une requête d'événements de log. |
  |RUM   | Consultez la [documentation RUM][4] pour configurer une requête RUM. |

  **Remarque** : la couche Points affiche au maximum 100 000 événements à la fois. 

  [1] : /logs/log_configuration/processors/#geoip-parser
  [2] : /getting_started/tagging/#define-tags
  [3] : /logs/search_syntax/
  [4] : /real_user_monitoring/explorer/search_syntax/
  {{% /tab %}}
  {{< /tabs >}}

3. (Facultatif) Sous **Visual Options**, utilisez le menu déroulant **Set widget default view** pour sélectionner l'endroit où centrer initialement la carte. Sélectionnez **Custom** pour définir une région personnalisée, ou recherchez le nom d'un pays, d'un État ou d'une province.

### Options

#### Liens de contexte

Les [liens de contexte][7] sont activés par défaut, mais vous pouvez les désactiver si vous le souhaitez. Ils relient les widgets du dashboard à d'autres pages (dans Datadog ou sur des sites externes).

#### Règles de mise en forme visuelle

Personnalisez la couleur de la couche de régions de votre widget Geomap avec des règles conditionnelles.

## API

Ce widget peut être utilisé avec l'**[API Dashboards][8]**. Le tableau ci-dessous définit le [schéma JSON du widget][9] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/processors/#geoip-parser
[2]: /fr/getting_started/tagging/#define-tags
[3]: /fr/logs/search_syntax/
[4]: /fr/logs/logs_to_metrics/
[5]: /fr/dashboards/querying/
[6]: /fr/real_user_monitoring/explorer/search_syntax/
[7]: /fr/dashboards/guide/context-links/
[8]: /fr/api/latest/dashboards/
[9]: /fr/dashboards/graphing_json/widget_json/