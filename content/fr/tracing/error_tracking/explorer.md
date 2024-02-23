---
description: En savoir plus sur l'Error Tracking Explorer
further_reading:
- link: /monitors/types/error_tracking
  tag: Documentation
  text: En savoir plus sur les monitors de suivi des erreurs
- link: /tracing/error_tracking
  tag: Documentation
  text: En savoir plus sur le suivi des erreurs pour les services backend
kind: documentation
title: Error Tracking Explorer
---

## Présentation

L'Error Tracking Explorer présente la liste des problèmes non résolus. Un _problème_ rassemble plusieurs erreurs similaires avec la même _empreinte_. Les problèmes nécessitent potentiellement d'être résolus, selon leur gravité.

{{< img src="tracing/error_tracking/explorer_with_backend_issues.png" alt="Error Tracking Explorer" style="width:100%" >}}

## Explorer vos problèmes

Chaque élément répertorié dans l'[Error Tracking Explorer][3] fournit des informations générales sur le problème rencontré, notamment ce qui suit :

-   Le type et le message d'erreur
-   Le chemin d'accès au fichier dans lequel les erreurs sous-jacentes sont survenues
-  Des informations à propos du cycle de vie du problème :
    -   La première et dernière détection
    -   Le nombre d'occurrences d'erreur au cours de la période sélectionnée
    -   Un graphique représentant les occurrences d'erreur au cours de la période sélectionnée

### Intervalle

Utilisez le sélecteur d'intervalle afin afficher les problèmes pour lesquels des erreurs sont survenues lors de la période sélectionnée.

{{< img src="tracing/error_tracking/time_range.png" alt="Intervalle de suivi des erreurs" style="width:60%;" >}}

Vous pouvez saisir un intervalle ou choisir une plage prédéfinie dans le menu déroulant.

### Facettes

La fonctionnalité de suivi des erreurs établit automatiquement une liste prédéfinie d'attributs à partir des occurrences d'erreurs sous-jacentes, puis génère des facettes à partir de ces erreurs. Ces facettes vous permettent de filtrer vos problèmes ou de passer facilement d'un problème à un autre. La liste des facettes présente les membres d'un attribut pour l'intervalle sélectionné, ainsi que des analyses de base, comme le nombre de problèmes correspondants.

{{< img src="tracing/error_tracking/facets_panel.png" alt="Facettes de suivi des erreurs" style="width:100%;" >}}

L'Error Tracking Explorer renvoie tous les problèmes pour lesquels au moins une occurrence d'erreur dans l'intervalle sélectionné correspond à l'ensemble des facettes sélectionnées.

## Enquêter sur un problème

Cliquez sur un problème de la liste pour ouvrir le volet dédié et accéder à des informations supplémentaires concernant les erreurs survenant dans votre service backend.

{{< img src="tracing/error_tracking/issue_panel.png" alt="Intervalle de suivi des erreurs" style="width:100%;" >}}

### Obtenir une vue d'ensemble

Le volet comporte des informations générales requises pour la résolution du problème.

Ces informations vous permettent de comprendre le cycle de vie du problème, notamment grâce à la première et la dernière occurrence, aux versions du code associées et au nombre total d'occurrences. Le graphique des occurrences d'erreur affiche des données sur les deux dernières semaines, afin que vous puissiez consulter l'évolution globale du problème.

### Parcourir certaines occurrences d'erreur

Voici quelques exemples d'erreurs qui peuvent composer un problème :

-   Toutes les spans d'erreur ingérées lors des [15 dernières minutes de Live Search][1]
-   Les spans d'erreur des 15 derniers jours qui sont indexées par des [filtres de rétention personnalisés][2]

{{< img src="tracing/error_tracking/error_sample.png" alt="Partie inférieure du volet des détails d'un problème" style="width:80%;" >}}

Chaque exemple d'erreur contient les informations dont vous avez besoin pour identifier l'origine de l'erreur et les étapes de remédiation à suivre. Exemple :

- La stack trace de l'erreur indique à quel emplacement du code source l'erreur s'est produite.
- Tous les tags de span d'erreur, notamment le nom de la ressource ou de l'opération, permettent d'accéder directement à la trace ou aux logs associés.
- Des données sur la santé du host ou du conteneur sous-jacent au moment de l'apparition de l'erreur sont également indiquées.

## Associer votre référentiel pour activer les extraits de code

Configurez l'[intégration GitHub][4] pour afficher des extraits de code dans vos stack traces.

{{< img src="tracing/error_tracking/inline_code_snippet.png" alt="Un extrait de code généré directement dans une stack trace" style="width:70%;" >}}

Pour commencer à configurer votre référentiel, consultez la [section Intégration du code source de Datadog][5].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_explorer/#live-search-for-15-minutes
[2]: /fr/tracing/trace_pipeline/trace_retention/#retention-filters
[3]: https://app.datadoghq.com/apm/error-tracking
[4]: /fr/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[5]: /fr/integrations/guide/source-code-integration