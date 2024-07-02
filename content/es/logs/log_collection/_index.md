---
aliases:
- /es/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
- /es/logs/languages
- /es/integrations/windows_event_log/
description: Configura tu entorno para recopilar logs desde tu host, contenedores
  y servicios.
further_reading:
- link: https://www.datadoghq.com/blog/log-file-control-with-logrotate/
  tag: Blog
  text: Cómo gestionar archivos de logs con Logrotate
- link: /agent/logs/advanced_log_collection
  tag: Documentación
  text: Configuraciones avanzadas de recopilación de logs
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Descubre cómo procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Más información sobre el parseo
- link: /logs/live_tail/
  tag: Documentación
  text: Función Live Tail de Datadog
- link: /logs/explorer/
  tag: Documentación
  text: Aprende a explorar tus logs
- link: /logs/logging_without_limits/
  tag: Documentación
  text: Logging Without Limits*
kind: Documentación
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

[1]: /es/logs/log_configuration/processors
[2]: /es/logs/log_configuration/parsing
[3]: /es/logs/explorer/facets/
[4]: /es/agent/kubernetes/log/#autodiscovery
[5]: /es/agent/docker/log/#log-integrations
[6]: /es/integrations/#cat-log-collection
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
| EE. UU.   | HTTPS       | `http-intake.logs.datadoghq.com`                                          | 443   | Utilizado por el forwarder personalizado para enviar logs en formato JSON o de texto sin formato a través de HTTPS. Consulta la [documentación de API HTTP de logs][1].                                                    |
| EE. UU.   | HTTPS       | `agent-http-intake-pci.logs.datadoghq.com`                                | 443   | Utilizado por el Agent para enviar logs a través de HTTPS a una organización con cumplimiento de PCI DSS activado. Para obtener más información, consulta [Cumplimiento de PCI DSS para Log Management][3].                 |
| EE. UU.   | HTTPS       | `agent-http-intake.logs.datadoghq.com`                                    | 443   | Utilizado por el Agent para enviar logs en formato JSON a través de HTTPS. Consulta la [documentación Recopilación de logs del Agent de host][2].                                                             |
| EE. UU.   | HTTPS       | `lambda-http-intake.logs.datadoghq.com`                                   | 443   | Utilizado por funciones Lambda para enviar logs sin formato o en formato Syslog o JSON a través de HTTPS.                                                                                            |
| EE. UU.   | HTTPS       | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443   | Utilizado por el SDK del navegador para enviar logs en formato JSON a través de HTTPS.                                                                                                             |
| EE. UU.   | TCP         | `agent-intake.logs.datadoghq.com`                                         | 10514 | Utilizado por el Agent para enviar logs sin TLS.
| EE. UU.   | TCP y TLS | `agent-intake.logs.datadoghq.com`                                         | 10516 | Utilizado por el Agent para enviar logs con TLS.
| EE. UU.   | TCP y TLS | `intake.logs.datadoghq.com`                                               | 443   | Utilizado por forwarders personalizados para enviar logs sin formato o en formato Syslog o JSON a través de una conexión TCP cifrada con SSL.                                                                 |
| EE. UU.   | TCP y TLS | `functions-intake.logs.datadoghq.com`                                     | 443   | Utilizado por funciones de Azure para enviar logs sin formato o en formato Syslog o JSON a través de una conexión TCP cifrada con SSL. **Nota**: Este endpoint puede resultar útil con otros proveedores de nube. |
| EE. UU.   | TCP y TLS | `lambda-intake.logs.datadoghq.com`                                        | 443   | Utilizado por funciones de Lambda para enviar logs sin formato o en formato Syslog o JSON a través de una conexión TCP cifrada con SSL.                                                                  |

[1]: /es/api/latest/logs/#send-logs
[2]: /es/agent/logs/#send-logs-over-https
[3]: /es/data_security/logs/#pci-dss-compliance-for-log-management
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
| AP1  | HTTPS | `http-intake.logs.ap1.datadoghq.com`                                      | 443  | Utilizado por el forwarder personalizado para enviar logs en formato JSON o de texto sin formato a través de HTTPS. Consulta la [documentación de API HTTP de logs][1]. |
| AP1  | HTTPS | `lambda-http-intake.logs.ap1.datadoghq.com`                               | 443  | Utilizado por funciones de Lambda para enviar logs sin formato o en formato Syslog o JSON a través de HTTPS.                                         |
| AP1  | HTTPS | `agent-http-intake.logs.ap1.datadoghq.com`                                | 443  | Utilizado por el Agent para enviar logs en formato JSON a través de HTTPS. Consulta la [documentación Recopilación de logs del Agent de host][2].          |
| AP1  | HTTPS | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Utilizado por el SDK del navegador para enviar logs en formato JSON a través de HTTPS.                                                          |

[1]: /es/api/latest/logs/#send-logs
[2]: /es/agent/logs/#send-logs-over-https

{{< /site-region >}}

{{< site-region region="gov" >}}

