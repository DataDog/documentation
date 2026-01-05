---
algolia:
  tags:
  - grok
  - analizador grok
  - parseo de logs
  - Extracción de atributos
  - Reasignación de atributos
  - parseo
aliases:
- /es/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
- /es/logs/languages
- /es/integrations/windows_event_log/
description: Configura tu entorno para recopilar logs de tus host, contenedores y
  servicios.
further_reading:
- link: https://www.datadoghq.com/blog/log-file-control-with-logrotate/
  tag: Blog
  text: Cómo gestionar archivos de log con Logrotate
- link: /agent/logs/advanced_log_collection
  tag: Documentación
  text: Configuraciones avanzadas de recopilación de logs
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Descubre cómo procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtener más información sobre el análisis
- link: /logs/live_tail/
  tag: Documentación
  text: La funcionalidad Live Tail de Datadog
- link: /logs/explorer/
  tag: Documentación
  text: Aprender a explorar tus logs
- link: /logs/logging_without_limits/
  tag: Documentación
  text: Logging Without Limits*
title: Recopilación de logs e integraciones
---

## Información general

Elige una de las siguientes opciones de configuración para empezar a ingerir tus logs. Si ya utilizas un daemon cargador de logs, consulta la documentación específica de [Rsyslog][1], [Syslog-ng][2], [NXlog][3], [FluentD][4] o [Logstash][5].

