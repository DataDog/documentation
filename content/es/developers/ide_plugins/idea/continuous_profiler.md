---
further_reading:
- link: /getting_started/profiler/
  tag: Documentación
  text: Empezando con Continuous Profiler.
- link: /integrations/guide/source-code-integration/
  tag: Documentación
  text: Más información sobre la integración del código fuente.
title: Continuous Profiler
type: documentación
---

## Información general
El **Continuous Profiler** destaca el consumo de recursos (como CPU, asignación de memoria y excepciones lanzadas) utilizando datos de perfiles recopilados de servicios desplegados. Esta información ayuda a los desarrolladores a eliminar cuellos de botella y escribir código más eficiente.

## Pestaña del Profiler

La pestaña Continuous Profiler muestra información de perfiles del servicio en un entorno seleccionado, agregada en un periodo de tiempo específico. Las vistas disponibles son:
- [Lista principal](#top-list): muestra una lista de los métodos que consumen más recursos para la medida de perfil actual.
- [Gráfico de llamas](#flame-graph): un gráfico de llamas que representa stack traces en los perfiles.

Puedes especificar los siguientes parámetros para los datos de perfiles:
- El tipo de perfil que se mostrará
- El entorno en el que se ejecuta el servicio 
- El plazo para agregar las muestras de perfiles

Los tipos de perfiles disponibles suelen incluir opciones como **CPU Time** (Tiempo de CPU) y **Allocated Memory** (Memoria asignada), pero vienen determinados por la plataforma y varían según el idioma.

## Lista principal

La subpestaña **Top List** (Lista principal) muestra los métodos que consumen más recursos según los datos de perfil agregados cargados desde los servidores de Datadog. Estos son los métodos que son candidatos más probables para la optimización.

{{< img src="/developers/ide_plugins/idea/continuous_profiler/top-list.png" alt="Vista de los principales" style="width:100%;" >}}

- Haz doble clic en un elemento de la lista (o selecciona **Jump to Source** (Saltar a la fuente) en el menú contextual) para abrir un editor de código fuente que muestra dónde está definido el método.
- Para visualizar un gráfico de llama de un método, selecciona **Search in Flame Graph** (Buscar en gráfico de llama) en el menú contextual.

### Árbol de llamadas

El árbol de llamadas situado a la derecha de **Top List** (Lista principal) muestra las rutas que conducen a (y desde) el método seleccionado.

La vista por defecto **Caller Hierarchy** (Jerarquía de llamadas) muestra quién hizo la llamada (o predecesores) del método de destino y la frecuencia con la que aparecen en la pila de llamadas. Para ver los invocadores (o sucesores), haz clic en el botón **Callee Hierarchy** (Jerarquía de invocadores) en la barra de herramientas.

Haz clic con el botón derecho en un método del árbol de llamadas para ver las opciones de navegación al editor de fuentes o al gráfico de llamas.

## Gráfico de llama

Un gráfico de llama es una visualización de muestras de perfiles que muestra trazas de stack tecnológico y su frecuencia relativa durante el periodo de muestreo. El complemento Datadog recopila varios perfiles individuales del intervalo de tiempo solicitado y los agrega. Cada perfil individual cubre un intervalo de 60 segundos dentro del marco de tiempo solicitado.

{{< img src="/developers/ide_plugins/idea/continuous_profiler/flamegraph.png" alt="Gráfico de llama que muestra tiempo de CPU durante la última hora" style="width:100%;" >}}

Cada vez que cambies el tipo de perfil, el marco temporal o el entorno, el plugin de Datadog genera un nuevo gráfico de llama.

Puedes navegar por el gráfico de llamas de varias maneras:
- Haz doble clic en cualquier marco para centrarte en ese método y en todos los métodos llamados durante el periodo de muestreo.
- Utiliza el minimapa para desplazarte por el gráfico.
- Haz clic con el botón derecho en un método y selecciona **Jump to Source** (Saltar a la fuente) para ir al punto correspondiente del código fuente.

Al pasar el ratón por encima de un método, aparece un cuadro de herramienta con la siguiente información:
- El nombre de la clase y la firma del método
- El nombre del paquete
- El valor de la métrica de perfil y el desglose del porcentaje.

Las muestras de perfiles incluyen información sobre stack trace y el número de línea. Utiliza el botón **Separate Flame Graph by** (Separar gráfico de llamas por) para cambiar entre separar los marcos por método o por número de línea.

{{< img src="/developers/ide_plugins/idea/separate-flamegraph-by.png" alt="Usa el botón del cuadro de herramientas para separar marcos por método o número de línea" style="width:40%;" >}}

## Destacar fuente

Cuando la pestaña Continuous Profiler está activa, el plugin resalta el código en el margen del editor de código fuente. En el caso de los métodos principales, aparece un icono en el margen del editor y se resalta en la línea del código en función de los datos de perfil activos.
- Pasa el ratón sobre el icono para ver más información.
- Haz clic en el icono para abrir la pestaña Perfiles principales o abre Perfiles en Datadog.
  {{< img src="/developers/ide_plugins/idea/interest-options.png" alt="Haz clic en el ícono de Datadog para abrir los datos de Perfiles en una pestaña o en Datadog" style="width:100%;" >}}

La pestaña de Perfiles activa también afecta a la vista en árbol del proyecto, que se anota con las métricas del perfil seleccionado:
{{< img src="/developers/ide_plugins/idea/project-tree-view.png" alt="El árbol de proyecto anotado con métricas de perfil de una pestaña de perfil" style="width:60%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}