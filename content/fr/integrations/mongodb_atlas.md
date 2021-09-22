---
categories:
  - data store
  - cloud
ddtype: crawler
dependencies: []
description: "MongoDB\_Atlas peut transmettre des métriques calculées à Datadog pour vous permettre de visualiser ses performances."
doc_link: 'https://docs.datadoghq.com/integrations/mongodb_atlas/'
draft: false
git_integration_title: mongodb_atlas
has_logo: true
integration_id: ''
integration_title: "MongoDB\_Atlas"
is_public: true
kind: intégration
manifest_version: '1.0'
name: mongodb_atlas
public_title: "Intégration Datadog/MongoDB\_Atlas"
short_description: "MongoDB\_Atlas peut transmettre des métriques calculées à Datadog"
version: '1.0'
---
## Présentation

MongoDB Atlas peut transmettre des métriques calculées à Datadog pour vous permettre de :

- Visualiser les métriques clés de MongoDB Atlas.
- Corréler les performances de MongoDB Atlas avec le reste de vos applications.

**Remarque : cette intégration est uniquement disponible sur les clusters M10+.**

## Configuration

### Installation

Vous pouvez installer l'intégration MongoDB Atlas en vous connectant au portail Atlas.

### Configuration

1. Récupérez ou créez une [clé d'API][1] Datadog.
2. Dans le [portail Atlas][1], saisissez une clé d'API Datadog sous **Integrations** -> **Datadog Settings**.

## Données collectées

### Métriques
{{< get-metrics-from-git "mongodb_atlas" >}}


### Événements

MongoDB Atlas peut transmettre des [alertes][4] à Datadog sous la forme d'événements.

### Checks de service

L'intégration MongoDB Atlas n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? [Contactez l'assistance Datadog][5].

[1]: https://app.datadoghq.com/account/settings#api
[2]: https://docs.atlas.mongodb.com/tutorial/monitoring-integrations/#procedure
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/mongodb_atlas/mongodb_atlas_metadata.csv
[4]: https://www.mongodb.com/blog/post/push-your-mongodb-atlas-alerts-to-datadog
[5]: https://docs.datadoghq.com/fr/help/