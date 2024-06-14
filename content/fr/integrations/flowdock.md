---
categories:
  - collaboration
  - notification
ddtype: crawler
dependencies: []
description: Envoyez des alertes et graphiques Datadog sur les flux de votre équipe.
doc_link: https://docs.datadoghq.com/integrations/flowdock/
draft: false
git_integration_title: flowdock
has_logo: true
integration_id: ''
integration_title: Flowdock
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: flowdock
public_title: Intégration Datadog/Flowdock
short_description: Envoyez des alertes et graphiques Datadog sur les flux de votre équipe.
version: '1.0'
---
{{< img src="integrations/flowdock/flowdock_overview.png" alt="Présentation Flowdock" popup="true">}}

## Présentation

Intégrez FlowDock pour :

- Être averti lorsque quelqu'un publie sur votre flux
- Récupérer des alertes de monitor, des changements de statuts d'intégration et bien plus encore directement dans vos flux

Datadog tire parti des fils de Flowdock pour éviter de polluer vos flux avec des notifications. Toutes les notifications d'un flux, et leurs notifications connexes, sont stockées dans leur propre fil. Par exemple, si une alerte de monitor est déclenchée puis résolue, les notifications correspondantes sont regroupées dans Flowdock.

## Configuration

### Installation

Pour intégrer Flowdock à Datadog, utilisez l'onglet **Configuration** dans Flowdock. Tous vos flux ouverts seront récupérés. Si vous ne souhaitez pas publier sur tous ces flux, vous pouvez supprimer ceux de votre choix dans la liste de saisie semi-automatique. Vous pouvez ensuite utiliser des handles `@flowdock` dans n'importe quel message ou monitor pour envoyer des messages sur vos flux.

Les messages utilisateur et les snapshots vont dans le fil principal de votre flux, tandis que chaque alerte est publiée dans son propre fil Flowdock. Cela évite un nombre trop important d'alertes dans le fil principal et garantit une conversation épurée et organisée pour votre équipe. À l'inverse, vous pouvez immédiatement consulter les statuts des monitors qui ont été transmis récemment à l'aide de la vue Inbox.

## Données collectées

### Métriques

L'intégration Flowdock n'inclut aucune métrique.

### Événements

L'intégration Flowdock n'inclut aucun événement.

### Checks de service

L'intégration Flowdock n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][1].

[1]: https://docs.datadoghq.com/fr/help/