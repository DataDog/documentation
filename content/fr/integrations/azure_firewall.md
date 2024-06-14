---
categories:
- azure
- cloud
- network
dependencies: []
description: Surveillez des métriques clés de vos pare-feux Azure.
doc_link: https://docs.datadoghq.com/integrations/azure_firewall/
draft: false
git_integration_title: azure_firewall
has_logo: true
integration_id: ''
integration_title: Pare-feu Microsoft Azure
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_firewall
public_title: Intégration Datadog/Pare-feu Microsoft Azure
short_description: Surveillez des métriques clés de vos pare-feux Azure.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Pare-feu Azure est un service de sécurité réseau basé sur le cloud pour protéger les ressources de votre réseau virtuel Azure.

Utilisez l'intégration Datadog/Azure pour recueillir les métriques de vos pare-feux.

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_firewall" >}}


### Aide

L'intégration Pare-feu Azure n'inclut aucun événement.

### Aide

L'intégration Pare-feu Azure n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_firewall/azure_firewall_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/