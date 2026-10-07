---
app_id: portworx
app_uuid: e682ab93-39cd-403b-a16f-8082961bc081
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: portworx.cluster.cpu_percent
      metadata_path: metadata.csv
      prefix: portworx.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10021
    source_type_name: Portworx
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Portworx
  sales_email: paul@portworx.com
  support_email: paul@portworx.com
categories:
- Kubernetes
- almacenes de datos
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/portworx/README.md
display_on_public_website: true
draft: false
git_integration_title: portworx
integration_id: portworx
integration_title: Portworx
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: portworx
public_title: Portworx
short_description: Recopila métricas del tiempo de ejecución de una instancia Portworx.
supported_os:
- Linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Kubernetes
  - Categoría::Almacenes de datos
  - Sistema operativo compatible::Linux
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Recopila métricas del tiempo de ejecución de una instancia Portworx.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/portworx-integration/
  support: README.md#Soporte
  title: Portworx
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Obtén métricas del servicio Portworx en tiempo real para:

- Monitorizar el estado y el rendimiento de tu clúster Portworx
- Realizar el seguimiento del uso del disco, la latencia y el rendimiento de los volúmenes Portworx

## Configuración

El check de Portworx está incluido en el paquete del [Datadog Agent][1], por lo que no necesitas instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de Portworx en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][2].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-portworx==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como una [integración][3] de base.

### Configuración

1. Edita el archivo `portworx.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][4], para empezar a recopilar tus [métricas](#metrics) de Portworx. Para conocer todas las opciones de configuración disponibles, consulta el [portworx.d/conf.yaml de ejemplo][5].

    ```yaml
    init_config:

    instances:
     # url of the metrics endpoint of prometheus
     - prometheus_endpoint: http://localhost:9001/metrics
    ```

2. [Reinicia el Agent][6].

### Validación

[Ejecuta el subcomando `info` del Agent][7]. Deberías ver algo como lo siguiente:

## Compatibilidad

El check de Portworx es compatible con Portworx v1.4.0 y posibles versiones anteriores.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "portworx" >}}


### Eventos

El check de Portworx no incluye eventos.

## Solucionar problemas

### El Agent no se puede conectar

```text
    portworx
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 0 service check
```

Comprueba que la `url` en `portworx.yaml` es correcta.

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorización del almacenamiento en contenedores multinube con Portworx y Datadog][9]


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/es/getting_started/integrations/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/portworx/datadog_checks/portworx/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/faq/agent-status-and-information/
[8]: https://github.com/DataDog/integrations-extras/blob/master/portworx/metadata.csv
[9]: https://www.datadoghq.com/blog/portworx-integration/