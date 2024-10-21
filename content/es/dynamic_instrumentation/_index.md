---
aliases:
- /es/tracing/dynamic_instrumentation/
- /es/dynamic_instrumentation/how-it-works/
further_reading:
- link: /dynamic_instrumentation/expression-language/
  tag: Documentación
  text: Más información sobre el lenguaje de expresión de instrumentación dinámica
- link: dynamic_instrumentation/sensitive-data-scrubbing/
  tag: Documentación
  text: Eliminación de información confidencial de los datos de instrumentación dinámica
- link: /tracing/trace_collection/dd_libraries
  tag: Documentación
  text: Más información sobre cómo instrumentar tu aplicación
- link: /getting_started/tagging/unified_service_tagging/
  tag: Documentación
  text: Etiquetado de servicios unificado
- link: /tracing/service_catalog/
  tag: Documentación
  text: Descubrir y catalogar los servicios que informan a Datadog
- link: /metrics
  tag: Documentación
  text: Más información sobre métricas
- link: https://www.datadoghq.com/blog/dynamic-instrumentation-application-logging/
  tag: Blog
  text: Utilizar la instrumentación dinámica de Datadog para añadir logs de aplicación
    sin volver a desplegarlos
is_beta: false
private: false
title: Instrumentación Dinámica
---

## Información general

La instrumentación dinámica te permite añadir instrumentación en tus sistemas de producción en ejecución sin necesidad de reiniciar y en cualquier localización del código de tu aplicación, incluyendo bibliotecas de terceros. Puedes añadir o modificar telemetría para logs, métricas, tramos (spans), y el etiquetado correspondiente, desde la interfaz de usuario de Datadog. La instrumentación dinámica tiene poca sobrecarga y no tiene efectos secundarios en tu sistema.

Si estás interesado en probar las últimas mejoras de la experiencia de usuario de la instrumentación dinámica, considera la posibilidad de participar en la fase beta pública de [autocompletar y buscar][17].

## Empezando

### Requisitos previos

La instrumentación dinámica requiere lo siguiente:

- [Datadog Agent][1] 7.45.0 o posterior está instalado junto a tu servicio.
- [Configuración remota][2] está activada en ese Agent.
- Para las aplicaciones Java, la biblioteca de rastreo [`dd-trace-java`][3] es 1.34.0 o posterior.
- Para las aplicaciones Python, la biblioteca de rastreo [`dd-trace-py`][4] es 2.2.0 o posterior.
- Para aplicaciones .NET, la biblioteca de rastreo [`dd-trace-dotnet`][5] es 2.54.0 o posterior.
- Para las aplicaciones de PHP, la biblioteca de rastreo [`dd-trace-php`][18] 1.4.0 o posterior.
- Las etiquetas (tags) del [etiquetado de servicios unificado][6] `service`, `env` y `version` se aplican a tu despliegue.
- Recomendado, se encuentra habilitado [autocompletar y buscar (fase beta abierta)][17].
- Recomendado, la [integración de código fuente][7] está configurada para tu servicio.
- Se requiere el permiso **Configuración de lectura de Dynamic Instrumentation** (`debugger_read`) para acceder a la página de Dynamic Instrumentation.
- Se requiere el permiso **Configuración de escritura de Dynamic Instrumentation** (`debugger_write`) para crear o modificar instrumentaciones.
- Para usar la opción **Capture method parameters and local variables** (Capturar parámetros de métodos y variables locales) se requiere el permiso **Variables de captura de Dynamic Instrumentation** (`debugger_capture_variables`).

 Para obtener más información sobre roles y cómo asignar roles a los usuarios, consulta [Control de acceso basado en roles][8].

### Crear un índice de logs

Dynamic Instrumentation crea «logs dinámicos» que se envían a Datadog y aparecen junto a tus logs de aplicaciones habituales.

Si usas [filtros de exclusión][9], asegúrate de que no se filtren logs de Dynamic Instrumentation:

1. Crea un índice de logs y [configúralo][10] en la retención deseada **sin muestreo**.
2. Configura el filtro para que coincida con la etiqueta `source:dd_debugger`. Todos los logs de Dynamic Instrumentation tienen esta fuente.
3. Asegúrate de que el índice nuevo tenga prioridad sobre cualquier otro con filtros que coincidan con esa etiqueta, porque prevalece la primera coincidencia.

