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
## Présentation

Lorsque plusieurs équipes partagent le même compte, ou lorsque vos logs ont de nombreuses sources différentes, il est important de pouvoir commencer rapidement l'examen du bon contenu.
Avec Datadog, les équipes peuvent définir et partager des vues Log Explorer de manière à ce que tout le monde puisse commencer le dépannage avec le même contexte prédéfini.

Les vues enregistrées Datadog vous permettent d'enregistrer des recherches personnalisées dans le Log Explorer, y compris :

* Une [requête de recherche][1]
* Un [sous-ensemble de facettes][2]
* Un ensemble de [colonnes][3]
* Une visualisation par défaut personnalisée ([flux de logs][4] ou [analyse de logs][5])

Les vues personnalisées peuvent ensuite être directement sélectionnées dans le volet de gauche ou dans la barre de recherche grâce à l'auto-complétion, qui fonctionne avec le nom ou la requête de recherche.

{{< img src="logs/explorer/saved_views/saved_views_selection.png" alt="Sélection d'une vue enregistrée" responsive="true">}}

## Vue par défaut du Log Explorer

Par défaut, toutes les facettes s'affichent pour tous les utilisateurs.

Chaque utilisateur peut définir sa propre liste de facettes et de groupes de facettes par défaut à afficher en utilisant le bouton *Manage Facets*, puis en sélectionnant les facettes souhaitées.

{{< img src="logs/explorer/saved_views/default_saved_views.png" alt="Sélection d'une vue enregistrée" responsive="true">}}

Une fois la sélection effectuée, le Log Explorer affiche la liste de facettes par défaut lorsqu'il est ouvert. Les facettes par défaut peuvent également être affichées en cliquant sur *Log Explorer - Default view* depuis la liste Saved Views :

{{< img src="logs/explorer/saved_views/default_views_selection.png" alt="Sélection d'une vue enregistrée" responsive="true" style="width:50%;">}}

## Créer une vue enregistrée

Pour créer une vue enregistrée :

1. Entrez une requête dans la [barre de recherche][1]
2. Sélectionnez les colonnes à afficher (depuis l'icône en forme d'engrenage en haut à droite de la page, ou depuis le volet contextuel du log)
3. Sélectionnez la liste de [facettes][2] à afficher
4. Cliquez sur le bouton *Save As* en haut de l'écran
5. Nommez votre vue et cliquez sur *Save*

{{< img src="logs/explorer/saved_views/saved_views_creation.gif" alt="Création d'une vue enregistrée" responsive="true">}}

## Mettre à jour ou supprimer une vue enregistrée existante

### Supprimer une vue enregistrée

Les vues enregistrées peuvent être supprimées directement depuis la liste Saved View dans le Log Explorer. Passez le curseur sur le nom de la vue enregistrée pour afficher le bouton **Delete**. Cliquez sur ce dernier et confirmez.

{{< img src="logs/explorer/saved_views/remove_saved_views.png" alt="Suppression d'une vue enregistrée" responsive="true" style="width:50%;">}}

### Mettre à jour une vue enregistrée

Pour mettre à jour une vue enregistrée existante, faites exactement comme si vous vouliez créer une nouvelle vue. Toutefois, au lieu de l'enregistrer, sélectionnez une vue enregistrée existante dans le menu déroulant, cliquez sur *Replace* et confirmez.

{{< img src="logs/explorer/saved_views/update_saved_views.png" alt="Sélection d'une vue enregistrée" responsive="true" style="width:50%;">}}

## Annuler la modification d'une vue enregistrée

Après avoir sélectionné une vue enregistrée, vous pouvez continuer d'affiner et de modifier votre recherche si nécessaire à des fins de dépannage. Après avoir modifié la vue, vous pouvez toujours revenir à la version enregistrée la plus récente de la vue enregistrée en sélectionnant le bouton **Revert**.

**Remarque** : le bouton Revert ne permet pas d'annuler des modifications déjà enregistrées.

{{< img src="logs/explorer/saved_views/revert_saved_views.png" alt="Rétablir une vue enregistrée" responsive="true" style="width:50%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/search
[2]: /fr/logs/explorer/?tab=facets#setup
[3]: /fr/logs/explorer/?tab=logstream#visualization
[4]: /fr/logs/explorer/?tab=logstream#visualization
[5]: /fr/logs/explorer/analytics