---
aliases:
- /fr/guides/monitors/
- /fr/guides/monitoring/
- /fr/guides/alerting/
- /fr/guides/monitors/the-conditions
description: Créez des monitors, informez vos équipes dès que nécessaire et gérez
  vos monitors grâce à la plateforme d'alertes
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Alerting
  tag: Notes de version
  text: Découvrez les dernières versions des alertes Datadog (connexion à l'application
    requise).
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: Blog
  text: 'Monitoring 101 : définir des alertes pertinentes'
- link: /api/v1/monitors/
  tag: Documentation
  text: API Monitors Datadog
title: Alertes
---

## Présentation

Pour surveiller l'ensemble de votre infrastructure depuis un seul endroit, vous devez recevoir des notifications lorsque des modifications critiques se produisent. Datadog vous permet de créer des monitors qui vérifient activement vos métriques, les disponibilités de vos intégrations, les endpoints réseau, et plus encore.

Configurez des monitors, informez vos équipes et gérez les alertes d'un simple coup d'œil sur la plateforme d'alertes.

**Remarque** : consultez et recherchez vos monitors sur votre appareil mobile grâce à l'[application mobile Datadog][1], disponible sur l'[App Store d'Apple][2] et le [Google Play Store][3].

## Créer des monitors

{{< img src="/monitors/create.png" alt="Créer un monitor" style="width:90%;">}}

[Configurez des monitors][4] : créez des monitors qui surveillent des métriques, des événements, des logs, la disponibilité d'intégrations, des endpoints réseau, et plus encore.

## Informer vos équipes

{{< img src="/monitors/notify.png" alt="Envoyer des notifications lorsqu'un monitor génère des alertes" style="width:90%;">}}

[Notifications des monitors][5] : configurez des notifications lors de la création de monitors pour prévenir votre équipe en cas de problème. Transmettez les notifications aux personnes adéquates, tirez profit des template variables pour inclure des informations détaillées et joignez des snapshots aux alertes envoyées par e-mail ou via Slack. Créez des [downtimes][6] pour désactiver les alertes lors de la maintenance de votre application.

## Gérer les monitors

{{< img src="/monitors/manage.png" alt="Gérer les alertes de tous les monitors" style="width:90%;">}}

[Gérez les monitors][7] : modifiez, dupliquez, supprimez, désactivez et rétablissez des monitors depuis une interface unique. Pour vous concentrer sur les alertes prioritaires, utilisez la recherche à facettes avancée. Parcourez les détails des monitors et étudiez l'évolution des alertes sur la page Monitor Status.

## Consulter et rechercher des monitors sur des appareils mobiles

[Monitors adaptés aux appareils mobiles sous iOS et Android][8] : consultez, désactivez et réactivez des monitors depuis n'importe quel appareil iOS ou Android grâce à l'[application mobile Datadog][1], disponible sur l'[App Store d'Apple][2] et le [Google Play Store][3]. Saisissez des requêtes dans la barre de recherche pour filtrer les monitors en temps réel. Utilisez des [vues enregistrées de monitor][9] pour accéder en quelques secondes à un ensemble de monitors sur votre appareil mobile.

{{< img src="monitors/monitors_mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Monitors sur l'application mobile">}}

## Autres sections

{{< whatsnext desc=" ">}}
    {{< nextlink href="/monitors/service_level_objectives" >}}<u>Service Level Objectives</u> : créez, modifiez ou visualisez vos SLO grâce à des métriques ou des monitors Datadog existants{{< /nextlink >}}
    {{< nextlink href="/monitors/incident_management" >}}<u>Gestion des incidents</u> : déclarez et gérez des incidents.{{< /nextlink >}}
    {{< nextlink href="/monitors/guide" >}}<u>Guides</u> : articles d'aide supplémentaires à propos des monitors et des alertes{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/mobile
[2]: https://apps.apple.com/app/datadog/id1391380318
[3]: https://play.google.com/store/apps/details?id=com.datadog.app
[4]: /fr/monitors/create
[5]: /fr/monitors/notify
[6]: /fr/monitors/notify/downtimes
[7]: /fr/monitors/manage
[8]: /fr/mobile/?tab=ios#monitors
[9]: /fr/monitors/manage/search/#saved-view