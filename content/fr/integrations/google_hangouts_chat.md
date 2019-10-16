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

1. Ajoutez le chatbot Datadog à votre salon Google Hangouts avec `@DataDog`. Remarque : [mettez le chatbot Datadog sur liste blanche][2] en vue de l'ajouter à votre salon.
2. Installez le chatbot Datadog dans votre salon Google Hangouts en saisissant `@Datadog install`.
3. Acceptez l'invite du bot à vous connecter à votre compte Datadog et configurez-le depuis l'application Datadog.
4. Ajoutez les `names` et `urls` des salons dans lesquels vous souhaitez que le chatbot puisse envoyer des messages avec la [fonctionnalité `@-notification`][3].

### Résumé des commandes du chatbot Datadog

| Commandes                            | Description                                                                                                                                                                                                                                                  |
| ----                               | ---                                                                                                                                                                                                                                                          |
| `@Datadog install`                 | Lance le processus d'installation. REMARQUE : si vous appartenez à plusieurs comptes Datadog, vous serez redirigé vers une page de sélection du compte durant l'installation.                                                                                            |
| `@Datadog list installed accounts` | Renvoie la liste de tous les comptes qui ont installé Hangouts Chat.                                                                                                                                                                                   |
| `@Datadog remove account`          | Lance le processus de suppression de Hangouts Chat pour un compte Datadog spécifique. Une carte comportant les liens de désinstallation pour tous les comptes installés apparaît alors. Cliquez sur le compte que vous souhaitez désinstaller. Le chatbot Datadog enverra alors un message avec le nom du compte supprimé. |


## Supprimer le chatbot pour un compte Datadog

Vous pouvez désinstaller Hangouts Chat pour un compte Datadog de trois façons :
1. La commande `@Datadog remove account` permet aux membres du salon de désinstaller le chatbot pour un compte Datadog sélectionné.
2. Depuis un compte Datadog, vous pouvez supprimer un salon à l'aide du [carré d'intégration Google Hangouts Chat][4].
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
[3]: https://docs.datadoghq.com/fr/developers/faq/what-do-notifications-do-in-datadog
[4]: https://app.datadoghq.com/account/settings#integrations/google_hangouts_chat


{{< get-dependencies >}}