---
app_id: squid
app_uuid: de18c581-69ee-48cf-ba23-7794bfb7a4bd
assets:
  dashboards:
    Squid: assets/dashboards/squid.json
  integration:
    auto_install: verdadero
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: falso
    metrics:
      check: squid.cachemgr.cpu_time
      metadata_path: metadata.csv
      prefix: squid.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10022
    source_type_name: Squid
  logs:
    source: squid
  monitors:
    CPU usage exceeded: assets/monitors/cpu_usage_exceeded.json
    High latency requests: assets/monitors/high_latency_requests.json
    High rate of client HTTP errors: assets/monitors/high_rate_of_client_http_errors.json
    High rate of server errors: assets/monitors/high_rate_of_server_errors.json
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
draft: falso
git_integration_title: squid
integration_id: squid
integration_title: Squid
integration_version: 4.1.0
is_public: verdadero
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
  - Category::Caché
  - Category::Recopilación de logs
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integración
  configuration: README.md#Configuración
  description: Seguimiento de métricas de tus servidores squid-cache con Datadog
  media:
  - caption: Squid
    image_url: images/squid.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Squid
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general
[Squid][1] es un servidor de almacenamiento en caché y reenvío de proxy web de código abierto que funciona como intermediario entre clientes y servidores en red. Actúa como puerta de enlace, permitiendo a los clientes acceder a diversos recursos de Internet, como sitios web, archivos y otros contenidos de los servidores.

Esta integración proporciona enriquecimiento y visualización para logs de Squid. Lo ayuda a visualizar información detallada del análisis de logs de Squid a través de las reglas de detección y dashboards predefinidos, mejorando las capacidades de detección y respuesta.

Además, incluye monitores preconfigurados para enviar notificaciones proactivas sobre lo siguiente:

1. Tasa alta de errores del servidor
2. Uso de CPU excedido
3. Solicitudes de alta latencia
4. Tasa alta de errores HTTP del cliente


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

_Disponible para la versión 6.0 o posteriores del Agent_

1. La recopilación de logs está deshabilitada por defecto en el Datadog Agent; habilítala en tu archivo `datadog.yaml`:

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
{{% tab "Contenedores" %}}

#### Contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `squid`                                                                |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                          |
| `<INSTANCE_CONFIG>`  | `{"name": "<SQUID_INSTANCE_NAME>", "host": "%%host%%", "port":"3128"}` |

##### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes][2].

| Parámetro      | Valor                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "squid", "service": "<YOUR_APP_NAME>"}` |

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/log/?tab=containerinstallation#setup
{{% /tab %}}{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][3] y busca `squid` en la sección **Checks**.

## Datos recopilados

### Logs
La integración de Squid recopila los logs de acceso y caché.

#### Formatos de logs de acceso compatibles
|Nombre                 | Especificación de formato|
|---------------------|------------------------------|
| squid      |`%ts.%03tu %6tr %>a %Ss/%03>Hs %<st %rm %ru %[un %Sh/%<a %mt`|
| común     |`%>a - %[un [%tl] "%rm %ru HTTP/%rv" %>Hs %<st %Ss:%Sh`|
| combinado   |`%>a - %[un [%tl] "%rm %ru HTTP/%rv" %>Hs %<st "%{Referer}>h" "%{User-Agent}>h" %Ss:%Sh`|

Para más información, consulta [Formatos de logs de Squid][4].

**Nota**: El tipo `logformat` por defecto es `squid`. Puedes actualizar el formato de log compatible en `/etc/squid/squid.conf`, luego reinicia Squid.

Para utilizar el tipo `combined` para `logformat`, añade las siguientes líneas a tu archivo `/etc/squid/squid.conf`:

```
logformat combined   %>a %[ui %[un [%tl] "%rm %ru HTTP/%rv" %>Hs %<st "%{Referer}>h" "%{User-Agent}>h" %Ss:%Sh
access_log /var/log/squid/access.log combined
```
A continuación, reinicia el servicio `squid` mediante el siguiente comando:

```shell
sudo systemctl restart squid
```  

**Nota**:

- El panel `Top Avg Request Duration by URL Host` se cargará sólo si el tipo `squid` por defecto de `logformat` está configurado.
- Los paneles `Top Browsers` y `Top HTTP Referrer` sólo se cargarán si el tipo `combined` de `logformat` está configurado.


### Métricas
{{< get-metrics-from-git "squid" >}}


### Eventos

El check de Squid no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "squid" >}}


## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].



[1]: http://www.squid-cache.org/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://www.squid-cache.org/Doc/config/logformat/
[5]: https://docs.datadoghq.com/es/help/