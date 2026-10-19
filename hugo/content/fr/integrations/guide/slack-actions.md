---
description: Utilisez les actions Slack pour gérer les incidents, les astreintes,
  les monitors, les dashboards, les workflows, les formulaires et les comptes directement
  depuis un espace de travail Slack où l'application Datadog est installée.
further_reading:
- link: /integrations/slack/?tab=datadogforslack
  tag: Documentation
  text: Intégration Slack
title: Actions Slack
---
## Présentation {#overview}

Les actions Slack sont disponibles dans tout espace de travail Slack où l'application Datadog est installée. Tapez `/dd` dans l'espace de travail pour ouvrir un tiroir d'actions répertoriant toutes les actions disponibles. Alternativement, tapez la commande complète directement.

## Incidents {#incidents}
Utilisez les commandes suivantes pour la navigation dans les incidents. Toutes les commandes peuvent utiliser `/dd in` comme alias pour `/dd incident`. Pour plus de détails, consultez [Intégrez Slack à Datadog Incident Management][2].

| Commande | Description|
| ------------------ | ---------- |
| `/dd in` ou `/dd incident` | Déclarez un incident.|
| `/dd in test` | Déclarez un incident de test.|
| `/dd in update` ou `/dd in edit`| Mettez à jour le titre, l'état, la gravité et les attributs de l'incident.|
| `/dd in responders`| Gérez l'équipe d'intervention de l'incident.|
| `/dd in investigate` | Déclenchez Bits Investigation. |
| `/dd in summary` | Générez le résumé de l'incident avec l'IA. Non disponible dans les régions Gov et Gov2.|
| `/dd in notify` | Notifiez les @-handles concernant l'incident. |
| `/dd in list` | Listez les incidents ouverts.|
| `/dd in private`| Archivez le canal actuel, créez un canal privé et ajoutez tous les intervenants existants.|
| `/dd in public` | Rendez l'incident et sa chronologie visibles par toute personne disposant des autorisations de lecture d'incident. |
| `/dd followup` | Créez un nouveau suivi.|
| `/dd followup list`  | Listez les suivis d'incident.|
| `/dd task` | Créez une tâche d'incident.|
| `/dd task list` | Listez les tâches d'incident.|
| `/dd shortcuts` | Affichez les actions d'incident.|

## On-Call {#on-call}
Utilisez les commandes suivantes pour On-Call. Pour plus de détails, consultez [On-Call Pages][3].

| Commande | Description|
| ------------------ | ---------- |
| `/dd page` | Alertez une équipe d'astreinte.|
| `/dd shifts`| Consultez vos prochaines périodes d'astreinte.|
| `/dd override`| Demandez à quelqu'un de remplacer une période d'astreinte. |

## monitors {#monitors}
Utilisez les commandes suivantes pour les monitors. Pour plus d'informations sur l'ajout de Slack aux monitors, consultez [Monitor Notifications][4].

| Commande | Description|
| ------------------ | ---------- |
| `/dd monitors` | Listez les monitors qui envoient actuellement des alertes.|


## Dashboard {#dashboard}
Utilisez les commandes suivantes pour les [Dashboards][5].

| Commande | Description|
| ------------------ | ---------- |
| `/dd dashboard` | Partagez un widget de dashboard dans ce canal.|


## Workflows {#workflows}
Utilisez les commandes suivantes pour les workflows. Pour plus d'informations sur l'utilisation de Slack dans les workflows, consultez [Déclencher un workflow][6].

| Commande | Description|
| ------------------ | ---------- |
| `/dd workflow` | Exécutez un workflow d'automatisation.|


## Forms {#forms}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">
L'action Slack <strong>Share a Form</strong> n'est pas prise en charge dans le {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

Utilisez les commandes suivantes pour Forms. Pour plus d'informations, consultez [Forms][8].

| Commande | Description|
| ------------------ | ---------- |
| `/dd`, puis sélectionnez **Share a Form** |  Recherchez un formulaire Datadog et partagez-le dans ce canal, où les destinataires peuvent le remplir dans Slack ou l'ouvrir dans Datadog. |


## Accounts {#accounts}
Utilisez les commandes suivantes pour la [gestion de compte][7].

| Commande | Description|
| ------------------ | ---------- |
| `/dd accounts` | Gérez vos comptes Datadog associés. |


[1]: /fr/integrations/slack/?tab=datadogforslack
[2]: /fr/incident_response/incident_management/setup_and_configuration/integrations/slack/#slack-commands
[3]: /fr/incident_response/on-call/pages/#through-slack
[4]: /fr/monitors/notify/#notification-recipients
[5]: /fr/dashboards/
[6]: /fr/actions/workflows/trigger/#slack-triggers
[7]: /fr/account_management/
[8]: /fr/actions/forms/