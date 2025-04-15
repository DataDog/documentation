---
title: Métricas y etiquetas
---

En este documento se tratan las siguientes métricas y sus etiquetas (tags) de Data Streams Monitoring:

- `data_streams.latency`
- `data_streams.kafka.lag_seconds`
- `data_streams.kafka.lag_messages`

### data_streams.latency

Este métrica mide la latencia entre dos puntos del pipeline. El valor puede representar distintos tipos de latencia, en función de sus etiquetas.

`pathway_type`
: qué información representa el valor de la métrica. Posibles tipos de vía:
 <br/>
  - `full`: latencia de extremo a extremo entre el origen de los datos (`start`) y otro punto (`end`) del pipeline
     - Etiqueta`start`: origen de los datos
     - Etiqueta `end`: punto arbitrario donde se rastrearon los datos por última vez
  - `edge`: latencia entre dos servicios, conectados a través de una cola o directamente sobre HTTP/gRPC. Mide el tiempo entre _antes de la producción_ en el productor (`start`) y _después del consumo_ en el consumidor (`end`).
     - Etiqueta `start`: el servicio productor anterior
     - Etiqueta `end`: el servicio consumidor posterior
  - `partial_edge`: latencia entre un servicio y una cola, si no se conoce el productor o el consumidor (es decir, si no se ha instrumentado con Data Streams Monitoring)
     - Etiqueta `start`: el servicio/cola productor anterior
     - Etiqueta `end`: el servicio/cola consumidor posterior
  - `internal`latencia en el servicio. Mide el tiempo entre la operación de _consumo_ y la siguiente de _producción_.

`start`
: el nombre del nodo en el que Data Streams Monitoring detecta por primera vez la carga útil. Este nodo puede ser un servicio (el productor original) o una cola (el productor original no es conocido por Data Streams Monitoring).
 <br/><br/>
  Cuando la etiqueta `pathway_type` se establece en `full` (latencia de extremo a extremo), `start` siempre se refiere al inicio del pipeline. 
 <br/><br/>
  Por ejemplo:
 <br/>
  {{< img src="data_streams/dsm_pipeline.png" alt="Diagrama de un pipeline que fluye de 'Servicio A' a 'Cola A' a 'Servicio B' a 'Cola B' a 'Servicio C'." >}}
 <br/>
  La consulta `start:serviceA and end:serviceC and pathway_type:full` mide la latencia de extremo a extremo de este pipeline.
 <br/>
  La consulta `start:serviceB and end:serviceC and pathway_type:full` **no** mide la latencia de este pipeline, ya que no hay datos originados en servicio B.

`end`
: el nombre del nodo donde termina el pipeline. Puedes utilizar `end` para obtener datos de pipelines parciales.
 <br/><br/>
  Por ejemplo:
 <br/>
  {{< img src="data_streams/dsm_pipeline.png" alt="Diagrama de un pipeline que fluye desde 'Servicio A' a 'Cola A' a 'Servicio B' a 'Cola B' a 'Servicio C'." >}}
 <br/>
  Puedes utilizar `start:serviceA and end:serviceB and pathway_type:full` para medir la primera parte de este pipeline.
 <br/>

`service`
: el nombre del servicio donde se recopilan los datos.

`type`
: el nombre de la tecnología de colas para la que se generan los datos, por ejemplo: Kafka, RabbitMQ, SQS. Para HTTP y gRPC, `type` se establece en `http` o `grpc`.

`topic`
: el nombre del tema en el que se producen o del que se consumen los datos, si existe.

`direction`
: la dirección del flujo de datos para un determinado `service`. Valores posibles:
 <br/>
  - `in`: la operación de consumo o proporcionar datos a través de HTTP/gRPC
  - `out`: la operación de producción o enviar datos a través de HTTP/gRPC

`env`
: entorno en el que se ejecuta el servicio

`pathway`
: una lista ordenada de servicios separados por `/`, por los que pasan los datos. Si los datos pasan por el mismo servicio varias veces consecutivas, el nombre de servicio se añade una sola vez.

`detailed_pathway`
: una lista ordenada de servicios y colas separados por `/`, por las que se mueven los datos. Lo mismo que `pathway`, pero con colas además de servicios.

`visited_queues`
: representa todas las colas por las que pasan los datos. (Se excluyen las colas situadas directamente al principio o al final del pipeline). Puedes utilizar esta etiqueta para que la consulta sea más específica si los datos pasan por varias colas.
 <br/><br/>
  Considera el siguiente pipeline:
 <br/>
  {{< img src="data_streams/visited-queues-disambiguation.png" alt="Diagrama de pipeline que fluye de 'Servicio A', se divide en dos ('Cola A' y 'Cola B'), y se funciona en 'Servicio B'." >}}
 <br/><br/>
  Para medir el flujo de datos de Servicio A a la Cola A al Servicio B, puedes consultar `start:serviceA and end:serviceB and visited_queues:queueA`.
 <br/>
  Para medir el flujo de datos de servicio A a la cola B al Servicio B, puedes consultar `start:serviceA and end:serviceB and visited_queues:queueB`.

`visited_services`
: representa todos servicios por los que pasan los datos. (Se excluyen los servicios que están directamente al principio o al final del pipeline).

`upstream_service`
: el nombre del servicio ascendente de un `service` particular.

`exchange`
: para RabbitMQ, el nombre del intercambio al que han pasado los datos.

`hash`
: un identificador único, calculado utilizando varios valores de etiqueta (`type`, `service`, `direction`, `parent_hash` y otros).

`parent_hash`
: el `hash` del nodo ascendente del nodo en la ruta.

### data_streams.kafka.lag_seconds

Esta métrica representa el desfase (en segundos) entre las últimas operaciones de producción y consumo.

`partition`
: la partición de Kafka.

`env`
: el entorno en el que está funcionando el servicio de consumidor.

`topic`
: el tema de Kafka.

`consumer_group`
: el grupo de consumidores de Kafka.

### data_streams.kafka.lag_messages

Esta métrica representa el desfase (en desplazamientos) entre las últimas operaciones de producción y consumo.

`partition`
: la partición de Kafka.

`env`
: el entorno en el que funciona el servicio de consumidor.

`topic`
: el tema de Kafka.

`consumer_group`
: el grupo de consumidores de Kafka.