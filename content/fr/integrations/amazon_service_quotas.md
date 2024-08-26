---
categories:
- cloud
- aws
- log collection
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Amazon Service Quotas.
doc_link: https://docs.datadoghq.com/integrations/amazon_service_quotas/
draft: false
git_integration_title: amazon_service_quotas
has_logo: true
integration_id: amazon-service-quotas
integration_title: ServiceQuotas
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_service_quotas
public_title: Intégration Datadog/ServiceQuotas
short_description: Surveillez des métriques clés d'Amazon Service Quotas.
version: '1.0'
---


## Présentation

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Service Quotas.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `ServiceQuotas` est cochée
   dans la section concernant la collecte de métriques.
2. Installez l'[intégration Datadog/ServiceQuotas][3].

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_service_quotas" >}}


### Événements

L'intégration ServiceQuotas n'inclut aucun événement.

### Checks de service

L'intégration ServiceQuotas n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-service-quotas
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_service_quotas/amazon_service_quotas_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/