| Sitio    | Tipo  | Endpoint                                                                  | Puerto | Descripción                                                                                                              |
|---------|-------|---------------------------------------------------------------------------|------|--------------------------------------------------------------------------------------------------------------------------|
| US1-FED | HTTPS | `http-intake.logs.ddog-gov.com`                                          | 443  | Utilizado por el forwarder personalizado para enviar logs en formato JSON o de texto sin formato a través de HTTPS. Consulta la [documentación de API HTTP de logs][1]. |
| US1-FED | HTTPS | `lambda-http-intake.logs.ddog-gov.datadoghq.com`                          | 443  | Utilizado por funciones de Lambda para enviar logs sin formato o en formato Syslog o JSON a través de HTTPS.                                         |
| US1-FED | HTTPS | `agent-http-intake.logs.ddog-gov.datadoghq.com`                           | 443  | Utilizado por el Agent para enviar logs en formato JSON a través de HTTPS. Consulta la [documentación Recopilación de logs del Agent de host][2].          |
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

Tu carga útil, o `Log sent directly using TLS`, como aparece en el ejemplo, puede estar sin formato o en formato Syslog o JSON. Si está en formato JSON, Datadog analizará sus atributos automáticamente.

```text
<DATADOG_API_KEY> {"message":"json formatted log", "ddtags":"env:my-env,user:my-user", "ddsource":"my-integration", "hostname":"my-hostname", "service":"my-service"}

[1]: /es/account_management/api-app-keys/#api-keys

{{< /site-region >}}

{{< site-region region="eu" >}}

You can manually test your connection using OpenSSL, GnuTLS, or another SSL/TLS client. For GnuTLS, run the following command:

```shell
gnutls-cli tcp-intake.logs.datadoghq.eu:443
```

Para OpenSSL, ejecuta el siguiente commando:

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

{{< site-region region="gov,us5,ap1" >}}

El endpoint TCP no es compatible para este sitio.

[1]: /es/help
{{< /site-region >}}


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/logs/livetail
{{% /tab %}}
{{< /tabs >}}

**Notas**:

* La API HTTPS admite logs con tamaños de hasta 1 MB. Sin embargo, para disfrutar de un rendimiento óptimo, es recomendado que cada log no supere los 25 kB. Si utilizas el Datadog Agent para registro, está configurado para dividir un log en 256 kB (256 000 bytes).
* Un evento de logs no debería tener más de 100 etiquetas, y cada etiqueta no debería superar los 256 caracteres para un máximo de 10 millones de etiquetas únicas al día.
* Un evento de logs convertido a formato JSON debería contener menos de 256 atributos. Cada una de estas claves de atributo debería tener menos de 50 caracteres, anidados en menos de 10 niveles sucesivos, y su valor respectivo debería ser de menos de 1024 caracteres si se promueve como faceta.
* Los eventos de logs se pueden enviar con una [marca temporal][14] de hasta 18 h atrás.

Los eventos de logs que no cumplen con estos límites pueden ser transformados o truncados por el sistema, o pueden no indexarse si están fuera del intervalo indicado. Sin embargo, Datadog intentará conservar la mayor cantidad de datos posible.

### Atributos y etiquetas

Los atributos prescriben [facetas de logs][9], que se utilizan para filtrar y buscar en el Log Explorer. Consulta la documentación específica sobre [atributos y alias][10] para ver una lista de atributos reservados y estándares, y saber cómo es posible utilizar una convención de nomenclatura con atributos de logs y alias.

#### Atributos para stack traces

Para el registro de stack traces, existen atributos específicos que cuentan con una visualización de interfaz de usuario específica en tu aplicación de Datadog, como el nombre de registrador, el subproceso actual, el tipo de error y la propia stack trace.

{{< img src="logs/log_collection/stack_trace.png" style="width:80%;" alt="Atributos de una stack trace analizada >}}

Para activar estas funciones, utiliza los siguientes nombres de atributos:

| Atributo            | Descripción                                                             |
|----------------------|-------------------------------------------------------------------------|
| `logger.name`        | Nombre del registrador                                                      |
| `logger.thread_name` | Nombre del subproceso actual                                              |
| `error.stack`        | La stack trace correspondiente                                                      |
| `error.message`      | Mensaje de error contenido en la stack trace                              |
| `error.kind`         | El tipo o clase de un error (por ejemplo, "Exception" u "OSError") |

**Nota**: De forma predeterminada, los pipelines de integración intentan reasignar parámetros de bibliotecas de registro predeterminados a esos atributos específicos y analizar stack traces o rastrear para extraer automáticamente `error.message` y `error.kind`.

Para obtener más información, consulta la [documentación completa sobre atributos de código fuente][11].

## Siguientes pasos

Una vez recopilados e ingeridos los logs, están disponibles en el **Log Explorer**, donde puedes buscar, mejorar y ver alertas sobre tus logs. Consulta la documentación de [Log Explorer][12] para empezar a analizar tus datos de logs, o consulta la siguiente documentación adicional sobre la gestión de logs.

{{< img src="logs/explore.png" alt="Logs que aparecen en el Log Explorer" style="width:100%" >}}

## Leer más

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