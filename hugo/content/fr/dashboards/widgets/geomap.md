---
aliases:
- /fr/graphing/widgets/geomap/
description: Visualisez des données géographiques avec des régions ombrées ou des
  points pour afficher des métriques et des tendances géographiques.
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
- Afficher les sessions utilisateur par pays.
- Filtrer pour voir une liste de toutes les sessions dans un nouvel onglet.
- Afficher les sessions utilisateur filtrées par employé.
- Surveiller les métriques de performance telles que le temps de chargement, les Core Web Vitals et le pourcentage de vues présentant des erreurs.
- Surveiller l'état des emplacements physiques, tels que des magasins ou des appareils, en traçant des métriques sur une carte.

{{< img src="/dashboards/widgets/geomap/geomap_zoom_region.mp4" alt="Zoom sur une région dans le widget Geomap" video=true >}}

## Configuration {#setup}

{{< img src="dashboards/widgets/geomap/geomap_setup3.png" alt="Section Graph your data de la configuration du widget Geomap">}}

### Configuration {#configuration}
1. Choisissez la couche de visualisation :
    * {{< ui >}}Regions{{< /ui >}} : Agrégez les métriques au niveau d'un pays ou de ses subdivisions.
    * {{< ui >}}Points{{< /ui >}} : Superposez des événements sous forme de points sur la carte pour afficher des données d'événements géographiques.

