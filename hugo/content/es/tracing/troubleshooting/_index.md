---
algolia:
  tags:
  - problemas de APM
  - FAQ de APM
  - solucionar problemas de rastreo
  - problemas comunes de APM
aliases:
- /es/tracing/faq/my-trace-agent-log-renders-empty-service-error/
- /es/tracing/troubleshooting/faq_apm/
description: Guía completa para la resolución de problemas de APM, incluida la retención
  de trazas (traces), la configuración del servicio y los errores de conexión.
further_reading:
- link: /tracing/troubleshooting/connection_errors
  tag: Documentación
  text: Errores de conexión
- link: /tracing/troubleshooting/tracer_startup_logs/
  tag: Documentación
  text: Logs de inicio del rastreador de Datadog
- link: /tracing/troubleshooting/tracer_debug_logs/
  tag: Documentación
  text: Logs de depuración del rastreador de Datadog
- link: /tracing/troubleshooting/agent_apm_metrics/
  tag: Documentación
  text: Métricas de APM enviadas por el Datadog Agent
- link: /tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
  tag: Documentación
  text: Filtro de retención personalizado
- link: /tracing/trace_pipeline/ingestion_mechanisms/?tab=java
  tag: Documentación
  text: Muestreo por ingesta de trazas (trace)
- link: /tracing/troubleshooting/#data-volume-guidelines
  tag: Documentación
  text: Directrices sobre el volumen de datos
- link: /integrations/
  tag: Documentación
  text: Lista completa de integraciones de Datadog
- link: /tracing/services/inferred_services
  tag: Documentación
  text: Dependencias de servicio inferidas
- link: https://learn.datadoghq.com/courses/troubleshooting-apm-instrumentation-on-a-host
  tag: Centro de aprendizaje
  text: Solución de problemas de instrumentación de APM en un host
title: Solucionar problemas de APM
---

Si experimentas un comportamiento inesperado mientras utilizas Datadog APM, lee la información de esta página para resolver el problema. Datadog recomienda actualizar regularmente a la última versión de las bibliotecas de rastreo de Datadog que utilices, ya que cada versión contiene mejoras y correcciones. Si sigues experimentando problemas, ponte en contacto con el [soporte de Datadog][1].

Los siguientes componentes intervienen en el envío de datos de APM a Datadog:

{{< img src="tracing/troubleshooting/troubleshooting_pipeline_info_1.png" alt="Pipeline de solucionar problemas de APM">}}

