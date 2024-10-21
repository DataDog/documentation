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
- Las etiquetas del [etiquetado de servicios unificado][6] `service`, `env` y `version` se aplican a tu despliegue.
- Recomendado, [autocompletar y buscar (fase beta abierta)][17] están activados.
- Recomendado, [la integración de código fuente][7] está configurada para tu servicio.
- El permiso **Dynamic Instrumentation Read Configuration** (Configuración de lectura de la instrumentación dinámica) (`debugger_read`) es necesario para acceder a la página de instrumentación dinámica.
- El permiso **Dynamic Instrumentation Write Configuration** (Configuración de escritua de la instrumentación dinámica) (`debugger_write`) es necesario para crear o modificar instrumentaciones.
- Para utilizar la opción **Capture method parameters and local variables** (Capturar parámetros de métodos y variables locales) se requiere el permiso **Dynamic Instrumentation Capture Variables** (Variables de captura de la instrumentación dinámica) (`debugger_capture_variables`).

 Para más información sobre roles y sobre cómo asignar roles a los usuarios, consulta [Control de acceso basado en roles][8].

### Crear un índice de logs

Instrumentación dinámica crea "Logs dinámicos" que se envían a Datadog y aparecen junto a tus logs de aplicación habituales.

Si utilizas [Filtros de exclusión][9], asegúrate de que no se filtren logs de instrumentación dinámica:

1. Crea un índice de logs y [configúralo][10] en la retención deseada con **sin muestreo**.
2. Configura el filtro para que coincida con la etiqueta `source:dd_debugger`. Todos los logs de instrumentación dinámica tienen esta fuente.
3. Asegúrate de que el nuevo índice tiene prioridad sobre cualquier otro con filtros que coincidan con esa etiqueta, porque la primera coincidencia gana.

### Activar la instrumentación dinámica

Para activar la instrumentación dinámica en un servicio, ve a la [página de configuración dentro de la aplicación][16].

Para obtener instrucciones más detalladas, selecciona tu tiempo de ejecución a continuación:

{{< partial name="dynamic_instrumentation/dynamic-instrumentation-languages.html" >}}


### Limitaciones

- Instrumentación dinámica aún no es compatible con servicios de Azure App o entornos serverless.
- La compatibilidad se limita a las aplicaciones creadas con Python, Java y .NET.

## Explorar la instrumentación dinámica

La instrumentación dinámica puede ayudar a entender lo que tu aplicación está haciendo en el tiempo de ejecución. Al añadir un sondeo de instrumentación dinámica está exportando datos adicionales de tu aplicación, sin necesidad de cambiar el código o volver a desplegarlo.

### Uso de sondeo

Un sondeo te permite recopilar datos de puntos específicos de tu código sin detener la ejecución del programa.

Piensa en el uso de sondeo como una mejora de tu capacidad de observación mediante la adición de logs, métricas y tramos (spans) dinámicos a una aplicación en ejecución sin necesidad de cambiar el código, desplegarla o reiniciar un servicio. Puedes recopilar datos inmediatamente sin perturbar la experiencia del usuario ni requerir largos despliegues.

Como desarrollador, también puedes pensar en un sondeo como un "punto de interrupción sin ruptura". En la depuración tradicional, un punto de interrupción es un punto del programa en el que se detiene la ejecución, lo que permite al desarrollador inspeccionar el estado del programa en ese punto. Sin embargo, en el mundo real de los entornos de producción, no es práctico ni posible detener la ejecución del programa. Los sondeos llenan este vacío permitiendo inspeccionar el estado de las variables en entornos de producción de forma no intrusiva.

### Creación de un sondeo

Todos los tipos de sondeo requieren la misma configuración inicial:

1. Ve a la [página de Instrumentación dinámica][12].
1. Haz clic en **Create probe** (Crear sondeo) en la parte superior derecha, o haz clic en el menú de tres puntos de servicio y selecciona **Add a probe for this service** (Añadir un sondeo para este servicio).
1. Si no están rellenados previamente, elige servicio, tiempo de ejecución, entorno y versión.
1. En el código fuente, especifica dónde establecer el sondeo seleccionando una clase y un método o un archivo fuente y una línea. Si has optado por [la fase beta pública de autocompletar y buscar][17], autocompletar muestra sugerencias para seleccionar una clase o un método.

