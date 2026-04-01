---
algolia:
  tags:
  - grok
  - grok parser
  - logs parsing
  - Extracting Attributes
  - Remapping attributes
  - parsing
aliases:
- /es/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
- /es/logs/languages
- /es/integrations/windows_event_log/
description: Configura tu entorno para recopilar registros de tu host, contenedores
  y servicios.
further_reading:
- link: https://www.datadoghq.com/blog/log-file-control-with-logrotate/
  tag: Blog
  text: Cómo gestionar archivos de registro utilizando Logrotate
- link: /agent/logs/advanced_log_collection
  tag: Documentation
  text: Configuraciones avanzadas de recopilación de registros
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Descubre cómo procesar tus registros
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: Aprende más sobre el análisis
- link: /logs/live_tail/
  tag: Documentation
  text: Funcionalidad de cola en vivo de Datadog
- link: /logs/explorer/
  tag: Documentation
  text: Ve cómo explorar tus registros
- link: /logs/logging_without_limits/
  tag: Documentation
  text: Registro Sin Límites*
title: Recopilación de Registros e Integraciones
---
## Resumen

Elige una opción de configuración a continuación para comenzar a ingerir tus registros. Si ya estás utilizando un demonio de envío de registros, consulta la documentación dedicada para [Rsyslog][1], [Syslog-ng][2], [NXlog][3], [FluentD][4] o [Logstash][5].

