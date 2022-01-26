---
title: Explorateur de suivi des erreurs
kind: documentation
beta: false
---
{{< img src="tracing/error_tracking/error_tracking_explore_inspect.png" alt="Explorateur de suivi des erreurs"  >}}

## Explorer vos problèmes

L'Explorateur de suivi des erreurs présente la liste des problèmes non résolus. Un _problème_ rassemble plusieurs erreurs similaires avec la même _empreinte_. Les problèmes nécessitent potentiellement d'être résolus, selon leur gravité. Chaque élément indiqué dans l'Explorateur contient des informations générales sur le problème :

-   Le type d'erreur et le message d'erreur
-   Le chemin d'accès au fichier dans lequel les erreurs sous-jacentes sont survenues
-  Les informations sur le cycle de vie du problème :
    -   Première et dernière détection
    -   Nombre d'occurrences au cours de la période sélectionnée
    -   Graphique des occurrences d'erreur au cours de la période sélectionnée

### Intervalle

{{< img src="tracing/error_tracking/time_range.png" alt="Intervalle de suivi des erreurs"  >}}

Modifiez l'intervalle à l'aide du sélecteur en haut à droite de l'Explorateur pour afficher les problèmes contenant des occurrences d'erreur lors d'une période précise. Vous pouvez définir un intervalle spécifique ou sélectionner une période prédéfinie depuis la liste déroulante.

### Facettes

{{< img src="tracing/error_tracking/facet.png" alt="Facettes de suivi des erreurs"  >}}

La fonctionnalité Suivi des erreurs indexe automatiquement une liste prédéfinie d'attributs à partir des occurrences d'erreur sous-jacentes, puis les utilise pour générer des facettes. La liste des facettes affiche les membres d'un attribut pour la période sélectionnée, en plus de proposer des analyses de base, comme le nombre de problèmes correspondants. Utilisez des facettes pour faire pivoter ou filtrer vos problèmes. L'Explorateur renvoie tous les problèmes pour lesquels au moins une occurrence d'erreur correspond à l'ensemble de facettes choisies lors de la période sélectionnée.

## Inspecter un problème

Cliquez sur un problème pour l'examiner plus en détail dans un volet dédié.

### Obtenir une vue d'ensemble

{{< img src="tracing/error_tracking/issue_panel_upper_part.png" alt="Partie supérieure du volet des détails d'un problème"  >}}

Les principales informations dont vous avez besoin pour corriger un problème se trouvent dans la partie supérieure du volet. Elles vous permettent de comprendre son cycle de vie, en indiquant notamment la première et la dernière occurrence, les versions du code associées et le nombre total d'occurrences. Le graphique des occurrences d'erreur affiche des données sur une période maximale de deux semaines, afin que vous puissiez consulter l'évolution globale du problème.

### Parcourir certaines occurrences d'erreur

{{< img src="tracing/error_tracking/issue_panel_lower_part.png" alt="Partie inférieure du volet des détails d'un problème"  >}}

Depuis la partie inférieure du volet réservé aux problèmes, parcourez des exemples d'erreurs inclus dans le problème. Les spans suivantes sont affichées :

-   Toutes les spans d'erreur ingérées lors des [15 dernières minutes de Live Search][1]
-   Les spans d'erreur des 15 derniers jours qui sont indexées par des [filtres de rétention personnalisés][2]

Chaque exemple d'erreur contient les informations dont vous avez besoin pour mieux comprendre le motif de l'erreur et la méthode à suivre pour la résoudre :

- La stack trace de l'erreur indique à quel emplacement du code l'erreur s'est produite.
- Tous les tags de span d'erreur, notamment le nom de la ressource ou de l'opération, permettent d'accéder directement à la trace ou aux logs associés.
- Des données sur la santé du host ou du conteneur sous-jacent au moment de l'apparition de l'erreur sont également indiquées.

[1]: /fr/tracing/trace_explorer/#live-search-for-15-minutes
[2]: /fr/tracing/trace_retention_and_ingestion/#retention-filters