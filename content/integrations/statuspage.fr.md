---
categories:
- notification
- Collaboration
- issue tracking
ddtype: crawler
description: Intégration Datadog-StatusPage.io.
doc_link: https://docs.datadoghq.com/integrations/statuspage/
git_integration_title: statuspage
has_logo: true
integration_title: StatusPage.io
is_public: true
kind: integration
manifest_version: '1.0'
name: statuspage
public_title: Intégration Datadog-StatusPage.io
short_description: Intégration Datadog-StatusPage.io.
version: '1.0'
---

## Aperçu

Capturez les incidents de la StatusPage de vos services tiers afin de corréler les incidents avec vos propres statistiques et événements. Cette intégration ne nécessite pas d'avoir votre propre compte StatusPage.io.

## Implémentation
### Installation

Après avoir activé la vignette d'intégration, entrez la page StatusPage.io pour le service que vous souhaitez monitorer. Par exemple, la page d'état de PagerDuty peut être trouvée sur `https://status.pagerduty.com`. Entrez les tags custom que vous souhaitez associer à la page et cliquez sur **Update Configuration**.

## Données collectées
### Métriques

L'intégration StatusPage n'inclut aucune métrique pour le moment.

### Evénements

L'intégration StatusPage extrait les événements Datadog de StatusPage configuré ([tel que PagerDuty](https://status.pagerduty.com)), vous permettant de corréler ces événements dans vos métriques ou [d'envoyer des alertes basées sur ces événements][1].

### Checks de Service
L'intégration StatusPage n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog][2].

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][3]

[1]: https://docs.datadoghq.com/monitors/monitor_types/event/
[2]: http://docs.datadoghq.com/help/
[3]: https://www.datadoghq.com/blog/
