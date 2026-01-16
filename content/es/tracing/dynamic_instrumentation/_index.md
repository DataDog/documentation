---
aliases:
- /es/dynamic_instrumentation/how-it-works/
- /es/dynamic_instrumentation/
further_reading:
- link: /dynamic_instrumentation/expression-language/
  tag: Documentación
  text: Más información sobre el lenguaje de expresión de Dynamic Instrumentation
- link: dynamic_instrumentation/sensitive-data-scrubbing/
  tag: Documentación
  text: Eliminación de información confidencial de los datos de Dynamic Instrumentation
- link: /tracing/trace_collection/dd_libraries
  tag: Documentación
  text: Más información sobre cómo instrumentar tu aplicación
- link: /getting_started/tagging/unified_service_tagging/
  tag: Documentación
  text: Etiquetado de servicios unificado
- link: /tracing/software_catalog/
  tag: Documentación
  text: Descubrir y catalogar los servicios que informan a Datadog
- link: /metrics
  tag: Documentación
  text: Más información sobre métricas
- link: https://www.datadoghq.com/blog/dynamic-instrumentation-application-logging/
  tag: Blog
  text: Utilizar Datadog Dynamic Instrumentation para añadir logs de aplicación sin
    volver a desplegarlos
is_beta: false
private: false
title: Instrumentación dinámica
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
 Dynamic Instrumentation no es compatible con el <a href="/getting_started/site">sitioDatadog </a> seleccionado ({{< region-param key="dd_site_name" >}}), ya que requiere que <a href="/agent/remote_config/">la configuración remota</a> esté activada.
</div>
{{% /site-region %}}

## Resumen

Dynamic Instrumentation le permite añadir instrumentación en sus sistemas de producción en ejecución sin necesidad de reiniciar y en cualquier ubicación del código de su aplicación, incluyendo librerías de terceros. Puede añadir o modificar telemetría para logs, métricas, spans, y el etiquetado correspondiente, desde la interfaz de usuario de Datadog. Dynamic Instrumentation tiene una baja sobrecarga y no tiene efectos secundarios en su sistema.

Si estás interesado en probar las últimas mejoras de la experiencia de usuario para Dynamic Instrumentation, considera la posibilidad de participar en la [Vista previa de autocompletar y búsqueda][17].

## Introducción

### Requisitos previos

Dynamic Instrumentation requiere lo siguiente:

- [Datadog Agent][1] 7.49.0 o superior esté instalado junto a su servicio.
- [Configuración remota][2] esté habilitada en ese Agent.
- Para aplicaciones Java, la librería de seguimiento [`dd-trace (traza)-java`][3] 1.34.0 o superior.
- Para aplicaciones Python, la librería de seguimiento [`dd-trace (traza)-py`][4] 2.2.0 o superior.
- Para aplicaciones .NET, biblioteca de seguimiento [`dd-trace (traza)-dotnet`][5] 2.54.0 o superior.
- (Vista previa limitada) Para aplicaciones Node.js, biblioteca de seguimiento [`dd-trace (traza)-js`][18] 5.39.0 o superior.
- (Vista previa limitada) Para aplicaciones Ruby, biblioteca de seguimiento [`dd-trace (traza)-rb`][19] 2.9.0 o superior.
- (Vista previa limitada) Para aplicaciones PHP, biblioteca de seguimiento [`dd-trace (traza)-php`][20] 1.5.0 o superior.
- Las etiquetas [Unified Service Tagging][6] `service`, `env`, y `version` se aplican a su implementación.
- Recomendado, [autocompletar y buscar (en Vista previa)][17] está activado.
- Recomendado, [source (fuente) Integración de código][7] está configurado para su servicio.
- Se requiere el permiso **Dynamic Instrumentation Read Configuration** (`debugger_read`) para acceder a la página Dynamic Instrumentation. Page ( página)
- El permiso **Dynamic Instrumentation Escribir Configuración** (`debugger_write`) es necesario para crear o modificar instrumentaciones.
- El permiso **Dynamic Instrumentation Capturar Variables** (`debugger_capture_variables`) es necesario para utilizar la opción **Capturar parámetros de métodos y variables locales**.

 Para más información sobre roles y sobre cómo asignar roles a los usuarios, consulta [Control de acceso basado en roles][8].

