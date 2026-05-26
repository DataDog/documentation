---
description: Créez des visualisations personnalisées à l'aide de la grammaire Vega-Lite
  pour des graphiques avancés et une représentation des données allant au-delà des
  widgets standard.
further_reading:
- link: dashboards/guide/getting_started_with_wildcard_widget/
  tag: Guide
  text: Tutoriel de prise en main du widget Wildcard
- link: /dashboards/guide/using_vega_lite_in_wildcard_widgets/
  tag: Documentation
  text: En savoir plus sur l'utilisation de Vega-Lite avec les widgets Wildcard
- link: https://docs.datadoghq.com/dashboards/guide/wildcard_examples
  tag: Documentation
  text: Exemples de widget Wildcard
- link: https://vega.github.io/vega-lite/tutorials/getting_started.html
  tag: Tutoriel Vega
  text: Présentation de Vega-Lite
- link: https://www.datadoghq.com/blog/wildcard-widget/
  tag: Blog
  text: Créez des visualisations Vega-Lite nativement dans Datadog avec le widget
    Wildcard
title: Widget Wildcard
widget_type: wildcard
---

## Présentation

Le widget Wildcard de Datadog étend la flexibilité du langage "Grammar of Graphics" [open source Vega-Lite][1] et l'intègre à la plateforme Datadog. Le widget Wildcard vous permet de créer des graphiques qui ne sont pas disponibles dans les widgets et systèmes de requêtes natifs de Datadog.

Utilisez le widget Wildcard dans les [Dashboards][2] et les [Notebooks][3].

## Meilleures pratiques

Datadog recommande d'utiliser un [widget de dashboard][4] existant pour répondre à votre cas d'usage. Tous les widgets natifs bénéficient d'optimisations de conception et de performances qui ne sont pas disponibles dans le widget Wildcard. Pour les limitations connues, consultez la section [Informations complémentaires](#additional-information).

Cependant, si aucun des widgets Datadog ne répond à vos besoins de visualisation, le widget Wildcard est un moyen rapide d'ajouter une nouvelle fonctionnalité à vos dashboards sans attendre qu'un nouveau type de fonctionnalité ou de graphique soit ajouté.

1. **Ne partez pas de zéro**. Vega-Lite maintient une galerie publique avec plus de [150 exemples officiels][5]. Si vous ne savez pas quel type de graphique utiliser, forkez un exemple existant pour tester la visualisation. Utilisez Vega-Lite plutôt que Vega pour sa simplicité et sa facilité de débogage.
1. **Testez le widget Wildcard**. La flexibilité du widget Wildcard comporte le risque de créer des visualisations lentes, peu attrayantes ou incohérentes. Testez le widget Wildcard sur un brouillon ou un dashboard vide avant d'ajouter des widgets Wildcard en production.
1. **Validez votre requête**. Les widgets Datadog garantissent que les visualisations de données sont alignées sémantiquement avec la requête, ce qui assure que la configuration produit le graphique attendu. Avec le widget Wildcard, vous ajoutez une spécification Vega-Lite personnalisée qui définit la manière dont la requête est mappée aux éléments visuels. Cela crée le risque de récupérer un champ de données non utilisé dans votre visualisation. Utilisez l'[aperçu des données](#data-preview) pour aider à déboguer les incohérences.

## Configuration

