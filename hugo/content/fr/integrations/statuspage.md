---
categories:
- incidents
- issue tracking
- notification
dependencies: []
description: Intégration Datadog/Statuspage.
doc_link: https://docs.datadoghq.com/integrations/statuspage/
draft: false
further_reading:
- link: https://docs.datadoghq.com/monitors/guide/integrate-monitors-with-statuspage/
  tag: Documentation
  text: Intégrer des monitors avec Statuspage
git_integration_title: statuspage
has_logo: true
integration_id: statuspage
integration_title: Statuspage
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: statuspage
public_title: Intégration Datadog/Statuspage
short_description: Intégration Datadog/Statuspage.
team: web-integrations
version: '1.0'
---

## Présentation

La solution [Statuspage Atlassian][1] est un outil de gestion des statuts et des incidents vous permettant de capturer des incidents provenant de la page de statut de vos services tiers, afin de les corréler avec vos propres métriques et événements. Vous n'avez pas besoin de posséder votre propre compte Statuspage pour bénéficier de cette intégration.

## Implémentation

### Installation

Après avoir activé le carré d'intégration, saisissez l'URL Statuspage pour le service que vous souhaitez surveiller. Par exemple, la page de statut de PagerDuty est disponible à l'adresse `https://status.pagerduty.com`. Saisissez les tags personnalisés que vous souhaitez associer à la page, puis cliquez sur **Update Configuration**.

## Données collectées

### Métriques

L'intégration Statuspage n'inclut aucune métrique.

### Événements

L'intégration Statuspage récupère les événements Datadog à partir de la page de statut configurée ([comme PagerDuty][2]), ce qui vous permet de corréler ces événements au sein de vos métriques ou d'[envoyer des alertes en fonction de ces événements][3].

### Checks de service

L'intégration Statuspage n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.atlassian.com/software/statuspage
[2]: https://status.pagerduty.com
[3]: https://docs.datadoghq.com/fr/monitors/monitor_types/event/
[4]: https://docs.datadoghq.com/fr/help/