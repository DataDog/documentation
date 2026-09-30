---
assets:
  dashboards:
    HCPVault Overview: assets/dashboards/hcp_vault_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - ''
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/hcp_vault/README.md
display_name: HCPVault
draft: false
git_integration_title: hcp_vault
guid: 9fb902f5-b9cf-4064-8236-b65bf32474aa
integration_id: hcp-vault
integration_title: "HCP\_Vault"
integration_version: ''
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: hcp_vault.
metric_to_check: ''
name: hcp_vault
public_title: "Intégration Datadog/HCP\_Vault"
short_description: "L'intégration HCP\_Vault offre une vue d'ensemble de vos clusters Vault"
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

L'intégration HCP Vault offre une vue d'ensemble de vos clusters Vault afin que vous puissiez surveiller leurs performances et leur santé.

La diffusion de métriques HCP Vault est disponible pour tous les niveaux de clusters de production. Cette fonctionnalité n'est pas disponible pour les clusters de développement.

Pour en savoir plus sur le contexte et l'interprétation des métriques, consultez le [guide sur les métriques HCP Vault][1]

## Configuration

### Installation

Suivez les instructions de configuration ci-dessous.

### Prérequis
- Un cluster HCP Vault prévu pour la production
- Votre région Datadog et votre [clé d'API Datadog][2]
- Un compte dont le [rôle attribué dans HCP][3] est Admin ou Contributor

### Configuration

Pour activer la diffusion de métriques :

1. Dans la vue d'ensemble des clusters HCP Vault, sélectionnez la vue Metrics.

   ![Diffusion de métriques][4]

2. Si vous n'avez pas encore configuré la diffusion de métriques, cliquez sur Enable streaming.

3. Dans la vue Stream Vault metrics, sélectionnez Datadog comme fournisseur.

4. Sous Datadog configuration, saisissez votre clé d'API et sélectionnez la région du site Datadog correspondant à votre environnement Datadog.

   ![Choisir un fournisseur][5]

5. Cliquez sur Save. 
**Remarque** : HCP Vault prend en charge la diffusion de métriques vers un seul endpoint de métriques à la fois.

6. Accédez à Datadog, puis activez l'intégration en cliquant sur Install dans le carré d'intégration. Cette opération permet d'installer un dashboard HCP Vault avec des widgets qui tirent le meilleur parti de vos données de télémétrie HCP Vault. Pour consulter ce dashboard, recherchez « HCP Vault Overview » dans la liste de dashboards. 

## Données collectées

### Métriques

Pour en savoir plus sur le contexte et l'interprétation des métriques, consultez le [guide sur les métriques HCP Vault][1].

### Checks de service

L'intégration HCP Vault n'inclut aucun check de service.

### Événements

L'intégration HCP Vault n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://learn.hashicorp.com/collections/vault/cloud
[2]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[3]: https://cloud.hashicorp.com/docs/hcp/access-control
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/hcp_vault/images/metrics-streaming.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/hcp_vault/images/choose-provider.png
[6]: https://docs.datadoghq.com/fr/help/