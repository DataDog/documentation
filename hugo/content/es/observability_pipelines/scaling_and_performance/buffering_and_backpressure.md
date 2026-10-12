---
aliases:
- /es/observability_pipelines/performance/
- /es/observability_pipelines/scaling_and_performance/handling_load_and_backpressure/
description: Aprenda cómo Observability Pipelines utiliza el almacenamiento en búfer
  y la contrapresión para manejar las interrupciones de los destinos, y cómo configurar
  los ajustes del búfer de destino.
disable_toc: false
further_reading:
- link: observability_pipelines/set_up_pipelines#set-up-a-pipeline
  tag: Documentación
  text: Configure un pipeline
- link: observability_pipelines/sources
  tag: Documentación
  text: Fuentes
- link: observability_pipelines/processors
  tag: Documentación
  text: Procesadores
- link: observability_pipelines/destinations
  tag: Documentación
  text: Destinos
- link: https://www.datadoghq.com/architecture/observability-pipelines-a-guide-to-sizing-scaling-and-performance/
  tag: Centro de arquitectura
  text: 'Observability Pipelines: Una guía para el dimensionamiento, escalado y rendimiento'
title: Almacenamiento en búfer y contrapresión
---
## Descripción general {#overview}

Observability Pipelines está diseñado para la durabilidad y para mitigar el impacto cuando los destinos no están disponibles. Si un destino no está disponible (por ejemplo, debido a problemas de conexión), el Observability Pipelines Worker reintenta su conexión al destino hasta que la conexión se restablezca o el destino agote el tiempo de espera. Durante este tiempo, los eventos se acumulan en los búferes internos de los componentes de la canalización, eventualmente bloqueando a la fuente para que no recopile nuevos eventos. Este comportamiento se denomina **contrapresión**.

