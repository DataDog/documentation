---
further_reading:
- link: /continuous_integration/explorer/search_syntax/
  tag: Documentation
  text: Apprendre à créer une requête de recherche
- link: /continuous_integration/explorer
  tag: Documentation
  text: En savoir plus sur le CI Visibility Explorer
title: Vues enregistrées
---

## Présentation

Les vues enregistrées vous permettent de conserver des données du [CI Visibility Explorer][2] sur la [page **Executions**][3]. Elles facilitent votre processus de dépannage en vous permettant d'accéder rapidement à des requêtes filtrées, des facettes pertinentes, des options de visualisation et un intervalle précis.

Grâce aux vues enregistrées, vous pouvez conserver les éléments suivants :

- Les exécutions de pipeline
- Les requêtes de recherche (affichant par exemple les jobs ayant échoué)
- L'ordre de tri des colonnes
- L'intervalle dynamique (par exemple, l'heure ou la semaine passée)
- Les visualisations (une série temporelle, une top list, un tableau ou encore un graphique de distribution)
- Des sous-ensembles de facettes

Les vues enregistrées vous permettent également de partager des configurations et des requêtes avec d'autres personnes.

## Vues enregistrées

<div class="alert alert-info">Les utilisateurs en lecture seule ne peuvent pas modifier, renommer ni supprimer des vues enregistrées.</div>

Pour accéder aux vues enregistrées, développez **> Views** à gauche du [CI Visibility Explorer][1].

{{< img src="continuous_integration/saved-view-pipelines-executions.png" alt="Cliquez sur l'onglet à gauche de CI Visibility pour accéder aux vues enregistrées" width="50%" >}}

Toutes les vues enregistrées, à l'exception de la [vue par défaut](#vues-par-defaut), sont partagées au sein de l'organisation, y compris les vues enregistrées personnalisées créées par les utilisateurs. Elles sont modifiables par toute personne de votre organisation et affichent l'avatar de l'utilisateur qui a créé la vue.

Cliquez sur **Save** pour créer une vue enregistrée personnalisée à partir du contenu actuel du CI Visibility Explorer.

Vous pourrez :

- Charger ou recharger une vue enregistrée
- Remplacer la configuration d'une vue enregistrée par celle de la vue active
- Renommer ou supprimer une vue enregistrée
- Partager une vue enregistrée à l'aide d'un lien simplifié
- Ajouter une vue enregistrée à vos favoris, afin de pouvoir y accéder facilement depuis la liste dédiée dans le menu de navigation

## Vues par défaut

Vous pouvez définir une vue enregistrée comme page de destination par défaut sur le [CI Visibility Explorer][1]. Les vues par défaut sont définies par utilisateur et n'ont aucun impact sur votre organisation.

Pour remplacer temporairement votre vue enregistrée par défaut, effectuez une action dans l'interface ou ouvrez des liens dans l'Explorer qui comprennent une configuration différente.

Vous pouvez effectuer les actions suivantes dans l'entrée de la vue par défaut du volet **Views** :

- Cliquer sur l'entrée pour recharger la vue par défaut
- Modifier votre vue par défaut en définissant les paramètres actuels
- Rétablir les valeurs par défaut de la vue par défaut, afin de repartir de zéro

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-runs
[2]: /fr/continuous_integration/explorer/
[3]: https://app.datadoghq.com/ci/pipeline-executions