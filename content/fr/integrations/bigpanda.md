---
categories:
  - notification
ddtype: crawler
dependencies: []
description: Corrélez les alertes Datadog et créez des incidents actionnables avec BigPanda.
doc_link: 'https://docs.datadoghq.com/integrations/bigpanda/'
draft: false
git_integration_title: bigpanda
has_logo: true
integration_id: ''
integration_title: BigPanda
is_public: true
kind: integration
manifest_version: '1.0'
name: bigpanda
public_title: Intégration Datadog/BigPanda
short_description: Envoyez des alertes Datadog sur votre compte BigPanda.
version: '1.0'
---
## Présentation

Associez BigPanda à Datadog pour permettre à votre équipe :

- de corréler les informations en recevant des alertes de Datadog ;
- d'acheminer facilement tous les monitors Datadog en même temps.

## Configuration

### Installation

Pour installer l'intégration BigPanda, accédez à son [carré d'intégration][1] dans l'application Datadog.

### Configuration

1. Dans votre compte BigPanda, accédez à la page Integrations et sélectionnez New Integration.
2. Cliquez sur _Datadog_ --> _Add Integration_, puis créez la clé d'application.
3. L'URL de Webhook fournie contient le token d'accès et la clé d'application nécessaires.
4. Accédez au carré BigPanda dans Datadog et cliquez sur _Add Account_
5. Ajoutez le nom de compte BigPanda de votre choix via l'option **BigPanda Account Name**.
6. Collez le **token d'accès** et la **clé d'application** dans les champs correspondants.
7. Cliquez sur _Save_.

### Utilisation

La plateforme BigPanda crée des incidents lorsqu'elle commence à recevoir des événements de Datadog. Les incidents conservent des informations pertinentes telles que le nom du monitor qui a été déclenché et la condition à l'origine de l'alerte. 
Le statut des incidents peut évoluer (de Active à Resolved) en fonction des transitions dont font l'objet les monitors. Pour interrompre l'envoi d'alertes de Datadog à BigPanda, désinstallez simplement l'intégration depuis son carré.

## Données collectées

### Métriques

L'intégration BigPanda ne fournit aucune métrique.

### Événements

L'intégration BigPanda n'inclut aucun événement.

### Checks de service

L'intégration BigPanda n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][2].

[1]: https://app.datadoghq.com/account/settings#integrations/bigpanda
[2]: https://docs.datadoghq.com/fr/help/