---
aliases:
- /fr/graphing/widgets/scatter_plot/
description: Représentez graphiquement une étendue choisie sur deux métriques différentes
  avec leurs agrégations respectives, ou tracez des événements bruts pour inspecter
  des points de données individuels.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
title: Widget Nuage de points
widget_type: scatterplot
---
Un nuage de points identifie une relation possible entre les changements observés dans deux ensembles de variables différents. Il fournit un moyen visuel et statistique de tester la force d'une relation entre deux variables. La visualisation en nuage de points vous permet de représenter graphiquement une étendue choisie sur deux métriques différentes avec leurs agrégations respectives. Vous pouvez également tracer des événements bruts pour inspecter des points de données individuels.

{{< img src="dashboards/widgets/scatterplot/scatterplot2.png" alt="Un widget de nuage de points. Le graphique montre les visites par résolution d'écran. L'axe X affiche la largeur de l'écran, l'axe Y affiche la hauteur de l'écran." >}}

## Configuration {#setup}

### Configuration {#configuration}

1. Sélectionnez une métrique ou un autre jeu de données, ainsi qu'une agrégation pour les axes X et Y.
1. Définissez l'étendue pour chaque point du nuage de points, telle que `host`, `service`, `app` ou `region`.
1. Facultatif : 
    1. Activez un tag color-by.
    1. Définissez les contrôles des axes X et Y.
    1. Ajoutez une légende pour afficher les points de données dans une liste.
    1. Configurez les unités telles qu'elles s'affichent sur le graphique.
    1. Ajoutez des [liens contextuels][1] supplémentaires, qui sont activés par défaut. Les liens contextuels relient les widgets de tableau de bord à d'autres pages dans Datadog ou à des applications tierces.
1. Choisissez si votre widget doit utiliser une période personnalisée ou la période globale du tableau de bord.
1. Donnez un titre à votre graphique ou laissez la case vide pour le titre suggéré.

## Données agrégées et non agrégées {#aggregated-and-unaggregated-data}

Le nuage de points prend en charge deux modes de données, entre lesquels vous pouvez basculer à l'aide du bouton **Mode** dans l'éditeur de graphique :

- **Agrégé** : regroupez les données par champ et appliquez une agrégation, telle que `avg` ou `sum`. Chaque point représente un groupe agrégé.
- **Non agrégé** : tracez des événements bruts, où chaque point représente un événement unique, tel qu'un log, un span ou un événement RUM. Utilisez ce mode pour repérer les valeurs aberrantes et les clusters rares que l'agrégation masquerait autrement, corréler deux champs d'un même événement (par exemple, si la taille de la charge utile prédit la latence), ou tracer des traces LLM individuelles.

### Sources de données prises en charge pour le mode non agrégé {#supported-data-sources-for-unaggregated-mode}

Vous pouvez tracer des données non agrégées à partir des sources suivantes :

- Logs
- RUM
- Agent Observability
- Product Analytics
- Spans
- Audit Trail
- Événements
- Security Signals
- CI Pipelines
- Network
- Network Device Flows
- Exécutions de tests Synthetic

### Tracer des données non agrégées {#plot-unaggregated-data}

{{< img src="dashboards/widgets/scatterplot/scatterplot-mode-configuration.png" alt="Écran de configuration d'un widget de nuage de points qui affiche la section Afficher vos données dans un graphique. Dans la sous-section Configurer les points, le Mode est défini sur Non agrégé." >}}

Dans [Tableaux de bord][4] :

1. Ouvrez ou créez un widget de nuage de points sur un tableau de bord.
1. Dans l'éditeur de graphique, sélectionnez une source de données qui prend en charge les événements bruts.
1. Définissez **Mode** sur **Non agrégé**.
1. Configurez les axes X et Y en cliquant sur **Add Measure**.

Les événements individuels apparaissent sous forme de points sur le graphique.

## Navigation {#navigation}

Survolez le nuage de points pour afficher ses commandes dans le coin supérieur droit :

- **Afficher la densité** : Superposez des contours de densité qui montrent où les points de données sont les plus concentrés, vous aidant à identifier les clusters et les modèles. Une fois activé, la commande devient **Masquer la densité**.
- **Zoom in** (**+**) et **Zoom out** (**-**) : Modifiez le niveau de zoom pour vous concentrer sur une région des données.
- **Réinitialiser l'affichage** : Rétablissez le zoom et la position par défaut du graphique.

Cliquez et faites glisser directement sur le nuage de points pour vous déplacer dans vos données.

Le nuage de points étiquette automatiquement les points notables, tels que les valeurs aberrantes et les valeurs maximales.

## API {#api}

Ce widget peut être utilisé avec le **[Dashboards API][2]**. Consultez le tableau suivant pour la [définition du schéma JSON du widget][3] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/guide/context-links/
[2]: /fr/api/latest/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/
[4]: https://app.datadoghq.com/dashboard/