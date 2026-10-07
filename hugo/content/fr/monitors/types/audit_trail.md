---
aliases:
- /fr/monitors/create/types/audit_logs/
- /fr/monitors/create/types/audit_trail/
description: Envoyez des alertes lorsqu'un type d'événement de journal d'audit est
  détecté ou dépasse un seuil.
further_reading:
- link: /account_management/audit_trail/
  tag: Documentation
  text: En savoir plus sur le journal d'audit
- link: /monitors/notifications/
  tag: Documentation
  text: Configurer les notifications de vos monitors
- link: /monitors/downtimes/
  tag: Documentation
  text: Planifier un downtime pour désactiver un monitor
title: Monitor de journal d'audit
---

## Présentation

Les monitors de journal d'audit vous envoient des alertes lorsqu'un type d'événement d'audit spécifique dépasse un seuil que vous avez défini sur une période donnée.

## Création d'un monitor

Pour créer un [monitor de journal d'audit][1] dans Datadog, utilisez la navigation principale : *Monitors --> New Monitor --> Audit Trail*.

### Définir la requête de recherche

Définissez une requête de recherche pour vos événements d'audit. Les requêtes de recherche respectent la même [syntaxe de recherche][2] que dans le Log Explorer.

Par exemple, si vous souhaitez recevoir une alerte lorsqu'une clé d'API spécifique effectue un certain nombre de requêtes, définissez `count by` sur l'ID de cette clé d'API, `@metadata.api_key.id`. Vous pouvez alors regrouper les données en fonction d'un ID utilisateur spécifique, `@usr.id`, ou de son adresse e-mail, `@usr.email`, pour recevoir une notification précisant l'utilisateur qui effectue la requête.

### Définir vos conditions d'alerte

Définissez un seuil d'alerte pour la valeur pertinente. Par exemple, si vous souhaitez recevoir une alerte lorsque le nombre de requêtes d'API dépasse 14, définissez le seuil d'alerte suivant : `Alert threshold > 15`. Définissez le seuil d'avertissement sur un nombre inférieur à 15 pour recevoir un avertissement avant le dépassement du seuil.

Vous pouvez également choisir de ne jamais rétablir un événement déclenché, ou de le rétablir automatiquement. Définissez une valeur entre `[Never]` (par défaut) et `After 24 Hours`.

### Say what's happening

Créez un nom de notification. Par exemple, `Seuil de requêtes d'API atteint pour {{[@usr.id].name}}`. Vous pouvez utiliser des [variables][3] pour ajouter automatiquement un nom d'utilisateur ou encore une adresse e-mail dans le titre, afin de déterminer rapidement le compte ou l'utilisateur à l'origine de l'alerte.

Créez un message pour votre monitor. Celui-ci peut inclure les étapes que votre équipe doit effectuer pour résoudre un incident, le cas échéant.

Vous pouvez ensuite sélectionner une valeur comprise entre `[Never]` et `Every 24 Hours` pour la fréquence d'envoi d'une notification, si le monitor n'a pas été rétabli. Il est également possible de définir des tags et une priorité pour afin de faciliter la mise en corrélation des données en cas d'incident.

### Informer votre équipe

Sélectionnez les services et les membres d'équipe qui recevront les notifications. Par exemple, vous pouvez envoyer une alerte à votre équipe de conformité d'astreinte avec PagerDuty, ou informer votre équipe via Slack ou par e-mail pour commencer l'évaluation de l'alerte.

Le menu déroulant `Do Not Notify` vous permet également de choisir si vous souhaitez envoyer une notification à un service ou à une équipe en cas de modification de l'alerte.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/audit
[2]: /fr/logs/explorer/search_syntax/
[3]: /fr/monitors/notify/variables/