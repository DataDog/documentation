---
aliases:
- /fr/graphing/widgets/timeseries/
- /fr/dashboards/widgets/network/
- /fr/graphing/widgets/network/
description: Affichez l'évolution des valeurs de plusieurs métriques, événements de
  log, spans indexées ou métriques de processus.
further_reading:
- link: https://www.datadoghq.com/blog/full-screen-graphs
  tag: GitHub
  text: Explorer les données sous la forme d'un graphique en plein écran
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
title: Widget Série temporelle
---

La visualisation de séries temporelles vous permet de consulter l'évolution de plusieurs métriques, événements de log ou spans indexées. La période affichée dépend des éléments sélectionnés sur le [timeboard][1] ou le [screenboard][2] :

{{< img src="dashboards/widgets/timeseries/timeseries.png" alt="Un widget Série temporelle affichant la métrique moyenne system.cpu.user pour un host" style="width:90%;" >}}

## Configuration

### Configuration

{{< img src="dashboards/widgets/timeseries/timeseries_setup.png" alt="Configuration d'une série temporelle" style="width:90%;" >}}

1. Choisissez les données à représenter :
   * Métrique : consultez la [section Requêtes][3] pour configurer une requête de métrique.
   * Spans indexées : consultez la [documentation sur la recherche de traces][4] pour configurer une requête de span indexée.
   * Événements de log : consultez la [documentation sur la recherche de logs][5] pour configurer une requête d'événement de log.

