---
description: Associer Zoom à Datadog pour optimiser la collaboration au sein de votre
  équipe
private: true
title: Intégration Zoom
---

## Présentation

En associant Zoom à Datadog, vous pouvez créer rapidement des réunions Zoom afin de collaborer avec votre équipe sur des incidents en cours.

## Configuration

### Installation

Pour installer l'application Datadog pour Zoom, procédez comme suit :

1. Dans Datadog, accédez à **Service Management** > Incidents Settings.
2. Accédez à **Integrations**, puis activez l'option **Automatically create a meeting in Zoom for every incident**. Celle-ci remplace le bouton **Add Video Call** par le bouton **Start Zoom Call**. Vous pouvez alors créer en un seul clic des réunions Zoom depuis la page de présentation des incidents Datadog.
3. Lorsque vous cliquez sur le bouton **Start Zoom Call**, vous êtes invité à ajouter l'application Datadog Zoom. Prenez soin d'autoriser l'application Zoom à consulter et à gérer des informations.

## Utilisation

Une fois l'application installée, vous pouvez cliquer sur le bouton **Start Zoom Call** d'un incident pour créer un appel Zoom et l'associer automatiquement à l'incident en question.

## Autorisations

L'application Datadog pour Zoom nécessite les portées suivantes. Pour en savoir plus, consultez la [documentation relative aux portées OAuth Zoom][2] (en anglais).

### Portées au niveau des utilisateurs

| Portées                   | Motif de la requête                                                                                                 |
|--------------------------|----------------------------------------------------------------------------------------------------------------|
| `meeting:write`          | Permet aux utilisateurs de cliquer sur **Start Zoom Call** dans la solution Incident Management pour créer des réunions.                         |

## Supprimer l'application
Pour supprimer l'application Datadog pour Zoom, procédez comme suit :

1. Connectez-vous à votre compte Zoom, puis accédez au Marketplace d'applications Zoom.
2. Cliquez sur **Manage** > **Added Apps** ou recherchez l'application **Datadog**.
3. Cliquez sur l'application **Datadog**.
4. Cliquez sur **Remove**.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][1].

[1]: /fr/help/
[2]: https://developers.zoom.us/docs/integrations/oauth-scopes/