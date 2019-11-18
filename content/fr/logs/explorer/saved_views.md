---
title: Vues enregistrées
kind: documentation
description: Utilisez les vues enregistrées pour configurer automatiquement votre vue Log Explorer.
further_reading:
  - link: logs/explorer/analytics
    tag: Documentation
    text: Effectuer des analyses de logs
  - link: logs/processing
    tag: Documentation
    text: Apprendre à traiter vos logs
---
## Vue par défaut du Log Explorer

La vue Log Explorer par défaut est chargée à l'endroit auquel vous accédez : sur la page de recherche de logs, des analyses ou des patterns, à partir du menu de navigation principal. Vous pouvez alternativement entrer les URL correspondantes dans votre navigateur.

La vue par défaut comprend :

* une requête vide
* les facettes visibles dans la liste des facettes
* une disposition de page basique (comprenant par exemple la configuration des tables pour la recherche, des options de visualisation pour les analyses, etc.)

Toutes les modifications apportées à la liste des facettes (voir ci-dessous) ou dans la disposition de la page sont automatiquement enregistrées dans cette vue par défaut.

{{< img src="logs/explorer/saved_views/edit_facet_list.png" alt="Sélection d'une vue enregistrée" responsive="true">}}


## Vues enregistrées

Les vues enregistrées vous permettent d'enregistrer des recherches personnalisées dans le Log Explorer, y compris :

* Une [requête de recherche][1]
* Un [sous-ensemble de facettes][2]
* Une visualisation par défaut personnalisée ([flux de logs][3], [patterns de logs][4] ou [analyse de logs][5] avec leurs propriétés de visualisation spécifiques)


### Charger une vue enregistrée

Sélectionnez les vues enregistrées directement dans le volet de gauche ou dans la barre de recherche, à l'aide de la saisie automatique, qui correspondent au nom de la recherche ou à la requête.

{{< img src="logs/explorer/saved_views/saved_view_load-from-bar.png" alt="Sélection d'une vue enregistrée" responsive="true">}}

Ajoutez une étoile aux vues enregistrées pour les ajouter à vos favoris. Vous pouvez accéder aux vues enregistrées marquées d'une étoile directement à partir du menu de navigation principal.

{{< img src="logs/explorer/saved_views/saved_view_load.mp4" alt="Chargement des vues enregistrées" video="true" responsive="true" >}}

### Gérer les vues enregistrées

Pour créer une vue enregistrée, cliquez sur le bouton *Save as* en haut de l'écran. Nommez votre vue et cliquez sur *Save*.

Vous pouvez filtrer vos données à partir d'une vue enregistrée. Si besoin, mettez à jour la vue afin d'effectuer un suivi de la requête ou de la configuration de la disposition de page. Pour ce faire, cliquez sur le bouton "Save As".

{{< img src="logs/explorer/saved_views/saved_view_create-delete.mp4" video="true" alt="Création d'une vue enregistrée" responsive="true" >}}

Les vues enregistrées peuvent être supprimées directement depuis la liste Saved View dans le Log Explorer. Passez le curseur sur le nom de la vue enregistrée pour afficher le bouton **Delete**. Cliquez ensuite sur ce dernier et confirmez.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/search
[2]: /fr/logs/explorer/?tab=facets#setup
[3]: /fr/logs/explorer/?tab=logstream#visualization
[4]: /fr/logs/explorer/patterns
[5]: /fr/logs/explorer/analytics