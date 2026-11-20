---
app_id: vespa
app_uuid: 9e31df30-189f-468f-88c7-9c73caf4cdca
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: vespa.mem.heap.free.average
      metadata_path: metadata.csv
      prefix: vespa.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10212
    source_type_name: Vespa
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Vespa
  sales_email: dd@vespa.ai
  support_email: dd@vespa.ai
categories:
- almacenes de datos
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/vespa/README.md
display_on_public_website: true
draft: false
git_integration_title: vespa
integration_id: vespa
integration_title: Vespa
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: vespa
public_title: Vespa
short_description: Monitorización del estado y el rendimiento de los grandes datos
  que alimentan el motor Vespa
supported_os:
- Linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Categoría::Almacenes de datos
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorización del estado y el rendimiento de los grandes datos que
    alimentan el motor Vespa
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Vespa
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Recopila métricas de tu sistema [Vespa][1] en tiempo real para:

- Visualizar y monitorizar el estado y el rendimiento de Vespa
- Alertas sobre estado y disponibilidad

## Configuración

El check de Vespa no está incluido en el paquete del [Datadog Agent][2], por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de Vespa en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][3].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-vespa==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][4] de base.

### Configuración

Para configurar el check de Vespa:

1. Crea una carpeta `vespa.d/` en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][5].
2. Crea un archivo `conf.yaml` en la carpeta `vespa.d/` creada anteriormente.
3. Consulta el archivo [vespa.d/conf.yaml de ejemplo][6] y copia su contenido en el archivo `conf.yaml`.
4. Edita el archivo `conf.yaml` para configurar el `consumer`, que decide sobre el conjunto de métricas reenviadas por el check:
   - `consumer`: El consumidor para el que se van a recopilar métricas, ya sea `default` o un [consumidor personalizado][7]
     de services.xml de tu aplicación Vespa.
5. [Reinicia el Agent][8].

### Validación

[Ejecuta el subcomando de estado del Agent][9] y busca `vespa` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "vespa" >}}


### Eventos

La integración Vespa no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "vespa" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][12].


[1]: https://vespa.ai/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/vespa/datadog_checks/vespa/data/conf.yaml.example
[7]: https://docs.vespa.ai/documentation/reference/services-admin.html#metrics
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-extras/blob/master/vespa/metadata.csv
[11]: https://github.com/DataDog/integrations-extras/blob/master/vespa/assets/service_checks.json
[12]: https://docs.datadoghq.com/es/help/