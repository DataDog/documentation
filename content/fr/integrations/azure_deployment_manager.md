---
app_id: azure_deployment_manager
categories:
- cloud
- azure
custom_kind: integration
description: Surveillez les déploiements Canary dans Azure Deployment Manager.
further_reading:
- link: https://www.datadoghq.com/blog/canary-deployments-with-azure-and-datadog/
  tag: Blog
  text: Versions Canary avec Azure Deployment Manager et Datadog
title: Microsoft Azure Deployment Manager
---
## Section Overview

Azure Deployment Manager (ADM) vous permet de coordonner un lancement par étapes pour le déploiement sécurisé d'applications complexes.

Utilisez Datadog pour créer un check de santé pour Azure Deployment Manager et pour arrêter votre déploiement si des problèmes sont détectés.

## Configuration

### Installation

Pour utiliser Datadog comme check de santé pour ADM, vous avez besoin d'un compte Datadog actif et d'une instance active d'Azure Deployment Manager.

### Configuration

1. Commencez par configurer des moniteurs dans Datadog pour votre déploiement. Commencez par un site Monitor pour chaque région. En fonction de la complexité de votre application, vous souhaiterez peut-être disposer de moniteurs pour différentes parties du déploiement dans chaque région. Le [Tutoriel : Utiliser Azure Deployment Manager avec les modèles Resource Manager] (https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-tutorial) peut vous aider à décider de l'emplacement de Monitor. Pour obtenir des idées sur Monitor, consultez [le blog](https://www.datadoghq.com/blog/canary-deployments-with-azure-and-datadog/).
1. Si vous avez plusieurs moniteurs pour chaque région, créez un [composite Monitor ](https://docs.datadoghq.com/monitors/monitor_types/composite/) pour chaque déploiement step (étape) ou région. Chaque composite Monitor est une combinaison logique d'autres moniteurs qui, ensemble, indiquent l'état général d'un déploiement step (étape).
1. Ensuite, configurez Datadog en tant que contrôle de santé dans Azure Deployment Manager topology (topologie) [dans le cadre du déploiement] (https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-overview#rollout-template). Définissez ces étapes de contrôle de santé comme des dépendances entre les étapes de déploiement. Utilisez le [template](#full-configuration-example), et remplacez `<API_KEY>` et `<APP_KEY>` par vos clés d'API et d'application Datadog. Créez une section dans `resources` pour chaque Monitor (ou composite Monitor ) que vous venez de créer et remplacez `<MONITOR_ID>` par les ID Monitor. Il est possible d'ajouter plusieurs contrôles à l'intérieur d'un [health check step (étape)](#example-health-check-step (étape)), mais Datadog recommande de créer un [check](#exemple-health-check) par contrôle de santé step (étape), puis de créer des étapes de contrôle de santé supplémentaires pour chaque composite Monitor . Si vous définissez le contrôle avec autre chose qu'un composite Monitor , veillez à mettre à jour le `regex` en conséquence.
1. Suivez la [documentation Microsoft] (https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-overview) pour lancer le déploiement.

#### Exemple de check de santé

Voici la partie du modèle de déploiement Azure Deployment Manager qui constitue le check de santé :

```json
{
    "healthChecks": [
        {
            "name": "datadogCompositeMonitor1",
            "request": {
                "method": "GET",
                "uri": "https://api.datadoghq.com/api/v1/monitor/<ID_MONITOR>?application_key=<CLÉ_APP>",
                "authentication": {
                    "type": "ApiKey",
                    "name": "apikey",
                    "in": "Query",
                    "value": "<CLÉ_API>"
                }
            },
            "response": {
                "successStatusCodes": ["200"],
                "regex": {
                    "matches": ["\"overall_state\"\\s*:\\s*\"OK\""],
                    "matchQuantifier": "All"
                }
            }
        }
    ]
}
```

#### Exemple d'étape de check de santé

Voici la partie du modèle de déploiement Azure Deployment Manager qui constitue l'étape de check de santé :

```json
{
    "apiVersion": "2018-09-01-preview",
    "type": "Microsoft.DeploymentManager/steps",
    "name": "datadogHealthCheckStep1",
    "location": "Central US",
    "tags": {},
    "properties": {
        "stepType": "healthCheck",
        "attributes": {
            "waitDuration": "PT5M",
            "maxElasticDuration": "PT10M",
            "healthyStateDuration": "PT10M",
            "type": "REST",
            "properties": {
                "healthChecks": [
                    {
                        "name": "datadogCompositeMonitor1",
                        "request": {
                            "method": "GET",
                            "uri": "https://api.datadoghq.com/api/v1/monitor/<ID_MONITOR>?application_key=<CLÉ_APP>",
                            "authentication": {
                                "type": "ApiKey",
                                "name": "apikey",
                                "in": "Query",
                                "value": "<CLÉ_API>"
                            }
                        },
                        "response": {
                            "successStatusCodes": ["200"],
                            "regex": {
                                "matches": ["\"overall_state\"\\s*:\\s*\"OK\""],
                                "matchQuantifier": "All"
                            }
                        }
                    }
                ]
            }
        }
    }
}
```

#### Exemple de configuration complète

Voici un modèle complet d'étape de déploiement Azure Deployment Manager :

```json
{
    "$schema": "http://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {},
    "variables": {},
    "resources": [
        {
            "apiVersion": "2018-09-01-preview",
            "type": "Microsoft.DeploymentManager/steps",
            "name": "datadogHealthCheckStep1",
            "location": "Central US",
            "tags": {},
            "properties": {
                "stepType": "healthCheck",
                "attributes": {
                    "waitDuration": "PT5M",
                    "maxElasticDuration": "PT10M",
                    "healthyStateDuration": "PT10M",
                    "type": "REST",
                    "properties": {
                        "healthChecks": [
                            {
                                "name": "datadogCompositeMonitor1",
                                "request": {
                                    "method": "GET",
                                    "uri": "https://api.datadoghq.com/api/v1/monitor/<ID_MONITOR>?application_key=<CLÉ_APP>",
                                    "authentication": {
                                        "type": "ApiKey",
                                        "name": "apikey",
                                        "in": "Query",
                                        "value": "<CLÉ_API>"
                                    }
                                },
                                "response": {
                                    "successStatusCodes": ["200"],
                                    "regex": {
                                        "matches": [
                                            "\"overall_state\"\\s*:\\s*\"OK\""
                                        ],
                                        "matchQuantifier": "All"
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        }
    ]
}
```

### Résultats

Lors de l'exécution de l'étape de check de santé pour une phase de déploiement, Azure Deployment Manager demande à l'API Monitor de Datadog le statut du monitor composite identifié durant cette étape pour cette phase de déploiement.

Azure Deployment Manager analyse la réponse avec la regex fournie dans le modèle pour identifier si elle contient la phrase `overall_status: OK`.

Si `overall_status: OK` est trouvé, le check est considéré comme sain. Si le statut est `Warn`, `No Data` ou `Alert`, le check est alors considéré comme non sain, et Azure Deployment Manager met fin au déploiement.

## Données collectées

### Métriques

Azure Deployment Manager n'envoie aucune métrique.

### Événements

Azure Deployment Manager ne comprend aucun événement.

### Checks de service

Azure Deployment Manager ne comprend aucun check de service.

## Dépannage

Besoin d'aide ? Contactez l'[assistance Datadog](https://docs.datadoghq.com/help/).