### Crear un índice logs

Dynamic Instrumentation crea " logs dinámicos" que se envían a Datadog y aparecen junto a los de su aplicación habitual logs.

Si utiliza [Filtros de exclusión][9], asegúrese de que Dynamic Instrumentation log s no se filtren:

1. Cree un índice logs y [configúrelo][10] con la retención deseada con **sin muestreo**.
2. 2. Configure el filtro para que coincida con la etiqueta `source (fuente):dd_debugger`. Todos los Dynamic Instrumentation log s tienen esta source (fuente).
3. Asegúrese de que el nuevo índice tiene prioridad sobre cualquier otro con filtros que coincidan con esa etiqueta, porque la primera coincidencia gana.

### Habilitar Dynamic Instrumentation

Para habilitar Dynamic Instrumentation en un servicio, vaya a [in-app setup Page ( página)][16].

Para obtener instrucciones más detalladas, seleccione su tiempo de ejecución a continuación:

{{< partial name="dynamic_instrumentation/dynamic-instrumentation-languages.html" >}}


### Limitaciones

- Dynamic Instrumentation aún no es compatible con Azure App Services o entornos sin servidor.
- La compatibilidad total solo está disponible para aplicaciones creadas con Python, Java y .NET.
- Existen vistas previas limitadas para aplicaciones creadas con Node.js, Ruby y PHP.
- La librería de seguimiento de Java no es compatible con las coroutines de Kotlin.

## Explorar Dynamic Instrumentation

Dynamic Instrumentation puede ayudarte a entender lo que tu aplicación está haciendo en tiempo de ejecución. Al añadir una sonda Dynamic Instrumentation estás exportando datos adicionales de tu aplicación, sin necesidad de cambiar el código o volver a desplegarlo.

### Uso de sondas

Una sonda te permite recoger datos de puntos específicos de tu código sin detener la ejecución del programa.

Piense en el uso de sondas como una mejora de su capacidad de observación mediante la adición de logs dinámicas, métricas y periodos a una aplicación en ejecución sin necesidad de cambiar el código, desplegarlo o reiniciar un servicio. Puede recopilar datos inmediatamente sin perturbar la experiencia del usuario ni requerir despliegues prolongados.

Como desarrollador, también puede pensar en una sonda como un "punto de interrupción sin ruptura". En la depuración tradicional, un punto de interrupción es un punto del programa en el que se detiene la ejecución, lo que permite al desarrollador inspeccionar el estado del programa en ese punto. Sin embargo, en entornos de producción reales, no es práctico ni posible detener la ejecución del programa. Las sondas llenan este vacío permitiendo inspeccionar el estado de las variables en entornos de producción de forma no intrusiva.

### Creación de una sonda

Todos los tipos de sonda requieren la misma configuración inicial:

1. Vaya a [Dynamic Instrumentation Page ( página) ][12].
1. Haga clic en **Crear sonda** en la parte superior derecha, o haga clic en el menú de tres puntos en un servicio y seleccione **Añadir una sonda para este servicio**.
1. Si no están rellenados previamente, elija el servicio, el tiempo de ejecución, el entorno y la versión.
1. En el código source (fuente), especifique dónde establecer la sonda seleccionando una clase y un método o un archivo y una línea de source (fuente). Si has optado por [autocompletar y buscar Vista previa][17], autocompletar muestra sugerencias para seleccionar una clase o un método.

Consulte los tipos de sonda individuales a continuación para ver los pasos de creación específicos para cada tipo de sonda.

También puede crear una sonda desde estos otros contextos:

Perfiles
: En un gráfico de llama del perfilador, puede crear una sonda para un método seleccionando **Instrumentar este marco con una sonda** en el menú contextual del marco.

Error Tracking
: En una pila trace (traza), sitúe el ratón sobre un marco de pila y haga clic en **Instrumentar**. Esto rellena previamente el formulario de creación de sonda con el contexto de la Emisión.


