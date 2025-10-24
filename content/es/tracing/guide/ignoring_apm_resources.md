---
description: Aprende a excluir recursos no deseados de las trazas (traces), como los
  checks de estado, utilizando reglas de muestreo y filtrado para reducir el ruido
  y gestionar los costes.
title: Ignorar los recursos no deseados en APM
---

Un servicio puede administrar una variedad de solicitudes, algunas de las cuales puede que no quieras que se rastreen o se incluyan en las métricas de trazas. Un ejemplo de esto son, posiblemente, los checks de estado en una aplicación web. Esta documentación cubre dos opciones principales: muestreo y filtrado.

Si necesitas ayuda para decidir cuál opción es la más adecuada para tu caso de uso, ponte en contacto con [asistencia técnica de Datadog][1].

## Muestreo

Si quieres que el tramo (span) se incluya en las métricas de trazas pero no quieres que se ingiera, utiliza reglas de muestreo. Para obtener más información sobre el muestreo, consulta [Controles de ingesta][4].

### Utilización de reglas de muestreo

El enfoque de recomendado consiste en utilizar reglas de muestreo, que permiten muestrear trazas en función de los nombres de los recursos, los nombres de los servicios, las etiquetas (tags) y los nombres de las operaciones:

```shell
DD_TRACE_SAMPLING_RULES='[{"resource": "GET healthcheck", "sample_rate": 0.0}]'
```

O para realizar un muestreo basado en las etiquetas de la URL HTTP:

```shell
DD_TRACE_SAMPLING_RULES='[{"tags": {"http.url": "http://.*/healthcheck$"}, "sample_rate": 0.0}]'
```

<div class="alert alert-info">Las decisiones de muestreo se determinan utilizando el primer tramo de una traza. Si el tramo que contiene la etiqueta con la que quieres filtrar no es una {{< tooltip glossary="trace root span" case="sentence" >}}, esta regla no se aplica.</div>

## Filtrado

Si no quieres que se ingiera el tramo y no quiere que se refleje en las métricas de trazas, utiliza el filtrado.

Existen dos formas de especificar que un punto de conexión de este tipo no debe rastrearse y debe excluirse de las métricas de trazas:

