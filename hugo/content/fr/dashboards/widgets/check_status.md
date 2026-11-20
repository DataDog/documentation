---
aliases:
- /fr/graphing/widgets/check_status/
description: Représentez graphiquement le statut actuel ou le nombre de résultats
  associés à n'importe quel check réalisé.
further_reading:
- link: /extend/service_checks
  tag: Documentation
  text: En savoir plus sur les checks de service
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
title: Widget Statut de check
widget_type: check_status
---

Les checks de service surveillent le statut actif ou inactif d'un service spécifique. Des alertes sont déclenchées lorsque l'Agent de surveillance ne parvient pas à se connecter au service lors d'un nombre défini de checks consécutifs. Le widget Check Status peut afficher visuellement une dégradation de service, des pannes de service, des problèmes à l'échelle du cluster, des baisses de débit ou des augmentations de latence dans votre dashboard. Pour plus d'informations, consultez la documentation sur les [checks de service][1].

Le widget Statut de check affiche le statut actuel ou le nombre de résultats associés à n'importe quel check réalisé :

{{< img src="dashboards/widgets/check_status/check_status.png" alt="Widget Statut de check" >}}

## Configuration

### Configuration

1. Sélectionnez un [check de service][1] créé précédemment.
2. Choisissez un intervalle de transmission. Cet intervalle est toujours basé sur l'heure actuelle. Vous pouvez donc choisir une option comme `The past 10 minutes` (les 10 dernières minutes) ou `The past 1 day` (le dernier jour) pour afficher un statut pour cet intervalle. Si vous choisissez l'option `Global Time`, l'utilisateur du dashboard peut sélectionner une plage à l'aide du sélecteur temporel en haut à droite, mais _celle-ci doit également être basée sur l'heure actuelle_ (par exemple, les X dernières heures ou les X derniers jours), sans quoi le widget n'affiche aucune donnée.
3. Sélectionnez votre contexte :
    * **A single check** : sélectionnez cette option si votre widget Statut de check est dédié à un élément en particulier, par exemple `host:<HOSTNAME>` ou `service:<NOM_SERVICE>`.
    * **A cluster of checks** : sélectionnez cette option si votre widget Statut de check est dédié à un ensemble d'éléments, par exemple à l'ensemble des `host` ou des `service`.

4. Terminez ensuite de définir le contexte de votre widget Statut de check en renseignant le champ **Reported by**.
5. Pour le périmètre **A Cluster of checks**, vous avez la possibilité de sélectionner un sous-ensemble avec le champ **Group by**. **Remarque** : le statut du check ne vous indique pas le nombre de checks par groupe, mais le nombre de groupes exécutant le check. Par exemple, si vous surveillez Agent Up, groupé par `env`, le statut du check vous indique le nombre d'`env` correspondant à vos configurations de périmètre et exécutant l'Agent, et non le nombre d'Agents dans un environnement.

## API

Ce widget peut être utilisé avec l'**[API Dashboards][2]**. Le tableau ci-dessous définit le [schéma JSON du widget][3] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/extend/service_checks
[2]: /fr/api/latest/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/