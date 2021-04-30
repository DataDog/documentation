---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Utilisez Datadog pour surveiller les déploiements Canary dans Azure Deployment Manager.
doc_link: 'https://docs.datadoghq.com/integrations/azure_deployment_manager/'
draft: false
further_reading:
  - link: 'https://www.datadoghq.com/blog/canary-deployments-with-azure-and-datadog/'
    tag: Blog
    text: Versions Canary avec Azure Deployment Manager et Datadog
git_integration_title: azure_deployment_manager
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Deployment Manager
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_deployment_manager
public_title: Datadog/Microsoft Azure Deployment Manager
short_description: Surveillez les déploiements Canary dans Azure Deployment Manager.
version: '1.0'
---
## Présentation

Azure Deployment Manager (ADM) vous permet de coordonner un lancement par étapes pour le déploiement sécurisé d'applications complexes.

Utilisez Datadog pour créer un check de santé pour Azure Deployment Manager et pour arrêter votre déploiement si des problèmes sont détectés.

## Implémentation

### Installation

Pour utiliser Datadog comme check de santé pour ADM, vous avez besoin d'un compte Datadog actif et d'une instance active d'Azure Deployment Manager.

### Configuration

1. Commencez par configurer des monitors dans Datadog pour votre déploiement. Commencez avec un monitor pour chaque région. Selon la complexité de votre application, il peut être utile de configurer des monitors pour les différentes étapes de déploiement dans chaque région. Suivez le [Didacticiel : Utiliser Azure Deployment Manager avec des modèles Resource Manager][1] pour mieux savoir où placer les monitors. Pour obtenir des idées de monitor, consultez [cet article du blog][2].
2. Si vous avez configuré plusieurs monitors pour chaque région, créez un [monitor composite][3] pour chaque étape de déploiement ou région. Chaque monitor composite est une combinaison logique de plusieurs monitors qui, ensemble, indiquent le statut général d'une étape de déploiement.
3. Configurez ensuite Datadog comme check de santé dans la topologie Azure Deployment Manager [dans le cadre du déploiement][4]. Définissez ces étapes de check de santé comme dépendances entre les étapes de déploiement. Utilisez [ce modèle](#Exemple-de-configuration-complete) en remplaçant `<CLÉ_API>` et `<CLÉ_APP>` par vos clés d'API et d'application Datadog. Créez une section dans `resources` pour chaque monitor (ou monitor composite) que vous venez de créer, et remplacez `<ID_MONITOR>` par l'ID du monitor. Il est possible d'ajouter plusieurs checks dans une [étape de check de santé](#Exemple-d-etape-de-check-de-sante), mais Datadog vous conseille de créer un [check](#Exemple-de-check-de-sante) par étape de check de santé, puis de créer des étapes de check de santé supplémentaires pour chaque monitor composite. Si vous définissez le check avec autre chose qu'un monitor composite, veillez à mettre à jour le `regex` en conséquence.
4. Suivez la [documentation Microsoft][5] pour lancer le déploiement.

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

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-tutorial
[2]: https://www.datadoghq.com/blog/canary-deployments-with-azure-and-datadog/
[3]: https://docs.datadoghq.com/fr/monitors/monitor_types/composite/
[4]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-overview#rollout-template
[5]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-overview
[6]: https://docs.datadoghq.com/fr/help/