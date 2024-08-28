---
categories:
- data store
- cloud
dependencies: []
description: MongoDB Atlas peut transmettre des métriques calculées à Datadog pour
  vous permettre de visualiser ses performances.
doc_link: https://docs.datadoghq.com/integrations/mongodb_atlas/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-mongodb-atlas-for-government-datadog/
  tag: Blog
  text: Surveiller MongoDB Atlas for Government avec Datadog
git_integration_title: mongodb_atlas
has_logo: true
integration_id: mongodb-atlas
integration_title: MongoDB Atlas
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
monitors:
  '[MongoDB Atlas] CPU usage is higher than average on host: {{host.name}} ': assets/monitors/high_cpu.json
  '[MongoDB Atlas] Efficiency of queries are degrading': assets/monitors/query_efficiency.json
  '[MongoDB Atlas] Memory usage is higher than average on host: {{host.name}}': assets/monitors/memory.json
  '[MongoDB Atlas] Read Latency is higher than average for host: {{host.name}}': assets/monitors/read_latency.json
  '[MongoDB Atlas] Write Latency is higher than average for host: {{host.name}}': assets/monitors/write_latency.json
name: mongodb_atlas
public_title: Intégration Datadog/MongoDB Atlas
short_description: MongoDB Atlas peut transmettre des métriques calculées à Datadog
team: web-integrations
version: '1.0'
---

## Présentation

MongoDB Atlas peut transmettre des métriques calculées à Datadog pour vous permettre de :

- Visualiser les métriques clés de MongoDB Atlas.
- Corréler les performances de MongoDB Atlas avec le reste de vos applications.

**Remarque : cette intégration est uniquement disponible sur les clusters M10+.**

## Configuration

### Configurer l'Agent Datadog pour l'APM

Vous pouvez installer l'intégration MongoDB Atlas en vous connectant au portail Atlas.

### Configuration

1. Récupérez ou créez une [clé d'API][1] Datadog.
2. Dans le [portail Atlas][1], saisissez une clé d'API Datadog sous **Integrations** -> **Datadog Settings**.

## Données collectées

### Métriques
{{< get-metrics-from-git "mongodb_atlas" >}}


### Events

MongoDB Atlas peut transmettre des [alertes][4] à Datadog sous la forme d'événements.

### Service Checks

L'intégration MongoDB Atlas n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? [Contactez l'assistance Datadog][5].



{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://docs.atlas.mongodb.com/tutorial/monitoring-integrations/#procedure
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/mongodb_atlas/mongodb_atlas_metadata.csv
[4]: https://www.mongodb.com/blog/post/push-your-mongodb-atlas-alerts-to-datadog
[5]: https://docs.datadoghq.com/fr/help/