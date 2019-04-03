---
title: Analyse de logs
kind: documentation
description: Effectuer des analyses de logs
aliases:
  - /fr/logs/graph
  - /fr/logs/analytics
further_reading:
  - link: logs/processing
    tag: Documentation
    text: Découvrir comment traiter vos logs
  - link: logs/processing/parsing
    tag: Documentation
    text: En savoir plus sur le parsing
  - link: logs/explorer
    tag: Documentation
    text: Découvrir comment explorer vos logs
  - link: logs/explorer/patterns
    tag: Documentation
    text: Détecter les modèles dans vos logs
---
## Présentation

Les analyses de logs complètent la page de recherche de logs en proposant des fonctions d'agrégation et de fractionnement de logs pour le dépannage et la surveillance. 
Vous pouvez accéder à la page d'analyse depuis n'importe quelle vue Log Explorer, en cliquant sur l'icône « Analytics » en regard de la barre de requête.

{{< img src="logs/explorer/analytics/explorer-button.png" alt="Log Explorer" style="width:50%;" responsive="true">}}

Vous pouvez contrôler :

* la requête qui permet de filtrer l'ensemble des logs à analyser ;
* les dimensions selon lesquelles les données doivent être fractionnées ;
* la méthode de visualisation des agrégats et des fractionnements.

À partir d'une visualisation analytique, vous pouvez également :

* créer un widget dans un dashboard basé sur cette visualisation ;
* créer un monitor à partir de cette requête ;
* analyser précisément les sous-ensembles de la liste de logs en fonction des interactions que la visualisation permet de réaliser.

Enregistrez une vue d'analyse de logs avec le bouton « Save As ». Vous pouvez charger les vues enregistrées par vos collègues depuis l'onglet « Saved Views ».


## Créer une requête d'analyse

Créez une requête pour contrôler le contenu affiché dans votre analyse de logs :

1. Choisissez une [mesure][1] ou une [facette][2] à représenter graphiquement. Les [mesures][1] vous permettent de choisir une fonction d'agrégation, tandis que les [facettes][2] affichent le nombre de valeurs uniques.

    {{< img src="logs/explorer/analytics/choose_measure_facet.png" alt="choisir mesure ou facette" responsive="true" style="width:50%;">}}
2. Sélectionnez la fonction d'agrégation pour la [mesure][1] que vous souhaitez représenter :

    {{< img src="logs/explorer/analytics/agg_function_log_graph.png" alt="fonction d'agrégation pour l'analyse de logs" responsive="true" style="width:50%;">}}

3. Utilisez un [tag][1] ou une [facette][2] pour fractionner votre graphique.

    {{< img src="logs/explorer/analytics/split_by_log_graph.png" alt="fractionner avec l'analyse de logs" responsive="true" style="width:50%;">}}

4. Choisissez d'afficher les *X* valeurs les plus **élevées** ou **faibles** en fonction de la [mesure][1] sélectionnée.

    {{< img src="logs/explorer/analytics/top_bottom_button.png" alt="bouton top et bottom" responsive="true" style="width:20%;">}}

5. Sélectionnez les laps de temps du graphique.
  Si vous changez l'intervalle global, cela modifie la liste des valeurs de laps de temps disponibles.

    {{< img src="logs/explorer/analytics/timesteps.png" alt="Laps de temps" responsive="true" style="width:30%;">}}


## Visualisations

Sélectionnez un type de visualisation d'analyse de logs à l'aide du sélecteur de graphique :

{{< img src="logs/explorer/analytics/graph_selector.png" alt="Sélection d'analyse de logs" responsive="true" style="width:30%;">}}

Visualisations disponibles :

{{< tabs >}}
{{% tab "Séries temporelles" %}}

Visualisez l'évolution d'une seule [mesure][1] (ou d'une [facette][2] correspondant à un nombre unique de valeurs) pour un intervalle donné. Vous pouvez également fractionner le graphique en utilisant une [facette][2] disponible.

Vous disposez d'options supplémentaires pour les séries temporelles. Vous pouvez choisir :

* d'afficher des graphiques en aires, à barres ou linéaires ;
* de superposer des données, en fonction de leur valeur ou d'un pourcentage ;
* d'utiliser un jeu de couleurs.

Voici des informations supplémentaires sur la superposition :

* La superposition est seulement disponible pour des demandes de requêtes fractionnées.
* Les options de superposition sont disponibles seulement pour les graphiques à barres ou en aires. L'affichage linéaire superpose toujours les données.
* Lorsque vous utilisez une option de Top list qui masque une partie de vos données, la superposition n'affiche pas le total. Elle affiche seulement le sous-total pour les séries top/bottom.
* La superposition ne convient pas pour des valeurs qui ne sont pas uniques dans la facette fractionnée.
* La superposition peut ne pas être pertinente pour certaines méthodes d'agrégation de mesures.

L'analyse de logs avec une série temporelle suivante illustre :
l'évolution des **5 principaux chemins URL** selon le nombre d'adresses **IP client uniques** au cours du dernier mois.

{{< img src="logs/explorer/analytics/timeserie_example.png" alt="Exemple de série temporelle" responsive="true" style="width:90%;">}}


[1]: /fr/logs/explorer/?tab=measures#setup
[2]: /fr/logs/explorer/?tab=facets#setup
{{% /tab %}}

{{% tab "Top List" %}}

Visualisez les valeurs les plus élevées d'une [facette][1] en fonction de la [mesure][2] choisie :

L'analyse de logs avec une Top List suivante illustre :
l'évolution des **5 principaux chemins URL** selon le nombre d'adresses **IP client uniques** au cours du dernier mois.

{{< img src="logs/explorer/analytics/top_list_example.png" alt="Exemple de Top List" responsive="true" style="width:90%;">}}


[1]: /fr/logs/explorer/?tab=facets#setup
[2]: /fr/logs/explorer/?tab=measures#setup
{{% /tab %}}
{{< /tabs >}}

## Logs associés

Sélectionnez une section du graphique ou cliquez dessus pour l'agrandir ou consulter la liste des logs correspondant à votre sélection :

{{< img src="logs/explorer/analytics/view_logs.gif" alt="affichage des logs" responsive="true" style="width:80%;">}}

## Comment fonctionnent les agrégations

Datadog calcule une agrégation (une moyenne, une somme, un centile, etc.) en utilisant l'ensemble des logs inclus dans l'intervalle de temps ciblé.

Illustrons ceci sur une chronologie à barres fictive, où chaque barre représente un intervalle de temps. Dans cet exemple, Datadog crée une agrégation pour chaque intervalle de temps de l'ensemble des logs. On constate que les événements de log ne sont pas toujours répartis uniformément dans le temps, de sorte que vous ne pouvez pas nécessairement créer des agrégations pour le même nombre de logs.

Dans l'exemple suivant, chaque point représente un événement de log. L'axe des abscisses correspond au timestamp du log, tandis que l'axe des ordonnées correspond à la valeur d'un attribut de durée transmis par les logs. La série temporelle affiche une agrégation selon les valeurs maximales. Datadog affiche une chronologie avec les paramètres de déploiement. Par exemple, il y a 4 barres pour l'intervalle de temps complet.

{{< img src="logs/explorer/analytics/aggregation_howto.gif" alt="exemple de top list" responsive="true" style="width:90%;">}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/?tab=measures#setup
[2]: /fr/logs/explorer/?tab=facets#setup