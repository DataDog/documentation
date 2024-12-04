---
categories:
- collaboration
- notification
dependencies: []
description: Envoyez des alertes et des graphiques Datadog au salon Google Hangouts
  de votre équipe.
doc_link: https://docs.datadoghq.com/integrations/google_hangouts_chat/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/google-hangouts-chat-integration/
  tag: Blog
  text: Intégrer Datadog à Google Hangouts Chat
- link: https://developers.google.com/hangouts/chat/
  tag: Documentation externe
  text: Google Hangouts Chat
git_integration_title: google_hangouts_chat
has_logo: true
integration_id: google-hangouts-chat
integration_title: Google Hangouts Chat
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_hangouts_chat
public_title: Intégration Datadog/Google Hangouts Chat
short_description: Envoyez des alertes et des graphiques Datadog au salon Google Hangouts
  de votre équipe.
version: '1.0'
---

{{< site-region region="us3,eu,gov" >}}
<div class="alert alert-warning">
  Cette intégration est uniquement disponible pour les clients Datadog utilisant le site américain.
</div>
{{< /site-region >}}

## Présentation

Associez Google Hangouts Chat à Datadog pour permettre à votre équipe de collaborer en :

- partageant des graphiques avec vos collègues via les canaux privés ou publics de votre équipe ;
- recevant des alertes et des notifications de Datadog au sein de Google Hangouts Chat.

## Configuration

### Installation

Pour installer l'intégration Hangouts Chat, accédez à son [carré d'intégration][1] sur le site Datadog et ajoutez le bot à votre salon Hangouts.

### Configuration

1. Ajoutez le chatbot Datadog à votre salon Google Hangouts avec `@DataDog`. **Remarque** : [incluez le chatbot Datadog à votre liste d'autorisation][2] en vue de l'ajouter à votre salon.
2. Installez le chatbot Datadog dans votre salon Google Hangouts en saisissant `@Datadog install`.
3. Acceptez l'invite du bot à vous connecter à votre compte Datadog et configurez-le depuis le site Datadog.
4. Ajoutez les `names` et `urls` des salons dans lesquels vous souhaitez que le chatbot puisse envoyer des messages avec la [fonctionnalité `@-notification`][3].

### Résumé des commandes du chatbot Datadog

| Commande                            | Description                                                                                                                                                                                                                                                           |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@Datadog install`                 | Lance le processus d'installation. **Remarque** : si vous appartenez à plusieurs comptes Datadog, la page **Account selection** s'affiche durant l'installation afin que vous puissiez sélectionner votre compte.                                                                                                   |
| `@Datadog list installed accounts` | Renvoie la liste de tous les comptes qui ont installé Hangouts Chat.                                                                                                                                                                                                     |
| `@Datadog remove account`          | Lance le processus de suppression de Hangouts Chat pour un compte Datadog spécifique. Une carte comportant les liens de désinstallation pour tous les comptes installés apparaît alors. Cliquez sur le compte pour lequel vous souhaitez désinstaller Hangouts Chat. Le chatbot Datadog envoie alors un message avec le nom du compte pertinent. |

## Désinstaller Hangouts Chat pour des comptes Datadog

Vous pouvez désinstaller Hangouts Chat pour un compte Datadog de trois façons :

1. La commande `@Datadog remove account` permet aux membres du salon de désinstaller le chatbot pour un compte Datadog sélectionné.
2. Depuis un compte Datadog, vous pouvez supprimer un salon à l'aide du [carré d'intégration Google Hangouts Chat][1].
3. La suppression du chatbot d'un salon entraîne sa désinstallation pour tous les comptes installés.

## Données collectées

### Métriques

L'intégration Google Hangouts Chat n'inclut aucune métrique.

### Événements

L'intégration Google Hangouts Chat n'inclut aucun événement.

### Checks de service

L'intégration Google Hangouts Chat n'inclut aucun check de service.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#integrations/google_hangouts_chat
[2]: https://support.google.com/a/answer/6089179
[3]: https://docs.datadoghq.com/fr/monitors/notifications/#notification