2. Personnalisez votre graphique avec les [options](#options-d-affichage) disponibles.

## Options d'affichage

Vous pouvez créer des graphiques en aires, à barres ou linéaires. Les graphiques linéaires contiennent des paramètres supplémentaires :

| Paramètre | Options               |
|-----------|-----------------------|
| Style     | Solid, Dashed ou Dotted |
| Stroke    | Normal, Thin ou Thick   |

### Couleur

Pour tous les types de graphiques, Datadog propose de nombreuses options en matière de couleurs pour différencier les diverses métriques affichées sur un même graphique :

| Palette     | Description                                                                                                 |
|-------------|-------------------------------------------------------------------------------------------------------------|
| Classic     | Des couleurs simples : bleu clair, bleu foncé, violet clair, violet, jaune clair et jaune (les couleurs se répètent).    |
| Categorical | Avec ce jeu de 16 couleurs, une palette cohérente est appliquée à chaque série de données sur l'ensemble des widgets Série temporelle. |
| Purple      | Un dégradé de couleurs composé de tons violets.                                                                   |
| Cool        | Un dégradé de couleurs composé de tons bleus et verts.                                                           |
| Warm        | Un dégradé de couleurs composé de tons jaunes et orange.                                                        |
| Orange      | Un dégradé de couleurs composé de tons orange.                                                                   |
| Gray        | Un dégradé de couleurs composé de tons gris.                                                                     |
| Red         | Un dégradé de couleurs composé de tons rouges.                                                                      |
| Green       | Un dégradé de couleurs composé de tons verts.                                                                    |
| Blue        | Un dégradé de couleurs composé de tons bleus.                                                                     |

Pour les graphiques linéaires, vous pouvez attribuer des palettes à différentes métriques en séparant les requêtes avec le format JSON.

### Alias de métrique

Chaque requête, formule ou [tag de filtrage][6] peut avoir un alias. L'alias remplace le nom sur le graphique et la légende, ce qui est utile pour les longs noms de métrique ou les longues listes de filtres. À la fin de votre requête ou formule, cliquez sur **as...**, puis saisissez votre alias de métrique :

{{< img src="dashboards/widgets/timeseries/metric_alias.png" alt="Ajout d'un alias à une requête de recherche dans l'éditeur du widget Série temporelle" style="width:100%;" >}}

### Superposition d'événements

Vous pouvez ajouter des événements provenant de systèmes associés afin d'enrichir le contexte de votre graphique, par exemple des commits GitHub, des déploiements Jenkins et des événements de création Docker. Cliquez sur **Add Event Overlay** dans la section **Event Overlays** et saisissez une requête pour afficher ces événements.

Utilisez le même format de requête que pour l'[Event Explorer][7], par exemple :

| Requête                       | Description                                                |
|-----------------------------|------------------------------------------------------------|
| `sources:jenkins`           | Affiche tous les événements provenant de la source Jenkins.                  |
| `tag:role:web`              | Affiche tous les événements avec le tag `role:web`.                  |
| `tags:$<TEMPLATE_VARIABLE>` | Affiche tous les événements provenant de la [template variable][8] sélectionnée. |

Une fois activés, les événements s'affichent en superposition sur vos graphiques avec des barres rouges :

{{< img src="dashboards/widgets/timeseries/event_overlay.png" alt="Barre de superposition d'événements sur un graphique de série temporelle" style="width:100%;" >}}

### Marqueurs

Pour ajouter des marqueurs pour des ensembles de données supplémentaires, cliquez sur **Add Marker** dans la section **Markers**.

1. Sélectionnez une ligne ou un intervalle et renseignez une valeur ou un intervalle de valeurs.
2. Dans le champ **Show as**, sélectionnez un statut d'alerte ou une couleur et choisissez un type de ligne horizontale (uni, gras ou pointillé).
3. Pour ajouter une étiquette en bas à gauche du widget Série temporelle, définissez une valeur pour l'axe des ordonnées et cochez la case **Label**.

### Commandes de l'axe des ordonnées

Les commandes de l'axe des ordonnées sont disponibles dans l'interface et dans l'éditeur JSON. Vous pouvez définir la valeur et le type de l'axe des ordonnées afin de réaliser ce qui suit :

* Régler l'axe des ordonnées sur un intervalle donné
* Modifier automatiquement les limites de l'axe des ordonnées en fonction d'un seuil basé sur un pourcentage ou sur une valeur absolue ; pour supprimer les singularités, ce seuil peut être appliqué aux deux extrémités du graphique (limite inférieure et limite supérieure), ou à une seule d'entre elles
* Changer l'échelle de l'axe des ordonnées afin de passer d'une échelle linéaire à une échelle logarithmique, racine carrée ou puissance

Les options de configuration suivantes sont disponibles :

| Option                | Obligatoire | Description                                                                                                                                                                                                               |
|-----------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Min`                 | Non       | Spécifie la valeur minimale à afficher sur l'axe des ordonnées. Indiquez un nombre ou `Auto` (la valeur par défaut).                                                                                                                |
| `Max`                 | Non       | Spécifie la valeur maximale à afficher sur l'axe des ordonnées. Indiquez un nombre ou `Auto` (la valeur par défaut).                                                                                                                        |
| `Scale`               | Non       | Spécifie le type d'échelle. Valeurs autorisées :<br>- *linear* : une échelle linéaire (valeur par défaut).<br>- *log* : une échelle logarithmique.<br>- *pow* : une échelle basée sur une puissance de 2. La valeur par défaut est 2, mais celle-ci peut être modifiée dans l'éditeur JSON.<br>- *sqrt* : une échelle basée sur la racine carrée. |
| `Always include zero` | Non       | Indique s'il faut toujours inclure le zéro ou ajuster l'axe des ordonnées à la plage de données. Par défaut, le zéro est toujours inclus.                                                                                                                             |

Comme la fonction log mathématique n'accepte pas les valeurs négatives, l'échelle log Datadog ne fonctionne que si les valeurs ont le même signe (toutes les valeurs positives ou toutes négatives). Si ce n'est pas le cas, un graphique vide s'affiche.

### Configuration de légendes

Vous pouvez ajouter des légendes configurables à vos screenboards en sélectionnant l'une des options suivantes dans la section **Legend** :

* Automatic (par défaut)
* Compact
* Expanded : colonnes configurables pour value, avg, sum, min et max
* Aucune

Pour les timeboards, les légendes s'affichent automatiquement lorsque le format du dashboard est défini sur L ou XL.

### Liens de contexte

Pour ajouter un lien de contexte dans le menu déroulant qui s'affiche lorsque vous cliquez sur un widget de dashboard, cliquez sur **Add a Context Link** dans la section **Context Links**.

Pour en savoir plus sur la modification et la suppression de liens de contexte, consultez la section [Liens de contexte][9].

### Plein écran

Outre les [options de plein écran standard][10], vous pouvez appliquer des fonctions rapides, effectuer des comparaisons par rapport à des périodes précédentes, régler l'échelle de l'axe des ordonnées, enregistrer des modifications ou enregistrer un nouveau graphique.

Pour en savoir plus, consultez l'article [Explorer des données sous la forme d'un graphique en plein écran][11] (en anglais).

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][12] pour en savoir plus.

Le [schéma JSON][13] utilisé pour le widget Série temporelle est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/#timeboards
[2]: /fr/dashboards/#screenboards
[3]: /fr/dashboards/querying/
[4]: /fr/tracing/trace_explorer/query_syntax/#search-bar
[5]: /fr/logs/search_syntax/
[6]: /fr/dashboards/querying/#filter
[7]: /fr/events/
[8]: /fr/dashboards/template_variables/
[9]: /fr/dashboards/guide/context-links/
[10]: /fr/dashboards/widgets/#full-screen
[11]: https://www.datadoghq.com/blog/full-screen-graphs
[12]: /fr/api/v1/dashboards/
[13]: /fr/dashboards/graphing_json/widget_json/