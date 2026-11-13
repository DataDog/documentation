---
aliases:
- /fr/monitors/incident_management/notification_rules
- /fr/monitors/incident_management/incident_settings
- /fr/service_management/incident_management/incident_settings/
- /fr/incident_response/incident_management/incident_settings
description: Configurer et personnaliser l'expérience Incident Management
title: Installation et configuration
---
## Présentation {#overview}

Utilisez [Incident Settings][1] pour personnaliser les aspects de l'expérience Incident Management pour l'ensemble de votre organisation. Ces paramètres vous permettent d'aligner votre utilisation d'Incident Management sur vos processus existants.

## Types d'incidents {#incident-types}

Les types d'incidents vous permettent d'appliquer différents paramètres à différentes classes d'incidents. La réponse à un incident de sécurité peut être très différente de la réponse à une interruption de service. Avec les types d'incidents, vous pouvez personnaliser chaque réponse.

Pour créer un type d'incident :
1. Accédez à la page [Incidents Settings][1].
1. Cliquez sur **Add Incident Type**.
1. Spécifiez un nom de type d'incident.
1. (Facultatif) Ajoutez une description.

## Paramètres globaux {#global-settings}

| Paramètre     | Description    |
| ---  | ----------- |
| Dashboard Analytics | Personnalisez le dashboard pour le bouton [Analytics] sur la page d'accueil des incidents. Par défaut, cela renvoie au dashboard modèle Incident Management Overview pour [Analytics][1]. |
| Monitor Automations| Créez des mentions « @ » d'incident pouvant être utilisées dans un [message de notification du monitor][2] pour créer automatiquement des incidents lorsque le monitor se déclenche. |

## Personnaliser la réponse aux incidents {#customize-incident-response}

{{< whatsnext desc="Définissez des personnalisations supplémentaires sur les éléments suivants :">}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/information" >}}Information{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/integrations" >}}Integrations{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/post_incident/follow-ups" >}}Suivis{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/notification_rules" >}}Règles de notification{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/property_fields" >}}Champs de propriété{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/transition_forms" >}}Formulaires de transition{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/responder_types" >}}Responder Types{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/templates" >}}Templates{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/automations" >}}Automations{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/incidents/settings
[2]: /fr/monitors/notify/