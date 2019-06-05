---
categories:
  - Collaboration
ddtype: crawler
dependencies: []
description: "Envoyez des alertes et des graphiques Datadog au salon Google\_Hangouts de votre équipe."
doc_link: 'https://docs.datadoghq.com/integrations/google_hangouts_chat/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/google-hangouts-chat-integration/'
    tag: Blog
    text: "Intégrer Datadog à Google\_Hangouts\_Chat"
  - link: 'https://developers.google.com/hangouts/chat/'
    tag: Documentation externe
    text: "Google\_Hangouts\_Chat"
git_integration_title: google_hangouts_chat
has_logo: true
integration_title: "Google\_Hangouts\_Chat"
is_public: true
kind: integration
manifest_version: 1
name: google_hangouts_chat
public_title: "Intégration Datadog/Google\_Hangouts\_Chat"
short_description: "Envoyez des alertes et des graphiques Datadog au salon Google\_Hangouts de votre équipe."
version: 1
---
## Présentation

Associez Google Hangouts Chat à Datadog pour permettre à votre équipe de collaborer en :

* partageant des graphiques avec vos collègues via les canaux privés ou publics de votre équipe ;
* recevant des alertes et des notifications de Datadog au sein de Google Hangouts Chat.

## Implémentation
### Installation

Pour installer l'intégration Hangouts Chat, accédez à son [carré d'intégration][1] dans l'application Datadog et ajoutez le bot à votre salon Hangouts.

### Configuration

1. Ajoutez le bot de conversation Datadog à votre salon Google Hangouts avec `@DataDog`.
2. Installez le bot de conversation Datadog dans votre salon Google Hangouts en saisissant `@Datadog install`.
3. Le bot vous demande de vous connecter à votre compte Datadog et de le configurer en utilisant l'application Datadog.
4. Ajoutez les `names` et `urls` des salons dans lesquelles vous souhaitez qu'il puisse envoyer des messages avec la [syntaxe `@-notification`][2].

### Résumé des commandes du bot de Datadog

| Commandes                            | Description                                                                                                                                                                                                                                                  |
| ----                               | ---                                                                                                                                                                                                                                                          |
| `@Datadog install`                 | Lance le workflow d'installation. REMARQUE : si vous appartenez à plusieurs comptes Datadog, vous serez redirigé vers la page de sélection du compte lors du workflow d'installation.                                                                                            |
| `@Datadog list installed accounts` | Renvoie la liste de tous les comptes qui ont installé le salon Hangouts Chat.                                                                                                                                                                                   |
| `@Datadog remove account`          | Lance le workflow de suppression du salon Hangouts Chat pour compte Datadog spécifique. Une fiche est renvoyée avec les liens de désinstallation pour tous les comptes installés. Cliquez sur le compte que vous souhaitez désinstaller. Le bot Datadog envoie alors un message avec le nom du compte supprimé. |


## Désinstaller un salon pour des comptes Datadog

Vous pouvez désinstaller un salon Hangouts pour un compte Datadog de trois façons :
1. La commande `@Datadog remove account` permet aux membres du salon de désinstaller le bot pour un compte Datadog sélectionné.
2. Depuis un compte Datadog, vous pouvez supprimez un salon à l'aide du [carré d'intégration Google Hangouts Chat][3].
3. La suppression du bot pour un salon le désinstalle sur tous les comptes installés.

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
[2]: https://docs.datadoghq.com/fr/developers/faq/what-do-notifications-do-in-datadog
[3]: https://app.datadoghq.com/account/settings#integrations/google_hangouts_chat


{{< get-dependencies >}}