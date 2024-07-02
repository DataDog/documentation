---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentation
  text: Rechercher des événements
title: Vues enregistrées
---

## Présentation

Les vues enregistrées vous permettent de conserver des données du RUM Explorer. Elles facilitent votre processus de dépannage en vous permettant d'accéder rapidement à des requêtes filtrées, des facettes pertinentes, des options de visualisation et un intervalle précis.

Grâce aux vues enregistrées, vous pouvez conserver les éléments suivants :

- Des événements RUM (notamment les sessions, vues, erreurs, actions, ressources et tâches longues)
- Des requêtes de recherche (notamment les principaux utilisateurs et les données d'utilisation des versions de votre application)
- L'ordre de tri des colonnes
- L'intervalle dynamique (par exemple, l'heure ou la semaine passée)
- Des visualisations (comme un graphique de série temporelle, de top list, de tableau ou d'entonnoir)
- Des sous-ensembles de facettes

Les vues enregistrées vous permettent également de partager des configurations et des requêtes avec d'autres personnes.

## Vues enregistrées

Pour accéder à vos vues enregistrées, développez l'option **> Views** à gauche de l'onglet **Sessions & Replays** dans le [RUM Explorer][1].

À l'exception de la [vue par défaut](#vues-par-defaut), toutes les vues enregistrées peuvent être partagées avec tous les membres de votre organisation, y compris :

- Les vues enregistrées personnalisées créées par des utilisateurs. Ces vues peuvent être modifiées par n'importe quel utilisateur de votre organisation et sont identifiées par l'avatar de l'utilisateur qui les a créés. Cliquez sur **Save** pour créer une vue enregistrée personnalisée à partir du contenu actuel de votre vue RUM Explorer.
- Les modèles de vue enregistrée, qui correspondent à des vues enregistrées prédéfinies et prêtes à l'emploi dans le RUM Explorer. Vous pouvez vous baser sur ces modèles pour créer une vue enregistrée identifiée par un avatar Datadog. Défilez jusqu'en bas de la liste des vues enregistrées pour accéder aux modèles.
</br>
  {{< img src="real_user_monitoring/explorer/rum-saved-views.png" alt="Cliquez sur l'onglet à gauche de Real User Monitoring pour accéder aux vues enregistrées." width="50%" >}}

Vous pourrez :

- Charger ou recharger une vue enregistrée
- Remplacer la configuration d'une vue enregistrée par celle de la vue active
- Renommer ou supprimer une vue enregistrée
- Partager une vue enregistrée à l'aide d'un lien simplifié
- Ajouter une vue enregistrée à vos favoris, afin de pouvoir y accéder facilement depuis la liste dédiée dans le menu de navigation

<div class="alert alert-info">Les utilisateurs en lecture seule ne peuvent pas modifier, renommer ni supprimer des vues enregistrées.</div>

## Vues par défaut

Vous pouvez configurer une [vue enregistrée](#vues-enregistrees) afin qu'elle s'affiche par défaut sur la page d'accueil de [RUM Explorer][2]. Les vues par défaut varient pour chaque utilisateur : elles ne sont pas communes à l'ensemble de l'organisation.

Pour remplacer temporairement votre vue enregistrée par défaut, effectuez une action dans l'interface ou ouvrez des liens dans le RUM Explorer qui comprennent une configuration différente.

Vous pouvez effectuer les actions suivantes dans l'entrée de la vue par défaut du volet **Views** :

- Cliquer sur l'entrée pour recharger la vue par défaut
- Modifier votre vue par défaut en définissant les paramètres actuels
- Rétablir les valeurs par défaut de la vue par défaut, afin de repartir de zéro

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/explorer
[2]: /fr/real_user_monitoring/explorer/