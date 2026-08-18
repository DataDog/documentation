---
further_reading:
- link: /continuous_testing/explorer/search_syntax/
  tag: Documentation
  text: Apprendre à créer une requête de recherche
title: Vues enregistrées
---

## Présentation

Les vues enregistrées vous permettent de sauvegarder l'état du [Synthetic Monitoring & Testing Results Explorer][2] et de faciliter le dépannage en vous donnant accès à des requêtes délimitées, à des facettes pertinentes, à des options de visualisation et à la plage temporelle.

Grâce aux vues enregistrées, vous pouvez conserver les éléments suivants :

- Batchs CI et exécutions de tests
- Requêtes de recherche (telles que les exécutions de tests ayant échoué avec des codes de statut d'erreur HTTP, les exécutions de tests ayant échoué dans la CI en fonction de leur statut bloquant, les exécutions de tests ayant nécessité de nouvelles tentatives et les ID de test à ajouter à votre pipeline CI)
- L'intervalle dynamique (par exemple, l'heure ou la semaine passée)
- Visualisations (telles qu'une série temporelle, une top list, un tableau ou une liste)

Les vues enregistrées vous permettent également de partager des configurations et des requêtes avec d'autres personnes.

## Vues enregistrées

Pour accéder à vos vues enregistrées, développez **> Views** sur la gauche dans l'[Explorateur de surveillance Synthetic et de tests en continu][1].

Toutes les vues enregistrées, à l'exception de la [vue par défaut](#default-views), sont partagées au sein de l'organisation, y compris les vues enregistrées personnalisées créées par les utilisateurs. Elles sont modifiables par toute personne de votre organisation et affichent l'avatar de l'utilisateur qui a créé la vue. Cliquez sur **Save** pour créer une vue enregistrée personnalisée à partir du contenu actuel de votre Explorer.

Vous pourrez :

- Charger ou recharger une vue enregistrée
- Remplacer la configuration d'une vue enregistrée par celle de la vue active
- Renommer ou supprimer une vue enregistrée
- Partager une vue enregistrée à l'aide d'un lien simplifié
- Ajouter une vue enregistrée à vos favoris, afin de pouvoir y accéder facilement depuis la liste dédiée dans le menu de navigation

<div class="alert alert-info">Les utilisateurs en lecture seule ne peuvent pas modifier, renommer ni supprimer des vues enregistrées.</div>

## Vues par défaut

Vous pouvez définir une vue enregistrée comme page de destination par défaut dans l'[Explorateur de surveillance Synthetic et de tests en continu][2]. Les vues par défaut sont définies par utilisateur et n'ont aucun impact sur votre organisation.

{{< img src="continuous_testing/saved_view.png" alt="Vues enregistrées dans l'Explorateur de surveillance Synthetic et de tests en continu" width="100%" >}}

Remplacez temporairement votre vue enregistrée par défaut en effectuant une action dans l'interface ou en ouvrant des liens dans l'Explorateur de résultats qui intègrent une configuration différente.

Vous pouvez effectuer les actions suivantes dans l'entrée de la vue par défaut du volet **Views** :

- Cliquer sur l'entrée pour recharger la vue par défaut
- Modifier votre vue par défaut en définissant les paramètres actuels
- Rétablir les valeurs par défaut de la vue par défaut, afin de repartir de zéro

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer
[2]: /fr/continuous_testing/explorer/