### Creación de sondas log

Una * sondalog * emite un log cuando se ejecuta.

Para crear una sonda log:

1. Selecciona **log** como tipo de sonda.
1. Complete la [configuración genérica de la sonda](#creating-a-probe) (elija el servicio, el entorno, la versión y la ubicación de la sonda).
1. Define una plantilla de mensaje log. Puede utilizar el lenguaje de expresión Dynamic Instrumentation para referenciar valores del contexto de ejecución.
1. (En Preview) Opcionalmente habilita la captura de datos extra de la sonda.
1. Opcionalmente, define una condición utilizando el lenguaje de expresión Dynamic Instrumentation. El mensaje log se emite cuando la expresión se evalúa como verdadera.

log Las sondas se activan por defecto en todas las instancias de servicio que coincidan con el entorno y la versión especificados. Su velocidad de ejecución está limitada a un máximo de 5000 veces por segundo, en cada instancia de su servicio.

Debe establecer una plantilla de mensaje log en cada sonda log. La plantilla admite la inclusión de [expresiones][15] entre llaves. Por ejemplo: `User {user.id} purchased {count(products)} products`.

También puede establecer una condición en una sonda log utilizando el [lenguaje de expresiones][15]. La expresión debe evaluarse como booleana. La sonda se ejecuta si la expresión es verdadera, y no captura ni emite ningún dato si la expresión es falsa.

{{< img src="dynamic_instrumentation/log_probe.png" alt="Creating a Dynamic Instrumentation log probe" >}}

(En vista previa) Si activa **Capturar parámetros de método y variables locales** en la sonda log, todo el contexto de ejecución se añade al evento log:
  - **argumentos de método**, **variables locales** y **campos**, con los siguientes límites predeterminados:
    - Seguir referencias a tres niveles de profundidad (configurable en la UI).
    - Los 100 primeros elementos dentro de colecciones.
    - Los primeros 255 caracteres para valores de cadena.
    - 20 campos dentro de objetos. Los campos estáticos no se recogen.
  - Llamada a **pila trace (traza)**.
  - **excepciones capturadas y no capturadas**.

Las sondas con esta opción activada están limitadas a un acierto por segundo.

<div class="alert alert-info"><p><strong>Advertencia: Los datos capturados pueden contener información sensible, incluyendo datos personales, contraseñas y secretos como claves AWS.</strong></p><p>Para garantizar que esta información se redacta correctamente:<ul>
<li>Datadog Dynamic Instrumentation emplea varias técnicas para redactar la información sensible. Para obtener más información sobre los mecanismos predeterminados o sobre cómo ampliarlos para satisfacer sus necesidades, lea <a href="/dynamic_instrumentation/sensitive-data-scrubbing/">Depuración de datos confidenciales</a>.</li>
<li>Desactive la opción <strong>Capturar parámetros de método y variables locales</strong> y seleccione explícitamente las variables que desea incluir en la plantilla de mensaje log. Hacer esto garantiza que las sondas de log contengan sólo datos relacionados con las variables que identifiques específicamente, reduciendo así el riesgo de fugas involuntarias de datos sensibles. </li>
<li>Si eres el administrador de tu cuenta Datadog y quieres evitar que otros usuarios puedan utilizar la opción <strong>Capturar parámetros de método y variables locales</strong>, puedes revocarles el permiso Dynamic Instrumentation Capturar variables<code>(debugger_capture_variables</code>). </li></ul></p><p>Alternativamente, si necesita log estos datos pero desea mitigar el riesgo asociado a que sean accesibles en el producto Datadog, puede limitar qué usuarios de su organización pueden ver los datos capturados configurando una <a href="/logs/guide/logs-rbac/?tab=ui#restrict-access-to-logs">consulta de Restricción</a> en <code>source (fuente):dd_debugger</code>.</p></div>

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
[18]: https://github.com/DataDog/dd-trace-js
[19]: https://github.com/DataDog/dd-trace-rb
[20]: https://github.com/DataDog/dd-trace-php
