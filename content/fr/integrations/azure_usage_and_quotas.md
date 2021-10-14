---
categories:
  - cloud
  - gestion des coûts
  - azure
ddtype: crawler
dependencies: []
description: 'Surveillez votre utilisation des ressources réseau, de calcul et de stockage Azure en la comparant aux limites prédéfinies pour votre abonnement.'
doc_link: 'https://docs.datadoghq.com/integrations/azure_usage_and_quotas/'
draft: false
git_integration_title: azure_usage_and_quotas
has_logo: true
integration_id: azure-usage-and-quotas
integration_title: Utilisation et quotas Microsoft Azure
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_usage_and_quotas
public_title: Intégration Datadog/Utilisation et quotas Microsoft Azure
short_description: Surveillez votre utilisation d'Azure et comparez-la aux limites prédéfinies pour votre abonnement.
version: '1.0'
---
## Présentation

Votre utilisation des ressources Azure doit respecter certaines limites prédéfinies en fonction de votre abonnement. Pour éviter tout problème de provisionnement inattendu, il est important de tenir compte de ces limites lors de la création ou de la mise à l'échelle de votre environnement Azure. Recueillez des métriques via l'intégration Utilisation et quotas Azure pour :

- Comparer votre utilisation des ressources réseau, de calcul et de stockage par rapport à vos quotas
- Identifier et éviter les échecs de provisionnement liés à l'atteinte de vos quotas

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_usage_and_quotas" >}}


### Événements

L'intégration Quotas Azure n'inclut aucun événement.

### Checks de service

L'intégration Quotas Azure n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_usage_and_quotas/azure_usage_and_quotas_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/