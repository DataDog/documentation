---
description: Utilisez Audit Trail pour surveiller les modèles d'utilisation, les modifications
  de configuration et l'historique d'accès de monitors spécifiques grâce au suivi
  des API et aux vues diff.
disable_toc: false
further_reading:
- link: account_management/audit_trail/
  tag: Documentation
  text: Configurer Audit Trail
title: Suivre l'accès aux monitors et les modifications de configuration
---

## Présentation

Audit Trail offre aux administrateurs Datadog une visibilité sur qui, au sein de l'organisation, utilise Datadog et comment il l'utilise. Ce guide explique comment afficher les informations d'utilisation pour un monitor spécifique.

## Consulter les informations sur l'utilisation d'un monitor spécifique

### Obtenir l'ID du monitor

Vous avez besoin de l'ID du monitor pour obtenir les informations d'utilisation de ce monitor.

1. Accédez à [Monitors][1].
1. Sélectionnez votre monitor.
1. L'ID du monitor se trouve dans l'URL du monitor, après `https://app.datadoghq.com/monitors/`. Par exemple, si l'URL du monitor est `https://app.datadoghq.com/monitors/123456789`, l'ID du monitor est `123456789`.
1. Copiez l'ID du monitor.

### Consulter l'utilisation du monitor dans Audit Trail

Pour afficher des informations sur l'utilisation du monitor, utilisez Audit Trail afin de rechercher toutes les requêtes API `GET` pour l'ID de ce monitor.

1. Accédez à [Audit Trail][2].
2. Dans la barre de recherche, saisissez la requête : `@http.status_code:200 @http.method:GET @http.url_details.path:/api/v1/monitor/<monitor_id>`. Remplacez `<monitor_id>` par l'ID du monitor que vous avez copié précédemment.

   Par exemple, si l'ID du monitor est `123456789`, la requête doit être `@http.status_code:200 @http.method:GET @http.url_details.path:/api/v1/Monitor/123456789`. `@http.status_code:200` réduit les résultats aux seules requêtes acceptées.

   **Remarque** : vous pouvez également utiliser le panneau de facettes situé à gauche de la page pour formuler la requête de recherche.
3. Sélectionnez la plage temporelle en haut à droite de la page pour voir les événements sur une période spécifique.
4. Vous pouvez configurer la section **Group into fields** et sélectionner différents outils de visualisation pour ventiler et analyser les données selon votre cas d'utilisation. Par exemple, si vous définissez le champ `group by` sur `User Email` et cliquez sur **Top List** dans la section **Visualize as**, vous obtenez une liste des principaux utilisateurs ayant accédé au monitor.
5. Consultez [Créer un dashboard ou un graphique][3] si vous souhaitez intégrer ces informations dans un dashboard ou un graphique.

## Afficher les modifications récentes de la configuration du monitor

Vous pouvez utiliser des [requêtes d'événements][8] dans Audit Trail pour afficher la liste des monitors ayant récemment subi des modifications de configuration.

1. Accédez à [Audit Trail][2].
1. Dans le champ **Search for**, collez une requête pour filtrer le type de modifications que vous souhaitez voir. Voici quelques exemples courants :

   | Événement d'audit | Requête dans l'audit explorer  |
   |-----------------------|----------------------------------------------------------|
   | [Monitor créé][4]  | `@evt.name:Monitor @asset.type:monitor @action:created`  |
   | [Monitor modifié][5] | `@evt.name:Monitor @asset.type:monitor @action:modified` |
   | [Monitor supprimé][6]  | `@evt.name:Monitor @asset.type:monitor @action:deleted`  |
   | [Monitor résolu][7] | `@evt.name:Monitor @asset.type:monitor @action:resolved` |

1. Facultativement, dans le panneau de facettes, utilisez des filtres comme **Asset ID** ou **Asset Name** pour restreindre vos résultats à un monitor spécifique.
1. Pour chaque événement du tableau, vous pouvez voir l'adresse e-mail de l'utilisateur qui a effectué la dernière modification, ainsi qu'un résumé de ce qui s'est passé.

   Pour voir des informations supplémentaires sur une modification spécifique, cliquez sur la ligne correspondante dans le tableau. Puis, cliquez sur l'onglet **Inspect Changes (Diff)** pour voir les changements apportés à la configuration du monitor :

   {{< img src="account_management/audit_logs/monitor_change_diff.png" alt="Un diff texte montrant l'ajout d'un tag `check_type: api` au monitor" style="width:100%;" >}}

1. Consultez [Créer un dashboard ou un graphique][3] si vous souhaitez intégrer ces informations dans un dashboard ou un graphique.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: https://app.datadoghq.com/audit-trail
[3]: /fr/account_management/audit_trail/#create-a-dashboard-or-a-graph
[4]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Acreated
[5]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Amodified
[6]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Adeleted
[7]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Aresolved
[8]: /fr/account_management/audit_trail/events/#monitor-events