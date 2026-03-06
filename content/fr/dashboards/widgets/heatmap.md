---
aliases:
- /fr/graphing/widgets/heat_map/
- /fr/dashboards/widgets/heat_map/
description: Générez une carte thermique temporelle pour une métrique donnée.
further_reading:
- link: /product_analytics/heatmaps/
  tag: Documentation
  text: En savoir plus sur les cartes thermiques
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
- link: https://www.datadoghq.com/blog/visualize-behavior-datadog-heatmaps/
  tag: Blog
  text: Visualisez le comportement des utilisateurs avec les cartes thermiques Datadog
title: Widget Heatmap
widget_type: heatmap
---

{{< callout url=https://www.datadoghq.com/product-preview/hostmap
 btn_hidden="false" header="Rejoignez la version Preview !">}}
Une nouvelle expérience Host Map est disponible en version Preview. Utilisez ce formulaire pour demander un accès anticipé aux nouvelles fonctionnalités.
{{< /callout >}}

{{< img src="dashboards/widgets/heatmap/heatmap.png" alt="Exemple de visualisation de graphique de carte thermique" style="width:100%;">}} 

Le widget de carte thermique) affiche des métriques agrégées selon plusieurs tags. Utilisez les widgets de carte thermique pour visualiser les histogrammes OpenTelemetry, les métriques de distribution, la haute résolution et l'affichage des données.

## Configuration

### Configuration

Configurez votre requête de métrique comme d'habitude. Représentez les histogrammes OpenTelemetry en utilisant le mode d'histogramme 'counters'.

Utilisez les réglages `avg`/`max`/`min`/`sum by`/etc. pour visualiser vos données en fonction des tags associés.

### Options

#### Commandes de l'axe des ordonnées

Les commandes de l'axe des ordonnées sont disponibles dans l'interface ainsi que dans l'éditeur JSON.

Elles vous permettent d'accomplir les actions suivantes :

* Régler l'axe des ordonnées sur un intervalle donné
* Modifiez automatiquement les limites de l'axe des abscisses en fonction d'un seuil basé sur une valeur absolue. Ce seuil peut être appliqué à une extrémité ou aux deux extrémités du graphique (inférieure et supérieure) pour supprimer les séries « aberrantes ».@
* Changer l'échelle de l'axe des ordonnées afin de passer d'une échelle linéaire à une échelle logarithmique, racine carrée ou puissance

Changer l'échelle de l'axe des ordonnées en développant le bouton *Y-Axis Controls*.

Les options de configuration suivantes sont disponibles :

| Option                | Obligatoire | Description                                                                                                                                                                                                       |
|-----------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Min`/`Max`           | Non       | Spécifie la valeur minimale (et/ou maximale) à afficher sur l'axe des ordonnées. Indiquez un nombre ou `Auto` (la valeur par défaut).                                                                                                   |
| `Scale`               | Non       | Spécifie le type d'échelle. Valeurs autorisées :<br>- *linear* : une échelle linéaire (échelle par défaut).<br>- *log* : une échelle logarithmique<br>- *pow* : une échelle basée sur une puissance de 2. La valeur par défaut est 2, mais celle-ci peut être modifiée dans l'éditeur JSON.<br>- *sqrt* : une échelle basée sur la racine carrée. |
| `Always include zero` | Non       | Indique s'il faut toujours inclure le zéro ou ajuster l'axe à la plage de données. Par défaut, le zéro est toujours inclus.                                                                                                                     |

**Remarque** : comme la fonction log mathématique n'accepte pas les valeurs négatives, notre échelle log ne fonctionne que si les valeurs ont le même signe (tout > 0 ou tout < 0). Si ce n'est pas le cas, un graphique vide s'affiche.

## API

Ce widget peut être utilisé avec l'**[API Dashboards][2]**. Le tableau ci-dessous définit le [schéma JSON du widget][3] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/events/explorer/#search-syntax
[2]: /fr/api/latest/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/