### Habilitar Dynamic Instrumentation

Para habilitar Dynamic Instrumentation en un servicio, ve a la [página de configuración de la aplicación][16].

Para obtener instrucciones más detalladas, selecciona tu tiempo de ejecución a continuación:

{{< partial name="dynamic_instrumentation/dynamic-instrumentation-languages.html" >}}


### Limitaciones

- Dynamic Instrumentation aún no es compatible con servicios de Azure App o entornos serverless.
- La compatibilidad se limita a las aplicaciones creadas con Python, Java, .NET y PHP.

## Explorar Dynamic Instrumentation

Dynamic Instrumentation puede ayudarte a entender lo que hace tu aplicación en el tiempo de ejecución. Al añadir un sondeo de Dynamic Instrumentation estás exportando datos adicionales de tu aplicación, sin necesidad de cambiar el código o volver a desplegarlo.

### Uso de sondeos

Un sondeo te permite recopilar datos de puntos específicos de tu código sin detener la ejecución del programa.

Piensa en el uso de sondeos como una mejora de tu capacidad de observación mediante la adición de métricas, tramos y logs dinámicos a una aplicación en ejecución sin necesidad de cambiar el código, desplegarlo o reiniciar un servicio. Puedes recopilar datos de inmediato sin perturbar la experiencia del usuario ni requerir despliegues largos.

Como desarrollador, también puedes pensar en un sondeo como un «punto de interrupción sin detención». En la depuración tradicional, un punto de interrupción es un punto del programa en el que se detiene la ejecución, lo que permite al desarrollador inspeccionar el estado del programa en ese punto. Sin embargo, en el mundo real de los entornos de producción, no es práctico ni posible detener la ejecución del programa. Los sondeos llenan este vacío al permitir inspeccionar el estado de las variables en entornos de producción de una manera no invasiva.

### Creación de un sondeo

Todos los tipos de sondeos requieren la misma configuración inicial:

1. Ve a la [página de Dynamic Instrumentation][12].
1. Haz clic en **Create probe** (Crear sondeo) en la parte superior derecha, o haz clic en el menú de tres puntos de un servicio y selecciona **Add a probe for this service** (Añadir un sondeo para este servicio).
1. Si no se han rellenado previamente, elige un servicio, tiempo de ejecución, entorno y versión.
1. En el código fuente, especifica dónde establecer el sondeo al seleccionar una clase y un método o un archivo fuente y una línea. Si has optado por la [fase beta pública de autocompletar y buscar][17], autocompletar mostrará sugerencias para seleccionar una clase o método.

Consulta los tipos de sondeos individuales a continuación a fin de conocer los pasos de creación específicos para cada tipo de sondeo.

También puedes crear un sondeo a partir de estos otros contextos:

Generación de perfiles
: En una gráfica de llamas del generador de perfiles, puedes crear un sondeo para un método al seleccionar **Instrument this frame with a probe** (Instrumentar este marco con un sondeo) en el menú contextual del marco.

Rastreo de errores
: En un stack trace, pasa el ratón sobre un marco de stack y haz clic en **Instrument** (Instrumentar). Esto rellena previamente el formulario de creación del sondeo con el contexto del problema.


### Creación de sondeos de log

Un *sondeo de log* emite un log cuando se ejecuta.

Para crear un sondeo de log:

