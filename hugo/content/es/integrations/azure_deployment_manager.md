---
app_id: azure_deployment_manager
categories:
- nube
- azure
custom_kind: integración
description: Monitoriza implementaciones de Canary en Azure Deployment Manager.
further_reading:
- link: https://www.datadoghq.com/blog/canary-deployments-with-azure-and-datadog/
  tag: Blog
  text: Lanzamientos de Canary con Azure Deployment Manager y Datadog
title: Microsoft Azure Deployment Manager
---
## Información general

Azure Deployment Manager (ADM) permite gestionar un despliegue por etapas para implementar aplicaciones complejas de forma segura.

Utiliza Datadog para crear un check de estado para Azure Deployment Manager y para detener la implementación si se detectan problemas.

## Configuración

### Instalación

Para utilizar Datadog como check del estado de ADM, necesitas una cuenta activa de Datadog 
y una instancia activa de Azure Deployment Manager.

### Configuración

1. Empieza por configurar monitores en Datadog para tu despliegue. Comienza con un monitor para cada región. Según la complejidad de tu aplicación, es posible que desees tener monitores para diferentes partes del despliegue en cada región. Puedes hacer el [tutorial: Use Azure Deployment Manager with Resource Manager templates](https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-tutorial) para ayudarte a decidir dónde monitorizar. Para ideas de monitor, echa un vistazo al [blog](https://www.datadoghq.com/blog/canary-deployments-with-azure-and-datadog/).
1. Si acabas teniendo varios monitores para cada región, crea un [monitor compuesto](https://docs.datadoghq.com/monitors/monitor_types/composite/) para cada paso de despliegue o región. Cada monitor compuesto es una combinación lógica de otros monitores que juntos indican el estado general de un paso de despliegue.
1. A continuación, configura Datadog como check de estado en la topología de Azure Deployment Manager [como parte del despliegue](https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-overview#rollout-template). Configura estos pasos de check de estado como dependencias entre los pasos de despliegue. Utiliza la [plantilla](#full-configuration-example) y sustituye `<API_KEY>` y `<APP_KEY>` por tus claves de API y de aplicación de Datadog. Crea una sección en `resources` para cada monitor (o monitor compuesto) que acabas de crear y sustituye `<MONITOR_ID>` por los ID de monitor. Es posible añadir múltiples checks dentro de un [paso de check de estado](#example-health-check-step), pero Datadog recomienda que crees un [check](#example-health-check) por cada paso de check de estado y luego crea pasos adicionales de check de estado para cada monitor compuesto. Si estás configurando el check con algo más que un monitor compuesto, asegúrate de actualizar el `regex` en consecuencia.
1. Sigue la [documentación de Microsoft](https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-overview) para iniciar el despliegue.

#### Ejemplo de check de estado

La siguiente es la parte de la plantilla de despliegue de Azure Deployment Manager que se considera el check de estado.

```json
{
    "healthChecks": [
        {
            "name": "datadogCompositeMonitor1",
            "request": {
                "method": "GET",
                "uri": "https://api.datadoghq.com/api/v1/monitor/<MONITOR_ID>?application_key=<APP_KEY>",
                "authentication": {
                    "type": "ApiKey",
                    "name": "apikey",
                    "in": "Query",
                    "value": "<API_KEY>"
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

#### Ejemplo de paso de check de estado

La siguiente es la parte de la plantilla de despliegue de Azure Deployment Manager que se considera el paso de check de estado.

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
                            "uri": "https://api.datadoghq.com/api/v1/monitor/<MONITOR_ID>?application_key=<APP_KEY>",
                            "authentication": {
                                "type": "ApiKey",
                                "name": "apikey",
                                "in": "Query",
                                "value": "<API_KEY>"
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

#### Ejemplo de configuración completa

La siguiente es una plantilla completa para un paso de despliegue de Azure Deployment Manager.

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
                                    "uri": "https://api.datadoghq.com/api/v1/monitor/<MONITOR_ID>?application_key=<APP_KEY>",
                                    "authentication": {
                                        "type": "ApiKey",
                                        "name": "apikey",
                                        "in": "Query",
                                        "value": "<API_KEY>"
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

### Resultados

Al realizar el paso de check de estado para una fase de la implementación, Azure Deployment Manager consulta la API Datadog Monitor para conocer el estado del monitor compuesto identificado en el paso de check de estado para esa fase de la implementación.

Azure Deployment Manager analiza la respuesta utilizando la expresión regular proporcionada en la plantilla para identificar si contiene la frase `overall_status: OK`.

Si se encuentra `overall_status: OK`, se considera que el check está en buen estado. Si el estado es `Warn`, `No Data`, o `Alert`, entonces se considera que el check no está en buen estado y Azure Deployment Manager detiene la implementación.

## Datos recopilados

### Métricas

Azure Deployment Manager no informa de ninguna métrica.

### Eventos

Azure Deployment Manager no incluye ningún evento.

### Checks de servicio

Azure Deployment Manager no incluye ningún check de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).