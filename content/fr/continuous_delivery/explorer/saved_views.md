---
descriptions: Découvrez comment créer et partager des vues enregistrées depuis le
  CD Visibility Explorer.
further_reading:
- link: /continuous_delivery/explorer/search_syntax/
  tag: Documentation
  text: Apprendre à créer une requête de recherche
title: Vues enregistrées
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Rejoignez la version Preview !" >}}
CD Visibility est en version Preview. Si cette fonctionnalité vous intéresse, remplissez le formulaire pour demander l'accès.
{{< /callout >}}

## Présentation

Les vues enregistrées vous permettent de conserver des données de la [page Deployment Executions][1]. Elles facilitent votre processus de dépannage en vous permettant d'accéder à des requêtes filtrées, des facettes pertinentes, des options de visualisation et un intervalle précis.

Grâce aux vues enregistrées, vous pouvez conserver les éléments suivants :

- Les résultats des déploiements et données sur l'environnement
- Les requêtes de recherche, notamment les échecs d'exécution de déploiement avec un fournisseur de CD spécifique, les échecs d'exécution de déploiement dans un environnement donné en fonction de l'état de déploiement, les exécutions de déploiement qui ont nécessité des rollbacks, et les ID ou URL de déploiement
- L'intervalle dynamique (par exemple, l'heure ou la semaine passée)
- Les visualisations, telles qu'une série temporelle, une top list, un tableau ou une liste

Les vues enregistrées vous permettent également de partager des configurations et des requêtes avec d'autres personnes.

## Vues enregistrées

Pour accéder aux vues enregistrées, développez **> Views** à gauche de la [page Deployment Executions][1].

Toutes les vues enregistrées, à l'exception de la [vue par défaut](#vues-par-defaut), sont partagées au sein de l'organisation, y compris les vues enregistrées personnalisées créées par les utilisateurs. Elles sont modifiables par toute personne de votre organisation et affichent l'avatar de l'utilisateur qui a créé la vue. Cliquez sur **Save** pour créer une vue enregistrée personnalisée à partir du contenu actuel de votre Explorer.

<div class="alert alert-info">Les utilisateurs en lecture seule ne peuvent pas modifier, renommer ni supprimer des vues enregistrées.</div>

{{< img src="continuous_delivery/explorer/saved_view.png" alt="Vue par défaut du CD Visibility Explorer" width="100%" >}}

Vous pourrez :

- Charger ou recharger une vue enregistrée
- Remplacer la configuration d'une vue enregistrée par celle de la vue active
- Renommer ou supprimer une vue enregistrée
- Partager une vue enregistrée à l'aide d'un lien simplifié
- Ajouter une vue enregistrée à vos favoris, afin de pouvoir y accéder facilement depuis la liste dédiée dans le menu de navigation

<div class="alert alert-info">Les utilisateurs en lecture seule ne peuvent pas modifier, renommer ni supprimer des vues enregistrées.</div>

## Vues par défaut

Vous pouvez définir une vue enregistrée comme page de destination par défaut sur la [page Deployment Executions][1]. Les vues par défaut sont définies par utilisateur et n'ont aucun impact sur votre organisation.

{{< img src="continuous_delivery/explorer/default_view.png" alt="Vue par défaut dans le CD Visibility Explorer" width="100%" >}}

Pour remplacer temporairement votre vue enregistrée par défaut, effectuez une action dans l'interface ou ouvrez des liens dans l'Explorer qui comprennent une configuration différente.

Vous pouvez effectuer les actions suivantes dans l'entrée de la vue par défaut du volet **Views** :

- Cliquer sur l'entrée pour recharger la vue par défaut
- Modifier votre vue par défaut en définissant les paramètres actuels
- Rétablir les valeurs par défaut de la vue par défaut, afin de repartir de zéro

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments/executions