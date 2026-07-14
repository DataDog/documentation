---
title: Colas de mensajes fallidos
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Data Streams Monitoring no está disponible para el sitio {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

Data Streams Monitoring (DSM) proporciona visibilidad de tus colas de mensajes faliidos (DLQ) no vacías, lo que te permite monitorizar e inspeccionar los fallos en el procesamiento de mensajes. DSM también te permite corregir estos fallos de procesamiento de mensajes directamente en Datadog.

<div class="alert alert-info">La monitorización de las colas de mensajes fallidos está disponible para las colas de Amazon SQS.</div>

## Monitorizar DLQ

### Configuración
* Active [Data Streams Monitoring][1] para tus servicios de mensajería.
* Instala la [integración de Datadog-AWS ][2]. Utiliza esta integración para gestionar los permisos.
* Para remediar fallos de procesamiento de mensajes en Datadog, se requiere una configuración adicional. Consulta la sección [Solucionar problemas de DLQ](#remediate-dlq-issues).

### Utilización

#### Crear un monitor (noun) para una cola de mensajes fallidos

Para saber si tu cola está redirigiendo mensajes a su DLQ, puedes crear un [monitor (noun) de métricas][8] que alerte sobre la métrica [`data_streams.sqs.dead_letter_queue.messages`][8].

Para crear un monitor (noun) para la DLQ de una cola:

1. En Datadog, ve a [Data Streams Monitoring][4].
2. Selecciona la pestaña **Explore** (Explorar) (predeterminada).
3. Haz clic en una cola admitida para abrir su panel lateral.
4. Selecciona la pestaña **Dead Letter Queue** (Cola de mensajes fallidos).
5. Haz clic en **Create Monitor** (Crear monitor (noun)) para abrir una page (página) de configuración de monitor (noun). Las entradas predeterminadas son suficientes para crear un monitor (noun) que alerte cuando tu DLQ no esté vacío, pero también puedes realizar configuraciones adicionales en esta page (página) si lo deseas.
6. Haz clic en **Create** (Crear) en la parte inferior de la page (página).

#### Detectar problemas de procesamiento de mensajes

Data Streams Monitoring te ayuda a detectar dónde no se han podido procesar los mensajes y qué servicios posteriores podrían verse afectados:

* El DSM [**Service Map (mapa de servicios)**][6] resalta las colas con mensajes en sus DLQ, lo que te ayuda a identificar visualmente dónde se producen los fallos.

* En la page (página) de DSM [**Issues**][7] (problemas) se enumeran todas las colas que están experimentando problemas de procesamiento de mensajes

## Solucionar los problemas de DLQ
Puedes inspeccionar y resolver DLQ no vacíos directamente en Datadog con [Datadog Actions][5].

### Configuración
En Datadog, crea una [connection (conexión)][9]. Necesitas una entidad IAM para realizar las acciones. Esta entidad IAM puede ser un Usuario IAM (con una clave de acceso secreta) o un Rol IAM (asumido con `sts:AssumeRole`) y tener los siguientes permisos:
  * `sqs:ReceiveMessage` (para _información_)
  * `sqs:StartMessageMoveTask` (para _redirigir_)
  * `sqs:PurgeQueue` (para _purgar_)

Estos permisos pueden aplicarse globalmente a todas las colas SQS o restringirse a colas específicas.

### Utilización

Después de configurar la connection (conexión), puedes hacer clic en una cola admitida para abrir su panel lateral, donde puedes utilizar las siguientes acciones:

* **Información** para inspeccionar el contenido del mensaje fallido e identificar la causa raíz
* **Redirigir** para volver a poner en cola los mensajes para otro intento de procesamiento
* **Purgar** para borrar los mensajes que ya no es necesario procesar

## Solucionar problemas
Si no puedes ver la información de la cola de mensajes fallidos:
* Confirma que has instalado la [integración de Datadog-AWS][2]
* Confirma que tu rol de AWS utiliza la política `AmazonSQSReadOnlyAccess` gestionada por AWS.
* Confirma que tu rol tiene los permisos `sqs:ListQueues` y `sqs:GetQueueAttributes` 

[1]: /es/data_streams/setup
[2]: /es/integrations/amazon-web-services/
[3]: /es/data_streams/metrics_and_tags/#data_streamssqsdead_letter_queuemessages
[4]: https://app.datadoghq.com/data-streams/
[5]: https://app.datadoghq.com/actions
[6]: https://app.datadoghq.com/data-streams/map
[7]: https://app.datadoghq.com/data-streams/issues
[8]: /es/monitors/types/metric/
[9]: https://app.datadoghq.com/actions/connections