1. Selecciona **Log** como tipo de sondeo.
1. Completa la [configuración genérica del sondeo](#creating-a-probe) (elige un servicio, entorno, versión y localización del sondeo).
1. Define una plantilla de mensajes de log. Puedes usar el lenguaje de expresión de Dynamic Instrumentation para hacer referencia a valores del contexto de ejecución.
1. Opcionalmente habilita la captura de datos adicionales del sondeo. (Fase beta)
1. Opcionalmente, define una condición con el lenguaje de expresión de Dynamic Instrumentation. El log se emite cuando la expresión se evalúa como verdadera.

Los sondeos de log se habilitan de manera predeterminada en todas las instancias de servicio que coinciden con la versión y entorno especificados. Su frecuencia de ejecución está limitada a un máximo de 5000 veces por segundo en cada instancia de tu servicio.

Debes establecer una plantilla de mensajes de log en cada sondeo de log. La plantilla admite la inclusión de [expresiones][15] entre llaves. Por ejemplo: `User {user.id} purchased {count(products)} products`.

También puedes establecer una condición en un sondeo de log con el [lenguaje de expresión][15]. La expresión debe ser booleana. El sondeo se ejecuta si la expresión es verdadera, y no captura ni emite ningún dato si la expresión es falsa.

{{< img src="dynamic_instrumentation/log_probe.png" alt="Creación de un sondeo de log de Dynamic Instrumentation" >}}

**Fase beta**: si habilitas **Capture method parameters and local variables** (Capturar parámetros de métodos y variables locales) en el sondeo de log, todo el contexto de ejecución se añade el evento de log:
  - **Argumentos de método**, **variables locales** y **campos**, con los siguientes límites predeterminados:
    - Sigue las referencias a tres niveles de detalle (configurables en la interfaz de usuario).
    - Los primeros 100 elementos dentro de las colecciones.
    - Los primeros 255 caracteres para valores de cadena.
    - 20 campos dentro de los objetos. Los campos estáticos no se recopilan.
  - Llama a **stack trace**.
  - **Excepciones** capturadas y no capturadas.

Los sondeos con esta opción habilitada están limitados a un resultado por segundo.

<div class="alert alert-info"><p><strong>Advertencia: Los datos capturados pueden contener información confidencial, incluidos datos personales, contraseñas y secretos como las claves de AWS.</strong></p><p>Para garantizar que esta información se ha redactado correctamente:<ul>
<li>Datadog Dynamic Instrumentation emplea varias técnicas para redactar información confidencial. Para obtener más información sobre los mecanismos predeterminados o sobre cómo ampliarlos a fin de satisfacer tus necesidades, lee <a href="/dynamic_instrumentation/sensitive-data-scrubbing/">Limpieza de datos confidenciales</a>.</li>
<li>Desactiva la opción <strong>Capture method parameters and local variables</strong> (Capturar parámetros de métodos y variables locales) y selecciona de manera explícita las variables que quieres incluir en la plantilla de mensajes de log. Esto asegura que los sondeos de log solo contengan datos relacionados con las variables que identifiques de manera específica, lo que reduce el riesgo de filtraciones involuntarias de datos confidenciales. </li>
<li>Si eres el administrador de tu cuenta de Datadog y quieres evitar que otros usuarios puedan usar la opción <strong>Capture method parameters and local variables</strong> (Capturar parámetros de métodos y variables locales), puedes revocar el permiso de variables de captura de Dynamic Instrumentation (<code>debugger_capture_variables</code>). </li></ul></p><p>Como alternativa, si necesitas registrar estos datos pero quieres mitigar el riesgo asociado a que se puedan acceder en el producto de Datadog, puedes limitar qué usuarios de tu organización pueden ver los datos capturados al configurar una <a href="/logs/guide/logs-rbac/?tab=ui#restrict-access-to-logs">consulta de restricción</a> en <code>source:dd_debugger</code>.</p></div>

### Creación de sondeos de métrica

Un *sondeo de métrica* emite una métrica cuando se ejecuta.

Para crear un sondeo de métrica:

1. Selecciona **Metric** (Métrica) como tipo de sondeo.
1. Completa la [configuración genérica del sondeo](#creating-a-probe) (elige un servicio, entorno, versión y localización del sondeo).
1. Especifica un nombre para la métrica, que llevará el prefijo `dynamic.instrumentation.metric.probe.`.
1. Selecciona un tipo de métrica (recuento, gauge, o histograma).
1. Elige el valor de la métrica con el [lenguaje de expresión de Dynamic Instrumentation][15]. Puedes usar cualquier valor numérico que quieras del contexto de ejecución, como un parámetro de método, una variable local, un campo de clase o una expresión que produzca un valor numérico. Esto es opcional en el caso de las métricas de recuento, y si lo omites, cada invocación incrementará el recuento en uno.

{{< img src="dynamic_instrumentation/metric_probe.png" alt="Creación de un sondeo de métrica de Dynamic Instrumentation" >}}

Los sondeos de métrica se habilitan de manera automática en todas las instancias de servicio que coinciden con la versión y entorno configurados. Los sondeos de métrica no están limitados por la frecuencia y se ejecutan cada vez que se invoca el método o la línea.

Los sondeos de métrica de Dynamic Instrumentation admiten los siguientes tipos de métricas:

- **Recuento**: cuenta la cantidad de veces que se ejecuta una línea o método determinado. Se puede combinar con [expresiones de métricas][15] para usar el valor de una variable a fin de incrementar el recuento.
- **Gauge**: genera un gauge basado en el último valor de una variable. Esta métrica requiere una [expresión de métrica][15].
- **Histograma**: genera una distribución estadística de una variable. Esta métrica requiere una [expresión de métrica][15].

### Creación de sondeos de tramo

Un *sondeo de tramo* emite un tramo cuando se ejecuta un método.

Para crear un sondeo de tramo:

1. Selecciona **Span** (Tramo) como tipo de sondeo.
1. Completa la [configuración genérica del sondeo](#creating-a-probe) (elige un servicio, entorno, versión y localización del sondeo).

{{< img src="dynamic_instrumentation/span_probe.png" alt="Creación de un sondeo de tramo de Dynamic Instrumentation" >}}

Puedes usar un *sondeo de tramo* como alternativa a [crear tramos nuevos con la instrumentación personalizada][13]. Si el método lanza una excepción, los detalles de la excepción se asocian a la nueva etiqueta `error` del tramo.

### Creación de sondeos de etiqueta de tramo

Un sondeo de *etiqueta de tramo* añade un valor de etiqueta a un tramo existente. Puedes añadir una etiqueta al tramo _activo_ o al tramo de _entrada de servicio_.
Ten en cuenta que los tramos internos no se indexan de manera predeterminada y, por tanto, es posible que no se puedan buscar en APM.

Para crear un sondeo de etiqueta de tramo:

1. Selecciona **Span Tag** (Etiqueta de tramo) como tipo de sondeo.
1. Completa la [configuración genérica del sondeo](#creating-a-probe) (elige un servicio, entorno, versión y localización del sondeo).
1. Especifica un nombre para la etiqueta.
1. Especifica el valor de la etiqueta con el [lenguaje de expresión de Dynamic Instrumentation][15].
1. Opcionalmente, define una condición con el lenguaje de expresión de Dynamic Instrumentation. Solo se añadirá la etiqueta cuando la expresión se evalúe como verdadera.
1. Opcionalmente, añade etiquetas adicionales, cada una con su nombre, expresión y condición opcional.


{{< img src="dynamic_instrumentation/span_tag_probe.png" alt="Creación de un sondeo de etiqueta de tramo de Dynamic Instrumentation" >}}

Puedes usar un *sondeo de etiqueta de tramo* como alternativa a [usar la instrumentación personalizada para añadir etiquetas en el código][14].


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/
[2]: /es/agent/remote_config/
[3]: https://github.com/DataDog/dd-trace-java
[4]: https://github.com/DataDog/dd-trace-py
[5]: https://github.com/DataDog/dd-trace-dotnet
[6]: /es/getting_started/tagging/unified_service_tagging/
[7]: /es/integrations/guide/source-code-integration/
[8]: /es/account_management/rbac/permissions#apm
[9]: /es/logs/log_configuration/indexes/#exclusion-filters
[10]: /es/logs/log_configuration/indexes/#add-indexes
[11]: /es/dynamic_instrumentation/how-it-works/
[12]: https://app.datadoghq.com/dynamic-instrumentation
[13]: /es/tracing/trace_collection/custom_instrumentation/java/#adding-spans
[14]: /es/tracing/trace_collection/custom_instrumentation/java/#adding-tags
[15]: /es/dynamic_instrumentation/expression-language
[16]: https://app.datadoghq.com/dynamic-instrumentation/setup
[17]: /es/dynamic_instrumentation/symdb/
[18]: https://github.com/DataDog/dd-trace-php