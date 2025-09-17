---
app_id: aerospike
app_uuid: 68799442-b764-489c-8bbd-44cb11a15f4e
assets:
  dashboards:
    Aerospike Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - aerospike.uptime
      - aerospike.namespace.memory_free_pct
      metadata_path: metadata.csv
      prefix: aerospike.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10067
    source_type_name: Aerospike
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- log collection
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/aerospike/README.md
display_on_public_website: true
draft: false
git_integration_title: aerospike
integration_id: aerospike
integration_title: Aerospike
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: aerospike
public_title: Aerospike
short_description: Recopila las estadísticas de clúster y espacios de nombres de la
  base de datos de Aerospike
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Data Stores
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Recopila las estadísticas de clúster y espacios de nombres de la base
    de datos de Aerospike
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Aerospike
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Obtén métricas de la base de datos de Aerospike en tiempo real para:

- Visualizar y monitorizar estados de Aerospike.
- Recibir notificaciones sobre los fallos y eventos de Aerospike.

## Configuración

NOTA: La integración de Aerospike actual solo es compatible con el servidor Aerospike v4.9 o posterior, consulta las [notas de versión de la librería de cliente de Python][1] de Aerospike para obtener más información.
Si utilizas una versión anterior del servidor Aerospike, todavía es posible monitorizar la versión 7.29.0 o inferior del Datadog Agent.

### Instalación

El check de Aerospike está incluido en el paquete del [Datadog Agent][2].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

##### Recopilación de métricas
Para configurar este check para un Agent que se ejecuta en un host:

1. Instala y configura el [Aerospike Prometheus Exporter][1] (consulta la [documentación de Aerospike][2] para más detalles).

2. Edita el archivo `aerospike.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de Aerospike. Consulta el [aerospike.d/conf.yaml de ejemplo][3] para ver todas las opciones disponibles de configuración.

3. [Reinicia el Agent][4].

**Nota**: La versión 1.16.0+ de este check utiliza [OpenMetrics][5] para la recopilación de métricas, que requiere Python 3. Para los hosts que no puedan utilizar Python 3, o si deseas utilizar una versión legacy de este check, consulta el [ejemplo de configuración][6].

##### Recopilación de logs


1. La recopilación de logs está desactivada por defecto en el Datadog Agent, debes activarla en `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `aerospike.d/conf.yaml` para empezar a recopilar tus logs de Aerospike:

   ```yaml
   logs:
     - type: file
       path: /var/log/aerospike/aerospike.log
       source: aerospike
   ```

    Cambia el valor de los parámetros `path` y configúralos para tu entorno. Consulta el [aerospike.d/conf.yaml de ejemplo][3] para ver todas las opciones disponibles de configuración.

3. [Reinicia el Agent][4].

[1]: https://github.com/aerospike/aerospike-prometheus-exporter
[2]: https://docs.aerospike.com/monitorstack/new/installing-components
[3]: https://github.com/DataDog/integrations-core/blob/master/aerospike/datadog_checks/aerospike/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/integrations/openmetrics/
[6]: https://github.com/DataDog/integrations-core/blob/7.36.x/aerospike/datadog_checks/aerospike/data/conf.yaml.example
{{% /tab %}}
{{% tab "Contenedorizado" %}}


#### Contenedores

Para entornos en contenedores, consulta [Configurar integraciones con Autodiscovery en Kubernetes][1] o [Configurar integraciones con Autodiscovery en Docker][2] para obtener orientación sobre la aplicación de los parámetros a continuación. Consulta el [aerospike.d/conf.yaml de ejemplo][3] para ver todas las opciones disponibles de configuración.

##### Recopilación de métricas

| Parámetro            | Valor                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `aerospike`                          |
| `<INIT_CONFIG>`      | en blanco o `{}`                        |
| `<INSTANCES_CONFIG>`  | `{"openmetrics_endpoint": "http://%%host%%:9145/metrics"}` |

**Ejemplo**

Aplica la siguiente anotación a tu pod, donde `<CONTAINER_NAME>` es el nombre del contenedor de Aerospike o un [identificador personalizado][4]:

```
ad.datadoghq.com/<CONTAINER_NAME>.checks: |
  {
    "aerospike": {
      "init_config": {},
      "instances": [{"openmetrics_endpoint": "http://%%host%%:9145/metrics"}]
    }
  }
```


##### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes][5].

| Parámetro      | Valor                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "aerospike", "service": "<SERVICE_NAME>"}` |

**Ejemplo**

Aplica la siguiente anotación a tu pod, donde `<CONTAINER_NAME>` es el nombre del contenedor de Aerospike o un [identificador personalizado][4]:

```
ad.datadoghq.com/<CONTAINER_NAME>.logs: |
  [
    {
      "type": "file",
      "path": "/var/log/aerospike/aerospike.log",
      "source": "aerospike"
    }
  ]
```
[1]: https://docs.datadoghq.com/es/containers/kubernetes/integrations/
[2]: https://docs.datadoghq.com/es/containers/docker/integrations/
[3]: https://github.com/DataDog/integrations-core/blob/master/aerospike/datadog_checks/aerospike/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/containers/guide/ad_identifiers/
[5]: https://docs.datadoghq.com/es/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][3] y busca `aerospike` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "aerospike" >}}


### Checks de servicio

**aerospike.can_connect**
**aerospike.cluster_up**

### Eventos

Aerospike no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][4].


[1]: https://download.aerospike.com/download/client/python/notes.html#5.0.0
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/help/
