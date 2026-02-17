---
app_id: temporal
app_uuid: 6fbb6b85-e9f0-4d0e-af82-3c82871b857c
assets:
  dashboards:
    Temporal Server Overview: assets/dashboards/server_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: temporal.server.task.requests.count
      metadata_path: metadata.csv
      prefix: temporal.
    process_signatures:
    - temporal-server
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10337
    source_type_name: Temporal
  monitors:
    Frontend latency is elevated: assets/monitors/FrontendLatency.json
    History Service latency is elevated: assets/monitors/HistoryLatency.json
    Matching Service latency is elevated: assets/monitors/MatchingLatency.json
    Persistence latency is elevated: assets/monitors/PersistenceLatency.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- herramientas de desarrollo
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/temporal/README.md
display_on_public_website: true
draft: false
git_integration_title: temporal
integration_id: temporal
integration_title: Temporal
integration_version: 3.2.0
is_public: true
manifest_version: 2.0.0
name: temporal
public_title: Temporal
short_description: Monitoriza la salud y el rendimiento del clúster de Temporal.
supported_os:
- linux
- windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Recopilación de logs
  - Categoría::Herramientas de desarrollo
  - Tipo de datos enviados::Métricas
  - Tipo de datos enviados::Logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitoriza la salud y el rendimiento del clúster de Temporal.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/temporal-server-integration/
  support: README.md#Soporte
  title: Temporal
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Temporal][1] a través del Datadog Agent. 

**Nota**: Este check solo puede instalarse si autoalojas Temporal. **Para monitorizar tu instancia de Temporal Cloud**, consulta la [documentación de la integración Datadog Temporal Cloud][2]. 

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][3] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Temporal está incluido en el paquete del [Datadog Agent][4].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

##### Recopilación de métricas

1. Configura tus servicios Temporal para exponer métricas a través de un endpoint `prometheus` siguiendo la [documentación oficial de Temporal][1].

2. Edita el archivo `temporal.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de Temporal.

   Configura la opción `openmetrics_endpoint` para que coincida con las opciones `listenAddress` y `handlerPath` de configuración de tu servidor Temporal.

   ```yaml
   init_config:
   instances:
     - openmetrics_endpoint: <LISTEN_ADDRESS>/<HANDLER_PATH>
   ```

   Ten en cuenta que cuando los servicios Temporal de un clúster se despliegan de forma independiente, cada servicio expone sus propias métricas. Como resultado, es necesario configurar el endpoint `prometheus` para cada servicio que quieras monitorizar y definir una `instance` separada en la configuración de la integración para cada uno de ellos.

##### Recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Configura tu clúster de Temporal para que envíe logs a un archivo. Para ello consulta la [documentación oficial][2].

3. Descomenta y edita el bloque de configuración de logs en tu archivo `temporal.d/conf.yaml` y configura la `path` para que apunte al archivo que configuraste en tu clúster de Temporal:

  ```yaml
  logs:
    - type: file
      path: /var/log/temporal/temporal-server.log
      source: temporal
  ```

4. [Reinicia el Agent][3].

[1]: https://docs.temporal.io/references/configuration#prometheus
[2]: https://docs.temporal.io/references/configuration#log
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}

{{% tab "Contenedorizado" %}}

#### Contenedores

##### Recopilación de métricas

Para entornos contenedorizados, consulta [Configurar integraciones con Autodiscovery en Kubernetes][1] o [Configurar integraciones con Autodiscovery en Docker][2] para obtener instrucciones sobre el uso de los parámetros a continuación. Consulta el [temporal.d/conf.yaml de ejemplo][3] para ver todas las opciones de configuración disponibles.

| Parámetro            | Valor                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `temporal`                          |
| `<INIT_CONFIG>`      | en blanco o `{}`                        |
| `<INSTANCES_CONFIG>`  | `{"openmetrics_endpoint": "<LISTEN_ADDRESS>/<HANDLER_PATH>"}`, donde `<LISTEN_ADDRESS>` y `<HANDLER_PATH>` se sustituyen por `listenAddress` y `handlerPath` de la configuración de tu servidor Temporal. |

Ten en cuenta que cuando los servicios Temporal de un clúster se despliegan de forma independiente, cada servicio expone sus propias métricas. Como resultado, es necesario configurar el endpoint `prometheus` para cada servicio que quieras monitorizar y definir una `instance` separada en la configuración de la integración para cada uno de ellos.

**Ejemplo**

La siguiente anotación Kubernetes se aplica a un pod en `metadata`, donde `<CONTAINER_NAME>` es el nombre de tu contenedor Temporal (o un [identificador personalizado][4]):

```
ad.datadoghq.com/<CONTAINER_NAME>.checks: |
  {
    "temporal": {
      "init_config": {},
      "instances": [{"openmetrics_endpoint": "<LISTEN_ADDRESS>/<HANDLER_PATH>"}]
    }
  } 
```

##### Recopilación de logs

La recopilación de logs está deshabilitada por defecto en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Docker][5] o [Recopilación de logs de Kubernetes][6].

Aplica el siguiente parámetro de configuración a `logs`:

| Parámetro      | Valor                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "temporal", "type": "file", "path": "/var/log/temporal/temporal-server.log"}` |

**Ejemplo**

La siguiente anotación Kubernetes se aplica a un pod en `metadata`, donde `<CONTAINER_NAME>` es el nombre de tu contenedor Temporal (o un [identificador personalizado][4]):

```
ad.datadoghq.com/<CONTAINER_NAME>.logs: |
  [
    {
      "source": "temporal",
      "type": "file",
      "path": "/var/log/temporal/temporal-server.log"
    } 
  ]
```

[1]: https://docs.datadoghq.com/es/containers/kubernetes/integrations/
[2]: https://docs.datadoghq.com/es/containers/docker/integrations/
[3]: https://github.com/DataDog/integrations-core/blob/master/temporal/datadog_checks/temporal/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/containers/guide/ad_identifiers/
[5]: https://docs.datadoghq.com/es/containers/docker/log/
[6]: https://docs.datadoghq.com/es/agent/kubernetes/log/
{{% /tab %}}

{{< /tabs >}}


### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `temporal` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "temporal" >}}


### Eventos

La integración Temporal no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "temporal" >}}


### Logs

La integración Temporal puede recopilar logs del clúster de Temporal y reenviarlos a Datadog.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [soporte técnico de Datadog][6].

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorizar la salud de tu servidor Temporal con Datadog][7]



[1]: https://temporal.io/
[2]: https://docs.datadoghq.com/es/integrations/temporal_cloud/
[3]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/es/help/
[7]: https://www.datadoghq.com/blog/temporal-server-integration/