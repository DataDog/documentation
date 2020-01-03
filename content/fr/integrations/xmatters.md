---
categories:
  - notification
ddtype: crawler
dependencies: []
description: Utilisez xMatters comme canal de notification pour les alertes et les événements Datadog.
doc_link: 'https://docs.datadoghq.com/integrations/xmatters/'
git_integration_title: xmatters
has_logo: true
integration_title: xMatters
is_public: true
kind: integration
manifest_version: '1.0'
name: xmatters
public_title: Intégration Datadog/xMatters
short_description: Utilisez xMatters comme canal de notification pour les alertes et les événements Datadog.
version: '1.0'
---
{{< img src="integrations/xmatters/xmatters.png" alt="Présentation de Xmatters"  >}}

## Présentation

xMatters est une plateforme d'alerte informatique qui vous permet de connecter les personnes adéquates à votre chaîne d'outils pour renforcer la communication entre vos équipes et vos silos. xMatters automatise la communication afin que vous puissiez prévenir les pannes, mobiliser les bonnes personnes, résoudre les incidents majeurs et tenir les parties prenantes informées de manière proactive.

Associez Datadog à xMatters pour :

* Déclencher des notifications xMatters et intégrer les réponses à vos outils informatiques

* Notifier les intervenants en fonction des règles de réaffectation, des horaires de service, des compétences et des sites d'intervention

* Consulter les horaires de service xMatters actuels depuis Datadog

* Configurer les options de réponse permettant de déclencher d'autres intégrations xMatters et de piloter le workflow pour des tâches telles que la création de tickets, la mise à jour des consoles, l'envoi de notifications supplémentaires ainsi que le lancement de conversations instantanées et de conférences téléphoniques

* Ajouter des rapports et des analyses supplémentaires à vos processus opérationnels

## Implémentation
### Installation

Pour configurer l'intégration Datadog/xMatters :

* Générez une [nouvelle clé d'application][1] pour xMatters.

* [Configurez les plans de communication xMatters][2].

* Configurez chaque webhook xMatters via l'[intégration Datadog/Webhooks][3].

## Données collectées
### Métriques

L'intégration xMatters n'inclut aucune métrique.

### Événements
L'intégration xMatters n'inclut aucun événement.

### Checks de service
L'intégration xMatters n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://app.datadoghq.com/account/settings#api
[2]: https://support.xmatters.com/hc/en-us/articles/214369486
[3]: https://app.datadoghq.com/account/settings#integrations/webhooks
[4]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}