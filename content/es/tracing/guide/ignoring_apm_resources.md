---
kind: documentación
title: Ignorar los recursos no deseados en APM
---

Un servicio puede manejar una variedad de solicitudes, algunas de las cuales puede que no quieras que se rastreen o se incluyan en métricas de trazas (traces). Un ejemplo de esto son, posiblemente, las comprobaciones de estado en una aplicación web.

Hay dos formas de especificar que un punto de conexión de este tipo no debe rastrearse y debe excluirse de las métricas de trazas:

- [configuración de Trace Agent](#trace-agent-configuration-options) (en Datadog Agent) o bien
- [configuración del rastreador](#tracer-configuration-options).

<div class="alert alert-warning"><strong>Nota</strong>: Mediante el filtro de trazas utilizando cualquiera de las siguientes opciones se eliminan estas solicitudes de las <a href="/tracing/guide/metrics_namespace/">métricas de trazas</a>. Para obtener información sobre cómo reducir el consumo sin afectar las métricas de trazas, consulte <a href="/tracing/trace_ingestion/ingestion_controls">los controles de consumo</a>.</div>

Si necesitas asistencia, ponte en contacto con [soporte técnico de Datadog][1].


## Opciones de configuración de Trace Agent

El componente Trace Agent dentro del Datadog Agent tiene dos métodos para evitar que aparezcan ciertas trazas: ignorar etiquetas (tags) de tramos (spans) o ignorar recursos. Si se descartan trazas debido a esta configuración, las métricas de trazas excluyen estas solicitudes.

La configuración del Trace Agent para ignorar ciertos tramos o recursos se aplica a todos los servicios que envían trazas a este Datadog Agent particular. Si tienes requisitos específicos de la aplicación, utiliza, en su lugar, el método de [configuración del rastreador](#tracer-configuration).

### Ignorar en función de las etiquetas de tramos

Empezando con el Datadog Agent 6.27.0/7.27.0, la opción **filtrar etiquetas** descarta trazas con tramos de raíz que coincidan con etiquetas de tramos especificadas. Esta opción se aplica a todos los servicios que envían trazas a este Datadog Agent particular. Las trazas que se descartan debido al filtro de etiquetas no se incluyen en las métricas de trazas.

Si puedes identificar mediante programación un conjunto de trazas que sabes que no quieres enviar a Datadog y ninguna otra opción de esta guía resuelve tu necesidad, puedes considerar la posibilidad de añadir una [etiqueta de tramo personalizada][2] para poder descartar las trazas. [Ponte en contacto con el servicio de soporte técnico][1] para tratar tu caso de uso con más detalle, de modo que Datadog pueda seguir ampliando esta funcionalidad.

La opción de filtro de etiquetas requiere una coincidencia exacta de las cadenas. Si tu caso de uso requiere ignorar por regex, consulta [Ignorar en función de los recursos](#ignoring-based-on-resources).

Puedes especificar etiquetas de tramos para requerir o rechazar utilizando un lista de claves y valores separados por espacios en variables de entornos:

`DD_APM_FILTER_TAGS_REQUIRE`
: Recopila solo las trazas que tienen tramos de raíz con una coincidencia exacta con las etiquetas de tramos y valores especificados. Si no coincide con esta regla, se descarta la traza. Por ejemplo, `DD_APM_FILTER_TAGS_REQUIRE="key1:value1 key2:value2"`. En Datadog Agent 7.49+, las expresiones regulares pueden estar provistas de `DD_APM_FILTER_TAGS_REGEX_REQUIRE`.

`DD_APM_FILTER_TAGS_REJECT`
: Rechaza trazas que tienen tramos de raíz con una coincidencia exacta con las etiquetas de tramos y valores especificados. Si coincide con esta regla, se descarta la traza. Por ejemplo, `DD_APM_FILTER_TAGS_REJECT="key1:value1 key2:value2"`. En Datadog Agent 7.49+, las expresiones regulares pueden estar provistas de `DD_APM_FILTER_TAGS_REGEX_REJECT`.


{{< pestañas >}}
{{% pestaña "datadog.yaml" %}}

También las puedes configurar en la configuración del Agent con una lista separada por comas:

{{< lenguaje de código de bloque="yaml" nombre de archivo="datadog.yaml" >}}
apm_config:
  filter_tags:
    requerir: ["db:sql", "db.instance:mysql"]
    rechazar: ["outcome:success", "key2:value2"]
{{< /code-block >}}

Por ejemplo, para ignorar comprobaciones de estado donde la `http.url` coincide con este punto conexión:

{{< lenguaje de bloque de código="yaml" nombre de archivo="Datadog.yaml" >}}
apm_config:
  filter_tags:
    rechazar: ["http.url:http://localhost:5050/healthcheck"]
{{< /code-block >}}

{{% /tab %}}
{{% tab "Kubernetes" %}}
#### Datadog Operator

{{< lenguaje de bloque de código="yaml" nombre de archivo="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
clase: DatadogAgent
metadatos:
  nombre: datadog
spec:
  sustituir:
    nodeAgent:
      contenedores:
        trace-agent:
          env:
            - nombre: DD_APM_FILTER_TAGS_REJECT
              valor: tag_key1:tag_val2 tag_key2:tag_val2
{{< /bloque de código >}}

{{% k8s-operator-redeploy %}}

#### Helm

{{< lenguaje de bloque de código="yaml" nombre de archivo="Datadog-values.yaml" >}}
agentes:
  contenedores:
    traceAgent:
      env:
        - nombre: DD_APM_FILTER_TAGS_REJECT
          valor: tag_key1:tag_val2 tag_key2:tag_val2

{{< /bloque de código >}}

{{% k8s-helm-redeploy %}}

[1]: /es/agent/kubernetes/?tab=helm#installation
{{% /pestaña%}}
{{< /pestañas>}}

Mediante el filtrado de trazas de esta manera, se eliminan estas solicitudes de [métricas de trazas][3]. Para obtener más información sobre cómo reducir el consumo sin afectar las métricas de trazas, consulta [Controles de consumo][4].

En el backend, Datadog crea y añade las siguientes etiquetas de tramos a tramos después del consumo. Estas etiquetas no pueden utilizarse para descartar trazas en el nivel del Datadog Agent .


| Nombre                                    | Descripción                                      |
|-----------------------------------------|--------------------------------------------------|
| `http.path_group`                       | La ruta de acceso de URL completa desde la etiqueta `http.url`.        |
| `http.url_details.host`                 | La parte del nombre de host de la etiqueta `http.url`.      |
| `http.url_details.path`                 | El destino completo de la solicitud tal y como se pasa en una línea de solicitud HTTP o equivalente. |
| `http.url_details.scheme`               | El esquema de solicitud de la etiqueta `http.url`.       |
| `http.url_details.queryString`          | La parte de la cadena de consulta de la etiqueta `http.url`. |
| `http.url_details.port`                 | El puerto HTTP de la etiqueta `http.url`.            |
| `http.useragent_details.os.family`      | La familia del SO informada por el Agent de usuario.         |
| `http.useragent_details.browser.family` | La familia de navegadores informada por el Agent de usuario.    |
| `http.useragent_details.device.family`  | La familia de dispositivos informada por el Agent de usuario.     |

<div class="alert alert-warning"><strong>Nota</strong>: Desde el 1.º de octubre de 2022, el backend Datadog aplica una reasignación para aplicar la <a href="/tracing/trace_collection/tracing_naming_convention">Semántica de etiquetas de tramos</a> 
 a través de rastreadores en todos los tramos consumidos. Si deseas descartar tramos  basados en etiquetas en el nivel del Datadog Agent, utiliza etiquetas en la columna <strong>Reasignar desde</strong>.</div>

#### Comunicaciones de red

| **Nombre**                   | **Reasignar desde**                                      |
|----------------------------|-----------------------------------------------------|
| `network.host.ip`          | `tcp.local.address` - Node.js                       |
| `network.destination.ip`   | `out.host` - Todos los lenguajes  |
| `network.destination.port` | `grpc.port` - Python<br> `tcp.remote.port` - Node.js<br>`out.port` - Todos los lenguajes  |

#### Solicitudes HTTP

| **Nombre**                       | **Reasignar desde**                                                                                        |
|--------------------------------|-------------------------------------------------------------------------------------------------------|
| `http.route`                   | `aspnet_core.route` - .NET<br>`aspnet.route` - .NET<br>`laravel.route` - PHP<br>`symfony.route` - PHP |
| `http.useragent`               | `user_agent` - Java                                                                                   |
| `http.url_details.queryString` | `http.query.string` - Python                                                                          |

#### Base de datos

| **Nombre**                         | **Reasignar desde**                                                                                                                                                                                                                  |
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `db.system`                      | `db.type` - Java, Python, Node.js, Go<br>`active_record.db.vendor` - Ruby<br>`sequel.db.vendor` - Ruby                                                                                                                          |
| `db.instance`                    | `mongodb.db` - Python<br> `sql.db` - Python<br> `db.name` - Todos los lenguajes                                           |
| `db.statement`                   | `cassandra.query` - Go<br>`consul.command` - Python<br>`memcached.query` - Python<br>`mongodb.query` - Python, .NET, Go<br>`redis.command` - Python<br>`redis.raw_command` - Python<br>`sql.query` - Python, PHP, Node.js, Java |
| `db.row_count`                   | `cassandra.row_count` - Python<br>`db.rowcount` - Python, PHP<br>`mongodb.rows` - Python<br>`sql.rows` - Python                                                                                                                 |
| `db.cassandra.cluster`           | `cassandra.cluster` - Python, Go                                                                                                                                                                                                |
| `db.cassandra.consistency_level` | `cassandra.consistency_level` - Python, Go                                                                                                                                                                                      |
| `db.cassandra.table`             | `cassandra.keyspace` - Python, Go                                                                                                                                                                                               |
| `db.redis.database_index`        | `db.redis.dbIndex` - Java<br>`out.redis_db` - Python, Ruby                                                                                                                                                                      |
| `db.mongodb.collection`          | `mongodb.collection` - Python, .NET, Ruby, PHP                                                                                                                                                                                  |
| `db.cosmosdb.container`          | `cosmosdb.container` - .NET                                                                                                                                                                                                     |

#### Cola de mensajes

| **Nombre**                               | **Reasignar desde**                                                                                             |
|----------------------------------------|------------------------------------------------------------------------------------------------------------|
| `messaging.destination`                | `amqp.destination` - Node.js<br>`amqp.queue` - .NET<br>`msmq.queue.path` - .NET<br>`aws.queue.name` - .NET |
| `messaging.url`                        | `aws.queue.url` - .NET, Java                                                                               |
| `messaging.message_id`                 | `server_id` - Go                                                                                           |
| `messaging.message_payload_size`       | `message.size` - .NET, Java                                                                                |
| `messaging.operation`                  | `amqp.command` - .NET<br>`msmq.command` - .NET                                                             |
| `messaging.rabbitmq.routing_key`       | `amqp.routing_key` - Java<br>`amqp.routingKey` - Nodes.js                                                  |
| `messaging.rabbitmq.delivery_mode`     | `messaging.rabbitmq.exchange` - .NET                                                                       |
| `messaging.msmq.message.transactional` | `msmq.message.transactional` - .NET                                                                        |
| `messaging.msmq.queue.transactional`   | `msmq.queue.transactional` - .NET                                                                          |
| `messaging.kafka.consumer_group`       | `kafka.group` - Java                                                                                       |
| `messaging.kafka.tombstone`            | `kafka.tombstone` - .NET<br>`tombstone` - Java                                                             |
| `messaging.kafka.partition`            | `kafka.partition` - .NET<br>`partition` - Node.js, Go, Java                                                |
| `messaging.kafka.offset`               | `kafka.offset` - .NET                                                                                      |
| `messaging.msmq.message.transactional` | `msmq.message.transactional` - .NET                                                                        |


#### Llamadas a procedimientos remotos

| **Nombre**                       | **Reasignar desde**                                                                                          |
|--------------------------------|---------------------------------------------------------------------------------------------------------|
| `rpc.service`                  | `grpc.method.service` - Python, .NET                                                                    |
| `rpc.method`                   | `grpc.method.name` - Python, .NET, Go                                                                   |
| `rpc.grpc.package`             | `grpc.method.package` - Python, .NET, Go                                                                |
| `rpc.grpc.status_code`         | `grpc.code` - Go<br>`status.code` - Python, .NET, Node.js<br>`grpc.status.code` - Python, .NET, Node.js |
| `rpc.grpc.kind`                | `grpc.method.kind` - Python, Node.js, Go, .NET                                                          |
| `rpc.grpc.path`                | `rpc.grpc.path` - Python, Node.js, Go, .NET                                                             |
| `rpc.grpc.request.metadata.*`  | `grpc.request.metadata.*` - Python, Node.js<br>`rpc.grpc.request.metadata` - Go                         |
| `rpc.grpc.response.metadata.*` | `grpc.response.metadata.*` - Python, Node.js

#### Errores

| **Nombre**                       | **Reasignar desde**                                                                                          |
|--------------------------------|---------------------------------------------------------------------------------------------------------|
| `error.message`                  | `error.msg` - Todos los lenguajes                      |

### Ignorar en función de los recursos

La opción **ignorar recursos** permite excluir recursos si el tramo de raíz global de la traza coincide con determinados criterios. Consulta [Excluir recursos de la recopilación][5]. Esta opción se aplica a todos los servicios que envían trazas a este Datadog Agent particular. Las trazas que se descartan porque se ignoran recursos no se incluyen en las métricas de trazas.

Puedes especificar los recursos que deseas ignorar en el archivo de configuración del Agent, `datadog.yaml` o con la variable de entorno `DD_APM_IGNORE_RESOURCES`. Consulta los ejemplos siguientes.

{{< lenguaje de bloque de código="yaml" nombre de archivo="Datadog.yaml" >}}
apm_config:
## @param ignore_resources - lista de cadenas - opcional
## Se puede proporcionar un lista de expresiones regulares para excluir determinados trazas en función del nombre del recurso.
## Todas las entradas deben ir entre comillas dobles y separadas por comas.

  ignore_resources: ["(GET|POST) /healthcheck","API::NotesController#index"]
{{< /bloque de código >}}

**Notas**:
- La sintaxis expresiones regulares que acepta el Trace Agent se evalúa con [regexp][6] de Go.
- Según cuál sea tu estrategia de despliegue, puedes tener que ajustar la expresión regular escapando caracteres especiales.
- Si utilizas contenedores dedicados con Kubernetes, asegúrate de que la variable de entorno para la opción de ignorar recursos se esté aplicando al contenedor del **Trace-Agent** Contenedor.

#### Ejemplo

Considera una traza que contiene llamadas a `/api/healthcheck` desde la cual no deseas trazas:

{{< img src="tracing/guide/ignoring_apm_resources/ignoreresources.png" alt="Gráfica de llamas de un recurso que quieres que el rastreador ignore" style="width:90%;">}}

Toma nota del nombre del recurso del tramo de raíz global.

- Nombre de la operación: `rack.request`
- Nombre del recurso: `Api::HealthchecksController#index`
- Http.url: `/api/healthcheck`

Para utilizar correctamente la opción de ignorar recurso, la regla de la expresión regular escrita debe coincidir con el nombre del recurso, `Api::HealthchecksController#index`. Hay varias opciones de expresiones regulares posibles, pero para filtrar trazas desde este recurso tal como está, una posible expresión regular es `Api::HealthchecksController#index$`.

Según tu forma de despliegue, la sintaxis será un poco diferente:

{{< pestañas >}}
{{% pestaña "Datadog.yaml" %}}

{{< lenguaje de bloque de código="yaml" nombre de archivo="Datadog.yaml" >}}
apm_config:
  ignore_resources: Api::HealthchecksController#index$
{{< /bloque de código >}}

Para valores múltiples:

{{< lenguaje de bloque de código="yaml" >}}
apm_config:
  ignore_resources: ["value1", "Api::HealthchecksController#index$"]
{{< /bloque de código >}}

{{% /pestaña %}}
{{% pestaña "Docker componer" %}}

En la lista de variables de entorno del contenedor del Datadog Agent, añade `DD_APM_IGNORE_RESOURCES` con un patrón como el del ejemplo siguiente. Docker Compose tiene su propia [sustitución de variables][1] a tener en cuenta cuando utilices caracteres especiales como `$`.

{{< lenguaje de bloque de código="yaml" >}}
   entorno:
      // otras variables de entorno del Datadog Agent 
      - DD_APM_IGNORE_RESOURCES=Api::HealthchecksController#index$$
{{< /bloque de código >}}

Para valores múltiples:

{{< lenguaje de bloque de código="yaml" >}}
   entorno:
      // otras variables de entorno del Datadog Agent
      - DD_APM_IGNORE_RESOURCES="value1","Api::HealthchecksController#index$$"
{{< /bloque de código >}}

[1]: https://docs.docker.com/compose/compose-file/compose-file-v3/#variable-substitution
{{% /pestaña %}}
{{% pestaña "Docker run" %}}

En tu comando de Docker run para hacer girar el Datadog Agent, añade `DD_APM_IGNORE_RESOURCES`:

{{< lenguaje de bloque de código="shell" >}}
docker run -d --name datadog-agent \
              --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<> \
              -e DD_APM_IGNORE_RESOURCES="Api::HealthchecksController#index$" \
              -e DD_APM_ENABLED=true \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              gcr.io/datadoghq/agent:latest
{{< /bloque de código >}}

Para valores múltiples:

{{< lenguaje de bloque de código="yaml" >}}
              -e DD_APM_IGNORE_RESOURCES=["value1","Api::HealthchecksController#index$"] \
{{< /bloque de código >}}

{{% /pestaña %}}
{{% pestaña "Kubernetes daemonset" %}}

En el contenedor de Trace Agent dedicado, añade la variable de entorno `DD_APM_IGNORE_RESOURCES`:

{{< lenguaje de bloque de código="yaml" >}}
    - nombre: trace-agent
        imagen: "gcr.io/datadoghq/agent:latest"
        imagePullPolicy: IfNotPresent
        comando: ["trace-agent", "-config=/etc/datadog-agent/datadog.yaml"]
        recursos: {}
        puertos:
        - containerPort: 8126
          hostPort: 8126
          nombre: traceport
          protocolo: TCP
        env:
        - nombre: DD_API_KEY
          valueFrom:
            secretKeyRef:
              nombre: "datadog-secret"
              clave: api-key
        - nombre: DD_KUBERNETES_KUBELET_HOST
          valueFrom:
            fieldRef:
              fieldPath: status.hostIP
        - nombre: KUBERNETES
          valor: "yes"
        - nombre: DOCKER_HOST
          valor: unix:///host/var/run/docker.sock
        - nombre: DD_LOG_LEVEL
          valor: "INFO"
        - nombre: DD_APM_ENABLED
          valor: "true"
        - nombre: DD_APM_NON_LOCAL_TRAFFIC
          valor: "true"
        - nombre: DD_APM_RECEIVER_PORT
          valor: "8126"
        - nombre: DD_KUBELET_TLS_VERIFY
          valor: "false"
        - nombre: DD_APM_IGNORE_RESOURCES
          valor: "Api::HealthchecksController#index$"
{{< /bloque de código >}}

Para valores múltiples:

{{< lenguaje de bloque de código="yaml" >}}
        - nombre: DD_APM_IGNORE_RESOURCES
          valor: '"value1","Api::HealthchecksController#index$"'
{{< /bloque de código >}}

{{% /pestaña %}}
{{% pestaña "Kubernetes Helm" %}}

En la sección `traceAgent` del archivo `values.yaml`, añade `DD_APM_IGNORE_RESOURCES` en la sección `env` y, a continuación, [haz girar helm como de costumbre][1].

{{< lenguaje de bloque de código="yaml" nombre del archivo="values.yaml" >}}
    traceAgent:
      # agents.containers.traceAgent.env -- Variables de entorno adicionales para el contenedor de trace-agent
      env:
        - nombre: DD_APM_IGNORE_RESOURCES
          valor: Api::HealthchecksController#index$

{{< /bloque de código >}}

Para valores múltiples:

{{< lenguaje de bloque de código="yaml" >}}
        - nombre: DD_APM_IGNORE_RESOURCES
          valor: value1, Api::HealthchecksController#index$
{{< /bloque de código >}}

Como alternativa, puedes configurar `agents.containers.traceAgent.env` en el comando `helm install`:

{{< lenguaje de bloque de código="shell" >}}
helm install dd-agent -f values.yaml \
  --configurar datadog.apiKeyExistingSecret="datadog-secret" \
  --configurar agents.containers.traceAgent.env[0].name=DD_APM_IGNORE_RESOURCES, \
    agents.containers.traceAgent.env[0].value="Api::HealthchecksController#index$" \
  datadog/datadog
{{< /bloque de código >}}

[1]: /es/agent/kubernetes/?tab=helm#installation
{{% /pestaña %}}
{{% pestaña "Definición de tareas de Amazon ECS" %}}

Si utilizas Amazon ECS (como en EC2), en tu definición del contenedor del Datadog Agent, añade la variable de entorno `DD_APM_IGNORE_RESOURCES` con los valores necesarios para que el JSON evalúe de la siguiente manera:

{{< lenguaje de bloque de código="json" >}}
    "entorno": [
    // otras variables de entorno para el Datadog Agent
        {
          "nombre": "DD_APM_IGNORE_RESOURCES",
          "valor": "Api::HealthchecksController#index$"
        }
     ]
{{< /bloque de código >}}

{{% /pestaña%}}
{{< /pestañas >}}

<div class="alert alert-warning"><strong>Nota</strong>: Mediante el filtrado de trazas de esta manera, se eliminan estas solicitudes de <a href="/tracing/guide/metrics_namespace/">métricas de trazas</a>. Para obtener información sobre cómo reducir el consumo sin afectar las métricas de trazas, consulta <a href="/tracing/trace_ingestion/ingestion_controls">controles de consumo</a>.</div>

## Opciones de configuración del rastreador

Algunos de los rastreadores específicos del lenguaje tienen una opción para modificar tramos antes de que se envíen al Datadog Agent. Utiliza esta opción si tienes requisitos específicos de la aplicación y utilizas uno de los lenguajes que se enumeran a continuación.

<div class="alert alert-danger"><strong>Importante</strong>: Si la solicitud está asociada a una traza distribuida, la traza resultante puede tener imprecisiones de muestreo si descartas partes de ella debido a estas reglas de filtrado.</div>


{{< contenedor de lenguajes de programación lenguajes="Ruby,Python,NodeJS,Java" >}}

{{< lenguaje de programación lenguaje="ruby" >}}

El rastreador de Ruby tiene un pipeline de posprocesamiento que elimina trazas que cumplen ciertos criterios. Más información y ejemplos en [Trazas de posprocesamiento][1].

Por ejemplo, si el nombre del recurso es `Api::HealthchecksController#index`, utiliza la clase `Datadog::Tracing::Pipeline::SpanFilter` para eliminar trazas que contengan el nombre del recurso. Este filtro también puede utilizarse para hacer coincidir otros metadatos disponibles para el [objeto de tramo][2].

```
Datadog::Tracing.before_flush(
   Datadog::Tracing::Pipeline::SpanFilter.new {|span| span.resource =~ /Api::HealthchecksController#index/}
)
```

[1]: /es/tracing/trace_collection/custom_instrumentation/ruby/?tab=activespan#post-processing-traces
[2]: /es/tracing/trace_collection/dd_libraries/ruby/#manual-instrumentation
{{< /lenguaje de programación >}}

{{< lenguaje de programación lenguaje="python" >}}

El rastreador de Python tiene un filtro `FilterRequestsOnUrl` que puedes configurar para eliminar trazas de ciertos puntos de conexión. Como alternativa, puedes escribir un filtro personalizado. Consulta [Filtrar trazas][1] para obtener más información.

Supongamos que la etiqueta de tramo `http.url` del tramo de raíz tenga un valor de `http://<domain>/healthcheck`. Utiliza la siguiente expresión regular para que coincida con cualquier punto de conexión que termine en `healthcheck`:

```
desde ddtrace importa el rastreador
desde ddtrace.filters importa FilterRequestsOnUrl
tracer.configure(settings={
    'FILTROS': [
        FilterRequestsOnUrl(r'http://.*/healthcheck$'),
    ],
})
```

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.filters.FilterRequestsOnUrl
{{< /lenguaje de programación >}}

{{< lenguaje de programación lenguaje="nodeJS" >}}

Configura una lista de bloqueados en la extensión [Http][1]. Toma nota de las coincidencias de la lista de bloqueados en los documentos de la API. Por ejemplo, las solicitudes Http entrantes coinciden con las rutas URL, entonces, si la etiqueta de tramo `http.url` de la traza es `http://<domain>/healthcheck`, escribe una regla que coincida con la URL `healthcheck`:


```
const tracer = require('dd-trace').init();
tracer.use('http', {
  // las solicitudes http entrantes coinciden en la ruta
  servidor: {
    lista de bloqueados: ['/healthcheck']
  },
  // las solicitudes http salientes coinciden en una URL completa
  cliente: {
    lista de bloqueados: ['https://telemetry.example.org/api/v1/record']
  }
})

//importar http

```
<div class="alert alert-info"><strong>Nota</strong>: La configuración del rastreador para la integración debe venir <em>antes de</em> que se importe ese módulo instrumentado.</div>

[1]: https://datadoghq.dev/dd-trace-js/interfaces/export_.plugins.connect.html#blocklist
{{< /lenguaje de programación >}}

{{< lenguaje de programación lenguaje="java" >}}

El rastreador de Java tiene una opción para que un `TraceInterceptor` personalizado filtre determinados tramos. Consulta [Ampliar los rastreadores][1].

Por ejemplo, si el nombre de tu recurso es `GET /healthcheck`, escribe un interceptor de trazas que descarte trazas que contengan este nombre del recurso. Ajusta la lógica para adaptarla a tu caso de uso.

```
clase pública GreetingController {
   estático {
       // En un bloque estático de clase para evitar initializar muchas veces.
       GlobalTracer.get().addTraceInterceptor(new TraceInterceptor() {
           @Override
           public Collection<? extends MutableSpan> onTraceComplete(Collection<? amplía MutableSpan> traza) {
               para (tramo MutableSpan : traza) {
                   si ("OBTENER /healthcheck".contentEquals(span.getResourceName())) {
                       devolver Collections.emptyList();
                   }
               }
               devolver traza;
           }
           @Override
           prioridad int pública() {
               devolver 200;  // Algún número único
           }
       });
   }
}
```

[1]: /es/tracing/trace_collection/custom_instrumentation/java/#extending-tracers
{{< /lenguaje de programación >}}
{{< /contenedor de lenguajes de programación >}}

<div class="alert alert-warning"><strong>Nota</strong>: Mediante el filtrado de trazas de esta manera, se eliminan estas solicitudes de <a href="/tracing/guide/metrics_namespace/">métricas de trazas</a>. Para obtener información sobre cómo reducir el consumo sin afectar las métricas de trazas, consulta los <a href="/tracing/trace_ingestion/ingestion_controls">controles de consumo</a>.</div>

[1]: /es/help/
[2]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[3]: /es/tracing/guide/metrics_namespace/
[4]: /es/tracing/trace_ingestion/ingestion_controls
[5]: /es/tracing/configure_data_security/?tab=mongodb#exclude-resources-from-being-collected
[6]: https://golang.org/pkg/regexp/