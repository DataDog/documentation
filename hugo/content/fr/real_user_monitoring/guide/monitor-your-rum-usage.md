---
description: Découvrez comment surveiller votre utilisation du RUM et recevoir des
  alertes relatives aux pics imprévus et aux atteintes de seuils imminentes.
further_reading:
- link: /real_user_monitoring/
  tag: Documentation
  text: En savoir plus sur le Real User Monitoring
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Apprendre à effectuer des requêtes dʼévènements du RUM
- link: /monitors/
  tag: Documentation
  text: En savoir plus sur les monitors

title: Surveiller votre utilisation du RUM
---

## Présentation

Le but de ce guide est dʼexpliquer comment surveiller votre utilisation du RUM avec : 

- La métrique relative à lʼestimation de votre utilisation du RUM
- Les évènements du RUM stockés via votre compte

Ce guide explique comment suivre le nombre de sessions du RUM effectuées dans le cadre dʼun SKU ou dʼune application spécifique, comment recevoir des alertes en cas de pics imprévus au niveau du trafic, ou si vous vous approchez dʼun certain seuil budgétaire lors de vos sessions.

## Métriques relatives à lʼutilisation du RUM

Cette métrique est gratuite et disponible pendant 15 mois.

{{< img src="real_user_monitoring/guide/monitor-your-rum-usage/estimated-usage-metric-details.png" alt="Volet latéral relatif aux détails des métriques relatives à lʼestimation de lʼutilisation" style="width:90%" >}}

Par défaut, vous pouvez utiliser la [métrique][1] `datadog.estimated_usage.rum.sessions` pour surveiller le nombre de sessions dʼutilisateurs avec les informations suivantes :

- ID dʼapplication : identifie lʼapplication disponible sur la page **Présentation de l'application** 
- Service : contexte au sein dʼune application RUM appartenant à une certaine équipe.
- Source : le langage de programmation ou le cadre d'application utilisé. 
- SKU : l'abonnement payant comprenant la session.

### Le suivi du nombre de sessions pour une application

Pour suivre le nombre de sessions générées par une application RUM, accédez à la [liste de dashboards][2] et sélectionnez un dashboard pour suivre la tendance de votre utilisation du RUM.

1. Cliquez sur **+ Add Widgets** pour ouvrir le volet latéral relatif aux widgets et aux apps.
2. Sélectionnez **Timeseries** sous **Graphs**.
3. Dans la section **Graph your data**, sélectionnez **Metrics** et `datadog.estimated_usage.rum.sessions` dans les menus déroulants.
4. Dans la clause `from`, sélectionnez lʼID dʼapplication que vous souhaitez suivre. LʼID dʼapplication du RUM est disponible à la page **Présentation de lʼapplication** qui lui est dédiée. 
5. Définissez vos préférences en matière dʼaffichage et saisissez un nom pour votre graphique.
6. Cliquez sur **Save**.

### Suivre le nombre de sessions facturées dans le cadre dʼun SKU

Pour suivre le nombre de sessions facturées dans le cadre dʼun SKU de RUM, accédez à la [liste de dashboards][2] et sélectionnez un dashboard afin de suivre les tendances de votre utilisation du RUM.

1. Cliquez sur **+ Add Widgets** pour ouvrir le volet latéral relatif aux widgets et aux apps
2. Sélectionnez **Timeseries** sous **Graphs**.
3. Dans la section **Graph your data**, sélectionnez **Metrics** et `datadog.estimated_usage.rum.sessions` dans les menus déroulants.
4. Dans la clause `sum`, sélectionnez le tag `sku` dans le menu déroulant 
5. Définissez vos préférences en matière dʼaffichage et saisissez un nom pour votre graphique.
6. Cliquez sur **Save**.

## Recevoir une alerte en cas de pic imprévu

Vous pouvez utiliser la métrique RUM dans les [monitors de détection dʼanomaies][3].

{{< img src="real_user_monitoring/guide/monitor-your-rum-usage/anomaly-monitor-notification.png" alt="Exemple de message de notification dans le monitor dʼanomalies" style="width:90%" >}}

Pour créer un monitor de détection dʼanomalies afin de recevoir des alertes en cas de hausses imprévues du nombre de sessions :

1. Accédez à la page **Présentation de lʼapplication** de votre application RUM et copiez lʼID de lʼapplication.
2. [Créer un monitor dʼanomalie][4].
3. Sélectionnez la métrique `datadog.estimated_usage.rum.sessions` dans le menu déroulant.
4. Dans la clause `from`, saisissez lʼ`application.id` afin de recevoir une notification si votre application RUM rencontre un pic de trafic ou cesse de recevoir des évènements.
5. Définissez la condition de lʼalerte de façon à ce quʼelle corresponde à votre cas. Par exemple, une fenêtre dʼévaluation ou le nombre dʼoccurrences se situant en dehors dʼun certain intervalle.
6. Définissez un message de notification avec des instructions claires.

   Cet exemple de message de notification contient des liens avec du contexte :

   ```
   An unexpected amount of sessions has been captured for application.id {{application.id}}.

   1. [Check the session count in the RUM Explorer for this application](https://app.datadoghq.com/rum/explorer?query=%40type%3Asession%20%40application.id%{{application.id}}&viz=timeseries&from_ts=1649824870521&to_ts=1649828470521&live=true).
   2. [Investigate whether this session count is unexpected in a specific geography or device using the query engine](https://docs.datadoghq.com/real_user_monitoring/explorer/group/).
   ```

7. Définissez des autorisations et des réglages relatifs aux notifications pour ce monitor.
8. Cliquez sur **Create**.

## Surveiller des sessions du RUM avec un seuil fixe

{{< img src="real_user_monitoring/guide/monitor-your-rum-usage/anomaly-monitor-notifications-warning-rate.png" alt="Exemple de message de notification avec des seuils dʼavertissements dans le monitor dʼanomalies" style="width:90%" >}}

Pour créer un monitor de détection des anomalies et recevoir une alerte lorsque le nombre de sessions devient trop élevé de façon imprévue et sʼapproche dʼun certain seuil :

1. Accédez à la vue  [RUM Explorer de Datadog][5].
2. Créez une requête de recherche qui représente le volume à surveiller. Pour surveiller toutes les sessions dʼutilisateur, ne remplissez pas la requête.
3. Cliquez sur **Export to monitor**.
4. Définissez un seuil dʼavertissement pour `warning` ou `error`.
5. Définissez un message de notification concret.

   Cet exemple de message de notification contient des instructions réalisables :

   ```
   Shopist.io is sending too many user sessions. Go to the application's codebase and decrease the sample rate. Here is the (documentation)[https://docs.datadoghq.com/real_user_monitoring/guide/sampling-browser-plans] for how to do so.

   {{#is_warning}}@slack-Shopist-alerts {{/is_warning}}

   {{#is_alert}}@pagerduty-shopist{{/is_alert}}
   ```

6. Définissez des autorisations et des réglages relatifs aux notifications pour ce monitor.
7. Cliquez sur **Create**.

Vous recevez une notification relative au nombre de sessions relevées pour nʼimporte quel contexte (comme `application.id`, `geography`, `device`, entre autres) pour votre application.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/billing/usage_metrics/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /fr/monitors/types/anomaly/
[4]: https://app.datadoghq.com/monitors#create/anomaly
[5]: https://app.datadoghq.com/rum/explorer?query=%40type%3Asession