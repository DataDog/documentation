---
aliases:
- /fr/incident_response/incident_management/setup_and_configuration/responder_types/
- /fr/service_management/incident_management/incident_settings/responder_types/
- /fr/incident_response/incident_management/incident_settings/responder_types
further_reading:
- link: /incident_response/incident_management/investigate/describe/#response-team
  tag: Documentation
  text: Décrivez un incident
title: Rôles de répondant
---
## Présentation {#overview}

L'attribution de rôles spécifiques tels que commandant d'incident ou responsable des communications permet une réponse plus organisée et structurée. Les notifications et les responsabilités peuvent être dirigées immédiatement vers les personnes appropriées, ce qui aide à réduire la confusion et les retards.

Les paramètres des rôles de répondant vous permettent de créer des rôles personnalisés à [attribuer à vos répondants d'incident][1] et de préciser si ces rôles doivent être occupés par une seule personne ou par plusieurs personnes par incident. Ces rôles ne sont pas liés au système de [contrôle d'accès basé sur les rôles (RBAC)][2].

## Rôles {#roles}

Les rôles de répondant aident vos répondants à comprendre quelles sont leurs responsabilités dans un incident en fonction des définitions de votre propre processus de réponse aux incidents. Par défaut, il existe deux rôles :

1. `Incident Commander` - La personne responsable de diriger l'équipe de réponse
2. `Responder` - Une personne qui contribue activement à enquêter sur un incident et à résoudre le problème sous-jacent

**Remarque :** Le rôle de répondant `Incident Commander` apparaît dans les paramètres d'incident afin que vous puissiez personnaliser sa description. `Incident Commander` ne peut pas être supprimé en tant que rôle de répondant, et son nom ou son statut de `One person role` ne peuvent pas être modifiés. Le rôle `Responder` est un rôle de secours générique si aucun autre rôle n'est attribué à un répondant, et il n'apparaît pas dans les paramètres d'incident.

## Créer un rôle de répondant {#create-a-responder-role}

1. Accédez à [**Paramètres d'incident > Rôles de répondant**][3].
1. Cliquez sur **+ Ajouter un rôle de répondant**, sous le tableau.
2. Donnez un nom à votre nouveau rôle de répondant.
3. Choisissez si le rôle de répondant est un `One person role` ou un `Multi person role`. Un `One person role` peut être occupé par une seule personne par incident, tandis qu'un `Multi person role` peut être occupé par un nombre illimité de personnes par incident.
4. Donnez une description au rôle de répondant. Cette description apparaît dans l'interface utilisateur pour sélectionner un rôle à attribuer à vos collaborateurs.
5. Cliquez sur **Enregistrer**.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/incident_response/incident_management/investigate/response_team
[2]: /fr/account_management/rbac/?tab=datadogapplication#pagetitle
[3]: https://app.datadoghq.com/incidents/settings#Responder-Types