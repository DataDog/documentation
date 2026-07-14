---
aliases:
- /fr/./track_dashboard_usage/
description: Utilisez Audit Trail pour suivre l'utilisation des dashboards, les modèles
  d'accès et les modifications de configuration avec la surveillance des requêtes
  API et l'inspection des différences.
disable_toc: false
further_reading:
- link: account_management/audit_trail/
  tag: Documentation
  text: Configurer Audit Trail
title: Suivre l'accès aux dashboards et les modifications de configuration
---

## Présentation

Audit Trail offre aux administrateurs Datadog une visibilité sur qui, au sein de l'organisation, utilise Datadog et comment il l'utilise. Ce guide explique comment afficher les informations d'utilisation pour un dashboard spécifique.

## Afficher les informations d'utilisation pour un dashboard spécifique

### Obtenir l'ID du dashboard

Vous avez besoin de l'ID du dashboard pour obtenir les informations d'utilisation de ce dashboard.

1. Accédez à [Dashboards][1].
1. Sélectionnez votre dashboard.
1. L'ID du dashboard se trouve dans l'URL du dashboard, après `https://app.datadoghq.com/dashboard/`. Par exemple, si l'URL du dashboard est `https://app.datadoghq.com/dashboard/pte-tos-7kc/escalations-report`, l'ID du dashboard est `pte-tos-7kc`.
1. Copiez l'ID du dashboard.

### Consulter l'utilisation du dashboard dans Audit Trail

Pour afficher des informations sur l'utilisation du dashboard, utilisez Audit Trail afin de rechercher toutes les requêtes API `GET` pour l'ID de ce dashboard.

1. Accédez à [Audit Trail][2].
2. Dans la barre de recherche, saisissez la requête : `@http.status_code:200 @http.method:GET @http.url_details.path:/api/v1/dashboard/<dashboard_id>`. Remplacez `<dashboard_id>` par l'ID du dashboard que vous avez copié précédemment.<br>Par exemple, si l'ID du dashboard est `pte-tos-7kc`, la requête se présente comme suit :
{{< img src="account_management/audit_logs/dashboard_access_query.png" alt="Requête de recherche pour toutes les requêtes GET réussies pour l'ID de dashboard pte-tos-7kc" style="width:100%;" >}}
`@http.status_code:200` réduit les résultats aux seules requêtes acceptées.
<br>**Remarque** : vous pouvez également utiliser le panneau de facettes situé à gauche de la page pour formuler la requête de recherche.
3. Sélectionnez la plage temporelle en haut à droite de la page pour voir les événements sur une période spécifique.
4. Vous pouvez configurer la section **Group into fields** et sélectionner différents outils de visualisation pour ventiler et analyser les données selon votre cas d'utilisation. Par exemple, si vous définissez le champ `group by` sur `User Email` et cliquez sur **Top List** dans la section **Visualize as**, vous obtenez une liste des principaux utilisateurs ayant accédé au dashboard.
5. Consultez [Créer un dashboard ou un graphique][3] si vous souhaitez intégrer ces informations dans un dashboard ou un graphique.

## Afficher les modifications récentes de la configuration du dashboard

Vous pouvez utiliser des [requêtes d'événements][7] dans Audit Trail pour afficher la liste des dashboards ayant récemment subi des modifications de configuration.

1. Accédez à [Audit Trail][2].
1. Dans le champ **Search for**, collez une requête pour filtrer le type de modifications que vous souhaitez voir. Voici quelques exemples courants :

   | Événement d'audit                       | Requête dans l'audit explorer                                      |
   |-----------------------------------|--------------------------------------------------------------|
   | [Dashboards récemment créés][4] | `@evt.name:Dashboard @asset.type:dashboard @action:created` 
   | [Dashboards récemment modifiés][5] | `@evt.name:Dashboard @asset.type:dashboard @action:modified` |
   | [Dashboards récemment supprimés][6]  | `@evt.name:Dashboard @asset.type:dashboard @action:deleted`  |

1. Facultativement, dans le panneau de facettes, utilisez des filtres comme **Asset ID** ou **Asset Name** pour restreindre vos résultats à un dashboard spécifique.
1. Pour chaque événement du tableau, vous pouvez voir l'adresse e-mail de l'utilisateur qui a effectué la dernière modification, ainsi qu'un résumé de ce qui s'est passé.

   Pour voir des informations supplémentaires sur une modification spécifique, cliquez sur la ligne correspondante dans le tableau. Puis, cliquez sur l'onglet **Inspect Changes (Diff)** pour voir les changements apportés à la configuration du dashboard :

   {{< img src="account_management/audit_logs/dashboard_change_diff.png" alt="Un diff texte montrant l'ajout d'un nouveau widget au dashboard" style="width:100%;" >}}

1. Consultez [Créer un dashboard ou un graphique][3] si vous souhaitez intégrer ces informations dans un dashboard ou un graphique.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/audit-trail
[3]: /fr/account_management/audit_trail/#create-a-dashboard-or-a-graph
[4]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Acreated
[5]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Amodified
[6]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Adeleted
[7]: /fr/account_management/audit_trail/events