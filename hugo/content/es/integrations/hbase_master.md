---
app_id: hbase-master
app_uuid: e53ed650-6454-4f69-abfc-2cedd35ec2c3
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: hbase.master.assignmentmanager.rit_oldest_age
      metadata_path: metadata.csv
      prefix: hbase.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10228
    source_type_name: HBase maestro
  logs:
    source: hbase
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: everpeace@gmail.com
  support_email: everpeace@gmail.com
categories:
- almacenes de datos
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/hbase_master/README.md
display_on_public_website: true
draft: false
git_integration_title: hbase_master
integration_id: hbase-master
integration_title: Hbase maestro
integration_version: 1.1.1
is_public: true
manifest_version: 2.0.0
name: hbase_master
public_title: Hbase maestro
short_description: Integración de HBase maestro.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Stores
  - Categoría::Recopilación de logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Integración de HBase maestro.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Hbase maestro
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Obtén métricas del servicio Hbase_master en tiempo real para:

- Visualiza y monitoriza estados de Hbase_master.
- Recibe notificaciones sobre conmutaciones por error y eventos de Hbase_master.

## Configuración

El check de Hbase_master no está incluido en el paquete del [Datadog Agent][1], por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de Hbase_master en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][2].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-hbase_master==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como una [integración][3] de base.

### Configuración

1. Edita el archivo `hbase_master.d/conf.yaml` en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][4] para empezar a recopilar las [métricas](#metrics) de Hbase_master. Consulta el [hbase_master.d/conf.yaml de ejemplo][5] para conocer todas las opciones de configuración disponibles.

    **NOTA**: Si utilizas el Agent v6, asegúrate de modificar el archivo [`hbase_master.d/metrics.yaml`][6] y entrecomilla las claves booleanas.

    ```yaml
      - include:
          domain: Hadoop
          bean:
            - Hadoop:service=HBase,name=Master,sub=Server
          attribute:
            # Is Active Master
            tag.isActiveMaster:
               metric_type: gauge
               alias: hbase.master.server.tag.is_active_master
               values: {"true": 1, "false": 0, default: 0}
    ```

2. [Reinicia el Agent][7]

### Recopilación de logs

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `hbase_master.d/conf.yaml` para empezar a recopilar tus logs de Hbase_master:

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: hbase
   ```

   Cambia el valor del parámetro `path` y configúralo para tu entorno.
   Para conocer todas las opciones de configuración disponibles, consulta el [hbase_master.d/conf.yaml de ejemplo][8].

3. [Reinicia el Agent][7].

### Validación

[Ejecuta el subcomando de estado del Agent][8] y busca `hbase_master` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "hbase_master" >}}


### Eventos

El check de Hbase_master no incluye eventos.

### Checks de servicios

El check de Hbase_master no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].




<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->
## Integración HBase RegionServer

## Información general

Obtén métricas del servicio HBase RegionServer en tiempo real para:

- Visualiza y monitoriza estados de HBase RegionServer.
- Recibe notificaciones sobre fallos y eventos de HBase RegionServer.

## Configuración

El check de y eventos no está incluido en el paquete del [Datadog Agent][1], por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de y eventos en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][2].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-hbase_regionserver==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como una [integración][3] de base.

### Configuración

1. Edita el archivo `hbase_regionserver.d/conf.yaml` en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][4] para empezar a recopilar las [métricas](#metrics) de HBase RegionServer. Consulta el [hbase_regionserver.d/conf.yaml de ejemplo][10] para conocer todas las opciones de configuración disponibles.

2. [Reinicia el Agent][7]

### Recopilación de logs

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `hbase_regionserver.d/conf.yaml` para empezar a recopilar tus logs de Hbase_regionserver:

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: hbase
   ```

   Cambia el valor del parámetro `path` y configúralo para tu entorno.
   Para conocer todas las opciones de configuración disponibles, consulta el [hbase_regionserver.d/conf.yaml de ejemplo][10].

3. [Reinicia el Agent][7].

## Validación

[Ejecuta el subcomando de estado del Agent][8] y busca `hbase_regionserver` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "hbase_regionserver" >}}


### Eventos

El check de HBase RegionServer check no incluye eventos.

### Checks de servicios

El check de HBase RegionServer check no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/es/getting_started/integrations/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/hbase_master/datadog_checks/hbase_master/data/conf.yaml.example
[6]: https://github.com/DataDog/integrations-extras/blob/master/hbase_master/datadog_checks/hbase_master/data/metrics.yaml
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#service-status
[9]: http://docs.datadoghq.com/help
[10]: https://github.com/DataDog/integrations-extras/blob/master/hbase_regionserver/datadog_checks/hbase_regionserver/data/conf.yaml.example