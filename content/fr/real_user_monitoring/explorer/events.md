---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentation
  text: Rechercher des événements
kind: documentation
title: Volet latéral des événements
---

## Présentation

Le RUM Explorer présente des événements individuels et vous permet d'accéder au volet latéral suivant :

{{< img src="real_user_monitoring/explorer/events/performance_side_panel.png" alt="Graphique des performances d'une application et signaux Web essentiels dans l'onglet Performance" width="80%" >}}

Des informations de contexte globales sont fournies en haut du volet. Accédez à la cascade pour affiche le contenu de l'événement.

Les informations de contexte à propos de vos utilisateurs et de leurs applications, y compris le système d'exploitation, le pays ou encore la version du code, sont recueillies lors de la création de l'événement. Le contexte englobe également des données sur l'événement, notamment sur son type. Par exemple, le volet latéral des événements fournit le chemin de la vue, tandis que le volet latéral des **erreurs** indique le message d'erreur.

## Volet latéral des événements

Pour ouvrir le volet latéral des événements dans le [RUM Explorer][1], cliquez sur une ligne de tableau dans les visualisations de type **Liste**. Vous pouvez également cliquer sur **Show related events**, puis sur la liste latérale.

Le volet latéral des événements affiche toutes les informations se rapportant à un événement RUM. La cascade indique les ressources, erreurs, vues et actions associées. Elle vous permet de visualiser les événements qui ont engendré des erreurs, ou qui se chargent trop lentement, sous la forme d'une chronologie (mini-carte de la vue).

Vous pouvez également faire glisser les poignées de sélection d'intervalle de la cascade pour agrandir une période précise et vous focaliser uniquement sur les événements pertinents.

{{< img src="real_user_monitoring/explorer/events/events_side_panel-1.mp4" alt="Durées des événements et signaux mobiles essentiels" video="true" width="80%" >}}

## Attributs

La solution RUM recueille par défaut des informations de contexte. Vous pouvez également ajouter des attributs de contexte supplémentaires avec l'[API de contexte global][2].

{{< img src="real_user_monitoring/explorer/events/attributes.png" alt="Onglet Attributes" width="80%" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/explorer
[2]: /fr/real_user_monitoring/browser/advanced_configuration/?tab=npm#global-context