2. Choisissez les données à représenter graphiquement : <br>
  **Remarque** : La prise en charge des sources de données varie en fonction de la couche de visualisation que vous sélectionnez.
  {{< tabs >}}
  {{% tab "Régions" %}}
  |  Source de données    | Remarques    |
  | --------------  | -------- |
  |Log Events   | Le tag de regroupement doit inclure un code ISO de pays (format ISO alpha-2) ou un code ISO de subdivision de pays (format ISO-3166-2). Vous pouvez utiliser le [GeoIP Processor][1] pour ce faire, ou inclure manuellement les [tags lors de l'ingestion][2]. Consultez la [documentation sur la recherche de logs][3] pour configurer une requête d'événement de log.|
  |Metric   | Le tag de regroupement doit inclure un code ISO de pays (format ISO alpha-2) ou un code ISO de subdivision de pays (format ISO-3166-2). Vous pouvez [générer des métriques à partir des logs ingérés][4], ou inclure manuellement les [tags lors de l'ingestion][2]. Consultez la [documentation sur les requêtes][5] pour configurer une requête de métrique.|
  |RUM   | Consultez la [documentation RUM][6] pour configurer une requête RUM. |
  |SLO | Consultez la [documentation sur la recherche SLO][7] pour configurer une requête SLO. |
  |Security Signals <br> App and API Protection <br> Audit Trail | Consultez la [documentation sur la recherche de logs][3] pour configurer une requête. |

  [1]: /logs/log_configuration/processors/geoip_parser/
  [2]: /getting_started/tagging/#define-tags
  [3]: /logs/search_syntax/
  [4]: /logs/logs_to_metrics/
  [5]: /dashboards/querying/
  [6]: /real_user_monitoring/explorer/search_syntax/
  [7]: /service_level_objectives/#searching-slos
  {{% /tab %}}

  {{% tab "Points" %}}
  |  Source de données | Notes |
  | -----------  | ----- |
  |Log Events   | Le tag de regroupement doit inclure un code ISO de pays suivant le format ISO alpha-2. Vous pouvez utiliser le [GeoIP Processor][1] pour ce faire, ou inclure manuellement les [tags lors de l'ingestion][2]. Consultez la [documentation sur la recherche de logs][3] pour configurer une requête d'événement de log. |
  |RUM   | Consultez la [documentation RUM][4] pour configurer une requête RUM. |
  |Metric   | Les requêtes de métriques n'incluent pas de coordonnées géographiques. Pour tracer des métriques, joignez votre requête à une Reference Table qui fournit les coordonnées de latitude et de longitude. Consultez [Tracer des métriques avec une Reference Table](#plot-metrics-with-a-reference-table). |

  **Remarque** : La couche Points affiche un maximum de 100,000 événements à la fois.
  
  [1]: /logs/log_configuration/processors/geoip_parser/
  [2]: /getting_started/tagging/#define-tags
  [3]: /logs/search_syntax/
  [4]: /real_user_monitoring/explorer/search_syntax/
  {{% /tab %}}
  {{< /tabs >}}

3. (Facultatif) Sous {{< ui >}}Visual Options{{< /ui >}}, utilisez le menu déroulant {{< ui >}}Set widget default view{{< /ui >}} pour sélectionner la zone sur laquelle centrer la carte initialement. Sélectionnez {{< ui >}}Custom{{< /ui >}} pour définir une région personnalisée, ou recherchez le nom d'un pays, d'un État ou d'une province.

### Tracer des métriques avec une Reference Table {#plot-metrics-with-a-reference-table}

Les requêtes de métriques n'incluent pas de coordonnées géographiques. Pour tracer des métriques sur une couche {{< ui >}}Points{{< /ui >}}, joignez votre requête de métrique à une [Reference Table][10] qui fournit les coordonnées de latitude et de longitude. La Reference Table peut également fournir des métadonnées, telles que des noms de lieux, à afficher sur la carte.

Avant de commencer, configurez les éléments suivants :
- Une métrique taguée avec une valeur qui identifie chaque emplacement, telle que `store_id`.
- Une Reference Table avec une colonne dont les valeurs correspondent à ce tag, ainsi qu'une colonne de latitude et une colonne de longitude pour chaque emplacement. Les noms de colonne n'ont pas besoin de suivre un format spécifique car vous les mappez dans l'éditeur de widget.

Pour tracer des métriques avec une Reference Table :

1. Ajoutez un widget Geomap à un dashboard et sélectionnez la couche {{< ui >}}Points{{< /ui >}}.
1. Dans le sélecteur de source, choisissez {{< ui >}}Metrics{{< /ui >}} et écrivez votre requête de métrique.
1. Spécifiez le type de jointure et la Reference Table que vous souhaitez joindre à vos métriques. Le widget Geomap propose deux types de jointure : {{< ui >}}All locations{{< /ui >}} (jointure gauche) et {{< ui >}}Locations with data only{{< /ui >}} (jointure interne).
1. Définissez la condition de jointure avec le tag de la métrique, tel que `store_id`, et la colonne correspondante de la Reference Table. Pour plus d'informations sur les jointures, consultez [Jointures de Reference Table avec des métriques][11].
1. Pour {{< ui >}}latitude{{< /ui >}} et {{< ui >}}longitude{{< /ui >}}, sélectionnez les colonnes de la Reference Table qui contiennent les coordonnées de chaque emplacement.
1. (Facultatif) Ajoutez des règles de mise en forme conditionnelle pour colorer les points en fonction de leurs valeurs de métrique. Par exemple, définissez des seuils qui font passer les points au vert, au jaune ou au rouge pour mettre en évidence le statut.
1. (Facultatif) Sous {{< ui >}}Tooltip Fields{{< /ui >}}, sélectionnez des colonnes supplémentaires de la Reference Table, telles qu'un nom de magasin, à afficher dans l'info-bulle du point.

### Options {#options}

#### Liens contextuels {#context-links}

Les [liens contextuels][7] sont activés par défaut ; vous pouvez les activer ou les désactiver. Les liens contextuels connectent les widgets de dashboard à d'autres pages (dans Datadog ou des tiers).

#### Règles de mise en forme visuelle {#visual-formatting-rules}

Personnalisez la couleur des régions ou des points de votre widget Geomap avec des règles conditionnelles.

## API {#api}

Ce widget peut être utilisé avec la **[Dashboards API][8]**. Consultez le tableau suivant pour la [définition du schéma JSON du widget][9] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/processors/geoip_parser/
[2]: /fr/getting_started/tagging/#define-tags
[3]: /fr/logs/search_syntax/
[4]: /fr/logs/logs_to_metrics/
[5]: /fr/dashboards/querying/
[6]: /fr/real_user_monitoring/explorer/search_syntax/
[7]: /fr/dashboards/guide/context-links/
[8]: /fr/api/latest/dashboards/
[9]: /fr/dashboards/graphing_json/widget_json/
[10]: /fr/reference_tables/
[11]: /fr/metrics/reference_table_joins_with_metrics/