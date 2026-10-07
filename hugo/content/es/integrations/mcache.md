---
app_id: memcached
app_uuid: 711c00b1-c62c-4a50-867b-be1929950b2c
assets:
  dashboards:
    memcached: assets/dashboards/memcached_dashboard.json
    memcached_screenboard: assets/dashboards/memcached_screenboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: memcache.uptime
      metadata_path: metadata.csv
      prefix: memcache.
    process_signatures:
    - memcached
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 32
    source_type_name: Memcached
  saved_views:
    memcached_processes: assets/saved_views/memcached_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- log collection
- tracing
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/mcache/README.md
display_on_public_website: true
draft: false
git_integration_title: mcache
integration_id: memcached
integration_title: Memcache
integration_version: 6.1.0
is_public: true
manifest_version: 2.0.0
name: mcache
public_title: Memcache
short_description: Rastrea el uso de la memoria, los aciertos, los errores, los desalojos,
  el porcentaje de rellenado y más.
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Almacenamiento en caché
  - Category::Recopilación de logs
  - Category::Rastreo
  - Supported OS::Linux
  - Supported OS::macOS
  - Offering::integración
  configuration: README.md#Setup
  description: Rastrea el uso de la memoria, los aciertos, los errores, los desalojos,
    el porcentaje de rellenado y más.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/speed-up-web-applications-memcached
  - resource_type: blog
    url: https://www.datadoghq.com/blog/instrument-memcached-performance-metrics-dogstatsd
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitoring-elasticache-performance-metrics-with-redis-or-memcached
  support: README.md#Support
  title: Memcache
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

El check de Memcache del Agent te permite rastrear el uso de la memoria de Memcache, los aciertos, los errores, los desalojos, el porcentaje de rellenado y mucho más.

## Configuración

### Instalación

El check de Memcache está incluido en el paquete del [Datadog Agent][1], por lo que no necesitas instalar nada más en tus servidores de Memcache.

### Configuración

Sigue las instrucciones de abajo para configurar este check para un Agent que se ejecuta en un host. En el caso de entornos en contenedores, consulta la sección [Contenedores](#containerized).

Al iniciar el servidor Memcache, establece el protocolo de enlace `-B` en `binary` o `auto`. El valor predeterminado es Automatic (auto).

#### Recopilación de métricas

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host, haz lo siguiente:

1. Edita el archivo `mcache.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][1]. Consulta el [archivo de ejemplo mcache.d/conf.yaml][2] para conocer todas las opciones de configuración disponibles:

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## url used to connect to the Memcached instance.
     #
     - url: localhost
   ```

2. [Reinicia el Agent][3] para empezar a enviar métricas de Memcache a Datadog.

##### Recopilación de trazas

Datadog APM se integra con Memcache para ver las trazas (traces) en todo el sistema distribuido. La recopilación de trazas se encuentra habilitada de manera predeterminada en el Datadog Agent versión 6 o posterior. Para empezar a recopilar trazas:

1. [Habilita la recopilación de trazas en Datadog][4].
2. [Instrumenta la aplicación que realiza solicitudes a Memcache][5].

[1]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/conf.yaml.example
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/es/tracing/send_traces/
[5]: https://docs.datadoghq.com/es/tracing/setup/
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### Contenedores

En el caso de los entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican abajo.

| Parámetro            | Valor                                 |
| -------------------- | ------------------------------------- |
| `<INTEGRATION_NAME>` | `mcache`                              |
| `<INIT_CONFIG>`      | en blanco o `{}`                         |
| `<INSTANCE_CONFIG>`  | `{"url": "%%host%%","port": "11211"}` |

##### Recopilación de trazas

APM para aplicaciones en contenedores es compatible con los hosts que ejecutan el Agent versión 6, o posterior, pero requiere una configuración adicional a fin de empezar a recopilar trazas.

Variables de entorno necesarias en el contenedor del Agent:

| Parámetro            | Valor                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

Consulta el [Rastreo de aplicaciones de Kubernetes][2] y la [Configuración del daemon de Kubernetes][3] para obtener una lista completa de las variables de entorno y configuración disponibles.

Luego, [instrumenta tu contenedor de aplicaciones][4] y configura `DD_AGENT_HOST` con el nombre del contenedor de tu Agent.

#### Recopilación de logs

_Disponible para las versiones del Agent a partir de la 6.0_

1. Añade este bloque de configuración a tu archivo `mcache.d/conf.yaml` para empezar a recopilar logs de Memcached:

   ```yaml
   logs:
     - type: file
       path: /var/log/memcached.log
       source: memcached
       service: mcache
   ```

    Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno.

2. [Reinicia el Agent][5] para validar estos cambios.

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/apm/?tab=java
[3]: https://docs.datadoghq.com/es/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[4]: https://docs.datadoghq.com/es/tracing/setup/
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{< /tabs >}}

### Validación

Ejecuta el [subcomando `status` del Agent][2] y busca `mcache` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "mcache" >}}


El check solo recopila métricas `memcache.slabs.*` si estableces `options.slabs: true` en `mcache.d/conf.yaml`. Del mismo modo, solo recopila métricas `memcache.items.*` si estableces `options.items: true`.

### Eventos

El check de Mcache no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "mcache" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

## Referencias adicionales

- [Aceleración de aplicaciones web con la monitorización de Memcached][4]
- [Instrumentación de métricas de rendimiento de Memcached con DogStatsD][5]
- [Monitorización de métricas de rendimiento de ElastiCache con Redis o Memcached][6]


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/es/help/
[4]: https://www.datadoghq.com/blog/speed-up-web-applications-memcached
[5]: https://www.datadoghq.com/blog/instrument-memcached-performance-metrics-dogstatsd
[6]: https://www.datadoghq.com/blog/monitoring-elasticache-performance-metrics-with-redis-or-memcached