- [Configuración del Trace Agent](#trace-agent-configuration-options) (en el Datadog Agent) o bien
- [Configuración del rastreador](#tracer-configuration-options).

### Opciones de configuración del Trace Agent

El componente Trace Agent dentro del Datadog Agent tiene dos métodos para evitar que aparezcan ciertas trazas: ignorar etiquetas de tramos o ignorar recursos. Si se descartan trazas debido a esta configuración, las métricas de trazas excluyen estas solicitudes.

La configuración del Trace Agent para ignorar ciertos tramos o recursos se aplica a todos los servicios que envían trazas a este Datadog Agent particular. Si tienes requisitos específicos de la aplicación, utiliza, en su lugar, el método de [Configuración del rastreador](#tracer-configuration).

#### Ignorar en función de las etiquetas de tramos

Empezando con el Datadog Agent 6.27.0/7.27.0, con la opción **filtrar por etiquetas**, se descartan trazas con tramos de raíz que coincidan con etiquetas de tramos especificadas. Esta opción se aplica a todos los servicios que envían trazas a este Datadog Agent particular. Las trazas que se descartan debido al filtro por etiquetas no se incluyen en las métricas de trazas.

Si puedes identificar mediante programación un conjunto de trazas que sabes que no quieres enviar a Datadog y ninguna otra opción de esta guía resuelve tu necesidad, puedes considerar añadir una [etiqueta de tramo personalizada][2] para poder descartar las trazas. [Ponte en contacto con el servicio de soporte técnico][1] para tratar tu caso de uso con más detalle, de modo que Datadog pueda seguir ampliando esta funcionalidad.

La opción de filtrar por etiquetas requiere una coincidencia exacta de las cadenas. Si tu caso de uso requiere ignorar por expresiones regulares, consulta [Ignorar en función de los recursos](#ignoring-based-on-resources).

Puedes especificar etiquetas de tramos para requerir o rechazar utilizando un lista de claves y valores separados por espacios en variables de entorno:

`DD_APM_FILTER_TAGS_REQUIRE`
: Recopila solo las trazas que tienen tramos de raíz con una coincidencia exacta con las etiquetas de tramos y valores especificados. Si no coincide con esta regla, se descarta la traza. Por ejemplo, `DD_APM_FILTER_TAGS_REQUIRE="key1:value1 key2:value2"`. En el Datadog Agent 7.49+, las expresiones regulares pueden estar provistas de `DD_APM_FILTER_TAGS_REGEX_REQUIRE`.

`DD_APM_FILTER_TAGS_REJECT`
: Rechaza las trazas que tienen tramos de raíz con una coincidencia exacta con las etiquetas de tramos y valores especificados. Si coincide con esta regla, se descarta la traza. Por ejemplo, `DD_APM_FILTER_TAGS_REJECT="key1:value1 key2:value2"`. En el Datadog Agent 7.49+, las expresiones regulares pueden estar provistas de `DD_APM_FILTER_TAGS_REGEX_REJECT`.


{{< tabs >}}
{{% tab "datadog.yaml" %}}

También las puedes configurar en la configuración del Agent con una lista separada por comas:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  filter_tags:
    require: ["db:sql", "db.instance:mysql"]
    reject: ["outcome:success", "key2:value2"]
{{< /code-block >}}

Por ejemplo, para ignorar comprobaciones de estado donde la `http.url` coincide con este punto conexión:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  filter_tags:
    reject: ["http.url:http://localhost:5050/healthcheck"]
{{< /code-block >}}

{{% /tab %}}
{{% tab "Kubernetes" %}}
##### Datadog Operator

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      containers:
        trace-agent:
          env:
            - nombre: DD_APM_FILTER_TAGS_REJECT
              valor: tag_key1:tag_val2 tag_key2:tag_val2
{{< /code-block >}}

{{% k8s-operator-redeploy %}}

##### Helm

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
agents:
  containers:
    traceAgent:
      env:
        - nombre: DD_APM_FILTER_TAGS_REJECT
          valor: tag_key1:tag_val2 tag_key2:tag_val2

{{< /code-block >}}

{{% k8s-helm-redeploy %}}

[1]: /es/agent/kubernetes/?tab=helm#installation
{{% /tab %}}
{{< /tabs >}}

Al filtrar trazas de esta manera, se eliminan estas solicitudes de las [métricas de trazas][3]. Para obtener más información sobre cómo reducir el consumo sin afectar las métricas de trazas, consulta [Controles de consumo][4].

En el backend, Datadog crea y añade las siguientes etiquetas de tramos a los tramos después de la ingesta. Ten en cuenta que estas etiquetas no se pueden utilizar para eliminar trazas a nivel del Datadog Agent, ya que el Agent solo filtra en función de las etiquetas disponibles antes de la ingesta.


| Nombre                                    | Descripción                                      |
|-----------------------------------------|--------------------------------------------------|
| `http.path_group`                       | La ruta de acceso de URL completa desde la etiqueta `http.url`.        |
| `http.url_details.host`                 | La parte del nombre de host de la etiqueta `http.url`.      |
| `http.url_details.path`                 | El destino completo de la solicitud tal y como se pasa en una línea de solicitud HTTP o equivalente. |
| `http.url_details.scheme`               | El esquema de solicitud de la etiqueta `http.url`.       |
| `http.url_details.queryString`          | La parte de la cadena de consulta de la etiqueta `http.url`. |
| `http.url_details.port`                 | El puerto HTTP de la etiqueta `http.url`.            |
| `http.useragent_details.os.family`      | La familia del SO informada por el User-Agent.         |
| `http.useragent_details.browser.family` | La familia de navegadores informada por el User-Agent.    |
| `http.useragent_details.device.family`  | La familia de dispositivos informada por el User-Agent.     |

<div class="alert alert-danger">A partir del 1 de octubre de 2022, el backend de Datadog implementa una reasignación para aplicar la <a href="/tracing/trace_collection/tracing_naming_convention">Semántica de etiquetas de tramos
</a> en los rastreadores en todos los tramos ingeridos. Si quieres descartar tramos en función de las etiquetas a nivel del Datadog Agent, utiliza las etiquetas de la columna <strong>Reasignar desde</strong>.</div>

##### Comunicaciones de red

| **Nombre**                   | **Reasignar desde**                                      |
|----------------------------|-----------------------------------------------------|
| `network.host.ip`          | `tcp.local.address` - Node.js                       |
| `network.destination.ip`   | `out.host` - Todos los lenguajes  |
| `network.destination.port` | `grpc.port` - Python<br> `tcp.remote.port` - Node.js<br>`out.port` - Todos los lenguajes  |

##### Solicitudes HTTP

| **Nombre**                       | **Reasignar desde**                                                                                        |
|--------------------------------|-------------------------------------------------------------------------------------------------------|
| `http.route`                   | `aspnet_core.route` - .NET<br>`aspnet.route` - .NET<br>`laravel.route` - PHP<br>`symfony.route` - PHP |
| `http.useragent`               | `user_agent` - Java, C++                                                                                   |
| `http.url_details.queryString` | `http.query.string` - Python                                                                          |

##### Base de datos

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

##### Cola de mensajes

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


##### Llamadas a procedimientos remotos

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

##### Errores

| **Nombre**                       | **Reasignar desde**                                                                                          |
|--------------------------------|---------------------------------------------------------------------------------------------------------|
| `error.message`                  | `error.msg` - Todos los lenguajes                      |

#### Ignorar en función de los recursos

La opción **ignorar recursos** permite excluir recursos si el tramo de raíz global de la traza coincide con determinados criterios. Consulta [Excluir recursos de la recopilación][5]. Esta opción se aplica a todos los servicios que envían trazas a este Datadog Agent particular. Las trazas que se descartan porque se ignoran recursos no se incluyen en las métricas de trazas.

Puedes especificar los recursos que deseas ignorar en el archivo de configuración del Agent, `datadog.yaml` o con la variable de entorno `DD_APM_IGNORE_RESOURCES`. Consulta los ejemplos siguientes.

Utilización de `Datadog.yaml`:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
## @param ignore_resources - lista de cadenas - opcional
## Se puede proporcionar un lista de expresiones regulares para excluir determinados trazas en función del nombre del recurso.
## Todas las entradas deben ir entre comillas dobles y separadas por comas.

  ignore_resources: ["(GET|POST) /healthcheck","API::NotesController#index"]
{{< /code-block >}}

Utilización de `DD_APM_IGNORE_RESOURCES`:

```shell
DD_APM_IGNORE_RESOURCES="(GET|POST) /healthcheck,API::NotesController#index"
```

**Notas**:
- Cuando se utiliza el formato de variable de entorno (`DD_APM_IGNORE_RESOURCES`), los valores deben proporcionarse como una lista de cadenas separadas por comas.
- La sintaxis de las expresiones regulares que acepta el Trace Agent se evalúa con [expresiones regulares][6] de Go.
- Según cuál sea tu estrategia de despliegue, puedes tener que ajustar la expresión regular escapando caracteres especiales.
- Si utilizas contenedores dedicados con Kubernetes, asegúrate de que la variable de entorno para la opción de ignorar recursos se esté aplicando al contenedor del **Trace-Agent**.

##### Ejemplo

Considera una traza que contiene llamadas a `/api/healthcheck` desde la cual no quieres ver trazas:

{{< img src="tracing/guide/ignoring_apm_resources/ignoreresources.png" alt="Gráfica de llamas de un recurso que quieres que el rastreador ignore" style="width:90%;">}}

Toma nota del nombre del recurso del tramo de raíz global.

- Nombre de la operación: `rack.request`
- Nombre del recurso: `Api::HealthchecksController#index`
- Http.url: `/api/healthcheck`

Para utilizar correctamente la opción de ignorar recurso, la regla de la expresión regular escrita debe coincidir con el nombre del recurso, `Api::HealthchecksController#index`. Existen varias opciones de expresiones regulares posibles, pero para filtrar trazas desde este recurso tal como está, una posible expresión regular que puedes utilizar es `Api::HealthchecksController#index$`.

Según cuál sea tu forma de despliegue, la sintaxis será un poco diferente:

{{< tabs >}}
{{% tab "datadog.yaml" %}}

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  ignore_resources: Api::HealthchecksController#index$
{{< /code-block >}}

Para valores múltiples:

{{< code-block lang="yaml" >}}
apm_config:
  ignore_resources: ["value1","Api::HealthchecksController#index$"]
{{< /code-block >}}

{{% /tab %}}
{{% tab "Docker compose" %}}

En la lista de variables de entorno del contenedor del Datadog Agent, añade `DD_APM_IGNORE_RESOURCES` con un patrón como el del ejemplo siguiente. Docker Compose tiene su propia [sustitución de variables][1] para tener en cuenta cuando utilices caracteres especiales como `$`.

{{< code-block lang="yaml" >}}
    environment:
      // otras variables de entorno del Datadog Agent
      - DD_APM_IGNORE_RESOURCES=Api::HealthchecksController#index$$
{{< /code-block >}}

Para valores múltiples:

{{< code-block lang="yaml" >}}
    environment:
      // otras variables de entorno del Datadog Agent
      - DD_APM_IGNORE_RESOURCES="value1","Api::HealthchecksController#index$$"
{{< /code-block >}}

[1]: https://docs.docker.com/compose/compose-file/compose-file-v3/#variable-substitution
{{% /tab %}}
{{% tab "Docker run" %}}

En tu comando Docker run para hacer girar el Datadog Agent, añade `DD_APM_IGNORE_RESOURCES`:

{{< code-block lang="shell" >}}
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
{{< /code-block >}}

Para valores múltiples:

{{< code-block lang="yaml" >}}
              -e DD_APM_IGNORE_RESOURCES=["value1","Api::HealthchecksController#index$"] \
{{< /code-block >}}

{{% /tab %}}
{{% tab "Kubernetes daemonset" %}}

En el contenedor del Trace Agent dedicado, añade la variable de entorno `DD_APM_IGNORE_RESOURCES`:

{{< code-block lang="yaml" >}}
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
{{< /code-block >}}

Para valores múltiples:

{{< code-block lang="yaml" >}}
        - nombre: DD_APM_IGNORE_RESOURCES
          valor: '"value1","Api::HealthchecksController#index$"'
{{< /code-block >}}

{{% /tab %}}
{{% tab "Kubernetes Helm" %}}

En la sección `traceAgent` del archivo `values.yaml`, añade `DD_APM_IGNORE_RESOURCES` en la sección `env` y, a continuación, [haz girar helm como de costumbre][1].

{{< code-block lang="yaml" filename="values.yaml" >}}
    traceAgent:
      # agents.containers.traceAgent.env -- Variables de entorno adicionales para el contenedor del trace-agent container
      env:
        - name: DD_APM_IGNORE_RESOURCES
          value: Api::HealthchecksController#index$

{{< /code-block >}}

Para valores múltiples:

{{< code-block lang="yaml" >}}
        - nombre: DD_APM_IGNORE_RESOURCES
          valor: value1, Api::HealthchecksController#index$
{{< /code-block >}}

También puedes configurar `agents.containers.traceAgent.env` en el comando `helm install`:

{{< code-block lang="shell" >}}
helm install dd-agent -f values.yaml \
  --set datadog.apiKeyExistingSecret="datadog-secret" \
  --set agents.containers.traceAgent.env[0].name=DD_APM_IGNORE_RESOURCES, \
    agents.containers.traceAgent.env[0].value="Api::HealthchecksController#index$" \
  datadog/datadog
{{< /code-block >}}

[1]: /es/agent/kubernetes/?tab=helm#installation
{{% /tab %}}
{{% tab "Amazon ECS Task Definition" %}}

Si utilizas Amazon ECS (como en EC2), en tu definición del contenedor del Datadog Agent, añade la variable de entorno `DD_APM_IGNORE_RESOURCES` con los valores necesarios para que el JSON evalúe de la siguiente manera:

{{< code-block lang="json" >}}
    "environment": [
    // other environment variables for the Datadog Agent
        {
          "name": "DD_APM_IGNORE_RESOURCES",
          "value": "Api::HealthchecksController#index$"
        }
     ]
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger">Al filtrar las trazas de esta manera se eliminan estas solicitudes de las <a href="/tracing/guide/metrics_namespace/">métricas de trazas</a>. Para obtener información sobre cómo reducir la ingesta sin afectar a las métricas de trazas, consulta los <a href="/tracing/trace_ingestion/ingestion_controls">controles de ingestión</a>.</div>

## Opciones de configuración del rastreador

Algunos de los rastreadores específicos del lenguaje tienen una opción para modificar tramos antes de que se envíen al Datadog Agent. Utiliza esta opción si tienes requisitos específicos de la aplicación y utilizas uno de los lenguajes que se enumeran a continuación.

<div class="alert alert-warning">1. Si la solicitud está asociada a una traza distribuida, la traza resultante puede tener imprecisiones de muestreo si se descartan partes de ella debido a estas reglas de filtrado.<br> 2. Al filtrar las trazas de esta manera se eliminan estas solicitudes de las <a href="/tracing/guide/metrics_namespace/">métricas de trazas</a>. Para obtener información sobre cómo reducir la ingesta sin afectar a las métricas de trazas, consulta los <a href="/tracing/trace_ingestion/ingestion_controls">controles de ingesta</a>.</div>


{{< programming-lang-wrapper langs="ruby,python,nodeJS,java" >}}

{{< programming-lang lang="ruby" >}}

El rastreador de Ruby tiene un pipeline de posprocesamiento que elimina trazas que cumplen ciertos criterios. Puedes obtener más información y ejemplos en [Trazas de posprocesamiento][1].

Por ejemplo, si el nombre del recurso es `Api::HealthchecksController#index`, utiliza la clase `Datadog::Tracing::Pipeline::SpanFilter` para eliminar trazas que contengan el nombre del recurso. Este filtro también puede utilizarse para hacer coincidir otros metadatos disponibles para el [objeto de tramo][2].

```
Datadog::Tracing.before_flush(
   Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.resource =~ /Api::HealthchecksController#index/ }
)
```

[1]: /es/tracing/trace_collection/custom_instrumentation/ruby/?tab=activespan#post-processing-traces
[2]: /es/tracing/trace_collection/dd_libraries/ruby/#manual-instrumentation
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

El rastreador Python ofrece una opción para filtrar los traces (trazas) no deseadas:

### Uso de filtros personalizados

Para casos de uso avanzados, puedes crear filtros personalizados:

```py
from ddtrace.trace import tracer
from ddtrace.trace import TraceFilter
import re

class CustomFilter(TraceFilter):
    def __init__(self, pattern):
        self.pattern = re.compile(pattern)

    def process_trace(self, trace):
        for span in trace:
            if span.get_tag('http.url') and self.pattern.match(span.get_tag('http.url')):
                return None  # Drop the trace
        return trace  # Keep the trace

# Configure the tracer with your custom filter
tracer.configure(trace_processors=[CustomFilter(r'http://.*/healthcheck$')])
```

{{< /programming-lang >}}

{{< programming-lang lenguaje="nodeJS" >}}

Configura una lista de bloqueados en la extensión [Http][1]. Toma nota de las coincidencias de la lista de bloqueados en los documentos de la API. Por ejemplo, las solicitudes Http entrantes coinciden con las rutas de acceso URL, entonces, si la etiqueta de tramo `http.url` de la traza es `http://<domain>/healthcheck`, escribe una regla de acceso que coincida con la URL `healthcheck`:


```
const tracer = require('dd-trace').init();
tracer.use('http', {
  // incoming http requests match on the path
  server: {
    blocklist: ['/healthcheck']
  },
  // outgoing http requests match on a full URL
  client: {
    blocklist: ['https://telemetry.example.org/api/v1/record']
  }
})

//import http

```
<div class="alert alert-info">La configuración del rastreador para la integración debe venir <em>antes</em> de que se importe ese módulo instrumentado.</div>

[1]: https://datadoghq.dev/dd-trace-js/interfaces/export_.plugins.connect.html#blocklist
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

El rastreador de Java tiene una opción para que un `TraceInterceptor` personalizado filtre determinados tramos. Consulta [Ampliar los rastreadores][1].

Por ejemplo, si el nombre de tu recurso es `GET /healthcheck`, escribe un interceptor de trazas que descarte trazas que contengan este nombre del recurso. Ajusta la lógica para adaptarla a tu caso de uso.

```
public class GreetingController {
   static {
       // En un bloque estático de clase para evitar inicializar muchas veces.
       GlobalTracer.get().addTraceInterceptor(new TraceInterceptor() {
           @Override
           public Collection<? extends MutableSpan> onTraceComplete(Collection<? extends MutableSpan> trace) {
               para (MutableSpan span : trace) {
                   si ("GET /healthcheck".contentEquals(span.getResourceName())) {
                       devolver Collections.emptyList();
                   }
               }
               devolver traza;
           }
           @Override
           public int priority() {
               devolver 200;  // Algún número único
           }
       });
   }
}
```

[1]: /es/tracing/trace_collection/custom_instrumentation/java/#extending-tracers
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}


[1]: /es/help/
[2]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[3]: /es/tracing/guide/metrics_namespace/
[4]: /es/tracing/trace_ingestion/ingestion_controls
[5]: /es/tracing/configure_data_security/?tab=mongodb#exclude-resources-from-being-collected
[6]: https://golang.org/pkg/regexp/