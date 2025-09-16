---
title: Live Messages
---

{{< callout url="#" btn_hidden="true" header="Únete a la Vista previa">}}
Live Messages está en Vista previa para servicios Java-Kafka utilizando Protobuf y Avro. Si te interesan otros lenguajes y tecnologías, ponte en contacto con support@datadoghq.com. 
{{< /callout >}}

Live Messages permite ver una cola activa de los mensajes que consume o produce un servicio específico. Acceder a los mensajes en directo e inspeccionar su contenido puede ayudarte a descubrir problemas cuando solucionas aquellos de un servicio específico.

{{< img src="data_streams/live-messages.png" alt="Data Streams Monitoring con un panel lateral abierto que muestra una cola activa de Live Messages." style="width:100%;" >}}

### Configuración

1. Habilita la [Instrumentación dinámica][1] en los servicios en los que quieres utilizar esta función. 

   <div class="alert alert-info">
   Dynamic Instrumentation requires <a href="/agent/remote_config/">Remote Configuration</a>.
   </div>
1. En [Parámetros de Datadog][2], asegúrate de tener los siguientes roles:
   - `Dynamic Instrumentation Read`
   - `Dynamic Instrumentation Write`

### Utilización

1. Ve al mapa de Data Streams Monitoring y haz clic en un servicio Java que tenga habilitada la instrumentación dinámica. Selecciona la pestaña **Mensajes**.
   {{< img src="data_streams/dsm-messages-tab.png" alt="Data Streams Monitoring con el panel lateral de un servicio abierto. Se muestra un botón." style="width:80%;" >}}
1. Para activar la cola activa de Live Messages, haz clic en el botón de reproducción. A continuación, especifica el número aproximado de mensajes que quieres capturar y haz clic en **Start Capturing** (Iniciar captura). Los mensajes se generan en forma de logs y se muestrean a una frecuencia de un mensaje por segundo por host.
   {{< img src="data_streams/dsm-start-capturing.png" alt="Modal Iniciar captura de mensajes con un campo para configurar el número de mensajes capturados (a una frecuencia de un mensaje por segundo por host)." style="width:80%;" >}}
1. Al hacer clic en cada mensaje se muestran los campos y valores.
   {{< img src="data_streams/dsm-details.png" alt="Live Messages con un mensaje seleccionado." style="width:80%;" >}}

#### Desactivar la cola activa de Live Messages
{{< img src="data_streams/dsm-stop-capturing.png" alt="Modal Detener captura de mensajes." style="width:100%;" >}}

La cola activa se apaga automáticamente después de capturar el número aproximado de mensajes especificado. También puedes apagarla manualmente seleccionando el botón **Detener captura**.

### Más información

#### Almacenamiento y acceso a mensajes
Se accede a los mensajes a través de Datadog en los consumidores y productores de mensajes. A continuación, se almacenan en Datadog como logs, tras pasar por el [Sensitive Data Scanner][3].

Los usuarios deben tener los roles `Dynamic Instrumentation Capture Variables` y `Dynamic Instrumentation Read` para utilizar la función Live Messages. Todos los usuarios de la organización pueden ver logs. Para obtener más información sobre los controles de acceso basados en funciones, consulta [Instrumentación dinámica][4].

#### Ocultamiento de información confidencial

La instrumentación dinámica oculta automáticamente los valores vinculados a identificadores específicos considerados confidenciales, como contraseña y token de acceso. Consulta la [lista completa de identificadores ocultos][5]. 

Puedes personalizar aún más el ocultamiento especificando identificadores adicionales. En el entorno de tu aplicación (no en el `datadog-agent`), configura la variable de entorno `DD_DYNAMIC_INSTRUMENTATION_REDACTED_IDENTIFIERS` con una lista de identificadores separados por comas como `firstName,lastName,phoneNumber`.

Para obtener más información sobre la depuración de datos confidenciales, consulta la [documentación de la instrumentación dinámica][6]. Si tienes requisitos o solicitudes adicionales sobre la gestión de datos confidenciales, [ponte en contacto con el servicio de asistencia de Datadog][7]. 

#### Cifrado SSL en Kafka
Datadog captura los mensajes en los clientes (consumidor, productor) antes de que sean cifrados. Así, Datadog puede capturar mensajes independientemente de si el cifrado está activado en la capa de Kafka.

[1]: /es/dynamic_instrumentation/
[2]: https://app.datadoghq.com/personal-settings/profile
[3]: https://www.datadoghq.com/product/sensitive-data-scanner/
[4]: /es/dynamic_instrumentation/#prerequisites
[5]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-debugger/debugger-bootstrap/src/main/java/datadog/trace/bootstrap/debugger/util/Redaction.java
[6]: /es/dynamic_instrumentation/sensitive-data-scrubbing/
[7]: /es/help