Para más información, consulta [Soporte adicional](#additional-support).

## Retención de trazas

Esta sección aborda cuestiones relacionadas con la retención y filtrado de datos de trazas a través de Datadog.

{{% collapse-content title="Hay más tramos (spans) en el Trace Explorer que en la página Monitores" level="h4" %}}

Si no has configurado [filtros de retención personalizados][19], este es el comportamiento esperado. A continuación, explicamos por qué:

La página [Trace Explorer][20] te permite buscar todos los tramos ingeridos o indexados mediante cualquier etiqueta (tag). Aquí puedes consultar cualquiera de tus trazas.

Por defecto, después de que los tramos se hayan ingerido, el [filtro inteligente de Datadog][21] los retiene. Datadog también tiene otros [filtros de retención][22] que están habilitados por defecto para darte visibilidad sobre tus servicios, endpoints, errores y trazas de alta latencia.

Sin embargo, para utilizar estas trazas en tus monitores, debes establecer [filtros de retención personalizados][19].

Los filtros de retención personalizados permiten decidir qué tramos se indexan y [retienen][23] al crear, modificar y desactivar filtros adicionales basados en etiquetas. También puedes establecer un porcentaje de tramos que coincidan con cada filtro que deba retenerse. Estas trazas indexadas pueden utilizarse en tus monitores.

| PRODUCTO                                                | FUENTE DEL TRAMO                                                      |
|--------------------------------------------------------|------------------------------------------------------------------|
| Monitores                                               | Tramos de filtros de retención personalizados                              |
| Otros productos <br> <i> (dashboard, notebook, etc.)</i> | Tramos de filtros de retención personalizados + filtro inteligente de Datadog |

{{% /collapse-content %}}

## Métricas de traza

Esta sección trata de las discrepancias e incoherencias de la solución de problemas con métricas de traza.

{{% collapse-content title="Las métricas de traza y las métricas basadas en tramos personalizados tienen valores diferentes" level="h4" %}}

Las métricas de traza y las métricas basadas en tramos personalizados pueden tener valores diferentes porque se calculan a partir de conjuntos de datos distintos:

- [Las métricas de traza][24] se calculan sobre la base del 100% del tráfico de la aplicación, independientemente de tu configuración del [muestreo de ingesta de trazas][25]. El espacio de nombres del rastreo sigue este formato: `trace.<SPAN_NAME>.<METRIC_SUFFIX>`.
- Las [métricas basadas en tramos personalizados][26] se generan a partir de tus tramos ingeridos, que depende de tu [muestreo de ingesta de trazas][25]. Por ejemplo, si estás ingiriendo el 50% de tus trazas, tus métricas basadas en tramos personalizados se basan en el 50% de los tramos ingeridos.

Para garantizar que tus métricas de traza y tus métricas basadas en tramos personalizados tengan el mismo valor, configura una tasa de ingesta del 100% para tu aplicación o servicio.

<div class="alert alert-info">Los nombres de métrica deben seguir la <a href="/metrics/custom_metrics/#naming-custom-metrics">convención de nomenclatura de métricas</a>. Los nombres de métrica que empiecen por <code>trace.*</code> no están permitidos y no se guardan.</div>

{{% /collapse-content %}}

## Servicios

En esta sección, se describen estrategias para solucionar problemas relacionados con el servicio.

{{% collapse-content title="Un servicio aparece como varios servicios en Datadog" level="h4" %}}

Esto puede ocurrir cuando el nombre de servicio no es coherente en todos los tramos.

Por ejemplo, puedes tener un único servicio como `service:test` mostrando múltiples servicios en Datadog:
- `service:test`
- `service:test-mongodb`
- `service:test-postgresdb`

Puedes utilizar [dependencias inferidas de servicios (Vista previa)][30]. Las API externas inferidas utilizan la nomenclatura por defecto `net.peer.name`. Por ejemplo: `api.stripe.com`, `api.twilio.com` y `us6.api.mailchimp.com`. Las bases de datos inferidas utilizan la nomenclatura por defecto `scheme db.instance`.

O bien, puedes fusionar los nombres de servicio utilizando una variable de entorno como `DD_SERVICE_MAPPING` o `DD_TRACE_SERVICE_MAPPING`, según el lenguaje. 

Para más información, consulta [Configurar la biblioteca de rastreo de Datadog][27] o elige tu lenguaje aquí:

{{< tabs >}}
{{% tab "Java" %}}

`dd.service.mapping`
: **Variable de entorno**: `DD_SERVICE_MAPPING`<br>
**Por defecto**: `null`<br>
**Ejemplo**: `mysql:my-mysql-service-name-db, postgresql:my-postgres-service-name-db`<br>
Renombra dinámicamente los servicios en la configuración. Es útil para hacer que las bases de datos tengan nombres distintos en diferentes servicios.

{{% /tab %}}

{{% tab "Python" %}}

`DD_SERVICE_MAPPING`
: Define asignaciones de nombres de servicios para permitir cambiar nombres de servicios en trazas. Por ejemplo: `postgres:postgresql,defaultdb:postgresql`. Disponible en la versión 0.47 o posterior.

{{% /tab %}}
{{% tab "Go" %}}

`DD_SERVICE_MAPPING`
: **Por defecto: `null` <br>
Cambia dinámicamente el nombre de los servicios mediante la configuración. Los servicios pueden separarse con comas o espacios, por ejemplo: `mysql:mysql-service-name,postgres:postgres-service-name`, `mysql:mysql-service-name postgres:postgres-service-name`.

{{% /tab %}}
{{% tab "Node.js" %}}

`DD_SERVICE_MAPPING`
: **Configuración**: `serviceMapping`<br>
**Por defecto**: N/A<br>
**Ejemplo**: `mysql:my-mysql-service-name-db,pg:my-pg-service-name-db`<br>
Proporciona nombres de servicio para cada complemento. Acepta pares separados por comas `plugin:service-name`, con o sin espacios.

{{% /tab %}}
{{% tab ".NET" %}}

`DD_TRACE_SERVICE_MAPPING`
: renombra servicios mediante la configuración. Acepta una lista separada por comas de pares clave-valor de las claves de nombre de servicio a renombrar, y el nombre a utilizar en su lugar, en el formato `[from-key]:[to-name]`. <br>
**Ejemplo**: `mysql:main-mysql-db, mongodb:offsite-mongodb-service`<br>
El valor `from-key` es específico del tipo de integración, y debe excluir el prefijo del nombre de la aplicación. Por ejemplo, para cambiar el nombre de `my-application-sql-server` a `main-db`, utiliza `sql-server:main-db`. Añadido en la versión 1.23.0

{{% /tab %}}
{{% tab "PHP" %}}

`DD_SERVICE_MAPPING`
: **INI**: `datadog.service_mapping`<br>
**Por defecto**: `null`<br>
Cambia el nombre por defecto de una integración de APM. Cambia el nombre de una o más integraciones a la vez, por ejemplo: `DD_SERVICE_MAPPING=pdo:payments-db,mysqli:orders-db` (ver [nombres de integración][1000]).

[1000]: https://docs.datadoghq.com/es/tracing/trace_collection/library_config/php#integration-names

{{% /tab %}}
{{% tab "Ruby" %}}

Ruby no admite `DD_SERVICE_MAPPING` ni `DD_TRACE_SERVICE_MAPPING`. Consulta [Configuración adicional de Ruby][2000] para conocer las opciones de código para cambiar el nombre de servicio.

[2000]: https://docs.datadoghq.com/es/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/#advanced-configuration

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Se ha producido un aumento inesperado de tramos ingeridos/indexados en la página Plan y uso" level="h4" %}}

Los picos en la ingesta e indexación de datos pueden deberse a varios factores. Para investigar la causa de un aumento, utiliza la función [métricas de uso estimado de trazas de APM][31]:

| TIPO DE USO | MÉTRICA | DESCRIPCIÓN |
| ------- | ------------ |------------ |
| Tramos (spans) indexados de APM     | `datadog.estimated_usage.apm.indexed_spans` | Número total de tramos indexados por filtros de retención basados en etiquetas (tags).|
| Tramos ingeridos de APM     | `datadog.estimated_usage.apm.ingested_spans`| Número total de incorporación de tramos. |

El [dashboard de uso de trazas de APM][28] contiene varios grupos de widget que muestran KPI muy importantes e información de uso adicional.

{{% /collapse-content %}}

{{% collapse-content title="Falta el mensaje de error y el stack trace" level="h4" %}}

En algunas trazas con un estado de error, la pestaña **Errors** (Errores) muestra `Missing error message and stack trace` en lugar de los detalles de la excepción. 

Un tramo puede mostrar este mensaje por dos posibles razones:
- El tramo contiene una excepción no controlada.
- Una respuesta HTTP dentro de tramo devuelve un código de estado HTTP entre 400 y 599.

Cuando se maneja una excepción en un bloque try/catch, las etiquetas de tramo `error.message`, `error.type` y `error.stack` no se rellenan. Para rellenar las etiquetas de tramo de error detallado, utiliza el código [Instrumentación personalizada][18].

{{% /collapse-content %}}

## Directrices sobre el volumen de datos

Si te encuentras con alguno de los siguientes problemas, puede que estés excediendo las [directrices de volumen de Datadog][29]:

- Tus métricas de traza no están informando como deberían en la plataforma de Datadog.
- Te faltan algunos de los recursos que esperabas ver en la plataforma de Datadog.
- Estás viendo trazas (traces) desde tu servicio, pero no puedes encontrar este servicio en la [página de Software Catalog][32].

{{% collapse-content title="Directrices sobre el volumen de datos" level="h4" %}}

Tu aplicación instrumentada puede enviar tramos con marcas temporales de hasta 18 horas en el pasado y dos horas en el futuro a partir de la hora actual.

Datadog acepta las siguientes combinaciones para un intervalo determinado de 40 minutos:

- 5000 combinaciones únicas de `environments` y `service` 
- 100 `primary tag values` únicos por etiqueta primaria adicional
- 100 `operation names` únicos por entorno y servicio
- 1000 `resources` únicos por entorno, servicio y nombre de operación
- 30 `versions` únicas por entorno y servicio

Si necesitas acomodar volúmenes más grandes, ponte en contacto con el [soporte de Datadog][1] e indícanos tu caso de uso.

Datadog trunca las siguientes cadenas si superan el número de caracteres indicado:

| Nombre            | Caracteres |
|-----------------|------------|
| [servicio][6]    |  100       |
| operación       |  100       |
| tipo            |  100       |
| [recurso][7]   |  5000      |
| [clave de etiqueta][8]    |  200       |
| [valor de etiqueta][8]  |  25000     |

Además, el número de [etiquetas de tramo][8] presentes en cualquier tramo no puede exceder de 1024.

{{% /collapse-content %}}

{{% collapse-content title="El número de servicios supera lo especificado en las directrices de volumen de datos" level="h4" %}}

Si el número de servicios excede lo especificado en las [directrices de volumen de datos](#data-volume-guidelines), intenta seguir estas prácticas recomendadas para las convenciones de nomenclatura de servicio.

### Excluir los valores de etiqueta de entorno de los nombres de servicio 

Por defecto, el entorno (`env`) es la etiqueta primaria para [Datadog APM][17].

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-3.png" alt="El entorno es la etiqueta primaria por defecto" style="width:100%;" >}}

Un servicio se despliega típicamente en múltiples entornos, como `prod`, `staging` y `dev`. Las métricas de rendimiento, como los recuentos de solicitud, la latencia y la tasa de error, difieren en función de los distintos entornos. El menú desplegable de entorno de Software Catalog te permite limitar los datos de la pestaña **Performance** (Rendimiento) a un entorno específico.

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-2.png" alt="Elige un entorno específico en el menú desplegable `env` en Software Catalog" style="width:100%;" >}}

Un patrón que suele provocar problemas con un número abrumador de servicios es incluir el valor de entorno en los nombres de servicio. Por ejemplo, es posible que tengas dos servicios únicos en lugar de uno, ya que funcionan en dos entornos distintos: `prod-web-store` y `dev-web-store`.

Datadog recomienda ajustar tu instrumentación renombrando los servicios.

Las métricas de traza no están muestreadas, lo que significa que tu aplicación instrumentada muestra todos los datos, en lugar de subsecciones de ellos. También se aplican las [directrices de volumen](#data-volume-guidelines).

### Utilizar etiquetas primarias adicionales en lugar de poner particiones de métrica o agrupar variables en nombres de servicio

Puedes utilizar etiquetas primarias adicionales para agrupar y agregar tus métricas de traza. Utiliza el menú desplegable para limitar los datos de rendimiento a un determinado nombre de clúster o valor de centro de datos.

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-1.png" alt="Utilizar el menú desplegable para seleccionar un clúster específico o un valor de centro de datos" style="width:100%;" >}}

Incluir particiones de métrica o variables de agrupación en los nombres de servicio en lugar de aplicar etiquetas primarias adicionales aumenta innecesariamente el número de servicios únicos en una cuenta y provoca posibles retrasos o pérdidas de datos.

Por ejemplo, en lugar del servicio `web-store` , podrías decidir nombrar diferentes instancias de un servicio `web-store-us-1` , `web-store-eu-1` y `web-store-eu-2` para ver las métricas de rendimiento de estas particiones una al lado de la otra. Datadog recomienda implementar el **region value** (valor de región) (`us-1`, `eu-1`, `eu-2`) como etiqueta primaria.

{{% /collapse-content %}}

## Errores de conexión

En esta sección, se ofrece orientación para diagnosticar y resolver problemas de conexión y comunicación entre tus aplicaciones y el Datadog Agent.

{{% collapse-content title="Tu aplicación instrumentada no se comunica con el Datadog Agent" level="h4" %}}

Lee cómo encontrar y solucionar estos problemas en [Errores de conexión][4].

{{% /collapse-content %}}

## Uso de recursos

Esta sección contiene información sobre cómo solucionar problemas de rendimiento relacionados con el uso de recursos.

{{% collapse-content title="Errores de memoria insuficiente" level="h4" %}}

Lee sobre la detección del uso de la CPU de recopilación de trazas y sobre el cálculo de los límites de recursos adecuados para el Agent en [Uso de recursos del Agent][10].

{{% /collapse-content %}}

{{% collapse-content title="Mensajes de error de eventos de límite de tasa o máximo" level="h4" %}}

Dentro de los logs del Datadog Agent, si ves mensajes de error sobre límites de tasa o eventos máximos por segundo, puedes cambiar estos límites siguiendo [estas instrucciones][9]. Si tienes alguna duda, antes de cambiar los límites, consulta con el [equipo de soporte][1] de Datadog.

{{% /collapse-content %}}

## Seguridad

Esta sección aborda los enfoques para resolver los problemas de seguridad en APM, incluida la protección de datos confidenciales y la gestión del tráfico.

{{% collapse-content title="Modificar, descartar o enmascarar tramos" level="h4" %}}

Hay varias opciones de configuración disponibles para limpiar datos confidenciales o descartar trazas correspondientes a los checks de estado u otro tráfico no deseado que pueden configurarse dentro del Datadog Agent o, en algunos lenguajes, el cliente de rastreo. Para más detalles sobre las opciones disponibles, consulta [Seguridad y personalización de Agent][11]. Aunque esto ofrece ejemplos representativos, si necesitas ayuda para aplicar estas opciones a tu entorno, ponte en contacto con el [soporte de Datadog][1].

{{% /collapse-content %}}

## Depuración y registro

Esta sección explica cómo utilizar la depuración y el inicio de logs para identificar y resolver problemas con tu rastreador de Datadog.

{{% collapse-content title="Depurar logs" level="h4" %}}

Para capturar todos los detalles en el rastreador de Datadog, habilita el modo de depuración en tu rastreador mediante la variable de entorno `DD_TRACE_DEBUG`. Puedes habilitarlo para tu propia investigación o si el soporte de Datadog lo ha recomendado para propósitos de triaje. Sin embargo, asegúrate de desactivar el registro de depuración cuando hayas terminado los tests para evitar la sobrecarga de registro que introduce.

Estos logs pueden mostrar errores de instrumentación o errores específicos de integración. Para obtener más información sobre la activación y captura de estos logs de depuración, consulta la [página para solucionar problemas del modo de depuración][5].

{{% /collapse-content %}}

{{% collapse-content title="Inicio de logs" level="h4" %}}

Durante el inicio, las bibliotecas de rastreo de Datadog emiten logs que reflejan las configuraciones aplicadas en un objeto JSON, así como cualquier error encontrado, incluido si se puede llegar al Agent en los lenguajes donde esto es posible. Algunos lenguajes requieren que se habilite este inicio de logs con la variable de entorno `DD_TRACE_STARTUP_LOGS=true`. Para más información, consulta [Logs de inicio][3].

{{% /collapse-content %}}

## Soporte adicional

Si sigues necesitando ayuda adicional, abre un tique en el soporte de Datadog.

{{% collapse-content title="Abrir un tique de soporte de Datadog" level="h4" %}}

Cuando abres un [tique de soporte][1], el equipo de soporte de Datadog puede pedirte los siguientes tipos de información:

1. **Enlaces a una traza o capturas de pantalla del problema**: esto ayuda a reproducir tus problemas a efectos de solucionar problemas.

2. **Logs de inicio del rastreador**: los logs de inicio ayudan a identificar errores de configuración del rastreador o problemas de comunicación entre el rastreador y el Datadog Agent. Comparando la configuración del rastreador con la de la aplicación o el contenedor, los equipos de soporte pueden identificar las configuraciones aplicadas incorrectamente.

3. **Logs de depuración del rastreador**: los logs de depuración del rastreador proporcionan una visión más detallada que los logs de inicio, esto demuestra:
   - Una instrumentación de integración adecuada durante el flujo de tráfico de aplicación
   - Contenido de tramos creados por el rastreador
   - Errores de conexión al enviar tramos al Agent

4. **Flare de Datadog Agent**: [los flares del Datadog Agent][12] te permiten ver lo que está ocurriendo dentro del Datadog Agent, por ejemplo, si las trazas están siendo rechazadas o están malformadas. Esto no ayuda si las trazas no llegan al Datadog Agent, pero sí ayuda a identificar la fuente de un problema, o cualquier discrepancias en las métricas.

5. **Una descripción de tu entorno**: entender la configuración del despliegue de tu aplicación ayuda al equipo de soporte a identificar posibles problemas de comunicación entre el Agent y el rastreador e identificar errores de configuración. Para problemas complejos, el equipo de soporte puede solicitar manifiestos de Kubernetes, definiciones de tareas de ECS o archivos de configuración de despliegue similares.

6. **Código de rastreo personalizado**: la instrumentación personalizada, la configuración y añadir etiquetas de tramo puede afectar significativamente a las visualizaciones de trazas en Datadog.

7. **Información sobre la versión**: saber qué versiones de lenguaje, framework, Datadog Agent y rastreador de Datadog estás utilizando permite al servicio de asistencia verificar los [requisitos de compatibilidad][15], comprobar problemas conocidos o recomendar una actualización de versión. Por ejemplo:

{{% /collapse-content %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: /es/tracing/metrics/metrics_namespace/
[3]: /es/tracing/troubleshooting/tracer_startup_logs/
[4]: /es/tracing/troubleshooting/connection_errors/
[5]: /es/tracing/troubleshooting/tracer_debug_logs/
[6]: /es/tracing/glossary/#services
[7]: /es/tracing/glossary/#resources
[8]: /es/glossary/#span-tag
[9]: /es/tracing/troubleshooting/agent_rate_limits
[10]: /es/tracing/troubleshooting/agent_apm_resource_usage/
[11]: /es/tracing/custom_instrumentation/agent_customization
[12]: /es/agent/troubleshooting/send_a_flare/?tab=agentv6v7
[13]: /es/agent/troubleshooting/debug_mode/?tab=agentv6v7
[14]: /es/tracing/custom_instrumentation/
[15]: /es/tracing/compatibility_requirements/
[16]: /es/tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-additional-primary-tags-in-datadog
[17]: /es/tracing/guide/setting_primary_tags_to_scope/
[18]: /es/tracing/trace_collection/custom_instrumentation/?tab=datadogapi
[19]: /es/tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
[20]: https://app.datadoghq.com/apm/traces
[21]: /es/tracing/trace_pipeline/trace_retention/#datadog-intelligent-retention-filter
[22]: /es/tracing/trace_pipeline/trace_retention/#retention-filters
[23]: /es/data_security/data_retention_periods/
[24]: /es/tracing/metrics/metrics_namespace/
[25]: /es/tracing/trace_pipeline/ingestion_mechanisms/?tab=java
[26]: /es/tracing/trace_pipeline/generate_metrics/
[27]: /es/tracing/trace_collection/library_config/
[28]: https://app.datadoghq.com/dash/integration/apm_estimated_usage
[29]: /es/tracing/troubleshooting/#data-volume-guidelines
[30]: /es/tracing/services/inferred_services
[31]: /es/tracing/trace_pipeline/metrics/#apm-traces-estimated-usage-dashboard
[32]: https://app.datadoghq.com/services