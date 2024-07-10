---
categories:
- notification
ddtype: crawler
dependencies: []
description: Utilisez xMatters comme canal de notification pour les alertes et les
  événements Datadog.
doc_link: https://docs.datadoghq.com/integrations/xmatters/
draft: false
git_integration_title: xmatters
has_logo: true
integration_id: xmatters
integration_title: xMatters
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: xmatters
public_title: Intégration Datadog/xMatters
short_description: Utilisez xMatters comme canal de notification pour les alertes
  et les événements Datadog.
team: web-integrations
version: '1.0'
---

{{< img src="integrations/xmatters/xmatters.png" alt="Présentation de xMatters" popup="true">}}

## Présentation

xMatters est une plate-forme de disponibilité de services numériques qui empêche les problèmes technologiques de devenir des problèmes commerciaux. Les grandes entreprises, les SRE agiles et les équipes DevOps innovantes s'appuient sur son service proactif de réponse aux incidents, d'automatisation et de gestion pour conserver une haute visibilité et un contrôle des opérations, malgré l'environnement technologique actuel marqué par d'importantes fragmentations. xMatters pour Datadog intègre les utilisateurs à vos chaînes d'outils pour l'ensemble de vos équipes et silos.

Associez Datadog à xMatters pour :

- Déclencher des notifications xMatters et intégrer les réponses à vos outils informatiques
- Notifier les intervenants en fonction des règles de réaffectation, des horaires de service, des compétences et des sites d'intervention
- Consulter les horaires de service xMatters actuels depuis Datadog
- Configurer les options de réponse permettant de déclencher d'autres intégrations xMatters et de piloter le workflow pour des tâches telles que la création de tickets, la mise à jour des consoles, l'envoi de notifications supplémentaires ainsi que le lancement de conversations instantanées et de conférences téléphoniques
- Ajouter des rapports et des analyses supplémentaires à vos processus opérationnels

## Configuration

### Installation

Pour configurer l'intégration Datadog/xMatters :

- Générez une [nouvelle clé d'application][1] pour xMatters.
- [Configurez les plans de communication xMatters][2].
- Configurez chaque webhook xMatters via l'[intégration Datadog/Webhooks][3].

## Données collectées

### Métriques

L'intégration xMatters n'inclut aucune métrique.

### Événements

L'intégration xMatters n'inclut aucun événement.

### Checks de service

L'intégration xMatters n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://help.xmatters.com/integrations/#cshid=DATADOG
[3]: https://app.datadoghq.com/account/settings#integrations/webhooks
[4]: https://docs.datadoghq.com/fr/help/