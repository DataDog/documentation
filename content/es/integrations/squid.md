---
app_id: squid
app_uuid: de18c581-69ee-48cf-ba23-7794bfb7a4bd
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: squid.cachemgr.cpu_time
      metadata_path: metadata.csv
      prefix: squid.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10022
    source_type_name: Squid
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- log collection
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/squid/README.md
display_on_public_website: true
draft: false
git_integration_title: squid
integration_id: squid
integration_title: Squid
integration_version: 4.0.0
is_public: true
manifest_version: 2.0.0
name: squid
public_title: Squid
short_description: Seguimiento de métricas de tus servidores squid-cache con Datadog
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Almacenamiento en caché
  - Category::Recopilación de logs
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integración
  configuration: README.md#Configuración
  description: Seguimiento de métricas de tus servidores squid-cache con Datadog
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Squid
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza métricas de [Squidi][1] del Gestor de caché a través del Datadog Agent.

## Configuración

### Instalación

El check de Squid del Agent está incluido en el paquete del [Datadog Agent][2]. No es necesaria ninguna instalación adicional en tu servidor Squid.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `squid.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][1]. Para conocer todas las opciones de configuración disponibles, consulta el [squid.d/conf.yaml de ejemplo][2]:

2. [Reinicia el Agent][3].

##### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Descomenta y edita este bloque de configuración en la parte inferior de tu archivo `squid.d/conf.yaml`:

   ```yaml
   logs:
     - type: file
       path: /var/log/squid/cache.log
       service: "<SERVICE-NAME>"
       source: squid
     - type: file
       path: /var/log/squid/access.log
       service: "<SERVICE-NAME>"
       source: squid
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno.

3. [Reinicia el Agent][3].

[1]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/squid/datadog_checks/squid/data/conf.yaml.example
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `squid`                                                                |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                          |
| `<INSTANCE_CONFIG>`  | `{"name": "<SQUID_INSTANCE_NAME>", "host": "%%host%%", "port":"3128"}` |

##### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes][2].

| Parámetro      | Valor                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "squid", "service": "<YOUR_APP_NAME>"}` |

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/log/?tab=containerinstallation#setup
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][3] y busca `squid` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "squid" >}}


### Eventos

El check de Squid no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "squid" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].



[1]: http://www.squid-cache.org/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/help/