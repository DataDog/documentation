---
aliases:
  - /fr/integrations/azure_keyvault
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Azure Key Vault.
doc_link: 'https://docs.datadoghq.com/integrations/azure_key_vault/'
git_integration_title: azure_key_vault
has_logo: true
integration_title: Microsoft Azure Key Vault
is_public: true
kind: integration
manifest_version: 1
name: azure_key_vault
public_title: Intégration Datadog/Microsoft Azure Key Vault
short_description: Surveillez des métriques clés d'Azure Key Vault.
version: 1
---
## Présentation

Azure Key Vault est un service qui protège et gère les clés de chiffrement et les secrets utilisés par les services et applications cloud.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques d'Azure Key Vault.

## Implémentation

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_key_vault" >}}


### Événements

L'intégration Azure Key Vault n'inclut aucun événement.

### Checks de service

L'intégration Azure Key Vault n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_key_vault/azure_key_vault_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/