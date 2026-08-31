---
further_reading:
- link: https://www.datadoghq.com/blog/data-pipeline-monitoring/
  tag: Blog
  text: 'Seguimiento de canalización de datos 101: seguimiento del estado y el rendimiento
    en toda la pila de datos'
title: Colas de mensajes fallidos (Dead Letter Queues)
---
Data Streams Monitoring (DSM) proporciona visibilidad de sus colas de mensajes fallidos (DLQs), lo que le permite hacer un seguimiento e inspeccionar los errores de procesamiento de mensajes. DSM también le permite solucionar estos errores de procesamiento de mensajes directamente dentro de Datadog.

<div class="alert alert-info">El seguimiento de colas de mensajes fallidos está disponible para las colas de Amazon SQS.</div>

## Hacer un seguimiento de las DLQs {#monitor-dlqs}

### Configuración {#setup}
* Habilite [Data Streams Monitoring][1] para sus servicios de mensajería.
* Instale la [Datadog-AWS integration][2]. Utilice esta integración para administrar los permisos.
* Para solucionar los errores de procesamiento de mensajes dentro de Datadog, se requiere una configuración adicional. Consulte la sección [Remediar problemas de DLQ](#remediate-dlq-issues).

### Uso {#usage}

#### Crear un seguimiento para una cola de mensajes fallidos {#create-a-monitor-for-a-dead-letter-queue}

Para realizar un seguimiento de si su cola está redirigiendo mensajes a su DLQ, puede crear un [metric monitors][8] que envíe alertas sobre la métrica [`data_streams.sqs.dead_letter_queue.messages`][8].

Para crear un seguimiento para la DLQ de una cola:

1. En Datadog, navegue a [Data Streams Monitoring][4].
2. Seleccione la pestaña {{< ui >}}Explore{{< /ui >}} (predeterminada).
3. Haga clic en una cola compatible para abrir su panel lateral.
4. Seleccione la pestaña {{< ui >}}Dead Letter Queue{{< /ui >}}.
5. Haga clic en {{< ui >}}Create Monitor{{< /ui >}} para abrir una página de configuración de monitor. Las entradas predeterminadas son suficientes para crear un seguimiento que alerte cuando su DLQ no esté vacía, pero también puede realizar configuraciones adicionales en esta página si lo desea.
6. Haga clic en {{< ui >}}Create{{< /ui >}} en la parte inferior de la página.

#### Detectar problemas de procesamiento de mensajes {#detect-message-processing-issues}

Data Streams Monitoring le ayuda a detectar dónde no se pudieron procesar los mensajes y qué servicios descendentes podrían verse afectados:

* El DSM [{{< ui >}}Service Map{{< /ui >}}][6] resalta las colas con mensajes en sus DLQs, lo que le ayuda a identificar visualmente dónde ocurren las fallas

* La página DSM [{{< ui >}}Issues{{< /ui >}}][7] enumera todas las colas que están experimentando problemas de procesamiento de mensajes

## Remediar problemas de DLQ {#remediate-dlq-issues}
Puede inspeccionar y resolver las DLQs que no estén vacías directamente en Datadog mediante [Datadog Actions][5].

### Configuración {#setup-1}
En Datadog, cree una [Conexión][9]. Necesita una entidad IAM para realizar las acciones. Esta entidad IAM puede ser un usuario IAM (con una clave de acceso secreta) o un Rol IAM (asumido mediante `sts:AssumeRole`) y debe tener los siguientes permisos:
  * `sqs:ReceiveMessage` (para _peek_)
  * `sqs:StartMessageMoveTask` (para _redrive_)
  * `sqs:PurgeQueue` (para _purge_)

Estos permisos se pueden aplicar globalmente a todas las colas SQS o restringirse a colas específicas.

### Uso {#usage-1}

Después de configurar la conexión, puede hacer clic en una cola compatible para abrir su panel lateral, donde puede utilizar las siguientes acciones:

* {{< ui >}}Peek{{< /ui >}} para inspeccionar el contenido de los mensajes fallidos e identificar la causa raíz
* {{< ui >}}Redrive{{< /ui >}} para volver a poner en cola los mensajes para otro intento de procesamiento
* {{< ui >}}Purge{{< /ui >}} para purge los mensajes que ya no necesitan procesamiento

## Solución de problemas {#troubleshooting}
Si no puede ver la información de la cola de mensajes fallidos:
* Confirme que ha instalado la [Datadog-AWS integration][2]
* Confirme que su rol de AWS utiliza la `AmazonSQSReadOnlyAccess` política administrada por AWS
* Confirme que su rol tiene los permisos `sqs:ListQueues` y `sqs:GetQueueAttributes`

[1]: /es/data_streams/setup
[2]: /es/integrations/amazon-web-services/
[3]: /es/data_streams/metrics_and_tags/#data_streamssqsdead_letter_queuemessages
[4]: https://app.datadoghq.com/data-streams/
[5]: https://app.datadoghq.com/actions
[6]: https://app.datadoghq.com/data-streams/map
[7]: https://app.datadoghq.com/data-streams/issues
[8]: /es/monitors/types/metric/
[9]: https://app.datadoghq.com/actions/connections

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}