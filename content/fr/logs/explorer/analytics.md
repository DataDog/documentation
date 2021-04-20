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
    text: Détecter les patterns dans vos logs
---
## Présentation

Les fonctions d'analyse de logs permettent d'agréger ou de fractionner des logs depuis la page de recherche de logs, ce qui est particulièrement utile pour le dépannage et la surveillance.
Vous pouvez accéder à la page d'analyse depuis n'importe quelle vue Log Explorer, en cliquant sur l'icône « Analyse » à proximité de la barre de requête.

Vous pouvez contrôler :

- la requête qui permet de filtrer l'ensemble des logs à analyser ;
- les dimensions selon lesquelles les données doivent être fractionnées ;
- la méthode de visualisation des données agrégées et fractionnées.

À partir d'une visualisation analytique, vous pouvez également :

- créer un widget dans un dashboard basé sur cette visualisation ;
- créer un monitor à partir de cette requête ;
- analyser précisément les sous-ensembles de la liste de logs en fonction des interactions que la visualisation permet de réaliser.

Enregistrez une vue d'analyse de logs avec le bouton « Save As ». Vous pouvez charger les vues enregistrées par vos collègues depuis l'onglet « Saved Views ».

## Créer une requête d'analyse

Créez une requête pour contrôler le contenu affiché dans votre analyse de logs :

1. Choisissez une [mesure][1] ou une [facette][1] à représenter graphiquement. Les [mesures][1] vous permettent de choisir une fonction d'agrégation, tandis que les [facettes][1] affichent le nombre de valeurs uniques.

    {{< img src="logs/explorer/facet/measure_facet.png" alt="sélection mesure ou facette" style="width:50%;">}}

2. Sélectionnez la fonction d'agrégation pour la [mesure][1] que vous souhaitez représenter :

3. Utilisez une [facette][1] pour fractionner votre graphique.

4. Choisissez d'afficher les _X_ valeurs les plus **élevées** ou **faibles** en fonction de la [mesure][1] sélectionnée.

5. Sélectionnez les laps de temps du graphique.
   Le changement de l'intervalle de temps global modifie la liste des laps de temps disponibles.

## Visualisations

Sélectionnez un type de visualisation d'analyse de logs à l'aide du sélecteur de graphique :

Visualisations disponibles :

{{< tabs >}}
{{% tab "Séries temporelles" %}}

Visualisez l'évolution d'une seule [mesure][1] (ou d'une [facette][1] correspondant à un nombre unique de valeurs) pour un intervalle donné. Vous pouvez également fractionner le graphique en utilisant une [facette][1] disponible.

Vous disposez d'options supplémentaires pour les séries temporelles. Vous pouvez choisir :

- d'afficher des graphiques en aires, à barres ou linéaires ;
- de superposer des données, en fonction de leur valeur ou d'un pourcentage ;
- d'utiliser un jeu de couleurs.

Voici des informations supplémentaires sur la superposition :

- La superposition est seulement disponible pour des demandes de requêtes fractionnées.
- Les options de superposition sont disponibles seulement pour les graphiques à barres ou en aires. L'affichage linéaire superpose toujours les données.
- Lorsque vous utilisez une option de Top list qui masque une partie de vos données, la superposition n'affiche pas le total. Elle affiche seulement le sous-total pour les séries top/bottom.
- La superposition ne convient pas pour des valeurs qui ne sont pas uniques dans la facette fractionnée.
- La superposition peut ne pas être pertinente pour certaines méthodes d'agrégation de mesures.

L'analyse de logs avec une série temporelle suivante illustre :
l'évolution des **5 principaux chemins URL** selon le nombre d'adresses **IP client uniques** au cours du dernier mois.

{{< img src="logs/explorer/timeseries.png" alt="Exemple de série temporelle" style="width:90%;">}}


[1]: /fr/logs/explorer/facets/
{{% /tab %}}

{{% tab "Top List" %}}

Visualisez les valeurs les plus élevées d'une [facette][1] en fonction de la [mesure][1] choisie :

L'analyse de logs avec une Top List suivante illustre :
l'évolution des **5 principaux chemins URL** selon le nombre d'adresses **IP client uniques** au cours du dernier mois.

{{< img src="logs/explorer/toplists.png" alt="Exemple de Top List" style="width:90%;">}}


[1]: /fr/logs/explorer/facets/
{{% /tab %}}

{{% tab "Table" %}}

Visualisez la liste des valeurs les plus élevées d'une [facette][1] en fonction de la [mesure][1] choisie (la première mesure que vous choisissez dans la liste), et affichez la valeur des autres mesures dans la liste. Mettez à jour la requête de recherche ou explorez les logs correspondant à l'une des dimensions.

- Lorsque plusieurs dimensions sont définies, les valeurs les plus élevées sont déterminées en fonction de la première dimension, puis de la seconde dans la fourchette des valeurs les plus élevées de la première dimension, puis de la troisième dans la fourchette des valeurs les plus élevées de la seconde dimension.
- Lorsque plusieurs mesures sont définies, les valeurs les plus élevées ou faibles sont déterminées en fonction de la première mesure.
- Le sous-total peut différer de la somme réelle des valeurs au sein d'un groupe, étant donné qu'un seul sous-ensemble (celui des valeurs les plus élevées ou des valeurs les plus faibles) s'affiche. Les événements associés à une valeur nulle ou vide pour cette dimension ne s'affichent pas en tant que sous-groupe.

  **Remarque** : la visualisation d'une seule mesure et d'une seule dimension sous forme de tableau est identique à celle d'une top list. Seul l'affichage diffère.

L'analyse de logs avec un tableau suivante illustre l'évolution des **premiers codes de statut** en fonction de leur **débit**, ainsi que le nombre moyen d'**IP client** uniques au cours des 15 dernières minutes :

[1]: /fr/logs/explorer/facets/
{{% /tab %}}
{{< /tabs >}}

## Logs associés

Sélectionnez une section du graphique ou cliquez dessus pour l'agrandir ou consulter la liste des logs correspondant à votre sélection :

## Share View

Exportez votre visualisation de log actuelle grâce à la fonction de _partage_ :

- Export to **Monitor** : exportez la requête appliquée à votre analyse de logs pour créer la requête de votre nouveau [log monitor][2].
- Export to **Dashboard** : exportez l'analyse actuelle sous la forme d'un widget dans un nouveau [dashboard][3] ou un dashboard existant.
- Generate new **Metric** : [générez une nouvelle métrique][4] à partir de la requête d'analyse actuelle.

## Comment fonctionnent les agrégations

Datadog calcule une agrégation (une moyenne, une somme, un centile, etc.) en utilisant l'ensemble des logs inclus dans l'intervalle de temps ciblé.

Illustrons ceci sur une chronologie à barres fictive, où chaque barre représente un intervalle de temps. Dans cet exemple, Datadog crée une agrégation pour chaque intervalle de temps de l'ensemble des logs. On constate que les événements de log ne sont pas toujours répartis uniformément dans le temps, de sorte que vous ne pouvez pas nécessairement créer des agrégations pour le même nombre de logs.

Dans l'exemple suivant, chaque point représente un événement de log. L'axe des abscisses correspond au timestamp du log, tandis que l'axe des ordonnées correspond à la valeur d'un attribut de durée transmis par les logs. La série temporelle affiche une agrégation selon les valeurs maximales. Datadog affiche une chronologie avec les paramètres de déploiement. Par exemple, il y a 4 barres pour l'intervalle de temps complet.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/facets/
[2]: /fr/monitors/monitor_types/log/
[3]: /fr/dashboards/
[4]: /fr/logs/logs_to_metrics/
