---
title: Configurar la monitorización de secuencias de datos para Go
---

{{< site-region region="ap1" >}}
<div class="alert alert-info">La monitorización de secuencias de datos no es compatible en la región AP1.</a></div>
{{< /site-region >}}

### Requisitos previos

Para empezar con la monitorización de secuencias de datos, necesitas versiones recientes de las bibliotecas del Datadog Agent y Data Streams Monitoring:
* [Datadog Agent 7.34.0 y versiones posteriores][1]
* [Data Streams Library 0.2 y versiones posteriores][2]

### Instalación

Inicia una ruta de secuencias de datos con `datastreams.Start()` al principio de tu pipeline.

Existen dos tipos de instrumentación:
- Instrumentación para cargas de trabajo basadas en Kafka
- Instrumentación personalizada para cualquier otro protocolo o tecnología de colas

<div class="alert alert-info">La URL predeterminada del Agent de trazas es <code>localhost:8126</code>. Si esta es distinta para tu aplicación, usa la opción <code>datastreams.Start(datastreams.WithAgentAddr("notlocalhost:8126"))</code>.</div>

### Instrumentación de Kafka

1. Configura los productores para que llamen a `TraceKafkaProduce()` antes de enviar un mensaje de Kafka:

   ```go
   import (ddkafka "github.com/DataDog/data-streams-go/integrations/kafka")
   ...
   ctx = ddkafka.TraceKafkaProduce(ctx, &kafkaMsg)
   ```

   Esta función añade un nuevo punto de control a cualquier ruta existente en el contexto de Go proporcionado, o crea una nueva ruta si no se encuentra ninguna. A continuación, añade la ruta en los encabezados de tus mensajes de Kafka.

2. Configura los consumidores para llamar a `TraceKafkaConsume()`:

   ```go
   import ddkafka "github.com/DataDog/data-streams-go/integrations/kafka"
   ...
   ctx = ddkafka.TraceKafkaConsume(ctx, &kafkaMsg, consumer_group)
   ```

   Esta función extrae la ruta por la que ha transcurrido un mensaje de Kafka hasta el momento. Establece un nuevo punto de control en la ruta para registrar el consumo de un mensaje y almacena la ruta en el contexto de Go proporcionado.

   **Nota**: Tanto la salida `ctx` desde `TraceKafkaProduce()` como la salida `ctx` desde `TraceKafkaConsume()` contienen información sobre la ruta actualizada.

Para `TraceKafkaProduce()`, si envías varios mensajes de Kafka a la vez (fan-out), no reutilices el `ctx` de salida entre llamadas.

Para `TraceKafkaConsume()`, si añades varios mensajes para crear un número menor de cargas útiles (fan-in), llama a `MergeContext()` para fusionar los contextos en uno solo que pueda pasarse a la siguiente llamada `TraceKafkaProduce()`:

```go
import (
    datastreams "github.com/DataDog/data-streams-go"
    ddkafka "github.com/DataDog/data-streams-go/integrations/kafka"
)

...

contexts := []Context{}
for (...) {
    contexts.append(contexts, ddkafka.TraceKafkaConsume(ctx, &consumedMsg, consumer_group))
}
mergedContext = datastreams.MergeContexts(contexts...)

...

ddkafka.TraceKafkaProduce(mergedContext, &producedMsg)
```

### Instrumentación manual

También puedes utilizar la instrumentación manual. Por ejemplo, en HTTP, es posible propagar la ruta con cabeceras HTTP.

Para insertar una ruta:

```go
req, err := http.NewRequest(...)
...
p, ok := datastreams.PathwayFromContext(ctx)
if ok {
   req.Headers.Set(datastreams.PropagationKeyBase64, p.EncodeStr())
}
```

Para extraer una ruta:

```go
func extractPathwayToContext(req *http.Request) context.Context {
    ctx := req.Context()
    p, err := datastreams.DecodeStr(req.Header.Get(datastreams.PropagationKeyBase64))
    if err != nil {
        return ctx
    }
    ctx = datastreams.ContextWithPathway(ctx, p)
    _, ctx = datastreams.SetCheckpoint(ctx, "type:http")
}
```

### Añadir una dimensión

Puedes añadir una dimensión adicional a las métricas de latencia de extremo a extremo con la etiqueta `event_type`:

```go
_, ctx = datastreams.SetCheckpoint(ctx, "type:internal", "event_type:sell")
```

Basta con añadir la etiqueta `event_type` para el primer servicio en cada ruta. Los datos de alta cardinalidad (como hosts o ID de solicitud) no se admiten como valores para la etiqueta `event_type`.

[1]: /es/agent
[2]: https://github.com/DataDog/data-streams-go