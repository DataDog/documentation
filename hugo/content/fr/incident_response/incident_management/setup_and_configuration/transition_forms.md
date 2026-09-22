---
description: Invitez les intervenants en cas d'incident à remplir des champs spécifiques
  lors des changements de statut.
title: Formulaires de transition
---
## Présentation {#overview}

Chaque fois qu'un incident progresse via des changements de statut, vous pouvez guider les intervenants pour qu'ils remplissent des champs sur l'incident à l'aide de formulaires de transition. Ces formulaires aident à garantir que les informations sur l'incident sont collectées au bon moment dans le processus de réponse aux incidents.

{{< img src="/incident_response/incident_management/setup_and_configuration/status_transition_form.png" alt="Formulaire de changement de statut invitant l'utilisateur à remplir les champs obligatoires Teams et Postmortem Owner lors du passage d'un incident à Résolu." style="width:70%;" >}}

## Prérequis {#prerequisites}

Pour configurer des formulaires de transition, vous devez disposer de l'autorisation `Incident Settings Write`. Pour plus d'informations, consultez [Datadog Role Permissions][1].

## Configurer un formulaire de transition {#configure-a-transition-form}

1. Dans Datadog, accédez à **Incidents** > [**Settings**][2].
1. Sous **Incident Types**, développez un type d'incident pour le modifier.
1. Cliquez sur l'onglet **Transition Forms**.
1. Sélectionnez le statut que vous souhaitez configurer.
1. Choisissez les champs qui apparaissent sur le formulaire. Vous pouvez ajouter des [champs de propriété][3] et des [types d'intervenants][4]. Tout champ peut être marqué comme obligatoire ou facultatif.
1. Cliquez sur **Enregistrer**.

[1]: /fr/account_management/rbac/permissions/#case-and-incident-management
[2]: https://app.datadoghq.com/incidents/settings
[3]: /fr/incident_response/incident_management/setup_and_configuration/property_fields
[4]: /fr/incident_response/incident_management/setup_and_configuration/responder_types