Consulta los tipos de sondeo individuales a continuación para conocer los pasos de creación específicos para cada tipo de sondeo.

También puedes crear un sondeo a partir de estos otros contextos:

Perfil
: en una gráfica de llamas del perfilador, puedes crear un sondeo para un método seleccionando **Instrument this frame with a probe** (Instrumentar este marco con un sondeo) en el menú contextual del marco.

Rastreo de errores
: en un stack trace, pasa el ratón sobre un marco de stack tecnológico y haz clic en **Instrument** (Instrumentar). Esto rellena previamente el formulario de creación del sondeo con el contexto Issue (Problema).


### Creación de sondeos de logs

Un *sondeo de log* emite un log cuando se ejecuta.

Para crear un sondeo de log:

1. Selecciona **Log** como tipo de sondeo.
1. Completa la [configuración genérica del sondeo](#creating-a-probe) (elige servicio, entorno, versión y localización del sondeo).
1. Define una plantilla de mensaje de log. Puedes utilizar el lenguaje de expresión de la Instrumentación dinámica para referenciar valores del contexto de ejecución.
1. Opcionalmente habilita la captura de datos adicionales del sondeo. (Fase beta)
1. Opcionalmente, define una condición utilizando el lenguaje de expresión de la instrumentación dinámica. El log se emite cuando la expresión se evalúa como verdadera.

Los sondeos de log están activados por defecto en todas las instancias de servicio que coincidan con la versión y entorno especificados. Su velocidad de ejecución está limitada a un máximo de 5000 veces por segundo en cada instancia de servicio.

Debes establecer una plantilla de mensaje de log en cada sondeo de log. La plantilla admite la inclusión de [expresiones][15] entre llaves. Por ejemplo: `User {user.id} purchased {count(products)} products`.

También puedes establecer una condición en un sondeo de log utilizando el [lenguaje de expresión][15]. La expresión debe ser booleana. El sondeo se ejecuta si la expresión es verdadera, y no captura ni emite ningún dato si la expresión es falsa.

{{< img src="dynamic_instrumentation/log_probe.png" alt="Creación de un sondeo de log de la instrumentación dinámica" >}}

**Fase beta**: si activas **Capture method parameters and local variables** (Capturar parámetros de método y variables locales) en el sondeo de log, todo el contexto de ejecución se añade el evento de log:
  - **Argumentos de método**, **variables locales** y **campos**, con los siguientes límites por defecto:
    - Sigue las referencias a tres niveles de detalle (configurables en la interfaz de usuario).
    - Los 100 primeros elementos dentro de colecciones.
    - Los primeros 255 caracteres para valores de cadena.
    - 20 campos dentro de los objetos. Los campos estáticos no se recopilan.
  - Llama a **stack trace**.
  - **Excepciones** capturadas y no capturadas.

Los sondeos con esta opción activada están limitados a un resultado por segundo.

<div class="alert alert-info"><p><strong>Advertencia: Los datos capturados pueden contener información confidencial, incluidos datos personales, contraseñas y secretos como las claves de AWS.</strong></p><p>Para garantizar que esta información se ha redactado correctamente:<ul>
<li>Datadog Dynamic Instrumentation emplea varias técnicas para redactar información confidencial. Para obtener más información sobre los mecanismos predeterminados o sobre cómo ampliarlos a fin de satisfacer tus necesidades, lee <a href="/dynamic_instrumentation/sensitive-data-scrubbing/">Limpieza de datos confidenciales</a>.</li>
<li>Desactiva la opción <strong>Capture method parameters and local variables</strong> (Capturar parámetros de métodos y variables locales) y selecciona de manera explícita las variables que quieres incluir en la plantilla de mensajes de log. Esto asegura que los sondeos de log solo contengan datos relacionados con las variables que identifiques de manera específica, lo que reduce el riesgo de filtraciones involuntarias de datos confidenciales. </li>
<li>Si eres el administrador de tu cuenta de Datadog y quieres evitar que otros usuarios puedan usar la opción <strong>Capture method parameters and local variables</strong> (Capturar parámetros de métodos y variables locales), puedes revocar el permiso de variables de captura de Dynamic Instrumentation (<code>debugger_capture_variables</code>). </li></ul></p><p>Como alternativa, si necesitas registrar estos datos pero quieres mitigar el riesgo asociado a que se puedan acceder en el producto de Datadog, puedes limitar qué usuarios de tu organización pueden ver los datos capturados al configurar una <a href="/logs/guide/logs-rbac/?tab=ui#restrict-access-to-logs">consulta de restricción</a> en <code>source:dd_debugger</code>.</p></div>

### Creación de sondeos de métrica

Un *sondeo de métrica* emite una métrica cuando se ejecuta.

Para crear un sondeo de métrica:

1. Selecciona **Metric** (Métrica) como tipo de sondeo.
1. Completa la [configuración genérica del sondeo](#creating-a-probe) (elige servicio, entorno, versión y localización del sondeo).
1. Especifica un nombre para la métrica, que llevará el prefijo `dynamic.instrumentation.metric.probe.`.
1. Selecciona un tipo de métrica (recuento, gauge, o histograma).
1. Elige el valor de métrica utilizando el [Lenguaje de expresión de la instrumentación dinámica][15]. Puedes utilizar cualquier valor numérico que desees del contexto de ejecución, como un parámetro de método, una variable local, un campo de clase o una expresión que produzca un valor numérico. Para las métricas de recuento esto es opcional, y si lo omites, cada invocación incrementa el recuento en uno.

{{< img src="dynamic_instrumentation/metric_probe.png" alt="Creación de un sondeo de métrica de instrumentación dinámica" >}}

Los sondeos se activan automáticamente en todas las instancias de servicio que coincidan con la versión y el entorno configurados. Los sondeos de métrica no están limitados por la velocidad y se ejecutan cada vez que se invoca el método o la línea.

Los sondeos de métrica de instrumentación dinámica admiten los siguientes tipos de métrica:

- **Count**: recuento de cuántas veces se ejecuta un determinado método o línea. Puede combinarse con [expresiones de métrica][15] para utilizar el valor de una variable para incrementar el recuento.
- **Gauge**: genera un gauge basado en el último valor de una variable. Esta métrica requiere una [expresión de métrica][15].
- **Histograma**: genera una distribución estadística de una variable. Esta métrica requiere una [expresión de métrica][15].

### Creación de sondeos de tramo

Un *tramo (span) de sondeo* emite un tramo cuando se ejecuta un método.

Para crear un sondeo de tramo:

1. Selecciona **Span** (Tramo) como tipo de sondeo.
1. Completa la [configuración genérica del sondeo](#creating-a-probe) (elige servicio, entorno, versión y localización del sondeo).

{{< img src="dynamic_instrumentation/span_probe.png" alt="Creación del sondeo de tramo de la instrumentación dinámica" >}}

Puedes utilizar un *sondeo de tramo* como alternativa a [crear nuevos tramos con instrumentación personalizada][13]. Si el método lanza una excepción, los detalles de la excepción se asocian a la nueva etiqueta `error` del tramo.

### Creación de sondeos de etiqueta del tramo

Un sondeo de *etiqueta de tramo* añade un valor de etiqueta a un tramo existente. Puedes añadir una etiqueta al tramo _activo_ o al tramo de _entrada de servicio_ tramo.
Ten en cuenta que los tramos internos no se indexan por defecto y, por tanto, es posible que no se puedan buscar en APM.

Para crear un sondeo de etiqueta de tramo:

1. Selecciona **Span Tag** (Etiqueta de tramo) como tipo de sondeo.
1. Completa la [configuración genérica del sondeo](#creating-a-probe) (elige servicio, entorno, versión y localización del sondeo).
1. Especifica un nombre para la etiqueta.
1. Especifica el valor de etiqueta utilizando el [Lenguaje de expresión de la instrumentación dinámica][15].
1. Opcionalmente, define una condición utilizando el lenguaje de expresión de la instrumentación dinámica. La etiqueta sólo se añadirá cuando la expresión se evalúe como verdadera.
1. Opcionalmente, añade etiquetas adicionales, cada una con su propio nombre, expresión y condición opcional.


{{< img src="dynamic_instrumentation/span_tag_probe.png" alt="Creación de un sondeo de etiqueta de tramo de la instrumentación dinámica" >}}

Puedes utilizar un *sondeo de etiqueta de tramo* como alternativa a [utilizar la instrumentación personalizada para añadir etiquetas en el código][14].


## Leer más

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