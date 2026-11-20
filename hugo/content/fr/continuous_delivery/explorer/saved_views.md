---
descriptions: Learn how to create and share saved views in the CD Visibility Explorer.
further_reading:
- link: /continuous_delivery/explorer/search_syntax/
  tag: Documentation
  text: Apprenez à créer une requête de recherche
title: Saved Views
---
{{< callout btn_hidden="true" header="faux" >}}
CD Visibility est en préversion. L'accès est limité aux organisations déjà inscrites.
{{< /callout >}}

## Présentation {#overview}

Les vues enregistrées vous permettent de sauvegarder l'état de la [page Deployment Executions][1] et facilitent le dépannage en vous donnant accès à des requêtes ciblées, des facettes pertinentes, des options de visualisation et la plage temporelle.

Grâce aux vues enregistrées, vous pouvez conserver les éléments suivants :

- Résultats de déploiement et données d'environnement
- Requêtes de recherche (telles que les exécutions de déploiement ayant échoué avec un fournisseur CD spécifique, les exécutions de déploiement en échec dans un environnement donné selon leur statut de déploiement, les exécutions de déploiement ayant nécessité des retours en arrière, ainsi que les identifiants ou URL de déploiement)
- Plage temporelle en temps réel (telle que la dernière heure ou la dernière semaine)
- Visualisations (telles qu'une série temporelle, une top list, un tableau ou une liste)

Les vues enregistrées vous permettent également de partager des configurations et des requêtes avec d'autres personnes.

## Vues enregistrées {#saved-views}

Pour accéder à vos vues enregistrées, développez **> Views** sur la gauche dans la [page Deployment Executions][1].

Toutes les vues enregistrées, à l'exception de la [vue par défaut](#default-views), sont partagées au sein de l'organisation, y compris les vues enregistrées personnalisées créées par les utilisateurs. Elles sont modifiables par toute personne de votre organisation et affichent l'avatar de l'utilisateur qui a créé la vue. Cliquez sur **Save** pour créer une vue enregistrée personnalisée à partir du contenu actuel de votre Explorer.

<div class="alert alert-info">Les actions de mise à jour, de renommage et de suppression sont désactivées pour les utilisateurs en lecture seule.</div>

{{< img src="continuous_delivery/explorer/saved_view.png" alt="Vue par défaut dans le CD Visibility Explorer" width="100%" >}}

Vous pouvez effectuer les opérations suivantes :

- Charger ou recharger une vue enregistrée
- Mettre à jour une vue enregistrée avec la configuration de la vue actuelle
- Renommer ou supprimer une vue enregistrée
- Partager une vue enregistrée via un lien court
- Ajoutez une vue enregistrée aux favoris pour l'inclure dans votre liste Saved Views accessible depuis le menu de navigation

<div class="alert alert-info">Les actions de mise à jour, de renommage et de suppression sont désactivées pour les utilisateurs en lecture seule.</div>

## Vues par défaut {#default-views}

Vous pouvez définir une vue enregistrée comme page d'accueil par défaut dans la [page Deployment Executions][1]. Les vues par défaut sont définies par utilisateur et n'ont aucun impact sur votre organisation.

{{< img src="continuous_delivery/explorer/default_view.png" alt="Vue par défaut dans le CD Visibility Explorer" width="100%" >}}

Remplacez temporairement votre vue enregistrée par défaut en effectuant une action dans l'interface utilisateur ou en ouvrant des liens dans l'Explorer qui intègrent une configuration différente.

Dans l'entrée de vue par défaut du panneau **Views**, vous pouvez :

- Cliquez sur l'entrée pour recharger votre vue par défaut
- Mettez à jour votre vue par défaut avec les paramètres actuels
- Rétablissez les paramètres initiaux de votre vue par défaut pour repartir de zéro

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments/executions