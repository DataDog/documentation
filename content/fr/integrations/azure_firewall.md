---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés de vos pare-feux Azure.
doc_link: 'https://docs.datadoghq.com/integrations/azure_firewall/'
draft: false
git_integration_title: azure_firewall
has_logo: true
integration_id: ''
integration_title: Pare-feu Microsoft Azure
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_firewall
public_title: Intégration Datadog/Pare-feu Microsoft Azure
short_description: Surveillez des métriques clés de vos pare-feux Azure.
version: '1.0'
---
## Présentation

Pare-feu Azure est un service de sécurité réseau basé sur le cloud pour protéger les ressources de votre réseau virtuel Azure.

Utilisez l'intégration Datadog/Azure pour recueillir les métriques de vos pare-feux.

## Implémentation

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_firewall" >}}


### Événements

L'intégration Pare-feu Azure n'inclut aucun événement.

### Checks de service

L'intégration Pare-feu Azure n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_firewall/azure_firewall_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/