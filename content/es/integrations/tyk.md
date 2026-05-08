---
app_id: tyk
app_uuid: caca4c4f-104b-4d28-a051-f09bc58a0a32
assets:
  dashboards:
    Tyk Analytics Canvas: assets/dashboards/tyk_analytics_canvas.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - tyk.request_time.95percentile
      - tyk.request_time.count
      - tyk.request_time.avg
      - tyk.request_time.max
      - tyk.request_time.median
      metadata_path: metadata.csv
      prefix: tyk.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10233
    source_type_name: Tyk
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Tyk
  sales_email: yaara@tyk.io
  support_email: yaara@tyk.io
categories:
- métricas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/tyk/README.md
display_on_public_website: true
draft: false
git_integration_title: tyk
integration_id: tyk
integration_title: Tyk
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: tyk
public_title: Tyk
short_description: Realiza un seguimiento de solicitudes con estadísticas de tiempo
  segmentadas por resp-code, api, path, oauth, etc.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Categoría::Métricas
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Realiza un seguimiento de solicitudes con estadísticas de tiempo segmentadas
    por resp-code, api, path, oauth, etc.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Tyk
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Datadog puede recopilar y mostrar errores, tiempo de respuesta, duración, latencia, así como monitorizar el rendimiento del tráfico de API en [Tyk][1] para descubrir problemas en tus API o consumidores.

Tyk tiene una integración Datadog incorporada que recopila métricas de la [pasarela API de Tyk][2].

La pasarela API de Tyk registra todo el tráfico que procesa. Luego, envía esa información a Datadog y crea dashboards en torno a ella.

### Cómo funciona

La [bomba Tyk][3] escribe métricas de aplicaciones personalizadas y las envía a Datadog enviándolas a [DogStatsD][4], un servicio de agregación de métricas incluido en el Datadog Agent. DogStatsD implementa el protocolo StatsD, que añade algunas extensiones específicas de Datadog, incluido el tipo de métrica Histogram, utilizado por `Tyk-gateway`.

`Tyk-gateway` utiliza `Tyk-pump` para enviar los análisis que ha generado a Datadog.

Cuando se ejecuta el Datadog Agent, DogStatsD obtiene una métrica `request_time` de `Tyk-pump` en tiempo real, por solicitud, para que puedas comprender el uso de tus API y obtener la flexibilidad de agregar según varios parámetros como fecha, versión, código devuelto, método, etc.

La métrica personalizada que Tyk está utilizando es de tipo [DD_HISTOGRAM_AGGREGATES][5].

## Configuración

La integración Tyk está incluida en el paquete `tyk-pump`, por lo que sólo tienes que realizar la configuración en `pump.conf` (y no es necesario instalar nada en tu plataforma Tyk).

### Instalación

#### Instalación

Para esta integración necesitas tener una instalación Tyk en ejecución. Puedes instalar [Tyk autogestionado][6] o [Tyk OSS][7]. Ambas opciones incluyen `tyk-pump`.

#### Instalación del Datadog Agent

Instala el [Datadog Agent][8] en tu entorno.

Ejecuta el Datadog [Agent][9] en tu clúster K8s, como un contenedor Docker, en tu Mac o de cualquier forma, siempre que `Tyk pump` pueda acceder a él.

Para entornos contenedorizados, consulta las [plantillas de la integración Autodiscovery][10] para obtener más información. Para verificar que los cambios se han aplicado, [ejecuta los subcomandos de estado del Agent][11].


### Configuración

#### Bomba-Tyk
Para configurar una bomba Datadog, sigue las instrucciones de la [sección DogStatsD][12] del LÉEME de la bomba.

El siguiente es un ejemplo de configuración de una bomba de Datadog en `pump.conf`:

``` json
pump.conf:
...
   "dogstatsd": {
      "type": "dogstatsd",
      "meta": {
        "address": "dd-agent:8125",
        "namespace": "tyk",
        "async_uds": true,
        "async_uds_write_timeout_seconds": 2,
        "buffered": true,
        "buffered_max_messages": 32,
        "sample_rate": 0.9999999999,
        "tags": [
          "method",
          "response_code",
          "api_version",
          "api_name",
          "api_id",
          "org_id",
          "tracked",
          "path",
          "oauth_id"
        ]
      }
    },
```

Este [ejemplo][13] se ha tomado del proyecto [Tyk-demo][14], un proyecto de código abierto que pone en marcha una plataforma Tyk completa con un solo comando y ofrece ejemplos listos para utilizar, incluido el ejemplo de Datadog. Para ejecutar esta integración, utiliza `up.sh analytics-datadog`.

