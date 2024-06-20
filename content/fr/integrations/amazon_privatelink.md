---
categories:
- cloud
- aws
- log collection
dependencies: []
description: Surveillez des métriques clés d'Amazon PrivateLink.
doc_link: https://docs.datadoghq.com/integrations/amazon_privatelink/
draft: false
git_integration_title: amazon_privatelink
has_logo: true
integration_id: amazon-privatelink
integration_title: Amazon PrivateLink
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_privatelink
public_title: Intégration Datadog/Amazon PrivateLink
short_description: Surveillez des métriques clés d'Amazon PrivateLink.
version: '1.0'
---


## Présentation

AWS PrivateLink fournit une connectivité privée entre les VPC, les services AWS et vos réseaux sur site.

Activez cette intégration pour surveiller la santé et les performances de vos endpoints de VPC ou de vos services d'endpoint avec Datadog.

**Important :** si vous souhaitez envoyer des données de télémétrie à Datadog via PrivateLink, suivez [ces instructions][1]. 

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord l'[intégration Amazon Web Services][2].

### Collecte de métriques

1. Sur la [page de l'intégration AWS][3], assurez-vous que `PrivateLinkEndPoints` et `PrivateLinkServices` sont activés
   dans l'onglet `Metric Collection`.
2. Installez l'[intégration Datadog/Amazon PrivateLink][4].

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_privatelink" >}}


### Événements

L'intégration Amazon PrivateLink n'inclut aucun événement.

### Checks de service

L'intégration Amazon PrivateLink n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://docs.datadoghq.com/fr/agent/guide/private-link/
[2]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-privatelink
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_privatelink/amazon_privatelink_metadata.csv
[6]: https://docs.datadoghq.com/fr/help/