Es importante considerar cómo se propaga la contrapresión a través de su arquitectura en caso de una interrupción del destino. Por ejemplo, la contrapresión puede bloquear a su aplicación para que no envíe registros a Observability Pipelines y esos registros pueden competir por recursos de memoria o disco necesarios para su servicio. Para evitar que la contrapresión llegue a su aplicación, [configure un búfer de destino](#choosing-buffer-types) y ajústelo según el rendimiento de su canalización, lo cual ayuda al Worker a absorber la contrapresión cuando el destino no está disponible. También puede configurar el [comportamiento del búfer lleno](#choosing-buffer-on-full-behavior) a `drop newest`, lo cual evita la contrapresión descartando los eventos entrantes cuando el búfer está lleno. Consulte la [sección de búferes de destino](#destination-buffers) para obtener más información sobre los búferes de destino configurables.

Todos los componentes en el Observability Pipelines Worker tienen un búfer en memoria para ayudar a suavizar la transferencia de eventos entre componentes. Todas las fuentes tienen un búfer con una capacidad de 1,000 eventos por hilo de trabajador. Las fuentes escriben eventos en su respectivo búfer descendente al recopilar. Todos los procesadores tienen un búfer en memoria con una capacidad de 100 eventos, que los procesadores consumen aguas arriba. Los búferes de fuente y procesador no son configurables.

## Búferes de destino {#destination-buffers}

De forma predeterminada, los destinos tienen un búfer en memoria con una capacidad de 500 eventos. Este búfer es configurable, lo que le permite controlar estos parámetros:

- **Tipo de búfer**: Ya sea un búfer en memoria o un búfer en disco
- **Tamaño del búfer**: La capacidad máxima en bytes del búfer
- **Comportamiento del búfer cuando está lleno**: Determina el comportamiento de desbordamiento del búfer, ya sea bloquear eventos y propagar la contrapresión o descartar eventos entrantes para evitar la propagación de la contrapresión.

Para cada una de esas configuraciones, elija la opción que mejor se alinee con su estrategia de registro.

### Elección de tipos de búfer {#choosing-buffer-types}

**Los búferes en memoria** priorizan el rendimiento sobre la durabilidad. Pueden manejar un ancho de banda significativo, pero los búferes de memoria no persisten entre reinicios del Worker.

Utilice un búfer en memoria si desea evitar que la contrapresión se propague y es aceptable perder todos los registros en el búfer al reiniciar.

**Los búferes en disco** priorizan la durabilidad sobre el rendimiento. Los búferes en disco escriben primero en la caché de página y luego vacían los datos al disco si el destino no los envía inmediatamente. Los búferes en disco esperan como máximo 500 ms antes de llamar a fsync y vaciar un archivo de datos al disco. Un búfer en disco se vacía con mayor frecuencia si un archivo de datos se llena hasta su tamaño máximo de 128 MB antes de que hayan transcurrido los 500 ms desde el último vaciado. Los búferes en disco están ordenados, lo que significa que los eventos se envían hacia abajo en el orden en que fueron escritos en el búfer (primero en entrar, primero en salir).

Utilice un búfer en disco si necesita mitigar la pérdida de datos y es poco probable que el rendimiento de su canalización se vea limitado por la E/S al vaciar al disco.

### Elección del comportamiento del búfer cuando está lleno {#choosing-buffer-on-full-behavior}

**Bloquear** (predeterminado): Si el búfer está lleno, se bloquea la escritura de los eventos entrantes en el búfer. Utilice esta opción si desea ayudar a garantizar que no se pierda ningún evento.

**Descartar el más reciente**: Si el búfer está lleno, los eventos entrantes se descartan. Esto permite que la fuente continúe ingiriendo eventos y evita que la contrapresión se propague de vuelta a su aplicación. Consulte [Uso de búferes con múltiples destinos](#using-buffers-with-multiple-destinations) para obtener detalles sobre cómo funciona esto cuando tiene múltiples destinos.

Esta tabla compara las diferencias entre el búfer de memoria y el de disco.

| Propiedad                                                 | Búfer de memoria             | Búfer de disco                          |
| -------------------------------------------------------- | ------------------------- | ------------------------------------ |
| Tamaño predeterminado                                             | Configurable<br>Tamaño mínimo del búfer: 1 MB<br>Tamaño máximo del búfer: 128 GB | Configurable<br>Tamaño mínimo del búfer: 256 MB<br> Tamaño máximo del búfer: 5 TB<br>**Nota**: Para versiones de Worker anteriores a la 2.20.x, el tamaño máximo del búfer es de 500 GB.       |
| Rendimiento                                              | Más alto                    | Más bajo                                |
| Durabilidad ante un reinicio o bloqueo inesperado del Worker | Ninguna                      | Eventos volcados a disco como máximo cada 500 ms        |
| Pérdida de datos debido a un reinicio o bloqueo inesperado          | Se pierden todos los datos en búfer | Se conservan todos los datos en búfer        |
| Pérdida de datos en un apagado ordenado | Se pierden todos los datos en búfer | Ninguna, todos los datos de la canalización se vuelcan a disco antes de salir |

### Uso de búferes con múltiples destinos {#using-buffers-with-multiple-destinations}

Después de que sus eventos se envían a través de sus procesadores, los eventos pasan por una distribución (fanout) a todos los destinos de su canalización. Si la contrapresión se propaga al fanout desde cualquier destino, **todos** los destinos se bloquean. No se envían eventos adicionales a ningún destino hasta que el destino bloqueado reanude el envío de eventos correctamente.

El comportamiento `drop_newest` on-full descarta los eventos entrantes cuando el búfer de un destino está lleno. Esto evita que la contrapresión se propague al fanout desde ese destino, lo que permite que sus otros destinos continúen ingiriendo eventos desde el fanout. Esto puede ser útil si desea ayudar a garantizar que los eventos se entreguen de manera confiable a un destino, pero no le importa que otro destino descarte eventos si no está disponible para evitar la propagación de la contrapresión.

### Volúmenes persistentes de Kubernetes {#kubernetes-persistent-volumes}

Si habilita el almacenamiento en búfer en disco para los destinos, debe habilitar los [volúmenes persistentes][1] de Kubernetes en el gráfico de Helm de Observability Pipelines. Con el almacenamiento en búfer en disco habilitado, los eventos se envían primero al búfer y se escriben en los volúmenes persistentes, y luego se envían a los destinos posteriores.

## Métricas de búfer {#buffer-metrics}

Utilice estas métricas para analizar el rendimiento del búfer. Todas las métricas se emiten en un intervalo de un segundo, a menos que se indique lo contrario.

{{< tabs >}}
{{% tab "Fuentes" %}}

{{% observability_pipelines/metrics/buffer/sources %}}

{{% /tab %}}
{{% tab "Procesadores" %}}

{{% observability_pipelines/metrics/buffer/processors %}}

{{% /tab %}}
{{% tab "Destinos" %}}

{{% observability_pipelines/metrics/buffer/destinations %}}

{{% /tab %}}
{{< /tabs >}}

### Métricas de búfer obsoletas {#deprecated-buffer-metrics}

{{% observability_pipelines/metrics/buffer/deprecated_destination_metrics %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/concepts/storage/persistent-volumes/