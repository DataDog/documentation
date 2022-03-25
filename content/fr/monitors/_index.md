---
title: Alertes
kind: documentation
disable_sidebar: true
aliases:
  - /fr/guides/monitors/
  - /fr/guides/monitoring/
  - /fr/guides/alerting/
  - /fr/guides/monitors/the-conditions
description: Créez des monitors, informez vos équipes dès que nécessaire et gérez vos monitors grâce à la plateforme d'alertes
further_reading:
  - link: https://www.datadoghq.com/blog/monitoring-101-alerting/
    tag: Blog
    text: "Monitoring 101\_: définir des alertes pertinentes"
  - link: /api/v1/monitors/
    tag: Documentation
    text: API Monitors Datadog
---
Pour surveiller l'ensemble de votre infrastructure depuis un seul endroit, vous devez recevoir des notifications lorsque des modifications critiques se produisent. Datadog vous permet de créer des monitors qui vérifient activement vos métriques, les disponibilités de vos intégrations, les endpoints réseau, et plus encore.

Configurez des monitors, informez vos équipes et gérez les alertes d'un simple coup d'œil sur la plateforme d'alertes.

## Créer des monitors

{{< img src="/monitors/create.png" alt="Créer un monitor" style="width:90%;">}}

[Configurez des monitors][1] : créez des monitors qui surveillent des métriques, des événements, des logs, la disponibilité d'intégrations, des endpoints réseau, et plus encore.

## Informer vos équipes

{{< img src="/monitors/notify.png" alt="Envoyer des notifications lorsqu'un monitor génère des alertes" style="width:90%;">}}

[Notifications des monitors][2] : configurez des notifications lors de la création de monitors pour prévenir votre équipe en cas de problème. Transmettez les notifications aux personnes adéquates, tirez profit des template variables pour inclure des informations détaillées et joignez des snapshots aux alertes envoyées par e-mail ou via Slack. Créez des [downtimes][3] pour désactiver les alertes lors de la maintenance de votre application.

## Gérer les monitors

{{< img src="/monitors/manage.png" alt="Gérer les alertes de tous les monitors" style="width:90%;">}}

[Gérez les monitors][4] : modifiez, dupliquez, supprimer, désactivez et rétablissez des monitors depuis une interface unique. Pour vous concentrer sur les alertes prioritaires, utilisez la recherche à facettes avancée. Parcourez les détails des monitors et l'évolution des alertes sur la page Monitor Status.

## Autres sections

{{< whatsnext desc=" ">}}
    {{< nextlink href="/monitors/service_level_objectives" >}}<u>Service Level Objectives</u> : créez, modifiez ou visualisez vos SLO grâce à des métriques ou des monitors Datadog existants{{< /nextlink >}}
    {{< nextlink href="/monitors/incident_management" >}}<u>Gestion des incidents</u> : déclarez et gérez des incidents.{{< /nextlink >}}
    {{< nextlink href="/monitors/guide" >}}<u>Guides</u> : articles d'aide supplémentaires à propos des monitors et des alertes{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/create
[2]: /fr/monitors/notify
[3]: /fr/monitors/notify/downtimes
[4]: /fr/monitors/manage