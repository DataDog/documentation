---
title: Live Tail
kind: documentation
description: "Visualisez tous vos spans de trace en temps réel."
further_reading:
- link: /tracing/setup/
  tag: Documentation
  text: Découvrir comment configurer le tracing d'APM avec votre application
- link: /tracing/visualization/services_list/
  tag: Documentation
  text: Découvrir la liste des services transmettant des données à Datadog
- link: /tracing/visualization/service/
  tag: Documentation
  text: En savoir plus sur les services dans Datadog
- link: /tracing/visualization/resource/
  tag: Documentation
  text: Plonger au cœur des traces et des performances de vos ressources
- link: /tracing/visualization/trace/
  tag: Documentation
  text: Comprendre comment lire une trace Datadog
- link: /tracing/app_analytics/analytics/
  tag: Documentation
  text: Analyse des données de votre APM avec une cardinalité infinie
---

{{< img src="tracing/live_tail/livetail_view.gif" alt="Live tail" >}}

## Présentation

La fonctionnalité [Live Tail][1] de l'APM vous donne la possibilité de visualiser toutes vos spans de trace dans toute l'interface Datadog, et ce quasiment en temps réel. Les spans sont affichées dès leur sortie de l'Agent Datadog et avant leur indexation par Datadog. Tous les spans de trace ingérées par Datadog sont affichées (Tracing without Limits\*) une fois traitées. Sur la page Live Tail APM, vous pouvez effectuer les actions suivantes :

- Rédiger des paramètres de recherche pour affiner les flux de traces
- Consulter les traces distribuées en temps réel
- Ajouter ou supprimer des colonnes dans les tags de span pour obtenir un affichage personnalisé

Cette fonctionnalité vous permet par exemple de vérifier si un processus a démarré correctement, ou si un déploiement récent s'est déroulé sans erreur. Vous pouvez même consulter des informations sur les pannes en temps réel.

## Vue Live Tail

Choisissez l'option `Live Tail` dans le sélecteur d'intervalle pour passer à la vue Live Tail. Le nombre de spans reçues par seconde est affiché en haut à gauche, ainsi que la fréquence d'échantillonnage. Étant donné qu'un flux de milliers de spans par seconde n'est pas lisible, les flux de spans à haut débit sont échantillonnés. Utilisez les fonctions de filtres de la barre de recherche Live Tail pour filtrer le flux de spans et le bouton de lecture et de pause en haut à droite pour interrompre ou relancer le flux.

**Remarque** : lorsque vous sélectionnez une span, le flux s'interrompt et les détails de la span sélectionnée s'affichent dans le volet latéral de la trace.

## Options de colonne

Personnalisez la vue de la colonne Live Tail pour visualiser plus facilement les informations pertinentes de vos traces. Cliquez sur le menu déroulant en haut à droite de l'en-tête de la colonne pour activer l'une des options ci-dessous :

{{< img src="tracing/live_tail/column_livetail.png" alt="Live Tail" style="width:20%;">}}

1. Déplacez la colonne vers la gauche ou la droite.
2. Insérez la colonne à gauche ou à droite des tags de span.
3. Supprimez ou remplacez la colonne.

## Filtrer le flux de traces

Une requête valide dans la barre de recherche affiche les traces qui correspondent à vos critères de recherche. La syntaxe de recherche de la vue Live Tail est la même que celle des autres vues de trace. Toutefois, avec la vue Live Tail, la recherche se fait dans toutes les traces ingérées, et non pas uniquement dans celles qui ont été indexées.

## Requête de recherche

{{< img src="tracing/live_tail/search_livetail.png" alt="Live Tail" >}}

Toutes les requêtes valides dans les autres vues le sont également dans la vue Live Tail. Vous pouvez également rechercher des attributs qui ne sont pas définis en tant que facettes. Par exemple, pour rechercher l'attribut customer_id, deux options sont possibles :

- Cliquez sur l'attribut et ajoutez-le à la recherche à l'aide de la requête `@customer_id:1123`.
- Filtrez toutes les spans d'une durée supérieure à 150 ms à l'aide de la requête : `@duration:>150ms`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/traces
