---
aliases:
- /es/tracing/faq/my-trace-agent-log-renders-empty-service-error/
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
title: Solucionar problemas de APM
---

Si experimentas un comportamiento inesperado con Datadog APM , hay algunos problemas comunes que puedes investigar y que esta guía puede ayudarte a resolver rápidamente. Si sigues teniendo problemas, ponte en contacto con el [soporte de Datadog][1] para obtener más ayuda. Datadog recomienda actualizar regularmente a la última versión de las bibliotecas de rastreo de Datadog que utilices, ya que cada versión contiene mejoras y correcciones.

## Solucionar problemas de pipeline

Los siguientes componentes intervienen en el envío de datos de APM a Datadog:

{{< img src="tracing/troubleshooting/troubleshooting_pipeline_info_1.png" alt="Pipeline de solucionar problemas de APM">}}

Las trazas (tipo de datos JSON) y las [métricas de rastreo de aplicación][2] se generan desde la aplicación y se envían al Datadog Agent antes de trasladarse al backend. Se puede recopilar diferente información para solucionar problemas en cada sección del pipeline. Es importante destacar que los logs de depuración del rastreador se escriben en los logs de la aplicación, que es un componente independiente del flare del Datadog Agent. Puedes encontrar más información sobre estos elementos en [Solucionar problemas de datos solicitados por el soporte de Datadog]solucionar problemas(#troubleshooting-data-requested-by-datadog-support).

## Confirmar la configuración de APM y el estado del Agent 

Durante el arranque, las bibliotecas de rastreo de Datadog emiten logs que reflejan las configuraciones aplicadas en un objeto JSON, así como cualquier error encontrado, incluyendo si se puede llegar al Agent en lenguajes donde esto es posible. Algunos lenguajes requieren que estos logs de inicio estén habilitados con la variable de entorno `DD_TRACE_STARTUP_LOGS=true`. Para más información sobre los logs de inicio, consulta la [página dedicada][3] para solucionar problemas.

## Errores de conexión

Una fuente habitual de problemas es la incapacidad de la aplicación instrumentada para comunicarse con el Datadog Agent. Lee sobre cómo encontrar y solucionar estos problemas en [Errores de conexión][4].

## Logs de depuración del rastreador

Para capturar todos los detalles del rastreador de Datadog, habilita el modo de depuración en tu rastreador utilizando la variable de entorno `DD_TRACE_DEBUG`. Puedes habilitarlo para tu propia investigación o porque Datadog lo recomienda para propósitos de análisis. Sin embargo, no dejes el modo de depuración siempre activado, porque sobrecarga el registro que introduce.

Estos logs pueden mostrar errores de instrumentación o errores específicos de integración. Para obtener más información sobre la activación y captura de estos logs de depuración, consulta la [página para solucionar problemas del modo de depuración][5].

## Directrices sobre el volumen de datos

Tu aplicación instrumentada puede enviar tramos con marcas temporales de hasta 18 horas en el pasado y dos horas en el futuro a partir de la hora actual.

Datadog trunca las siguientes cadenas si superan el número de caracteres indicado:

| Nombre         | Caracteres |
|--------------|------------|
| [servicio][6]    |  100       |
| operación    |  100       |
| tipo         |  100       |
| [recurso][7]   |  5000      |
| [clave de etiqueta][8]    |  200       |
| [valor de etiqueta][8]  |  25000     |

Además, el número de [etiquetas de tramo][8] presentes en cualquier tramo no puede exceder de 1024.

Para un intervalo determinado de 40 minutos, Datadog acepta las siguientes combinaciones. Para adaptarte a volúmenes mayores, ponte en contacto con el [soporte][1] para analizar tu caso de uso.

- 5000 combinaciones únicas de entornos y servicio 
- 30 valores únicos de [segunda etiqueta primaria][16] por entorno
- 100 nombres de operación únicos por entorno y servicio
- 1000 recursos únicos por entorno, servicio y nombre de operación
- 30 versiones únicas por entorno y servicio

## Límites de tasa de APM

Dentro de los logs del Datadog Agent, si ves mensajes de error sobre límites de tasa o eventos máximos por segundo, puedes cambiar estos límites siguiendo [estas instrucciones][9]. Si tienes alguna duda, antes de cambiar los límites, consulta con el [equipo de soporte][1] de Datadog.

## Uso de recursos de APM

Lee sobre la detección del uso de la CPU de recopilación de trazas y sobre el cálculo de los límites de recursos adecuados para el Agent en [Uso de recursos del Agent][10].

## Modificar, descartar o enmascarar tramos

Hay una serie de opciones de configuración disponibles para limpiar datos confidenciales o descartar trazas correspondientes a los checks de estado u otro tráfico no deseado que se puede configurar dentro del Datadog Agent, o en algunos lenguajes dentro del Cliente de rastreo. Para más detalles sobre las opciones disponibles, consulta [Seguridad y personalización del Agent ][11]. Aunque hay ejemplos representativos, si necesitas ayuda para aplicar estas opciones a tu entorno, ponte en contacto con el [Soporte de Datadog][1].

## Problemas con las convenciones de nomenclatura de servicio

Si el número de servicios excede lo especificado en las [directrices de volumen de datos](#data-volume-guidelines), intenta seguir estas prácticas recomendadas para las convenciones de nomenclatura de servicio.

### Excluir los valores de etiqueta de entorno de los nombres de servicio 

Por defecto, el entorno (`env`) es la etiqueta primaria para [Datadog APM][17].

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-3.png" alt="El entorno es la etiqueta primaria por defecto" style="width:100%;" >}}

Un servicio suele desplegarse en varios entornos, como `prod`, `staging` y `dev`. Las métricas de rendimiento, como el recuento de solicitudes, la latencia y la tasa de errores, difieren entre varios entornos. El menú desplegable de entorno en el Catálogo de servicios te permite limitar los datos de la pestaña **Performance** (Rendimiento) a un entorno específico.

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-2.png" alt="Elegir un entorno específico con el menú desplegable `env` en el Catálogo de servicios" style="width:100%;" >}}

Un patrón que suele provocar problemas con un número abrumador de servicios es incluir el valor de entorno en los nombres de servicio. Por ejemplo, es posible que tengas dos servicios únicos en lugar de uno, ya que funcionan en dos entornos distintos: `prod-web-store` y `dev-web-store`.

Datadog recomienda ajustar tu instrumentación renombrando los servicios.

Las métricas de traza no están muestreadas, lo que significa que tu aplicación instrumentada muestra todos los datos, en lugar de subsecciones de ellos. También se aplican las [directrices de volumen](#data-volume-guidelines).

### Utilizar la segunda etiqueta primaria en lugar de poner particiones de métrica o agrupar variables en nombres de servicio 

Las segundas etiquetas primarias son etiquetas adicionales que puedes utilizar para agrupar y añadir tus métricas de traza. Puedes utilizar el menú desplegable para limitar los datos de rendimiento a un determinado nombre de clúster o valor de centro de datos.

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-1.png" alt="Utilizar el menú desplegable para seleccionar un clúster específico o un valor de centro de datos" style="width:100%;" >}}

Incluir particiones de métrica o variables de agrupación en los nombres de servicio en lugar de aplicar la segunda etiqueta primaria aumenta innecesariamente el número de servicios únicos en una cuenta y provoca posibles retrasos o pérdidas de datos.

 Por ejemplo, en lugar del servicio `web-store`, podrías decidir nombrar diferentes instancias de un servicio `web-store-us-1` , `web-store-eu-1` y `web-store-eu-2` para ver las métricas de rendimiento para estas particiones en paralelo. Datadog recomienda implementar el **valor de región** (`us-1`, `eu-1`, `eu-2`) como una segunda etiqueta primaria.

## Solucionar problemas de los datos solicitados por el soporte de Datadog

Cuando abres un [tique de soporte][1], nuestro equipo de soporte puede pedirte alguna combinación de los siguientes tipos de información:

1. **¿Cómo confirmas el problema? Proporciona enlaces a rastrear (preferiblemente) o capturas de pantalla, por ejemplo, e indica a soporte lo que esperas ver.**

    Esto permite al equipo de soporte confirmar los errores e intentar reproducir tus problemas en entornos de prueba de Datadog.

2. **[Logs de inicio del rastreador](#confirm-apm-setup-and-agent-status)**

    Los logs de inicio son una buena manera de detectar una configuración incorrecta del rastreador, o la incapacidad de éste para comunicarse con el Datadog Agent. Comparando la configuración que ve el rastreador con la establecida dentro de la aplicación o el contenedor, el equipo de soporte puede identificar áreas en las que una configuración no se está aplicando correctamente.

3. **[Logs de depuración del rastreador](#tracer-debug-Logs)**

    Los logs de depuración del rastreador van un paso más allá que los logs de inicio, y ayudan a identificar si las integraciones se están instrumentando correctamente de una manera que no se puede comprobar hasta que el tráfico fluye a través de la aplicación. Los logs de depuración pueden ser extremadamente útiles para ver el contenido de tramos creados por el rastreador y pueden mostrar un error si hay un problema de conexión al intentar enviar tramos al Agent. Los logs de depuración del rastreador son normalmente la herramienta más informativa y fiable para confirmar el comportamiento matizado del rastreador.

4. **Un [flare del Datadog Agent][12] (snapshot de logs y configuraciones) que captura una muestra representativa de logs de un periodo cuando se envían trazas a tu Datadog Agent mientras está en [modo de depuración o traza][13], según qué información estés buscando en estos logs.**

    Los flares de Datadog Agent te permiten ver lo que está ocurriendo en el Datadog Agent, por ejemplo, si se rechazan o modifican erróneamente trazas. Esto no ayuda si las trazas no están llegando a la Datadog Agent, pero sí ayuda a identificar la fuente de un problema, o cualquier discrepancia entre métricas.

    Al ajustar el nivel de log a los modos `debug` o `trace`, ten en cuenta que éstos aumentan significativamente el volumen de log y, por tanto, el consumo de recursos del sistema (en concreto, el espacio de almacenamiento a largo plazo). Datadog recomienda que solo se utilicen temporalmente con fines de solucionar problemas y que el nivel se restablezca a `info` luego.

    **Nota**: Si estás utilizando el Datadog Agent v7.19+ y Datadog Helm Chart con la [última versión][9], o un DaemonSet donde el Datadog Agent y Trace Agent están en contenedores separados, necesitarás ejecutar el siguiente comando con `log_level: DEBUG` o `log_level: TRACE` configurado en tu `datadog.yaml` para obtener un flare del Trace Agent:

    {{< code-block lang="shell" filename="trace-agent.sh" >}}
kubectl exec -it <agent-pod-name> -c trace-agent -- agent flare <case-id> --local
    {{< /code-block >}}

5. **Una descripción de tu entorno**

    Saber cómo se despliega tu aplicación ayuda al equipo de soporte a identificar problemas probables de comunicación del Trace Agent o errores de configuración. En caso de problemas difíciles, el servicio de soporte puede solicitar, por ejemplo, un manifiesto de Kubernetes o la definición de una tarea de ECS.

6. **Código personalizado escrito utilizando las bibliotecas de rastreo, como la configuración del rastreador, la [instrumentación personalizada][14], y añadiendo etiquetas de tramo**

   La instrumentación personalizada puede ser una herramienta poderosa, pero también puede tener efectos secundarios no intencionados en tus visualizaciones de traza dentro de Datadog, por lo que el soporte puede preguntar sobre esto para descartarlo como actividad sospechosa.

    Además, preguntar por la instrumentación automática y configuración permite a Datadog confirmar si esto coincide con lo que están viendo los logs de inicio y depuración del rastreador.

7. **Versiones de:**
   * **Lenguaje de programación, marcos de trabajo y dependencias utilizadas para crear la aplicación instrumentada**
   * **Rastreador de Datadog**
   * **Datadog Agent**

    Saber qué versiones se están utilizando nos permite asegurarnos que las integraciones son compatibles en nuestra sección [Requisitos de compatibilidad][15], hacer un check de los problemas conocidos, o recomendar una actualización del rastreador o de la versión del lenguaje si soluciona el problema.

## Leer más

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
[16]: /es/tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-a-second-primary-tag-in-datadog
[17]: /es/tracing/guide/setting_primary_tags_to_scope/