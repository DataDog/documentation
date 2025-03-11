---
title: Analyses
---

## Présentation

La fonctionnalité d'analyse d'événements renforce l'utilité de la page Events Explorer en proposant des vues, des agrégations de données et des outils de regroupement pour faciliter le dépannage et la surveillance. Vous pouvez ainsi contrôler :

- la requête utilisée pour filtrer l'ensemble de logs à analyser ;
- les dimensions à partir desquelles les données doivent être regroupées ;
- la méthode de visualisation des données agrégées et regroupées.

Vous pouvez exporter des visualisations d'analyse pour créer des widgets dans un dashboard ou un notebook.

### Créer une requête d'analyse

Créez une requête pour contrôler les données affichées dans votre analyse d'événements :

1. Choisissez l'attribut ou le tag que vous souhaitez représenter, puis ajoutez-le en tant que facette. La facette affiche le total de valeurs uniques de la variable.
    {{< img src="service_management/events/explorer/facet-to-graph.png" alt="Liste des facettes pouvant être représentées" style="width:100%;" >}}
2. Regroupez les données de votre graphique en fonction d'une facette. Vous devez ajouter un attribut en tant que facette pour pouvoir l'utiliser.
    {{< img src="service_management/events/explorer/split-graph.png" alt="Liste des facettes à partir desquelles les données peuvent être regroupées" style="width:100%;" >}}
3. Choisissez l'intervalle de votre graphique. Si vous changez l'intervalle global, cela modifie la liste des laps de temps disponibles. Vous pouvez afficher les résultats sous la forme d'une série temporelle, d'un tableau ou d'une top list.
    {{< img src="service_management/events/explorer/time-interval.png" alt="Liste des intervalles disponibles, avec la valeur par défaut de 5 secondes" style="width:100%;" >}}
4. Choisissez d'afficher les valeurs les plus élevées ou les plus faibles en fonction de la mesure sélectionnée.
    {{< img src="service_management/events/explorer/display-values.png" alt="Choisir d'afficher les valeurs les plus faibles ou les plus élevées" style="width:100%;" >}}