---
further_reading:
- link: /synthetics/search/
  tag: Documentation
  text: Découvrir comment rechercher et gérer vos tests Synthetic
title: Vues enregistrées
---

## Présentation

Les vues enregistrées vous permettent de conserver l'état de la page **Search and Manage** [des tests Synthetic][1]. Elles facilitent votre processus de dépannage en vous permettant d'accéder rapidement à des requêtes filtrées, des facettes pertinentes, des [widgets de couverture de test][3] et un intervalle précis.

Les vues enregistrées vous permettent également de partager des configurations et des requêtes avec d'autres personnes.

## Créer une vue enregistrée

Pour accéder à vos vues enregistrées, développez **> Views** à gauche de **Synthetic Monitoring & Continuous Testing**, dans la [page des tests Synthetic][1]. Pour créer une vue enregistrée, effectuez une recherche dans vos tests Synthetic et cliquez sur **+ Create a New Saved View**. 

{{< img src="synthetics/search/create_a_new_saved_view.png" alt="Créer une vue enregistrée dans la page des tests Synthetic" style="width:100%" >}}

Toutes les vues enregistrées, à l'exception de la [vue par défaut](#vues-par-defaut), sont partagées au sein de l'organisation, y compris les vues personnalisées enregistrées et créées par les utilisateurs. Elles sont modifiables par tous les membres de votre organisation et affichent l'avatar de l'utilisateur qui a créé la vue. Saisissez un nom et cliquez sur **Save** pour créer une vue enregistrée à partir du contenu actuel dans la page des tests Synthetic.

Vous pouvez effectuer les opérations suivantes :

- Charger ou recharger une vue enregistrée
- Remplacer la configuration d'une vue enregistrée par celle de la vue active
- Renommer ou supprimer une vue enregistrée
- Partager une vue enregistrée à l'aide d'un lien simplifié
- Ajouter une vue enregistrée à vos favoris, afin de pouvoir y accéder facilement depuis la liste dédiée dans le menu de navigation

<div class="alert alert-info">Les utilisateurs en lecture seule ne peuvent pas modifier, renommer ni supprimer des vues enregistrées.</div>

## Vues par défaut

Vous pouvez configurer une [vue enregistrée](#creer-une-vue-enregistree) afin qu'elle s'affiche par défaut sur la [page des tests Synthetic][2]. Les vues par défaut varient pour chaque utilisateur : elles ne sont pas communes à l'ensemble de l'organisation.

Pour remplacer temporairement votre vue enregistrée par défaut, ajoutez des facettes à votre requête de recherche et cliquez sur **Update your default view**. Pour créer une vue enregistrée, cliquez sur le bouton **+ Create a New Saved View**.

{{< img src="synthetics/search/update_your_default_view.png" alt="Mettre à jour la vue par défaut dans la page des tests Synthetic" style="width:100%" >}}

Vous pouvez effectuer les actions suivantes dans l'entrée de la vue par défaut du volet **Views** :

- Cliquer sur l'entrée pour recharger la vue par défaut
- Modifier votre vue par défaut en définissant les paramètres actuels
- Rétablir les valeurs par défaut de la vue par défaut, afin de repartir de zéro

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/tests
[2]: /fr/synthetics/search/
[3]: /fr/synthetics/test_coverage/