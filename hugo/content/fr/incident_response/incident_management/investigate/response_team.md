---
aliases:
- /fr/service_management/incident_management/response_team/
- /fr/incident_response/incident_management/response_team
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/responder_roles
  tag: Documentation
  text: Personnalisez les rôles d'intervenant dans les paramètres d'incident
title: Équipe d'intervention
---
## Présentation {#overview}

Formez votre équipe d'intervention en ajoutant d'autres utilisateurs et en leur attribuant des rôles d'intervenant afin qu'ils sachent sur quoi ils doivent se concentrer pendant la réponse à l'incident.

## Ajout d'intervenants {#adding-responders}

Un intervenant est tout utilisateur Datadog qui participe au processus de réponse pour un incident particulier.

Lorsque vous ajoutez un intervenant à un incident :
* Datadog informe l'intervenant de l'incident par e-mail.
* Si l'incident est privé, l'intervenant peut le consulter dans Datadog.
* Si l'incident est associé à un canal Slack, les intervenants sont automatiquement ajoutés à ce canal.

Datadog ajoute également automatiquement des utilisateurs en tant qu'intervenants lorsque :
* Ils effectuent une action qui met à jour l'incident, notamment en écrivant dans la chronologie.
* Ils sont informés de l'incident via une règle de notification ou une notification d'incident manuelle.

L'onglet **Équipe d'intervention** de la page Détails de l'incident enregistre l'heure à laquelle une personne a été ajoutée à l'équipe d'intervention de l'incident. Il enregistre également l'heure à laquelle l'intervenant a effectué la dernière action affectant l'incident dans Datadog, telle que la mise à jour de ses attributs ou l'écriture dans sa chronologie.

Vous pouvez supprimer des intervenants s'ils ne sont affectés à aucun rôle d'intervenant et s'ils n'ont pas encore effectué d'actions mettant à jour l'incident.

## Affectation des rôles d'intervenant {#assigning-responder-roles}

<div class="alert alert-info">Les rôles d'intervenant ne sont pas liés au système de <a href="/account_management/rbac/?tab=datadogapplication">contrôle d'accès basé sur les rôles (RBAC)</a>. Un rôle d'intervenant dans Incident Management n'affecte pas les autorisations d'un utilisateur.</a></div>

Depuis l'onglet **Équipe d'intervention** de la page Détails de l'incident, vous pouvez modifier les rôles d'intervenant pour n'importe quel intervenant.

Vous pouvez définir des rôles d'intervenant supplémentaires, pour une ou plusieurs personnes, avec des noms et des descriptions personnalisés dans [Paramètres d'incident][1].

## Gérer les intervenants dans Slack {#managing-responders-in-slack}

Dans Slack, vous pouvez gérer les intervenants et leurs rôles d'intervenant en saisissant la commande `/dd incident responders` dans un canal d'incident. Vous pouvez également cliquer sur le bouton « Gérer les intervenants » dans le panneau d'actions de l'incident.

Lorsque vous attribuez un rôle d'intervenant, la personne assignée en est notifiée dans Slack.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/incident_response/incident_management/setup_and_configuration/responder_roles