Après avoir créé un widget Wildcard, vous pouvez le configurer soit en tant que [nouvelle configuration](#configure-a-new-wildcard-widget), soit en [important une configuration depuis un widget existant](#import-data-from-an-existing-widget).

### Configurer un nouveau widget Wildcard

1. [Vérifiez les widgets natifs][4]. Vérifiez si un widget Datadog peut répondre à vos exigences.
1. Si aucun widget Datadog ne répond à vos exigences, dans un dashboard nouveau ou existant, cliquez sur **Add Widgets**.
1. Cliquez sur l'icône du widget Wildcard dans le panneau de widgets et faites-la glisser.
1. Sélectionnez dans le menu déroulant **Request Type**. Pour plus d'informations sur les types Scalar et Timeseries, consultez la section [Formulas Scalar et Formulas Timeseries](#formulas-scalar-vs-formulas-timeseries) de cette page.
1. Copiez une définition Vega-Lite depuis la [galerie publique][5] pour trouver une spécification Vega-Lite de départ.
1. Ouvrez l'[éditeur plein écran][6] du widget Wildcard et cliquez sur **Define Visual**.
1. Collez la définition Vega-Lite copiée.
1. Cliquez sur **Run** pour appliquer vos modifications de configuration, visualiser un aperçu de la visualisation et affiner votre conception.
   **Remarque** : vous devez cliquer sur **Run** pour prendre en compte vos modifications, mais cela n'enregistre pas votre configuration.
1. (Facultatif) Déboguez les incohérences de la spécification Vega-Lite avec l'[aperçu des données](#data-preview). Vérifiez que la requête dans votre spécification Vega-Lite correspond à la requête Datadog.
1. Cliquez sur **Save**.

#### Formulas Scalar et Formulas Timeseries

Dans les dashboards Datadog, les visualisations sont alimentées par plusieurs _types de requêtes_, notamment scalar et timeseries. Chaque _type de requête_ modifie le nombre et le type de champs disponibles pour les données dans un widget Wildcard.

**Timeseries**
: Ce format de données est conçu pour afficher l'évolution de vos données dans le temps.
   - **Cas d'usage** : il est idéal pour surveiller des métriques fluctuantes, telles que l'utilisation du CPU, la consommation de mémoire ou les taux de requêtes. Il aide à identifier les tendances, les modèles et les anomalies sur un intervalle de temps défini.

**Scalar**
: Ce format de données agrège vos données en produisant 1 valeur par "groupe". Le format scalar est utilisé pour les widgets toplist, treemap, diagramme circulaire et tableau, où chaque groupe correspond à 1 forme (barre, rectangle, secteur ou ligne respectivement) dans votre graphique.
   - **Cas d'usage** : il est particulièrement adapté à l'affichage d'indicateurs clés de performance (KPI) ou de statistiques récapitulatives telles que les moyennes, les sommes ou les centiles. Il fournit une vue synthétique de l'état actuel ou d'une métrique spécifique. Si vous ne décrivez pas des changements dans le temps, utilisez Scalar.

Le format de données Timeseries met en évidence les tendances des données dans le temps, tandis que le format Scalar se concentre sur la présentation de valeurs uniques calculées pour des évaluations rapides. Choisissez le type Timeseries si vous avez besoin de visualiser le temps sur un axe ou si vous avez besoin de compartiments temporels individuels. Si vous ne visualisez pas par rapport au temps, sélectionnez le type Scalar pour de meilleures performances.

**Remarque** : le préfixe "Formulas" est utilisé spécifiquement pour les formats Scalar et Timeseries car ils sont compatibles avec l'[API Functions][18]. Les autres formats, tels que Histogram et List, ne prennent pas en charge cette API.

### Importer des données depuis un widget existant

1. Copiez depuis un widget Datadog existant avec `cmd+c`.
1. Ouvrez l'[éditeur plein écran][6] du widget Wildcard.
1. Collez avec `cmd+v`.
1. Cliquez sur Save.

## Palette de commandes

{{< img src="/dashboards/widgets/wildcard/command_palette.png" alt="Fenêtre de la palette de commandes affichant la possibilité de rechercher des commandes et de sélectionner automatiquement un graphique" style="width:100%;" >}}

La palette de commandes offre un accès rapide aux outils du widget Wildcard. Activez-la avec `cmd + shift + p` ou cliquez sur l'icône d'information en haut de la page.

## Aperçu des données

{{< img src="/dashboards/widgets/wildcard/data_preview_arrow_icon.png" alt="Mise en évidence de l'icône de flèche pour accéder au panneau Aperçu des données" style="width:100%;" >}}

Le tableau d'aperçu des données affiche la réponse, les champs et les valeurs de votre requête de données disponibles pour votre spécification Vega-Lite. Pour y accéder, cliquez sur la flèche en bas de l'éditeur du widget Wildcard pour *afficher l'aperçu des données*. Il existe trois types de tableaux dans l'aperçu :
- Lignes de requête : affiche vos données réelles.
- Colonnes de requête : affiche les statistiques récapitulatives des colonnes et les types de données.
- Tableaux internes : affiche les données transformées stockées par Vega-Lite.

## Mapper les données Datadog aux spécifications Vega-Lite

Les widgets natifs Datadog mappent automatiquement les résultats des requêtes aux éléments de visualisation, mais le widget Wildcard nécessite l'ajout d'une spécification Vega-Lite personnalisée qui définit comment la requête Datadog est mappée aux éléments visuels. Cela crée le risque d'une incohérence. Avec l'[aperçu des données](#data-preview), vous pouvez vérifier que la spécification Vega-Lite correspond à la bonne réponse de requête.

Pour voir comment les valeurs Datadog sont mappées à la spécification Vega-Lite, commencez par l'exemple de requête de métrique `system.cpu.user` moyennée par `env` :

{{< img src="/dashboards/widgets/wildcard/example_configuration_query.png" alt="Exemple de requête de métrique de configuration de widget pour system.cpu.user groupée par env" style="width:100%;" >}}

Cliquez sur l'onglet **Define Visual** pour voir comment cette requête est mappée à Vega-Lite. Ouvrez le panneau Aperçu des données et observez les champs **query1** et **env** correspondants répertoriés dans la spécification Vega-Lite et la colonne Aperçu des données.

{{< highlight json "hl_lines=8 12" >}}
  {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": {
      "name": "table1"
    },
    "encoding": {
      "x": {
        "field": "env",
        "type": "nominal"
      },
      "y": {
        "field": "query1",
        "type": "quantitative"
      }
    },
    "mark": {
      "type": "rect",
      "tooltip": {
        "content": "data"
      }
    }
  }
{{< /highlight >}}

| Sélectionner la configuration des données  | Définir la spécification visuelle |
| ---  | ----------- |
|{{< img src="/dashboards/widgets/wildcard/example_configuration_no_alias.png" alt="Exemple de configuration de widget avec le panneau d'aperçu des données ouvert" style="width:100%;" >}} | {{< img src="/dashboards/widgets/wildcard/define_visual_run_button.png" alt="Spécification Vega mappant le champ de configuration du widget query1 au champ Vega" style="width:100%;" >}}|

Pour illustrer une incohérence entre les données Datadog et la spécification Vega-Lite, ajoutez un alias à la requête. La visualisation ne fonctionne pas car la spécification Vega-Lite pointe toujours vers "query1", mais la colonne Aperçu des données indique que la nouvelle requête porte désormais le nouvel alias "example". Pour corriger cette visualisation, remplacez `field:"query1"` par `field:"example"`.

| Sélectionner la configuration des données  | Définir la spécification visuelle |
| ---  | ----------- |
|{{< img src="/dashboards/widgets/wildcard/example_config_with_alias.png" alt="Exemple de configuration de widget où la requête possède un alias" style="width:100%;" >}} | {{< img src="/dashboards/widgets/wildcard/define_visual_example_run_button.png" alt="Mappage incohérent entre la configuration du widget et la spécification Vega" style="width:100%;" >}}|

## Formats de données compatibles

Le widget Wildcard prend en charge les requêtes de données provenant de toutes les sources de données prises en charge dans les widgets natifs :
| Type de requête | Widgets utilisant ce type de requête |
|-----------------------|-------------------------------------------------------------------------------------------------------------|
| Requêtes Scalar | Change, Pie Chart, Query Value, Scatter Plot, Table, Treemap, Top List, Distribution (de groupes), Geomap |
| Requêtes Timeseries | Timeseries, Heatmap |
| Requêtes Distribution | Distribution (de points) |
| Requêtes List | Toutes les données "orientées événements" dans le widget List |

## Informations supplémentaires
### Choisir entre Vega et Vega-Lite
Pour plus de simplicité et de concision, optez pour Vega-Lite. Le système prend en charge Vega-Lite version 5.18.1. Réservez Vega aux besoins de visualisation plus complexes ou avancés.

### Intégration Terraform
Utilisez la ressource [`datadog_dashboard_json`][19] lorsque vous travaillez avec des widgets Wildcard dans les dashboards Terraform.

### Limites connues
Évitez d'utiliser des widgets Wildcard dans les scénarios suivants :
- Visualisations à forte cardinalité. Si vos visualisations comptent plus de 5 000 lignes par requête, envisagez de pré-agréger les données côté serveur avant de les représenter graphiquement.
- Visualisations réseau ou hiérarchiques.
- Visuels nécessitant des mises en page basées sur la physique.
- Cartographie géographique avancée.
- Représentations graphiques en 3D.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://vega.github.io/vega-lite/
[2]: /fr/dashboards/
[3]: /fr/notebooks/
[4]: /fr/dashboards/widgets/
[5]: https://vega.github.io/vega-lite/examples/
[6]: /fr/dashboards/widgets/#full-screen
[16]: /fr/api/latest/dashboards/
[17]: /fr/dashboards/graphing_json/widget_json/
[18]: /fr/dashboards/functions/
[19]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/dashboard_json