Consulta la [lista de puntos finales de recopilación de registros de Datadog disponibles](#logging-endpoints) si deseas enviar tus registros directamente a Datadog.

**Nota**: Al enviar registros en formato JSON a Datadog, hay un conjunto de atributos reservados que tienen un significado específico dentro de Datadog. Consulta la sección de [Atributos Reservados](#attributes-and-tags) para aprender más.

## Configuración

{{< tabs >}}
{{% tab "Host" %}}

1. Instala el [Agente de Datadog][1].
2. Para habilitar la recolección de registros, cambie `logs_enabled: false` a `logs_enabled: true` en el archivo de configuración principal de su Agente (`datadog.yaml`). Consulte la [documentación de recolección de registros del Agente Host][5] para obtener más información y ejemplos.
3. Una vez habilitado, el Agente de Datadog puede configurarse para [seguir archivos de registro o escuchar registros enviados a través de UDP/TCP][2], [filtrar registros o eliminar datos sensibles][3], y [agregar registros de varias líneas][4].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /es/agent/logs/#custom-log-collection
[3]: /es/agent/logs/advanced_log_collection/#filter-logs
[4]: /es/agent/logs/advanced_log_collection/#multi-line-aggregation
[5]: /es/agent/logs/
{{% /tab %}}

{{% tab "Aplicación" %}}

1. Instala el [Agente de Datadog][1].
2. Para habilitar la recolección de registros, cambie `logs_enabled: false` a `logs_enabled: true` en el archivo de configuración principal de su Agente (`datadog.yaml`). Consulte la [documentación de recolección de registros del Agente Host][2] para obtener más información y ejemplos.
3. Siga las instrucciones de instalación de su lenguaje de aplicación para configurar un registrador y comenzar a generar registros:

{{< partial name="logs/logs-languages.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /es/agent/logs/
{{% /tab %}}

{{% tab "Contenedor" %}}

Elija un proveedor de contenedor u orquestador y siga sus instrucciones dedicadas de recolección de registros:

{{< partial name="logs/logs-containers.html" >}}

**Notas**:

- El Agente de Datadog puede [recolectar registros directamente desde stdout/stderr del contenedor][1] sin usar un controlador de registro. Cuando se habilita la verificación de Docker del Agente, los metadatos del contenedor y del orquestador se agregan automáticamente como etiquetas a sus registros.

- Es posible recolectar registros de todos sus contenedores o [solo un subconjunto filtrado por imagen de contenedor, etiqueta o nombre][2].

- La autodetección también se puede utilizar para [configurar la recolección de registros directamente en las etiquetas del contenedor][3].

- En entornos de Kubernetes, también puedes aprovechar [la instalación del daemonset][4].

[1]: /es/agent/docker/log/
[2]: /es/agent/guide/autodiscovery-management/
[3]: /es/agent/kubernetes/integrations/
[4]: /es/agent/basic_agent_usage/kubernetes/#log-collection-setup
{{% /tab %}}

{{% tab "Sin servidor" %}}

Utiliza el Datadog Forwarder, una función de AWS Lambda que envía registros desde tu entorno a Datadog. Para habilitar la recolección de registros en tu entorno sin servidor de AWS, consulta la [documentación del Datadog Forwarder][1].

[1]: /es/serverless/forwarder
{{% /tab %}}

{{% tab "Nube/Integración" %}}

Selecciona tu proveedor de nube a continuación para ver cómo recolectar automáticamente tus registros y enviarlos a Datadog:

{{< partial name="logs/logs-cloud.html" >}}

Las integraciones de Datadog y la recolección de registros están vinculadas. Puedes usar el archivo de configuración predeterminado de una integración para habilitar [procesadores][1], [análisis][2] y [facetas][3] en Datadog. Para comenzar la recolección de registros con una integración:

1. Selecciona una integración de la [página de Integraciones][6] y sigue las instrucciones de configuración.
2. Sigue las instrucciones de recolección de registros de la integración. Esta sección cubre cómo descomentar la sección de registros en el archivo `conf.yaml` de esa integración y configurarlo para tu entorno.

## Reduce las tarifas de transferencia de datos

Utiliza [Cloud Network Monitoring][7] de Datadog para identificar las aplicaciones de mayor rendimiento de tu organización. Conéctate a Datadog a través de conexiones privadas soportadas y envía datos a través de una red privada para evitar el internet público y reducir tus tarifas de transferencia de datos. Después de cambiar a enlaces privados, utiliza las herramientas de [Cloud Cost Management][8] de Datadog para verificar el impacto y monitorear la reducción en tus costos en la nube.

Para más información, consulta [Cómo enviar registros a Datadog mientras reduces las tarifas de transferencia de datos][9].

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

{{% tab "Verificación de Agente" %}}

Si está desarrollando una integración personalizada de Agente, puede enviar registros programáticamente desde su verificación de Agente utilizando el método `send_log`. Esto permite que su integración personalizada emita registros junto con métricas, eventos y verificaciones de servicio.

Para aprender cómo enviar registros desde su verificación de Agente personalizada, consulte [Colección de Registros de Integración de Agente][15].

[15]: /es/logs/log_collection/agent_checks/
{{% /tab %}}
{{< /tabs >}}

## Opciones de configuración adicionales

### Puntos finales de registro

Datadog proporciona puntos finales de registro tanto para conexiones cifradas por SSL como para conexiones no cifradas. Utilice el punto final cifrado cuando sea posible. El Agente de Datadog utiliza el punto final cifrado para enviar registros a Datadog. Más información está disponible en la [documentación de seguridad de Datadog][6].

#### Puntos finales soportados

Utilice el menú desplegable de selector [sitio][13] en el lado derecho de la página para ver los puntos finales soportados por el sitio de Datadog.

| Sitio | Tipo | Punto final | Puerto | Descripción |
|------|-------|----------|------|-------------|
| {{< region-param key=dd_datacenter >}} | HTTPS | <code>{{< region-param key=http_endpoint >}}</code> | 443 | Utilizado por el reenvío personalizado para enviar registros en formato JSON o texto plano a través de HTTPS. Consulte la [documentación de la API HTTP de Registros][16]. |
| {{< region-param key=dd_datacenter >}} | HTTPS | <code>{{< region-param key=agent_http_endpoint >}}</code> | 443 | Utilizado por el Agente para enviar registros en formato JSON a través de HTTPS. Consulte la [documentación de colección de Registros del Agente Host][17]. |
| {{< region-param key=dd_datacenter >}} | HTTPS | <code>{{< region-param key=lambda_http_endpoint >}}</code> | 443 | Utilizado por funciones Lambda para enviar registros en formato crudo, Syslog o JSON a través de HTTPS. |
| {{< region-param key=dd_datacenter >}} | HTTPS | <code>registros.{{< region-param key=browser_sdk_endpoint_domain >}}</code> | 443 | Utilizado por el SDK del navegador para enviar registros en formato JSON a través de HTTPS. |

### Reenvío de registros personalizado

Cualquier proceso personalizado o biblioteca de registro capaz de reenviar registros a través de **HTTP** puede ser utilizado junto con Datadog Logs.

Puedes enviar registros a la plataforma Datadog a través de HTTP. Consulta la [documentación de la API HTTP de Datadog Logs][15] para comenzar.

**Notas**:

* La API HTTPS admite registros de tamaños de hasta 1MB. Sin embargo, para un rendimiento óptimo, se recomienda que un registro individual no sea mayor a 25K bytes. Si utilizas el Agente de Datadog para el registro, está configurado para dividir un registro a 900kB (900000 bytes).
* Un evento de registro no debe tener más de 100 etiquetas, y cada etiqueta no debe exceder 256 caracteres para un máximo de 10 millones de etiquetas únicas por día.
* Un evento de registro convertido a formato JSON debe contener menos de 256 atributos. Cada una de las claves de esos atributos debe tener menos de 50 caracteres, anidados en menos de 20 niveles sucesivos, y su respectivo valor debe ser menor a 1024 caracteres si se promueve como un facet.
* Los eventos de registro pueden ser enviados con un [timestamp][14] que esté hasta 18 horas en el pasado.

<div class="alert alert-info">
<b>Vista previa disponible</b>: Puedes enviar registros de los últimos 7 días, en lugar del límite actual de 18 horas. <a href="https://www.datadoghq.com/product-preview/ingest-logs-up-to-7-days-old/">Regístrate para la Vista previa</a>.
</div>

Los eventos de registro que no cumplan con estos límites pueden ser transformados o truncados por el sistema o no indexados si están fuera del rango de tiempo proporcionado. Sin embargo, Datadog intenta preservar la mayor cantidad de datos de usuario posible.

Hay una truncación adicional en los campos que se aplica solo a los registros indexados: el valor se trunca a 75 KiB para el campo de mensaje y 25 KiB para los campos no de mensaje. Datadog todavía almacena el texto completo, y sigue siendo visible en las consultas de lista regulares en el Explorador de Registros. Sin embargo, la versión truncada se mostrará al realizar una consulta agrupada, como al agrupar registros por ese campo truncado o realizar operaciones similares que muestren ese campo específico.

{{% collapse-content title="TCP" level="h3" expanded=false %}}

{{% logs-tcp-disclaimer %}}


| Sitio | Tipo        | Punto final                                                                  | Puerto         | Descripción                                                                                                                                                                 |
|------|-------------|---------------------------------------------------------------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| EE. UU.   | TCP         | `agent-intake.logs.datadoghq.com`                                         | 10514 | Usado por el Agente para enviar registros sin TLS.
| EE. UU.   | TCP y TLS | `agent-intake.logs.datadoghq.com`                                         | 10516 | Usado por el Agente para enviar registros con TLS.
| EE. UU.   | TCP y TLS | `intake.logs.datadoghq.com`                                               | 443   | Usado por reenvíos personalizados para enviar registros en formato sin procesar, Syslog o JSON a través de una conexión TCP cifrada con SSL.                                                                 |
| EE. UU.   | TCP y TLS | `functions-intake.logs.datadoghq.com`                                     | 443   | Usado por funciones de Azure para enviar registros en formato sin procesar, Syslog o JSON a través de una conexión TCP cifrada con SSL. **Nota**: Este punto final puede ser útil con otros proveedores de nube. |
| EE. UU.   | TCP y TLS | `lambda-intake.logs.datadoghq.com`                                        | 443   | Usado por funciones de Lambda para enviar registros en formato sin procesar, Syslog o JSON a través de una conexión TCP cifrada con SSL.                                                                  |
| UE   | TCP y TLS | `agent-intake.logs.datadoghq.eu`                                          | 443  | Usado por el Agente para enviar registros en formato protobuf a través de una conexión TCP cifrada con SSL.                                                                                     |
| UE   | TCP y TLS | `functions-intake.logs.datadoghq.eu`                                      | 443  | Usado por funciones de Azure para enviar registros en formato sin procesar, Syslog o JSON a través de una conexión TCP cifrada con SSL. **Nota**: Este punto final puede ser útil con otros proveedores de nube. |
| UE   | TCP y TLS | `lambda-intake.logs.datadoghq.eu`                                         | 443  | Usado por funciones de Lambda para enviar registros en formato sin procesar, Syslog o JSON a través de una conexión TCP cifrada con SSL.                                                                  |

{{% /collapse-content %}}

### Atributos y etiquetas

Los atributos prescriben [facetas de registros][9], que se utilizan para filtrar y buscar en el Explorador de Registros. Consulte la documentación dedicada de [atributos y alias][10] para obtener una lista de atributos reservados y estándar, y para aprender cómo soportar una convención de nombres con atributos de registros y alias.

#### Atributos para trazas de pila

Al registrar trazas de pila, hay atributos específicos que tienen una visualización de interfaz de usuario dedicada dentro de su aplicación de Datadog, como el nombre del registrador, el hilo actual, el tipo de error y la traza de pila en sí.

{{< img src="logs/log_collection/stack_trace.png" style="width:80%;" alt="Atributos para una traza de pila analizada" >}}

Para habilitar estas funcionalidades, utilice los siguientes nombres de atributos:

| Atributo            | Descripción                                                             |
|----------------------|-------------------------------------------------------------------------|
| `logger.name`        | Nombre del registrador                                                      |
| `logger.thread_name` | Nombre del hilo actual                                              |
| `error.stack`        | Traza de pila actual                                                      |
| `error.message`      | Mensaje de error contenido en la traza de pila                              |
| `error.kind`         | El tipo o "clase" de un error (por ejemplo, "Excepción" o "OSError") |

**Nota**: Por defecto, las tuberías de integración intentan reasignar los parámetros de la biblioteca de registro predeterminada a esos atributos específicos y analizar trazas de pila o traceback para extraer automáticamente el `error.message` y `error.kind`.

Para más información, consulte la documentación completa de [atributos de código fuente][11].

## Próximos pasos

Una vez que los registros son recolectados e ingeridos, están disponibles en **Explorador de Registros**. El Explorador de Registros es donde puede buscar, enriquecer y ver alertas sobre sus registros. Consulte la documentación de [Explorador de Registros][12] para comenzar a analizar sus datos de registro, o vea la documentación adicional de gestión de registros a continuación.

{{< img src="logs/explore.png" alt="Registros que aparecen en el Explorador de Registros" style="width:100%" >}}

## Lectura Adicional

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
[15]: /es/api/latest/logs/#send-logs
[16]: /es/api/latest/logs/#send-logs
[17]: /es/agent/logs/#send-logs-over-https