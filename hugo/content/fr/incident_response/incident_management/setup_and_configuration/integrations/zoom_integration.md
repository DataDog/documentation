---
aliases:
- /fr/service_management/incident_management/zoom_integration/
- /fr/incident_response/incident_management/zoom_integration
description: Associer Zoom à Datadog pour optimiser la collaboration au sein de votre
  équipe
title: Intégrez Zoom à Datadog Incident Management
---
## Présentation {#overview}

En associant Zoom à Datadog, vous pouvez créer rapidement des réunions Zoom afin de collaborer avec votre équipe sur des incidents en cours.

## Configuration {#setup}

### Installation {#installation}

Pour installer l'application Datadog pour Zoom, procédez comme suit :

1. Dans Datadog, accédez à la page [**Paramètres des incidents**][3].
2. Allez dans **Integrations** et activez l'interrupteur **Automatically create a meeting in Zoom for every incident**. Ce paramètre remplace le bouton **Add Video Call** par un bouton **Start Zoom Call** pour créer une réunion Zoom en un clic depuis la page de présentation des incidents de Datadog.
3. Lorsque vous cliquez sur le bouton **Start Zoom Call**, vous êtes invité à ajouter l'application Datadog Zoom. Assurez-vous de l'autoriser à afficher et à gérer les informations au nom de Zoom.

## Utilisation {#usage}

Une fois l'application installée, vous pouvez cliquer sur le bouton **Start Zoom Call** depuis un incident pour créer une nouvelle réunion Zoom et la lier automatiquement à l'incident.

## Autorisations {#permissions}

Datadog pour Zoom nécessite les périmètres OAuth suivants. Pour plus d'informations, consultez la [documentation sur les périmètres OAuth Zoom][2].

### Périmètres au niveau de l'utilisateur {#user-level-scopes}

| Périmètres                   | Raison de la demande                                                                                                 |
|--------------------------|----------------------------------------------------------------------------------------------------------------|
| `meeting:write`          | Créer des réunions lorsque les utilisateurs cliquent sur **Start Zoom Call** dans le produit Incident Management.                         |

## Suppression de l'application {#removing-the-app}
Pour supprimer l'application Datadog pour Zoom, procédez comme suit :

1. Connectez-vous à votre compte Zoom et accédez à la Zoom App Marketplace.
2. Cliquez sur **Manage** > **Added Apps**, ou recherchez l'application **Datadog**.
3. Cliquez sur l'application **Datadog**.
4. Cliquez sur **Remove**.

## Dépannage {#troubleshooting}

Besoin d'aide ? Contactez le [Datadog support][1].

[1]: /fr/help/
[2]: https://developers.zoom.us/docs/integrations/oauth-scopes/
[3]: https://app.datadoghq.com/incidents/settings