---
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Utiliza Datadog para monitorizar implementaciones de Canary en Azure
  Deployment Manager.
doc_link: https://docs.datadoghq.com/integrations/azure_deployment_manager/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/canary-deployments-with-azure-and-datadog/
  tag: Blog
  text: Lanzamientos de Canary con Azure Deployment Manager y Datadog
git_integration_title: azure_deployment_manager
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Deployment Manager
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_deployment_manager
public_title: Datadog-Microsoft Azure Deployment Manager
short_description: Monitoriza implementaciones de Canary en Azure Deployment Manager.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Deployment Manager (ADM) permite gestionar un despliegue por etapas para implementar aplicaciones complejas de forma segura.

Utiliza Datadog para crear un check de estado para Azure Deployment Manager y para detener la implementación si se detectan problemas.

## Configuración

### Instalación

Para utilizar Datadog como check del estado de ADM, necesitas una cuenta activa de Datadog 
y una instancia activa de Azure Deployment Manager.

### Configuración

1. Empieza por configurar monitores en Datadog para tu implementación. Comienza con un monitor para cada región. En función de la complejidad de tu aplicación, es posible que desees tener monitores para diferentes partes de la implementación en cada región. Completar el [Tutorial: Usar Azure Deployment Manager con plantillas de Resource Manager][1] te puede ayudar a decidir dónde monitorizar. Para monitorizar ideas, desmarca [el blog][2].
2. Si al final tienes varios monitores para cada región, crea un [monitor compuesto][3] para cada paso o región de despliegue. Cada monitor compuesto es una combinación lógica de otros monitores que juntos indican el estado general de un paso de implementación.
3. A continuación, configura Datadog como check de estado en la topología de Azure Deployment Manager [como parte del despliegue][4]. Establece estos pasos de check de estado como dependencias entre los pasos de implementación. Utiliza la [plantilla](#full-configuration-example) y sustituye `<API_KEY>` y `<APP_KEY>` por tus claves de la API y la aplicación Datadog. Crea una sección en `resources` para cada monitor (o monitor compuesto) que acabas de crear y sustituye `<MONITOR_ID>` por los ID de monitor. Es posible añadir varios checks dentro de un [paso de check de estado](#example-health-check-step), pero Datadog recomienda crear un [check](#example-health-check) por cada paso de check de estado y luego, crear pasos de check de estado adicionales para cada monitor compuesto. Si estás configurando el check con algo más que un monitor compuesto, asegúrate de actualizar la `regex` en consecuencia.
4. Sigue la [documentación de Microsoft][5] para iniciar la implementación.

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

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog][6].

[1]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-tutorial
[2]: https://www.datadoghq.com/blog/canary-deployments-with-azure-and-datadog/
[3]: https://docs.datadoghq.com/es/monitors/monitor_types/composite/
[4]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-overview#rollout-template
[5]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-overview
[6]: https://docs.datadoghq.com/es/help/