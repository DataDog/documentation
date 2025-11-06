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

1. Empiece por configurar monitores en Datadog para su despliegue. Comience con un monitor (noun) para cada región. Dependiendo de la complejidad de su aplicación, es posible que desee tener monitores para diferentes partes del despliegue en cada región. Completar el [Tutorial: Use Azure Deployment Manager with Resource Manager templates](https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-tutorial) puede ayudarle a decidir dónde monitor (noun). Para monitor (noun) ideas, echa un vistazo a [el blog](https://www.datadoghq.com/blog/canary-deployments-with-azure-and-datadog/).
1. Si acaba teniendo varios monitores para cada región, cree un [composite (compuesto) monitor (noun) ](https://docs.datadoghq.com/monitors/monitor_types/composite (compuesto)/) para cada despliegue step (UI) / paso (generic) o región. Cada composite (compuesto) monitor (noun) es una combinación lógica de otros monitores que juntos indican el estado general de un despliegue step (UI) / paso (generic).
1. A continuación, configure Datadog como comprobación de estado en Azure Deployment Manager topology (topología) [como parte del despliegue](https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-overview#rollout-template). Configure estos pasos de comprobación de salud como dependencias entre los pasos de despliegue. Utilice la [plantilla](#full-configuration-example) y sustituya `<API_KEY>` y `<APP_KEY>` por sus claves de API y aplicación Datadog. Cree una sección en `resources` para cada monitor (noun) (o composite (compuesto) monitor (noun) ) que acaba de crear y sustituya `<MONITOR_ID>` por los ID de monitor (noun). Es posible añadir múltiples comprobaciones dentro de una [comprobación de salud step (UI) / paso (generic)](#ejemplo-de-comprobación-de-salud-step (UI) / paso (generic)), pero Datadog recomienda que cree una [comprobación](#ejemplo-de-comprobación-de-salud) por cada comprobación de salud step (UI) / paso (generic), y luego cree pasos adicionales de comprobación de salud para cada composite (compuesto) monitor (noun) . Si está configurando el chequeo con algo más que un composite (compuesto) monitor (noun) , asegúrese de actualizar el `regex` en consecuencia.
1. Siga la [documentación de Microsoft](https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-overview) para iniciar la implantación.

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

¿Necesita ayuda? Póngase en contacto con [Datadog support](https://docs.datadoghq.com/help/).