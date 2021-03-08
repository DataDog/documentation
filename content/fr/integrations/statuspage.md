---
categories:
  - notification
  - Collaboration
  - issue tracking
ddtype: crawler
dependencies: []
description: Intégration Datadog/StatusPage.io.
doc_link: 'https://docs.datadoghq.com/integrations/statuspage/'
draft: false
git_integration_title: statuspage
has_logo: true
integration_title: StatusPage.io
is_public: true
kind: integration
manifest_version: '1.0'
name: statuspage
public_title: Intégration Datadog/StatusPage.io
short_description: Intégration Datadog/StatusPage.io.
version: '1.0'
---
## Présentation

Enregistrez les incidents de la StatusPage de vos services tiers afin de les corréler avec vos propres métriques et événements. Vous n'avez pas besoin de posséder votre propre compte StatusPage.io pour bénéficier de cette intégration.

## Configuration

### Installation

Après avoir activé le carré d'intégration, saisissez la page StatusPage.io pour le service que vous souhaitez surveillé. Par exemple, la page de statut de PagerDuty est disponible à l'adresse `https://status.pagerduty.com`. Saisissez les tags personnalisés que vous souhaitez associer à la page et cliquez sur **Update Configuration**.

## Données collectées

### Métriques

L'intégration StatusPage n'inclut aucune métrique.

### Événements

L'intégration StatusPage récupère les événements Datadog à partir de l'application StatusPage configurée ([comme PagerDuty][1]), ce qui vous permet de corréler ces événements au sein de vos métriques ou d'[envoyer des alertes en fonction de ces événements][2].

### Checks de service

L'intégration StatusPage n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://status.pagerduty.com
[2]: https://docs.datadoghq.com/fr/monitors/monitor_types/event/
[3]: https://docs.datadoghq.com/fr/help/