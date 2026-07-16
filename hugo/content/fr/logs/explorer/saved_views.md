---
title: Vues enregistrées
description: Utilisez les vues enregistrées pour configurer automatiquement votre vue Log Explorer.
further_reading:
  - link: logs/explorer/analytics
    tag: Documentation
    text: Effectuer des analyses de logs
  - link: /logs/log_configuration/processors
    tag: Documentation
    text: Apprendre à traiter vos logs
---
## Présentation

Afin de résoudre efficacement vos problèmes, vous devez disposer du **contexte** approprié. Ce dernier vous permet d'explorer vos données, d'accéder aux **options de visualisation** pour afficher des informations intéressantes et d'utiliser des **[facettes][1]** pertinentes qui facilitent l'analyse.

La résolution de problèmes dépend du contexte. Les vues enregistrées permettent à tous les membres de votre équipe de passer facilement d'un contexte à l'autre. Vous pouvez accéder aux vues enregistrées dans le coin supérieur gauche du [Log Explorer][2].

{{< img src="logs/explorer/saved_views/overview.mp4" alt="Sélection de vues enregistrées" video=true style="width:90%;" >}}

Techniquement, une vue enregistrée permet de surveiller les éléments suivants :

- Une [requête de recherche][3] ainsi que son intervalle. **Remarque** : les vues enregistrées sont destinées à la surveillance d'intervalles de temps dynamiques (tels que la dernière heure ou la dernière semaine). Les intervalles fixes sont donc convertis en intervalles dynamiques après enregistrement.
- Une visualisation par défaut personnalisée ([flux de logs][4], [pattern de logs][5] ou [analyse de logs][6] avec leurs propriétés de visualisation spécifiques).
- Un [sous-ensemble de facettes][1] à afficher dans la liste de facettes.

## Vue par défaut

{{< img src="logs/explorer/saved_views/default.png" alt="Vue par défaut" style="width:50%;" >}}

La vue que vous utilisez dans le Log Explorer est votre vue enregistrée par défaut. Vous seul pouvez accéder à cette vue et la consulter. Toute modification de la vue n'entraîne aucune conséquence pour votre organisation.

Vous pouvez remplacer **temporairement** votre vue enregistrée par défaut en exécutant une action dans l'interface ou en ouvrant des liens vers le Log Explorer qui comprennent une configuration différente.

Vous pouvez exécuter les actions suivantes à tout moment depuis l'entrée de la vue par défaut dans le volet des vues :

* **Recharger** votre vue par défaut en cliquant sur l'entrée.
* **Mettre à jour** votre vue par défaut avec les paramètres actuels.
* **Rétablir** votre vue par défaut sur les valeurs par défaut de Datadog, afin de repartir de zéro.

## Vues enregistrées

{{< img src="logs/explorer/saved_views/custom.png" alt="Vues enregistrées de toute l'organisation" style="width:50%;" >}}

En dehors de votre vue enregistrée par défaut, toutes les vues enregistrées sont partagées avec toute votre organisation :

* Les **vues enregistrées des intégrations** sont fournies par défaut avec la majorité des [intégrations Log Management][7] de Datadog. Elles peuvent uniquement être consultées et sont identifiées par le logo de l'intégration.
* Les **vues enregistrées personnalisées** sont créées par les utilisateurs. Elles peuvent être modifiées par n'importe quel utilisateur de votre organisation (à l'exception des [utilisateurs en lecture seule][8]) et sont identifiées par l'avatar de l'utilisateur qui les a créées. Cliquez sur le bouton d'**enregistrement** pour créer une vue enregistrée personnalisée à partir du contenu actuel de votre vue Log Explorer.

{{< img src="logs/explorer/saved_views/save.png" alt="Enregistrement des logs" style="width:30%;" >}}

Vous pouvez exécuter les actions suivantes à tout moment depuis l'entrée de la vue enregistrée dans le volet des vues :

* **Charger** ou **recharger** une vue enregistrée.
* **Mettre à jour** une vue enregistrée avec la configuration de la vue actuelle.
* **Renommer** ou **supprimer** une vue enregistrée.
* **Partager** une vue enregistrée à l'aide d'un lien simplifié.
* **Ajouter une étoile** à une vue enregistrée pour qu'elle fasse partie de vos favoris. Les vues enregistrées favorites s'affichent en haut de votre liste de vues enregistrées et sont directement accessibles à partir du menu de navigation.

{{< img src="logs/explorer/saved_views/star.png" alt="Vues favorites" style="width:50%;" >}}

*Remarque* : les actions de mise à jour, de renommage et de suppression sont désactivées pour les vues enregistrées des intégrations et les [utilisateurs en lecture seule][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/facets/
[2]: /fr/logs/explorer
[3]: /fr/logs/explorer/search/
[4]: /fr/logs/explorer/?tab=logstream#visualization
[5]: /fr/logs/explorer/patterns/
[6]: /fr/logs/explorer/analytics/
[7]: /fr/integrations/#cat-log-collection
[8]: /fr/account_management/rbac/permissions?tab=ui#general-permissions