Consulta la [lista de endpoints de recopilación de logs de Datadog disponibles](#logging-endpoints) si quieres enviar tus logs directamente a Datadog.

**Nota**: A la hora de enviar logs en un formato JSON a Datadog, hay un conjunto de atributos reservados que poseen un significado específico en Datadog. Consulta la [sección Atributos reservados](#attributes-and-tags) para obtener más información.

## Configuración

{{< tabs >}}
{{% tab "Host" %}}

1. Instala el [Datadog Agent][1].
2. Para activar la recopilación de logs, cambia `logs_enabled: false` a `logs_enabled: true` en el archivo de configuración principal del Agent (`datadog.yaml`). Para obtener más información y ejemplos, consulta la [documentación sobre recopilación de logs del Agent de host][5].
3. Una vez activado, es posible configurar el Datadog Agent para [supervisar archivos de logs o escuchar logs enviados a través de UDP/TCP][2], [filtrar logs o limpiar datos confidenciales][3] y [agregar logs multilínea][4].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /es/agent/logs/#custom-log-collection
[3]: /es/agent/logs/advanced_log_collection/#filter-logs
[4]: /es/agent/logs/advanced_log_collection/#multi-line-aggregation
[5]: /es/agent/logs/
{{% /tab %}}

{{% tab "Application" %}}

1. Instala el [Datadog Agent][1].
2. Para activar la recopilación de logs, cambia `logs_enabled: false` a `logs_enabled: true` en el archivo de configuración principal del Agent (`datadog.yaml`). Para obtener más información y ejemplos, consulta la [documentación sobre recopilación de logs del Agent de host][2].
3. Sigue las instrucciones de instalación de tu lenguaje de aplicación para configurar un registrador y empezar a generar logs:

{{< partial name="logs/logs-languages.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /es/agent/logs/
{{% /tab %}}

{{% tab "Container" %}}

Elige un proveedor de contenedores u orquestadores y sigue sus instrucciones de recopilación de logs específicas:

{{< partial name="logs/logs-containers.html" >}}

**Notas**:

- El Datadog Agent puede [recopilar logs directamente desde stdout/stderr del contenedor][1] sin utilizar un controlador de registro. Cuando el check de Docker del Agent está activado, los metadatos de contenedores y orquestadores se agregan automáticamente como etiquetas a tus logs.

- Es posible recopilar logs desde todos tus contenedores o [solo desde un subconjunto filtrado por imagen, etiqueta o nombre de contenedor][2].

- También es posible utilizar Autodiscovery para [configurar la recopilación de logs directamente en las etiquetas de contenedor][3].

- En entornos de Kubernetes, también puedes utilizar la [instalación de Daemonset][4].

[1]: /es/agent/docker/log/
[2]: /es/agent/guide/autodiscovery-management/
[3]: /es/agent/kubernetes/integrations/
[4]: /es/agent/basic_agent_usage/kubernetes/#log-collection-setup
{{% /tab %}}

{{% tab "Serverless" %}}

Utiliza el Forwarder de Datadog, una función de AWS Lambda que envía logs desde tu entorno a Datadog. Para activar la recopilación de logs en tu entorno serverless de AWS, consulta la [documentación del Forwarder de Datadog][1].

[1]: /es/serverless/forwarder
{{% /tab %}}

{{% tab "Cloud/Integration" %}}

Selecciona tu proveedor de nube a continuación para ver cómo recopilar automáticamente tus logs y reenviarlos a Datadog:

{{< partial name="logs/logs-cloud.html" >}}

Las integraciones de Datadog y la recopilación de logs están asociadas. Puedes utilizar el archivo de configuración predeterminado de una integración para activar [procesadores][1], [parseos][2] y [facetas][3] específicos en Datadog. Para empezar a recopilar logs con una integración:

1. Selecciona una integración en la [página Integraciones][6] y sigue las instrucciones de configuración.
2. Sigue las instrucciones de recopilación de logs de la integración. En esta sección, se explica cómo quitar comentarios de la sección de logs del archivo `conf.yaml`de esa integración y cómo configurarlo para tu entorno.

## Reducir las tasas de transferencia de datos

Utiliza [Cloud Network Monitoring][7] para identificar las aplicaciones de mayor rendimiento de tu organización. Conéctate a Datadog a través de conexiones privadas compatibles y envía datos a través de una red privada para evitar la Internet pública y reducir tus tarifas de transferencia de datos. Después de cambiar a conexiones privadas, utiliza las herramientas [Cloud Cost Management][8] de Datadog para verificar el impacto y monitorizar la reducción en tus costes de nube.

Para más información, consulta [Cómo enviar logs a Datadog y reducir tarifas de transferencias de datos][9].

[1]: /es/logs/log_configuration/processors
[2]: /es/logs/log_configuration/parsing
[3]: /es/logs/explorer/facets/
[4]: /es/agent/kubernetes/log/#autodiscovery
[5]: /es/agent/docker/log/#log-integrations
[6]: /es/integrations/#cat-log-collection
[7]: /es/network_monitoring/cloud_network_monitoring/
[8]: /es/cloud_cost_management/
[9]: /es/logs/guide/reduce_data_transfer_fees/


{{% /tab %}}
{{< /tabs >}}

## Opciones de configuración adicionales

### Endpoints de registro

Datadog proporciona endpoints de registro tanto para conexiones cifradas con SSL como no cifradas. Utiliza el endpoint cifrado siempre que sea posible. El Datadog Agent utiliza el endpoint cifrado para enviar logs a Datadog. Tienes más información disponible en la [documentación sobre seguridad de Datadog][6].

#### Endpoints compatibles

Utiliza el menú desplegable de selección del [sitio][13] situado a la derecha de la página para ver los endpoints compatibles con el sitio de Datadog.

{{< site-region region="us" >}}

| Sitio | Tipo        | Endpoint                                                                  | Puerto         | Descripción                                                                                                                                                                 |
|------|-------------|---------------------------------------------------------------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| EE. UU.   | HTTPS       | `http-intake.logs.datadoghq.com`                                          | 443   | Utilizado por el forwarder personalizado para enviar logs en formato JSON o de texto sin formato a través de HTTPS. Consulta la [documentación de la API HTTP de logs][1].                                                    |
| EE. UU.   | HTTPS       | `agent-http-intake.logs.datadoghq.com`                                    | 443   | Utilizado por el Agent para enviar logs en formato JSON a través de HTTPS. Consulta la [documentación Recopilación de logs del Agent de host][2].                                                             |
| EE. UU.   | HTTPS       | `lambda-http-intake.logs.datadoghq.com`                                   | 443   | Utilizado por funciones de Lambda para enviar logs sin formato o en formato Syslog o JSON a través de HTTPS.                                                                                            |
| EE. UU.   | HTTPS       | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443   | Utilizado por el SDK del navegador para enviar logs en formato JSON a través de HTTPS.                                                                                                             |
| EE. UU.   | TCP         | `agent-intake.logs.datadoghq.com`                                         | 10514 | Utilizado por el Agent para enviar logs sin TLS.
| EE. UU.   | TCP y TLS | `agent-intake.logs.datadoghq.com`                                         | 10516 | Utilizado por el Agent para enviar logs con TLS.
| EE. UU.   | TCP y TLS | `intake.logs.datadoghq.com`                                               | 443   | Utilizado por forwarders personalizados para enviar logs sin formato o en formato Syslog o JSON a través de una conexión TCP cifrada con SSL.                                                                 |
| EE. UU.   | TCP y TLS | `functions-intake.logs.datadoghq.com`                                     | 443   | Utilizado por funciones de Azure para enviar logs sin formato o en formato Syslog o JSON a través de una conexión TCP cifrada con SSL. **Nota**: Este endpoint puede resultar útil con otros proveedores de nube. |
| EE. UU.   | TCP y TLS | `lambda-intake.logs.datadoghq.com`                                        | 443   | Utilizado por funciones de Lambda para enviar logs sin formato o en formato Syslog o JSON a través de una conexión TCP cifrada con SSL.                                                                  |

[1]: /es/api/latest/logs/#send-logs
[2]: /es/agent/logs/#send-logs-over-https
{{< /site-region >}}

{{< site-region region="eu" >}}

| Sitio | Tipo        | Endpoint                                                                  | Puerto | Descripción                                                                                                                                                                 |
|------|-------------|---------------------------------------------------------------------------|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| UE   | HTTPS       | `http-intake.logs.datadoghq.eu`                                           | 443  | Utilizado por forwarders personalizados para enviar logs en formato JSON o de texto sin formato a través de HTTPS. Consulta la [documentación de la API HTTP de logs.][1]                                                    |
| UE   | HTTPS       | `agent-http-intake.logs.datadoghq.eu`                                     | 443  | Utilizado por el Agent para enviar logs en formato JSON a través de HTTPS. Consulta la [documentación Recopilación de logs del Agent de host][2].                                                             |
| UE   | HTTPS       | `lambda-http-intake.logs.datadoghq.eu`                                    | 443  | Utilizado por funciones de Lambda para enviar logs sin formato o en formato Syslog o JSON a través de HTTPS.                                                                                            |
| UE   | HTTPS       | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Utilizado por el SDK del navegador para enviar logs en formato JSON a través de HTTPS.                                                                                                             |
| UE   | TCP y TLS | `agent-intake.logs.datadoghq.eu`                                          | 443  | Utilizado por el Agent para enviar logs en formato protobuf a través de una conexión TCP cifrada con SSL.                                                                                     |
| UE   | TCP y TLS | `functions-intake.logs.datadoghq.eu`                                      | 443  | Utilizado por funciones de Azure para enviar logs sin formato o en formato Syslog o JSON a través de una conexión TCP cifrada con SSL. **Nota**: Este endpoint puede resultar útil con otros proveedores de nube. |
| UE   | TCP y TLS | `lambda-intake.logs.datadoghq.eu`                                         | 443  | Utilizado por funciones de Lambda para enviar logs sin formato o en formato Syslog o JSON a través de una conexión TCP cifrada con SSL.                                                                  |

[1]: /es/api/latest/logs/#send-logs
[2]: /es/agent/logs/#send-logs-over-https
{{< /site-region >}}

{{< site-region region="us3" >}}

| Sitio | Tipo  | Endpoint                                                                  | Puerto | Descripción                                                                                                              |
|------|-------|---------------------------------------------                              |------|--------------------------------------------------------------------------------------------------------------------------|
| US3  | HTTPS | `http-intake.logs.us3.datadoghq.com`                                      | 443  | Utilizado por el forwarder personalizado para enviar logs en formato JSON o de texto sin formato a través de HTTPS. Consulta la [documentación de la API HTTP de logs][1]. |
| US3  | HTTPS | `lambda-http-intake.logs.us3.datadoghq.com`                               | 443  | Utilizado por funciones de Lambda para enviar logs sin formato o en formato Syslog o JSON a través de HTTPS.                                         |
| US3  | HTTPS | `agent-http-intake.logs.us3.datadoghq.com`                                | 443  | Utilizado por el Agent para enviar logs en formato JSON a través de HTTPS. Consulta la [documentación Recopilación de logs del Agent de host][2].          |
| US3  | HTTPS | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Utilizado por el SDK del navegador para enviar logs en formato JSON a través de HTTPS.                                                          |

[1]: /es/api/latest/logs/#send-logs
[2]: /es/agent/logs/#send-logs-over-https

{{< /site-region >}}

{{< site-region region="us5" >}}

| Sitio | Tipo  | Endpoint                                                                  | Puerto | Descripción                                                                                                              |
|------|-------|---------------------------------------------------------------------------|------|--------------------------------------------------------------------------------------------------------------------------|
| US5  | HTTPS | `http-intake.logs.us5.datadoghq.com`                                      | 443  | Utilizado por el forwarder personalizado para enviar logs en formato JSON o de texto sin formato a través de HTTPS. Consulta la [documentación de la API HTTP de logs][1]. |
| US5  | HTTPS | `lambda-http-intake.logs.us5.datadoghq.com`                               | 443  | Utilizado por funciones de Lambda para enviar logs sin formato o en formato Syslog o JSON a través de HTTPS.                                         |
| US5  | HTTPS | `agent-http-intake.logs.us5.datadoghq.com`                                | 443  | Utilizado por el Agent para enviar logs en formato JSON a través de HTTPS. Consulta la [documentación Recopilación de logs del Agent de host][2].          |
| US5  | HTTPS | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Utilizado por el SDK del navegador para enviar logs en formato JSON a través de HTTPS.                                                          |

[1]: /es/api/latest/logs/#send-logs
[2]: /es/agent/logs/#send-logs-over-https

{{< /site-region >}}

{{< site-region region="ap1" >}}

| Sitio | Tipo  | Endpoint                                                                  | Puerto | Descripción                                                                                                              |
|------|-------|---------------------------------------------------------------------------|------|--------------------------------------------------------------------------------------------------------------------------|
| AP1  | HTTPS | `http-intake.logs.ap1.datadoghq.com`                                      | 443  | Utilizado por el forwarder personalizado para enviar logs en formato JSON o de texto sin formato a través de HTTPS. Consulta la [documentación de la API HTTP de logs][1]. |
| AP1  | HTTPS | `lambda-http-intake.logs.ap1.datadoghq.com`                               | 443  | Utilizado por funciones de Lambda para enviar logs sin formato o en formato Syslog o JSON a través de HTTPS.                                         |
| AP1  | HTTPS | `agent-http-intake.logs.ap1.datadoghq.com`                                | 443  | Utilizado por el Agent para enviar logs en formato JSON a través de HTTPS. Consulta la [documentación Recopilación de logs del Agent de host][2].          |
| AP1  | HTTPS | {{< region-param key="browser_sdk_endpoint_domain" code="true" >}}        | 443  | Utilizado por el SDK del navegador para enviar logs en formato JSON a través de HTTPS.                                                          |

[1]: /es/api/latest/logs/#send-logs
[2]: /es/agent/logs/#send-logs-over-https

{{< /site-region >}}

{{< site-region region="ap2" >}}

| Sitio | Tipo  | Endpoint                                                                  | Puerto | Descripción                                                                                                              |
|------|-------|---------------------------------------------------------------------------|------|--------------------------------------------------------------------------------------------------------------------------|
| AP2  | HTTPS | `http-intake.logs.ap2.datadoghq.com`                                      | 443  | Utilizado por el forwarder personalizado para enviar logs en formato JSON o de texto sin formato a través de HTTPS. Consulta la [documentación de la API HTTP de logs][1]. |
| AP2  | HTTPS | `lambda-http-intake.logs.ap2.datadoghq.com`                               | 443  | Utilizado por funciones de Lambda para enviar logs sin formato o en formato Syslog o JSON a través de HTTPS.                                         |
| AP2  | HTTPS | `agent-http-intake.logs.ap2.datadoghq.com`                                | 443  | Utilizado por el Agent para enviar logs en formato JSON a través de HTTPS. Consulta la [documentación Recopilación de logs del Agent de host][2].          |
| AP2  | HTTPS | {{< region-param key="browser_sdk_endpoint_domain" code="true" >}}        | 443  | Utilizado por el SDK del navegador para enviar logs en formato JSON a través de HTTPS.                                                          |

[1]: /es/api/latest/logs/#send-logs
[2]: /es/agent/logs/#send-logs-over-https

{{< /site-region >}}

{{< site-region region="gov" >}}

| Sitio    | Tipo  | Endpoint                                                                  | Puerto | Descripción                                                                                                              |
|---------|-------|---------------------------------------------------------------------------|------|--------------------------------------------------------------------------------------------------------------------------|
| US1-FED | HTTPS | `http-intake.logs.ddog-gov.com`                                          | 443  | Utilizado por el forwarder personalizado para enviar logs en formato JSON o de texto sin formato a través de HTTPS. Consulta la [documentación de la API HTTP de logs][1]. |
| US1-FED | HTTPS | `lambda-http-intake.logs.ddog-gov.com`                                   | 443  | Utilizado por funciones de Lambda para enviar logs sin formato o en formato Syslog o JSON a través de HTTPS.                                         |
| US1-FED | HTTPS | `agent-http-intake.logs.ddog-gov.com`                                    | 443  | Utilizado por el Agent para enviar logs en formato JSON a través de HTTPS. Consulta la [documentación Recopilación de logs del Agent de host][2].          |
| US1-FED | HTTPS | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Utilizado por el SDK del navegador para enviar logs en formato JSON a través de HTTPS.                                                          |

[1]: /es/api/latest/logs/#send-logs
[2]: /es/agent/logs/#send-logs-over-https

{{< /site-region >}}

### Reenvío de logs personalizado

Es posible utilizar cualquier proceso personalizado o biblioteca de registro capaz de reenviar logs a través de **TCP** o **HTTP** junto con logs de Datadog.

{{< tabs >}}
{{% tab "HTTP" %}}

Puedes enviar logs a la plataforma de Datadog a través de HTTP. Consulta la [documentación de la API HTTP de logs de Datadog][1] para empezar.

[1]: /es/api/latest/logs/#send-logs
{{% /tab %}}
{{% tab "TCP" %}}

{{< site-region region="us" >}}

Puedes hacer un test manual de tu conexión mediante OpenSSL, GnuTLS u otro cliente SSL/TLS. Para GnuTLS, ejecuta el siguiente comando:

```shell
gnutls-cli intake.logs.datadoghq.com:10516
```

Para OpenSSL, ejecuta el siguiente comando:

```shell
openssl s_client -connect intake.logs.datadoghq.com:10516
```

Debes incluir un prefijo en la entrada de log con tu [clave de API de Datadog][1] y añadir una carga útil.

```
<DATADOG_API_KEY> Log sent directly using TLS
```

Tu carga útil, o `Log sent directly using TLS` como aparece en el ejemplo, puede estar sin formato o en formato Syslog o JSON. Si está en formato JSON, Datadog analizará sus atributos automáticamente.

```text
<DATADOG_API_KEY> {"message":"json formatted log", "ddtags":"env:my-env,user:my-user", "ddsource":"my-integration", "hostname":"my-hostname", "service":"my-service"}
```

[1]: /es/account_management/api-app-keys/#api-keys

{{< /site-region >}}

{{< site-region region="eu" >}}

Puedes hacer un test manual de tu conexión mediante OpenSSL, GnuTLS u otro cliente SSL/TLS. Para GnuTLS, ejecuta el siguiente comando:

```shell
gnutls-cli tcp-intake.logs.datadoghq.eu:443
```

Para OpenSSL, ejecuta el siguiente comando:

```shell
openssl s_client -connect tcp-intake.logs.datadoghq.eu:443
```

Debes incluir un prefijo en la entrada de log con tu [clave de API de Datadog][1] y añadir una carga útil.

```
<DATADOG_API_KEY> Log sent directly using TLS
```

Tu carga útil, o `Log sent directly using TLS` como aparece en el ejemplo, puede estar sin formato o en formato Syslog o JSON. Si está en formato JSON, Datadog analizará sus atributos automáticamente.

```text
<DATADOG_API_KEY> {"message":"json formatted log", "ddtags":"env:my-env,user:my-user", "ddsource":"my-integration", "hostname":"my-hostname", "service":"my-service"}
```

[1]: /es/account_management/api-app-keys/#api-keys

{{< /site-region >}}

{{< site-region region="us3" >}}
No se recomienda el endpoint TCP para este sitio. Para obtener más información, consulta al [equipo de soporte][1].

[1]: /es/help
{{< /site-region >}}

{{< site-region region="gov,us5,ap1,ap2" >}}

El endpoint TCP no es compatible para este sitio.

[1]: /es/help
{{< /site-region >}}


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/logs/livetail
{{% /tab %}}
{{< /tabs >}}

**Notas**:

* La API HTTPS admite logs de tamaños de hasta 1 MB. Sin embargo, para un rendimiento óptimo, se recomienda que un log individual no supere los 25  Kbytes. Si utilizas el Datadog Agent para registro, está configurado para dividir un log en 900 kB (900 000 bytes).
* Un evento de logs no debería tener más de 100 etiquetas, y cada etiqueta no debería superar los 256 caracteres para un máximo de 10 millones de etiquetas únicas al día.
* Un evento de log convertido a formato JSON debe contener menos de 256 atributos. Cada una de las claves de esos atributos debe tener menos de 50 caracteres, estar anidada en menos de 20 niveles sucesivos, y su valor respectivo debe tener menos de 1024 caracteres si se promueve como faceta.
* Los eventos de logs se pueden enviar con una [marca temporal][14] de hasta 18 h atrás.

<div class="alert alert-info">
<b>Vista previa disponible</b>: puedes enviar logs de los últimos 7 días, en lugar del límite actual de 18 horas. <a href="https://www.datadoghq.com/product-preview/ingest-logs-up-to-7-days-old/">Regístrate para la vista previa</a>.
</div>

Los eventos de logs que no cumplen con estos límites pueden ser transformados o truncados por el sistema, o pueden no indexarse si están fuera del intervalo indicado. Sin embargo, Datadog intentará conservar la mayor cantidad de datos posible.

Existe un truncamiento adicional en los campos que solo se aplica a logs indexados: el valor se trunca a 75 KiB para el campo del mensaje y a 25 KiB para los campos que no son de mensaje. Datadog sigue almacenando el texto completo, y sigue siendo visible en las consultas normales de lista en el Logs Explorer. Sin embargo, la versión truncada se mostrará al realizar una consulta agrupada, como cuando se agrupan logs por ese campo truncado o se realizan operaciones similares que muestran ese campo específico.

### Atributos y etiquetas

Los atributos prescriben [facetas de logs][9], que se utilizan para filtrar y buscar en el Log Explorer. Consulta la documentación específica sobre [atributos y alias][10] para ver una lista de atributos reservados y estándares, y saber cómo utilizar una convención de nomenclatura con atributos de logs y alias.

#### Atributos para stack traces

Para el registro de stack traces, existen atributos específicos que cuentan con una visualización de interfaz de usuario específica en tu aplicación de Datadog, como el nombre de registrador, el subproceso actual, el tipo de error y la propia stack trace.

{{< img src="logs/log_collection/stack_trace.png" style="width:80%;" alt="Atributos de una stack trace analizada" >}}

Para activar estas funciones, utiliza los siguientes nombres de atributos:

| Atributo            | Descripción                                                             |
|----------------------|-------------------------------------------------------------------------|
| `logger.name`        | Nombre del registrador                                                      |
| `logger.thread_name` | Nombre del subproceso actual                                              |
| `error.stack`        | Stack trace correspondiente                                                      |
| `error.message`      | Mensaje de error contenido en la stack trace                              |
| `error.kind`         | El tipo o clase de un error (por ejemplo, "Exception" u "OSError") |

**Nota**: De forma predeterminada, los pipelines de integración intentan reasignar parámetros de bibliotecas de registro predeterminados a esos atributos específicos y analizar stack traces o rastrear para extraer automáticamente `error.message` y `error.kind`.

Para obtener más información, consulta la [documentación completa sobre atributos de código fuente][11].

## Siguientes pasos

Una vez recopilados e ingeridos los logs, están disponibles en el **Log Explorer**, donde puedes buscar, mejorar y ver alertas sobre tus logs. Consulta la documentación de [Log Explorer][12] para empezar a analizar tus datos de logs, o consulta la siguiente documentación adicional sobre la gestión de logs.

{{< img src="logs/explore.png" alt="Logs que aparecen en el Log Explorer" style="width:100%" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits es una marca registrada de Datadog, Inc.

[1]: /es/integrations/rsyslog/
[2]: /es/integrations/syslog_ng/
[3]: /es/integrations/nxlog/
[4]: /es/integrations/fluentd/#log-collection
[5]: /es/integrations/logstash/#log-collection
[6]: /es/data_security/logs/#information-security
[7]: /es/agent/logs/#send-logs-over-https
[8]: /es/api/v1/logs/#send-logs
[9]: /es/logs/explorer/facets/
[10]: /es/logs/log_configuration/attributes_naming_convention
[11]: /es/logs/log_configuration/attributes_naming_convention/#source-code
[12]: /es/logs/explore/
[13]: /es/getting_started/site/
[14]: /es/logs/log_configuration/pipelines/?tab=date#date-attribute