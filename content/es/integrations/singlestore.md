---
app_id: singlestore
app_uuid: 5e8c3b5f-278f-4423-90d9-969c06a478eb
assets:
  dashboards:
    Singlestore Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: singlestore.bytes_received
      metadata_path: metadata.csv
      prefix: singlestore.
    process_signatures:
    - memsqld
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10215
    source_type_name: SingleStore
  monitors:
    License will expire soon: assets/monitors/license_expiration.json
    Read queries failure rate is high: assets/monitors/read_failures.json
    Write queries failure rate is high: assets/monitors/write_failures.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenes de datos
- recopilación de logs
- la red
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/singlestore/README.md
display_on_public_website: true
draft: false
git_integration_title: singlestore
integration_id: singlestore
integration_title: SingleStore
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: singlestore
public_title: SingleStore
short_description: Recopila métricas de SingleStore de leaves y agregadores.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Almacenes de datos
  - Categoría::Recopilación de logs
  - Categoría::Red
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Recopila métricas de SingleStore de leaves y agregadores.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: SingleStore
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [SingleStore][1] a través del Datadog Agent. SingleStore ofrece un procesamiento transaccional y analítico de los datos almacenados. Habilita la integración SingleStoreDB en Datadog para:

- Comprender el estado de clústeres y nodos a través de métricas y eventos.
- Abordar las caídas en la capacidad de almacenamiento.
- Mejorar la eficiencia en la utilización de los recursos.


## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de SingleStore está incluido en el paquete del [Datadog Agent][3].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

#### Host

##### Recopilación de métricas
1. Edita el archivo `singlestore.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de tu SingleStore. Para conocer todas las opciones de configuración disponibles, consulta el [singlestore.d/conf.yaml de ejemplo][4].

2. [Reinicia el Agent][5].

**Nota**: Por defecto, la integración SingleStore sólo recopila métricas de las tablas `MV_GLOBAL_STATUS`, `AGGREGATORS` y `LEAVES`. Para recopilar métricas adicionales a nivel de sistema (CPU, disco, E/S de red y memoria), configura `collect_system_metrics: true` en tu archivo `singlestore.d/conf.yaml`.

##### Recopilación de logs


{{< site-region region="us3" >}}
**Este sitio no admite la recopilación de logs.**
{{< /site-region >}}


1. La recopilación de logs está desactivada por defecto en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade los archivos de logs que te interesan a tu archivo `singlestore.d/conf.yaml` para empezar a recopilar tus logs de SingleStore:

   ```yaml
     logs:
       - type: file
         path: /var/lib/memsql/<NODE_ID>/tracelogs/memsql.log
         source: singlestore
         service: "<SERVICE_NAME>"
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Consulta el [singlestore.d/conf.yaml de ejemplo][4] para ver todas las opciones de configuración disponibles.

3. [Reinicia el Agent][5].

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

#### Recopilación de métricas

| Parámetro            | Valor                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `singlestore`                                                   |
| `<INIT_CONFIG>`      | en blanco o `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%", "port": "%%port%%", "username": "<USER>", "password": "<PASSWORD>"}`       |

##### Recopilación de logs


{{< site-region region="us3" >}}
**Este sitio no admite la recopilación de logs.**
{{< /site-region >}}


La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes][6].

| Parámetro      | Valor                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "singlestore", "service": "<SERVICE_NAME>"}` |


### Validación

Ejecuta el [subcomando de estado del Agent][7] y busca `singlestore` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "singlestore" >}}



### Eventos

La integración SingleStore no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "singlestore" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].


[1]: https://www.singlestore.com/
[2]: https://docs.datadoghq.com/es/getting_started/agent/autodiscovery#integration-templates
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/singlestore/datadog_checks/singlestore/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/kubernetes/log/
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/singlestore/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/singlestore/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/