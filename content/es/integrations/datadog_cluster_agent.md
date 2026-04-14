---
app_id: datadog-cluster-agent
app_uuid: b6c2b71b-38c9-4769-86ad-516953849236
assets:
  dashboards:
    Datadog Cluster Agent - Overview: assets/dashboards/datadog_cluster_agent_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: datadog.cluster_agent.api_requests
      metadata_path: metadata.csv
      prefix: datadog.cluster_agent.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10108
    source_type_name: Datadog Cluster Agent
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- contenedores
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/README.md
display_on_public_website: true
draft: false
git_integration_title: datadog_cluster_agent
integration_id: datadog-cluster-agent
integration_title: Datadog Cluster Agent
integration_version: 5.5.0
is_public: true
manifest_version: 2.0.0
name: datadog_cluster_agent
public_title: Datadog Cluster Agent
short_description: Seguimiento de métricas del Datadog Cluster Agent
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  - Categoría::Contenedores
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Seguimiento de métricas del Datadog Cluster Agent
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Datadog Cluster Agent
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza el [Datadog Cluster Agent][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check del Datadog Cluster Agent está incluido en el paquete del [Datadog Agent][2].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración
El check del Datadog Cluster Agent utiliza [Autodiscovery][3] para configurarse automáticamente en la mayoría de los casos. El check se ejecuta en el pod del Datadog Agent, en el mismo nodo que el pod del Cluster Agent, pero no se ejecutará en el propio Cluster Agent.

Si necesitas configurar el check:

1. Edita el archivo `datadog_cluster_agent.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para comenzar a recopilar los datos de rendimiento del Datadog Cluster Agent. Consulta el [datadog_cluster_agent.d/conf.yaml de ejemplo][4] para conocer todas las opciones de configuración disponibles.

2. [Reinicia el Agent][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `datadog_cluster_agent` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "datadog_cluster_agent" >}}


### Eventos

La integración Datadog Cluster Agent no incluye eventos.

### Checks de servicios
{{< get-service-checks-from-git "datadog_cluster_agent" >}}


## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].


[1]: https://docs.datadoghq.com/es/agent/cluster_agent/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/es/getting_started/containers/autodiscovery/
[4]: https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/datadog_checks/datadog_cluster_agent/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/assets/service_checks.json
[9]: https://docs.datadoghq.com/es/help/