---
categories:
- collaboration
- notification
ddtype: crawler
dependencies: []
description: Envoyez des alertes et des graphiques Datadog à la room Chatworks de
  votre équipe.
doc_link: https://docs.datadoghq.com/integrations/chatwork/
draft: false
git_integration_title: chatwork
has_logo: true
integration_id: chatwork
integration_title: Chatwork
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: chatwork
public_title: Intégration Datadog/Chatwork
short_description: Envoyez des alertes et des graphiques Datadog à la room Chatworks
  de votre équipe.
version: '1.0'
---

{{< img src="integrations/chatwork/chatwork_event.png" alt="Événement Chatwork" popup="true">}}

## Présentation

Intégrez Chatwork à Datadog pour :

- Être averti lorsque quelqu'un publie sur votre flux
- Recevoir une notification lorsqu'une alerte de métrique se déclenche

## Configuration

### Installation

1. Commencez par créer un utilisateur Datadog au sein du compte de votre organisation Chatwork, afin qu'il publie les mises à jour Datadog.
2. L'API Chatwork est toujours en accès limité. Vous devez donc [envoyer une demande pour y accéder][1].
3. Patientez jusqu'à recevoir l'e-mail de confirmation (jusqu'à deux jours d'attente).
4. Suivez [ces instructions][2] (en japonais) pour obtenir un token.
5. Copiez-le dans ce [champ][3].
6. Saisissez les noms et ID des conversations auxquelles vous souhaitez accéder. Les ID se trouvent dans l'URL des conversations.
7. Cochez la case si vous souhaitez recevoir une notification pour chaque commentaire. Le cas contraire, vous devez utiliser la syntaxe `@chatwork-nom_conversation`.
   {{< img src="integrations/chatwork/chatwork_tile.png" alt="Titre Chatwork" popup="true">}}

8. [Enregistrez votre configuration][3].

## Données collectées

### Métriques

L'intégration Chatwork n'inclut aucune métrique.

### Événements

L'intégration Chatwork n'inclut aucun événement.

### Checks de service

L'intégration Chatwork n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://www.chatwork.com/login.php?redirect=apply_beta&package=chatwork&subpackage=api&args=
[2]: http://developer.chatwork.com/ja/authenticate.html
[3]: https://app.datadoghq.com/account/settings#integrations/chatwork
[4]: https://docs.datadoghq.com/fr/help/