#### Configuración del Datadog Agent

La integración Tyk utiliza [DogStatsD][15]. Se trata de un servicio de agregación de métricas incluido con el Datadog Agent. DogStatsD implementa el protocolo `StatsD` y añade algunas extensiones específicas de Datadog. Tyk utiliza `Histogram metric type`.

Configura las siguientes variables de entorno de Datadog y DogStatsD en tu entorno:

| Variable de entorno DD | Valor | Descripción |
|---------------------------|-------------|------|
| DD_API_KEY | {tu_clave_de_api_datadog} | Para que el Datadog Agent se conecte con el portal DD. Tu clave API se encuentra en [Configuración de la cuenta][16]. |
| DD_ENV |    tyk-demo-env   |   Define el nombre del entorno. |
| DD_DOGSTATSD_TAGS | "env:tyk-demo" |  Etiquetas (tags) adicionales para añadir a todas las métricas, eventos y checks de servicio recibidos por este servidor DogStatsD. |
| DD_LOGS_ENABLED | true | Habilita la recopilación de logs para el Datadog Agent. |
| DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL | true | Recopila logs de los contenedores. |
| DD_DOGSTATSD_SOCKET | /var/run/docker.sock | Ruta al socket Unix a escuchar. Docker Compose crea esta ruta. |
| DD_DOGSTATSD_ORIGIN_DETECTION | true | Activa la detección de contenedores y el etiquetado para métricas de socket Unix. |
| DD_DOGSTATSD_NON_LOCAL_TRAFFIC | true | Escucha los paquetes DogStatsD de otros contenedores. (Necesario para enviar métricas personalizadas). |
| DD_AGENT_HOST | dd-Agent | Nombre del host del Agent en Docker. |
| DD_AC_EXCLUDE | redis | Excluye checks de Redis en Datadog. (opcional) |
| DD_CONTAINER_EXCLUDE | true | Excluye checks de Docker del Datadog Agent. |

Después de configurar las variables de entorno enumeradas anteriormente, configura el Agent [con DogStatsD][17].

[Reinicia el Agent][18] después de la configuración.

### Validación

Crea un dashboard o importa [la muestra][19] y añade un widget. En la sección **Graph your data** (Haz gráficos de tus datos), en la opción **métrica**, empieza a escribir el espacio de nombres que elegiste para la bomba en la configuración `pump.conf` en`dogstatsd.namespace`.

En el ejemplo anterior, es `tyk`. Una vez que empieces a escribir, se mostrarán todas las métricas disponibles.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "tyk" >}}


### Dashboards

Con Datadog, puedes crear dashboards que muestren estadísticas sobre tus servicios API y su consumo.

El siguiente es un ejemplo de este tipo de dashboard:

![Tyk Analytics dashboard example][21]

**Nota: Puedes [importar][19] el dashboard anterior y utilizarlo como ejemplo o referencia para tu propio dashboard.**

### Eventos

La integración Tyk no incluye eventos.

### Checks de servicio

La integración Tyk no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][22].

[1]: https://tyk.io/
[2]: https://github.com/TykTechnologies/tyk
[3]: https://tyk.io/docs/tyk-pump/
[4]: https://docs.datadoghq.com/es/developers/dogstatsd/?tab=hostagent#pagetitle
[5]: https://docs.datadoghq.com/es/agent/docker/?tab=standard#dogstatsd-custom-metrics
[6]: https://tyk.io/docs/tyk-self-managed/install/
[7]: https://tyk.io/docs/apim/open-source/installation/
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://docs.datadoghq.com/es/agent/
[10]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[11]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
[12]: https://github.com/TykTechnologies/tyk-pump#dogstatsd
[13]: https://github.com/TykTechnologies/tyk-demo/blob/master/deployments/analytics-datadog/volumes/tyk-pump/pump-datadog.conf
[14]: https://github.com/TykTechnologies/tyk-demo/tree/master/deployments/analytics-datadog
[15]: https://docs.datadoghq.com/es/developers/dogstatsd/?tab=hostagent#setup
[16]: https://app.datadoghq.com/organization-settings/api-keys
[17]: https://docs.datadoghq.com/es/developers/dogstatsd/?tab=hostagent#how-it-works
[18]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[19]: https://github.com/DataDog/integrations-extras/blob/master/tyk/assets/dashboards/tyk_analytics_canvas.json
[20]: https://github.com/DataDog/integrations-extras/blob/master/tyk/metadata.csv
[21]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/tyk/images/datadog-tyk-analytics-dashboard.jpg
[22]: https://docs.datadoghq.com/es/help/