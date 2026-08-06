---
categories:
  - cloud
  - azure
ddtype: check
dependencies: []
description: "Surveiller des métriques d'Azure\_Service\_Fabric"
doc_link: https://docs.datadoghq.com/integrations/azure_service_fabric/
draft: false
git_integration_title: azure_service_fabric
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Service Fabric
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_service_fabric
public_title: Intégration Datadog/Microsoft Azure Service Fabric
short_description: "Surveiller des métriques d'Azure\_Service\_Fabric"
version: '1.0'
---
## Présentation

Azure Service Fabric est une plateforme de systèmes distribués qui facilite le packaging, le déploiement et la gestion de conteneurs et de microservices évolutifs et fiables.

## Configuration
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1].

Vous pouvez surveiller la santé de votre cluster Azure Service Fabric dans Datadog en exécutant une commande dans l'[interface de ligne de commande d'Azure][2].

Avant d'exécuter la commande d'installation, notez les éléments suivants :

- Le système d'exploitation de votre cluster (Windows ou Linux)
- Le groupe de ressources de votre cluster
- Le nom du groupe de machines virtuelles identiques gérant les nœuds sous-jacents dans le cluster
- Votre [clé d'API Datadog][3]

Modifiez la commande suivante en fonction des informations ci-dessus :

{{< tabs >}}
{{% tab "Windows" %}}

```shell
az vmss extension set --name DatadogWindowsAgent --publisher Datadog.Agent --resource-group <NOM_GROUPE_RESSOURCES> --vmss-name <NOM_GROUPE_MACHINES_VIRTUELLES_IDENTIQUES> --protected-settings "{'api_key':'<VOTRE_CLÉ_API>'}"
```

{{% /tab %}}
{{% tab "Linux" %}}

```shell
az vmss extension set --name DatadogLinuxAgent --publisher Datadog.Agent --resource-group <NOM_GROUPE_RESSOURCES> --vmss-name <NOM_GROUPE_MACHINES_VIRTUELLES_IDENTIQUES> --protected-settings "{'api_key':'<VOTRE_CLÉ_API>'}"
```

{{% /tab %}}
{{< /tabs >}}

Connectez-vous à l'interface de ligne de commande d'Azure et exécutez la commande ci-dessus en tenant compte de vos informations pour déployer l'Agent Datadog sur les nœuds de votre cluster.

### Extension Virtual Machine

Pour installer cette intégration, il est également possible d'ajouter l'extension Azure Virtual Machine Datadog directement dans le [modèle ARM][4] de votre cluster Service Fabric.

## Données collectées
### Métriques

Puisque l'Agent Datadog est installé sur les nœuds de votre cluster Service Fabric, les métriques sont transmises à Datadog à partir des [checks de base][5] de l'Agent.

Si vous exécutez des apps conteneurisées sur Service Fabric, l'Agent transmet des [métriques Service Fabric de maillage][6].

### Événements
L'intégration Azure Service Fabric n'inclut aucun événement.

### Checks de service
L'intégration Azure Service Fabric n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://github.com/DataDog/service-fabric-datadog
[5]: https://docs.datadoghq.com/fr/getting_started/agent/#checks
[6]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftservicefabricmeshapplications
[7]: https://docs.datadoghq.com/fr/help/